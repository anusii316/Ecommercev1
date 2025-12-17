import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, User, Menu, X, Store } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../stores/authStore';
import { useCartStore } from '../stores/cartStore';
import { useWishlistStore } from '../stores/wishlistStore';
import { SearchBar } from './SearchBar';
import { AuthModal } from './AuthModal';

export const Navbar = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();
  const { getTotalItems } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();

  const cartCount = getTotalItems();

  return (
    <>
      <nav className="sticky top-0 bg-white shadow-md z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-2">
              <Store className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">NexusMarket</span>
            </Link>

            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <SearchBar />
            </div>

            <div className="hidden md:flex items-center gap-6">
              <Link
                to="/shop"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Shop
              </Link>

              <Link to="/wishlist" className="relative">
                <Heart className="w-6 h-6 text-gray-700 hover:text-blue-600 transition-colors" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              <Link to="/cart" className="relative">
                <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-blue-600 transition-colors" />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </Link>

              {isAuthenticated ? (
                <div className="relative group">
                  <button className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors">
                    <User className="w-6 h-6" />
                    <span className="font-medium">Welcome, {user?.name}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <Link
                      to="/dashboard"
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/account"
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                    >
                      My Account
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  <User className="w-5 h-5" />
                  Sign In
                </button>
              )}
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          <div className="md:hidden pb-4">
            <SearchBar />
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-gray-50 border-t overflow-hidden"
            >
              <div className="px-4 py-4 space-y-4">
                <Link
                  to="/shop"
                  className="block text-gray-700 hover:text-blue-600 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Shop
                </Link>
                <Link
                  to="/wishlist"
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Heart className="w-5 h-5" />
                  Wishlist ({wishlistItems.length})
                </Link>
                <Link
                  to="/cart"
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <ShoppingCart className="w-5 h-5" />
                  Cart ({cartCount})
                </Link>
                {isAuthenticated ? (
                  <>
                    <div className="text-gray-700 font-medium">
                      Welcome, {user?.name}
                    </div>
                    <Link
                      to="/dashboard"
                      className="block text-gray-700 hover:text-blue-600"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/account"
                      className="block text-gray-700 hover:text-blue-600"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      My Account
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full text-left text-gray-700 hover:text-blue-600"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setIsAuthModalOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
                  >
                    Sign In
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
};
