import { useEffect, useState } from 'react';
import RecommendedProducts from '../components/RecommendedProducts';
import Seo from '../components/Seo';
import { api } from '../data/api';
import { formatINR } from '../data/store';

const shipmentTone = {
  DELIVERED: 'tone-delivered',
  delivered: 'tone-delivered',
  SHIPPED: 'tone-processing',
  shipped: 'tone-processing',
  IN_TRANSIT: 'tone-processing',
  OUT_FOR_DELIVERY: 'tone-processing',
  ORDER_CREATED: 'tone-processing',
  AWB_ASSIGNED: 'tone-processing',
  CANCELLED: 'tone-cancelled',
  cancelled: 'tone-cancelled',
  PENDING: 'tone-pending',
};

const shipmentLabel = {
  DELIVERED: 'Delivered',
  delivered: 'Delivered',
  SHIPPED: 'Dispatched / In Transit',
  shipped: 'Dispatched / In Transit',
  IN_TRANSIT: 'In Transit',
  OUT_FOR_DELIVERY: 'Out for Delivery',
  ORDER_CREATED: 'Preparing for Dispatch',
  AWB_ASSIGNED: 'Courier Assigned',
  CANCELLED: 'Cancelled',
  cancelled: 'Cancelled',
  PENDING: 'Order Confirmed',
};

const statusTone = {
  pending: 'tone-pending',
  paid: 'tone-paid',
  paid_oversold: 'tone-oversold',
  cancellation_requested: 'tone-requested',
  cancelled: 'tone-cancelled',
};

const statusLabel = {
  pending: 'Payment Pending',
  paid: 'Order Placed & Paid',
  paid_oversold: 'Paid (Backorder)',
  cancellation_requested: 'Cancellation Requested',
  cancelled: 'Cancelled',
};

function daysSince(dateStr) {
  if (!dateStr) return 0;
  return Math.floor((Date.now() - new Date(dateStr).getTime()) / 86400000);
}

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [policy, setPolicy] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cancellingOrder, setCancellingOrder] = useState(null); // order object
  const [cancelReason, setCancelReason] = useState('Ordered by mistake');
  const [cancellingBusy, setCancellingBusy] = useState(false);
  const [cancelError, setCancelError] = useState('');
  const [products, setProducts] = useState([]);
  const [invoiceId, setInvoiceId] = useState(null);
  const [invoiceError, setInvoiceError] = useState(null);

  // Tracking modal state
  const [trackingModalOrder, setTrackingModalOrder] = useState(null);
  const [trackingData, setTrackingData] = useState(null);
  const [trackingLoading, setTrackingLoading] = useState(false);

  // Return modal state
  const [returnModalItem, setReturnModalItem] = useState(null); // { order, item }
  const [returnReason, setReturnReason] = useState('Defective / damaged saree');
  const [returnDetails, setReturnDetails] = useState('');
  const [returnPhotos, setReturnPhotos] = useState([]);
  const [submittingReturn, setSubmittingReturn] = useState(false);
  const [returnMsg, setReturnMsg] = useState('');

  useEffect(() => {
    refreshOrders();
    api.getCancellationPolicy().then(({ policy }) => setPolicy(policy)).catch(() => {});
    api.getProducts().then(({ products }) => setProducts(products)).catch(() => {});
  }, []);

  function refreshOrders() {
    api
      .getMyOrders()
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

  function tierFor(order) {
    const days = daysSince(order.paid_at);
    return policy.find((t) => days <= t.max_days) || null;
  }

  async function confirmCancel() {
    if (!cancellingOrder) return;
    setCancellingBusy(true);
    setCancelError('');
    try {
      const result = await api.cancelOrder(cancellingOrder.id, { reason: cancelReason });
      setOrders((prev) =>
        prev.map((o) =>
          o.id === cancellingOrder.id
            ? {
                ...o,
                status: 'cancellation_requested',
                cancellation_reason: cancelReason,
                cancellation_requested_at: new Date().toISOString(),
                refund_percent: result.refundPercent,
                refund_amount: result.refundAmount,
              }
            : o
        )
      );
      setCancellingOrder(null);
    } catch (err) {
      setCancelError(err.message);
    } finally {
      setCancellingBusy(false);
    }
  }

  async function handleOpenTracking(order) {
    setTrackingModalOrder(order);
    setTrackingData(null);
    setTrackingLoading(true);
    try {
      const data = await api.trackOrder(order.id);
      setTrackingData(data);
    } catch (err) {
      setTrackingData({
        shipmentStatus: order.shipment_status,
        courierName: order.courier_name,
        awbCode: order.awb_code,
        trackingUrl: order.tracking_url,
        trackingHistory: order.tracking_history || [],
      });
    } finally {
      setTrackingLoading(false);
    }
  }

  function handleReturnPhotoUpload(e) {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setReturnPhotos((prev) => [...prev, ev.target.result]);
      };
      reader.readAsDataURL(file);
    });
  }

  async function handleSubmitReturn(e) {
    e.preventDefault();
    if (!returnModalItem) return;
    setSubmittingReturn(true);
    setReturnMsg('');
    try {
      await api.submitReturn({
        orderId: returnModalItem.order.id,
        orderItemId: returnModalItem.item.id,
        reason: returnReason,
        details: returnDetails,
        photos: returnPhotos,
      });
      setReturnMsg('Return request submitted successfully. Our team will review and approve it shortly.');
      setTimeout(() => {
        setReturnModalItem(null);
        setReturnMsg('');
        setReturnPhotos([]);
        setReturnDetails('');
        refreshOrders();
      }, 1800);
    } catch (err) {
      setReturnMsg(err.message);
    } finally {
      setSubmittingReturn(false);
    }
  }

  return (
    <div className="orders-page">
      <Seo title="My Orders" path="/orders" noindex />
      <div className="container">
        <div className="page-head">
          <p className="eyebrow">Your Account</p>
          <h1>Orders</h1>
          <p className="page-sub">Track real-time shipment updates, download tax invoices, and manage contextual return requests.</p>
        </div>

        {loading && <p className="empty-msg">Loading your orders…</p>}
        {!loading && error && <p className="empty-msg error">{error}</p>}
        {!loading && !error && orders.length === 0 && (
          <p className="empty-msg">You haven't placed any orders yet.</p>
        )}
        {cancelError && <p className="empty-msg error">{cancelError}</p>}

        {!loading && orders.length > 0 && (
          <div className="orders-list">
            {orders.map((o) => {
              const nonCancellableDispatched = ['shipped', 'in_transit', 'out_for_delivery', 'delivered'].includes(
                String(o.shipment_status).toLowerCase()
              );
              const canCancel = (o.status === 'paid' || o.status === 'paid_oversold') && tierFor(o) && !nonCancellableDispatched;

              return (
                <div className="order-card" key={o.id}>
                  <div className="order-card-head">
                    <div>
                      <span className="order-id">{o.order_number || `#SK${o.id}`}</span>
                      <span className="order-date">
                        {new Date(o.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                    <div className="status-badges-group">
                      <span className={`status ${statusTone[o.status] || ''}`}>{statusLabel[o.status] || o.status}</span>
                      {o.shipment_status && (
                        <span className={`status ${shipmentTone[o.shipment_status] || 'tone-pending'}`}>
                          {shipmentLabel[o.shipment_status] || o.shipment_status}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="order-items">
                    {(o.items || []).map((item) => {
                      const itemReturn = (o.returns || []).find((r) => r.order_item_id === item.id);
                      const isDelivered = String(o.shipment_status).toLowerCase() === 'delivered' || o.paid_at;
                      const returnEligible = item.return_available !== false && isDelivered && !itemReturn;

                      return (
                        <div className="order-item-row" key={item.id}>
                          <div className="order-item">
                            {item.product_image && <img src={item.product_image} alt={item.product_name} />}
                            <div>
                              <p className="item-title">{item.product_name}</p>
                              {item.variant_name && (
                                <span className="item-variant-tag">Color: {item.variant_name}</span>
                              )}
                              <span>Qty {item.qty} · {formatINR(item.price)}</span>
                            </div>
                          </div>

                          <div className="item-return-col">
                            {itemReturn ? (
                              <span className="return-status-badge">
                                Return: {itemReturn.status}
                              </span>
                            ) : returnEligible ? (
                              <button
                                type="button"
                                className="item-return-btn"
                                onClick={() => setReturnModalItem({ order: o, item })}
                              >
                                Request Return
                              </button>
                            ) : item.return_available === false ? (
                              <span className="non-returnable-tag">Non-Returnable</span>
                            ) : null}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="order-card-foot">
                    <div className="order-address">
                      <span>Shipping to <strong>{o.address_name}</strong></span>
                      <div>{o.address_line1}, {o.address_city} — {o.address_pincode}</div>
                      {o.courier_name && <div className="courier-hint">Courier: {o.courier_name} {o.awb_code ? `(${o.awb_code})` : ''}</div>}
                    </div>
                    <div className="order-total">
                      Total <strong>{formatINR(o.total_amount || (o.subtotal - (o.discount || 0) + (o.shipping_fee || 0)))}</strong>
                      {o.razorpay_payment_id && <span className="payment-id">Payment ID: {o.razorpay_payment_id}</span>}
                    </div>
                  </div>

                  {o.status === 'cancellation_requested' && (
                    <div className="cancellation-pending-banner">
                      <div className="pending-badge-row">
                        <span className="pending-tag">⏳ PENDING ADMIN APPROVAL</span>
                        <span className="pending-date">
                          {o.cancellation_requested_at ? new Date(o.cancellation_requested_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : 'Recently requested'}
                        </span>
                      </div>
                      <p className="pending-title">Your cancellation request has been submitted to store administration.</p>
                      <p className="pending-desc">
                        Our team is reviewing your request. Once verified and approved, inventory will be released and your refund of{' '}
                        <strong>{o.refund_percent || 100}% ({formatINR(o.refund_amount || 0)})</strong> will be initiated directly back to your payment account.
                      </p>
                      {o.cancellation_reason && (
                        <p className="pending-reason"><strong>Reason:</strong> {o.cancellation_reason}</p>
                      )}
                      <div className="direct-admin-box">
                        <span className="direct-label">Need urgent assistance or have questions? Contact us directly:</span>
                        <div className="direct-links-row">
                          <a
                            href={`https://wa.me/918317551337?text=${encodeURIComponent(`Hi Ravichandra Handlooms, I submitted a cancellation request for order ${o.order_number || `#SK${o.id}`}. Please check and confirm.`)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="btn-admin-contact wa-btn"
                          >
                            💬 WhatsApp (+91 83175 51337)
                          </a>
                          <a href="tel:+918317551337" className="btn-admin-contact call-btn">
                            📞 Call (8317551337)
                          </a>
                          <a href="mailto:ravichandratextiles39@gmail.com" className="btn-admin-contact email-btn">
                            ✉️ Email Us
                          </a>
                        </div>
                      </div>
                    </div>
                  )}

                  {o.cancellation_reject_reason && o.status === 'paid' && (
                    <div className="cancellation-rejected-banner">
                      <span>ℹ️ <strong>Cancellation Note:</strong> {o.cancellation_reject_reason}</span>
                    </div>
                  )}

                  {o.status === 'cancelled' && o.refund_percent != null && (
                    <p className="refund-note">
                      ✓ Cancelled — {o.refund_percent}% refund ({formatINR(o.refund_amount || 0)}) credited to your payment method.
                    </p>
                  )}

                  <div className="order-card-actions">
                    {(o.awb_code || o.shipment_status) && (
                      <button
                        type="button"
                        className="btn btn-outline track-btn"
                        onClick={() => handleOpenTracking(o)}
                      >
                        🚚 Track Package
                      </button>
                    )}
                    {o.paid_at && (
                      <button
                        type="button"
                        className="btn btn-outline invoice-btn"
                        disabled={invoiceId === o.id}
                        onClick={() => handleDownloadInvoice(o)}
                      >
                        {invoiceId === o.id ? 'Preparing…' : '📄 Invoice'}
                      </button>
                    )}
                    {canCancel && (
                      <button
                        type="button"
                        className="btn btn-outline cancel-btn"
                        onClick={() => setCancellingOrder(o)}
                      >
                        Request Cancellation
                      </button>
                    )}
                  </div>
                  {invoiceError && invoiceError.id === o.id && <p className="empty-msg error invoice-error">{invoiceError.message}</p>}
                </div>
              );
            })}
          </div>
        )}

        {/* Live Shipment Tracking Modal */}
        {trackingModalOrder && (
          <div className="modal-backdrop" onClick={() => setTrackingModalOrder(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-head">
                <h3>Live Shipment Tracking</h3>
                <button type="button" className="close-btn" onClick={() => setTrackingModalOrder(null)}>✕</button>
              </div>
              <div className="tracking-body">
                <p>Order: <strong>{trackingModalOrder.order_number || `#SK${trackingModalOrder.id}`}</strong></p>
                {trackingModalOrder.courier_name && <p>Courier: <strong>{trackingModalOrder.courier_name}</strong></p>}
                {trackingModalOrder.awb_code && (
                  <p>AWB / Tracking Number: <strong>{trackingModalOrder.awb_code}</strong></p>
                )}

                {trackingLoading ? (
                  <p className="loading-track">Connecting to courier network…</p>
                ) : (
                  <div className="tracking-timeline">
                    <h4>Shipment Milestones</h4>
                    {(!trackingData?.trackingHistory || trackingData.trackingHistory.length === 0) ? (
                      <p className="no-scans">Order packed and awaiting courier dispatch.</p>
                    ) : (
                      <div className="scans-list">
                        {trackingData.trackingHistory.map((scan, i) => (
                          <div className="scan-item" key={i}>
                            <div className="scan-dot" />
                            <div className="scan-info">
                              <strong>{scan.status || scan.activity}</strong>
                              <span className="scan-loc">{scan.location}</span>
                              <span className="scan-time">{scan.date ? new Date(scan.date).toLocaleString('en-IN') : ''}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {trackingModalOrder.tracking_url ? (
                  <a
                    href={trackingModalOrder.tracking_url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary track-external-link"
                  >
                    Open Live Courier Tracking Page ↗
                  </a>
                ) : trackingModalOrder.awb_code ? (
                  <div className="track-note-box">
                    <span>Use Tracking Number <strong>{trackingModalOrder.awb_code}</strong> on <strong>{trackingModalOrder.courier_name || 'the courier portal'}</strong> to check real-time road dispatch updates.</span>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        )}

        {/* Cancellation Reason Modal */}
        {cancellingOrder && (
          <div className="modal-backdrop" onClick={() => setCancellingOrder(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-head">
                <h3>Request Order Cancellation</h3>
                <button type="button" className="close-btn" onClick={() => setCancellingOrder(null)}>✕</button>
              </div>
              <div className="cancel-modal-body">
                <div className="admin-approval-notice">
                  <div className="notice-icon">🛡️</div>
                  <div>
                    <strong>Admin Approval Flow</strong>
                    <p>
                      Your cancellation request will be submitted to our administrative team for verification and approval.
                      Upon approval, your refund of <strong>{tierFor(cancellingOrder)?.refund_percent || 100}%</strong> ({formatINR(Math.round(((cancellingOrder.subtotal - (cancellingOrder.discount || 0)) * (tierFor(cancellingOrder)?.refund_percent || 100)) / 100))}) will be initiated back to your original payment method.
                    </p>
                  </div>
                </div>

                <div className="contact-admin-strip">
                  <span>Want to speak with us before cancelling?</span>
                  <div className="contact-strip-actions">
                    <a
                      href={`https://wa.me/918317551337?text=${encodeURIComponent(`Hi Ravichandra Textiles, I am requesting cancellation for order ${cancellingOrder.order_number || `#SK${cancellingOrder.id}`}.`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="strip-link wa"
                    >
                      💬 WhatsApp Store (8317551337)
                    </a>
                    <a href="tel:+918317551337" className="strip-link call">
                      📞 Call Store
                    </a>
                  </div>
                </div>

                <label>
                  Reason for cancellation *
                  <select value={cancelReason} onChange={(e) => setCancelReason(e.target.value)}>
                    <option value="Ordered by mistake">Ordered by mistake</option>
                    <option value="Delivery time too long">Delivery time too long</option>
                    <option value="Found better alternative">Found better alternative</option>
                    <option value="Incorrect shipping address">Incorrect shipping address</option>
                    <option value="Need to change saree color/design">Need to change saree color/design</option>
                    <option value="Other reason">Other reason</option>
                  </select>
                </label>
                <div className="modal-actions">
                  <button type="button" className="btn btn-outline" onClick={() => setCancellingOrder(null)}>Keep Order</button>
                  <button type="button" className="btn btn-primary danger-btn" disabled={cancellingBusy} onClick={confirmCancel}>
                    {cancellingBusy ? 'Submitting…' : 'Submit Cancellation Request'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contextual Return Request Modal */}
        {returnModalItem && (
          <div className="modal-backdrop" onClick={() => setReturnModalItem(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-head">
                <h3>Request Item Return</h3>
                <button type="button" className="close-btn" onClick={() => setReturnModalItem(null)}>✕</button>
              </div>
              <form className="return-modal-form" onSubmit={handleSubmitReturn}>
                <div className="return-item-preview">
                  <img src={returnModalItem.item.product_image} alt="" />
                  <div>
                    <strong>{returnModalItem.item.product_name}</strong>
                    {returnModalItem.item.variant_name && <span>Color: {returnModalItem.item.variant_name}</span>}
                    <p>Refund Amount: {formatINR(returnModalItem.item.price * returnModalItem.item.qty)}</p>
                  </div>
                </div>

                <div className="return-store-card">
                  <div className="store-card-header">
                    <strong>Ravichandra Handlooms — Returns &amp; Support</strong>
                  </div>
                  <p className="store-address-text">
                    📍 <strong>Return Address:</strong> 10-28, Kpt street, near Punjab National Bank, Dharmavaram 515671, Andhra Pradesh
                  </p>
                  <div className="store-contact-row">
                    <a href="tel:+918317551337" className="store-touchpoint">
                      📞 <strong>+91 83175 51337</strong>
                    </a>
                    <a
                      href={`https://wa.me/918317551337?text=${encodeURIComponent(`Hi Ravichandra Handlooms, I would like to inquire about returning item "${returnModalItem.item.product_name}" from order ${returnModalItem.order.order_number || `#SK${returnModalItem.order.id}`}.`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="store-touchpoint"
                    >
                      💬 <strong>WhatsApp Us</strong>
                    </a>
                    <a href="mailto:ravichandratextiles39@gmail.com" className="store-touchpoint">
                      ✉️ <strong>ravichandratextiles39@gmail.com</strong>
                    </a>
                  </div>
                  <div className="store-hours-note">
                    🕒 Store Hours: Mon – Sun 10:00 AM – 10:00 PM | Direct Owner Contact
                  </div>
                </div>

                <label>
                  Reason for Return *
                  <select value={returnReason} onChange={(e) => setReturnReason(e.target.value)} required>
                    <option value="Defective / damaged saree">Defective or damaged fabric/zari</option>
                    <option value="Wrong color or design received">Wrong color or design received</option>
                    <option value="Quality not as expected">Quality not as expected</option>
                    <option value="Fit or drape issue">Fit or drape issue</option>
                    <option value="Other">Other reason</option>
                  </select>
                </label>

                <label>
                  Details / Note
                  <textarea
                    rows="3"
                    placeholder="Describe any flaws or details about the issue…"
                    value={returnDetails}
                    onChange={(e) => setReturnDetails(e.target.value)}
                  />
                </label>

                <label>
                  Upload Photos of Issue (optional)
                  <input type="file" accept="image/*" multiple onChange={handleReturnPhotoUpload} />
                </label>

                {returnPhotos.length > 0 && (
                  <div className="return-photo-grid">
                    {returnPhotos.map((src, idx) => (
                      <img key={idx} src={src} alt="Upload preview" className="return-thumb" />
                    ))}
                  </div>
                )}

                {returnMsg && <p className="return-msg">{returnMsg}</p>}

                <div className="modal-actions">
                  <button type="button" className="btn btn-outline" onClick={() => setReturnModalItem(null)}>Cancel</button>
                  <button type="submit" className="btn btn-primary" disabled={submittingReturn}>
                    {submittingReturn ? 'Submitting…' : 'Submit Return Request'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      <RecommendedProducts products={products} title="Shop Again" />

      <style>{`
        .orders-page { padding: 56px 0 0; }
        .orders-page .container { padding-bottom: 60px; }
        .page-head { max-width: 520px; margin-bottom: 36px; }
        .page-head h1 { font-size: 34px; margin: 8px 0 12px; }
        .page-sub { font-size: 13.5px; color: var(--ink-400); line-height: 1.6; }
        .empty-msg { font-size: 14px; color: var(--ink-400); padding: 40px 0; }
        .empty-msg.error { color: #a13a3a; padding: 0 0 20px; }

        .orders-list { display: flex; flex-direction: column; gap: 18px; }
        .order-card {
          border: 1px solid var(--stone-200);
          border-radius: var(--radius-md);
          padding: 20px 22px;
        }
        .order-card-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 14px;
          margin-bottom: 14px;
          border-bottom: 1px solid var(--stone-200);
        }
        .order-id { font-weight: 600; color: var(--maroon-900); margin-right: 12px; }
        .order-date { font-size: 12.5px; color: var(--ink-400); }
        .status-badges-group { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
        .status {
          display: inline-flex;
          width: fit-content;
          padding: 4px 12px;
          border-radius: 999px;
          font-size: 12px;
        }
        .tone-delivered { background: #e8f2e6; color: #3c7a3c; }
        .tone-processing { background: var(--blush-300); color: var(--maroon-900); }
        .tone-failed { background: #f6e3e3; color: #a13a3a; }
        .tone-cancelled { background: var(--stone-200); color: var(--ink-600); }
        .tone-pending { background: #fdf0d5; color: #8a5a10; }
        .tone-requested { background: #fff3cd; color: #856404; font-weight: 500; }

        /* Cancellation Pending & Store Contacts */
        .cancellation-pending-banner {
          background: #fff8e6;
          border: 1px solid #ffeeba;
          border-radius: var(--radius-sm);
          padding: 14px 16px;
          margin-top: 14px;
        }
        .pending-badge-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
        }
        .pending-tag {
          font-size: 11px;
          font-weight: 700;
          color: #856404;
          background: #ffe8a1;
          padding: 3px 8px;
          border-radius: 4px;
          letter-spacing: 0.04em;
        }
        .pending-date { font-size: 11px; color: #856404; opacity: 0.8; }
        .pending-title { font-size: 13.5px; font-weight: 600; color: #856404; margin: 4px 0 4px; }
        .pending-desc { font-size: 12.5px; color: #664d03; line-height: 1.5; margin: 0 0 6px; }
        .pending-reason { font-size: 12px; color: #856404; background: rgba(255,255,255,0.6); padding: 4px 8px; border-radius: 4px; display: inline-block; margin: 4px 0 10px; }
        
        .direct-admin-box {
          border-top: 1px dashed #eed89b;
          padding-top: 10px;
          margin-top: 8px;
        }
        .direct-label { display: block; font-size: 11.5px; font-weight: 500; color: #856404; margin-bottom: 8px; }
        .direct-links-row { display: flex; gap: 8px; flex-wrap: wrap; }
        .btn-admin-contact {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 11.5px;
          font-weight: 600;
          padding: 5px 11px;
          border-radius: 4px;
          text-decoration: none;
          transition: all 0.15s ease;
        }
        .wa-btn { background: #25d366; color: #fff; }
        .wa-btn:hover { background: #1ebc59; color: #fff; }
        .call-btn { background: var(--maroon-900); color: #fff; }
        .call-btn:hover { background: var(--maroon-800); color: #fff; }
        .email-btn { background: #fff; color: var(--maroon-900); border: 1px solid var(--stone-300); }
        .email-btn:hover { background: var(--stone-100); }

        .cancellation-rejected-banner {
          background: #fdf2e9;
          border-left: 3px solid #e67e22;
          padding: 8px 12px;
          font-size: 12px;
          color: #a04000;
          margin-top: 12px;
          border-radius: 3px;
        }

        /* Modal Contact & Approval Styles */
        .admin-approval-notice {
          display: flex;
          gap: 12px;
          background: #fdf8eb;
          border: 1px solid #fae6b9;
          border-radius: var(--radius-sm);
          padding: 12px 14px;
          font-size: 12.5px;
          color: #7d5a0b;
          line-height: 1.5;
          margin-bottom: 14px;
        }
        .admin-approval-notice p { margin: 4px 0 0; }
        .notice-icon { font-size: 20px; line-height: 1; }

        .contact-admin-strip {
          background: var(--stone-50);
          border: 1px solid var(--stone-200);
          border-radius: var(--radius-sm);
          padding: 10px 12px;
          margin-bottom: 14px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 12px;
          color: var(--ink-700);
        }
        .contact-strip-actions { display: flex; gap: 8px; flex-wrap: wrap; }
        .strip-link {
          font-size: 11.5px;
          font-weight: 500;
          padding: 4px 10px;
          border-radius: 4px;
          text-decoration: none;
        }
        .strip-link.wa { background: #e7f8ee; color: #157338; border: 1px solid #c2ebd0; }
        .strip-link.call { background: #fdf5f5; color: var(--maroon-900); border: 1px solid #f4d0d0; }

        /* Return Store Card */
        .return-store-card {
          background: #faf7f2;
          border: 1px solid #e8dec8;
          border-radius: var(--radius-sm);
          padding: 12px 14px;
          margin: 8px 0;
          font-size: 12px;
          color: var(--ink-800);
        }
        .store-card-header { font-size: 13px; color: var(--maroon-900); margin-bottom: 6px; }
        .store-address-text { line-height: 1.4; margin: 0 0 8px; color: var(--ink-600); }
        .store-contact-row { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 6px; }
        .store-touchpoint { color: var(--maroon-900); text-decoration: none; font-size: 12px; }
        .store-touchpoint:hover { text-decoration: underline; }
        .store-hours-note { font-size: 11px; color: var(--ink-400); }

        .track-note-box {
          background: var(--stone-50);
          border: 1px solid var(--stone-200);
          border-radius: var(--radius-sm);
          padding: 10px 14px;
          margin-top: 14px;
          font-size: 12px;
          color: var(--ink-700);
        }

        .order-items { display: flex; flex-direction: column; gap: 10px; }
        .order-item-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          padding: 6px 0;
          border-bottom: 1px dashed var(--stone-200);
        }
        .order-item-row:last-child { border-bottom: none; }
        .order-item { display: flex; align-items: center; gap: 12px; font-size: 13.5px; }
        .order-item img { width: 44px; height: 56px; object-fit: cover; border-radius: 4px; }
        .item-title { font-weight: 500; color: var(--ink-900); margin: 0 0 2px; }
        .item-variant-tag {
          display: inline-block;
          font-size: 11px;
          color: var(--maroon-900);
          background: #fdf6f5;
          padding: 1px 7px;
          border-radius: 4px;
          margin-bottom: 4px;
        }
        .order-item span { font-size: 12px; color: var(--ink-400); }

        .item-return-col { flex: 0 0 auto; text-align: right; }
        .item-return-btn {
          font-size: 11.5px;
          color: var(--maroon-900);
          background: #fdf6f5;
          border: 1px solid var(--maroon-900);
          border-radius: 4px;
          padding: 5px 10px;
          cursor: pointer;
        }
        .item-return-btn:hover { background: var(--maroon-900); color: #fff; }
        .return-status-badge {
          font-size: 11px;
          font-weight: 600;
          color: #8a5a10;
          background: #fbeacb;
          padding: 4px 8px;
          border-radius: 4px;
        }
        .non-returnable-tag {
          font-size: 10.5px;
          color: var(--ink-400);
          font-style: italic;
        }
        .courier-hint { font-size: 11.5px; color: var(--ink-500); margin-top: 4px; }
        .track-btn { color: #1e5842; border-color: #a3c9b7; }
        .track-btn:hover { background: #e8f2e6; }

        .order-card-foot {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 14px;
          margin-top: 16px;
          padding-top: 14px;
          border-top: 1px solid var(--stone-200);
          font-size: 12.5px;
          color: var(--ink-600);
        }
        .order-total { text-align: right; }
        .order-total strong { color: var(--maroon-900); font-size: 15px; }
        .payment-id { display: block; font-size: 11px; color: var(--ink-400); margin-top: 2px; }

        .refund-note { font-size: 12px; color: #3c7a3c; margin: 12px 0 0; }
        .order-card-actions { display: flex; gap: 10px; margin-top: 14px; flex-wrap: wrap; }
        .invoice-btn, .cancel-btn, .track-btn { font-size: 12.5px; padding: 9px 18px; margin-top: 0; }
        .invoice-error { padding: 8px 0 0; font-size: 12px; }

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
          max-width: 500px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          padding: 24px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        .modal-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; }
        .modal-head h3 { font-size: 18px; color: var(--ink-900); margin: 0; }
        .close-btn { background: none; border: none; font-size: 18px; cursor: pointer; color: var(--ink-400); }
        .tracking-timeline { margin-top: 18px; }
        .tracking-timeline h4 { font-size: 13.5px; margin-bottom: 12px; color: var(--maroon-900); }
        .scans-list { display: flex; flex-direction: column; gap: 14px; position: relative; padding-left: 18px; border-left: 2px solid var(--stone-200); }
        .scan-item { position: relative; font-size: 12.5px; }
        .scan-dot { position: absolute; left: -24px; top: 3px; width: 10px; height: 10px; border-radius: 50%; background: var(--maroon-900); }
        .scan-loc { display: block; font-size: 11.5px; color: var(--ink-500); }
        .scan-time { display: block; font-size: 10.5px; color: var(--ink-400); }
        .track-external-link { display: block; margin-top: 20px; text-align: center; }

        .return-modal-form { display: flex; flex-direction: column; gap: 14px; font-size: 13px; }
        .return-modal-form label { display: flex; flex-direction: column; gap: 6px; color: var(--ink-700); }
        .return-modal-form select, .return-modal-form textarea, .return-modal-form input {
          font-size: 13px;
          padding: 8px 10px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--stone-300);
        }
        .return-item-preview {
          display: flex;
          align-items: center;
          gap: 12px;
          background: var(--stone-50);
          padding: 10px;
          border-radius: var(--radius-sm);
        }
        .return-item-preview img { width: 44px; height: 56px; object-fit: cover; border-radius: 4px; }
        .return-photo-grid { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 6px; }
        .return-thumb { width: 50px; height: 50px; object-fit: cover; border-radius: 4px; border: 1px solid var(--stone-300); }
        .return-msg { font-size: 12.5px; color: #3c7a3c; background: #e8f2e6; padding: 8px 12px; border-radius: 4px; }
        .modal-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 14px; }
        .danger-btn { background: #a13a3a; color: #fff; }

        @media (max-width: 600px) {
          .order-card-foot { flex-direction: column; align-items: flex-start; }
          .order-total { text-align: left; }
        }
      `}</style>
    </div>
  );
}
