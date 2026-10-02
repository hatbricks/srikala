import { useEffect, useState } from 'react';
import { api } from '../../data/api';
import { RefreshIcon } from '../../components/admin/AdminIcons';

const emptyForm = {
  nickname: '',
  address: '',
  city: '',
  state: '',
  pincode: '',
  phone: '',
  isDefault: false,
};

export default function AdminPickupLocations() {
  const [locations, setLocations] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadLocations();
  }, []);

  function loadLocations() {
    api
      .getPickupLocations()
      .then(({ pickupLocations }) => setLocations(pickupLocations))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await api.addPickupLocation(form);
      setSuccess('Pickup location added successfully.');
      setForm(emptyForm);
      loadLocations();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleSetDefault(id) {
    try {
      await api.setDefaultPickupLocation(id);
      loadLocations();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this pickup location?')) return;
    try {
      await api.deletePickupLocation(id);
      loadLocations();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleSync() {
    setSyncing(true);
    setError('');
    setSuccess('');
    try {
      const res = await api.syncPickupLocations();
      setSuccess(res.message || 'Locations synced with Shiprocket.');
      loadLocations();
    } catch (err) {
      setError(err.message);
    } finally {
      setSyncing(false);
    }
  }

  return (
    <div className="admin-pickup">
      <div className="admin-page-head">
        <div className="head-row">
          <div>
            <h1>Shiprocket Pickup Warehouses</h1>
            <p>Manage store origin locations where couriers pick up packed orders. Set the primary dispatch warehouse used for dynamic rate calculations.</p>
          </div>
          <button
            type="button"
            className="btn btn-outline sync-btn"
            style={{ display: 'inline-flex', alignItems: 'center' }}
            disabled={syncing}
            onClick={handleSync}
          >
            {syncing ? 'Syncing…' : <><RefreshIcon width={14} height={14} style={{ marginRight: 6 }} /> Sync from Shiprocket</>}
          </button>
        </div>
      </div>

      {error && <p className="admin-error">{error}</p>}
      {success && <p className="admin-success">{success}</p>}

      <div className="cms-layout">
        <form className="cms-form" onSubmit={handleSubmit}>
          <h3>Add Pickup Location</h3>

          <label>
            Location Nickname *
            <input
              type="text"
              placeholder="e.g. Primary Warehouse"
              value={form.nickname}
              onChange={(e) => setForm({ ...form, nickname: e.target.value })}
              required
            />
          </label>

          <label>
            Street Address *
            <textarea
              rows="2"
              placeholder="Building, street, landmark"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              required
            />
          </label>

          <div className="form-row">
            <label>
              City *
              <input
                type="text"
                placeholder="e.g. Hyderabad"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                required
              />
            </label>
            <label>
              State *
              <input
                type="text"
                placeholder="e.g. Telangana"
                value={form.state}
                onChange={(e) => setForm({ ...form, state: e.target.value })}
                required
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Pincode *
              <input
                type="text"
                placeholder="e.g. 500001"
                maxLength="6"
                value={form.pincode}
                onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                required
              />
            </label>
            <label>
              Contact Phone *
              <input
                type="tel"
                placeholder="e.g. 9876543210"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
              />
            </label>
          </div>

          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={form.isDefault}
              onChange={(e) => setForm({ ...form, isDefault: e.target.checked })}
            />
            Set as default origin for courier dispatch
          </label>

          <button type="submit" className="btn btn-primary">Save Location</button>
        </form>

        <div className="cms-list">
          {loading && <p className="empty">Loading locations…</p>}
          {!loading && locations.length === 0 && <p className="empty">No pickup locations configured yet.</p>}

          {locations.map((loc) => (
            <div className={`cms-row ${loc.is_default ? 'is-default-card' : ''}`} key={loc.id}>
              <div className="row-info">
                <div className="loc-title-row">
                  <strong>{loc.nickname}</strong>
                  {loc.is_default && <span className="default-badge">Primary Dispatch</span>}
                </div>
                <span className="loc-address">{loc.address}, {loc.city}, {loc.state} — {loc.pincode}</span>
                <span className="loc-phone">Phone: {loc.phone}</span>
              </div>

              <div className="row-actions">
                {!loc.is_default && (
                  <button type="button" onClick={() => handleSetDefault(loc.id)}>Set as Default</button>
                )}
                {!loc.is_default && (
                  <button type="button" className="danger" onClick={() => handleDelete(loc.id)}>Delete</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .admin-page-head { margin-bottom: 26px; }
        .head-row { display: flex; justify-content: space-between; align-items: flex-start; gap: 20px; }
        .admin-page-head h1 { font-size: 26px; margin-bottom: 8px; }
        .admin-page-head p { font-size: 13px; color: var(--ink-400); max-width: 600px; line-height: 1.6; }
        .sync-btn { padding: 8px 16px; font-size: 12.5px; white-space: nowrap; }
        .admin-error { font-size: 12.5px; color: #a13a3a; margin-bottom: 16px; }
        .admin-success { font-size: 12.5px; color: #3c7a3c; margin-bottom: 16px; }

        .cms-layout { display: grid; grid-template-columns: 360px 1fr; gap: 28px; align-items: flex-start; }
        .cms-form {
          background: var(--paper);
          border-radius: var(--radius-md);
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          border: 1px solid var(--stone-200);
        }
        .cms-form h3 { margin: 0 0 4px; font-size: 16px; color: var(--ink-900); }
        .cms-form label { display: flex; flex-direction: column; gap: 5px; font-size: 12.5px; color: var(--ink-700); }
        .cms-form input, .cms-form textarea {
          font-size: 13px;
          padding: 8px 10px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--stone-300);
        }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .checkbox-row { flex-direction: row !important; align-items: center; gap: 8px !important; cursor: pointer; }

        .cms-list { display: flex; flex-direction: column; gap: 12px; }
        .cms-row {
          background: var(--paper);
          border-radius: var(--radius-md);
          padding: 16px 20px;
          border: 1px solid var(--stone-200);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
        }
        .is-default-card { border-color: var(--maroon-900); background: #fdfaf9; }
        .loc-title-row { display: flex; align-items: center; gap: 10px; margin-bottom: 4px; }
        .loc-title-row strong { font-size: 14px; color: var(--ink-900); }
        .default-badge {
          font-size: 10.5px;
          font-weight: 600;
          color: #3c7a3c;
          background: #e8f2e6;
          padding: 2px 8px;
          border-radius: 999px;
        }
        .loc-address { font-size: 12.5px; color: var(--ink-600); display: block; }
        .loc-phone { font-size: 12px; color: var(--ink-400); display: block; margin-top: 2px; }

        .row-actions { display: flex; align-items: center; gap: 12px; }
        .row-actions button { background: none; border: none; font-size: 12.5px; color: var(--maroon-900); cursor: pointer; }
        .empty { font-size: 13.5px; color: var(--ink-400); padding: 20px 0; }

        @media (max-width: 900px) {
          .cms-layout { grid-template-columns: 1fr; gap: 20px; }
        }

        @media (max-width: 640px) {
          .admin-page-head { margin-bottom: 18px; }
          .admin-page-head h1 { font-size: 22px; margin-bottom: 6px; }
          .head-row { flex-direction: column; align-items: stretch; gap: 12px; }
          .sync-btn { width: 100%; text-align: center; }
          .cms-form { padding: 18px 14px; }
          .form-row { grid-template-columns: 1fr; }
          .cms-form .btn { width: 100%; text-align: center; justify-content: center; }
          .cms-row {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
            padding: 14px;
          }
          .row-actions {
            justify-content: flex-end;
            padding-top: 8px;
            border-top: 1px solid var(--stone-100);
            gap: 8px;
          }
          .row-actions button {
            padding: 6px 12px;
            background: var(--stone-100);
            border-radius: 4px;
            font-size: 12px;
            font-weight: 500;
          }
          .row-actions .danger { background: #fdf2f2; }
        }
      `}</style>
    </div>
  );
}
