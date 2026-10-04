import { useEffect, useState } from 'react';
import { api } from '../../data/api';
import { ReviewsIcon } from '../../components/admin/AdminIcons';

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState('');
  const [previewPhoto, setPreviewPhoto] = useState(null);

  useEffect(() => {
    refresh();
  }, []);

  useEffect(() => {
    if (!previewPhoto) return undefined;
    const handleKey = (e) => {
      if (e.key === 'Escape') setPreviewPhoto(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [previewPhoto]);

  function refresh() {
    api.getAdminReviews().then(({ reviews }) => setReviews(reviews)).catch((err) => setError(err.message));
  }

  async function toggleApprove(review) {
    try {
      await api.approveReview(review.id, !review.approved);
      refresh();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this review?')) return;
    try {
      await api.deleteReview(id);
      refresh();
    } catch (err) {
      setError(err.message);
    }
  }

  const approvedCount = reviews.filter((r) => r.approved).length;
  const hiddenCount = reviews.filter((r) => !r.approved).length;
  const avgRating = reviews.length
    ? (reviews.reduce((acc, r) => acc + (Number(r.rating) || 0), 0) / reviews.length).toFixed(1)
    : '0.0';

  return (
    <div>
      <div className="admin-page-head">
        <div>
          <h1>Reviews Management</h1>
          <p>
            Star ratings, comments, and customer-uploaded photos left on product pages.
            Hide a review to remove it from the storefront without deleting it.
          </p>
        </div>
        <div className="admin-reviews-stats">
          <div className="stat-pill">
            <span className="stat-num">{reviews.length}</span>
            <span className="stat-txt">Total</span>
          </div>
          <div className="stat-pill stat-approved">
            <span className="stat-num">{approvedCount}</span>
            <span className="stat-txt">Approved</span>
          </div>
          {hiddenCount > 0 && (
            <div className="stat-pill stat-hidden">
              <span className="stat-num">{hiddenCount}</span>
              <span className="stat-txt">Hidden</span>
            </div>
          )}
          <div className="stat-pill stat-rating">
            <span className="stat-num">★ {avgRating}</span>
            <span className="stat-txt">Average</span>
          </div>
        </div>
      </div>

      {error && <p className="admin-error">{error}</p>}

      <div className="cms-list">
        {reviews.length === 0 && <p className="empty">No reviews yet.</p>}
        {reviews.map((r) => {
          const photos = Array.isArray(r.photos)
            ? r.photos
            : (typeof r.photos === 'string' && r.photos.startsWith('['))
            ? JSON.parse(r.photos || '[]')
            : r.photos
            ? [r.photos]
            : [];
          const photo = photos[0];

          return (
            <div className={`review-row ${!r.approved ? 'is-hidden-row' : ''}`} key={r.id}>
              {photo && (
                <div className="review-photo-col">
                  <button
                    type="button"
                    className="review-thumb-btn"
                    onClick={() => setPreviewPhoto(photo)}
                    title="Click to view full photo"
                    aria-label="View customer photo"
                  >
                    <img src={photo} alt="Customer upload" />
                    <span className="thumb-zoom-icon">🔍</span>
                  </button>
                </div>
              )}
              <div className="review-row-main">
                <div className="review-row-head">
                  <strong>{r.product_name}</strong>
                  <span className="stars" style={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <ReviewsIcon
                        key={i}
                        width={13}
                        height={13}
                        fill={i < r.rating ? 'var(--gold-500)' : 'none'}
                        stroke="var(--gold-500)"
                      />
                    ))}
                  </span>
                  <span className={`status-pill-badge ${r.approved ? 'approved' : 'hidden'}`}>
                    {r.approved ? 'Live' : 'Hidden'}
                  </span>
                </div>
                {r.comment && <p className="review-comment-text">{r.comment}</p>}
                <div className="review-meta-line">
                  <span className="review-by">
                    <strong>{r.user_name || 'Customer'}</strong> · {r.user_email} ·{' '}
                    {new Date(r.created_at).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                  {photo && <span className="photo-tag-badge">📷 1 Photo</span>}
                </div>
              </div>
              <div className="row-actions">
                <button
                  type="button"
                  className={`approve-toggle-btn ${r.approved ? 'btn-hide' : 'btn-show'}`}
                  onClick={() => toggleApprove(r)}
                >
                  {r.approved ? 'Hide' : 'Approve'}
                </button>
                <button type="button" onClick={() => handleDelete(r.id)} className="danger">
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full Photo Modal */}
      {previewPhoto && (
        <div className="admin-photo-modal-backdrop" onClick={() => setPreviewPhoto(null)}>
          <div className="admin-photo-modal-box" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="admin-modal-close"
              onClick={() => setPreviewPhoto(null)}
              aria-label="Close photo preview"
            >
              ✕
            </button>
            <img src={previewPhoto} alt="Customer upload full view" className="admin-full-photo" />
          </div>
        </div>
      )}

      <style>{`
        .admin-page-head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 26px;
          flex-wrap: wrap;
        }
        .admin-page-head h1 { font-size: 26px; margin-bottom: 8px; }
        .admin-page-head p { font-size: 13px; color: var(--ink-400); max-width: 560px; line-height: 1.6; }
        .admin-reviews-stats {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .stat-pill {
          background: var(--paper);
          border: 1px solid var(--stone-200);
          border-radius: var(--radius-sm, 8px);
          padding: 6px 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 70px;
        }
        .stat-num { font-size: 16px; font-weight: 700; color: var(--ink-900); }
        .stat-txt { font-size: 10px; text-transform: uppercase; color: var(--ink-400); font-weight: 600; letter-spacing: 0.04em; }
        .stat-approved .stat-num { color: #166534; }
        .stat-hidden .stat-num { color: #991b1b; }
        .stat-rating .stat-num { color: #b87d2b; }

        .admin-error { font-size: 12.5px; color: #a13a3a; margin-bottom: 16px; }
        .empty { color: var(--ink-400); font-size: 13.5px; }

        .cms-list { display: flex; flex-direction: column; gap: 12px; }
        .review-row {
          background: var(--paper);
          border-radius: var(--radius-md);
          border: 1px solid var(--stone-200);
          padding: 16px 20px;
          display: flex;
          align-items: flex-start;
          gap: 16px;
          transition: border-color 0.15s ease;
        }
        .review-row.is-hidden-row {
          opacity: 0.65;
          background: #faf6f5;
        }
        .review-photo-col {
          flex: 0 0 auto;
        }
        .review-thumb-btn {
          position: relative;
          width: 64px;
          height: 64px;
          border-radius: 8px;
          overflow: hidden;
          padding: 0;
          border: 1px solid var(--stone-300);
          background: #f1ece4;
          cursor: pointer;
        }
        .review-thumb-btn img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .thumb-zoom-icon {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.4);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          opacity: 0;
          transition: opacity 0.15s ease;
        }
        .review-thumb-btn:hover .thumb-zoom-icon {
          opacity: 1;
        }

        .review-row-main { flex: 1; }
        .review-row-head {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 6px;
          flex-wrap: wrap;
        }
        .review-row-head strong { font-size: 14px; color: var(--ink-900); }
        .stars { color: var(--gold-500); font-size: 12px; }
        .status-pill-badge {
          font-size: 10.5px;
          font-weight: 600;
          padding: 1px 8px;
          border-radius: 999px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .status-pill-badge.approved {
          background: #dcfce7;
          color: #166534;
        }
        .status-pill-badge.hidden {
          background: #fee2e2;
          color: #991b1b;
        }

        .review-comment-text {
          margin: 6px 0 8px;
          font-size: 13.5px;
          line-height: 1.6;
          color: var(--ink-700);
          white-space: pre-line;
        }
        .review-meta-line {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .review-by { font-size: 12px; color: var(--ink-400); }
        .review-by strong { color: var(--ink-700); }
        .photo-tag-badge {
          font-size: 11px;
          font-weight: 500;
          background: rgba(184, 125, 43, 0.12);
          color: #945d16;
          padding: 1px 7px;
          border-radius: 4px;
        }

        .row-actions { display: flex; gap: 8px; flex: 0 0 auto; }
        .row-actions button {
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 500;
          border: 1px solid var(--stone-300);
          background: #ffffff;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .row-actions .approve-toggle-btn:hover {
          border-color: var(--maroon-900);
          color: var(--maroon-900);
        }
        .row-actions .danger {
          color: #a13a3a;
          border-color: #fca5a5;
          background: #fef2f2;
        }
        .row-actions .danger:hover {
          background: #fee2e2;
        }

        /* Modal Lightbox */
        .admin-photo-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: rgba(0,0,0,0.75);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .admin-photo-modal-box {
          position: relative;
          max-width: 85vw;
          max-height: 85vh;
        }
        .admin-full-photo {
          max-width: 85vw;
          max-height: 80vh;
          object-fit: contain;
          border-radius: 8px;
          box-shadow: 0 16px 40px rgba(0,0,0,0.4);
        }
        .admin-modal-close {
          position: absolute;
          top: -14px;
          right: -14px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #ffffff;
          border: none;
          color: #2c1810;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        }

        @media (max-width: 640px) {
          .admin-page-head { margin-bottom: 18px; }
          .admin-page-head h1 { font-size: 22px; margin-bottom: 6px; }
          .review-row {
            flex-direction: column;
            gap: 12px;
            padding: 14px;
          }
          .row-actions {
            width: 100%;
            justify-content: flex-end;
            padding-top: 10px;
            border-top: 1px solid var(--stone-100);
            gap: 8px;
          }
        }
      `}</style>
    </div>
  );
}
