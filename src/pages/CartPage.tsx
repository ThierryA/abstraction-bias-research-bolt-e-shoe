import React from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import Button from '../components/ui/Button';

const CartPage: React.FC = () => {
  const { cart, cartTotal, dispatch } = useShop();

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const handleRemoveItem = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id } });
  };

  if (cart.length === 0) {
    return (
      <div className="pt-24 pb-16 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-sm text-center max-w-md mx-auto">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={32} className="text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-gray-600 mb-6">
            Looks like you haven't added any shoes to your cart yet.
          </p>
          <Link to="/shop">
            <Button>Start Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="hidden sm:grid grid-cols-12 p-4 border-b border-gray-200 bg-gray-50 text-sm font-medium text-gray-500">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              <div className="divide-y divide-gray-200">
                {cart.map((item) => (
                  <div key={item.id} className="p-4 sm:py-6 sm:grid sm:grid-cols-12 sm:gap-4 sm:items-center">
                    {/* Product */}
                    <div className="sm:col-span-6 flex items-center">
                      <Link to={`/product/${item.productId}`} className="shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover object-center rounded-md"
                        />
                      </Link>
                      <div className="ml-4">
                        <Link
                          to={`/product/${item.productId}`}
                          className="text-lg font-medium text-gray-900 hover:text-black"
                        >
                          {item.name}
                        </Link>
                        <p className="text-sm text-gray-500 mb-1">{item.brand}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <span className="mr-2">
                            Size: <span className="font-medium">{item.size}</span>
                          </span>
                          {item.color && (
                            <span>
                              Color: <span className="font-medium">{item.color}</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="sm:col-span-2 text-center mt-4 sm:mt-0">
                      <span className="sm:hidden font-medium text-gray-500">Price: </span>
                      <span className="font-medium">${item.price.toFixed(2)}</span>
                    </div>

                    {/* Quantity */}
                    <div className="sm:col-span-2 text-center mt-4 sm:mt-0">
                      <div className="flex items-center justify-center">
                        <button
                          type="button"
                          className="p-1 text-gray-500 hover:text-gray-700"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={16} />
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value) || 1)}
                          className="w-12 h-8 mx-1 text-center border border-gray-300 rounded-md"
                        />
                        <button
                          type="button"
                          className="p-1 text-gray-500 hover:text-gray-700"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Total & Remove */}
                    <div className="sm:col-span-2 text-right mt-4 sm:mt-0 flex items-center justify-between sm:justify-end">
                      <span className="sm:hidden font-medium text-gray-500">Total: </span>
                      <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                      <button
                        type="button"
                        className="p-1 ml-4 text-gray-400 hover:text-red-500"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Continue Shopping */}
            <div className="mt-6">
              <Link to="/shop" className="text-black font-medium hover:underline">
                &larr; Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-bold mb-4">Order Summary</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Taxes</span>
                    <span className="font-medium">Calculated at checkout</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between">
                      <span className="font-bold">Estimated Total</span>
                      <span className="font-bold">${cartTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <Button className="w-full mb-3">Proceed to Checkout</Button>
                <div className="text-center text-sm text-gray-500 mt-4">
                  <p>Secure Payment Processing</p>
                  <div className="flex justify-center space-x-2 mt-2">
                    <div className="bg-gray-200 text-xs px-2 py-1 rounded">Visa</div>
                    <div className="bg-gray-200 text-xs px-2 py-1 rounded">Mastercard</div>
                    <div className="bg-gray-200 text-xs px-2 py-1 rounded">PayPal</div>
                    <div className="bg-gray-200 text-xs px-2 py-1 rounded">Apple Pay</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;