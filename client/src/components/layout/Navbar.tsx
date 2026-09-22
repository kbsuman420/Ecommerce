import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import {
  ShoppingCart,
  Heart,
  User,
  LogOut,
  Search,
  Store,
  ShieldCheck,
  Menu,
  X,
  Package,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { totalCartItems, wishlist } = useCart();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-md">
              P
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-slate-900">
                Paidal <span className="text-blue-600">Shop</span>
              </span>
              <span className="block text-[10px] text-slate-400 font-medium -mt-1">
                3-Role Marketplace
              </span>
            </div>
          </Link>

          {/* Search Bar (Desktop) */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-lg items-center relative"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products, brands, electronics..."
              className="w-full bg-slate-100 border border-slate-200 text-sm rounded-full pl-10 pr-24 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5" />
            <button
              type="submit"
              className="absolute right-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-1.5 rounded-full transition"
            >
              Search
            </button>
          </form>

          {/* Right Navigation & Controls */}
          <div className="flex items-center gap-3">
            {/* Panel Quick Links based on Role */}
            {user?.role === 'SELLER' && (
              <Link
                to="/seller/dashboard"
                className="hidden lg:flex items-center gap-1.5 text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-lg transition"
              >
                <Store className="w-4 h-4" /> Seller Dashboard
              </Link>
            )}

            {user?.role === 'ADMIN' && (
              <Link
                to="/admin/dashboard"
                className="hidden lg:flex items-center gap-1.5 text-xs font-semibold bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 px-3 py-1.5 rounded-lg transition"
              >
                <ShieldCheck className="w-4 h-4" /> Admin Console
              </Link>
            )}

            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              className="relative p-2 text-slate-600 hover:text-rose-600 hover:bg-slate-100 rounded-full transition"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Link */}
            <Link
              to="/cart"
              className="relative p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-full transition"
              title="Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalCartItems > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {totalCartItems}
                </span>
              )}
            </Link>

            {/* Auth section */}
            {isAuthenticated && user ? (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                <div className="hidden sm:flex flex-col text-right">
                  <span className="text-xs font-semibold text-slate-900 leading-tight">
                    {user.fname} {user.lname || ''}
                  </span>
                  <span className="text-[10px] text-blue-600 font-bold uppercase">
                    {user.role}
                  </span>
                </div>

                <div className="relative group">
                  <button className="flex items-center justify-center w-9 h-9 rounded-full bg-slate-100 border border-slate-200 text-slate-700 overflow-hidden font-bold hover:ring-2 hover:ring-blue-500 transition">
                    {user.profileImage ? (
                      <img
                        src={user.profileImage}
                        alt={user.fname}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-4 h-4" />
                    )}
                  </button>

                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 hidden group-hover:block transition z-50">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-medium text-slate-400">Signed in as</p>
                      <p className="text-xs font-bold text-slate-900 truncate">{user.email}</p>
                    </div>

                    {user.role === 'SELLER' && (
                      <Link
                        to="/seller/dashboard"
                        className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                      >
                        <Store className="w-4 h-4 text-emerald-600" /> Seller Dashboard
                      </Link>
                    )}

                    {user.role === 'ADMIN' && (
                      <Link
                        to="/admin/dashboard"
                        className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                      >
                        <ShieldCheck className="w-4 h-4 text-purple-600" /> Admin Console
                      </Link>
                    )}

                    <Link
                      to="/"
                      className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                    >
                      <Package className="w-4 h-4 text-blue-600" /> Browse Catalog
                    </Link>

                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50 text-left border-t border-slate-100"
                    >
                      <LogOut className="w-4 h-4" /> Log out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                <Link
                  to="/login"
                  className="text-xs font-semibold text-slate-700 hover:text-blue-600 px-3 py-2 rounded-lg hover:bg-slate-50 transition"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-2 rounded-lg shadow-sm transition"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search & Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-3">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-slate-100 border border-slate-200 text-sm rounded-lg pl-9 pr-4 py-2 focus:outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </form>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium text-slate-700 rounded-lg hover:bg-slate-100"
            >
              Home / Store
            </Link>
            <Link
              to="/cart"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium text-slate-700 rounded-lg hover:bg-slate-100"
            >
              Cart ({totalCartItems})
            </Link>
            {user?.role === 'SELLER' && (
              <Link
                to="/seller/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="col-span-2 px-3 py-2 text-sm font-semibold text-emerald-700 bg-emerald-50 rounded-lg"
              >
                Seller Dashboard
              </Link>
            )}
            {user?.role === 'ADMIN' && (
              <Link
                to="/admin/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="col-span-2 px-3 py-2 text-sm font-semibold text-purple-700 bg-purple-50 rounded-lg"
              >
                Admin Console
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
