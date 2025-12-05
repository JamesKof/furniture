import { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, Star, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Product, Category } from '../types';

interface ShopPageProps {
  onNavigate: (page: string, id?: string) => void;
  categoryFilter?: string;
}

export function ShopPage({ onNavigate, categoryFilter }: ShopPageProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryFilter || '');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (categoryFilter) {
      setSelectedCategory(categoryFilter);
    }
  }, [categoryFilter]);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, sortBy]);

  async function fetchCategories() {
    const { data } = await supabase.from('categories').select('*').order('sort_order');
    if (data) setCategories(data);
  }

  async function fetchProducts() {
    setLoading(true);
    let query = supabase
      .from('products')
      .select('*, images:product_images(*), category:categories(*)')
      .eq('is_active', true);

    if (selectedCategory) {
      query = query.eq('category_id', selectedCategory);
    }

    if (sortBy === 'price_asc') {
      query = query.order('price', { ascending: true });
    } else if (sortBy === 'price_desc') {
      query = query.order('price', { ascending: false });
    } else if (sortBy === 'name') {
      query = query.order('name', { ascending: true });
    } else {
      query = query.order('created_at', { ascending: false });
    }

    const { data } = await query;

    if (data) {
      let filtered = data;

      if (searchTerm) {
        filtered = filtered.filter((p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      filtered = filtered.filter(
        (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
      );

      setProducts(filtered);
    }

    setLoading(false);
  }

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedProducts = products.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen pt-20">
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-4">Shop Furniture</h1>
          <p className="text-xl text-white/90">Discover our curated collection of premium furniture</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              onKeyUp={fetchProducts}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-6 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white"
          >
            <option value="newest">Newest First</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
          </select>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all flex items-center gap-2 md:hidden"
          >
            <SlidersHorizontal className="w-5 h-5" />
            Filters
          </button>
        </div>

        <div className="flex gap-8">
          <div className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-64 flex-shrink-0`}>
            <div className="glass rounded-2xl p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Filters</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="md:hidden text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Categories</h4>
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        setSelectedCategory('');
                        setCurrentPage(1);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === ''
                          ? 'bg-amber-50 text-amber-600 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      All Products
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => {
                          setSelectedCategory(category.id);
                          setCurrentPage(1);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                          selectedCategory === category.id
                            ? 'bg-amber-50 text-amber-600 font-medium'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Price Range</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        placeholder="Min"
                      />
                      <span className="text-gray-500">-</span>
                      <input
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        placeholder="Max"
                      />
                    </div>
                    <button
                      onClick={() => {
                        fetchProducts();
                        setCurrentPage(1);
                      }}
                      className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all text-sm font-medium"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            {loading ? (
              <div className="text-center py-20">
                <div className="text-gray-500">Loading products...</div>
              </div>
            ) : displayedProducts.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-gray-500 text-lg mb-4">No products found</div>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('');
                    setPriceRange([0, 50000]);
                    fetchProducts();
                  }}
                  className="text-amber-600 hover:text-amber-700 font-medium"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                  {displayedProducts.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => onNavigate('product', product.id)}
                      className="group glass rounded-2xl overflow-hidden hover-lift animate-fade-in"
                    >
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={product.images?.[0]?.image_url || 'https://via.placeholder.com/400'}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        {product.sale_price && (
                          <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                            SALE
                          </div>
                        )}
                      </div>
                      <div className="p-6 text-left">
                        <div className="text-sm text-amber-600 font-medium mb-1">
                          {product.category?.name}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-amber-600 transition-colors">
                          {product.name}
                        </h3>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">(24)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {product.sale_price ? (
                            <>
                              <span className="text-2xl font-bold text-amber-600">
                                GH₵{product.sale_price.toLocaleString()}
                              </span>
                              <span className="text-lg text-gray-400 line-through">
                                GH₵{product.price.toLocaleString()}
                              </span>
                            </>
                          ) : (
                            <span className="text-2xl font-bold text-gray-900">
                              GH₵{product.price.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          currentPage === i + 1
                            ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                            : 'border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
