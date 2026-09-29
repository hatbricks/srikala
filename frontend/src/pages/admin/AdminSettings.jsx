import { useEffect, useState } from 'react';
import { api } from '../../data/api';

export default function AdminSettings() {
  const [shipping, setShipping] = useState({ fee: 100, freeThreshold: 5000 });
  const [contact, setContact] = useState({ email: '', phone: '', whatsapp: '', address: '' });
  const [banner, setBanner] = useState({ text: 'Handcrafted Heirlooms • Free shipping on orders above ₹5,000', active: true });
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      const { settings } = await api.getSettings();
      if (settings.shipping_settings) setShipping(settings.shipping_settings);
      if (settings.contact_info) setContact(settings.contact_info);
      if (settings.announcement_banner) setBanner(settings.announcement_banner);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(key, value) {
    setError('');
    setSaved('');
    try {
      await api.updateSetting(key, value);
      setSaved(`Saved ${key.replace('_', ' ')} successfully.`);
      setTimeout(() => setSaved(''), 3000);
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading) return <div className="admin-settings"><p className="empty">Loading settings…</p></div>;

  return (
    <div className="admin-settings">
      <div className="admin-page-head">
        <h1>Store &amp; Logistics Settings</h1>
        <p>Configure global delivery rates, free shipping thresholds, store contact channels, and promotional announcements.</p>
      </div>

      {saved && <p className="admin-success">{saved}</p>}
      {error && <p className="admin-error">{error}</p>}

      <div className="settings-grid">
        {/* Shipping Settings Card */}
        <div className="settings-card">
          <h3>📦 Delivery &amp; Shipping Charges</h3>
          <p className="card-sub">Fallback courier fee and minimum purchase amount to qualify for free shipping.</p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave('shipping_settings', shipping);
            }}
          >
            <div className="form-row">
              <label>
                Standard Delivery Fee (₹)
                <input
                  type="number"
                  min="0"
                  value={shipping.fee}
                  onChange={(e) => setShipping({ ...shipping, fee: Number(e.target.value) })}
                  required
                />
              </label>

              <label>
                Free Shipping Threshold (₹)
                <input
                  type="number"
                  min="0"
                  value={shipping.freeThreshold}
                  onChange={(e) => setShipping({ ...shipping, freeThreshold: Number(e.target.value) })}
                  required
                />
              </label>
            </div>
            <p className="field-hint">Customers with bags above ₹{shipping.freeThreshold} receive 100% free delivery across India.</p>

            <button type="submit" className="btn btn-primary btn-sm">Save Shipping Rules</button>
          </form>
        </div>

        {/* Announcement Banner */}
        <div className="settings-card">
          <h3>📢 Store Announcement Banner</h3>
          <p className="card-sub">Top notification ticker displayed across the storefront.</p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave('announcement_banner', banner);
            }}
          >
            <label>
              Banner Announcement Text
              <input
                type="text"
                value={banner.text}
                onChange={(e) => setBanner({ ...banner, text: e.target.value })}
                required
              />
            </label>

            <label className="checkbox-row">
              <input
                type="checkbox"
                checked={banner.active}
                onChange={(e) => setBanner({ ...banner, active: e.target.checked })}
              />
              Show banner on storefront
            </label>

            <button type="submit" className="btn btn-primary btn-sm">Save Banner</button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="settings-card">
          <h3>📞 Customer Support Details</h3>
          <p className="card-sub">Shown on contact pages, invoices, and customer order emails.</p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave('contact_info', contact);
            }}
          >
            <div className="form-row">
              <label>
                Support Email
                <input
                  type="email"
                  value={contact.email}
                  onChange={(e) => setContact({ ...contact, email: e.target.value })}
                  placeholder="care@srikalasilks.com"
                />
              </label>
              <label>
                Support Phone
                <input
                  type="tel"
                  value={contact.phone}
                  onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                />
              </label>
            </div>

            <div className="form-row">
              <label>
                WhatsApp Helpline
                <input
                  type="tel"
                  value={contact.whatsapp}
                  onChange={(e) => setContact({ ...contact, whatsapp: e.target.value })}
                  placeholder="+91 98765 43210"
                />
              </label>
              <label>
                Showroom Address
                <input
                  type="text"
                  value={contact.address}
                  onChange={(e) => setContact({ ...contact, address: e.target.value })}
                  placeholder="Banjara Hills, Hyderabad"
                />
              </label>
            </div>

            <button type="submit" className="btn btn-primary btn-sm">Save Contact Details</button>
          </form>
        </div>
      </div>

      <style>{`
        .admin-settings { padding-bottom: 40px; }
        .admin-page-head { margin-bottom: 26px; }
        .admin-page-head h1 { font-size: 26px; margin-bottom: 8px; }
        .admin-page-head p { font-size: 13px; color: var(--ink-400); max-width: 600px; line-height: 1.6; }
        .admin-error { font-size: 12.5px; color: #a13a3a; margin-bottom: 16px; }
        .admin-success { font-size: 12.5px; color: #3c7a3c; margin-bottom: 16px; }

        .settings-grid { display: flex; flex-direction: column; gap: 20px; max-width: 760px; }
        .settings-card {
          background: var(--paper);
          border: 1px solid var(--stone-200);
          border-radius: var(--radius-md);
          padding: 22px 24px;
        }
        .settings-card h3 { font-size: 16px; color: var(--ink-900); margin: 0 0 4px; }
        .card-sub { font-size: 12.5px; color: var(--ink-400); margin: 0 0 16px; }

        .settings-card form { display: flex; flex-direction: column; gap: 14px; }
        .settings-card label { display: flex; flex-direction: column; gap: 5px; font-size: 12.5px; color: var(--ink-700); }
        .settings-card input {
          font-size: 13px;
          padding: 8px 10px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--stone-300);
        }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .checkbox-row { flex-direction: row !important; align-items: center; gap: 8px !important; cursor: pointer; }
        .field-hint { font-size: 11.5px; color: var(--ink-400); margin: 2px 0 6px; }
      `}</style>
    </div>
  );
}
