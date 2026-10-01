import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../data/api';
import { formatINR } from '../../data/store';

const statusLabels = {
  paid: 'Paid',
  paid_oversold: 'Needs attention',
  created: 'Payment pending',
  failed: 'Failed',
  cancellation_requested: 'Cancellation Requested',
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

  // Courier & Tracking Modal State
  const [editingShippingOrder, setEditingShippingOrder] = useState(null);
  const [shippingForm, setShippingForm] = useState({
    courierName: '',
    awbCode: '',
    trackingUrl: '',
    shipmentStatus: 'PENDING',
  });
  const [savingShipping, setSavingShipping] = useState(false);

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

  async function handleApproveCancellation(orderId) {
    if (!window.confirm('Approve this cancellation request? This will restore inventory stock and process a refund to the customer via Razorpay.')) {
      return;
    }
    setActionBusy((prev) => ({ ...prev, [orderId]: true }));
    try {
      await api.approveCancellation(orderId);
      loadOrders();
    } catch (err) {
      setError(err.message);
    } finally {
      setActionBusy((prev) => ({ ...prev, [orderId]: false }));
    }
  }

  async function handleRejectCancellation(orderId) {
    const reason = window.prompt(
      'Enter reason for declining cancellation (this will be visible to customer):',
      'Your order has already been processed/packed for courier dispatch.'
    );
    if (reason === null) return;
    setActionBusy((prev) => ({ ...prev, [orderId]: true }));
    try {
      await api.rejectCancellation(orderId, { reason });
      loadOrders();
    } catch (err) {
      setError(err.message);
    } finally {
      setActionBusy((prev) => ({ ...prev, [orderId]: false }));
    }
  }

  function openShippingEditor(order) {
    setEditingShippingOrder(order);
    setShippingForm({
      courierName: order.courier_name || '',
      awbCode: order.awb_code || '',
      trackingUrl: order.tracking_url || '',
      shipmentStatus: order.shipment_status || 'PENDING',
    });
  }

  async function handleSaveShipping(e) {
    e.preventDefault();
    if (!editingShippingOrder) return;
    setSavingShipping(true);
    try {
      await api.updateOrderStatus(editingShippingOrder.id, {
        courierName: shippingForm.courierName.trim(),
        awbCode: shippingForm.awbCode.trim(),
        trackingUrl: shippingForm.trackingUrl.trim(),
        shipmentStatus: shippingForm.shipmentStatus,
      });
      setEditingShippingOrder(null);
      loadOrders();
    } catch (err) {
      setError(err.message);
    } finally {
      setSavingShipping(false);
    }
  }

  const cancellationCount = orders.filter((o) => o.status === 'cancellation_requested').length;

  const filteredOrders = orders.filter((o) => {
    if (filter === 'ALL') return true;
    if (filter === 'CANCELLATION_REQUESTS') return o.status === 'cancellation_requested';
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
            <p>Every prepaid transaction across the store with manual courier dispatch tracking, Razorpay payment verification, and customer cancellation approvals.</p>
          </div>
          <div className="filter-tabs">
            {[
              { id: 'ALL', label: 'All Orders' },
              { id: 'CANCELLATION_REQUESTS', label: `Cancel Requests${cancellationCount > 0 ? ` (${cancellationCount})` : ''}`, highlight: cancellationCount > 0 },
              { id: 'PAID', label: 'Paid' },
              { id: 'PENDING_SHIP', label: 'Pending Ship' },
              { id: 'SHIPPED', label: 'Shipped' },
              { id: 'DELIVERED', label: 'Delivered' },
              { id: 'CANCELLED', label: 'Cancelled' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`tab-btn ${filter === tab.id ? 'active' : ''} ${tab.highlight ? 'tab-highlight' : ''}`}
                onClick={() => setFilter(tab.id)}
              >
                {tab.label}
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
              {o.status === 'cancellation_requested' && (
                <div className="admin-cancel-req-box">
                  <div className="acrb-top">
                    <span className="acrb-alert-badge">⚠️ Action Required</span>
                    <span className="acrb-time">
                      Requested {o.cancellation_requested_at ? new Date(o.cancellation_requested_at).toLocaleString('en-IN') : 'recently'}
                    </span>
                  </div>
                  <h3 className="acrb-heading">Customer Requested Order Cancellation</h3>
                  <p className="acrb-desc">
                    Customer <strong>{o.customer_name}</strong> requested order cancellation.
                    Refund amount: <strong>{formatINR(o.refund_amount || (o.subtotal - (o.discount || 0)))} ({o.refund_percent || 100}%)</strong>.
                  </p>
                  {o.cancellation_reason && (
                    <p className="acrb-reason"><strong>Reason:</strong> &ldquo;{o.cancellation_reason}&rdquo;</p>
                  )}
                  <div className="acrb-btn-row">
                    <button
                      type="button"
                      className="btn btn-sm btn-approve"
                      disabled={actionBusy[o.id]}
                      onClick={() => handleApproveCancellation(o.id)}
                    >
                      {actionBusy[o.id] ? 'Processing…' : '✓ Approve & Process Refund'}
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-reject"
                      disabled={actionBusy[o.id]}
                      onClick={() => handleRejectCancellation(o.id)}
                    >
                      ✕ Reject Request
                    </button>
                    <a
                      href={`https://wa.me/${(o.address_mobile || o.customer_mobile || '').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi ${o.customer_name || 'Customer'}, this is Ravichandra Handlooms regarding your cancellation request for order #${o.order_number || o.id}.`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-sm btn-wa-chat"
                    >
                      💬 WhatsApp Customer
                    </a>
                    <a
                      href={`tel:${o.address_mobile || o.customer_mobile || ''}`}
                      className="btn btn-sm btn-call-cust"
                    >
                      📞 Call Customer
                    </a>
                  </div>
                </div>
              )}

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
                  <p className="detail-label">Courier &amp; Tracking</p>
                  <p className="detail-value">Courier: <strong>{o.courier_name || 'Not Assigned'}</strong></p>
                  <p className="detail-value mono">AWB: {o.awb_code || 'Pending'}</p>
                  {o.tracking_url ? (
                    <a
                      href={o.tracking_url}
                      target="_blank"
                      rel="noreferrer"
                      className="tracking-link"
                    >
                      Live Tracking Link ↗
                    </a>
                  ) : o.awb_code ? (
                    <span className="tracking-hint">Tracking active via {o.courier_name || 'courier'}</span>
                  ) : null}
                  <button
                    type="button"
                    className="btn-edit-shipping"
                    onClick={() => openShippingEditor(o)}
                  >
                    ✏️ {o.awb_code || o.courier_name ? 'Edit Courier / AWB' : '+ Add Courier / AWB'}
                  </button>
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
                  <span>Shipment Status:</span>
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
                  <button
                    type="button"
                    className="btn btn-outline btn-sm"
                    onClick={() => openShippingEditor(o)}
                  >
                    🚚 Courier &amp; AWB
                  </button>

                  {o.paid_at && (
                    <button
                      type="button"
                      className="btn btn-outline btn-sm invoice-btn"
                      disabled={invoiceId === o.id}
                      onClick={() => handleDownloadInvoice(o)}
                    >
                      {invoiceId === o.id ? 'Preparing…' : '📄 Invoice'}
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

      {/* Courier & Tracking Modal */}
      {editingShippingOrder && (
        <div className="modal-backdrop" onClick={() => setEditingShippingOrder(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <h3>Courier &amp; Tracking Details</h3>
              <button type="button" className="close-btn" onClick={() => setEditingShippingOrder(null)}>✕</button>
            </div>
            <form className="shipping-edit-form" onSubmit={handleSaveShipping}>
              <p className="modal-order-tag">
                Order <strong>{editingShippingOrder.order_number || `#SK${editingShippingOrder.id}`}</strong> · {editingShippingOrder.address_name}
              </p>

              <label>
                Courier Name
                <input
                  type="text"
                  placeholder="e.g. DTDC, Delhivery, Blue Dart, Speed Post, Professional"
                  value={shippingForm.courierName}
                  onChange={(e) => setShippingForm((f) => ({ ...f, courierName: e.target.value }))}
                />
              </label>
              <div className="courier-quick-picks">
                <span>Quick select:</span>
                {['DTDC', 'Delhivery', 'Blue Dart', 'Speed Post', 'Professional'].map((c) => (
                  <button
                    type="button"
                    key={c}
                    className="quick-pick-btn"
                    onClick={() => setShippingForm((f) => ({ ...f, courierName: c }))}
                  >
                    {c}
                  </button>
                ))}
              </div>

              <label>
                AWB / Tracking Number
                <input
                  type="text"
                  placeholder="e.g. D12345678, DEL987654321"
                  value={shippingForm.awbCode}
                  onChange={(e) => setShippingForm((f) => ({ ...f, awbCode: e.target.value }))}
                />
              </label>

              <label>
                Live Tracking URL (Optional)
                <input
                  type="url"
                  placeholder="https://track.dtdc.com/... or courier tracking URL"
                  value={shippingForm.trackingUrl}
                  onChange={(e) => setShippingForm((f) => ({ ...f, trackingUrl: e.target.value }))}
                />
              </label>

              <label>
                Shipment Status
                <select
                  value={shippingForm.shipmentStatus}
                  onChange={(e) => setShippingForm((f) => ({ ...f, shipmentStatus: e.target.value }))}
                >
                  {shipmentStatuses.map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </label>

              <div className="modal-actions">
                <button type="button" className="btn btn-outline" onClick={() => setEditingShippingOrder(null)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={savingShipping}>
                  {savingShipping ? 'Saving…' : 'Save Courier Details'}
                </button>
              </div>
            </form>
          </div>
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

        .tab-highlight {
          background: #fff3cd !important;
          color: #856404 !important;
          border-color: #ffeeba !important;
          font-weight: 600;
        }
        .tab-btn.active.tab-highlight {
          background: #856404 !important;
          color: #fff !important;
          border-color: #856404 !important;
        }

        /* Admin Cancellation Request Box */
        .admin-cancel-req-box {
          background: #fff8e6;
          border: 1.5px solid #f6c23e;
          border-radius: var(--radius-sm);
          padding: 14px 16px;
          margin-bottom: 14px;
        }
        .acrb-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
        }
        .acrb-alert-badge {
          background: #e74a3b;
          color: #fff;
          font-size: 11px;
          font-weight: 700;
          padding: 2px 7px;
          border-radius: 4px;
          letter-spacing: 0.04em;
        }
        .acrb-time { font-size: 11.5px; color: #856404; }
        .acrb-heading { font-size: 15px; font-weight: 600; color: #5a3c02; margin: 0 0 4px; }
        .acrb-desc { font-size: 13px; color: #664d03; margin: 0 0 6px; }
        .acrb-reason { font-size: 12.5px; color: #78350f; background: rgba(255,255,255,0.7); padding: 4px 8px; border-radius: 4px; display: inline-block; margin: 0 0 12px; }
        .acrb-btn-row { display: flex; gap: 8px; flex-wrap: wrap; }
        
        .btn-approve { background: #1cc88a; color: #fff; border: none; font-weight: 600; padding: 6px 12px; border-radius: 4px; cursor: pointer; }
        .btn-approve:hover { background: #17a673; }
        .btn-reject { background: #e74a3b; color: #fff; border: none; font-weight: 600; padding: 6px 12px; border-radius: 4px; cursor: pointer; }
        .btn-reject:hover { background: #be2617; }
        .btn-wa-chat { background: #25d366; color: #fff; text-decoration: none; font-weight: 600; padding: 6px 12px; border-radius: 4px; display: inline-flex; align-items: center; }
        .btn-wa-chat:hover { background: #1ebc59; color: #fff; }
        .btn-call-cust { background: var(--maroon-900); color: #fff; text-decoration: none; font-weight: 600; padding: 6px 12px; border-radius: 4px; display: inline-flex; align-items: center; }
        .btn-call-cust:hover { background: var(--maroon-800); color: #fff; }

        .btn-edit-shipping {
          background: #fff;
          border: 1px solid var(--stone-300);
          color: var(--maroon-900);
          font-size: 11.5px;
          font-weight: 500;
          padding: 3px 8px;
          border-radius: 4px;
          cursor: pointer;
          margin-top: 6px;
          display: inline-block;
        }
        .btn-edit-shipping:hover { background: var(--stone-100); }
        .tracking-hint { display: block; font-size: 11.5px; color: var(--ink-500); margin-top: 2px; }

        /* Modal Styles */
        .modal-backdrop {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0, 0, 0, 0.55);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
          padding: 20px;
        }
        .modal-content {
          background: #fff;
          border-radius: var(--radius-md);
          max-width: 480px;
          width: 100%;
          padding: 24px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        .modal-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
        .modal-head h3 { font-size: 18px; color: var(--maroon-900); margin: 0; }
        .close-btn { background: none; border: none; font-size: 18px; cursor: pointer; color: var(--ink-400); }
        
        .modal-order-tag { font-size: 12.5px; color: var(--ink-600); margin: 0 0 14px; background: var(--stone-50); padding: 6px 10px; border-radius: 4px; }
        .shipping-edit-form { display: flex; flex-direction: column; gap: 12px; font-size: 12.5px; }
        .shipping-edit-form label { display: flex; flex-direction: column; gap: 5px; color: var(--ink-700); font-weight: 500; }
        .shipping-edit-form input, .shipping-edit-form select {
          font-size: 13px;
          padding: 8px 10px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--stone-300);
        }
        .courier-quick-picks { display: flex; gap: 5px; align-items: center; flex-wrap: wrap; margin-top: -4px; margin-bottom: 4px; }
        .courier-quick-picks span { font-size: 11px; color: var(--ink-400); }
        .quick-pick-btn {
          font-size: 10.5px;
          background: var(--stone-100);
          border: 1px solid var(--stone-300);
          padding: 2px 7px;
          border-radius: 3px;
          cursor: pointer;
          color: var(--ink-700);
        }
        .quick-pick-btn:hover { background: var(--maroon-900); color: #fff; border-color: var(--maroon-900); }
        .modal-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 14px; }
      `}</style>
    </div>
  );
}
