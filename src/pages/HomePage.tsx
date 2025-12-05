import { useState, useEffect } from 'react';
import { ChevronRight, Star, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Product, Category } from '../types';

interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image_url: string;
  link_url: string;
  button_text: string;
}

export function HomePage({ onNavigate }: { onNavigate: (page: string, id?: string) => void }) {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (banners.length > 1) {
      const interval = setInterval(() => {
        setCurrentBanner((prev) => (prev + 1) % banners.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [banners.length]);

  async function fetchData() {
    try {
      const [bannersRes, categoriesRes, productsRes] = await Promise.all([
        supabase.from('banners').select('*').eq('is_active', true).order('sort_order'),
        supabase.from('categories').select('*').order('sort_order').limit(6),
        supabase
          .from('products')
          .select('*, images:product_images(*)')
          .eq('is_featured', true)
          .eq('is_active', true)
          .limit(8),
      ]);

      if (bannersRes.data) setBanners(bannersRes.data);
      if (categoriesRes.data) setCategories(categoriesRes.data);
      if (productsRes.data) setFeaturedProducts(productsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return (
    <div className="min-h-screen">
      <div className="relative h-[600px] overflow-hidden">
        {banners.length === 0 && (
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500">
            <div className="relative h-full flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-2xl animate-fade-in text-white">
                  <h1 className="text-6xl font-bold mb-6 leading-tight">
                    Transform Your Space
                  </h1>
                  <p className="text-2xl text-white/90 mb-8">
                    Discover our curated collection of premium furniture
                  </p>
                  <button
                    onClick={() => onNavigate('shop')}
                    className="bg-white text-amber-600 px-8 py-4 rounded-xl hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl text-lg font-medium inline-flex items-center gap-2"
                  >
                    Shop Now
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentBanner ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${banner.image_url})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
            </div>
            <div className="relative h-full flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-2xl animate-fade-in">
                  <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
                    {banner.title}
                  </h1>
                  <p className="text-2xl text-white/90 mb-8">
                    {banner.subtitle}
                  </p>
                  <button
                    onClick={() => onNavigate('shop')}
                    className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl text-lg font-medium inline-flex items-center gap-2"
                  >
                    {banner.button_text}
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {banners.length > 1 && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBanner(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentBanner
                    ? 'bg-white w-8'
                    : 'bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Shop by <span className="gradient-text">Category</span>
          </h2>
          <p className="text-xl text-gray-600">
            Find the perfect furniture for every room
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onNavigate('shop', category.id)}
              className="group relative overflow-hidden rounded-2xl h-64 hover-lift animate-fade-in"
            >
              <img
                src={category.image_url}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                <p className="text-white/90 mb-4">{category.description}</p>
                <div className="flex items-center gap-2 text-amber-400">
                  <span className="font-medium">Explore</span>
                  <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured <span className="gradient-text">Collection</span>
            </h2>
            <p className="text-xl text-gray-600">
              Handpicked pieces for discerning tastes
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
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
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-amber-600 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-amber-400 text-amber-400"
                        />
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

          <div className="text-center mt-12">
            <button
              onClick={() => onNavigate('shop')}
              className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl text-lg font-medium inline-flex items-center gap-2"
            >
              View All Products
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
