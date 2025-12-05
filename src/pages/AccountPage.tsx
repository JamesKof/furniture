import { useState, useEffect } from 'react';
import { User, Package, Heart, MapPin } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Order } from '../types';

interface AccountPageProps {
  onNavigate: (page: string) => void;
}

export function AccountPage({ onNavigate }: AccountPageProps) {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [orders, setOrders] = useState<Order[]>([]);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    fetchOrders();
    fetchWishlistCount();
  }, []);

  async function fetchOrders() {
    const { data } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);

    if (data) setOrders(data);
  }

  async function fetchWishlistCount() {
    const { count } = await supabase
      .from('wishlist')
      .select('*', { count: 'exact', head: true });

    setWishlistCount(count || 0);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3 mb-2">
              <Package className="w-5 h-5 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">{orders.length}</span>
            </div>
            <p className="text-sm text-gray-600">Total Orders</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3 mb-2">
              <Heart className="w-5 h-5 text-red-600" />
              <span className="text-2xl font-bold text-gray-900">{wishlistCount}</span>
            </div>
            <p className="text-sm text-gray-600">Wishlist Items</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-6 py-4 font-medium text-sm ${
                  activeTab === 'profile'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Profile
              </button>
              <button
                onClick={() => onNavigate('orders')}
                className="px-6 py-4 font-medium text-sm text-gray-500 hover:text-gray-700"
              >
                Orders
              </button>
              <button
                onClick={() => onNavigate('wishlist')}
                className="px-6 py-4 font-medium text-sm text-gray-500 hover:text-gray-700"
              >
                Wishlist
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'profile' && (
              <div className="max-w-2xl">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Profile Information</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={profile?.full_name || ''}
                      disabled
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={profile?.email || ''}
                      disabled
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={profile?.phone || 'Not set'}
                      disabled
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Account Status
                    </label>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      profile?.is_active
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {profile?.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
