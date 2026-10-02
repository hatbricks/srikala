import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RecommendedProducts from '../components/RecommendedProducts';
import Seo from '../components/Seo';
import { useAuth } from '../context/AuthContext';
import { api } from '../data/api';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry',
];

const emptyAddress = {
  name: '',
  mobile: '',
  line1: '',
  line2: '',
  city: '',
  state: '',
  pincode: '',
  country: 'India',
  isDefault: false,
};

const emptyPasswordForm = { currentPassword: '', newPassword: '', confirmPassword: '' };

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({ name: '', mobile: '' });
  const [savedMsg, setSavedMsg] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileError, setProfileError] = useState('');

  const [addresses, setAddresses] = useState([]);
  const [loadingAddresses, setLoadingAddresses] = useState(true);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressForm, setAddressForm] = useState(emptyAddress);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [savingAddress, setSavingAddress] = useState(false);
  const [addressError, setAddressError] = useState('');

  const [passwordForm, setPasswordForm] = useState(emptyPasswordForm);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || '',
        mobile: user.mobile ? user.mobile.replace(/^\+?91/, '').trim() : '',
      });
    }
    loadAddresses();
  }, [user]);

  async function loadAddresses() {
    try {
      setLoadingAddresses(true);
      const { addresses } = await api.getAddresses();
      setAddresses(addresses || []);
    } catch {
      setAddresses([]);
    } finally {
      setLoadingAddresses(false);
    }
  }

  async function handleProfileSubmit(e) {
    e.preventDefault();
    setProfileError('');
    setSavingProfile(true);

    const cleanMobile = profile.mobile.trim().replace(/[^0-9]/g, '');
    if (cleanMobile && cleanMobile.length < 10) {
      setProfileError('Please enter a valid 10-digit mobile number.');
      setSavingProfile(false);
      return;
    }

    try {
      await api.updateMe({
        name: profile.name.trim(),
        mobile: cleanMobile ? cleanMobile.slice(-10) : '',
      });
      setSavedMsg(true);
      setTimeout(() => setSavedMsg(false), 3000);
    } catch (err) {
      setProfileError(err.message || 'Failed to update personal details.');
    } finally {
      setSavingProfile(false);
    }
  }

  function handleOpenAddAddress() {
    setAddressForm({
      ...emptyAddress,
      name: profile.name || user?.name || '',
      mobile: profile.mobile || (user?.mobile ? user.mobile.replace(/^\+?91/, '').trim() : ''),
      isDefault: addresses.length === 0,
    });
    setEditingAddressId(null);
    setAddressError('');
    setShowAddressForm(true);
  }

  function handleEditAddress(addr) {
    setAddressForm({
      name: addr.name || '',
      mobile: addr.mobile ? addr.mobile.replace(/^\+?91/, '').trim() : '',
      line1: addr.line1 || '',
      line2: addr.line2 || '',
      city: addr.city || '',
      state: addr.state || '',
      pincode: addr.pincode || '',
      country: addr.country || 'India',
      isDefault: Boolean(addr.is_default),
    });
    setEditingAddressId(addr.id);
    setAddressError('');
    setShowAddressForm(true);
  }

  async function handleSaveAddress(e) {
    e.preventDefault();
    setAddressError('');

    if (!addressForm.name.trim() || !addressForm.mobile.trim() || !addressForm.line1.trim() || !addressForm.city.trim() || !addressForm.state.trim() || !addressForm.pincode.trim()) {
      setAddressError('Please fill in all mandatory address fields.');
      return;
    }

    const cleanPin = addressForm.pincode.trim();
    if (!/^[1-9][0-9]{5}$/.test(cleanPin)) {
      setAddressError('Please enter a valid 6-digit Indian PIN code.');
      return;
    }

    const cleanMobile = addressForm.mobile.trim().replace(/[^0-9]/g, '');
    if (cleanMobile.length < 10) {
      setAddressError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setSavingAddress(true);
    try {
      const payload = {
        ...addressForm,
        name: addressForm.name.trim(),
        mobile: cleanMobile.slice(-10),
        line1: addressForm.line1.trim(),
        line2: addressForm.line2?.trim() || null,
        city: addressForm.city.trim(),
        state: addressForm.state.trim(),
        pincode: cleanPin,
        country: 'India',
        isDefault: Boolean(addressForm.isDefault),
      };

      if (editingAddressId) {
        await api.updateAddress(editingAddressId, payload);
      } else {
        await api.addAddress(payload);
      }

      setShowAddressForm(false);
      setEditingAddressId(null);
      setAddressForm(emptyAddress);
      await loadAddresses();
    } catch (err) {
      setAddressError(err.message || 'Failed to save address.');
    } finally {
      setSavingAddress(false);
    }
  }

  async function handleSetDefault(id) {
    try {
      await api.setDefaultAddress(id);
      setAddresses((prev) =>
        prev
          .map((a) => ({ ...a, is_default: a.id === id }))
          .sort((a, b) => (b.is_default ? 1 : 0) - (a.is_default ? 1 : 0))
      );
    } catch (err) {
      alert(err.message || 'Could not set default address.');
    }
  }

  async function handleDeleteAddress(id) {
    if (!window.confirm('Are you sure you want to remove this delivery address?')) return;
    try {
      await api.deleteAddress(id);
      setAddresses((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      alert(err.message || 'Failed to remove address.');
    }
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
      setTimeout(() => setPasswordSaved(false), 3000);
    } catch (err) {
      setPasswordError(err.message || 'Failed to change password.');
    } finally {
      setChangingPassword(false);
    }
  }

  const userInitial = (user?.name || user?.email || 'R').charAt(0).toUpperCase();

  return (
    <div className="profile-page">
      <Seo title="My Account & Profile" path="/profile" noindex />

      <div className="container">
        {/* Luxury Account Hero Banner */}
        <div className="profile-hero-banner">
          <div className="hero-avatar">
            <span>{userInitial}</span>
          </div>

          <div className="hero-info">
            <span className="hero-badge">Verified Patron</span>
            <h1 className="hero-name">{user?.name || 'Valued Patron'}</h1>
            <p className="hero-meta">
              <span>{user?.email}</span>
              {user?.mobile && (
                <>
                  <span className="dot-sep">•</span>
                  <span>+91 {user.mobile.replace(/^\+?91/, '').trim()}</span>
                </>
              )}
            </p>
          </div>

          <div className="hero-actions">
            <Link to="/orders" className="hero-orders-btn">
              <svg viewBox="0 0 24 24" fill="none" width="18" height="18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <span>View My Orders</span>
            </Link>

            <button type="button" className="hero-logout-btn" onClick={logout} title="Sign out of account">
              <svg viewBox="0 0 24 24" fill="none" width="16" height="16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Responsive Grid */}
        <div className="profile-layout-grid">
          {/* Left Column: Personal Info & Security */}
          <div className="profile-aside-col">
            {/* Personal Details Card */}
            <div className="luxury-card">
              <div className="card-head">
                <div className="head-icon">
                  <svg viewBox="0 0 24 24" fill="none" width="18" height="18" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c1.5-4 4.5-6 8-6s6.5 2 8 6" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <h3 className="card-title">Personal Details</h3>
                  <p className="card-subtitle">Manage your name and phone number</p>
                </div>
              </div>

              <form onSubmit={handleProfileSubmit} className="card-form">
                <div className="field-block">
                  <label htmlFor="user-name">Full Name</label>
                  <input
                    id="user-name"
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="field-block">
                  <label htmlFor="user-mobile">Mobile Number</label>
                  <div className="phone-prefix-wrap">
                    <span className="phone-badge">+91</span>
                    <input
                      id="user-mobile"
                      type="tel"
                      maxLength={10}
                      value={profile.mobile}
                      onChange={(e) => setProfile((p) => ({ ...p, mobile: e.target.value.replace(/[^0-9]/g, '') }))}
                      placeholder="10-digit mobile number"
                    />
                  </div>
                </div>

                <div className="field-block">
                  <label htmlFor="user-email">Account Email</label>
                  <input
                    id="user-email"
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className="disabled-input"
                  />
                  <span className="field-hint">Primary email associated with your Google/login account</span>
                </div>

                {profileError && <p className="form-error-msg">{profileError}</p>}

                <div className="form-foot-action">
                  <button type="submit" className="btn btn-primary save-btn" disabled={savingProfile}>
                    {savingProfile ? 'Saving…' : 'Save Details'}
                  </button>
                  {savedMsg && <span className="save-success-tag">✓ Updated successfully</span>}
                </div>
              </form>
            </div>

            {/* Change Password Card */}
            <div className="luxury-card">
              <div className="card-head">
                <div className="head-icon">
                  <svg viewBox="0 0 24 24" fill="none" width="18" height="18" stroke="currentColor" strokeWidth="1.8">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <div>
                  <h3 className="card-title">Security &amp; Password</h3>
                  <p className="card-subtitle">Keep your account guarded</p>
                </div>
              </div>

              <form onSubmit={handlePasswordSubmit} className="card-form">
                <div className="field-block">
                  <label htmlFor="pwd-current">Current Password</label>
                  <input
                    id="pwd-current"
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm((p) => ({ ...p, currentPassword: e.target.value }))}
                    placeholder="••••••••"
                    required
                  />
                </div>

                <div className="field-block">
                  <label htmlFor="pwd-new">New Password</label>
                  <input
                    id="pwd-new"
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm((p) => ({ ...p, newPassword: e.target.value }))}
                    minLength={6}
                    placeholder="At least 6 characters"
                    required
                  />
                </div>

                <div className="field-block">
                  <label htmlFor="pwd-confirm">Confirm New Password</label>
                  <input
                    id="pwd-confirm"
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm((p) => ({ ...p, confirmPassword: e.target.value }))}
                    minLength={6}
                    placeholder="Re-type new password"
                    required
                  />
                </div>

                {passwordError && <p className="form-error-msg">{passwordError}</p>}

                <div className="form-foot-action">
                  <button type="submit" className="btn btn-outline save-btn" disabled={changingPassword}>
                    {changingPassword ? 'Updating…' : 'Update Password'}
                  </button>
                  {passwordSaved && <span className="save-success-tag">✓ Password changed</span>}
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: Saved Delivery Addresses */}
          <div className="profile-main-col">
            <div className="luxury-card addresses-card">
              <div className="card-head between">
                <div className="head-left">
                  <div className="head-icon">
                    <svg viewBox="0 0 24 24" fill="none" width="18" height="18" stroke="currentColor" strokeWidth="1.8">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="card-title">Delivery Addresses</h3>
                    <p className="card-subtitle">Manage shipping addresses for faster 1-click checkouts</p>
                  </div>
                </div>

                {!showAddressForm && (
                  <button type="button" className="btn btn-primary add-addr-btn" onClick={handleOpenAddAddress}>
                    <svg viewBox="0 0 24 24" fill="none" width="16" height="16" stroke="currentColor" strokeWidth="2.2">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    <span>Add New Address</span>
                  </button>
                )}
              </div>

              {/* Add / Edit Form Modal or Inline Drawer */}
              {showAddressForm && (
                <div className="address-form-box">
                  <div className="form-box-head">
                    <h4>{editingAddressId ? 'Edit Delivery Address' : 'Add New Delivery Address'}</h4>
                    <button
                      type="button"
                      className="close-drawer-btn"
                      onClick={() => {
                        setShowAddressForm(false);
                        setEditingAddressId(null);
                      }}
                      aria-label="Close address form"
                    >
                      ✕
                    </button>
                  </div>

                  <form onSubmit={handleSaveAddress} className="styled-address-form">
                    <div className="grid-2">
                      <div className="field-block">
                        <label>Recipient Full Name <span className="req">*</span></label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Priya Sharma"
                          value={addressForm.name}
                          onChange={(e) => setAddressForm((f) => ({ ...f, name: e.target.value }))}
                        />
                      </div>

                      <div className="field-block">
                        <label>Mobile Number <span className="req">*</span></label>
                        <div className="phone-prefix-wrap">
                          <span className="phone-badge">+91</span>
                          <input
                            type="tel"
                            required
                            maxLength={10}
                            placeholder="9876543210"
                            value={addressForm.mobile}
                            onChange={(e) => setAddressForm((f) => ({ ...f, mobile: e.target.value.replace(/[^0-9]/g, '') }))}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="field-block">
                      <label>Address Line 1 (House No, Flat, Building, Street) <span className="req">*</span></label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Flat 302, Sri Krishna Apts, Gandhi Road"
                        value={addressForm.line1}
                        onChange={(e) => setAddressForm((f) => ({ ...f, line1: e.target.value }))}
                      />
                    </div>

                    <div className="field-block">
                      <label>Address Line 2 (Area, Landmark, Colony)</label>
                      <input
                        type="text"
                        placeholder="e.g. Near Heritage Temple, Opp. Axis Bank"
                        value={addressForm.line2 || ''}
                        onChange={(e) => setAddressForm((f) => ({ ...f, line2: e.target.value }))}
                      />
                    </div>

                    <div className="grid-3">
                      <div className="field-block">
                        <label>City <span className="req">*</span></label>
                        <input
                          type="text"
                          required
                          placeholder="City"
                          value={addressForm.city}
                          onChange={(e) => setAddressForm((f) => ({ ...f, city: e.target.value }))}
                        />
                      </div>

                      <div className="field-block">
                        <label>State <span className="req">*</span></label>
                        <select
                          required
                          value={addressForm.state}
                          onChange={(e) => setAddressForm((f) => ({ ...f, state: e.target.value }))}
                        >
                          <option value="">Select State</option>
                          {INDIAN_STATES.map((st) => (
                            <option key={st} value={st}>{st}</option>
                          ))}
                        </select>
                      </div>

                      <div className="field-block">
                        <label>Pincode <span className="req">*</span></label>
                        <input
                          type="text"
                          required
                          maxLength={6}
                          placeholder="6-digit PIN"
                          value={addressForm.pincode}
                          onChange={(e) => setAddressForm((f) => ({ ...f, pincode: e.target.value.replace(/[^0-9]/g, '') }))}
                        />
                      </div>
                    </div>

                    <label className="checkbox-toggle">
                      <input
                        type="checkbox"
                        checked={Boolean(addressForm.isDefault)}
                        onChange={(e) => setAddressForm((f) => ({ ...f, isDefault: e.target.checked }))}
                      />
                      <span>Set as default delivery address for rapid checkout</span>
                    </label>

                    {addressError && <p className="form-error-msg">{addressError}</p>}

                    <div className="form-actions-row">
                      <button type="submit" className="btn btn-primary" disabled={savingAddress}>
                        {savingAddress ? 'Saving…' : (editingAddressId ? 'Update Address' : 'Save Address')}
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline"
                        onClick={() => {
                          setShowAddressForm(false);
                          setEditingAddressId(null);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Addresses List */}
              <div className="addresses-stack">
                {loadingAddresses && <p className="loading-state">Loading delivery addresses…</p>}

                {!loadingAddresses && addresses.length === 0 && !showAddressForm && (
                  <div className="empty-address-box">
                    <div className="empty-icon-wrap">
                      <svg viewBox="0 0 24 24" fill="none" width="32" height="32" stroke="currentColor" strokeWidth="1.4">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                    <h4>No Addresses Saved Yet</h4>
                    <p>Add your home or office address now to breeze through checkout in seconds.</p>
                    <button type="button" className="btn btn-outline btn-sm" onClick={handleOpenAddAddress}>
                      + Add Your First Address
                    </button>
                  </div>
                )}

                {!loadingAddresses && addresses.map((addr) => (
                  <div className={`address-item-card ${addr.is_default ? 'is-default' : ''}`} key={addr.id}>
                    <div className="card-top-row">
                      <div className="recipient-tag">
                        <strong className="recipient-name">{addr.name}</strong>
                        <span className="recipient-phone">• +91 {addr.mobile}</span>
                      </div>
                      {addr.is_default && (
                        <span className="gold-default-badge">
                          <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                          Default Address
                        </span>
                      )}
                    </div>

                    <div className="address-body">
                      <p className="address-street">
                        {addr.line1}
                        {addr.line2 ? `, ${addr.line2}` : ''}
                      </p>
                      <p className="address-region">
                        {addr.city}, {addr.state} &mdash; <strong>{addr.pincode}</strong>
                      </p>
                      <span className="address-country">{addr.country || 'India'}</span>
                    </div>

                    <div className="card-actions-bar">
                      {!addr.is_default && (
                        <button
                          type="button"
                          className="action-btn-text set-default-btn"
                          onClick={() => handleSetDefault(addr.id)}
                        >
                          Make Default
                        </button>
                      )}
                      <button
                        type="button"
                        className="action-btn-text edit-btn"
                        onClick={() => handleEditAddress(addr)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="action-btn-text delete-btn"
                        onClick={() => handleDeleteAddress(addr.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <RecommendedProducts />

      <style>{`
        .profile-page {
          padding: 40px 0 80px;
          background: #fbf9f6;
          min-height: 85vh;
        }

        /* --- Luxury Hero Banner --- */
        .profile-hero-banner {
          background: #ffffff;
          border: 1px solid rgba(197, 139, 56, 0.32);
          border-radius: 24px;
          padding: 32px 38px;
          margin-bottom: 36px;
          display: flex;
          align-items: center;
          gap: 26px;
          box-shadow:
            0 16px 40px rgba(45, 12, 17, 0.05),
            0 1px 3px rgba(0, 0, 0, 0.03);
          position: relative;
          overflow: hidden;
        }

        .profile-hero-banner::after {
          content: '';
          position: absolute;
          top: -60px;
          right: -60px;
          width: 220px;
          height: 220px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(197, 139, 56, 0.12) 0%, transparent 70%);
          pointer-events: none;
        }

        .hero-avatar {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--brand-primary, #581e15) 0%, #20080b 100%);
          color: #fbdfa2;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-display, 'Marcellus', Georgia, serif);
          font-size: 32px;
          font-weight: 500;
          box-shadow: 0 8px 20px rgba(88, 30, 21, 0.25);
          flex-shrink: 0;
          border: 2px solid rgba(251, 223, 162, 0.4);
        }

        .hero-info {
          flex: 1;
        }

        .hero-badge {
          display: inline-block;
          font-size: 10.5px;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: var(--brand-secondary, #b0732e);
          font-weight: 600;
          margin-bottom: 4px;
        }

        .hero-name {
          font-family: var(--font-display, 'Marcellus', Georgia, serif);
          font-size: 30px;
          color: var(--maroon-900, #581e15);
          margin: 0 0 6px;
          font-weight: 400;
          line-height: 1.2;
        }

        .hero-meta {
          margin: 0;
          font-size: 13.5px;
          color: var(--ink-600, #735e59);
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .dot-sep {
          color: var(--stone-200, #e6dcce);
        }

        .hero-actions {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-shrink: 0;
        }

        .hero-orders-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--brand-primary, #581e15);
          color: #ffffff;
          padding: 12px 24px;
          border-radius: 999px;
          font-size: 13.5px;
          font-weight: 500;
          border: 1px solid rgba(197, 139, 56, 0.35);
          box-shadow: 0 4px 14px rgba(88, 30, 21, 0.18);
          transition: transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
        }

        .hero-orders-btn:hover {
          background: var(--brand-hover, #6c241a);
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(88, 30, 21, 0.28);
          color: #ffffff;
        }

        .hero-logout-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #ffffff;
          border: 1px solid var(--stone-200, #e6dcce);
          color: #a13a3a;
          padding: 11px 20px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s ease, border-color 0.2s ease;
        }

        .hero-logout-btn:hover {
          background: #fdf2f2;
          border-color: #f8b4b4;
        }

        /* --- Layout Grid --- */
        .profile-layout-grid {
          display: grid;
          grid-template-columns: 380px 1fr;
          gap: 32px;
          align-items: flex-start;
          margin-bottom: 70px;
        }

        .profile-aside-col {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .profile-main-col {
          min-width: 0;
        }

        /* --- Luxury Card Base --- */
        .luxury-card {
          background: #ffffff;
          border: 1px solid rgba(197, 139, 56, 0.26);
          border-radius: 20px;
          padding: 28px 30px;
          box-shadow:
            0 12px 32px rgba(45, 12, 17, 0.04),
            0 1px 3px rgba(0, 0, 0, 0.02);
          box-sizing: border-box;
        }

        .card-head {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          margin-bottom: 22px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--stone-200, #e6dcce);
        }

        .card-head.between {
          justify-content: space-between;
          align-items: center;
        }

        .head-left {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .head-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: #faf5ee;
          color: var(--brand-secondary, #b0732e);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border: 1px solid rgba(197, 139, 56, 0.22);
        }

        .card-title {
          font-family: var(--font-display, 'Marcellus', Georgia, serif);
          font-size: 20px;
          color: var(--maroon-900, #581e15);
          margin: 0;
          font-weight: 400;
        }

        .card-subtitle {
          font-size: 12.5px;
          color: var(--ink-600, #735e59);
          margin: 3px 0 0;
        }

        /* Forms */
        .card-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .field-block {
          display: flex;
          flex-direction: column;
          gap: 6px;
          min-width: 0;
          width: 100%;
          box-sizing: border-box;
        }

        .field-block label {
          font-size: 12.5px;
          font-weight: 500;
          color: var(--ink-600, #735e59);
        }

        .field-block label .req {
          color: #a13a3a;
          margin-left: 2px;
        }

        .field-block input,
        .field-block select {
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
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .field-block input:focus,
        .field-block select:focus {
          border-color: var(--gold-500, #c58b38);
          outline: none;
          box-shadow: 0 0 0 3px rgba(197, 139, 56, 0.18);
        }

        .field-block select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23735e59' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
          padding-right: 36px;
          cursor: pointer;
        }

        .disabled-input {
          background: #fbf8f4 !important;
          color: var(--ink-400, #9c8983) !important;
          cursor: not-allowed;
        }

        .field-hint {
          font-size: 11.5px;
          color: var(--ink-400, #9c8983);
          margin-top: 2px;
        }

        .phone-prefix-wrap {
          display: flex;
          align-items: stretch;
          width: 100%;
          border: 1px solid var(--stone-200, #e6dcce);
          border-radius: var(--radius-sm, 8px);
          background: #ffffff;
          overflow: hidden;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .phone-prefix-wrap:focus-within {
          border-color: var(--gold-500, #c58b38);
          box-shadow: 0 0 0 3px rgba(197, 139, 56, 0.18);
        }

        .phone-badge {
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

        .phone-prefix-wrap input {
          border: none !important;
          border-radius: 0 !important;
          box-shadow: none !important;
          padding: 11px 12px;
        }

        .form-foot-action {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-top: 8px;
        }

        .save-btn {
          padding: 11px 24px;
          font-size: 13.5px;
        }

        .save-success-tag {
          font-size: 12.5px;
          color: #2b772b;
          font-weight: 500;
        }

        .form-error-msg {
          font-size: 12.5px;
          color: #a13a3a;
          margin: 0;
        }

        /* --- Addresses Column --- */
        .add-addr-btn {
          padding: 9px 18px;
          font-size: 13px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .address-form-box {
          background: #faf6f0;
          border: 1px solid rgba(197, 139, 56, 0.35);
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 24px;
        }

        .form-box-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 18px;
        }

        .form-box-head h4 {
          font-family: var(--font-display, 'Marcellus', Georgia, serif);
          font-size: 18px;
          color: var(--maroon-900, #581e15);
          margin: 0;
        }

        .close-drawer-btn {
          background: none;
          border: none;
          font-size: 18px;
          color: var(--ink-400, #9c8983);
          cursor: pointer;
          padding: 4px;
          line-height: 1;
        }

        .close-drawer-btn:hover {
          color: var(--maroon-900, #581e15);
        }

        .styled-address-form {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .grid-2 {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
        }

        .grid-3 {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
        }

        .checkbox-toggle {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          font-size: 13px;
          color: var(--ink-600, #735e59);
          margin-top: 4px;
        }

        .checkbox-toggle input {
          accent-color: var(--brand-primary, #581e15);
          width: 16px;
          height: 16px;
        }

        .form-actions-row {
          display: flex;
          gap: 12px;
          margin-top: 8px;
        }

        .addresses-stack {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .empty-address-box {
          text-align: center;
          padding: 44px 20px;
          background: #faf6f0;
          border-radius: 16px;
          border: 1px dashed var(--stone-200, #e6dcce);
        }

        .empty-icon-wrap {
          color: var(--gold-600, #b0732e);
          margin-bottom: 12px;
        }

        .empty-address-box h4 {
          font-family: var(--font-display, 'Marcellus', Georgia, serif);
          font-size: 18px;
          color: var(--maroon-900, #581e15);
          margin: 0 0 6px;
        }

        .empty-address-box p {
          font-size: 13.5px;
          color: var(--ink-600, #735e59);
          margin: 0 0 18px;
        }

        /* Address Item Card */
        .address-item-card {
          border: 1px solid var(--stone-200, #e6dcce);
          border-radius: 16px;
          padding: 22px 24px;
          background: #ffffff;
          transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .address-item-card:hover {
          border-color: rgba(197, 139, 56, 0.45);
          box-shadow: 0 8px 24px rgba(45, 12, 17, 0.05);
        }

        .address-item-card.is-default {
          border-color: var(--gold-500, #c58b38);
          background: #fdfbf7;
        }

        .card-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 8px;
        }

        .recipient-tag {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14.5px;
        }

        .recipient-name {
          color: var(--maroon-900, #581e15);
          font-weight: 600;
        }

        .recipient-phone {
          color: var(--ink-600, #735e59);
          font-size: 13px;
        }

        .gold-default-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: #faf0da;
          color: #945d17;
          border: 1px solid rgba(197, 139, 56, 0.35);
          padding: 3px 10px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.02em;
        }

        .address-body {
          font-size: 13.5px;
          color: var(--ink-600, #735e59);
          line-height: 1.6;
        }

        .address-street {
          margin: 0;
          color: var(--ink-900, #220d0a);
          font-weight: 400;
        }

        .address-region {
          margin: 3px 0 0;
        }

        .address-region strong {
          color: var(--ink-900, #220d0a);
        }

        .address-country {
          display: inline-block;
          font-size: 12px;
          color: var(--ink-400, #9c8983);
          margin-top: 4px;
        }

        .card-actions-bar {
          display: flex;
          align-items: center;
          gap: 16px;
          padding-top: 12px;
          border-top: 1px solid #f2ede5;
        }

        .action-btn-text {
          background: none;
          border: none;
          font-family: var(--font-body);
          font-size: 12.5px;
          font-weight: 500;
          cursor: pointer;
          padding: 0;
          transition: color 0.15s ease;
        }

        .set-default-btn {
          color: var(--gold-600, #b0732e);
        }

        .set-default-btn:hover {
          text-decoration: underline;
        }

        .edit-btn {
          color: var(--maroon-900, #581e15);
        }

        .edit-btn:hover {
          text-decoration: underline;
        }

        .delete-btn {
          color: #a13a3a;
          margin-left: auto;
        }

        .delete-btn:hover {
          text-decoration: underline;
        }

        .loading-state {
          color: var(--ink-400, #9c8983);
          font-size: 13.5px;
          text-align: center;
          padding: 24px;
        }

        /* --- Responsive Media Queries --- */
        @media (max-width: 1024px) {
          .profile-layout-grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }
          .profile-hero-banner {
            flex-direction: column;
            text-align: center;
            padding: 28px 24px;
            gap: 20px;
          }
          .hero-meta {
            justify-content: center;
          }
          .hero-actions {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 680px) {
          .profile-page {
            padding: 24px 0 60px;
          }
          .profile-hero-banner {
            border-radius: 18px;
            padding: 24px 18px;
          }
          .hero-name {
            font-size: 24px;
          }
          .hero-actions {
            flex-direction: column;
            width: 100%;
          }
          .hero-orders-btn,
          .hero-logout-btn {
            width: 100%;
            justify-content: center;
          }
          .luxury-card {
            padding: 22px 18px;
            border-radius: 16px;
          }
          .card-head.between {
            flex-direction: column;
            align-items: flex-start;
            gap: 14px;
          }
          .add-addr-btn {
            width: 100%;
            justify-content: center;
          }
          .grid-2,
          .grid-3 {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
