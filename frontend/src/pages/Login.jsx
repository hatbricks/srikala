import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import GoogleSignInButton from '../components/GoogleSignInButton';
import Seo from '../components/Seo';
import BRAND from '../config/brand';

export default function Login() {
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const fromPath = location.state?.from;
  const redirectTo = (fromPath && fromPath !== '/login' && fromPath !== '/complete-profile') ? fromPath : '/';

  async function handleGoogleCredential(credential) {
    setError('');
    setBusy(true);
    try {
      const res = await googleLogin(credential);
      // Admin redirect logic
      if (res?.user?.isAdmin) {
        if (redirectTo.startsWith('/admin')) {
          navigate(redirectTo, { replace: true });
        } else if (redirectTo !== '/') {
          navigate(redirectTo, { replace: true });
        } else {
          navigate('/admin', { replace: true });
        }
        return;
      }

      // New user needing profile / mobile number
      if (res?.needsProfile || res?.needsMobile) {
        navigate('/complete-profile', { replace: true, state: { from: redirectTo } });
      } else {
        // Returning user - instant direct redirect to home or destination
        navigate(redirectTo, { replace: true });
      }
    } catch (err) {
      console.error('[Login] Google auth error:', err);
      setError(err.message || 'Google sign-in could not be completed. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  // Developer fallback for password login if ever needed
  async function handleLegacySubmit(e) {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      const u = await login(form.email, form.password);
      if (u?.isAdmin && redirectTo === '/') {
        navigate('/admin', { replace: true });
      } else {
        navigate(redirectTo, { replace: true });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="auth-page">
      <Seo title={`Sign In | ${BRAND.name}`} path="/login" noindex />

      {/* Atmospheric ambient lighting */}
      <div className="auth-ambient-glow" aria-hidden="true" />

      <div className="container auth-container">
        <div className="auth-card-master">
          {/* Left Column: Royal Silk Heritage Showcase (Desktop) */}
          <div className="auth-showcase">
            <div className="auth-showcase-bg" />
            <div className="auth-showcase-overlay" />
            <div className="auth-showcase-content">
              <div className="auth-showcase-header">
                <img
                  src={BRAND.assets.monogramWhite || '/images/monogram-white.png'}
                  alt=""
                  className="auth-showcase-monogram"
                  width="44"
                  height="44"
                />
                <span className="auth-showcase-badge">Ravichandra Privileges</span>
              </div>

              <div className="auth-showcase-body">
                <h2 className="auth-showcase-title">
                  Where Heritage Weaves Meet Timeless Elegance
                </h2>
                <p className="auth-showcase-desc">
                  Sign in to explore private handloom collections, track bespoke saree orders, and enjoy member-exclusive previews.
                </p>

                <div className="auth-perks-list">
                  <div className="auth-perk-item">
                    <span className="auth-perk-icon">✦</span>
                    <div>
                      <strong>Handcrafted Authentic Silks</strong>
                      <p>Kanjivaram, Banarasi, and pure temple handlooms direct from master weavers.</p>
                    </div>
                  </div>
                  <div className="auth-perk-item">
                    <span className="auth-perk-icon">✦</span>
                    <div>
                      <strong>White-Glove Doorstep Delivery</strong>
                      <p>Inspected for weave density and delivered with reverent care across India.</p>
                    </div>
                  </div>
                  <div className="auth-perk-item">
                    <span className="auth-perk-icon">✦</span>
                    <div>
                      <strong>Dedicated Saree Concierge</strong>
                      <p>Personal assistance for bridal trousseaus, styling, and custom drape requests.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="auth-showcase-footer">
                <span className="auth-seal-icon">🏛</span>
                <span>Crafted with devotion since 1986</span>
              </div>
            </div>
          </div>

          {/* Right Column: 1-Click Passwordless Authentication */}
          <div className="auth-form-panel">
            <div className="auth-form-header">
              <Link to="/" className="auth-logo-link" aria-label={`Return to ${BRAND.name} homepage`}>
                <img
                  src={BRAND.assets.logoHorizontal || BRAND.assets.logoLight || '/images/logo.png'}
                  alt={BRAND.name}
                  className="auth-brand-logo"
                  width="170"
                  height="44"
                />
              </Link>
              <h1 className="auth-welcome-title">Sign In or Register</h1>
              <p className="auth-header-sub">
                Instant 1-click access with your Google account. Fast, secure, and 100% password-free.
              </p>
            </div>

            {error && (
              <div className="auth-alert-error" role="alert">
                <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <div className="auth-google-box">
              <div className="auth-google-cta">
                <GoogleSignInButton
                  text="continue_with"
                  onCredential={handleGoogleCredential}
                  onError={setError}
                />
              </div>

              {busy && (
                <div className="auth-busy-notice">
                  <span className="spinner-dot" />
                  <span>Signing in with Google, please wait…</span>
                </div>
              )}

              <div className="auth-flow-hints">
                <div className="auth-flow-hint">
                  <span className="hint-bullet">✓</span>
                  <span><strong>Returning Customers:</strong> Instantly logged in &amp; redirected to home or bag.</span>
                </div>
                <div className="auth-flow-hint">
                  <span className="hint-bullet">✓</span>
                  <span><strong>First-Time Visitors:</strong> Account created instantly; you&apos;ll be guided to enter delivery address next.</span>
                </div>
                <div className="auth-flow-hint">
                  <span className="hint-bullet">✓</span>
                  <span><strong>No Passwords:</strong> Safe, effortless authentication protected by Google.</span>
                </div>
              </div>
            </div>

            <div className="auth-security-guarantee">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="14" height="14" aria-hidden="true">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span>256-Bit SSL Encrypted &amp; Google OAuth 2.0 Protection</span>
            </div>

            {/* Collapsible legacy / developer password fallback */}
            <details className="auth-dev-details">
              <summary>Developer / Password Sign-in</summary>
              <form onSubmit={handleLegacySubmit} className="auth-legacy-form">
                <div className="legacy-group">
                  <label htmlFor="legacy-email">Email</label>
                  <input
                    id="legacy-email"
                    type="email"
                    required
                    placeholder="email@example.com"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  />
                </div>
                <div className="legacy-group">
                  <label htmlFor="legacy-password">Password</label>
                  <div className="legacy-input-wrapper">
                    <input
                      id="legacy-password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="Password"
                      value={form.password}
                      onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                    />
                    <button
                      type="button"
                      className="legacy-pwd-toggle"
                      onClick={() => setShowPassword((p) => !p)}
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>
                <button type="submit" className="btn btn-outline btn-sm" disabled={busy}>
                  {busy ? 'Verifying…' : 'Sign in with Password'}
                </button>
              </form>
            </details>

            <div className="auth-footer-nav">
              <button
                type="button"
                className="back-storefront-link"
                onClick={() => (window.history.state?.idx > 0 ? navigate(-1) : navigate('/'))}
              >
                ← Return to Storefront
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .auth-page {
          min-height: calc(100vh - 100px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 20px 80px;
          background: radial-gradient(circle at 50% 10%, #fffdf8 0%, #f7f1e6 50%, #ede3d4 100%);
          position: relative;
          overflow: hidden;
        }

        .auth-ambient-glow {
          position: absolute;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(197, 139, 56, 0.15) 0%, rgba(88, 30, 21, 0.05) 50%, transparent 70%);
          top: 10%;
          right: -100px;
          filter: blur(40px);
          pointer-events: none;
        }

        .auth-container {
          max-width: 1060px;
          width: 100%;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .auth-card-master {
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          background: #ffffff;
          border-radius: 24px;
          border: 1px solid rgba(197, 139, 56, 0.35);
          box-shadow:
            0 28px 70px rgba(45, 12, 17, 0.14),
            0 1px 3px rgba(0, 0, 0, 0.05),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);
          overflow: hidden;
        }

        /* --- Left Showcase Panel --- */
        .auth-showcase {
          position: relative;
          background: var(--maroon-950, #20080b);
          color: #ffffff;
          padding: 48px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow: hidden;
        }

        .auth-showcase-bg {
          position: absolute;
          inset: 0;
          background-image: url('/images/model-saree.png');
          background-size: cover;
          background-position: center 25%;
          opacity: 0.38;
          transform: scale(1.05);
          transition: transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .auth-card-master:hover .auth-showcase-bg {
          transform: scale(1.08);
        }

        .auth-showcase-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(32, 8, 11, 0.72) 0%,
            rgba(45, 12, 17, 0.85) 45%,
            rgba(20, 4, 7, 0.96) 100%
          );
        }

        .auth-showcase-content {
          position: relative;
          z-index: 2;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 36px;
        }

        .auth-showcase-header {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .auth-showcase-monogram {
          width: 40px;
          height: 40px;
          object-fit: contain;
          filter: drop-shadow(0 2px 8px rgba(197, 139, 56, 0.4));
        }

        .auth-showcase-badge {
          display: inline-block;
          font-family: var(--font-body);
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--brand-gold-light, #fbdfa2);
          font-weight: 600;
          padding: 4px 12px;
          border-radius: 999px;
          background: rgba(197, 139, 56, 0.18);
          border: 1px solid rgba(251, 223, 162, 0.3);
        }

        .auth-showcase-title {
          font-family: var(--font-heading, 'Marcellus', Georgia, serif);
          font-size: 32px;
          line-height: 1.2;
          color: #fffbf5;
          margin: 0 0 14px;
          font-weight: 400;
        }

        .auth-showcase-desc {
          font-size: 13.5px;
          line-height: 1.7;
          color: rgba(251, 245, 239, 0.85);
          margin: 0 0 28px;
        }

        .auth-perks-list {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .auth-perk-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }

        .auth-perk-icon {
          color: var(--brand-gold-light, #fbdfa2);
          font-size: 16px;
          line-height: 1.3;
          flex-shrink: 0;
        }

        .auth-perk-item strong {
          display: block;
          font-size: 13px;
          color: #ffffff;
          font-weight: 500;
          letter-spacing: 0.01em;
          margin-bottom: 2px;
        }

        .auth-perk-item p {
          margin: 0;
          font-size: 12px;
          line-height: 1.5;
          color: rgba(251, 245, 239, 0.7);
        }

        .auth-showcase-footer {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 11.5px;
          color: var(--brand-gold-light, #fbdfa2);
          opacity: 0.8;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 20px;
        }

        /* --- Right Form Panel --- */
        .auth-form-panel {
          padding: 44px 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: #ffffff;
        }

        .auth-form-header {
          text-align: center;
          margin-bottom: 24px;
        }

        .auth-brand-logo {
          height: 38px;
          width: auto;
          display: inline-block;
          margin-bottom: 12px;
        }

        .auth-welcome-title {
          font-family: var(--font-heading, 'Marcellus', Georgia, serif);
          font-size: 26px;
          color: var(--maroon-900, #581e15);
          margin: 0 0 8px;
          font-weight: 400;
        }

        .auth-header-sub {
          margin: 0;
          font-size: 13.5px;
          color: var(--ink-600, #735e59);
          line-height: 1.5;
        }

        /* Error Alert */
        .auth-alert-error {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 14px;
          background: #fdf2f2;
          border: 1px solid #f8b4b4;
          border-radius: var(--radius-sm, 8px);
          color: #9b1c1c;
          font-size: 13px;
          line-height: 1.4;
          margin-bottom: 20px;
        }

        .auth-alert-error svg {
          flex-shrink: 0;
        }

        /* Google Box */
        .auth-google-box {
          background: #fcf9f5;
          border: 1px solid rgba(197, 139, 56, 0.28);
          border-radius: 16px;
          padding: 28px 24px 22px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 18px;
          box-shadow: 0 4px 16px rgba(197, 139, 56, 0.06);
        }

        .auth-google-cta {
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .auth-busy-notice {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12.5px;
          color: var(--brand-secondary, #b0732e);
          font-weight: 500;
        }

        .spinner-dot {
          width: 12px;
          height: 12px;
          border: 2px solid rgba(176, 115, 46, 0.3);
          border-top-color: #b0732e;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .auth-flow-hints {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 8px;
          border-top: 1px solid rgba(197, 139, 56, 0.16);
          padding-top: 16px;
        }

        .auth-flow-hint {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 12px;
          line-height: 1.45;
          color: var(--ink-700, #5c4742);
        }

        .hint-bullet {
          color: #2e7d32;
          font-weight: 700;
          font-size: 11px;
          margin-top: 1px;
        }

        .auth-security-guarantee {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin-top: 20px;
          font-size: 11.5px;
          color: #8c7670;
        }

        .auth-security-guarantee svg {
          color: var(--brand-secondary, #b0732e);
        }

        /* Collapsible Legacy Details */
        .auth-dev-details {
          margin-top: 16px;
          font-size: 12px;
          color: var(--ink-400, #a89a95);
        }

        .auth-dev-details summary {
          cursor: pointer;
          user-select: none;
          text-align: center;
        }

        .auth-legacy-form {
          margin-top: 12px;
          padding: 16px;
          background: #faf6f0;
          border-radius: 8px;
          border: 1px solid #e8dec8;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .legacy-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .legacy-group label {
          font-size: 11.5px;
          color: var(--ink-600, #735e59);
        }

        .legacy-group input {
          padding: 8px 10px;
          border-radius: 4px;
          border: 1px solid #d5c8b5;
          font-size: 12.5px;
        }

        .legacy-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .legacy-input-wrapper input {
          width: 100%;
          padding-right: 50px;
        }

        .legacy-pwd-toggle {
          position: absolute;
          right: 8px;
          background: none;
          border: none;
          font-size: 11px;
          color: var(--ink-500, #8c7670);
          cursor: pointer;
        }

        .auth-footer-nav {
          text-align: center;
          margin-top: 20px;
        }

        .back-storefront-link {
          font-size: 12.5px;
          color: #735e59;
          text-decoration: none;
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          font-family: inherit;
          transition: color 0.2s ease;
        }

        .back-storefront-link:hover {
          color: var(--brand-primary, #581e15);
          text-decoration: underline;
        }

        /* --- Responsive Viewports --- */
        @media (max-width: 860px) {
          .auth-card-master {
            grid-template-columns: 1fr;
            max-width: 480px;
            margin: 0 auto;
          }
          .auth-showcase {
            display: none;
          }
          .auth-form-panel {
            padding: 36px 26px;
          }
        }

        @media (max-width: 480px) {
          .auth-page {
            padding: 30px 14px 60px;
          }
          .auth-card-master {
            border-radius: 18px;
          }
          .auth-form-panel {
            padding: 30px 18px;
          }
          .auth-brand-logo {
            height: 32px;
          }
          .auth-welcome-title {
            font-size: 22px;
          }
          .auth-google-box {
            padding: 20px 16px;
          }
        }
      `}</style>
    </div>
  );
}
