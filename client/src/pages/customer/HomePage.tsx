import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { mockCategories, mockProducts } from '../../services/mockData';
import { ProductCard } from '../../components/product/ProductCard';
import type { Product } from '../../types/product';
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  Tag,
  Store,
  ShieldCheck,
  UserCheck,
  Filter,
  CheckCircle2,
  X,
  Star,
  ShoppingCart,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const HomePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'all';
  const searchQuery = searchParams.get('search') || '';
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();

  const filteredProducts = useMemo(() => {
    return mockProducts.filter((p) => {
      const matchesCategory =
        activeCategory === 'all' ||
        mockCategories.find((c) => c.slug === activeCategory)?.id === p.categoryId;

      const matchesSearch =
        !searchQuery ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.categoryName.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const setCategoryFilter = (slug: string) => {
    if (slug === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', slug);
    }
    setSearchParams(searchParams);
  };

  const clearSearch = () => {
    searchParams.delete('search');
    setSearchParams(searchParams);
  };

  return (
    <div className="space-y-12 pb-16">
      {/* 1. Hero Showcase Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-900 text-white shadow-2xl p-8 sm:p-12 lg:p-16">
        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-blue-300 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            Next-Gen Multi-Role Marketplace Platform
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            Shop smart, sell effortlessly, <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-200 to-amber-300">
              manage everything.
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
            Explore thousands of premium products with unified authentication for Customers, Sellers, and Administrators. Experience how modern eCommerce architectures power real-world applications.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#products-section"
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-blue-600/30 flex items-center gap-2 transition"
            >
              Explore Products <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              to="/seller/dashboard"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-sm px-5 py-3.5 rounded-xl backdrop-blur-md transition flex items-center gap-2"
            >
              <Store className="w-4 h-4 text-emerald-400" /> Seller Center
            </Link>
            <Link
              to="/admin/dashboard"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-sm px-5 py-3.5 rounded-xl backdrop-blur-md transition flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-purple-400" /> Admin Console
            </Link>
          </div>
        </div>

        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 -mb-12 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* 2. 3-Role Architecture Explainer Banner */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="text-center max-w-2xl mx-auto mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Built for Learning</span>
          <h2 className="text-xl font-bold text-slate-900 mt-1">3 Connected Portals In One System</h2>
          <p className="text-xs text-slate-500 mt-1">
            Test and switch between all three user roles using the top demo bar or the login portal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 font-bold text-blue-900 text-sm mb-1.5">
                <UserCheck className="w-4 h-4 text-blue-600" /> Customer Experience
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Browse catalog, filter categories, search items, manage cart & wishlist, simulate instant checkout.
              </p>
            </div>
            <span className="mt-3 text-[11px] font-semibold text-blue-700 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Full storefront active
            </span>
          </div>

          <div className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 font-bold text-emerald-900 text-sm mb-1.5">
                <Store className="w-4 h-4 text-emerald-600" /> Seller Operations
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Add products, manage inventory stock, track seller revenue, view buyer order history.
              </p>
            </div>
            <Link
              to="/seller/dashboard"
              className="mt-3 text-[11px] font-semibold text-emerald-700 hover:underline flex items-center gap-1"
            >
              Open Seller Portal <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="bg-purple-50/60 border border-purple-100 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 font-bold text-purple-900 text-sm mb-1.5">
                <ShieldCheck className="w-4 h-4 text-purple-600" /> Admin Governance
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Review and approve seller products, manage user roles, oversee system-wide metrics.
              </p>
            </div>
            <Link
              to="/admin/dashboard"
              className="mt-3 text-[11px] font-semibold text-purple-700 hover:underline flex items-center gap-1"
            >
              Open Admin Portal <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Category Browser Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Tag className="w-5 h-5 text-blue-600" /> Featured Categories
            </h2>
            <p className="text-xs text-slate-500">Discover curated collections tailored for you</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {mockCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.slug)}
              className={`group text-left rounded-2xl p-3 border transition-all duration-200 flex flex-col items-center text-center ${
                activeCategory === cat.slug
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-102'
                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
              }`}
            >
              <div className="w-14 h-14 rounded-full overflow-hidden mb-2.5 bg-slate-100 shrink-0">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                />
              </div>
              <span className="text-xs font-semibold line-clamp-1">{cat.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* 4. Products Catalog Section */}
      <section id="products-section" className="space-y-6 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" /> Trending Products
            </h2>
            <p className="text-xs text-slate-500">
              Showing {filteredProducts.length} curated products
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setCategoryFilter('all')}
              className={`text-xs px-3 py-1.5 rounded-full font-medium transition ${
                activeCategory === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              All Items
            </button>
            {mockCategories.map((c) => (
              <button
                key={c.id}
                onClick={() => setCategoryFilter(c.slug)}
                className={`text-xs px-3 py-1.5 rounded-full font-medium transition ${
                  activeCategory === c.slug
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {/* Active Search notification */}
        {searchQuery && (
          <div className="bg-blue-50 border border-blue-200 text-blue-800 text-xs px-4 py-2.5 rounded-xl flex items-center justify-between">
            <span>
              Search results for <strong>"{searchQuery}"</strong> ({filteredProducts.length} items found)
            </span>
            <button
              onClick={clearSearch}
              className="text-blue-600 hover:text-blue-800 font-semibold underline flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" /> Clear search
            </button>
          </div>
        )}

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setSelectedProduct(p)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
            <Filter className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No products found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Try adjusting your category filter or search keywords to find what you are looking for.
            </p>
            <button
              onClick={() => {
                searchParams.delete('category');
                searchParams.delete('search');
                setSearchParams(searchParams);
              }}
              className="mt-4 bg-slate-900 text-white text-xs font-semibold px-4 py-2 rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* Quick View Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="aspect-square bg-slate-100 rounded-xl overflow-hidden">
                <img
                  src={selectedProduct.images[0]}
                  alt={selectedProduct.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                    {selectedProduct.categoryName}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 leading-snug">
                    {selectedProduct.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center text-amber-400">
                      <Star className="w-4 h-4 fill-amber-400" />
                      <span className="text-xs font-bold text-slate-800 ml-1">
                        {selectedProduct.rating}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400">
                      ({selectedProduct.reviewsCount} customer reviews)
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {selectedProduct.description}
                  </p>
                  <p className="text-xs text-slate-500">
                    Seller: <span className="font-semibold text-slate-700">{selectedProduct.sellerName}</span>
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-slate-900">
                      ${selectedProduct.price.toFixed(2)}
                    </span>
                    {selectedProduct.originalPrice && (
                      <span className="text-sm text-slate-400 line-through">
                        ${selectedProduct.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      addToCart(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-md transition"
                  >
                    <ShoppingCart className="w-4 h-4" /> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
