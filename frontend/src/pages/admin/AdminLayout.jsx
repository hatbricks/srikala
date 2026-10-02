import { useState, useEffect, useRef } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Seo from '../../components/Seo';
import GoogleSignInButton from '../../components/GoogleSignInButton';
import {
  DashboardIcon,
  OrdersIcon,
  ProductsIcon,
  CategoriesIcon,
  ReturnsIcon,
  CouponsIcon,
  HomeIcon,
  AboutIcon,
  ReviewsIcon,
  PolicyIcon,
  SettingsIcon,
  UsersIcon,
  LogoutIcon,
  CloseIcon,
  BackIcon,
} from '../../components/admin/AdminIcons';

const links = [
  { to: '/admin', label: 'Dashboard', end: true, icon: DashboardIcon },
  { to: '/admin/orders', label: 'Orders', icon: OrdersIcon },
  { to: '/admin/users', label: 'Customers', icon: UsersIcon },
  { to: '/admin/products', label: 'Products', icon: ProductsIcon },
  { to: '/admin/categories', label: 'Categories', icon: CategoriesIcon },
  { to: '/admin/returns', label: 'Returns & Refunds', icon: ReturnsIcon },
  { to: '/admin/coupons', label: 'Coupons', icon: CouponsIcon },
  { to: '/admin/home', label: 'Home Page CMS', icon: HomeIcon },
  { to: '/admin/about', label: 'About Page CMS', icon: AboutIcon },
  { to: '/admin/reviews', label: 'Reviews', icon: ReviewsIcon },
  { to: '/admin/cancellation-policy', label: 'Cancellation Policy', icon: PolicyIcon },
  { to: '/admin/settings', label: 'Store Settings', icon: SettingsIcon },
];

function AdminLoginGate() {
  const { login, googleLogin } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function handleGoogleCredential(credential) {
    setError('');
    setBusy(true);
    try {
      const res = await googleLogin(credential);
      if (!res?.user?.isAdmin) {
        setError(`Access Denied: The Google account (${res?.user?.email || 'used'}) is not configured as an administrator. Please sign in with your authorized admin account (ravichandratextiles39@gmail.com).`);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      const user = await login(form.email, form.password);
      if (!user.isAdmin) setError('This account does not have admin access.');
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="admin-gate">
      <Seo title="Admin Login" path="/admin" noindex />
      <div className="admin-gate-card">
        <div className="admin-brand">
          <img src="/images/monogram.png" alt="" className="brand-mark" /> Ravichandra <span className="cms-tag">CMS</span>
        </div>
        <h1>Admin Portal</h1>
        <p className="admin-gate-sub">1-Click passwordless sign in for store managers &amp; administrators.</p>

        {error && (
          <div className="gate-alert gate-alert-error">
            {error}
          </div>
        )}

        <div className="admin-google-wrap">
          <GoogleSignInButton
            adminMode={true}
            text="continue_with"
            onCredential={handleGoogleCredential}
            onError={setError}
          />
        </div>

        <div className="admin-access-note">
          <span>Authorized Admin: <strong>ravichandratextiles39@gmail.com</strong></span>
        </div>

        <details className="admin-legacy-toggle">
          <summary>Developer / Password fallback</summary>
          <form className="admin-legacy-form" onSubmit={handleSubmit}>
            <label>
              Email
              <input type="email" required value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
            </label>
            <label>
              Password
              <input type="password" required value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} />
            </label>
            <button type="submit" className="btn btn-outline btn-sm" disabled={busy}>{busy ? 'Verifying…' : 'Sign in with Password'}</button>
          </form>
        </details>

        <div className="security-notice">
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <span>Google OAuth 2.0 &amp; SSL Protected</span>
        </div>
      </div>

      <style>{`
        .admin-gate {
          min-height: 100vh;
          min-height: 100dvh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--stone-100);
          padding: 20px 16px;
          box-sizing: border-box;
        }
        .admin-gate-card {
          width: 100%;
          max-width: 380px;
          background: var(--paper);
          border-radius: var(--radius-md);
          padding: 30px 24px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.06);
          box-sizing: border-box;
        }
        .admin-gate-card h1 { font-size: 22px; margin: 0; color: var(--maroon-900); }
        .admin-gate-sub { font-size: 13px; color: var(--ink-500); margin: 0 0 4px; line-height: 1.4; }
        .admin-gate-card .admin-brand { color: var(--maroon-900); }
        .admin-google-wrap { width: 100%; display: flex; justify-content: center; margin: 8px 0; }
        .admin-access-note { font-size: 11.5px; color: var(--ink-500); text-align: center; background: #faf6f0; padding: 6px 10px; border-radius: 4px; border: 1px dashed #e8dec8; }
        .admin-legacy-toggle { margin-top: 6px; font-size: 11.5px; color: var(--ink-400); }
        .admin-legacy-toggle summary { cursor: pointer; user-select: none; }
        .admin-legacy-form { display: flex; flex-direction: column; gap: 10px; margin-top: 10px; padding-top: 10px; border-top: 1px solid var(--stone-200); }
        .admin-legacy-form label { display: flex; flex-direction: column; gap: 4px; font-size: 12px; color: var(--ink-600); }
        .admin-legacy-form input { padding: 9px 10px; border-radius: 4px; border: 1px solid var(--stone-300); font-size: 15px; }
        .gate-alert { font-size: 12px; line-height: 1.5; padding: 10px 12px; border-radius: var(--radius-sm); margin: 0; }
        .gate-alert-error { background: #ffebee; color: #c62828; border: 1px solid #ffcdd2; }
        .security-notice {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-size: 11.5px;
          color: var(--ink-400);
          margin-top: 6px;
        }
        @media (max-width: 480px) {
          .admin-gate-card { padding: 24px 18px; }
        }
      `}</style>
    </div>
  );
}

export default function AdminLayout() {
  const { user, loading, isAdmin, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const mainRef = useRef(null);

  // Lock root document scroll so the window never scrolls in admin mode
  useEffect(() => {
    const origHtmlOverflow = document.documentElement.style.overflow;
    const origBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = origHtmlOverflow;
      document.body.style.overflow = origBodyOverflow;
    };
  }, []);

  // Close drawer and reset right-side scroll position upon route change
  useEffect(() => {
    setMobileMenuOpen(false);
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }
  }, [location.pathname]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'hidden'; // preserve admin shell scroll lock
    }
  }, [mobileMenuOpen]);

  if (loading) return null;
  if (!user || !isAdmin) return <AdminLoginGate />;

  // Find active label for current page
  const currentLink = links.find((l) => (l.end ? location.pathname === l.to : location.pathname.startsWith(l.to)));
  const currentTitle = currentLink ? currentLink.label : 'Admin';

  return (
    <div className="admin-shell">
      <Seo title={`Admin · ${currentTitle}`} path="/admin" noindex />

      {/* Mobile Top App Bar (Sticky and Static at Top) */}
      <header className="admin-mobile-topbar" aria-label="Mobile Admin Navigation">
        <button
          type="button"
          className="admin-hamburger-btn"
          onClick={() => setMobileMenuOpen((o) => !o)}
          aria-label={mobileMenuOpen ? 'Close navigation drawer' : 'Open navigation drawer'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>

        <div className="admin-mobile-brand">
          <img src="/images/monogram-white.png" alt="" className="brand-mark" />
          <span className="admin-mobile-title">Ravichandra</span>
          <span className="cms-tag">CMS</span>
        </div>

        <div className="admin-mobile-actions">
          <NavLink to="/" className="admin-mobile-store-link" title="Open Public Storefront">
            <span>Store</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </NavLink>
        </div>
      </header>

      {/* Horizontal Quick-Scroll Strip on Mobile (Static beneath topbar) */}
      <nav className="admin-mobile-quicknav" aria-label="Quick Section Selector">
        <div className="quicknav-scroller">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) => 'quicknav-chip' + (isActive ? ' active' : '')}
            >
              <span className="chip-icon">{l.icon && <l.icon width={13} height={13} />}</span>
              <span className="chip-label">{l.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Off-Canvas Backdrop */}
      {mobileMenuOpen && (
        <div
          className="admin-backdrop"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Static Sidebar Navigation on Desktop / Fixed Sliding Drawer on Mobile */}
      <aside className={`admin-sidebar ${mobileMenuOpen ? 'open' : ''}`} aria-label="Main Navigation">
        <div className="admin-brand">
          <img src="/images/monogram-white.png" alt="" className="brand-mark" />
          <span>Ravichandra</span>
          <span className="cms-tag">CMS</span>
          <button
            type="button"
            className="drawer-close-btn"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <CloseIcon width={16} height={16} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) => 'admin-link' + (isActive ? ' active' : '')}
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="link-icon">{l.icon && <l.icon width={16} height={16} />}</span>
              <span className="link-label">{l.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button type="button" className="back-to-site logout-btn" onClick={logout}>
            <LogoutIcon width={15} height={15} />
            <span>Log out</span>
          </button>
          <NavLink to="/" className="back-to-site" onClick={() => setMobileMenuOpen(false)}>
            <BackIcon width={15} height={15} />
            <span>Back to storefront</span>
          </NavLink>
        </div>
      </aside>

      {/* Main Page Area: THE INDEPENDENTLY SCROLLING RIGHT SIDE */}
      <main className="admin-main" ref={mainRef}>
        <div className="admin-main-container">
          <Outlet />
        </div>
      </main>

      <style>{`
        /* Root Shell: Locks window so outer page never scrolls */
        .admin-shell {
          display: flex;
          flex-direction: row;
          height: 100vh;
          height: 100dvh;
          width: 100vw;
          max-width: 100%;
          overflow: hidden;
          background: var(--stone-100);
          position: relative;
        }

        /* Desktop Sidebar: COMPLETELY STATIC & FROZEN IN PLACE */
        .admin-sidebar {
          width: 250px;
          min-width: 250px;
          max-width: 250px;
          height: 100vh;
          height: 100dvh;
          flex: 0 0 250px;
          background: var(--maroon-950);
          color: var(--blush-300);
          padding: 28px 20px;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          overflow-x: hidden;
          box-sizing: border-box;
          z-index: 50;
          position: relative; /* Static, non-moving */
        }
        .admin-sidebar::-webkit-scrollbar {
          width: 5px;
        }
        .admin-sidebar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.15);
          border-radius: 4px;
        }

        .admin-brand {
          font-family: var(--font-display);
          font-size: 18px;
          color: var(--ivory);
          margin-bottom: 28px;
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }

        .drawer-close-btn {
          display: none;
          margin-left: auto;
          background: rgba(255,255,255,0.08);
          border: none;
          color: var(--ivory);
          width: 32px;
          height: 32px;
          border-radius: 50%;
          font-size: 16px;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .brand-mark {
          width: 26px;
          height: 26px;
          object-fit: contain;
          flex: 0 0 auto;
        }

        .cms-tag {
          font-family: var(--font-body);
          font-size: 10px;
          letter-spacing: 0.1em;
          border: 1px solid var(--gold-500);
          color: var(--gold-500);
          padding: 2px 6px;
          border-radius: 4px;
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 4px;
          flex: 1;
        }

        .admin-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          border-radius: var(--radius-sm);
          font-size: 13.5px;
          color: var(--blush-300);
          transition: background 0.15s ease, color 0.15s ease;
          text-decoration: none;
        }
        .admin-link:hover {
          background: rgba(255, 255, 255, 0.08);
          color: var(--ivory);
        }
        .admin-link.active {
          background: var(--maroon-800);
          color: var(--ivory);
          font-weight: 500;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        }
        .link-icon {
          font-size: 15px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          flex-shrink: 0;
        }
        .link-label {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .sidebar-footer {
          margin-top: auto;
          padding-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex-shrink: 0;
        }

        .back-to-site {
          font-size: 12.5px;
          color: var(--blush-300);
          opacity: 0.75;
          background: none;
          border: none;
          text-align: left;
          padding: 8px 10px;
          border-radius: 6px;
          cursor: pointer;
          transition: opacity 0.15s ease, background 0.15s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .back-to-site:hover {
          opacity: 1;
          background: rgba(255, 255, 255, 0.06);
          color: var(--ivory);
        }
        .logout-btn {
          color: #ff9999;
        }
        .logout-btn:hover {
          color: #ffb3b3;
          background: rgba(255, 100, 100, 0.12);
        }

        /* Main Content Container: THE ONLY ELEMENT THAT SCROLLS */
        .admin-main {
          flex: 1 1 0%;
          min-width: 0;
          height: 100vh;
          height: 100dvh;
          overflow-y: auto;
          overflow-x: hidden;
          -webkit-overflow-scrolling: touch;
          padding: 36px 40px;
          box-sizing: border-box;
        }
        .admin-main::-webkit-scrollbar {
          width: 7px;
        }
        .admin-main::-webkit-scrollbar-track {
          background: transparent;
        }
        .admin-main::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.18);
          border-radius: 4px;
        }
        .admin-main::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.3);
        }

        .admin-main-container {
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
          min-width: 0;
        }

        /* Mobile Top App Bar (Hidden on desktop) */
        .admin-mobile-topbar {
          display: none;
        }
        .admin-mobile-quicknav {
          display: none;
        }
        .admin-backdrop {
          display: none;
        }

        /* Responsive Breakpoints: Tablet & Mobile */
        @media (max-width: 860px) {
          .admin-shell {
            display: flex;
            flex-direction: column;
            height: 100vh;
            height: 100dvh;
            width: 100vw;
            overflow: hidden;
          }

          /* Static Mobile Topbar at top */
          .admin-mobile-topbar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 16px;
            background: var(--maroon-950);
            color: var(--ivory);
            z-index: 120;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            height: 54px;
            box-sizing: border-box;
            flex-shrink: 0;
          }

          .admin-hamburger-btn {
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.12);
            color: var(--ivory);
            width: 38px;
            height: 38px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            padding: 0;
            flex-shrink: 0;
          }
          .admin-hamburger-btn:active {
            background: rgba(255, 255, 255, 0.18);
          }

          .admin-mobile-brand {
            display: flex;
            align-items: center;
            gap: 8px;
            font-family: var(--font-display);
            font-size: 17px;
            color: var(--ivory);
          }
          .admin-mobile-brand .brand-mark {
            width: 22px;
            height: 22px;
          }
          .admin-mobile-brand .cms-tag {
            font-size: 9px;
            padding: 1px 5px;
          }

          .admin-mobile-store-link {
            display: inline-flex;
            align-items: center;
            gap: 5px;
            font-size: 12px;
            color: var(--blush-300);
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.12);
            padding: 6px 10px;
            border-radius: 6px;
            text-decoration: none;
            font-weight: 500;
          }
          .admin-mobile-store-link:active {
            background: rgba(255, 255, 255, 0.16);
            color: var(--ivory);
          }

          /* Static Mobile Horizontal Quick-Nav Scroller */
          .admin-mobile-quicknav {
            display: block;
            background: #fff;
            border-bottom: 1px solid var(--stone-200);
            z-index: 110;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
            flex-shrink: 0;
          }
          .quicknav-scroller {
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 8px 14px;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }
          .quicknav-scroller::-webkit-scrollbar {
            display: none;
          }
          .quicknav-chip {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 6px 12px;
            border-radius: 999px;
            background: var(--stone-100);
            color: var(--ink-700);
            font-size: 12px;
            font-weight: 500;
            white-space: nowrap;
            text-decoration: none;
            border: 1px solid transparent;
            flex-shrink: 0;
            transition: all 0.15s ease;
          }
          .quicknav-chip .chip-icon {
            font-size: 13px;
          }
          .quicknav-chip.active {
            background: var(--maroon-900);
            color: #fff;
            box-shadow: 0 2px 6px rgba(100, 20, 20, 0.25);
          }

          /* Off-Canvas Backdrop */
          .admin-backdrop {
            display: block;
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(2px);
            z-index: 190;
            animation: fadeIn 0.2s ease;
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          /* Off-Canvas Sliding Drawer */
          .admin-sidebar {
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            width: min(84vw, 310px);
            height: 100vh;
            height: 100dvh;
            z-index: 200;
            transform: translateX(-100%);
            transition: transform 0.26s cubic-bezier(0.16, 1, 0.3, 1);
            box-shadow: none;
            padding: 20px 16px 24px;
          }
          .admin-sidebar.open {
            transform: translateX(0);
            box-shadow: 6px 0 28px rgba(0, 0, 0, 0.5);
          }
          .drawer-close-btn {
            display: flex;
          }

          .admin-link {
            padding: 12px 14px;
            font-size: 14px;
            border-radius: 8px;
          }
          .admin-link .link-icon {
            font-size: 17px;
          }

          /* Main Mobile Content Area: Scrolls independently */
          .admin-main {
            flex: 1 1 auto;
            height: auto;
            min-height: 0;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
            padding: 16px 14px 44px;
            width: 100%;
            max-width: 100vw;
            box-sizing: border-box;
          }
        }

        /* Form elements font size on mobile to prevent iOS Safari auto-zoom */
        @media (max-width: 768px) {
          .admin-main input,
          .admin-main select,
          .admin-main textarea {
            font-size: 16px !important;
          }
        }
      `}</style>
    </div>
  );
}
