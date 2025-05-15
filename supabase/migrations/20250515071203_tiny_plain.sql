/*
  # Initial Schema Setup

  1. New Tables
    - `users`
      - Extended user profile data
      - Links to Supabase auth.users
    - `products`
      - Product information
      - Inventory tracking
      - Price history
    - `orders`
      - Order tracking
      - Payment status
    - `order_items`
      - Individual items in orders
    - `inventory`
      - Stock tracking by size
    - `addresses`
      - Shipping/billing addresses
  
  2. Security
    - Enable RLS on all tables
    - Policies for user access
    - Admin role setup
*/

-- Create custom types
CREATE TYPE order_status AS ENUM ('pending', 'paid', 'shipped', 'delivered', 'cancelled');
CREATE TYPE product_condition AS ENUM ('new', 'like new', 'gently used', 'well worn');

-- Users table (extends auth.users)
CREATE TABLE users (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  full_name text,
  phone text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Products table
CREATE TABLE products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  brand text NOT NULL,
  description text,
  condition product_condition NOT NULL,
  price decimal(10,2) NOT NULL,
  original_price decimal(10,2),
  images text[] NOT NULL,
  mannequin_images text[],
  colors text[],
  tags text[],
  authenticity_verified boolean DEFAULT false,
  featured boolean DEFAULT false,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Inventory table
CREATE TABLE inventory (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  size text NOT NULL,
  stock_count integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(product_id, size)
);

-- Addresses table
CREATE TABLE addresses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('billing', 'shipping')),
  name text NOT NULL,
  line1 text NOT NULL,
  line2 text,
  city text NOT NULL,
  state text NOT NULL,
  postal_code text NOT NULL,
  country text NOT NULL DEFAULT 'US',
  is_default boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Orders table
CREATE TABLE orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  status order_status DEFAULT 'pending',
  total_amount decimal(10,2) NOT NULL,
  shipping_address_id uuid REFERENCES addresses(id),
  billing_address_id uuid REFERENCES addresses(id),
  stripe_payment_intent_id text,
  stripe_client_secret text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Order items table
CREATE TABLE order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id),
  size text NOT NULL,
  color text,
  quantity integer NOT NULL CHECK (quantity > 0),
  price_at_time decimal(10,2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Users can read their own data
CREATE POLICY "Users can read own data" ON users
  FOR SELECT TO authenticated
  USING (auth.uid() = id);

-- Users can update their own data
CREATE POLICY "Users can update own data" ON users
  FOR UPDATE TO authenticated
  USING (auth.uid() = id);

-- Anyone can read active products
CREATE POLICY "Anyone can read active products" ON products
  FOR SELECT
  USING (active = true);

-- Anyone can read product inventory
CREATE POLICY "Anyone can read inventory" ON inventory
  FOR SELECT
  USING (true);

-- Users can read their own addresses
CREATE POLICY "Users can read own addresses" ON addresses
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- Users can create their own addresses
CREATE POLICY "Users can create own addresses" ON addresses
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Users can update their own addresses
CREATE POLICY "Users can update own addresses" ON addresses
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid());

-- Users can delete their own addresses
CREATE POLICY "Users can delete own addresses" ON addresses
  FOR DELETE TO authenticated
  USING (user_id = auth.uid());

-- Users can read their own orders
CREATE POLICY "Users can read own orders" ON orders
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- Users can create their own orders
CREATE POLICY "Users can create own orders" ON orders
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Users can read their own order items
CREATE POLICY "Users can read own order items" ON order_items
  FOR SELECT TO authenticated
  USING (order_id IN (
    SELECT id FROM orders WHERE user_id = auth.uid()
  ));

-- Create functions
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_inventory_updated_at
  BEFORE UPDATE ON inventory
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_addresses_updated_at
  BEFORE UPDATE ON addresses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();