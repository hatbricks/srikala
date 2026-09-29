import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RecommendedProducts from '../components/RecommendedProducts';
import Seo from '../components/Seo';
import { useAuth } from '../context/AuthContext';
import { api } from '../data/api';

const emptyAddress = { name: '', mobile: '', line1: '', city: '', state: '', pincode: '' };
const emptyPasswordForm = { currentPassword: '', newPassword: '', confirmPassword: '' };

export default function Profile() {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState({ name: '', mobile: '' });
  const [savedMsg, setSavedMsg] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyAddress);
  const [passwordForm, setPasswordForm] = useState(emptyPasswordForm);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    if (user) setProfile({ name: user.name, mobile: user.mobile || '' });
    api.getAddresses().then(({ addresses }) => setAddresses(addresses)).catch(() => {});
  }, [user]);

  async function handleProfileSubmit(e) {
    e.preventDefault();
    await api.updateMe(profile);
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2500);
  }

  const [editingAddressId, setEditingAddressId] = useState(null);

  async function handleSaveAddress(e) {
    e.preventDefault();
    if (!form.line1.trim() || !form.city.trim() || !form.state.trim() || !form.pincode.trim()) return;
    try {
      if (editingAddressId) {
        const { address } = await api.updateAddress(editingAddressId, form);
        setAddresses((prev) => prev.map((a) => (a.id === editingAddressId ? address : a)));
      } else {
        const { address } = await api.addAddress(form);
        setAddresses((prev) => [address, ...prev]);
      }
      setForm(emptyAddress);
      setEditingAddressId(null);
      setShowForm(false);
      api.getAddresses().then(({ addresses }) => setAddresses(addresses)).catch(() => {});
    } catch (err) {
      alert(err.message || 'Could not save address.');
    }
  }

  function handleEditAddress(addr) {
    setForm({
      name: addr.name || '',
      mobile: addr.mobile || '',
      line1: addr.line1 || '',
      line2: addr.line2 || '',
      city: addr.city || '',
      state: addr.state || '',
      pincode: addr.pincode || '',
      country: addr.country || 'India',
      isDefault: Boolean(addr.is_default),
    });
    setEditingAddressId(addr.id);
    setShowForm(true);
  }

  async function handleSetDefault(id) {
    try {
      await api.setDefaultAddress(id);
      setAddresses((prev) =>
        prev.map((a) => ({
          ...a,
          is_default: a.id === id,
        })).sort((a, b) => (b.is_default ? 1 : 0) - (a.is_default ? 1 : 0))
      );
    } catch (err) {
      alert(err.message || 'Could not set default address.');
    }
  }

  async function handleDeleteAddress(id) {
    if (!window.confirm('Delete this address?')) return;
    await api.deleteAddress(id);
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  }

  async function handlePasswordSubmit(e) {
    e.preventDefault();
    setPasswordError('');
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('New passwords do not match.');
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters.');
      return;
    }
    setChangingPassword(true);
    try {
      await api.changePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      setPasswordForm(emptyPasswordForm);
      setPasswordSaved(true);
      setTimeout(() => setPasswordSaved(false), 2500);
    } catch (err) {
      setPasswordError(err.message);
    } finally {
      setChangingPassword(false);
    }
  }

  return (
    <div className="profile-page">
      <Seo title="My Profile" path="/profile" noindex />
      <div className="container">
        <div className="page-head">
          <p className="eyebrow">Your Account</p>
          <h1>Profile</h1>
        </div>

        <div className="profile-grid">
          <div className="profile-col">
            <form className="profile-card" onSubmit={handleProfileSubmit}>
              <h3>Personal Details</h3>
              <label>
                Name
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
                  placeholder="Your full name"
                />
              </label>
              <label>
                Mobile
                <input
                  type="tel"
                  value={profile.mobile}
                  onChange={(e) => setProfile((p) => ({ ...p, mobile: e.target.value }))}
                  placeholder="10-digit mobile number"
                />
              </label>
              <label>
                Email
                <input type="email" value={user?.email || ''} disabled />
              </label>
              <button type="submit" className="btn btn-primary">Save Details</button>
              {savedMsg && <span className="saved-msg">Saved ✓</span>}
              <div className="profile-links">
                <Link to="/orders">View your orders →</Link>
                <button type="button" className="logout-btn" onClick={logout}>Log out</button>
              </div>
            </form>

            <form className="profile-card" onSubmit={handlePasswordSubmit}>
              <h3>Change Password</h3>
              <label>
                Current password
                <input
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm((p) => ({ ...p, currentPassword: e.target.value }))}
                  required
                />
              </label>
              <label>
                New password
                <input
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm((p) => ({ ...p, newPassword: e.target.value }))}
                  minLength={6}
                  required
                />
              </label>
              <label>
                Confirm new password
                <input
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm((p) => ({ ...p, confirmPassword: e.target.value }))}
                  minLength={6}
                  required
                />
              </label>
              {passwordError && <p className="password-error">{passwordError}</p>}
              <button type="submit" className="btn btn-outline" disabled={changingPassword}>
                {changingPassword ? 'Updating…' : 'Update Password'}
              </button>
              {passwordSaved && <span className="saved-msg">Password updated ✓</span>}
            </form>
          </div>

          <div className="address-card-panel">
            <div className="panel-head">
              <h3>Saved Addresses</h3>
              {!showForm && (
                <button
                  type="button"
                  className="add-link"
                  onClick={() => {
                    setForm(emptyAddress);
                    setEditingAddressId(null);
                    setShowForm(true);
                  }}
                >
                  + Add address
                </button>
              )}
            </div>

            {addresses.length === 0 && !showForm && <p className="empty">No addresses saved yet.</p>}

            {addresses.map((a) => (
              <div className={`saved-address ${a.is_default ? 'is-default' : ''}`} key={a.id}>
                <div>
                  <div className="address-title-row">
                    <strong>{a.name}</strong> · {a.mobile}
                    {a.is_default && <span className="default-badge">Default</span>}
                  </div>
                  <p>
                    {a.line1}
                    {a.line2 ? `, ${a.line2}` : ''}
                    <br />
                    {a.city}, {a.state} — {a.pincode}, {a.country || 'India'}
                  </p>
                </div>
                <div className="address-actions">
                  {!a.is_default && (
                    <button type="button" onClick={() => handleSetDefault(a.id)} className="action-btn make-default">
                      Set as default
                    </button>
                  )}
                  <button type="button" onClick={() => handleEditAddress(a)} className="action-btn edit">
                    Edit
                  </button>
                  <button type="button" onClick={() => handleDeleteAddress(a.id)} className="action-btn danger">
                    Remove
                  </button>
                </div>
              </div>
            ))}

            {showForm && (
              <form className="address-form" onSubmit={handleSaveAddress}>
                <h4>{editingAddressId ? 'Edit Address' : 'New Delivery Address'}</h4>
                <div className="form-row">
                  <label>
                    Full name *
                    <input type="text" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required />
                  </label>
                  <label>
                    Mobile number *
                    <input type="tel" value={form.mobile} onChange={(e) => setForm((f) => ({ ...f, mobile: e.target.value }))} required />
                  </label>
                </div>
                <label>
                  Address Line 1 (House No, Street, Area) *
                  <input type="text" placeholder="House no, street, area" value={form.line1} onChange={(e) => setForm((f) => ({ ...f, line1: e.target.value }))} required />
                </label>
                <label>
                  Address Line 2 (Landmark, Colony)
                  <input type="text" placeholder="Landmark or colony (optional)" value={form.line2 || ''} onChange={(e) => setForm((f) => ({ ...f, line2: e.target.value }))} />
                </label>
                <div className="form-row three">
                  <label>
                    City *
                    <input type="text" value={form.city} onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))} required />
                  </label>
                  <label>
                    State *
                    <input type="text" value={form.state} onChange={(e) => setForm((f) => ({ ...f, state: e.target.value }))} required />
                  </label>
                  <label>
                    Pincode *
                    <input type="text" value={form.pincode} onChange={(e) => setForm((f) => ({ ...f, pincode: e.target.value }))} required />
                  </label>
                </div>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={Boolean(form.isDefault)}
                    onChange={(e) => setForm((f) => ({ ...f, isDefault: e.target.checked }))}
                  />
                  <span>Make this my default delivery address</span>
                </label>
                <div className="form-actions">
                  <button type="submit" className="btn btn-primary">
                    {editingAddressId ? 'Update Address' : 'Save Address'}
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => {
                      setShowForm(false);
                      setEditingAddressId(null);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      <RecommendedProducts />

      <style>{`
        .profile-page { padding: 56px 0 0; }
        .page-head { margin-bottom: 30px; }
        .page-head h1 { font-size: 34px; margin-top: 8px; }
        .profile-grid { display: grid; grid-template-columns: 360px 1fr; gap: 28px; align-items: flex-start; margin-bottom: 60px; }
        .profile-col { display: flex; flex-direction: column; gap: 20px; }

        .profile-card, .address-card-panel {
          background: var(--paper);
          border: 1px solid var(--stone-200);
          border-radius: var(--radius-md);
          padding: 26px;
        }
        .profile-card { display: flex; flex-direction: column; gap: 16px; }
        .profile-card h3, .address-card-panel h3 { font-family: var(--font-display); font-size: 18px; color: var(--maroon-900); margin: 0; }
        .profile-card label { display: flex; flex-direction: column; gap: 6px; font-size: 12.5px; color: var(--ink-600); }
        .profile-card input {
          padding: 11px 12px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--stone-200);
          font-family: var(--font-body);
          font-size: 13.5px;
        }
        .profile-card input:disabled { background: var(--stone-100); color: var(--ink-400); }
        .saved-msg { font-size: 12.5px; color: #3c7a3c; }
        .password-error { font-size: 12.5px; color: #a13a3a; margin: 0; }
        .profile-links { display: flex; justify-content: space-between; align-items: center; margin-top: 6px; font-size: 12.5px; }
        .profile-links a { color: var(--gold-600); border-bottom: 1px solid var(--gold-500); }
        .logout-btn { background: none; border: none; color: #a13a3a; font-size: 12.5px; }

        .panel-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; }
        .add-link { background: none; border: none; font-size: 12.5px; color: var(--gold-600); border-bottom: 1px solid var(--gold-500); }
        .empty { color: var(--ink-400); font-size: 13.5px; }

        .saved-address {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 14px;
          border: 1px solid var(--stone-200);
          border-radius: var(--radius-sm);
          padding: 16px 18px;
          margin-bottom: 12px;
          font-size: 13.5px;
          background: var(--paper);
        }
        .saved-address.is-default {
          border-color: var(--gold-500);
          background: #fdfaf3;
        }
        .address-title-row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
        .default-badge {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          background: var(--gold-500);
          color: #fff;
          padding: 2px 7px;
          border-radius: 999px;
          font-weight: 600;
        }
        .saved-address p { margin: 6px 0 0; color: var(--ink-600); line-height: 1.5; }
        .address-actions { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }
        .action-btn { background: none; border: none; font-size: 12px; cursor: pointer; padding: 0; }
        .action-btn.make-default { color: var(--gold-600); border-bottom: 1px solid var(--gold-500); }
        .action-btn.edit { color: var(--maroon-900); text-decoration: underline; }
        .action-btn.danger { color: #a13a3a; text-decoration: underline; }

        .checkbox-label {
          display: flex;
          flex-direction: row !important;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          font-size: 13px !important;
          color: var(--ink-600);
        }
        .checkbox-label input { accent-color: var(--maroon-900); }

        .address-form {
          background: var(--stone-100);
          border-radius: var(--radius-md);
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-top: 8px;
        }
        .address-form h4 { margin: 0 0 4px; font-size: 15px; color: var(--maroon-900); }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .form-row.three { grid-template-columns: 1fr 1fr 1fr; }
        .address-form label { display: flex; flex-direction: column; gap: 6px; font-size: 12.5px; color: var(--ink-600); }
        .address-form input {
          padding: 11px 12px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--stone-200);
          font-family: var(--font-body);
          font-size: 13.5px;
        }
        .form-actions { display: flex; gap: 10px; }

        @media (max-width: 860px) {
          .profile-grid { grid-template-columns: 1fr; }
          .form-row, .form-row.three { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
