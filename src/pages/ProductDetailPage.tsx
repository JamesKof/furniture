export function ProductDetailPage({ productId, onNavigate }: { productId: string; onNavigate: (page: string) => void }) {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <button onClick={() => onNavigate('shop')} className="text-blue-600 mb-4">← Back to Shop</button>
        <h1 className="text-3xl font-bold">Product Details</h1>
        <p className="text-gray-600 mt-2">Product ID: {productId}</p>
      </div>
    </div>
  );
}
