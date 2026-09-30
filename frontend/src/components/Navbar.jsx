import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../data/api';
import { formatINR } from '../data/store';
import BRAND from '../config/brand';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/#collections', label: 'Collections' },
  { to: '/products', label: 'Sarees' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [overHero, setOverHero] = useState(false);
  const [hasHero, setHasHero] = useState(false);
  const [query, setQuery] = useState('');
  const [searchProducts, setSearchProducts] = useState(null);
  const { count } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Close the account dropdown on any route change
  useEffect(() => {
    setAccountOpen(false);
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const heroEl = document.getElementById('page-hero');

    if (!heroEl || !('IntersectionObserver' in window)) {
      setHasHero(false);
      return undefined;
    }

    setHasHero(true);
    const navHeight = window.innerWidth <= 860 ? 62 : 72;
    const observer = new IntersectionObserver(
      ([entry]) => setOverHero(entry.isIntersecting),
      { rootMargin: `-${navHeight}px 0px 0px 0px`, threshold: 0 },
    );
    observer.observe(heroEl);
    return () => observer.disconnect();
  }, [location.pathname]);

  const navClass = hasHero ? (overHero ? 'is-transparent' : 'is-scrolled') : 'is-scrolled';

  function handleSearch(e) {
    e.preventDefault();
    goToSearch(query);
  }

  function goToSearch(term) {
    navigate(term.trim() ? `/products?search=${encodeURIComponent(term.trim())}` : '/products');
    setSearchOpen(false);
  }

  useEffect(() => {
    if (searchOpen && searchProducts === null) {
      api.getProducts().then(({ products }) => setSearchProducts(products)).catch(() => setSearchProducts([]));
    }
  }, [searchOpen, searchProducts]);

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q || !searchProducts) return [];
    return searchProducts.filter((p) => p.name.toLowerCase().includes(q)).slice(0, 5);
  }, [query, searchProducts]);

  function handleNavLinkClick(e, l) {
    if (l.to === '/#collections') {
      if (location.pathname === '/') {
        e.preventDefault();
        const el = document.getElementById('collections');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMenuOpen(false);
  }

  return (
    <header className={`navbar ${navClass}`}>
      <div className="container navbar-inner">
        <div className="nav-left">
          <button
            className="nav-toggle"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => { setMenuOpen((v) => !v); setSearchOpen(false); }}
          >
            <span />
            <span />
          </button>

          <Link to="/" className="brand-link" onClick={() => setMenuOpen(false)}>
            <img
              id="navBrandLogo"
              src={BRAND.assets.logoLight}
              alt={BRAND.name}
              className="brand-logo"
              width="180"
              height="48"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) => 'desktop-nav-link' + (isActive && !l.to.includes('#') ? ' active' : '')}
              onClick={(e) => handleNavLinkClick(e, l)}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-actions">
          <button
            className="icon-btn"
            aria-label="Search"
            aria-expanded={searchOpen}
            onClick={() => { setSearchOpen((v) => !v); setMenuOpen(false); setAccountOpen(false); }}
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" />
              <line x1="16.2" y1="16.2" x2="21" y2="21" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
          <div className="account-menu-wrap">
            <button
              className="icon-btn"
              aria-label="Account"
              aria-expanded={accountOpen}
              onClick={() => { setAccountOpen((v) => !v); setSearchOpen(false); setMenuOpen(false); }}
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="1.6" />
                <path d="M4.5 20c1.4-4 4.2-6 7.5-6s6.1 2 7.5 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>

            {accountOpen && (
              <>
                {createPortal(
                  <div className="account-menu-overlay" onClick={() => setAccountOpen(false)} aria-hidden="true" />,
                  document.body,
                )}
                <div className="account-menu">
                  {user ? (
                    <>
                      <p className="account-menu-greeting">Namaste, {user.name?.split(' ')[0] || 'Guest'}</p>
                      <Link to="/orders" className="account-menu-link" onClick={() => setAccountOpen(false)}>
                        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
                        My Orders
                      </Link>
                      <Link to="/profile" className="account-menu-link" onClick={() => setAccountOpen(false)}>
                        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="1.6" /><path d="M4.5 20c1.4-4 4.2-6 7.5-6s6.1 2 7.5 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
                        My Profile
                      </Link>
                      <button type="button" className="account-menu-link account-menu-logout" onClick={() => { logout(); setAccountOpen(false); }}>
                        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M15 17l5-5-5-5M20 12H9M12 19H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        Log Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" className="account-menu-link" onClick={() => setAccountOpen(false)}>
                        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M15 17l5-5-5-5M20 12H9M12 19H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" transform="rotate(180 12 12)" /></svg>
                        Log In / Sign Up
                      </Link>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
          <Link to="/cart" className="icon-btn cart-link" aria-label="Cart">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 6h2l1.6 10.2a2 2 0 0 0 2 1.7h7.4a2 2 0 0 0 2-1.6L20 8H6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="10" cy="21" r="1.3" fill="currentColor" />
              <circle cx="17" cy="21" r="1.3" fill="currentColor" />
            </svg>
            {count > 0 && <span className="cart-badge">{count}</span>}
          </Link>
        </div>
      </div>

      {searchOpen && (
        <>
          {createPortal(
            <button className="search-backdrop" aria-label="Close search" onClick={() => setSearchOpen(false)} />,
            document.body,
          )}
          <div className="search-bar">
            <form className="container search-form" onSubmit={handleSearch}>
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.4" />
                <line x1="14" y1="14" x2="18.5" y2="18.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              <input
                type="search"
                autoFocus
                placeholder="Search sarees..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search products"
              />
            </form>

            {query.trim() && (
              <div className="search-suggestions container">
                {suggestions.length > 0 ? (
                  <>
                    {suggestions.map((p) => (
                      <Link
                        key={p.id}
                        to={`/products/${p.id}`}
                        className="search-suggestion-item"
                        onClick={() => setSearchOpen(false)}
                      >
                        <img src={p.image} alt="" />
                        <span className="search-suggestion-name">{p.name}</span>
                        <span className="search-suggestion-price">{formatINR(p.price)}</span>
                      </Link>
                    ))}
                    <button type="button" className="search-see-all" onClick={() => goToSearch(query)}>
                      See all results for &ldquo;{query.trim()}&rdquo;
                    </button>
                  </>
                ) : (
                  <p className="search-no-results">No matches for &ldquo;{query.trim()}&rdquo; — press Enter to search anyway.</p>
                )}
              </div>
            )}
          </div>
        </>
      )}

      {menuOpen && createPortal(
        <button className="nav-backdrop" aria-label="Close menu" onClick={() => setMenuOpen(false)} />,
        document.body,
      )}

      <div className={`nav-popover ${menuOpen ? 'open' : ''}`}>
        <nav className="popover-links">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) => 'popover-link' + (isActive ? ' active' : '')}
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <style>{`
        .navbar {
          position: sticky;
          top: 0;
          left: 0;
          right: 0;
          width: 100%;
          z-index: 160;
          margin: 0;
          background: #FAF8F5;
          border-bottom: 1px solid rgba(197, 139, 56, 0.28);
          box-shadow: 0 4px 18px rgba(184, 134, 11, 0.07);
          transition: background 0.25s ease, box-shadow 0.25s ease;
        }
        .navbar.is-scrolled,
        .navbar.is-transparent {
          background: #FAF8F5;
          border-bottom: 1px solid rgba(197, 139, 56, 0.32);
          box-shadow: 0 6px 24px rgba(184, 134, 11, 0.09);
        }
        .navbar-inner {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 72px;
          padding: 0 24px;
        }
        .nav-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .brand-link {
          display: flex;
          align-items: center;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        .brand-link:hover {
          opacity: 0.92;
          transform: scale(1.02);
        }
        .brand-logo {
          height: 48px;
          width: auto;
          display: block;
          object-fit: contain;
        }

        /* Desktop Navigation Links */
        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 32px;
        }
        .desktop-nav-link {
          font-family: var(--font-body);
          font-size: 13.5px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #2c1810;
          position: relative;
          padding: 6px 0;
          transition: color 0.2s ease;
        }
        .desktop-nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: #b87d2b;
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 0.25s ease;
        }
        .desktop-nav-link:hover {
          color: #b87d2b;
        }
        .desktop-nav-link:hover::after,
        .desktop-nav-link.active::after {
          transform: scaleX(1);
        }
        .desktop-nav-link.active {
          color: #b87d2b;
        }

        .nav-toggle {
          display: none;
          flex-direction: column;
          justify-content: center;
          gap: 6px;
          background: none;
          border: none;
          padding: 8px;
          position: relative;
          z-index: 250;
        }
        .nav-toggle span {
          width: 22px;
          height: 2px;
          background: #2c1810;
          display: block;
          transition: transform 0.2s ease, background-color 0.2s ease;
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          z-index: 2;
        }
        .icon-btn {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          color: #2c1810;
          background: none;
          border: none;
          border-radius: 50%;
          transition: color 0.2s ease, background 0.2s ease;
        }
        .icon-btn svg { width: 22px; height: 22px; }
        .icon-btn:hover { color: #b87d2b; background: rgba(184, 125, 43, 0.08); }

        .account-menu-wrap { position: relative; }
        .account-menu-overlay {
          position: fixed;
          inset: 0;
          /* Must stay BELOW .navbar's own z-index (160). .navbar creates
             its own stacking context (position: fixed + z-index), so
             .account-menu's z-index: 200 only ever competes within that
             context — it can never out-rank an element like this one that
             lives outside it (portaled straight to <body>). If this value
             is ever >= .navbar's z-index, this transparent click-catcher
             ends up covering the whole dropdown and silently swallows
             every click on it (Log In / Sign Up, My Orders, My Profile,
             Log Out all stop working, menu just closes instead). */
          z-index: 145;
        }
        .account-menu {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          z-index: 200;
          min-width: 200px;
          background: var(--ivory);
          border-radius: 16px;
          box-shadow: 0 18px 40px rgba(36,26,23,0.22);
          padding: 10px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .account-menu-greeting {
          padding: 8px 12px 6px;
          font-size: 12px;
          font-weight: 600;
          color: var(--ink-400);
          margin: 0;
        }
        .account-menu-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 11px 12px;
          border-radius: 10px;
          font-family: var(--font-body);
          font-size: 14.5px;
          color: var(--ink-900);
          background: none;
          border: none;
          text-align: left;
          width: 100%;
          cursor: pointer;
        }
        .account-menu-link svg { width: 17px; height: 17px; flex: 0 0 auto; color: var(--ink-400); }
        .account-menu-link:hover { background: var(--blush-400); }
        .account-menu-logout { color: #a13a3a; }
        .account-menu-logout svg { color: #a13a3a; }
        .cart-badge {
          position: absolute;
          top: 3px;
          right: 3px;
          background: #b87d2b;
          color: #ffffff;
          font-size: 10px;
          font-weight: 600;
          min-width: 15px;
          height: 15px;
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 3px;
        }

        .search-bar {
          position: relative;
          z-index: 1;
          margin: 8px 16px 0;
          border-radius: 20px;
          background: #FFFFFF;
          border: 1px solid rgba(197, 139, 56, 0.35);
          box-shadow: 0 12px 28px rgba(184, 134, 11, 0.12);
          animation: searchDrop 0.25s ease;
        }
        @keyframes searchDrop {
          from { max-height: 0; opacity: 0; }
          to { max-height: 80px; opacity: 1; }
        }
        .search-form {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 24px;
        }
        .search-form svg { width: 17px; height: 17px; color: #b87d2b; flex: 0 0 auto; }
        .search-form input {
          background: none;
          border: none;
          outline: none;
          color: #2c1810;
          font-family: var(--font-body);
          font-size: 14px;
          width: 100%;
        }
        .search-form input::placeholder { color: #8c7365; opacity: 0.8; }

        .search-suggestions {
          background: #FAF8F5;
          border-top: 1px solid rgba(197, 139, 56, 0.15);
          border-radius: 0 0 20px 20px;
          padding: 6px 10px 10px;
          display: flex;
          flex-direction: column;
        }
        .search-suggestion-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 10px;
          border-radius: 12px;
          color: #2c1810;
        }
        .search-suggestion-item:hover { background: rgba(184, 125, 43, 0.08); }
        .search-suggestion-item img { width: 34px; height: 34px; border-radius: 8px; object-fit: cover; flex: 0 0 auto; }
        .search-suggestion-name { flex: 1; font-size: 13px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .search-suggestion-price { font-size: 12px; color: #8c7365; flex: 0 0 auto; }
        .search-see-all {
          background: none;
          border: none;
          text-align: left;
          padding: 10px;
          font-size: 12.5px;
          color: #b87d2b;
          font-weight: 600;
          cursor: pointer;
        }
        .search-no-results { padding: 10px; font-size: 12.5px; color: #8c7365; margin: 0; }

        .nav-backdrop {
          position: fixed;
          inset: 0;
          z-index: 150;
          background: rgba(36,26,23,0.25);
          border: none;
          padding: 0;
          cursor: default;
        }

        .search-backdrop {
          /* Transparent click-catcher, same reasoning as account-menu-overlay:
             must stay below .navbar's own z-index (160) — .navbar creates its
             own stacking context, so anything portaled outside it with a
             z-index >= 160 would sit on top of the search bar/suggestions
             instead of behind them and swallow every click on it. */
          position: fixed;
          inset: 0;
          z-index: 145;
          background: transparent;
          border: none;
          padding: 0;
          cursor: default;
        }

        .nav-popover {
          position: absolute;
          top: calc(100% + 10px);
          left: 8px;
          z-index: 200;
          min-width: 210px;
          background: #FAF8F5;
          border: 1px solid rgba(197, 139, 56, 0.25);
          border-radius: 18px;
          box-shadow: 0 18px 40px rgba(36,26,23,0.18);
          padding: 14px;
          transform-origin: top left;
          transform: scale(0.92) translateY(-6px);
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s ease;
        }
        .nav-popover.open {
          opacity: 1;
          visibility: visible;
          transform: scale(1) translateY(0);
        }
        .popover-links {
          display: flex;
          flex-direction: column;
        }
        .popover-link {
          padding: 15px 16px;
          border-radius: 12px;
          font-family: var(--font-body);
          font-size: 15px;
          color: #2c1810;
          transition: background 0.15s ease, color 0.15s ease;
        }
        .popover-link:hover { background: rgba(184, 125, 43, 0.08); }
        .popover-link.active { color: #b87d2b; font-weight: 600; background: rgba(184, 125, 43, 0.12); }

        /* Desktop only — same compact ivory box as mobile, just sized up:
           more padding, bigger text, more room per link. Mobile keeps the
           original smaller dimensions untouched. */
        @media (min-width: 861px) {
          .nav-popover {
            min-width: 280px;
            border-radius: 20px;
            padding: 16px;
          }
          .popover-link {
            padding: 15px 20px;
            font-size: 16px;
            border-radius: 12px;
          }
        }

        @media (max-width: 860px) {
          .navbar { margin: 0; }
          .navbar-inner { height: 62px; }
          .brand-logo { height: 38px; }
          .desktop-nav { display: none; }
          .nav-toggle { display: flex; }
          .icon-btn { width: 34px; height: 34px; }
          .icon-btn svg { width: 19px; height: 19px; }
          .nav-popover { left: 6px; min-width: 220px; }
          .search-bar { margin: 8px 12px 0; border-radius: 18px; }
        }
      `}</style>
    </header>
  );
}
