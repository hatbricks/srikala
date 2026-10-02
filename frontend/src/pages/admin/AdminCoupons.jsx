import { useEffect, useState } from 'react';
import { api } from '../../data/api';

const emptyForm = {
  code: '',
  type: 'percent',
  value: '',
  minOrder: '',
  maxDiscount: '',
  startDate: '',
  expiresAt: '',
  usageLimit: '',
  perUserLimit: 1,
  firstOrderOnly: false,
  active: true,
};

export default function AdminCoupons() {
  const [coupons, setCoupons] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => { refresh(); }, []);

  function refresh() {
    api.getCoupons()
      .then(({ coupons }) => setCoupons(coupons))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.code.trim() || !form.value) return;
    setError('');
    try {
      await api.createCoupon({
        code: form.code.trim(),
        type: form.type,
        value: Number(form.value),
        minOrder: Number(form.minOrder) || 0,
        maxDiscount: form.maxDiscount ? Number(form.maxDiscount) : null,
        startDate: form.startDate ? new Date(form.startDate).toISOString() : null,
        expiresAt: form.expiresAt ? new Date(form.expiresAt).toISOString() : null,
        usageLimit: form.usageLimit ? Number(form.usageLimit) : null,
        perUserLimit: Number(form.perUserLimit) || 1,
        firstOrderOnly: Boolean(form.firstOrderOnly),
        active: form.active,
      });
      setForm(emptyForm);
      refresh();
    } catch (err) {
      setError(err.message);
    }
  }

  async function toggleActive(coupon) {
    try {
      await api.updateCoupon(coupon.id, { active: !coupon.active });
      refresh();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this coupon? Customers will no longer be able to use it.')) return;
    try {
      await api.deleteCoupon(id);
      refresh();
    } catch (err) {
      setError(err.message);
    }
  }

  function describe(c) {
    const amount = c.type === 'percent' ? `${c.value}% off` : `₹${c.value} off`;
    const max = c.type === 'percent' && c.max_discount ? ` (up to ₹${c.max_discount})` : '';
    const min = c.min_order > 0 ? ` on orders above ₹${c.min_order}` : '';
    const first = c.first_order_only ? ' · 1st order only' : '';
    const limit = c.usage_limit ? ` · Max ${c.usage_limit} uses` : '';
    return amount + max + min + first + limit;
  }

  return (
    <div>
      <div className="admin-page-head">
        <h1>Coupons</h1>
        <p>Create discount codes for checkout. Enforce usage limits, date windows, minimum order values, and first-order privileges automatically.</p>
      </div>

      {error && <p className="admin-error">{error}</p>}

      <div className="cms-layout">
        <form className="cms-form" onSubmit={handleSubmit}>
          <h3>New coupon</h3>

          <label>
            Coupon code
            <input
              type="text"
              value={form.code}
              placeholder="e.g. FESTIVE20"
              onChange={(e) => setForm((f) => ({ ...f, code: e.target.value.toUpperCase() }))}
              required
            />
          </label>

          <div className="form-row">
            <label>
              Type
              <select value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}>
                <option value="percent">Percent off</option>
                <option value="flat">Flat amount off</option>
              </select>
            </label>
            <label>
              {form.type === 'percent' ? 'Percent (%)' : 'Amount (₹)'}
              <input
                type="number"
                min="1"
                max={form.type === 'percent' ? 100 : undefined}
                value={form.value}
                onChange={(e) => setForm((f) => ({ ...f, value: e.target.value }))}
                required
              />
            </label>
          </div>

          {form.type === 'percent' && (
            <label>
              Max discount cap (₹) <span className="opt-tag">optional</span>
              <input
                type="number"
                min="1"
                value={form.maxDiscount}
                placeholder="e.g. 1500 (leave blank for unlimited)"
                onChange={(e) => setForm((f) => ({ ...f, maxDiscount: e.target.value }))}
              />
            </label>
          )}

          <div className="form-row">
            <label>
              Minimum order (₹)
              <input
                type="number"
                min="0"
                value={form.minOrder}
                placeholder="0"
                onChange={(e) => setForm((f) => ({ ...f, minOrder: e.target.value }))}
              />
            </label>
            <label>
              Limit per customer
              <input
                type="number"
                min="1"
                value={form.perUserLimit}
                onChange={(e) => setForm((f) => ({ ...f, perUserLimit: e.target.value }))}
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Valid from
              <input
                type="date"
                value={form.startDate}
                onChange={(e) => setForm((f) => ({ ...f, startDate: e.target.value }))}
              />
            </label>
            <label>
              Expires on
              <input
                type="date"
                value={form.expiresAt}
                onChange={(e) => setForm((f) => ({ ...f, expiresAt: e.target.value }))}
              />
            </label>
          </div>

          <label>
            Total redemption cap <span className="opt-tag">optional</span>
            <input
              type="number"
              min="1"
              value={form.usageLimit}
              placeholder="e.g. 50 (leave empty for unlimited)"
              onChange={(e) => setForm((f) => ({ ...f, usageLimit: e.target.value }))}
            />
          </label>

          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={form.firstOrderOnly}
              onChange={(e) => setForm((f) => ({ ...f, firstOrderOnly: e.target.checked }))}
            />
            Valid for customer&apos;s first order only
          </label>

          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={form.active}
              onChange={(e) => setForm((f) => ({ ...f, active: e.target.checked }))}
            />
            Active immediately
          </label>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">Create Coupon</button>
          </div>
        </form>

        <div className="cms-list">
          {loading && <p className="empty">Loading coupons…</p>}
          {!loading && coupons.length === 0 && <p className="empty">No coupons yet.</p>}
          {coupons.map((c) => (
            <div className="cms-row" key={c.id}>
              <div className="row-info">
                <strong>{c.code}</strong>
                <span>
                  {describe(c)}
                  {c.expires_at && ` · expires ${new Date(c.expires_at).toLocaleDateString('en-IN')}`}
                  {!c.active && ' · inactive'}
                </span>
              </div>
              <div className="row-actions">
                <button onClick={() => toggleActive(c)}>{c.active ? 'Deactivate' : 'Activate'}</button>
                <button onClick={() => handleDelete(c.id)} className="danger">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .admin-page-head { margin-bottom: 30px; }
        .admin-page-head h1 { font-size: 26px; margin-bottom: 8px; }
        .admin-page-head p { font-size: 13px; color: var(--ink-400); max-width: 560px; line-height: 1.6; }
        .admin-error { font-size: 12.5px; color: #a13a3a; margin-bottom: 16px; }

        .cms-layout { display: grid; grid-template-columns: 360px 1fr; gap: 28px; align-items: flex-start; }
        .cms-form {
          background: var(--paper);
          border-radius: var(--radius-md);
          padding: 26px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .cms-form h3 { font-family: var(--font-display); font-size: 18px; color: var(--maroon-900); margin: 0; }
        .cms-form label { display: flex; flex-direction: column; gap: 6px; font-size: 12.5px; color: var(--ink-600); }
        .cms-form input, .cms-form select {
          padding: 11px 12px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--stone-200);
          font-family: var(--font-body);
          font-size: 13.5px;
          background: var(--paper);
        }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .checkbox-row { flex-direction: row !important; align-items: center; gap: 8px !important; }
        .checkbox-row input { width: auto; padding: 0; }
        .form-actions .btn { padding: 11px 20px; font-size: 13px; }

        .cms-list { display: flex; flex-direction: column; gap: 10px; }
        .cms-row {
          background: var(--paper);
          border-radius: var(--radius-md);
          padding: 14px 16px;
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .row-info { flex: 1; display: flex; flex-direction: column; gap: 2px; }
        .row-info strong { font-size: 14px; color: var(--ink-900); letter-spacing: 0.03em; }
        .row-info span { font-size: 12px; color: var(--ink-400); }
        .row-actions { display: flex; gap: 10px; }
        .row-actions button { background: none; border: none; font-size: 12.5px; color: var(--maroon-900); }
        .row-actions .danger { color: #a13a3a; }
        .empty { color: var(--ink-400); font-size: 13.5px; }

        @media (max-width: 980px) {
          .cms-layout { grid-template-columns: 1fr; gap: 20px; }
        }

        @media (max-width: 640px) {
          .admin-page-head { margin-bottom: 18px; }
          .admin-page-head h1 { font-size: 22px; margin-bottom: 6px; }
          .cms-form { padding: 18px 14px; }
          .form-row { grid-template-columns: 1fr; }
          .form-actions .btn { width: 100%; text-align: center; justify-content: center; }

          .cms-row {
            flex-direction: column;
            align-items: stretch;
            gap: 10px;
            padding: 14px;
          }
          .row-actions {
            justify-content: flex-end;
            padding-top: 8px;
            border-top: 1px solid var(--stone-100);
            gap: 8px;
          }
          .row-actions button {
            padding: 6px 14px;
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
