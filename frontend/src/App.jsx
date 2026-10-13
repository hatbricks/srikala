import { useState } from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import Footer from './components/Footer';
import RequireAuth from './components/RequireAuth';
import ScrollToTop from './components/ScrollToTop';
import SmoothScroll from './components/SmoothScroll';
import WhatsAppButton from './components/WhatsAppButton';
import ComingSoon from './components/ComingSoon';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { NavigationProvider } from './context/NavigationContext';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Orders from './pages/Orders';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import CompleteProfile from './pages/CompleteProfile';
import PrivacyPolicy from './pages/PrivacyPolicy';
import CancellationReturnsPolicy from './pages/CancellationReturnsPolicy';
import UserGuide from './pages/UserGuide';
import NotFound from './pages/NotFound';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminHome from './pages/admin/AdminHome';
import AdminAbout from './pages/admin/AdminAbout';
import AdminCoupons from './pages/admin/AdminCoupons';
import AdminCancellationPolicy from './pages/admin/AdminCancellationPolicy';
import AdminCategories from './pages/admin/AdminCategories';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminReturns from './pages/admin/AdminReturns';
import AdminPickupLocations from './pages/admin/AdminPickupLocations';
import AdminSettings from './pages/admin/AdminSettings';
import AdminReviews from './pages/admin/AdminReviews';
import AdminTestimonials from './pages/admin/AdminTestimonials';
import AdminUsers from './pages/admin/AdminUsers';

// ============================================================================
// TEMPORARY COMING SOON MODE
// Set COMING_SOON_ACTIVE = false to remove the coming soon layout when ready!
// ============================================================================
const COMING_SOON_ACTIVE = true;

function PublicSite() {
  const [previewBypassed, setPreviewBypassed] = useState(() => {
    return typeof window !== 'undefined' && sessionStorage.getItem('bypass_coming_soon') === '1';
  });

  const showComingSoon = COMING_SOON_ACTIVE && !previewBypassed;

  return (
    <>
      {showComingSoon && (
        <ComingSoon
          onPreview={() => {
            sessionStorage.setItem('bypass_coming_soon', '1');
            setPreviewBypassed(true);
          }}
        />
      )}

      {COMING_SOON_ACTIVE && previewBypassed && (
        <div style={{
          position: 'sticky',
          top: 0,
          zIndex: 99999,
          background: '#581e15',
          color: '#ffffff',
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '12.5px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.25)',
          gap: 12,
          flexWrap: 'wrap',
        }}>
          <span>
            🟡 <strong>Preview Mode Active:</strong> Storefront is currently in &ldquo;Coming Soon&rdquo; mode for visitors while items are being added.
          </span>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <Link to="/admin" style={{ color: '#fbdfa2', textDecoration: 'underline', fontWeight: 600 }}>
              Admin Panel (Add Items) →
            </Link>
            <button
              type="button"
              onClick={() => {
                sessionStorage.removeItem('bypass_coming_soon');
                setPreviewBypassed(false);
              }}
              style={{
                background: '#ffffff',
                color: '#581e15',
                border: 'none',
                borderRadius: '999px',
                padding: '4px 12px',
                fontSize: '11.5px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Exit Preview (Show Coming Soon)
            </button>
          </div>
        </div>
      )}

      <SmoothScroll />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/orders" element={<RequireAuth><Orders /></RequireAuth>} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<RequireAuth><Checkout /></RequireAuth>} />
          <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/complete-profile" element={<RequireAuth><CompleteProfile /></RequireAuth>} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/returns-and-cancellation" element={<CancellationReturnsPolicy />} />
          <Route path="/return-cancellation-policy" element={<CancellationReturnsPolicy />} />
          <Route path="/user-guide" element={<UserGuide />} />
          <Route path="/silk-guide" element={<UserGuide />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <BottomNav />
      <WhatsAppButton />
    </>
  );
}

export default function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) {
    return (
      <AuthProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="home" element={<AdminHome />} />
            <Route path="about" element={<AdminAbout />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="returns" element={<AdminReturns />} />
            <Route path="pickup-locations" element={<AdminPickupLocations />} />
            <Route path="coupons" element={<AdminCoupons />} />
            <Route path="cancellation-policy" element={<AdminCancellationPolicy />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="reviews" element={<AdminReviews />} />
            <Route path="testimonials" element={<AdminTestimonials />} />
            <Route path="*" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </AuthProvider>
    );
  }

  return (
    <AuthProvider>
      <CartProvider>
        <NavigationProvider>
          <PublicSite />
        </NavigationProvider>
      </CartProvider>
    </AuthProvider>
  );
}
