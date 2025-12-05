import { CheckCircle } from 'lucide-react';

interface OrderSuccessPageProps {
  orderId?: string;
  onNavigate: (page: string) => void;
}

export function OrderSuccessPage({ orderId, onNavigate }: OrderSuccessPageProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6 flex justify-center">
          <CheckCircle className="w-20 h-20 text-green-500" />
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Order Confirmed!
        </h1>

        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been successfully placed and payment confirmed.
        </p>

        {orderId && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-1">Order ID</p>
            <p className="font-mono text-lg font-medium text-gray-900">{orderId}</p>
          </div>
        )}

        <div className="space-y-3">
          <button
            onClick={() => onNavigate('orders')}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            View Order Details
          </button>

          <button
            onClick={() => onNavigate('shop')}
            className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
