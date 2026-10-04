import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNavigationStack } from '../context/NavigationContext';
import Seo from '../components/Seo';
import BRAND from '../config/brand';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry',
];

export default function CompleteProfile() {
  const { user, completeProfile, defaultAddress } = useAuth();
  const [form, setForm] = useState({
    name: '',
    mobile: '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
  });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const { goBack } = useNavigationStack();
  const navigate = useNavigate();
  const location = useLocation();
  const fromPath = location.state?.from;
  const redirectTo = (fromPath && fromPath !== '/login' && fromPath !== '/complete-profile') ? fromPath : '/';

  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        name: user.name || '',
        mobile: user.mobile || '',
        line1: defaultAddress?.line1 || prev.line1,
        line2: defaultAddress?.line2 || prev.line2,
        city: defaultAddress?.city || prev.city,
        state: defaultAddress?.state || prev.state,
        pincode: defaultAddress?.pincode || prev.pincode,
        country: defaultAddress?.country || 'India',
      }));
    }
  }, [user, defaultAddress]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.mobile.trim() || !form.line1.trim() || !form.city.trim() || !form.state.trim() || !form.pincode.trim()) {
      setError('Please fill in all mandatory fields.');
      return;
    }
    const cleanPincode = form.pincode.trim();
    if (!/^[1-9][0-9]{5}$/.test(cleanPincode)) {
      setError('Please enter a valid 6-digit Indian pincode.');
      return;
    }
    const cleanMobile = form.mobile.trim().replace(/[^0-9]/g, '');
    if (cleanMobile.length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    setError('');
    setBusy(true);
    try {
      await completeProfile({
        ...form,
        mobile: cleanMobile.slice(-10),
        pincode: cleanPincode,
      });
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.message || 'Failed to save profile. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  const firstName = user?.name ? user.name.split(' ')[0] : '';

  return (
    <div className="auth-page">
      <Seo title="Complete Your Profile" path="/complete-profile" noindex />

      <div className="auth-ambient-glow" aria-hidden="true" />

      <div className="container auth-wrap">
        <div className="auth-card complete-profile-card">
          <div className="profile-header">
            <span className="profile-eyebrow">Complete Your Profile</span>
            <h1 className="profile-title">Welcome{firstName ? `, ${firstName}` : ''}!</h1>
            <p className="profile-sub">
              Please provide your contact number and primary delivery address. This information will be saved securely for quick, seamless checkouts and delivery tracking.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form" noValidate>
            <div className="form-row two-col">
              <div className="field-group">
                <label htmlFor="prof-name">Full Name <span className="req">*</span></label>
                <input
                  id="prof-name"
                  type="text"
                  required
                  placeholder="e.g. Rohith Reddy Chappidi"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                />
              </div>

              <div className="field-group">
                <label htmlFor="prof-mobile">Mobile Number <span className="req">*</span></label>
                <div className="input-prefix-wrap">
                  <span className="input-prefix">+91</span>
                  <input
                    id="prof-mobile"
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="9876543210"
                    value={form.mobile.replace(/^\+?91/, '').trim()}
                    onChange={(e) => setForm((f) => ({ ...f, mobile: e.target.value.replace(/[^0-9]/g, '') }))}
                  />
                </div>
              </div>
            </div>

            <div className="field-group">
              <label htmlFor="prof-line1">Address Line 1 (House No, Building, Street) <span className="req">*</span></label>
              <input
                id="prof-line1"
                type="text"
                required
                placeholder="e.g. Flat 402, Royal Palms, Temple Street"
                value={form.line1}
                onChange={(e) => setForm((f) => ({ ...f, line1: e.target.value }))}
              />
            </div>

            <div className="field-group">
              <label htmlFor="prof-line2">Address Line 2 (Area, Landmark)</label>
              <input
                id="prof-line2"
                type="text"
                placeholder="e.g. Near Heritage Gate, Opp. SBI Bank"
                value={form.line2}
                onChange={(e) => setForm((f) => ({ ...f, line2: e.target.value }))}
              />
            </div>

            <div className="form-row three-col">
              <div className="field-group">
                <label htmlFor="prof-city">City <span className="req">*</span></label>
                <input
                  id="prof-city"
                  type="text"
                  required
                  placeholder="e.g. Bengaluru"
                  value={form.city}
                  onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                />
              </div>

              <div className="field-group">
                <label htmlFor="prof-state">State <span className="req">*</span></label>
                <select
                  id="prof-state"
                  required
                  value={form.state}
                  onChange={(e) => setForm((f) => ({ ...f, state: e.target.value }))}
                >
                  <option value="">Select State</option>
                  {INDIAN_STATES.map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              <div className="field-group">
                <label htmlFor="prof-pincode">Pincode <span className="req">*</span></label>
                <input
                  id="prof-pincode"
                  type="text"
                  required
                  maxLength={6}
                  placeholder="6-digit PIN"
                  value={form.pincode}
                  onChange={(e) => setForm((f) => ({ ...f, pincode: e.target.value.replace(/[^0-9]/g, '') }))}
                />
              </div>
            </div>

            <div className="field-group">
              <label htmlFor="prof-country">Country</label>
              <input
                id="prof-country"
                type="text"
                value="India"
                disabled
              />
            </div>

            {error && (
              <div className="auth-alert-error" role="alert">
                <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <button type="submit" className="btn btn-primary submit-btn" disabled={busy}>
              {busy ? (
                <>
                  <span className="submit-spinner" />
                  <span>Saving Profile…</span>
                </>
              ) : (
                'Save & Continue'
              )}
            </button>
          </form>

          <div className="profile-footer-nav">
            <button
              type="button"
              className="back-storefront-link"
              onClick={() => goBack('/')}
            >
              ← Return to Storefront
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .auth-page {
          min-height: calc(100vh - 100px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px 20px 72px;
          background: radial-gradient(circle at 50% 10%, #fffdf8 0%, #f7f1e6 50%, #ede3d4 100%);
          position: relative;
          overflow: hidden;
        }

        .auth-ambient-glow {
          position: absolute;
          width: 550px;
          height: 550px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(197, 139, 56, 0.16) 0%, rgba(88, 30, 21, 0.05) 50%, transparent 70%);
          top: 5%;
          right: -80px;
          filter: blur(44px);
          pointer-events: none;
        }

        .auth-wrap {
          max-width: 680px;
          width: 100%;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .complete-profile-card {
          width: 100%;
          background: #ffffff;
          border: 1px solid rgba(197, 139, 56, 0.32);
          border-radius: 24px;
          padding: 40px 44px;
          box-shadow:
            0 24px 60px rgba(45, 12, 17, 0.12),
            0 1px 3px rgba(0, 0, 0, 0.04),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);
          box-sizing: border-box;
        }

        .profile-header {
          margin-bottom: 26px;
        }

        .profile-eyebrow {
          display: inline-block;
          font-family: var(--font-body);
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--gold-600, #b0732e);
          font-weight: 600;
          margin-bottom: 8px;
        }

        .profile-title {
          font-family: var(--font-display, 'Marcellus', Georgia, serif);
          font-size: 28px;
          color: var(--maroon-900, #581e15);
          margin: 0 0 10px;
          font-weight: 400;
          line-height: 1.25;
        }

        .profile-sub {
          font-size: 13.5px;
          color: var(--ink-600, #735e59);
          line-height: 1.6;
          margin: 0;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
          width: 100%;
          box-sizing: border-box;
        }

        /* Responsive Form Rows using pure Grid with auto-minmax */
        .form-row {
          display: grid;
          gap: 16px;
          width: 100%;
          box-sizing: border-box;
        }

        .form-row.two-col {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .form-row.three-col {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }

        .field-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
          min-width: 0;
          width: 100%;
          box-sizing: border-box;
        }

        .field-group label {
          font-size: 12.5px;
          font-weight: 500;
          color: var(--ink-600, #735e59);
          letter-spacing: 0.01em;
        }

        .field-group label .req {
          color: #a13a3a;
          margin-left: 2px;
          font-weight: 600;
        }

        .field-group input,
        .field-group select {
          width: 100%;
          box-sizing: border-box;
          padding: 11px 14px;
          border-radius: var(--radius-sm, 8px);
          border: 1px solid var(--stone-200, #e6dcce);
          background: #ffffff;
          font-family: var(--font-body);
          font-size: 13.5px;
          color: var(--ink-900, #220d0a);
          line-height: 1.4;
          transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        }

        .field-group input:focus,
        .field-group select:focus {
          border-color: var(--gold-500, #c58b38);
          background: #ffffff;
          outline: none;
          box-shadow: 0 0 0 3px rgba(197, 139, 56, 0.18);
        }

        .field-group input:disabled {
          background: #fbf8f4;
          color: var(--ink-400, #9c8983);
          border-color: var(--stone-200, #e6dcce);
          cursor: not-allowed;
        }

        /* Mobile number input with +91 badge */
        .input-prefix-wrap {
          display: flex;
          align-items: stretch;
          width: 100%;
          border: 1px solid var(--stone-200, #e6dcce);
          border-radius: var(--radius-sm, 8px);
          background: #ffffff;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          overflow: hidden;
          box-sizing: border-box;
        }

        .input-prefix-wrap:focus-within {
          border-color: var(--gold-500, #c58b38);
          box-shadow: 0 0 0 3px rgba(197, 139, 56, 0.18);
        }

        .input-prefix {
          display: inline-flex;
          align-items: center;
          padding: 0 12px;
          background: #faf6f0;
          border-right: 1px solid var(--stone-200, #e6dcce);
          font-size: 13px;
          font-weight: 500;
          color: var(--ink-600, #735e59);
          user-select: none;
          flex-shrink: 0;
        }

        .input-prefix-wrap input {
          border: none !important;
          border-radius: 0 !important;
          box-shadow: none !important;
          padding: 11px 12px;
        }

        /* Select styling */
        .field-group select {
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23735e59' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
          padding-right: 36px;
        }

        /* Error Banner */
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
        }

        .auth-alert-error svg {
          flex-shrink: 0;
        }

        /* Submit Button */
        .submit-btn {
          width: 100%;
          margin-top: 10px;
          padding: 14px 24px;
          font-size: 14.5px;
          font-weight: 500;
          border-radius: 999px;
          background: var(--brand-primary, #581e15);
          color: #ffffff;
          border: 1px solid rgba(197, 139, 56, 0.4);
          box-shadow: 0 4px 16px rgba(88, 30, 21, 0.2);
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .submit-btn:hover:not(:disabled) {
          background: var(--brand-hover, #6c241a);
          box-shadow: 0 8px 24px rgba(88, 30, 21, 0.32);
          transform: translateY(-1px);
        }

        .submit-btn:disabled {
          opacity: 0.65;
          cursor: not-allowed;
          transform: none;
        }

        .submit-spinner {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(255, 255, 255, 0.4);
          border-top-color: #ffffff;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .profile-footer-nav {
          text-align: center;
          margin-top: 22px;
          padding-top: 18px;
          border-top: 1px solid var(--stone-200, #e6dcce);
        }

        .back-storefront-link {
          font-size: 13px;
          color: var(--ink-600, #735e59);
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

        /* --- Breakpoints --- */
        @media (max-width: 680px) {
          .auth-page {
            padding: 30px 16px 60px;
          }
          .complete-profile-card {
            padding: 28px 20px;
            border-radius: 18px;
          }
          .profile-title {
            font-size: 24px;
          }
          .form-row.two-col,
          .form-row.three-col {
            grid-template-columns: 1fr;
            gap: 14px;
          }
        }
      `}</style>
    </div>
  );
}
