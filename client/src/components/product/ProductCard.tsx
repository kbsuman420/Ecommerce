import React from 'react';
import type { Product } from '../../types/product';
import { Star, ShoppingCart, Heart, Eye } from 'lucide-react';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const wishlisted = isInWishlist(product.id);

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col justify-between">
      {/* Product Image Box */}
      <div className="relative aspect-square w-full bg-slate-100 overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
          {discountPercent > 0 && (
            <span className="bg-rose-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-md shadow-xs">
              -{discountPercent}%
            </span>
          )}
          {product.isFeatured && (
            <span className="bg-amber-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-md shadow-xs">
              Hot
            </span>
          )}
        </div>

        {/* Action Buttons (Wishlist & Quick View) */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 opacity-90 group-hover:opacity-100 transition">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product);
            }}
            className={`p-2 rounded-full shadow-md transition backdrop-blur-md ${
              wishlisted
                ? 'bg-rose-500 text-white'
                : 'bg-white/90 text-slate-700 hover:text-rose-500 hover:bg-white'
            }`}
            title="Add to Wishlist"
          >
            <Heart className={`w-4 h-4 ${wishlisted ? 'fill-white' : ''}`} />
          </button>

          {onQuickView && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(product);
              }}
              className="p-2 bg-white/90 text-slate-700 hover:text-blue-600 hover:bg-white rounded-full shadow-md transition backdrop-blur-md"
              title="Quick Details"
            >
              <Eye className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Stock warning */}
        {product.stock <= 5 && product.stock > 0 && (
          <div className="absolute bottom-2 left-2 bg-amber-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-xs">
            Only {product.stock} left!
          </div>
        )}
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-medium text-slate-500">{product.categoryName}</span>
            <span className="text-[11px] text-slate-400">Sold by {product.sellerName}</span>
          </div>

          <h3
            className="text-sm font-semibold text-slate-900 line-clamp-2 leading-snug group-hover:text-blue-600 transition"
            title={product.title}
          >
            {product.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-1.5">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span className="text-xs font-bold text-slate-800 ml-1">
                {product.rating}
              </span>
            </div>
            <span className="text-xs text-slate-400">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Price and Add to Cart */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-extrabold text-slate-900">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-slate-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="flex items-center gap-1 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white text-xs font-semibold px-3 py-2 rounded-xl transition duration-200"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
