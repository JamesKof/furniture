import { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';

interface CookieConsentProps {
  onNavigate?: (page: string) => void;
}

export function CookieConsent({ onNavigate }: CookieConsentProps = {}) {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setTimeout(() => setShowConsent(true), 1000);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowConsent(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        <div className="glass rounded-2xl shadow-2xl p-6 border border-gray-200">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 bg-gradient-to-r from-amber-500 to-orange-500 p-3 rounded-xl">
              <Cookie className="w-6 h-6 text-white" />
            </div>

            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                We Value Your Privacy
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic.
                By clicking "Accept All", you consent to our use of cookies. View our{' '}
                <button
                  onClick={() => {
                    if (onNavigate) onNavigate('privacy');
                    setShowConsent(false);
                  }}
                  className="text-amber-600 hover:text-amber-700 font-medium underline"
                >
                  Privacy Policy
                </button>{' '}
                for more information.
              </p>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={acceptCookies}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-2.5 rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl text-sm font-medium"
                >
                  Accept All
                </button>
                <button
                  onClick={declineCookies}
                  className="bg-white text-gray-700 px-6 py-2.5 rounded-xl hover:bg-gray-50 transition-all border border-gray-300 text-sm font-medium"
                >
                  Decline
                </button>
              </div>
            </div>

            <button
              onClick={declineCookies}
              className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
