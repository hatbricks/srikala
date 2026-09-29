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

  function handleHeartClick(id) {
    setReactions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }

  function handleShare(id, url) {
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

  return (
    <section className="google-reviews-section">
      <div className="container">
        {/* Header with Google Badge */}
        <div className="google-reviews-head">
          <div className="google-badge-brand">
            <svg viewBox="0 0 24 24" width="28" height="28" className="google-icon">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
              <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
            </svg>
            <div className="google-rating-info">
              <span className="google-title">Google Reviews</span>
              <div className="google-stars-row">
                <span className="google-score">{data.averageRating || '4.9'}</span>
                <span className="google-gold-stars">★★★★★</span>
                <span className="google-count">({data.totalReviews || '150+'})</span>
              </div>
            </div>
          </div>

          <div className="google-head-titles">
            <h2 className="section-title">{data.heading}</h2>
            <p className="section-subtitle">{data.subheading}</p>
          </div>

          <a
            href={data.googleBusinessUrl || 'https://share.google/rLeQl6DO3cPtU5rql'}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline google-write-review-btn"
          >
            Review us on Google →
          </a>
        </div>

        {/* Cards Grid — matching exact Google dark theme card in user screenshot */}
        <div className="google-cards-grid">
          {data.reviews.map((r) => {
            const hasHearted = reactions[r.id];
            return (
              <div className="google-review-card" key={r.id}>
                {/* User Info Bar */}
                <div className="gr-card-header">
                  <div
                    className="gr-avatar"
                    style={{ backgroundColor: r.avatarColor || '#E65100' }}
                  >
                    {r.avatarInitial || r.name?.charAt(0) || 'U'}
                  </div>
                  <div className="gr-user-info">
                    <span className="gr-user-name">{r.name}</span>
                    <span className="gr-user-meta">{r.userBadge || '1 review'}</span>
                  </div>
                  <button type="button" className="gr-more-btn" aria-label="Review options">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                    </svg>
                  </button>
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

                {/* Bottom Action Bar: Heart reaction + Share */}
                <div className="gr-card-actions">
                  <button
                    type="button"
                    className={`gr-action-btn ${hasHearted ? 'active' : ''}`}
                    onClick={() => handleHeartClick(r.id)}
                    title="Hover to react"
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" fill={hasHearted ? '#e53935' : 'none'} stroke={hasHearted ? '#e53935' : 'currentColor'} strokeWidth="2">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                    <span>{hasHearted ? (r.likesCount || 1) + 1 : 'Hover to react'}</span>
                  </button>

                  <button
                    type="button"
                    className="gr-action-btn gr-share-btn"
                    onClick={() => handleShare(r.id, r.reviewUrl)}
                    title="Share this review"
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{copiedId === r.id ? 'Copied link!' : ''}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .google-reviews-section {
          padding: 72px 0 80px;
          background: #18191c;
          color: #e8eaed;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .google-reviews-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          margin-bottom: 36px;
          flex-wrap: wrap;
        }

        .google-badge-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #202124;
          padding: 10px 18px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .google-rating-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .google-title {
          font-size: 13.5px;
          font-weight: 600;
          color: #fff;
          letter-spacing: 0.02em;
        }

        .google-stars-row {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: #9aa0a6;
        }

        .google-score {
          font-weight: 700;
          color: #fff;
        }

        .google-gold-stars {
          color: #fbbc04;
          letter-spacing: 1px;
        }

        .google-head-titles {
          flex: 1;
          min-width: 260px;
        }

        .google-head-titles .section-title {
          font-family: var(--font-display, 'Playfair Display', serif);
          font-size: 26px;
          color: #fffaf4;
          margin: 0 0 6px;
        }

        .google-head-titles .section-subtitle {
          font-size: 13.5px;
          color: #9aa0a6;
          margin: 0;
        }

        .google-write-review-btn {
          border-color: rgba(255, 255, 255, 0.25);
          color: #f5f5f5;
          font-size: 12.5px;
          padding: 10px 20px;
        }

        .google-write-review-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
          border-color: #fbbc04;
        }

        /* 3-column responsive grid matching exact Google cards */
        .google-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 20px;
        }

        .google-review-card {
          background: #202124;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 22px 24px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
          transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
        }

        .google-review-card:hover {
          transform: translateY(-3px);
          border-color: rgba(251, 188, 4, 0.35);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.5);
        }

        .gr-card-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }

        .gr-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-weight: 600;
          font-size: 17px;
          flex: 0 0 auto;
        }

        .gr-user-info {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .gr-user-name {
          font-size: 14.5px;
          font-weight: 500;
          color: #e8eaed;
          letter-spacing: 0.01em;
        }

        .gr-user-meta {
          font-size: 12px;
          color: #9aa0a6;
        }

        .gr-more-btn {
          background: none;
          border: none;
          color: #9aa0a6;
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }

        .gr-more-btn:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.08);
        }

        .gr-rating-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 14px;
        }

        .gr-stars {
          display: flex;
          gap: 2px;
        }

        .gr-star {
          color: #fbbc04;
          font-size: 16px;
          line-height: 1;
        }

        .gr-time-ago {
          font-size: 12px;
          color: #9aa0a6;
        }

        .gr-review-text {
          font-size: 14px;
          line-height: 1.6;
          color: #e8eaed;
          margin: 0 0 20px;
          flex: 1;
          font-weight: 400;
        }

        .gr-card-actions {
          display: flex;
          align-items: center;
          gap: 16px;
          padding-top: 14px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        .gr-action-btn {
          background: none;
          border: none;
          color: #9aa0a6;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12.5px;
          cursor: pointer;
          padding: 6px 8px;
          border-radius: 6px;
          transition: color 0.2s ease, background 0.2s ease;
        }

        .gr-action-btn:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.06);
        }

        .gr-action-btn.active {
          color: #e53935;
        }

        .gr-share-btn {
          margin-left: auto;
        }

        @media (max-width: 768px) {
          .google-reviews-head { flex-direction: column; align-items: flex-start; }
          .google-cards-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
