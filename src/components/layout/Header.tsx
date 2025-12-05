import { useState } from 'react';
import { ShoppingCart, Heart, User, Search, Menu, X } from 'lucide-react';
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

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => onNavigate('home')}
                className="text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors"
              >
                LuxeFurniture
              </button>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => onNavigate('home')}
                className={`${
                  currentPage === 'home' ? 'text-blue-600' : 'text-gray-700'
                } hover:text-blue-600 transition-colors`}
              >
                Home
              </button>
              <button
                onClick={() => onNavigate('shop')}
                className={`${
                  currentPage === 'shop' ? 'text-blue-600' : 'text-gray-700'
                } hover:text-blue-600 transition-colors`}
              >
                Shop
              </button>
              {isAdmin && (
                <button
                  onClick={() => onNavigate('admin')}
                  className={`${
                    currentPage === 'admin' ? 'text-blue-600' : 'text-gray-700'
                  } hover:text-blue-600 transition-colors`}
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
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <Heart className="w-5 h-5" />
                  </button>
                  <button
                    onClick={onOpenCart}
                    className="text-gray-700 hover:text-blue-600 transition-colors relative"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    {itemCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
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
                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <User className="w-5 h-5" />
                    <span className="hidden md:inline text-sm">{profile?.full_name}</span>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border border-gray-100">
                      <button
                        onClick={() => {
                          onNavigate('account');
                          setShowUserMenu(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        My Account
                      </button>
                      <button
                        onClick={() => {
                          onNavigate('orders');
                          setShowUserMenu(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Orders
                      </button>
                      <button
                        onClick={() => {
                          signOut();
                          setShowUserMenu(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setShowLogin(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
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
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-4 space-y-2">
              <button
                onClick={() => {
                  onNavigate('home');
                  setShowMobileMenu(false);
                }}
                className="block w-full text-left py-2 text-gray-700 hover:text-blue-600"
              >
                Home
              </button>
              <button
                onClick={() => {
                  onNavigate('shop');
                  setShowMobileMenu(false);
                }}
                className="block w-full text-left py-2 text-gray-700 hover:text-blue-600"
              >
                Shop
              </button>
              {isAdmin && (
                <button
                  onClick={() => {
                    onNavigate('admin');
                    setShowMobileMenu(false);
                  }}
                  className="block w-full text-left py-2 text-gray-700 hover:text-blue-600"
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
