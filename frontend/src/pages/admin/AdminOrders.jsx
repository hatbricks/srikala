import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../data/api';
import { formatINR } from '../../data/store';

const statusLabels = {
  paid: 'Paid',
  paid_oversold: 'Needs attention',
  created: 'Payment pending',
  failed: 'Failed',
  cancelled: 'Cancelled',
};

const shipmentStatuses = [
  'PENDING',
  'ORDER_CREATED',
  'AWB_ASSIGNED',
  'SHIPPED',
  'IN_TRANSIT',
  'OUT_FOR_DELIVERY',
  'DELIVERED',
  'CANCELLED',
  'RTO',
];

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');
  const [invoiceId, setInvoiceId] = useState(null);
  const [invoiceError, setInvoiceError] = useState(null);
  const [actionBusy, setActionBusy] = useState({});

  useEffect(() => {
    loadOrders();
  }, []);

  function loadOrders() {
    api
      .getAllOrders()
      .then(({ orders }) => setOrders(orders))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  async function handleDownloadInvoice(order) {
    setInvoiceError(null);
    setInvoiceId(order.id);
    try {
      await api.downloadInvoice(order.id);
    } catch (err) {
      setInvoiceError({ id: order.id, message: err.message });
    } finally {
      setInvoiceId(null);
    }
  }

  async function handleUpdateShipmentStatus(orderId, newStatus) {
    setActionBusy((prev) => ({ ...prev, [orderId]: true }));
    try {
      await api.updateOrderStatus(orderId, { shipmentStatus: newStatus });
      loadOrders();
    } catch (err) {
      setError(err.message);
    } finally {
      setActionBusy((prev) => ({ ...prev, [orderId]: false }));
    }
  }

  async function handleAssignAWB(orderId) {
    setActionBusy((prev) => ({ ...prev, [orderId]: true }));
    try {
      await api.assignOrderAWB(orderId);
      loadOrders();
    } catch (err) {
      setError(err.message);
    } finally {
      setActionBusy((prev) => ({ ...prev, [orderId]: false }));
    }
  }

  const filteredOrders = orders.filter((o) => {
    if (filter === 'ALL') return true;
    if (filter === 'PAID') return o.payment_status === 'PAID' || o.status === 'paid';
    if (filter === 'PENDING_SHIP') return (o.payment_status === 'PAID' || o.status === 'paid') && !['delivered', 'cancelled'].includes(String(o.shipment_status).toLowerCase());
    if (filter === 'SHIPPED') return ['shipped', 'in_transit', 'out_for_delivery'].includes(String(o.shipment_status).toLowerCase());
    if (filter === 'DELIVERED') return String(o.shipment_status).toLowerCase() === 'delivered';
    if (filter === 'CANCELLED') return o.status === 'cancelled';
    return true;
  });

  return (
    <div className="admin-orders">
      <div className="admin-page-head">
        <div className="head-row">
          <div>
            <h1>Orders &amp; Shipments</h1>
            <p>Every transaction across the store with Shiprocket dispatch tracking, AWB generation, Razorpay IDs, and item variants.</p>
          </div>
          <div className="filter-tabs">
            {['ALL', 'PAID', 'PENDING_SHIP', 'SHIPPED', 'DELIVERED', 'CANCELLED'].map((tab) => (
              <button
                key={tab}
                type="button"
                className={`tab-btn ${filter === tab ? 'active' : ''}`}
                onClick={() => setFilter(tab)}
              >
                {tab.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {error && <p className="admin-error">{error}</p>}
      {loading && <p className="empty">Loading orders…</p>}

      {!loading && (
        <div className="orders-list">
          {filteredOrders.length === 0 && <p className="empty">No orders matching this filter.</p>}
          {filteredOrders.map((o) => (
            <div className="order-row" key={o.id}>
              {o.status === 'paid_oversold' && (
                <div className="oversold-banner">
                  ⚠ Paid after stock ran out for one or more items — check inventory and contact the customer if needed.
                </div>
              )}
              {o.status === 'cancelled' && (
                <div className="cancelled-banner">
                  Cancelled {o.cancelled_by ? `by ${o.cancelled_by}` : ''} — {o.refund_percent}% refund ({formatINR(o.refund_amount || 0)}) {o.razorpay_payment_id ? 'was processed via Razorpay.' : 'needs a manual refund.'}
                  {o.cancellation_reason && <span className="cancel-reason">Reason: {o.cancellation_reason}</span>}
                </div>
              )}

              <div className="order-row-head">
                <div className="order-identity">
                  <strong>{o.order_number || `#SK${o.id}`}</strong>
                  <span className="order-customer">{o.customer_name} ({o.customer_email || o.customer_mobile})</span>
                  <span className="order-date">{new Date(o.created_at).toLocaleString('en-IN')}</span>
                </div>
                <div className="status-pill-group">
                  <span className={`status-pill status-${(o.payment_status || o.status).toLowerCase()}`}>
                    Payment: {statusLabels[o.status] || o.payment_status || o.status}
                  </span>
                  <span className="status-pill status-shipment">
                    Logistics: {o.shipment_status || 'PENDING'}
                  </span>
                </div>
              </div>

              <div className="order-detail-grid">
                <div className="detail-block">
                  <p className="detail-label">Shipping address</p>
                  <p className="detail-value"><strong>{o.address_name}</strong> · {o.address_mobile}</p>
                  <p className="detail-value">
                    {o.address_line1}{o.address_line2 ? `, ${o.address_line2}` : ''}
                  </p>
                  <p className="detail-value">
                    {o.address_city}, {o.address_state} — {o.address_pincode}, {o.address_country || 'India'}
                  </p>
                </div>

                <div className="detail-block">
                  <p className="detail-label">Shiprocket Fulfillment</p>
                  <p className="detail-value">Courier: <strong>{o.courier_name || 'Standard Courier'}</strong></p>
                  <p className="detail-value mono">AWB: {o.awb_code || 'Not Assigned'}</p>
                  {o.awb_code && (
                    <a
                      href={`https://shiprocket.co/tracking/${o.awb_code}`}
                      target="_blank"
                      rel="noreferrer"
                      className="tracking-link"
                    >
                      Track with courier ↗
                    </a>
                  )}
                  {o.shiprocket_order_id && (
                    <p className="detail-value mono text-muted">SR Order: {o.shiprocket_order_id}</p>
                  )}
                </div>

                <div className="detail-block">
                  <p className="detail-label">Payment &amp; Ledger</p>
                  <p className="detail-value mono">RP Order: {o.razorpay_order_id || '—'}</p>
                  <p className="detail-value mono">Payment ID: {o.razorpay_payment_id || '—'}</p>
                  {o.coupon_code && (
                    <p className="detail-value coupon-tag">{o.coupon_code} applied · −{formatINR(o.discount)}</p>
                  )}
                  <p className="detail-value">Package Weight: {o.total_weight_grams || 600}g</p>
                </div>
              </div>

              {/* Items in Order */}
              <div className="order-row-items">
                {o.items.map((item) => (
                  <div className="item-row" key={item.id}>
                    <Link to={`/products/${item.product_id}`} target="_blank" rel="noopener noreferrer" className="item-link">
                      {item.product_image && <img src={item.product_image} alt="" />}
                      <div>
                        <span className="item-name">{item.product_name}</span>
                        {item.variant_name && <span className="variant-tag">Color: {item.variant_name}</span>}
                        <span className="item-sku">SKU: {item.sku || 'N/A'}</span>
                      </div>
                    </Link>
                    <span className="item-qty-price">{item.qty} × {formatINR(item.price)}</span>
                  </div>
                ))}
              </div>

              {/* Fulfillment Actions & Status Controls */}
              <div className="fulfillment-bar">
                <div className="status-updater">
                  <span>Update Shipment Status:</span>
                  <select
                    value={o.shipment_status || 'PENDING'}
                    disabled={actionBusy[o.id]}
                    onChange={(e) => handleUpdateShipmentStatus(o.id, e.target.value)}
                  >
                    {shipmentStatuses.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                <div className="order-actions-right">
                  {!o.awb_code && o.shiprocket_shipment_id && (
                    <button
                      type="button"
                      className="btn btn-outline btn-sm"
                      disabled={actionBusy[o.id]}
                      onClick={() => handleAssignAWB(o.id)}
                    >
                      {actionBusy[o.id] ? 'Assigning…' : 'Generate Shiprocket AWB'}
                    </button>
                  )}

                  {o.paid_at && (
                    <button
                      type="button"
                      className="btn btn-outline btn-sm invoice-btn"
                      disabled={invoiceId === o.id}
                      onClick={() => handleDownloadInvoice(o)}
                    >
                      {invoiceId === o.id ? 'Preparing…' : 'Download Invoice'}
                    </button>
                  )}
                </div>
              </div>

              <div className="order-row-foot">
                <span>Shipping: {o.shipping_fee === 0 ? 'Free' : formatINR(o.shipping_fee)}</span>
                {o.discount > 0 && <span>Discount: −{formatINR(o.discount)}</span>}
                <strong className="order-final-total">
                  Total: {formatINR(o.total_amount || (o.subtotal - (o.discount || 0) + (o.shipping_fee || 0)))}
                </strong>
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        .admin-orders { padding-bottom: 50px; }
        .admin-page-head { margin-bottom: 24px; }
        .head-row { display: flex; justify-content: space-between; align-items: flex-end; gap: 20px; flex-wrap: wrap; }
        .admin-page-head h1 { font-size: 26px; margin-bottom: 6px; }
        .admin-page-head p { font-size: 13px; color: var(--ink-400); max-width: 580px; line-height: 1.6; }
        .filter-tabs { display: flex; gap: 6px; flex-wrap: wrap; }
        .tab-btn {
          font-size: 11.5px;
          padding: 6px 12px;
          border-radius: 999px;
          border: 1px solid var(--stone-300);
          background: #fff;
          cursor: pointer;
          color: var(--ink-600);
        }
        .tab-btn.active {
          background: var(--maroon-900);
          color: #fff;
          border-color: var(--maroon-900);
        }

        .admin-error { font-size: 12.5px; color: #a13a3a; margin-bottom: 16px; }
        .empty { color: var(--ink-400); font-size: 13.5px; }

        .orders-list { display: flex; flex-direction: column; gap: 16px; }
        .order-row {
          background: var(--paper);
          border-radius: var(--radius-md);
          border: 1px solid var(--stone-200);
          padding: 18px 20px;
        }
        .order-row-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--stone-200);
          flex-wrap: wrap;
          gap: 10px;
        }
        .order-identity strong { color: var(--maroon-900); font-size: 15px; margin-right: 10px; }
        .order-customer { font-size: 13px; color: var(--ink-700); margin-right: 10px; }
        .order-date { font-size: 12px; color: var(--ink-400); }

        .status-pill-group { display: flex; gap: 8px; }
        .status-pill { font-size: 11px; padding: 4px 10px; border-radius: 999px; font-weight: 500; }
        .status-paid { background: #e8f2e6; color: #3c7a3c; }
        .status-created, .status-pending { background: #fdf0d5; color: #8a5a10; }
        .status-failed { background: #f6e3e3; color: #a13a3a; }
        .status-paid_oversold { background: #fbeacb; color: #8a5a10; }
        .status-cancelled { background: var(--stone-200); color: var(--ink-600); }
        .status-shipment { background: #e0f2fe; color: #0369a1; }

        .order-detail-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 18px;
          background: var(--stone-50);
          padding: 12px 16px;
          border-radius: var(--radius-sm);
          font-size: 12.5px;
          margin-bottom: 14px;
        }
        @media (max-width: 800px) {
          .order-detail-grid { grid-template-columns: 1fr; }
        }
        .detail-label { font-size: 11px; font-weight: 600; text-transform: uppercase; color: var(--ink-400); margin: 0 0 4px; }
        .detail-value { margin: 2px 0; color: var(--ink-700); }
        .mono { font-family: monospace; font-size: 11.5px; }
        .coupon-tag { color: #3c7a3c; font-weight: 500; }
        .tracking-link { font-size: 11.5px; color: var(--maroon-900); text-decoration: underline; display: inline-block; margin-top: 2px; }

        .order-row-items { display: flex; flex-direction: column; gap: 8px; margin-bottom: 14px; }
        .item-row { display: flex; justify-content: space-between; align-items: center; font-size: 13px; }
        .item-link { display: flex; align-items: center; gap: 10px; text-decoration: none; color: inherit; }
        .item-link img { width: 36px; height: 46px; object-fit: cover; border-radius: 4px; }
        .variant-tag { font-size: 11px; color: var(--maroon-900); background: #fdf6f5; padding: 1px 6px; border-radius: 4px; margin-left: 6px; }
        .item-sku { font-size: 11px; color: var(--ink-400); margin-left: 6px; }

        .fulfillment-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 14px;
          background: #fdfaf9;
          border: 1px solid var(--stone-200);
          border-radius: var(--radius-sm);
          margin-bottom: 12px;
          flex-wrap: wrap;
          gap: 12px;
        }
        .status-updater { display: flex; align-items: center; gap: 10px; font-size: 12.5px; }
        .status-updater select { font-size: 12px; padding: 4px 8px; border-radius: 4px; border: 1px solid var(--stone-300); }
        .order-actions-right { display: flex; gap: 8px; }

        .order-row-foot {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 16px;
          font-size: 12.5px;
          color: var(--ink-600);
          padding-top: 8px;
        }
        .order-final-total { font-size: 15px; color: var(--maroon-900); }

        .oversold-banner, .cancelled-banner {
          font-size: 12px;
          padding: 8px 12px;
          border-radius: var(--radius-sm);
          margin-bottom: 12px;
        }
        .oversold-banner { background: #fbeacb; color: #8a5a10; }
        .cancelled-banner { background: #f6e3e3; color: #a13a3a; }
        .cancel-reason { display: block; font-weight: 500; margin-top: 2px; }
      `}</style>
    </div>
  );
}
