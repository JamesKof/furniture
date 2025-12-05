import { useState, useEffect } from 'react';
import { Heart, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';

interface WishlistPageProps {
  onNavigate: (page: string, id?: string) => void;
}

export function WishlistPage({ onNavigate }: WishlistPageProps) {
  const { addToCart } = useCart();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlist();
  }, []);

  async function fetchWishlist() {
    try {
      const { data } = await supabase
        .from('wishlist')
        .select(`
          *,
          product:products(
            *,
            images:product_images(*)
          )
        `)
        .order('created_at', { ascending: false });

      if (data) setItems(data);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setLoading(false);
    }
  }

  async function removeFromWishlist(wishlistId: string) {
    try {
      await supabase.from('wishlist').delete().eq('id', wishlistId);
      setItems(items.filter(item => item.id !== wishlistId));
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  }

  async function handleAddToCart(productId: string, wishlistId: string) {
    try {
      await addToCart(productId, 1);
      await removeFromWishlist(wishlistId);
      alert('Added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Wishlist</h1>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-gray-500">Loading...</div>
          </div>
        ) : items.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-medium text-gray-900 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-6">Save your favorite items here</p>
            <button
              onClick={() => onNavigate('shop')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => {
              const product = item.product;
              const mainImage = product.images?.[0]?.image_url || 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg';
              const price = product.sale_price || product.price;

              return (
                <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden group">
                  <button
                    onClick={() => onNavigate('product', product.id)}
                    className="block w-full"
                  >
                    <div className="relative h-64 bg-gray-100">
                      <img
                        src={mainImage}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  </button>

                  <div className="p-4">
                    <button
                      onClick={() => onNavigate('product', product.id)}
                      className="block w-full text-left mb-3"
                    >
                      <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-lg font-bold text-gray-900 mt-1">
                        ${price.toFixed(2)}
                      </p>
                    </button>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAddToCart(product.id, item.id)}
                        disabled={product.stock_quantity <= 0}
                        className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
                      >
                        {product.stock_quantity <= 0 ? 'Out of Stock' : 'Add to Cart'}
                      </button>
                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        className="p-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
