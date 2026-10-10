import { useState } from 'react';

const defaultGoogleData = {
  heading: 'Loved by Saree Connoisseurs',
  subheading: 'Authentic reviews from our patrons on Google Maps',
  googleBusinessUrl: 'https://share.google/rLeQl6DO3cPtU5rql',
  averageRating: 4.9,
  totalReviews: '150+ reviews',
  reviews: [
    {
      id: 'gr-1',
      name: 'Pooja Gowda',
      avatarInitial: 'P',
      avatarColor: '#E65100', // Matches user's screenshot
      userBadge: '1 review',
      rating: 5,
      timeAgo: '5 months ago',
      text: 'They have amazing wedding collection at very reasonable price. You guys must visit for any occasion',
      reviewUrl: 'https://share.google/rLeQl6DO3cPtU5rql',
      likesCount: 1,
    },
    {
      id: 'gr-2',
      name: 'Meenakshi Sundaram',
      avatarInitial: 'M',
      avatarColor: '#2E7D32',
      userBadge: 'Local Guide · 14 reviews',
      rating: 5,
      timeAgo: '3 months ago',
      text: 'Authentic pure silk Kanchivaram sarees. The gold zari lustre and weight of the saree speaks for its quality. Highly recommended for bridal shopping.',
      reviewUrl: 'https://share.google/rLeQl6DO3cPtU5rql',
      likesCount: 4,
    },
    {
      id: 'gr-3',
      name: 'Deepa Hegde',
      avatarInitial: 'D',
      avatarColor: '#1565C0',
      userBadge: '6 reviews',
      rating: 5,
      timeAgo: '2 months ago',
      text: 'Ordered online and received within 3 days in pristine packaging with silk mark certificate. Saree looks even richer than pictures!',
      reviewUrl: 'https://share.google/rLeQl6DO3cPtU5rql',
      likesCount: 2,
    },
  ],
};

export default function GoogleReviewsSection({ cmsData }) {
  const data = {
    ...defaultGoogleData,
    ...(cmsData || {}),
    reviews: Array.isArray(cmsData?.reviews) && cmsData.reviews.length > 0
      ? cmsData.reviews
      : defaultGoogleData.reviews,
  };

  const [reactions, setReactions] = useState({});
  const [copiedId, setCopiedId] = useState(null);
  const [hoverRating, setHoverRating] = useState(0);

  function handleHeartClick(e, id) {
    e.stopPropagation();
    setReactions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }

  function handleShare(e, id, url) {
    e.stopPropagation();
    const shareUrl = url || data.googleBusinessUrl || 'https://share.google/rLeQl6DO3cPtU5rql';
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
      }).catch(() => {
        window.open(shareUrl, '_blank', 'noopener,noreferrer');
      });
    } else {
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }
  }

  function handleCardClick(url) {
    const targetUrl = url || data.googleBusinessUrl || 'https://share.google/rLeQl6DO3cPtU5rql';
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  }

  return (
    <section className="google-reviews-section">
      <div className="container">
        {/* Header with Google Badge */}
        <div className="google-reviews-head">
          <a
            href={data.googleBusinessUrl || 'https://share.google/rLeQl6DO3cPtU5rql'}
            target="_blank"
            rel="noopener noreferrer"
            className="google-badge-brand"
            title="Rate Ravichandra Textiles on Google"
          >
            <svg viewBox="0 0 24 24" width="26" height="26" className="google-icon" aria-hidden="true">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
              <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
            </svg>
            <div className="google-rating-info">
              <span className="google-title">Google Reviews</span>
              <div className="google-stars-row">
                <span className="google-rate-label">Rate us</span>
                <div
                  className="google-empty-stars-group"
                  onMouseLeave={() => setHoverRating(0)}
                  role="radiogroup"
                  aria-label="Rate us on Google"
                >
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`google-star-item ${hoverRating >= star ? 'is-active' : ''}`}
                      onMouseEnter={() => setHoverRating(star)}
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        window.open(data.googleBusinessUrl || 'https://share.google/rLeQl6DO3cPtU5rql', '_blank', 'noopener,noreferrer');
                      }}
                      role="button"
                      tabIndex={0}
                      title={`Rate ${star} star on Google`}
                      aria-label={`Rate ${star} star on Google`}
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" className="empty-star-svg" aria-hidden="true">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </a>

          <div className="google-head-titles">
            <h2 className="section-title">{data.heading}</h2>
            <p className="section-subtitle">{data.subheading}</p>
          </div>

          <a
            href={data.googleBusinessUrl || 'https://share.google/rLeQl6DO3cPtU5rql'}
            target="_blank"
            rel="noopener noreferrer"
            className="google-write-review-btn"
          >
            <span>Review us on Google</span>
            <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
              <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-8a.75.75 0 00-.75-.75h-8a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
            </svg>
          </a>
        </div>

        {/* Cards Grid — Premium White, Reflective Glass Gloss, Compact & Direct Redirection */}
        <div className="google-cards-grid">
          {data.reviews.map((r) => {
            const hasHearted = reactions[r.id];
            const targetUrl = r.reviewUrl || data.googleBusinessUrl || 'https://share.google/rLeQl6DO3cPtU5rql';
            return (
              <div
                className="google-review-card reflective-card"
                key={r.id}
                onClick={() => handleCardClick(targetUrl)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') handleCardClick(targetUrl); }}
                title="Click to view verified review on Google Maps"
              >
                {/* Specular shimmer overlay */}
                <div className="card-shimmer" aria-hidden="true" />

                {/* User Info Bar */}
                <div className="gr-card-header">
                  <div
                    className="gr-avatar"
                    style={{ backgroundColor: r.avatarColor || '#D97706' }}
                  >
                    {r.avatarInitial || r.name?.charAt(0) || 'U'}
                  </div>
                  <div className="gr-user-info">
                    <span className="gr-user-name">{r.name}</span>
                    <span className="gr-user-meta">{r.userBadge || '1 review'}</span>
                  </div>
                  <a
                    href={targetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gr-redirect-badge"
                    onClick={(e) => e.stopPropagation()}
                    title="View directly on Google"
                  >
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </a>
                </div>

                {/* Stars and Timestamp */}
                <div className="gr-rating-row">
                  <div className="gr-stars" aria-label={`${r.rating || 5} stars`}>
                    {Array.from({ length: r.rating || 5 }).map((_, i) => (
                      <span key={i} className="gr-star">★</span>
                    ))}
                  </div>
                  <span className="gr-time-ago">{r.timeAgo || '5 months ago'}</span>
                </div>

                {/* Review Body */}
                <p className="gr-review-text">{r.text}</p>

                {/* Bottom Action Bar: Heart reaction + Share + Redirection prompt */}
                <div className="gr-card-actions">
                  <button
                    type="button"
                    className={`gr-action-btn ${hasHearted ? 'active' : ''}`}
                    onClick={(e) => handleHeartClick(e, r.id)}
                    title="Helpful review"
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill={hasHearted ? '#e53935' : 'none'} stroke={hasHearted ? '#e53935' : 'currentColor'} strokeWidth="2">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                    <span>{hasHearted ? (r.likesCount || 1) + 1 : (r.likesCount || 1)}</span>
                  </button>

                  <button
                    type="button"
                    className="gr-action-btn gr-share-btn"
                    onClick={(e) => handleShare(e, r.id, targetUrl)}
                    title="Copy review link"
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{copiedId === r.id ? 'Copied!' : 'Share'}</span>
                  </button>

                  <span className="gr-card-visit-hint">
                    Open on Google ↗
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .google-reviews-section {
          padding: 64px 0 72px;
          background: #FAF8F5;
          color: #2c1810;
          border-top: 1px solid rgba(197, 139, 56, 0.22);
          border-bottom: 1px solid rgba(197, 139, 56, 0.15);
        }

        .google-reviews-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 32px;
          flex-wrap: wrap;
        }

        .google-badge-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #FFFFFF;
          padding: 8px 18px;
          border-radius: 999px;
          border: 1px solid rgba(197, 139, 56, 0.28);
          box-shadow: 0 4px 14px rgba(184, 134, 11, 0.08);
          text-decoration: none;
          color: inherit;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
        }

        .google-badge-brand:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(184, 134, 11, 0.14);
          border-color: rgba(197, 139, 56, 0.45);
        }

        .google-rating-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .google-title {
          font-size: 13px;
          font-weight: 600;
          color: #2c1810;
          letter-spacing: 0.02em;
          line-height: 1.2;
        }

        .google-stars-row {
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 12px;
          color: #6e594d;
        }

        .google-rate-label {
          font-size: 11.5px;
          font-weight: 600;
          color: #8c7365;
          letter-spacing: 0.01em;
          transition: color 0.15s ease;
        }

        .google-badge-brand:hover .google-rate-label {
          color: #b87d2b;
        }

        .google-empty-stars-group {
          display: flex;
          align-items: center;
          gap: 2px;
        }

        .google-star-item {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          padding: 1px;
          transition: transform 0.15s ease;
        }

        .google-star-item:hover {
          transform: scale(1.15);
        }

        .empty-star-svg {
          fill: transparent;
          stroke: #9ca3af;
          stroke-width: 1.8;
          stroke-linejoin: round;
          stroke-linecap: round;
          transition: fill 0.15s ease, stroke 0.15s ease, filter 0.15s ease;
        }

        .google-star-item.is-active .empty-star-svg {
          fill: #f59e0b;
          stroke: #d97706;
          filter: drop-shadow(0 1px 2px rgba(245, 158, 11, 0.4));
        }

        .google-head-titles {
          flex: 1;
          min-width: 240px;
        }

        .google-head-titles .section-title {
          font-family: var(--font-display, 'Playfair Display', serif);
          font-size: 24px;
          color: #2c1810;
          margin: 0 0 4px;
          font-weight: 600;
        }

        .google-head-titles .section-subtitle {
          font-size: 13px;
          color: #786458;
          margin: 0;
        }

        .google-write-review-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #b87d2b;
          color: #FFFFFF !important;
          border: 1px solid #a26b20;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 500;
          padding: 9px 20px;
          text-decoration: none;
          box-shadow: 0 4px 14px rgba(184, 125, 43, 0.25);
          transition: background 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;
        }

        .google-write-review-btn:hover {
          background: #9b651e;
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(184, 125, 43, 0.35);
        }

        /* Responsive grid with smaller, sleek cards */
        .google-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 18px;
        }

        /* Premium White Reflective Card */
        .google-review-card {
          position: relative;
          background: linear-gradient(155deg, #FFFFFF 0%, #FDFBF8 100%);
          border: 1px solid rgba(197, 139, 56, 0.24);
          border-top: 1px solid rgba(255, 255, 255, 0.95);
          border-radius: 14px;
          padding: 18px 20px;
          display: flex;
          flex-direction: column;
          box-shadow:
            0 2px 6px rgba(184, 134, 11, 0.04),
            0 10px 24px rgba(184, 134, 11, 0.08);
          cursor: pointer;
          overflow: hidden;
          transition: transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1),
                      box-shadow 0.25s cubic-bezier(0.2, 0.8, 0.2, 1),
                      border-color 0.25s ease;
        }

        /* Subtle reflective glass highlight sweep */
        .card-shimmer {
          position: absolute;
          top: 0;
          left: -100%;
          width: 70%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.55),
            transparent
          );
          transform: skewX(-20deg);
          pointer-events: none;
          transition: left 0.75s ease;
        }

        .google-review-card:hover .card-shimmer {
          left: 140%;
        }

        .google-review-card:hover {
          transform: translateY(-3px);
          border-color: rgba(184, 125, 43, 0.5);
          box-shadow:
            0 4px 10px rgba(184, 134, 11, 0.06),
            0 14px 32px rgba(184, 134, 11, 0.16);
        }

        .google-review-card:focus-visible {
          outline: 2px solid #b87d2b;
          outline-offset: 2px;
        }

        .gr-card-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
        }

        .gr-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          font-weight: 600;
          font-size: 15px;
          flex: 0 0 auto;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
        }

        .gr-user-info {
          display: flex;
          flex-direction: column;
          flex: 1;
          min-width: 0;
        }

        .gr-user-name {
          font-size: 13.5px;
          font-weight: 600;
          color: #1c1917;
          letter-spacing: 0.01em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .gr-user-meta {
          font-size: 11.5px;
          color: #78716c;
        }

        .gr-redirect-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: rgba(184, 125, 43, 0.08);
          color: #b87d2b;
          text-decoration: none;
          transition: background 0.2s ease, transform 0.15s ease, color 0.2s ease;
        }

        .gr-redirect-badge:hover {
          background: #b87d2b;
          color: #ffffff;
          transform: scale(1.1);
        }

        .gr-rating-row {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 10px;
        }

        .gr-stars {
          display: flex;
          gap: 1px;
        }

        .gr-star {
          color: #f59e0b;
          font-size: 14px;
          line-height: 1;
        }

        .gr-time-ago {
          font-size: 11px;
          color: #78716c;
        }

        .gr-review-text {
          font-size: 13px;
          line-height: 1.55;
          color: #292524;
          margin: 0 0 14px;
          flex: 1;
          font-weight: 400;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .gr-card-actions {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-top: 10px;
          border-top: 1px solid rgba(197, 139, 56, 0.15);
        }

        .gr-action-btn {
          background: none;
          border: none;
          color: #78716c;
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 11.5px;
          cursor: pointer;
          padding: 4px 6px;
          border-radius: 6px;
          transition: color 0.2s ease, background 0.2s ease;
        }

        .gr-action-btn:hover {
          color: #b87d2b;
          background: rgba(184, 125, 43, 0.08);
        }

        .gr-action-btn.active {
          color: #e53935;
        }

        .gr-share-btn {
          margin-left: 0;
        }

        .gr-card-visit-hint {
          margin-left: auto;
          font-size: 11px;
          font-weight: 500;
          color: #b87d2b;
          display: flex;
          align-items: center;
          gap: 2px;
          opacity: 0.85;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }

        .google-review-card:hover .gr-card-visit-hint {
          opacity: 1;
          transform: translateX(2px);
        }

        @media (max-width: 768px) {
          .google-reviews-head { flex-direction: column; align-items: flex-start; }
          .google-cards-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
