import { useEffect, useState } from 'react';
import { api } from '../../data/api';
import { TruckIcon, SpeakerIcon, PhoneIcon, TaxIcon } from '../../components/admin/AdminIcons';

const defaultGstSettings = {
  enabled: true,
  rate: 5,
  type: 'inclusive', // 'inclusive' | 'exclusive'
  gstin: '37AAAAA0000A1Z5',
  legalName: 'Ravichandra Textiles',
  state: 'Andhra Pradesh',
  stateCode: '37',
  hsnCode: '5007',
};

export default function AdminSettings() {
  const [shipping, setShipping] = useState({ feeSouth: 120, feeNorth: 150, fee: 120, freeThreshold: 0 });
  const [gst, setGst] = useState(defaultGstSettings);
  const [contact, setContact] = useState({ email: '', phone: '', whatsapp: '', address: '' });
  const [banner, setBanner] = useState({ text: 'Handcrafted Heirlooms • Free shipping on orders above ₹5,000', active: true });
  const [testEmail, setTestEmail] = useState('');
  const [testBusy, setTestBusy] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      const { settings } = await api.getSettings();
      if (settings.shipping_settings) {
        setShipping({
          feeSouth: 120,
          feeNorth: 150,
          fee: 120,
          freeThreshold: 0,
          ...settings.shipping_settings,
        });
      }
      if (settings.gst_settings) setGst({ ...defaultGstSettings, ...settings.gst_settings });
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

  async function handleTestEmail(e) {
    e.preventDefault();
    setTestBusy(true);
    setTestResult(null);
    try {
      const res = await api.testAdminEmail(testEmail || undefined);
      setTestResult({
        ok: true,
        message: res.message || 'Test email dispatched successfully! Please check your inbox or spam folder.',
        provider: res.provider,
      });
    } catch (err) {
      setTestResult({ ok: false, message: err.message || 'Failed to send test email.' });
    } finally {
      setTestBusy(false);
    }
  }

  if (loading) return <div className="admin-settings"><p className="empty">Loading settings…</p></div>;

  return (
    <div className="admin-settings">
      <div className="admin-page-head">
        <h1>Store &amp; Logistics Settings</h1>
        <p>Configure global delivery rates, GST and tax calculation, store contact channels, and promotional announcements.</p>
      </div>

      {saved && <p className="admin-success">{saved}</p>}
      {error && <p className="admin-error">{error}</p>}

      <div className="settings-grid">
        {/* Shipping Settings Card */}
        <div className="settings-card">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <TruckIcon width={18} height={18} style={{ color: 'var(--maroon-900)', flexShrink: 0 }} />
            Delivery &amp; Regional Shipping Charges
          </h3>
          <p className="card-sub">Automatic pincode-based delivery rates and minimum order threshold for free shipping.</p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave('shipping_settings', {
                ...shipping,
                fee: shipping.feeSouth || 120,
              });
            }}
          >
            <div className="form-row">
              <label>
                South India Delivery Fee (₹)
                <input
                  type="number"
                  min="0"
                  value={shipping.feeSouth ?? 120}
                  onChange={(e) => setShipping({ ...shipping, feeSouth: Number(e.target.value) })}
                  required
                />
                <span className="field-hint">PINs starting with 5 or 6 (AP, Telangana, Karnataka, Tamil Nadu, Kerala, Puducherry)</span>
              </label>

              <label>
                North &amp; Rest of India Delivery Fee (₹)
                <input
                  type="number"
                  min="0"
                  value={shipping.feeNorth ?? 150}
                  onChange={(e) => setShipping({ ...shipping, feeNorth: Number(e.target.value) })}
                  required
                />
                <span className="field-hint">All other Indian PINs (starting with 1, 2, 3, 4, 7, 8)</span>
              </label>
            </div>

            <div className="form-row" style={{ marginTop: 12 }}>
              <label>
                Free Shipping Threshold (₹)
                <input
                  type="number"
                  min="0"
                  value={shipping.freeThreshold ?? 0}
                  onChange={(e) => setShipping({ ...shipping, freeThreshold: Number(e.target.value) })}
                  required
                />
                <span className="field-hint">Set to 0 to disable free delivery, or an amount (e.g. ₹5,000) to grant free shipping above it</span>
              </label>
            </div>

            <p className="field-hint" style={{ marginTop: 8 }}>
              Delivery fee is dynamically decided at checkout from the customer's delivery pincode: ₹{shipping.feeSouth ?? 120} for South India, ₹{shipping.feeNorth ?? 150} for North &amp; Rest of India. It is never displayed in the Cart drawer.
            </p>

            <button type="submit" className="btn btn-primary btn-sm">Save Shipping Rules</button>
          </form>
        </div>

        {/* GST & Tax Billing Settings Card */}
        <div className="settings-card">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <TaxIcon width={18} height={18} style={{ color: 'var(--maroon-900)', flexShrink: 0 }} />
            GST &amp; Tax Billing Settings
          </h3>
          <p className="card-sub">
            Configure your business GSTIN, tax percentage, calculation mode, and legal invoice details.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave('gst_settings', gst);
            }}
          >
            <label className="checkbox-row" style={{ marginBottom: 4 }}>
              <input
                type="checkbox"
                checked={gst.enabled}
                onChange={(e) => setGst({ ...gst, enabled: e.target.checked })}
              />
              <strong>Enable GST Billing &amp; Official Tax Invoices</strong>
            </label>
            <p className="field-hint" style={{ marginTop: -4, marginBottom: 12 }}>
              When enabled, tax is calculated on orders, itemized with CGST + SGST (or IGST for interstate deliveries), and printed on official PDF Tax Invoices.
            </p>

            {gst.enabled && (
              <>
                <div className="form-row">
                  <label>
                    Business GSTIN / Tax ID
                    <input
                      type="text"
                      placeholder="e.g. 37AAAAA0000A1Z5"
                      value={gst.gstin}
                      onChange={(e) => setGst({ ...gst, gstin: e.target.value.toUpperCase() })}
                      maxLength={15}
                      required={gst.enabled}
                    />
                    <span className="field-hint">15-character Goods &amp; Services Tax Identification Number</span>
                  </label>

                  <label>
                    Legal Registered Firm Name
                    <input
                      type="text"
                      placeholder="e.g. Ravichandra Textiles &amp; Handlooms"
                      value={gst.legalName}
                      onChange={(e) => setGst({ ...gst, legalName: e.target.value })}
                      required={gst.enabled}
                    />
                    <span className="field-hint">Official trade name printed on tax invoices</span>
                  </label>
                </div>

                <div className="form-row">
                  <label>
                    GST Calculation Mode
                    <select
                      value={gst.type}
                      onChange={(e) => setGst({ ...gst, type: e.target.value })}
                    >
                      <option value="inclusive">Inclusive (Prices already include GST - Recommended)</option>
                      <option value="exclusive">Exclusive (GST added on top of product prices at checkout)</option>
                    </select>
                    <span className="field-hint">
                      {gst.type === 'inclusive'
                        ? 'Catalog prices stay clean; invoice breaks out taxable amount and tax component.'
                        : 'GST percentage is added on top of merchandise subtotal at billing.'}
                    </span>
                  </label>

                  <label>
                    Applicable GST Rate (%)
                    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                      <input
                        type="number"
                        min="0"
                        max="28"
                        step="0.5"
                        value={gst.rate}
                        onChange={(e) => setGst({ ...gst, rate: Number(e.target.value) })}
                        style={{ flex: 1 }}
                        required={gst.enabled}
                      />
                      <div className="rate-chips">
                        {[5, 12, 18].map((r) => (
                          <button
                            type="button"
                            key={r}
                            className={`chip-btn ${gst.rate === r ? 'active' : ''}`}
                            onClick={() => setGst({ ...gst, rate: r })}
                          >
                            {r}%
                          </button>
                        ))}
                      </div>
                    </div>
                    <span className="field-hint">Standard GST for handloom &amp; silk sarees is 5%</span>
                  </label>
                </div>

                <div className="form-row three">
                  <label>
                    HSN / SAC Code
                    <input
                      type="text"
                      placeholder="e.g. 5007"
                      value={gst.hsnCode}
                      onChange={(e) => setGst({ ...gst, hsnCode: e.target.value })}
                    />
                    <span className="field-hint">HSN 5007 = Silk Weaves</span>
                  </label>

                  <label>
                    Store State / Place of Supply
                    <input
                      type="text"
                      placeholder="e.g. Andhra Pradesh"
                      value={gst.state}
                      onChange={(e) => setGst({ ...gst, state: e.target.value })}
                    />
                    <span className="field-hint">Origin state for intrastate split</span>
                  </label>

                  <label>
                    State Code (GST)
                    <input
                      type="text"
                      placeholder="e.g. 37"
                      value={gst.stateCode}
                      onChange={(e) => setGst({ ...gst, stateCode: e.target.value })}
                      maxLength={2}
                    />
                    <span className="field-hint">AP = 37, TS = 36, KA = 29, TN = 33</span>
                  </label>
                </div>

                <div className="gst-explainer-box">
                  <strong>Automatic Tax Split Logic:</strong>
                  <p>
                    • <strong>Intrastate Orders ({gst.state || 'Same State'}):</strong> Split into <strong>CGST ({gst.rate / 2}%)</strong> + <strong>SGST ({gst.rate / 2}%)</strong>.<br />
                    • <strong>Interstate Orders (Rest of India):</strong> Billed as <strong>IGST ({gst.rate}%)</strong>.<br />
                    • Printed cleanly in the legal PDF Tax Invoice for every customer order.
                  </p>
                </div>
              </>
            )}

            <button type="submit" className="btn btn-primary btn-sm">Save GST &amp; Tax Settings</button>
          </form>
        </div>

        {/* Announcement Banner */}
        <div className="settings-card">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <SpeakerIcon width={18} height={18} style={{ color: 'var(--maroon-900)', flexShrink: 0 }} />
            Store Announcement Banner
          </h3>
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
          <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <PhoneIcon width={18} height={18} style={{ color: 'var(--maroon-900)', flexShrink: 0 }} />
            Customer Support Details
          </h3>
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
                  placeholder="ravichandratextiles39@gmail.com"
                />
              </label>
              <label>
                Support Phone
                <input
                  type="tel"
                  value={contact.phone}
                  onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                  placeholder="+91 83175 51337"
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

        {/* Email & Notifications Service */}
        <div className="settings-card">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: '18px' }}>✉️</span>
            Email Delivery &amp; Notifications Service
          </h3>
          <p className="card-sub">
            Sends automated order confirmations, PDF tax invoices, and account security notices via SMTP or Resend.
          </p>

          <form onSubmit={handleTestEmail} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div className="form-row">
              <label>
                Send Test Verification Email To:
                <input
                  type="email"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  placeholder="ravichandratextiles39@gmail.com"
                />
                <span className="field-hint">Leave blank to use default admin address</span>
              </label>
            </div>

            {testResult && (
              <div
                style={{
                  padding: '12px 14px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  background: testResult.ok ? '#e8f5e9' : '#ffebee',
                  color: testResult.ok ? '#2e7d32' : '#c62828',
                  border: `1px solid ${testResult.ok ? '#c8e6c9' : '#ffcdd2'}`,
                }}
              >
                <strong>{testResult.ok ? '✓ Success: ' : '✕ Delivery Issue: '}</strong>
                {testResult.message}
                {testResult.provider && (
                  <div style={{ marginTop: '4px', fontSize: '11.5px', opacity: 0.85 }}>
                    Sent via: <strong>{testResult.provider.toUpperCase()}</strong>
                  </div>
                )}
              </div>
            )}

            <div>
              <button type="submit" className="btn btn-secondary btn-sm" disabled={testBusy}>
                {testBusy ? 'Sending Test Email…' : 'Send Test Email Now'}
              </button>
            </div>
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
        .settings-card input, .settings-card select {
          font-size: 13px;
          padding: 8px 10px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--stone-300);
          background: #ffffff;
        }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .form-row.three { grid-template-columns: 1fr 1fr 1fr; }
        .checkbox-row { flex-direction: row !important; align-items: center; gap: 8px !important; cursor: pointer; }
        .field-hint { font-size: 11.5px; color: var(--ink-400); margin: 2px 0 6px; }

        .rate-chips { display: flex; gap: 4px; }
        .chip-btn {
          padding: 7px 11px;
          font-size: 12px;
          font-weight: 500;
          border-radius: 4px;
          border: 1px solid var(--stone-300);
          background: #ffffff;
          color: var(--ink-700);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .chip-btn:hover {
          border-color: var(--maroon-900);
          color: var(--maroon-900);
        }
        .chip-btn.active {
          background: var(--maroon-900);
          color: #ffffff;
          border-color: var(--maroon-900);
        }

        .gst-explainer-box {
          background: #faf6f0;
          border: 1px solid #e7dac9;
          border-radius: var(--radius-sm);
          padding: 12px 14px;
          font-size: 12px;
          line-height: 1.6;
          color: var(--ink-700);
        }
        .gst-explainer-box strong { color: var(--maroon-900); }
        .gst-explainer-box p { margin: 4px 0 0; }

        @media (max-width: 640px) {
          .admin-page-head { margin-bottom: 18px; }
          .admin-page-head h1 { font-size: 22px; margin-bottom: 6px; }
          .settings-card { padding: 18px 16px; }
          .form-row, .form-row.three { grid-template-columns: 1fr; gap: 12px; }
          .settings-card .btn { width: 100%; text-align: center; justify-content: center; }
        }
      `}</style>
    </div>
  );
}
