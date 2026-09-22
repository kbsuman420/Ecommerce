import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, CheckCircle, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CartPage: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, cartTotalAmount } = useCart();
  const [checkoutDone, setCheckoutDone] = useState(false);

  const shipping = cartTotalAmount > 50 || cartItems.length === 0 ? 0 : 9.99;
  const grandTotal = cartTotalAmount + shipping;

  const handleCheckout = () => {
    setCheckoutDone(true);
    setTimeout(() => {
      clearCart();
    }, 1500);
  };

  if (checkoutDone) {
    return (
      <div className="max-w-md mx-auto my-16 text-center bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Order Placed Successfully!</h2>
        <p className="text-xs text-slate-500 mt-2">
          Thank you for your simulated purchase. Your order has been recorded into the system.
        </p>
        <Link
          to="/"
          onClick={() => setCheckoutDone(false)}
          className="mt-6 inline-flex items-center gap-2 bg-blue-600 text-white text-xs font-bold px-6 py-3 rounded-xl shadow-md"
        >
          Continue Shopping <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-md mx-auto my-16 text-center bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <ShoppingBag className="w-16 h-16 text-slate-300 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-slate-900">Your Cart is Empty</h2>
        <p className="text-xs text-slate-500 mt-1">
          Looks like you haven't added any products to your cart yet.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 bg-blue-600 text-white text-xs font-bold px-6 py-3 rounded-xl shadow-md hover:bg-blue-700 transition"
        >
          Explore Catalog <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8">
      <h1 className="text-2xl font-black text-slate-900 mb-6">Shopping Cart ({cartItems.length} items)</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Item List */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-4 justify-between"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <img
                  src={item.product.images[0]}
                  alt={item.product.title}
                  className="w-20 h-20 rounded-xl object-cover bg-slate-100 shrink-0"
                />
                <div>
                  <span className="text-[11px] font-semibold text-blue-600 uppercase">
                    {item.product.categoryName}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 line-clamp-1">
                    {item.product.title}
                  </h3>
                  <p className="text-xs text-slate-400">Sold by {item.product.sellerName}</p>
                  <p className="text-sm font-bold text-slate-900 mt-1">
                    ${item.product.price.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Quantity Controls and Remove */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 overflow-hidden">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className="p-1.5 text-slate-600 hover:bg-slate-200 transition"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-bold text-slate-800">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="p-1.5 text-slate-600 hover:bg-slate-200 transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right min-w-[70px]">
                  <span className="text-sm font-black text-slate-900">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center pt-2">
            <Link to="/" className="text-xs font-bold text-blue-600 hover:underline">
              ← Continue Shopping
            </Link>
            <button
              onClick={clearCart}
              className="text-xs font-semibold text-rose-600 hover:underline"
            >
              Clear Cart
            </button>
          </div>
        </div>

        {/* Order Summary Box */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 h-fit space-y-4 shadow-sm">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            Order Summary
          </h2>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span className="font-semibold text-slate-900">${cartTotalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Estimated Shipping</span>
              <span className="font-semibold text-slate-900">
                {shipping === 0 ? <span className="text-emerald-600">FREE</span> : `$${shipping.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Tax (Included)</span>
              <span className="font-semibold text-slate-900">$0.00</span>
            </div>

            <div className="border-t border-slate-100 pt-3 flex justify-between text-sm font-black text-slate-900">
              <span>Total</span>
              <span className="text-blue-600 text-lg">${grandTotal.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2 transition"
          >
            Proceed to Checkout <ArrowRight className="w-4 h-4" />
          </button>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> Safe & Secure 256-Bit Checkout
          </div>
        </div>
      </div>
    </div>
  );
};
