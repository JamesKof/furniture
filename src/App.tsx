import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { Header } from './components/layout/Header';
import { MiniCart } from './components/cart/MiniCart';
import { CookieConsent } from './components/CookieConsent';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import { AccountPage } from './pages/AccountPage';
import { OrdersPage } from './pages/OrdersPage';
import { WishlistPage } from './pages/WishlistPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { AboutPage } from './pages/AboutPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { ContactPage } from './pages/ContactPage';

function AppContent() {
  const { loading } = useAuth();
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [showCart, setShowCart] = useState(false);
  const [orderId, setOrderId] = useState<string>('');

  function handleNavigate(page: string, id?: string) {
    setCurrentPage(page);

    if (page === 'product' && id) {
      setSelectedProductId(id);
    } else if (page === 'shop' && id) {
      setCategoryFilter(id);
    } else if (page === 'order-success' && id) {
      setOrderId(id);
    }

    setShowCart(false);
    window.scrollTo(0, 0);
  }

  function handleCheckout() {
    setShowCart(false);
    setCurrentPage('checkout');
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500 text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header
        onNavigate={handleNavigate}
        currentPage={currentPage}
        onOpenCart={() => setShowCart(true)}
      />

      {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
      {currentPage === 'shop' && <ShopPage onNavigate={handleNavigate} categoryFilter={categoryFilter} />}
      {currentPage === 'product' && <ProductDetailPage productId={selectedProductId} onNavigate={handleNavigate} />}
      {currentPage === 'checkout' && <CheckoutPage onNavigate={handleNavigate} />}
      {currentPage === 'order-success' && <OrderSuccessPage orderId={orderId} onNavigate={handleNavigate} />}
      {currentPage === 'account' && <AccountPage onNavigate={handleNavigate} />}
      {currentPage === 'orders' && <OrdersPage onNavigate={handleNavigate} />}
      {currentPage === 'wishlist' && <WishlistPage onNavigate={handleNavigate} />}
      {currentPage === 'admin' && <AdminDashboard onNavigate={handleNavigate} />}
      {currentPage === 'about' && <AboutPage onNavigate={handleNavigate} />}
      {currentPage === 'privacy' && <PrivacyPage />}
      {currentPage === 'contact' && <ContactPage />}

      <MiniCart
        isOpen={showCart}
        onClose={() => setShowCart(false)}
        onCheckout={handleCheckout}
      />

      <CookieConsent onNavigate={handleNavigate} />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
