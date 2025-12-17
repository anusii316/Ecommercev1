import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Toast } from './components/Toast';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Wishlist } from './pages/Wishlist';
import { Checkout } from './pages/Checkout';
import { Success } from './pages/Success';
import { Account } from './pages/Account';
import { DashboardLayout } from './components/DashboardLayout';
import { DashboardOverview } from './pages/dashboard/DashboardOverview';
import { OrderHistory } from './pages/dashboard/OrderHistory';
import { OrderDetails } from './pages/dashboard/OrderDetails';
import { DashboardWishlist } from './pages/dashboard/DashboardWishlist';
import { AddressManagement } from './pages/dashboard/AddressManagement';
import { ProfileSettings } from './pages/dashboard/ProfileSettings';
import { NotificationsCenter } from './pages/dashboard/NotificationsCenter';
import { SpendingAnalytics } from './pages/dashboard/SpendingAnalytics';
import { useProductsStore } from './stores/productsStore';
import { products as libProducts } from './lib/products';
import { useAuthStore } from './stores/authStore';
import { useOrderStore } from './stores/orderStore';
import { useWishlistStore } from './stores/wishlistStore';
import { useCartStore } from './stores/cartStore';
import { useNotificationStore } from './stores/notificationStore';

function App() {
  const { setProducts } = useProductsStore();
  const { user, isAuthenticated } = useAuthStore();
  const { initializeUserData: initOrderData } = useOrderStore();
  const { initializeUserData: initWishlistData } = useWishlistStore();
  const { initializeUserData: initCartData } = useCartStore();
  const { initializeUserData: initNotificationData } = useNotificationStore();

  useEffect(() => {
    setProducts(libProducts);
  }, [setProducts]);

  useEffect(() => {
    if (isAuthenticated && user) {
      initOrderData(user.id, user.name);
      initWishlistData(user.id);
      initCartData(user.id);
      initNotificationData(user.id);
    } else {
      const guestUserId = 'guest';
      initWishlistData(guestUserId);
      initCartData(guestUserId);
      initNotificationData(guestUserId);
    }
  }, [isAuthenticated, user, initOrderData, initWishlistData, initCartData, initNotificationData]);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Toast />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<Success />} />
          <Route path="/account" element={<Account />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardOverview />} />
            <Route path="orders" element={<OrderHistory />} />
            <Route path="orders/:id" element={<OrderDetails />} />
            <Route path="wishlist" element={<DashboardWishlist />} />
            <Route path="addresses" element={<AddressManagement />} />
            <Route path="profile" element={<ProfileSettings />} />
            <Route path="notifications" element={<NotificationsCenter />} />
            <Route path="analytics" element={<SpendingAnalytics />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
