import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Seo from '../components/Seo';

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
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || '/checkout';

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
    setError('');
    setBusy(true);
    try {
      await completeProfile(form);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="auth-page">
      <Seo title="Complete Your Profile" path="/complete-profile" noindex />
      <div className="container auth-wrap">
        <div className="auth-card complete-profile-card">
          <p className="eyebrow">Complete Your Profile</p>
          <h1>Welcome{user?.name ? `, ${user.name.split(' ')[0]}` : ''}!</h1>
          <p className="auth-sub">
            Please provide your contact and primary delivery address. This information will be saved so you won&apos;t have to repeatedly enter it during checkout.
          </p>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-row">
              <label>
                Full Name *
                <input
                  type="text"
                  required
                  placeholder="e.g. Ananya Sharma"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                />
              </label>
              <label>
                Mobile Number *
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  value={form.mobile}
                  onChange={(e) => setForm((f) => ({ ...f, mobile: e.target.value }))}
                />
              </label>
            </div>

            <label>
              Address Line 1 (House No, Building, Street) *
              <input
                type="text"
                required
                placeholder="e.g. Flat 402, Royal Palms, Temple Street"
                value={form.line1}
                onChange={(e) => setForm((f) => ({ ...f, line1: e.target.value }))}
              />
            </label>

            <label>
              Address Line 2 (Area, Landmark)
              <input
                type="text"
                placeholder="e.g. Near Heritage Gate"
                value={form.line2}
                onChange={(e) => setForm((f) => ({ ...f, line2: e.target.value }))}
              />
            </label>

            <div className="form-row three">
              <label>
                City *
                <input
                  type="text"
                  required
                  placeholder="City"
                  value={form.city}
                  onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                />
              </label>
              <label>
                State *
                <input
                  type="text"
                  required
                  placeholder="State"
                  value={form.state}
                  onChange={(e) => setForm((f) => ({ ...f, state: e.target.value }))}
                />
              </label>
              <label>
                Pincode *
                <input
                  type="text"
                  required
                  placeholder="6-digit Pincode"
                  value={form.pincode}
                  onChange={(e) => setForm((f) => ({ ...f, pincode: e.target.value }))}
                />
              </label>
            </div>

            <label>
              Country
              <input
                type="text"
                value={form.country}
                disabled
              />
            </label>

            {error && <p className="auth-error">{error}</p>}

            <button type="submit" className="btn btn-primary" disabled={busy}>
              {busy ? 'Saving Profile…' : 'Save & Continue'}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        .auth-page { padding: 70px 0 80px; min-height: 70vh; display: flex; align-items: center; }
        .auth-wrap { display: flex; justify-content: center; }
        .complete-profile-card {
          width: 100%;
          max-width: 580px;
          background: var(--paper);
          border: 1px solid var(--stone-200);
          border-radius: var(--radius-md);
          padding: 36px;
        }
        .complete-profile-card h1 { font-size: 26px; margin: 6px 0 6px; }
        .complete-profile-card .auth-sub { font-size: 13.5px; color: var(--ink-600); margin-bottom: 24px; line-height: 1.6; }
        .auth-form { display: flex; flex-direction: column; gap: 14px; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .form-row.three { grid-template-columns: 1fr 1fr 1fr; }
        .auth-form label { display: flex; flex-direction: column; gap: 6px; font-size: 12.5px; color: var(--ink-600); }
        .auth-form input {
          padding: 11px 12px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--stone-200);
          font-family: var(--font-body);
          font-size: 13.5px;
        }
        .auth-form input:disabled { background: var(--stone-100); color: var(--ink-400); }
        .auth-error { font-size: 12.5px; color: #a13a3a; margin: 0; }
        .auth-form .btn { margin-top: 10px; padding: 13px; font-size: 14px; }
        @media (max-width: 600px) {
          .complete-profile-card { padding: 24px; }
          .form-row, .form-row.three { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}

