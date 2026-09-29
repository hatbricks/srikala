import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Seo from '../../components/Seo';

const links = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/home', label: 'Home Page' },
  { to: '/admin/about', label: 'About Page' },
  { to: '/admin/categories', label: 'Categories' },
  { to: '/admin/products', label: 'Products' },
  { to: '/admin/orders', label: 'Orders' },
  { to: '/admin/returns', label: 'Returns & Refunds' },
  { to: '/admin/pickup-locations', label: 'Pickup Warehouses' },
  { to: '/admin/coupons', label: 'Coupons' },
  { to: '/admin/cancellation-policy', label: 'Cancellation Policy' },
  { to: '/admin/settings', label: 'Store Settings' },
  { to: '/admin/reviews', label: 'Reviews' },
  { to: '/admin/testimonials', label: 'Testimonials' },
];

function AdminLoginGate() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

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
      <form className="admin-gate-card" onSubmit={handleSubmit}>
        <div className="admin-brand">
          <img src="/images/monogram.png" alt="" className="brand-mark" /> Sri Kala <span className="cms-tag">CMS</span>
        </div>
        <h1>Admin Login</h1>
        <label>
          Email
          <input type="email" required value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
        </label>
        <label>
          Password
          <input type="password" required value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} />
        </label>
        {error && (
          <div className={`gate-alert ${error.includes('Security Alert') || error.includes('locked') ? 'gate-alert-security' : 'gate-alert-error'}`}>
            {error}
          </div>
        )}
        <button type="submit" className="btn btn-primary" disabled={busy}>{busy ? 'Please wait…' : 'Log in'}</button>
        <div className="security-notice">
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <span>Anti-Brute-Force Protected</span>
        </div>
      </form>

      <style>{`
        .admin-gate { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: var(--stone-100); }
        .admin-gate-card { width: 100%; max-width: 360px; background: var(--paper); border-radius: var(--radius-md); padding: 32px; display: flex; flex-direction: column; gap: 14px; box-shadow: 0 10px 30px rgba(0,0,0,0.06); }
        .admin-gate-card h1 { font-size: 20px; margin: 0 0 6px; color: var(--maroon-900); }
        .admin-gate-card .admin-brand { color: var(--maroon-900); }
        .admin-gate-card label { display: flex; flex-direction: column; gap: 6px; font-size: 12.5px; color: var(--ink-600); }
        .admin-gate-card input { padding: 11px 12px; border-radius: var(--radius-sm); border: 1px solid var(--stone-200); font-size: 13.5px; }
        .gate-alert { font-size: 12px; line-height: 1.5; padding: 10px 12px; border-radius: var(--radius-sm); margin: 0; }
        .gate-alert-error { background: #ffebee; color: #c62828; border: 1px solid #ffcdd2; }
        .gate-alert-security { background: #fff3e0; color: #d84315; border: 1px solid #ffcc80; font-weight: 500; }
        .security-notice {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-size: 11.5px;
          color: var(--ink-400);
          margin-top: 2px;
        }
      `}</style>
    </div>
  );
}

export default function AdminLayout() {
  const { user, loading, isAdmin, logout } = useAuth();

  if (loading) return null;
  if (!user || !isAdmin) return <AdminLoginGate />;

  return (
    <div className="admin-shell">
      <Seo title="Admin" path="/admin" noindex />
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <img src="/images/monogram-white.png" alt="" className="brand-mark" /> Sri Kala <span className="cms-tag">CMS</span>
        </div>
        <nav>
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) => 'admin-link' + (isActive ? ' active' : '')}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <button type="button" className="back-to-site logout-btn" onClick={logout}>Log out</button>
        <NavLink to="/" className="back-to-site">← Back to site</NavLink>
      </aside>

      <main className="admin-main">
        <Outlet />
      </main>

      <style>{`
        .admin-shell {
          display: grid;
          grid-template-columns: 240px 1fr;
          min-height: 100vh;
          background: var(--stone-100);
        }
        .admin-sidebar {
          background: var(--maroon-950);
          color: var(--blush-300);
          padding: 28px 20px;
          display: flex;
          flex-direction: column;
        }
        .admin-brand {
          font-family: var(--font-display);
          font-size: 18px;
          color: var(--ivory);
          margin-bottom: 34px;
          display: flex;
          align-items: center;
          gap: 8px;
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
        .admin-sidebar nav { display: flex; flex-direction: column; gap: 4px; }
        .admin-link {
          padding: 11px 14px;
          border-radius: var(--radius-sm);
          font-size: 13.5px;
          color: var(--blush-300);
        }
        .admin-link:hover { background: rgba(255,255,255,0.06); }
        .admin-link.active { background: var(--maroon-800); color: var(--ivory); }
        .back-to-site {
          margin-top: auto;
          font-size: 12.5px;
          color: var(--blush-300);
          opacity: 0.7;
          background: none;
          border: none;
          text-align: left;
        }
        .logout-btn { margin-top: 20px; }
        .back-to-site:hover { opacity: 1; }
        .admin-main { padding: 40px 44px; }
        @media (max-width: 860px) {
          .admin-shell { grid-template-columns: 1fr; }
          .admin-sidebar { flex-direction: row; align-items: center; padding: 16px 20px; gap: 20px; flex-wrap: wrap; }
          .admin-sidebar nav { flex-direction: row; flex-wrap: wrap; }
          .back-to-site { margin-top: 0; margin-left: auto; }
          .admin-main { padding: 24px 20px; }
        }
      `}</style>
    </div>
  );
}
