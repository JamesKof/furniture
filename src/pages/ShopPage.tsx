export function ShopPage({ onNavigate }: { onNavigate: (page: string) => void; categoryFilter?: string }) {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Shop Furniture</h1>
        <p className="text-gray-600">Browse our collection</p>
      </div>
    </div>
  );
}
