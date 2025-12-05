export function HomePage({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-96 bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">Transform Your Space</h1>
          <p className="text-xl mb-6">Premium furniture for modern living</p>
          <button
            onClick={() => onNavigate('shop')}
            className="bg-white text-gray-900 px-8 py-3 rounded-lg font-medium hover:bg-gray-100"
          >
            Shop Now
          </button>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">Welcome to LuxeFurniture</h2>
        <p className="text-center text-gray-600">Explore our collection of premium furniture</p>
      </div>
    </div>
  );
}
