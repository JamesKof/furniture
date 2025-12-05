import { useState, useEffect } from 'react';
import { DollarSign, Package, Users, TrendingUp, AlertTriangle } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
}

export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalCustomers: 0,
    lowStockProducts: 0,
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [lowStockItems, setLowStockItems] = useState<any[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  async function fetchDashboardData() {
    const [ordersRes, customersRes, productsRes, recentOrdersRes] = await Promise.all([
      supabase.from('orders').select('total, payment_status'),
      supabase.from('users').select('id', { count: 'exact', head: true }).eq('role', 'customer'),
      supabase.from('products').select('*').lte('stock_quantity', 'low_stock_threshold'),
      supabase
        .from('orders')
        .select('*, items:order_items(*)')
        .order('created_at', { ascending: false })
        .limit(5),
    ]);

    const revenue = ordersRes.data
      ?.filter(o => o.payment_status === 'paid')
      .reduce((sum, o) => sum + Number(o.total), 0) || 0;

    setStats({
      totalRevenue: revenue,
      totalOrders: ordersRes.data?.length || 0,
      totalCustomers: customersRes.count || 0,
      lowStockProducts: productsRes.data?.length || 0,
    });

    setRecentOrders(recentOrdersRes.data || []);
    setLowStockItems(productsRes.data || []);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-green-100 p-3 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">${stats.totalRevenue.toFixed(2)}</p>
            <p className="text-sm text-gray-600">Total Revenue</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
            <p className="text-sm text-gray-600">Total Orders</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.totalCustomers}</p>
            <p className="text-sm text-gray-600">Total Customers</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-red-100 p-3 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.lowStockProducts}</p>
            <p className="text-sm text-gray-600">Low Stock Items</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Orders</h2>
            <div className="space-y-4">
              {recentOrders.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No orders yet</p>
              ) : (
                recentOrders.map((order) => (
                  <div key={order.id} className="border-b border-gray-200 pb-4 last:border-0">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-medium text-gray-900">{order.order_number}</span>
                      <span className="font-bold text-gray-900">${order.total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">
                        {new Date(order.created_at).toLocaleDateString()}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Low Stock Alert</h2>
            <div className="space-y-4">
              {lowStockItems.length === 0 ? (
                <p className="text-gray-500 text-center py-8">All products well stocked</p>
              ) : (
                lowStockItems.map((product) => (
                  <div key={product.id} className="border-b border-gray-200 pb-4 last:border-0">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-medium text-gray-900">{product.name}</span>
                      <span className={`font-bold ${
                        product.stock_quantity === 0 ? 'text-red-600' : 'text-yellow-600'
                      }`}>
                        {product.stock_quantity} left
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      SKU: {product.sku}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
