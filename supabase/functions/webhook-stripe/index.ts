import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'npm:@supabase/supabase-js@2.39.3';
import Stripe from 'npm:stripe@14.14.0';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', {
  apiVersion: '2023-10-16',
});

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

const endpointSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET') ?? '';

serve(async (req) => {
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return new Response('No signature', { status: 400 });
  }

  try {
    const body = await req.text();
    const event = stripe.webhooks.constructEvent(body, signature, endpointSecret);

    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object;
        const orderId = paymentIntent.metadata.orderId;

        // Update order status
        await supabase
          .from('orders')
          .update({ status: 'paid' })
          .eq('id', orderId);

        // Update inventory
        const { data: orderItems } = await supabase
          .from('order_items')
          .select('*')
          .eq('order_id', orderId);

        if (orderItems) {
          for (const item of orderItems) {
            await supabase.rpc('decrease_inventory', {
              p_product_id: item.product_id,
              p_size: item.size,
              p_quantity: item.quantity,
            });
          }
        }

        break;
      }
      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object;
        const orderId = paymentIntent.metadata.orderId;

        await supabase
          .from('orders')
          .update({ status: 'cancelled' })
          .eq('id', orderId);

        break;
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }
});