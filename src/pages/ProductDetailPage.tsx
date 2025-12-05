import { useState, useEffect } from 'react';
import { ArrowLeft, ShoppingCart, Heart, MessageCircle, Star, Truck, Shield, RotateCcw } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import type { Product } from '../types';

interface ProductDetailPageProps {
  productId: string;
  onNavigate: (page: string, id?: string) => void;
}

export function ProductDetailPage({ productId, onNavigate }: ProductDetailPageProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  async function fetchProduct() {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*, images:product_images(*), category:categories(*)')
        .eq('id', productId)
        .single();

      if (error) {
        console.error('Error fetching product:', error);
        return;
      }

      if (data) {
        setProduct(data);
        if (data.category_id) {
          fetchRelatedProducts(data.category_id);
        }
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  }

  async function fetchRelatedProducts(categoryId: string) {
    try {
      const { data } = await supabase
        .from('products')
        .select('*, images:product_images(*)')
        .eq('category_id', categoryId)
        .eq('is_active', true)
        .neq('id', productId)
        .limit(4);

      if (data) setRelatedProducts(data);
    } catch (error) {
      console.error('Error fetching related products:', error);
    }
  }

  const handleAddToCart = async () => {
    if (!user) {
      alert('Please sign in to add items to cart');
      return;
    }

    if (!product) return;

    setIsAddingToCart(true);
    await addToCart(product.id, quantity, product.price);
    setIsAddingToCart(false);
  };

  const handleWhatsAppChat = () => {
    const message = `Hi, I'm interested in ${product?.name}`;
    window.open(`https://wa.me/233207407270?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (!product) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  const displayPrice = product.sale_price || product.price;
  const hasDiscount = !!product.sale_price;

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => onNavigate('shop')}
          className="flex items-center gap-2 text-gray-600 hover:text-amber-600 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Shop
        </button>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-4 animate-fade-in">
            <div className="glass rounded-2xl overflow-hidden p-4">
              <img
                src={product.images?.[selectedImage]?.image_url || 'https://via.placeholder.com/600'}
                alt={product.name}
                className="w-full h-96 object-cover rounded-xl"
              />
            </div>
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setSelectedImage(index)}
                    className={`glass rounded-xl overflow-hidden p-2 transition-all ${
                      selectedImage === index
                        ? 'ring-2 ring-amber-500'
                        : 'hover:ring-2 hover:ring-gray-300'
                    }`}
                  >
                    <img
                      src={image.image_url}
                      alt={image.alt_text}
                      className="w-full h-20 object-cover rounded-lg"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="animate-fade-in space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-amber-600 font-medium">
                  {product.category?.name}
                </span>
                {product.stock_quantity < product.low_stock_threshold && product.stock_quantity > 0 && (
                  <span className="text-sm bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
                    Only {product.stock_quantity} left
                  </span>
                )}
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-gray-600">(24 reviews)</span>
              </div>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-bold text-gray-900">
                  GH₵{displayPrice.toLocaleString()}
                </span>
                {hasDiscount && (
                  <>
                    <span className="text-2xl text-gray-400 line-through">
                      GH₵{product.price.toLocaleString()}
                    </span>
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      SAVE {Math.round(((product.price - displayPrice) / product.price) * 100)}%
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className="glass rounded-xl p-6">
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            <div className="glass rounded-xl p-6 space-y-4">
              <h3 className="font-semibold text-gray-900">Product Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                {product.material && (
                  <div>
                    <span className="text-gray-500">Material:</span>
                    <span className="text-gray-900 ml-2 font-medium">{product.material}</span>
                  </div>
                )}
                {product.color && (
                  <div>
                    <span className="text-gray-500">Color:</span>
                    <span className="text-gray-900 ml-2 font-medium">{product.color}</span>
                  </div>
                )}
                {product.dimensions && (
                  <div className="col-span-2">
                    <span className="text-gray-500">Dimensions:</span>
                    <span className="text-gray-900 ml-2 font-medium">
                      {product.dimensions.width}W x {product.dimensions.height}H x{' '}
                      {product.dimensions.depth}D cm
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-300 rounded-xl">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 hover:bg-gray-50 transition-colors"
                >
                  -
                </button>
                <span className="px-6 py-3 font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 hover:bg-gray-50 transition-colors"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={isAddingToCart || product.stock_quantity === 0}
                className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-4 rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl font-medium flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <ShoppingCart className="w-5 h-5" />
                {product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>

              <button className="p-4 border border-gray-300 rounded-xl hover:border-amber-500 hover:bg-amber-50 transition-all">
                <Heart className="w-5 h-5" />
              </button>
            </div>

            <button
              onClick={handleWhatsAppChat}
              className="w-full bg-green-500 text-white px-6 py-4 rounded-xl hover:bg-green-600 transition-all shadow-lg font-medium flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </button>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center">
                <Truck className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">Free Delivery</p>
                <p className="text-xs text-gray-500">On orders over GH₵1000</p>
              </div>
              <div className="text-center">
                <Shield className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">Warranty</p>
                <p className="text-xs text-gray-500">1 year coverage</p>
              </div>
              <div className="text-center">
                <RotateCcw className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">Easy Returns</p>
                <p className="text-xs text-gray-500">30 days return</p>
              </div>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Related <span className="gradient-text">Products</span>
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <button
                  key={relatedProduct.id}
                  onClick={() => onNavigate('product', relatedProduct.id)}
                  className="group glass rounded-2xl overflow-hidden hover-lift"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={relatedProduct.images?.[0]?.image_url || 'https://via.placeholder.com/400'}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6 text-left">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {relatedProduct.name}
                    </h3>
                    <div className="text-xl font-bold text-gray-900">
                      GH₵{(relatedProduct.sale_price || relatedProduct.price).toLocaleString()}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
