import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import GoogleSignInButton from '../components/GoogleSignInButton';
import Seo from '../components/Seo';
import BRAND from '../config/brand';

export default function Login() {
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [form, setForm] = useState({ name: '', email: '', password: '', mobile: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const { login, signup, googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = location.state?.from || '/';

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      if (mode === 'login') {
        await login(form.email, form.password);
      } else {
        await signup(form);
      }
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function handleGoogleCredential(credential) {
    setError('');
    setBusy(true);
    try {
      const res = await googleLogin(credential);
      if (res?.needsProfile || res?.needsMobile) {
        navigate('/complete-profile', { replace: true, state: { from: redirectTo } });
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
      <Seo title={mode === 'login' ? 'Sign In | Sri Kala' : 'Create Account | Sri Kala'} path="/login" noindex />

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
                <span className="auth-showcase-badge">Sri Kala Privileges</span>
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

          {/* Right Column: Interactive Authentication Experience */}
          <div className="auth-form-panel">
            <div className="auth-form-header">
              <Link to="/" className="auth-logo-link" aria-label="Return to Sri Kala homepage">
                <img
                  src={BRAND.assets.logoLight || '/images/logo.png'}
                  alt={BRAND.name}
                  className="auth-brand-logo"
                  width="136"
                  height="42"
                />
              </Link>
              <p className="auth-header-sub">
                {mode === 'login' ? 'Welcome back to your silk haven' : 'Begin your journey with Sri Kala'}
              </p>
            </div>

            {/* Segmented Mode Switcher Tabs */}
            <div className="auth-tabs" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={mode === 'login'}
                className={`auth-tab ${mode === 'login' ? 'active' : ''}`}
                onClick={() => {
                  setMode('login');
                  setError('');
                }}
              >
                Sign In
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={mode === 'signup'}
                className={`auth-tab ${mode === 'signup' ? 'active' : ''}`}
                onClick={() => {
                  setMode('signup');
                  setError('');
                }}
              >
                Create Account
              </button>
            </div>

            {error && (
              <div className="auth-alert-error" role="alert">
                <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="auth-form" noValidate>
              {mode === 'signup' && (
                <div className="form-group">
                  <label htmlFor="auth-name">Full Name</label>
                  <div className="input-wrapper">
                    <svg className="field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    <input
                      id="auth-name"
                      type="text"
                      required
                      placeholder="e.g. Radhika Sharma"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      autoComplete="name"
                    />
                  </div>
                </div>
              )}

              <div className="form-group">
                <label htmlFor="auth-email">Email Address</label>
                <div className="input-wrapper">
                  <svg className="field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <input
                    id="auth-email"
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    autoComplete="email"
                  />
                </div>
              </div>

              {mode === 'signup' && (
                <div className="form-group">
                  <label htmlFor="auth-mobile">Phone Number (Optional)</label>
                  <div className="input-wrapper">
                    <svg className="field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <input
                      id="auth-mobile"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={form.mobile}
                      onChange={(e) => setForm((f) => ({ ...f, mobile: e.target.value }))}
                      autoComplete="tel"
                    />
                  </div>
                </div>
              )}

              <div className="form-group">
                <div className="label-row">
                  <label htmlFor="auth-password">Password</label>
                  {mode === 'login' && (
                    <Link to="/forgot-password" className="forgot-password-link">
                      Forgot password?
                    </Link>
                  )}
                </div>
                <div className="input-wrapper">
                  <svg className="field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <input
                    id="auth-password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                    autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" aria-hidden="true">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" aria-hidden="true">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <button type="submit" className="btn btn-auth-submit" disabled={busy}>
                {busy ? (
                  <span className="btn-spinner-wrap">
                    <span className="spinner-dot" />
                    <span>Please wait…</span>
                  </span>
                ) : (
                  <>
                    <span>{mode === 'login' ? 'Sign In to Sri Kala' : 'Create My Account'}</span>
                    <span className="btn-arrow" aria-hidden="true">→</span>
                  </>
                )}
              </button>
            </form>

            <div className="auth-divider">
              <span>or continue with</span>
            </div>

            <div className="google-auth-container">
              <GoogleSignInButton onCredential={handleGoogleCredential} onError={setError} />
            </div>

            <div className="auth-security-guarantee">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="14" height="14" aria-hidden="true">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span>256-Bit SSL Encrypted &amp; Secure Experience</span>
            </div>

            <div className="auth-footer-nav">
              <Link to="/" className="back-storefront-link">
                ← Return to Storefront
              </Link>
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
          margin-bottom: 8px;
        }

        .auth-header-sub {
          margin: 0;
          font-size: 13px;
          color: var(--ink-600, #735e59);
        }

        /* Segmented Tabs */
        .auth-tabs {
          display: flex;
          background: #f5ede2;
          padding: 4px;
          border-radius: 999px;
          margin-bottom: 24px;
          border: 1px solid rgba(197, 139, 56, 0.2);
        }

        .auth-tab {
          flex: 1;
          padding: 10px 16px;
          font-family: var(--font-body);
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.02em;
          border-radius: 999px;
          border: none;
          background: transparent;
          color: var(--ink-600, #735e59);
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .auth-tab.active {
          background: #ffffff;
          color: var(--brand-primary, #581e15);
          box-shadow: 0 3px 10px rgba(45, 12, 17, 0.1);
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

        /* Inputs & Form */
        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .label-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .form-group label {
          font-size: 12.5px;
          font-weight: 500;
          color: var(--brand-text, #220d0a);
          letter-spacing: 0.01em;
        }

        .forgot-password-link {
          font-size: 12px;
          color: var(--brand-secondary, #b0732e);
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s ease;
        }

        .forgot-password-link:hover {
          color: var(--brand-primary, #581e15);
          text-decoration: underline;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .field-icon {
          position: absolute;
          left: 14px;
          width: 17px;
          height: 17px;
          color: #9c8983;
          pointer-events: none;
          transition: color 0.2s ease;
        }

        .input-wrapper input {
          width: 100%;
          padding: 12px 14px 12px 42px;
          font-family: var(--font-body);
          font-size: 13.5px;
          color: var(--brand-text, #220d0a);
          background: #fbf9f6;
          border: 1px solid #e2d7c9;
          border-radius: 10px;
          outline: none;
          transition: border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
        }

        .input-wrapper input:focus {
          background: #ffffff;
          border-color: var(--brand-accent, #c58b38);
          box-shadow: 0 0 0 3px rgba(197, 139, 56, 0.16);
        }

        .input-wrapper input:focus + .field-icon,
        .input-wrapper:focus-within .field-icon {
          color: var(--brand-secondary, #b0732e);
        }

        .password-toggle-btn {
          position: absolute;
          right: 12px;
          background: transparent;
          border: none;
          padding: 6px;
          color: #9c8983;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
          transition: color 0.2s ease;
        }

        .password-toggle-btn:hover {
          color: var(--brand-primary, #581e15);
        }

        /* Submit Button */
        .btn-auth-submit {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          padding: 14px 24px;
          margin-top: 6px;
          border-radius: 999px;
          background: linear-gradient(135deg, var(--brand-primary, #581e15) 0%, #3e120c 100%);
          color: #ffffff;
          border: 1px solid rgba(251, 223, 162, 0.35);
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.03em;
          box-shadow: 0 8px 24px rgba(88, 30, 21, 0.22);
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .btn-auth-submit:hover:not(:disabled) {
          background: linear-gradient(135deg, var(--brand-hover, #6c241a) 0%, #4a150e 100%);
          box-shadow: 0 12px 28px rgba(88, 30, 21, 0.32);
          transform: translateY(-2px);
        }

        .btn-auth-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .btn-arrow {
          font-size: 16px;
          transition: transform 0.25s ease;
        }

        .btn-auth-submit:hover:not(:disabled) .btn-arrow {
          transform: translateX(4px);
        }

        .btn-spinner-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .spinner-dot {
          width: 12px;
          height: 12px;
          border: 2px solid rgba(255, 255, 255, 0.4);
          border-top-color: #ffffff;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Social Divider */
        .auth-divider {
          display: flex;
          align-items: center;
          gap: 14px;
          margin: 22px 0 16px;
          font-size: 11px;
          color: #9c8983;
          text-transform: uppercase;
          letter-spacing: 0.12em;
        }

        .auth-divider::before,
        .auth-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #e6dcce;
        }

        .google-auth-container {
          display: flex;
          justify-content: center;
          min-height: 44px;
        }

        .auth-security-guarantee {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin-top: 20px;
          font-size: 11px;
          color: #8c7670;
        }

        .auth-security-guarantee svg {
          color: var(--brand-secondary, #b0732e);
        }

        .auth-footer-nav {
          text-align: center;
          margin-top: 14px;
        }

        .back-storefront-link {
          font-size: 12.5px;
          color: #735e59;
          text-decoration: none;
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
          .auth-tab {
            padding: 8px 12px;
            font-size: 12px;
          }
          .input-wrapper input {
            padding: 11px 12px 11px 38px;
            font-size: 13px;
          }
        }
      `}</style>
    </div>
  );
}
