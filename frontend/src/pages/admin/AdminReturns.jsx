import { useEffect, useState } from 'react';
import { api } from '../../data/api';
import { formatINR } from '../../data/store';

export default function AdminReturns() {
  const [returns, setReturns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState(null);
  const [adminNotes, setAdminNotes] = useState({});

  useEffect(() => {
    loadReturns();
  }, []);

  function loadReturns() {
    api
      .getAllReturns()
      .then(({ returnRequests }) => setReturns(returnRequests))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  async function handleStatusChange(id, status, refundAmount) {
    setUpdatingId(id);
    setError('');
    try {
      await api.updateReturnStatus(id, {
        status,
        adminNotes: adminNotes[id] || '',
        refundAmount,
      });
      loadReturns();
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <div className="admin-returns">
      <div className="admin-page-head">
        <h1>Return Requests &amp; Refunds</h1>
        <p>Review contextual customer return tickets, inspect photos of reported defects, approve returns, and issue Razorpay refunds directly to customer accounts.</p>
      </div>

      {error && <p className="admin-error">{error}</p>}

      {loading && <p className="empty">Loading return requests…</p>}
      {!loading && returns.length === 0 && <p className="empty">No return requests found.</p>}

      <div className="returns-list">
        {returns.map((ret) => {
          const photos = Array.isArray(ret.photos) ? ret.photos : [];
          return (
            <div className="return-card" key={ret.id}>
              <div className="return-head">
                <div>
                  <span className="ret-id">Ticket #{ret.id}</span>
                  <span className="ret-order">Order: {ret.order_number || `#${ret.order_id}`}</span>
                  <span className="ret-date">{new Date(ret.created_at).toLocaleString('en-IN')}</span>
                </div>
                <span className={`status-pill status-${ret.status.toLowerCase()}`}>
                  {ret.status}
                </span>
              </div>

              <div className="return-body">
                <div className="ret-customer-info">
                  <p><strong>Customer:</strong> {ret.customer_name} ({ret.customer_mobile || ret.customer_email})</p>
                  <p><strong>Item:</strong> {ret.product_name} {ret.variant_name ? `(Color: ${ret.variant_name})` : ''} · Qty {ret.qty}</p>
                  <p><strong>Refund Value:</strong> {formatINR(ret.refund_amount)}</p>
                  <p><strong>Reason:</strong> <span className="reason-text">{ret.reason}</span></p>
                  {ret.details && <p><strong>Customer Note:</strong> {ret.details}</p>}
                </div>

                {photos.length > 0 && (
                  <div className="ret-photos">
                    <p><strong>Uploaded Photos:</strong></p>
                    <div className="photos-row">
                      {photos.map((src, i) => (
                        <a key={i} href={src} target="_blank" rel="noreferrer">
                          <img src={src} alt="Evidence" className="evidence-thumb" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="return-actions-row">
                <input
                  type="text"
                  placeholder="Internal admin note…"
                  value={adminNotes[ret.id] ?? (ret.admin_notes || '')}
                  onChange={(e) => setAdminNotes({ ...adminNotes, [ret.id]: e.target.value })}
                  className="admin-note-input"
                />

                <div className="action-buttons">
                  {ret.status === 'PENDING' && (
                    <>
                      <button
                        type="button"
                        className="btn btn-outline btn-sm approve-btn"
                        disabled={updatingId === ret.id}
                        onClick={() => handleStatusChange(ret.id, 'APPROVED')}
                      >
                        Approve Return
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline btn-sm reject-btn"
                        disabled={updatingId === ret.id}
                        onClick={() => handleStatusChange(ret.id, 'REJECTED')}
                      >
                        Reject
                      </button>
                    </>
                  )}

                  {ret.status === 'APPROVED' && (
                    <button
                      type="button"
                      className="btn btn-outline btn-sm"
                      disabled={updatingId === ret.id}
                      onClick={() => handleStatusChange(ret.id, 'PICKED_UP')}
                    >
                      Mark Courier Picked Up
                    </button>
                  )}

                  {ret.status === 'PICKED_UP' && (
                    <button
                      type="button"
                      className="btn btn-outline btn-sm"
                      disabled={updatingId === ret.id}
                      onClick={() => handleStatusChange(ret.id, 'RECEIVED')}
                    >
                      Confirm Item Received
                    </button>
                  )}

                  {['RECEIVED', 'APPROVED'].includes(ret.status) && (
                    <button
                      type="button"
                      className="btn btn-primary btn-sm refund-btn"
                      disabled={updatingId === ret.id}
                      onClick={() => {
                        if (window.confirm(`Issue Razorpay refund of ${formatINR(ret.refund_amount)} to ${ret.customer_name}?`)) {
                          handleStatusChange(ret.id, 'REFUNDED');
                        }
                      }}
                    >
                      Issue Refund ({formatINR(ret.refund_amount)})
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        .admin-page-head { margin-bottom: 26px; }
        .admin-page-head h1 { font-size: 26px; margin-bottom: 8px; }
        .admin-page-head p { font-size: 13px; color: var(--ink-400); max-width: 680px; line-height: 1.6; }
        .admin-error { font-size: 12.5px; color: #a13a3a; margin-bottom: 16px; }
        .empty { font-size: 13.5px; color: var(--ink-400); padding: 20px 0; }

        .returns-list { display: flex; flex-direction: column; gap: 16px; }
        .return-card {
          background: var(--paper);
          border-radius: var(--radius-md);
          border: 1px solid var(--stone-200);
          padding: 18px 20px;
        }
        .return-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--stone-200);
          font-size: 13px;
        }
        .ret-id { font-weight: 600; color: var(--maroon-900); margin-right: 12px; }
        .ret-order { font-weight: 500; margin-right: 12px; color: var(--ink-700); }
        .ret-date { color: var(--ink-400); font-size: 12px; }

        .status-pill {
          font-size: 11px;
          font-weight: 600;
          padding: 3px 10px;
          border-radius: 999px;
          text-transform: uppercase;
        }
        .status-pending { background: #fdf0d5; color: #8a5a10; }
        .status-approved { background: #e8f2e6; color: #3c7a3c; }
        .status-rejected { background: #f6e3e3; color: #a13a3a; }
        .status-picked_up { background: #e0f2fe; color: #0369a1; }
        .status-received { background: #ede9fe; color: #6d28d9; }
        .status-refunded { background: #dcfce7; color: #15803d; }

        .return-body {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 20px;
          padding: 14px 0;
          font-size: 13px;
        }
        .ret-customer-info p { margin: 4px 0; color: var(--ink-700); }
        .reason-text { color: var(--maroon-900); font-weight: 500; }
        .photos-row { display: flex; gap: 8px; margin-top: 6px; }
        .evidence-thumb { width: 56px; height: 56px; object-fit: cover; border-radius: 4px; border: 1px solid var(--stone-300); }

        .return-actions-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 14px;
          padding-top: 14px;
          border-top: 1px solid var(--stone-200);
        }
        .admin-note-input {
          flex: 1;
          font-size: 12.5px;
          padding: 7px 10px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--stone-300);
        }
        .action-buttons { display: flex; gap: 8px; }
        .approve-btn { color: #3c7a3c; border-color: #3c7a3c; }
        .reject-btn { color: #a13a3a; border-color: #a13a3a; }
        .refund-btn { background: #15803d; border-color: #15803d; color: #fff; }

        @media (max-width: 700px) {
          .admin-page-head { margin-bottom: 18px; }
          .admin-page-head h1 { font-size: 22px; margin-bottom: 6px; }
          .return-card { padding: 14px; }
          .return-head { flex-direction: column; align-items: flex-start; gap: 8px; }
          .return-body {
            grid-template-columns: 1fr;
            gap: 12px;
          }
          .return-actions-row {
            flex-direction: column;
            align-items: stretch;
            gap: 10px;
          }
          .admin-note-input {
            width: 100%;
            box-sizing: border-box;
          }
          .action-buttons {
            width: 100%;
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
          }
          .action-buttons .btn {
            flex: 1;
            min-width: 120px;
            text-align: center;
            justify-content: center;
            padding: 8px 12px;
          }
        }
      `}</style>
    </div>
  );
}
