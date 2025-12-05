import { useState, useEffect } from 'react';
import { ShoppingCart, Heart, User, Menu, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { LoginModal } from '../auth/LoginModal';
import { RegisterModal } from '../auth/RegisterModal';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  onOpenCart: () => void;
}

export function Header({ onNavigate, currentPage, onOpenCart }: HeaderProps) {
  const { user, profile, signOut, isAdmin } = useAuth();
  const { itemCount } = useCart();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 z-50 transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />

      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'backdrop-blur-xl bg-white/80 shadow-lg'
          : 'bg-white/95 backdrop-blur-md'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => onNavigate('home')}
                className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent hover:from-amber-700 hover:to-orange-700 transition-all"
              >
                LuxeFurniture
              </button>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => onNavigate('home')}
                className={`${
                  currentPage === 'home' ? 'text-amber-600 font-medium' : 'text-gray-700'
                } hover:text-amber-600 transition-colors`}
              >
                Home
              </button>
              <button
                onClick={() => onNavigate('shop')}
                className={`${
                  currentPage === 'shop' ? 'text-amber-600 font-medium' : 'text-gray-700'
                } hover:text-amber-600 transition-colors`}
              >
                Shop
              </button>
              <button
                onClick={() => onNavigate('about')}
                className={`${
                  currentPage === 'about' ? 'text-amber-600 font-medium' : 'text-gray-700'
                } hover:text-amber-600 transition-colors`}
              >
                About
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className={`${
                  currentPage === 'contact' ? 'text-amber-600 font-medium' : 'text-gray-700'
                } hover:text-amber-600 transition-colors`}
              >
                Contact
              </button>
              {isAdmin && (
                <button
                  onClick={() => onNavigate('admin')}
                  className={`${
                    currentPage === 'admin' ? 'text-amber-600 font-medium' : 'text-gray-700'
                  } hover:text-amber-600 transition-colors`}
                >
                  Admin
                </button>
              )}
            </nav>

            <div className="flex items-center space-x-4">
              {user && (
                <>
                  <button
                    onClick={() => onNavigate('wishlist')}
                    className="text-gray-700 hover:text-amber-600 transition-colors p-2 hover:bg-amber-50 rounded-lg"
                  >
                    <Heart className="w-5 h-5" />
                  </button>
                  <button
                    onClick={onOpenCart}
                    className="text-gray-700 hover:text-amber-600 transition-colors relative p-2 hover:bg-amber-50 rounded-lg"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    {itemCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium shadow-lg">
                        {itemCount}
                      </span>
                    )}
                  </button>
                </>
              )}

              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-amber-600 transition-colors p-2 hover:bg-amber-50 rounded-lg"
                  >
                    <User className="w-5 h-5" />
                    <span className="hidden md:inline text-sm font-medium">{profile?.full_name}</span>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl py-2 border border-gray-100">
                      <button
                        onClick={() => {
                          onNavigate('account');
                          setShowUserMenu(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                      >
                        My Account
                      </button>
                      <button
                        onClick={() => {
                          onNavigate('orders');
                          setShowUserMenu(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                      >
                        Orders
                      </button>
                      <button
                        onClick={() => {
                          signOut();
                          setShowUserMenu(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setShowLogin(true)}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-2.5 rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl text-sm font-medium"
                >
                  Sign In
                </button>
              )}

              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden text-gray-700"
              >
                {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {showMobileMenu && (
          <div className="md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-xl">
            <div className="px-4 py-4 space-y-2">
              <button
                onClick={() => {
                  onNavigate('home');
                  setShowMobileMenu(false);
                }}
                className="block w-full text-left py-2 text-gray-700 hover:text-amber-600 transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => {
                  onNavigate('shop');
                  setShowMobileMenu(false);
                }}
                className="block w-full text-left py-2 text-gray-700 hover:text-amber-600 transition-colors"
              >
                Shop
              </button>
              <button
                onClick={() => {
                  onNavigate('about');
                  setShowMobileMenu(false);
                }}
                className="block w-full text-left py-2 text-gray-700 hover:text-amber-600 transition-colors"
              >
                About
              </button>
              <button
                onClick={() => {
                  onNavigate('contact');
                  setShowMobileMenu(false);
                }}
                className="block w-full text-left py-2 text-gray-700 hover:text-amber-600 transition-colors"
              >
                Contact
              </button>
              {isAdmin && (
                <button
                  onClick={() => {
                    onNavigate('admin');
                    setShowMobileMenu(false);
                  }}
                  className="block w-full text-left py-2 text-gray-700 hover:text-amber-600 transition-colors"
                >
                  Admin
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onSwitchToRegister={() => {
          setShowLogin(false);
          setShowRegister(true);
        }}
      />

      <RegisterModal
        isOpen={showRegister}
        onClose={() => setShowRegister(false)}
        onSwitchToLogin={() => {
          setShowRegister(false);
          setShowLogin(true);
        }}
      />
    </>
  );
}
