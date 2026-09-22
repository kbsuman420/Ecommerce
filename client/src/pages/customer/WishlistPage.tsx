import React from 'react';
import { useCart } from '../../context/CartContext';
import { ProductCard } from '../../components/product/ProductCard';
import { Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const WishlistPage: React.FC = () => {
  const { wishlist } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="max-w-md mx-auto my-16 text-center bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <Heart className="w-16 h-16 text-slate-300 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-slate-900">Your Wishlist is Empty</h2>
        <p className="text-xs text-slate-500 mt-1">
          Save your favorite items here while browsing our marketplace catalog.
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
    <div className="max-w-6xl mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900">My Saved Wishlist</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            You have {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((item) => (
          <ProductCard key={item.id} product={item.product} />
        ))}
      </div>
    </div>
  );
};
