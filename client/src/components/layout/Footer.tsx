import React from 'react';
import { Shield, Truck, RotateCcw, Headphones, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 mt-20 border-t border-slate-800">
      {/* Feature highlights bar */}
      <div className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Free Fast Delivery</h4>
                <p className="text-xs text-slate-400">On all orders above $50</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Secure Payments</h4>
                <p className="text-xs text-slate-400">SSL Encrypted checkout</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">30-Day Easy Returns</h4>
                <p className="text-xs text-slate-400">No hassle refund policy</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">24/7 Live Support</h4>
                <p className="text-xs text-slate-400">Dedicated assistance</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                P
              </div>
              <span className="text-lg font-black text-white">
                Paidal <span className="text-blue-500">Shop</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              A modern multi-role eCommerce architecture built for learning. Includes complete customer storefront, dedicated seller operations center, and platform admin governance.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="px-2 py-1 bg-slate-800 rounded font-mono text-[11px] text-blue-400">Customer</span>
              <span className="px-2 py-1 bg-slate-800 rounded font-mono text-[11px] text-emerald-400">Seller</span>
              <span className="px-2 py-1 bg-slate-800 rounded font-mono text-[11px] text-purple-400">Admin</span>
            </div>
          </div>

          <div>
            <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Shop</h5>
            <ul className="space-y-2 text-xs">
              <li><Link to="/?category=electronics" className="hover:text-white transition">Electronics</Link></li>
              <li><Link to="/?category=fashion" className="hover:text-white transition">Fashion</Link></li>
              <li><Link to="/?category=home-living" className="hover:text-white transition">Home & Living</Link></li>
              <li><Link to="/cart" className="hover:text-white transition">Shopping Cart</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Role Portals</h5>
            <ul className="space-y-2 text-xs">
              <li><Link to="/seller/dashboard" className="hover:text-emerald-400 transition">Seller Center</Link></li>
              <li><Link to="/admin/dashboard" className="hover:text-purple-400 transition">Admin Console</Link></li>
              <li><Link to="/login" className="hover:text-white transition">Login Portal</Link></li>
              <li><Link to="/register" className="hover:text-white transition">Register Account</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Learning Stack</h5>
            <ul className="space-y-2 text-xs">
              <li className="text-slate-400">React 19 + TypeScript</li>
              <li className="text-slate-400">Tailwind CSS</li>
              <li className="text-slate-400">Prisma ORM + PostgreSQL</li>
              <li className="text-slate-400">Bun Runtime</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Paidal Shop Platform. Built for educational & learning purposes.</p>
          <p className="flex items-center gap-1">
            Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for learning Fullstack eCommerce
          </p>
        </div>
      </div>
    </footer>
  );
};
