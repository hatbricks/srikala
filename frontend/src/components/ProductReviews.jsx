import { useEffect, useRef, useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../data/api';

const RATING_LABELS = {
  1: 'Poor',
  2: 'Fair',
  3: 'Good',
  4: 'Very Good',
  5: 'Exceptional',
};

function Stars({ value, onChange, size = 18, readOnly = false }) {
  const [hover, setHover] = useState(0);
  const activeValue = hover || value;

  return (
    <div
      className={`rating-stars ${readOnly ? 'is-readonly' : 'is-interactive'}`}
      role={readOnly ? 'img' : 'radiogroup'}
      aria-label={`Rating: ${value} of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readOnly}
          className={`star-btn ${star <= activeValue ? 'filled' : ''}`}
          style={{ fontSize: `${size}px` }}
          onMouseEnter={() => !readOnly && setHover(star)}
          onMouseLeave={() => !readOnly && setHover(0)}
          onClick={() => !readOnly && onChange?.(star)}
          aria-label={`${star} star${star > 1 ? 's' : ''}`}
        >
          ★
        </button>
      ))}
      <style>{`
        .rating-stars {
          display: inline-flex;
          align-items: center;
          gap: 3px;
        }
        .star-btn {
          background: none;
          border: none;
          padding: 0;
          color: #d1c7bd;
          line-height: 1;
          transition: color 0.15s ease, transform 0.1s ease;
        }
        .rating-stars.is-interactive .star-btn {
          cursor: pointer;
        }
        .rating-stars.is-interactive .star-btn:hover {
          transform: scale(1.18);
        }
        .star-btn.filled {
          color: var(--gold-500, #b87d2b);
        }
      `}</style>
    </div>
  );
}

export default function ProductReviews({ productId, productName }) {
  const { user } = useAuth();
  const location = useLocation();
  const [reviews, setReviews] = useState([]);
  const [summary, setSummary] = useState({ count: 0, average: 0 });
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // Form state
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [imageFile, setImageFile] = useState(null); // { name, size, dataUrl }
  const [fileError, setFileError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Lightbox zoom state
  const [zoomPhoto, setZoomPhoto] = useState(null);
  const fileInputRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    api
      .getReviews(productId)
      .then(({ reviews, summary }) => {
        if (!active) return;
        setReviews(reviews || []);
        setSummary(summary || { count: 0, average: 0 });
      })
      .catch(() => {
        if (!active) return;
        setReviews([]);
        setSummary({ count: 0, average: 0 });
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [productId]);

  // Close lightbox on Escape key
  useEffect(() => {
    if (!zoomPhoto) return undefined;
    function handleKeyDown(e) {
      if (e.key === 'Escape') setZoomPhoto(null);
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [zoomPhoto]);

  // Breakdown of 1-5 star percentages
  const distribution = useMemo(() => {
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((r) => {
      const star = Math.min(5, Math.max(1, Math.round(r.rating)));
      counts[star] = (counts[star] || 0) + 1;
    });
    const total = reviews.length || 1;
    return [5, 4, 3, 2, 1].map((s) => ({
      star: s,
      count: counts[s] || 0,
      pct: Math.round(((counts[s] || 0) / total) * 100),
    }));
  }, [reviews]);

  function handleFileSelect(e) {
    const file = e.target.files?.[0];
    setFileError('');
    if (!file) return;

    // Strict 2 MB validation (2 * 1024 * 1024 bytes)
    const MAX_SIZE = 2 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      setFileError('Image must be less than 2 MB. Please select a smaller photo.');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    if (!file.type.startsWith('image/')) {
      setFileError('Please select a valid image file (JPEG, PNG, WEBP).');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImageFile({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2),
        dataUrl: reader.result,
      });
    };
    reader.onerror = () => {
      setFileError('Failed to read image. Please try again.');
    };
    reader.readAsDataURL(file);
  }

  function handleRemoveImage() {
    setImageFile(null);
    setFileError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  async function handleSubmitReview(e) {
    e.preventDefault();
    setSubmitError('');
    setSubmitSuccess(false);

    if (!rating || rating < 1 || rating > 5) {
      setSubmitError('Please select a star rating between 1 and 5.');
      return;
    }

    if (!comment.trim()) {
      setSubmitError('Please enter your review text.');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        rating,
        comment: comment.trim(),
        photos: imageFile ? [imageFile.dataUrl] : [],
      };

      const { review } = await api.addReview(productId, payload);
      setReviews((prev) => [review, ...prev]);
      setSummary((prev) => {
        const newCount = prev.count + 1;
        const newAvg = Math.round((((prev.average * prev.count) + rating) / newCount) * 10) / 10;
        return { count: newCount, average: newAvg };
      });

      setSubmitSuccess(true);
      setComment('');
      setImageFile(null);
      setRating(5);
      if (fileInputRef.current) fileInputRef.current.value = '';
      setTimeout(() => {
        setShowForm(false);
        setSubmitSuccess(false);
      }, 2500);
    } catch (err) {
      setSubmitError(err.message || 'Failed to submit review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="product-reviews-section" id="reviews">
      <div className="container">
        <div className="reviews-section-header">
          <div>
            <p className="eyebrow">Customer Voices</p>
            <h2>Ratings &amp; Reviews</h2>
          </div>
          <button
            type="button"
            className="btn btn-outline write-review-toggle-btn"
            onClick={() => {
              setShowForm((prev) => !prev);
              if (!showForm) {
                setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
              }
            }}
          >
            {showForm ? 'Cancel' : 'Write a Review'}
          </button>
        </div>

        {/* Rating Summary Card */}
        <div className="reviews-summary-card">
          <div className="summary-score-col">
            <div className="big-rating-number">
              {summary.count > 0 ? summary.average.toFixed(1) : '5.0'}
            </div>
            <Stars value={summary.count > 0 ? Math.round(summary.average) : 5} readOnly size={20} />
            <p className="summary-count-label">
              {summary.count > 0
                ? `Based on ${summary.count} verified ${summary.count === 1 ? 'review' : 'reviews'}`
                : 'No reviews yet'}
            </p>
          </div>

          <div className="summary-bars-col">
            {distribution.map(({ star, count, pct }) => (
              <div className="dist-row" key={star}>
                <span className="dist-star-label">{star} ★</span>
                <div className="dist-bar-track">
                  <div className="dist-bar-fill" style={{ width: `${pct}%` }} />
                </div>
                <span className="dist-count-label">{count}</span>
              </div>
            ))}
          </div>

          <div className="summary-perks-col">
            <div className="perk-item">
              <span className="perk-icon">✓</span>
              <span>100% Verified Buyer Feedback</span>
            </div>
            <div className="perk-item">
              <span className="perk-icon">📷</span>
              <span>Authentic Saree Drapes &amp; Photos</span>
            </div>
            <div className="perk-item">
              <span className="perk-icon">✨</span>
              <span>Dharmavaram Pure Handloom Silk</span>
            </div>
          </div>
        </div>

        {/* Write Review Form Drawer / Box */}
        {showForm && (
          <div className="write-review-container" ref={formRef}>
            <div className="write-review-card">
              <div className="write-card-head">
                <h3>Write a Review for {productName || 'this Saree'}</h3>
                <p>Share your authentic experience with the fabric, color, zari weave, and drape.</p>
              </div>

              {!user ? (
                <div className="login-required-box">
                  <p>Please log in to share your product review.</p>
                  <Link
                    to={`/login`}
                    state={{ from: `${location.pathname}${location.search}` }}
                    className="btn btn-primary"
                  >
                    Log In to Review
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmitReview} className="review-submission-form">
                  {/* Rating Selector */}
                  <div className="form-group rating-form-group">
                    <label className="field-label">Overall Rating *</label>
                    <div className="stars-picker-wrap">
                      <Stars value={rating} onChange={setRating} size={28} />
                      <span className="rating-text-hint">{RATING_LABELS[rating]}</span>
                    </div>
                  </div>

                  {/* Review Text Area */}
                  <div className="form-group">
                    <label className="field-label" htmlFor="review-text-input">
                      Your Review *
                    </label>
                    <textarea
                      id="review-text-input"
                      rows={4}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="How does the saree look in person? Share details on the pure silk touch, border zari, luster, and packaging..."
                      maxLength={2000}
                      required
                    />
                    <div className="char-count-hint">{comment.length} / 2000 characters</div>
                  </div>

                  {/* 1 Image Upload with Strict < 2MB Limit */}
                  <div className="form-group photo-upload-group">
                    <label className="field-label">
                      Attach Saree Photo <span className="label-opt">(1 image, under 2 MB)</span>
                    </label>

                    {!imageFile ? (
                      <div
                        className="photo-dropzone"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/jpeg,image/png,image/webp,image/jpg"
                          style={{ display: 'none' }}
                          onChange={handleFileSelect}
                        />
                        <div className="dropzone-content">
                          <svg viewBox="0 0 24 24" fill="none" width="28" height="28" stroke="currentColor" strokeWidth="1.6">
                            <rect x="3" y="3" width="18" height="18" rx="3" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <path d="M21 15l-5-5L5 21" />
                          </svg>
                          <span className="dropzone-title">Upload 1 photo of the saree</span>
                          <span className="dropzone-sub">Click to browse (JPG, PNG, WEBP — max 2 MB)</span>
                        </div>
                      </div>
                    ) : (
                      <div className="selected-photo-preview">
                        <img src={imageFile.dataUrl} alt="Review upload preview" className="preview-thumb" />
                        <div className="preview-details">
                          <span className="preview-name">{imageFile.name}</span>
                          <span className="preview-size">{imageFile.size} MB</span>
                        </div>
                        <button
                          type="button"
                          className="remove-photo-btn"
                          onClick={handleRemoveImage}
                          title="Remove photo"
                          aria-label="Remove photo"
                        >
                          ✕
                        </button>
                      </div>
                    )}

                    {fileError && <p className="review-field-error">{fileError}</p>}
                  </div>

                  {submitError && <div className="review-alert-error">{submitError}</div>}
                  {submitSuccess && (
                    <div className="review-alert-success">
                      ✓ Thank you! Your review has been submitted successfully.
                    </div>
                  )}

                  <div className="form-actions-row">
                    <button
                      type="submit"
                      className="btn btn-primary submit-review-btn"
                      disabled={submitting || submitSuccess}
                    >
                      {submitting ? 'Submitting Review…' : 'Submit Review'}
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline"
                      onClick={() => setShowForm(false)}
                      disabled={submitting}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Reviews List */}
        <div className="reviews-list-container">
          {loading ? (
            <div className="reviews-loading">Loading customer reviews…</div>
          ) : reviews.length === 0 ? (
            <div className="empty-reviews-card">
              <svg viewBox="0 0 24 24" fill="none" width="44" height="44" stroke="currentColor" strokeWidth="1.4">
                <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z" />
                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
              <h3>Be the First to Review</h3>
              <p>Purchased or admired this saree? Be the first to share your thoughts and help others decide.</p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setShowForm(true);
                  setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
                }}
              >
                Write the First Review
              </button>
            </div>
          ) : (
            <div className="reviews-cards-grid">
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
                  <article className="review-item-card" key={r.id}>
                    <div className="review-card-top">
                      <div className="reviewer-info">
                        <span className="reviewer-avatar">
                          {(r.user_name || 'Customer').charAt(0).toUpperCase()}
                        </span>
                        <div>
                          <div className="reviewer-name-row">
                            <strong>{r.user_name || 'Customer'}</strong>
                            <span className="verified-badge">✓ Verified Buyer</span>
                          </div>
                          <span className="review-date-str">
                            {r.created_at
                              ? new Date(r.created_at).toLocaleDateString('en-IN', {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric',
                                })
                              : 'Recent'}
                          </span>
                        </div>
                      </div>
                      <Stars value={r.rating} readOnly size={15} />
                    </div>

                    {r.comment && <p className="review-comment-body">{r.comment}</p>}

                    {photo && (
                      <div className="review-photo-wrapper">
                        <button
                          type="button"
                          className="review-photo-btn"
                          onClick={() => setZoomPhoto(photo)}
                          title="Click to view full photo"
                          aria-label="View buyer uploaded photo full size"
                        >
                          <img src={photo} alt="Customer saree drape photo" loading="lazy" />
                          <span className="photo-zoom-hint">
                            <svg viewBox="0 0 20 20" fill="none" width="14" height="14" stroke="currentColor" strokeWidth="2">
                              <circle cx="8.5" cy="8.5" r="5.5" />
                              <line x1="12.5" y1="12.5" x2="17" y2="17" />
                            </svg>
                            <span>Enlarge</span>
                          </span>
                        </button>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Zoom Modal */}
      {zoomPhoto && (
        <div className="photo-lightbox-backdrop" onClick={() => setZoomPhoto(null)}>
          <div className="lightbox-content-box" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="lightbox-close-btn"
              onClick={() => setZoomPhoto(null)}
              aria-label="Close photo preview"
            >
              ✕
            </button>
            <img src={zoomPhoto} alt="Customer uploaded saree photo" className="lightbox-full-img" />
          </div>
        </div>
      )}

      <style>{`
        .product-reviews-section {
          padding: 60px 0 30px;
          background: #FAF8F5;
          border-top: 1px solid rgba(197, 139, 56, 0.22);
          position: relative;
        }
        .reviews-section-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 28px;
          gap: 16px;
          flex-wrap: wrap;
        }
        .reviews-section-header h2 {
          font-size: 28px;
          color: #2c1810;
          margin: 4px 0 0;
          font-family: var(--font-heading, serif);
        }
        .write-review-toggle-btn {
          border-color: #b87d2b;
          color: #581e15;
          font-weight: 500;
          padding: 9px 20px;
        }
        .write-review-toggle-btn:hover {
          background: #b87d2b;
          color: #ffffff;
        }

        /* Summary Card */
        .reviews-summary-card {
          background: #ffffff;
          border-radius: var(--radius-lg, 16px);
          border: 1px solid rgba(197, 139, 56, 0.3);
          box-shadow: 0 10px 30px rgba(88, 30, 21, 0.05);
          padding: 32px 36px;
          display: grid;
          grid-template-columns: 220px 1fr 240px;
          gap: 36px;
          align-items: center;
          margin-bottom: 36px;
        }
        .summary-score-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          border-right: 1px solid rgba(197, 139, 56, 0.18);
          padding-right: 28px;
        }
        .big-rating-number {
          font-size: 52px;
          font-weight: 700;
          line-height: 1;
          color: #581e15;
          font-family: var(--font-heading, serif);
          margin-bottom: 8px;
        }
        .summary-count-label {
          font-size: 13px;
          color: #8c7365;
          margin: 8px 0 0;
        }

        .summary-bars-col {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .dist-row {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 12.5px;
          color: #523c35;
        }
        .dist-star-label {
          width: 32px;
          font-weight: 600;
        }
        .dist-bar-track {
          flex: 1;
          height: 8px;
          background: #f1ece4;
          border-radius: 999px;
          overflow: hidden;
        }
        .dist-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #d99a43, #b87d2b);
          border-radius: 999px;
          transition: width 0.4s ease;
        }
        .dist-count-label {
          width: 24px;
          text-align: right;
          color: #8c7365;
        }

        .summary-perks-col {
          border-left: 1px solid rgba(197, 139, 56, 0.18);
          padding-left: 28px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .perk-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          color: #4a2c20;
          font-weight: 500;
        }
        .perk-icon {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: rgba(184, 125, 43, 0.12);
          color: #b87d2b;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          flex-shrink: 0;
        }

        /* Write Review Card */
        .write-review-container {
          margin-bottom: 40px;
          animation: dropReviewForm 0.3s ease;
        }
        @keyframes dropReviewForm {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .write-review-card {
          background: #ffffff;
          border-radius: var(--radius-lg, 16px);
          border: 1px solid rgba(197, 139, 56, 0.4);
          padding: 30px 34px;
          box-shadow: 0 14px 34px rgba(88, 30, 21, 0.08);
        }
        .write-card-head {
          margin-bottom: 22px;
          border-bottom: 1px solid rgba(197, 139, 56, 0.15);
          padding-bottom: 14px;
        }
        .write-card-head h3 {
          font-size: 20px;
          color: #581e15;
          margin: 0 0 6px;
        }
        .write-card-head p {
          font-size: 13.5px;
          color: #6d544b;
          margin: 0;
        }
        .login-required-box {
          text-align: center;
          padding: 24px;
          background: #fdfbf7;
          border-radius: 12px;
          border: 1px dashed rgba(197, 139, 56, 0.3);
        }
        .login-required-box p {
          color: #581e15;
          font-size: 15px;
          margin-bottom: 14px;
        }

        .review-submission-form .form-group {
          margin-bottom: 20px;
        }
        .field-label {
          display: block;
          font-size: 13.5px;
          font-weight: 600;
          color: #2c1810;
          margin-bottom: 8px;
        }
        .label-opt {
          font-size: 12px;
          color: #8c7365;
          font-weight: 400;
        }
        .stars-picker-wrap {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .rating-text-hint {
          font-size: 14px;
          font-weight: 600;
          color: #b87d2b;
        }
        .review-submission-form textarea {
          width: 100%;
          border-radius: 10px;
          border: 1px solid #dcd3c7;
          padding: 12px 14px;
          font-family: inherit;
          font-size: 14px;
          color: #2c1810;
          background: #faf8f5;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .review-submission-form textarea:focus {
          border-color: #b87d2b;
          box-shadow: 0 0 0 3px rgba(184, 125, 43, 0.15);
          background: #ffffff;
        }
        .char-count-hint {
          font-size: 11.5px;
          color: #8c7365;
          text-align: right;
          margin-top: 4px;
        }

        /* Photo Upload Dropzone */
        .photo-dropzone {
          border: 2px dashed rgba(197, 139, 56, 0.4);
          border-radius: 12px;
          padding: 24px;
          text-align: center;
          background: #fdfaf6;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .photo-dropzone:hover {
          background: #faf4ec;
          border-color: #b87d2b;
        }
        .dropzone-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          color: #b87d2b;
        }
        .dropzone-title {
          font-size: 14px;
          font-weight: 600;
          color: #4a2c20;
        }
        .dropzone-sub {
          font-size: 12px;
          color: #8c7365;
        }

        .selected-photo-preview {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 10px 14px;
          background: #fdfbf7;
          border: 1px solid rgba(197, 139, 56, 0.35);
          border-radius: 10px;
        }
        .preview-thumb {
          width: 58px;
          height: 58px;
          border-radius: 8px;
          object-fit: cover;
          border: 1px solid rgba(0,0,0,0.1);
        }
        .preview-details {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .preview-name {
          font-size: 13px;
          font-weight: 600;
          color: #2c1810;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .preview-size {
          font-size: 11.5px;
          color: #8c7365;
        }
        .remove-photo-btn {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: none;
          background: #f1ece4;
          color: #8c3b3b;
          font-size: 13px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.15s ease;
        }
        .remove-photo-btn:hover {
          background: #e5d7d7;
        }
        .review-field-error {
          color: #b91c1c;
          font-size: 12.5px;
          margin-top: 6px;
          font-weight: 500;
        }
        .review-alert-error {
          background: #fee2e2;
          color: #991b1b;
          padding: 10px 14px;
          border-radius: 8px;
          font-size: 13px;
          margin-bottom: 16px;
        }
        .review-alert-success {
          background: #dcfce7;
          color: #166534;
          padding: 10px 14px;
          border-radius: 8px;
          font-size: 13px;
          margin-bottom: 16px;
          font-weight: 500;
        }
        .form-actions-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 24px;
        }
        .submit-review-btn {
          min-width: 160px;
        }

        /* Reviews List */
        .reviews-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 22px;
        }
        .review-item-card {
          background: #ffffff;
          border-radius: var(--radius-md, 12px);
          border: 1px solid rgba(197, 139, 56, 0.22);
          padding: 22px 24px;
          box-shadow: 0 4px 14px rgba(88, 30, 21, 0.04);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .review-item-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 22px rgba(88, 30, 21, 0.08);
        }
        .review-card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 14px;
          gap: 10px;
        }
        .reviewer-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .reviewer-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #581e15;
          color: #ffffff;
          font-size: 14px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .reviewer-name-row {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        .reviewer-name-row strong {
          font-size: 14px;
          color: #2c1810;
        }
        .verified-badge {
          font-size: 11px;
          font-weight: 600;
          color: #2e7d32;
          background: #e8f5e9;
          padding: 1px 7px;
          border-radius: 999px;
        }
        .review-date-str {
          font-size: 12px;
          color: #8c7365;
          display: block;
        }
        .review-comment-body {
          font-size: 14px;
          line-height: 1.65;
          color: #4a3831;
          margin: 0 0 16px;
          flex: 1;
          white-space: pre-line;
        }

        /* Review Photo Preview */
        .review-photo-wrapper {
          margin-top: 10px;
        }
        .review-photo-btn {
          position: relative;
          background: none;
          border: 1px solid rgba(197, 139, 56, 0.3);
          border-radius: 8px;
          overflow: hidden;
          padding: 0;
          cursor: pointer;
          width: 90px;
          height: 90px;
          display: block;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .review-photo-btn:hover {
          transform: scale(1.04);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        .review-photo-btn img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .photo-zoom-hint {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.45);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          font-size: 10px;
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        .review-photo-btn:hover .photo-zoom-hint {
          opacity: 1;
        }

        /* Empty State */
        .empty-reviews-card {
          text-align: center;
          padding: 44px 24px;
          background: #ffffff;
          border-radius: 16px;
          border: 1px dashed rgba(197, 139, 56, 0.35);
          color: #8c7365;
        }
        .empty-reviews-card svg {
          color: #b87d2b;
          margin-bottom: 12px;
        }
        .empty-reviews-card h3 {
          font-size: 18px;
          color: #581e15;
          margin: 0 0 8px;
        }
        .empty-reviews-card p {
          font-size: 13.5px;
          max-width: 440px;
          margin: 0 auto 20px;
        }
        .reviews-loading {
          text-align: center;
          padding: 40px;
          color: #8c7365;
          font-size: 14px;
        }

        /* Lightbox Backdrop */
        .photo-lightbox-backdrop {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: rgba(15, 7, 5, 0.85);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          cursor: zoom-out;
          animation: fadeInLightbox 0.2s ease;
        }
        @keyframes fadeInLightbox {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .lightbox-content-box {
          position: relative;
          max-width: 90vw;
          max-height: 90vh;
          cursor: default;
        }
        .lightbox-full-img {
          max-width: 90vw;
          max-height: 85vh;
          object-fit: contain;
          border-radius: 8px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.5);
          display: block;
        }
        .lightbox-close-btn {
          position: absolute;
          top: -16px;
          right: -16px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #ffffff;
          color: #2c1810;
          border: none;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 14px rgba(0,0,0,0.3);
          transition: transform 0.15s ease;
        }
        .lightbox-close-btn:hover {
          transform: scale(1.1);
        }

        @media (max-width: 900px) {
          .reviews-summary-card {
            grid-template-columns: 1fr;
            gap: 24px;
            padding: 24px;
          }
          .summary-score-col {
            border-right: none;
            padding-right: 0;
            border-bottom: 1px solid rgba(197, 139, 56, 0.18);
            padding-bottom: 20px;
          }
          .summary-perks-col {
            border-left: none;
            padding-left: 0;
            border-top: 1px solid rgba(197, 139, 56, 0.18);
            padding-top: 20px;
          }
        }

        @media (max-width: 600px) {
          .product-reviews-section {
            padding: 40px 0 20px;
          }
          .reviews-section-header {
            flex-direction: column;
            align-items: flex-start;
          }
          .reviews-section-header h2 {
            font-size: 22px;
          }
          .write-review-card {
            padding: 20px 16px;
          }
          .reviews-cards-grid {
            grid-template-columns: 1fr;
          }
          .lightbox-close-btn {
            top: -12px;
            right: -12px;
            width: 30px;
            height: 30px;
            font-size: 14px;
          }
        }
      `}</style>
    </section>
  );
}
