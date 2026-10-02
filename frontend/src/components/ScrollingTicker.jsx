import { Link } from 'react-router-dom';
import { renderTickerSvg } from './TickerIcons';

export default function ScrollingTicker({ config }) {
  if (!config) return null;

  const items = config.items || [];
  if (!items.length) return null;

  const bgColor = config.bgColor || '#581e15';
  const textColor = config.textColor || '#ffffff';
  const speed = config.speed || 'normal';
  const pauseOnHover = config.pauseOnHover !== false;

  // Determine marquee duration based on speed setting
  const durationMap = {
    slow: '38s',
    normal: '24s',
    fast: '16s',
  };
  const duration = durationMap[speed] || '24s';

  // Render an individual ticker item
  const renderItem = (item, idx) => {
    const isExternal = item.link && (item.link.startsWith('http') || item.link.startsWith('wa.me') || item.link.startsWith('tel:'));
    const content = (
      <span className="ticker-item-inner">
        {item.icon && (
          <span className="ticker-item-icon" aria-hidden="true">
            {renderTickerSvg(item.icon, { width: 15, height: 15 })}
          </span>
        )}
        <span className="ticker-item-text">{item.text}</span>
        {item.link && (
          <span className="ticker-item-arrow" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        )}
      </span>
    );

    const wrappedItem = item.link ? (
      isExternal ? (
        <a
          key={`ticker-item-${idx}`}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="ticker-item ticker-link"
        >
          {content}
        </a>
      ) : (
        <Link
          key={`ticker-item-${idx}`}
          to={item.link}
          className="ticker-item ticker-link"
        >
          {content}
        </Link>
      )
    ) : (
      <div key={`ticker-item-${idx}`} className="ticker-item">
        {content}
      </div>
    );

    return (
      <span key={`ticker-seg-${idx}`} className="ticker-segment">
        {wrappedItem}
        <span className="ticker-sep-svg" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="9" height="9" fill="currentColor">
            <path d="M12 0L14.2 9.8L24 12L14.2 14.2L12 24L9.8 14.2L0 12L9.8 9.8z" />
          </svg>
        </span>
      </span>
    );
  };

  return (
    <div
      className={`scrolling-ticker-bar ${pauseOnHover ? 'pause-on-hover' : ''}`}
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
      role="region"
      aria-label="Announcements & Offers"
    >
      <div className="ticker-track" style={{ animationDuration: duration }}>
        {/* First track copy */}
        <div className="ticker-content" aria-hidden="false">
          {items.map((item, idx) => renderItem(item, `a-${idx}`))}
        </div>

        {/* Second track copy for continuous infinite loop */}
        <div className="ticker-content" aria-hidden="true">
          {items.map((item, idx) => renderItem(item, `b-${idx}`))}
        </div>

        {/* Third track copy to ensure wide screens are completely filled */}
        <div className="ticker-content" aria-hidden="true">
          {items.map((item, idx) => renderItem(item, `c-${idx}`))}
        </div>
      </div>

      <style>{`
        .scrolling-ticker-bar {
          position: relative;
          width: 100%;
          overflow: hidden;
          user-select: none;
          display: flex;
          align-items: center;
          height: 42px;
          border-top: 1px solid rgba(251, 223, 162, 0.22);
          border-bottom: 1px solid rgba(251, 223, 162, 0.22);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
          z-index: 10;
        }

        .ticker-track {
          display: flex;
          width: max-content;
          animation-name: marqueeScroll;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform;
        }

        .pause-on-hover:hover .ticker-track {
          animation-play-state: paused;
        }

        .ticker-content {
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }

        .ticker-segment {
          display: inline-flex;
          align-items: center;
        }

        .ticker-item {
          display: inline-flex;
          align-items: center;
          padding: 0 24px;
          font-size: 13.5px;
          font-weight: 500;
          letter-spacing: 0.02em;
          white-space: nowrap;
          color: inherit;
          text-decoration: none;
        }

        .ticker-sep-svg {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #fbdfa2;
          opacity: 0.65;
          flex-shrink: 0;
        }

        .ticker-item-inner {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          transition: transform 0.15s ease;
        }

        .ticker-link {
          cursor: pointer;
        }

        .ticker-link:hover .ticker-item-inner {
          transform: translateY(-1px);
        }

        .ticker-link:hover .ticker-item-arrow {
          transform: translateX(3px);
        }

        .ticker-item-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #fbdfa2;
          flex-shrink: 0;
        }

        .ticker-item-icon svg {
          display: block;
        }

        .ticker-item-text {
          line-height: 1.2;
        }

        .ticker-item-arrow {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          opacity: 0.85;
          color: #fbdfa2;
          transition: transform 0.15s ease;
        }

        @keyframes marqueeScroll {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-33.333333%, 0, 0);
          }
        }

        @media (max-width: 768px) {
          .scrolling-ticker-bar {
            height: 38px;
          }
          .ticker-item {
            padding: 0 20px;
            font-size: 12.5px;
          }
          .ticker-item-icon {
            font-size: 13.5px;
          }
        }
      `}</style>
    </div>
  );
}
