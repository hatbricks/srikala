import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BRAND from '../config/brand';

export default function ComingSoon({ onPreview }) {
  const [copied, setCopied] = useState(false);

  function copyPhone() {
    if (navigator.clipboard) {
      navigator.clipboard.writeText('+91 83175 51337');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div className="coming-soon-wrapper">
      {/* Background motif ornamentation */}
      <div className="cs-bg-art" aria-hidden="true">
        <div className="cs-glow-a" />
        <div className="cs-glow-b" />
        <div className="cs-motif-pattern" />
      </div>

      <div className="cs-container">
        {/* Top Header */}
        <header className="cs-header">
          <Link to="/" className="cs-logo-link">
            <img
              src={BRAND.assets.logoHorizontal || BRAND.assets.logoLight}
              alt={BRAND.name}
              className="cs-logo-img"
              width="240"
              height="52"
            />
          </Link>
          <a
            href="https://wa.me/918317551337?text=Hello%20Ravichandra%20Textiles,%20I%20would%20like%20to%20inquire%20about%20your%20saree%20collections."
            target="_blank"
            rel="noopener noreferrer"
            className="cs-header-wa-btn"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z"/>
            </svg>
            <span>WhatsApp Us</span>
          </a>
        </header>

        {/* Hero Card */}
        <main className="cs-main-card">
          <div className="cs-pill-badge">
            <span className="cs-sparkle">✦</span>
            <span>HANDWOVEN HERITAGE IN THE MAKING</span>
            <span className="cs-sparkle">✦</span>
          </div>

          <h1 className="cs-title">
            Our Grand Online Boutique <br className="cs-br-desktop" />
            <span className="cs-title-accent">Is Coming Soon</span>
          </h1>

          <p className="cs-description">
            We are currently cataloging our exclusive Dharmavaram handloom pure silk sarees,
            sacred temple border weaves, and royal bridal pattu collections.
            Our online store will be fully live for orders in a few days.
          </p>

          {/* Quick Pillars */}
          <div className="cs-pillars-row">
            <div className="cs-pillar-item">
              <span className="cs-pillar-icon">🏛️</span>
              <span className="cs-pillar-text">Direct from Dharmavaram Looms</span>
            </div>
            <div className="cs-pillar-item">
              <span className="cs-pillar-icon">🪡</span>
              <span className="cs-pillar-text">100% Pure Certified Mulberry Silk</span>
            </div>
            <div className="cs-pillar-item">
              <span className="cs-pillar-icon">✨</span>
              <span className="cs-pillar-text">Authentic Gold Zari Craftsmanship</span>
            </div>
          </div>

          {/* Contact Action Cards */}
          <div className="cs-actions-grid">
            <div className="cs-action-card cs-card-wa">
              <div className="cs-card-icon-wrap wa-icon-wrap">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z"/>
                </svg>
              </div>
              <div className="cs-card-body">
                <h3>Order via WhatsApp Shopping</h3>
                <p>Can&apos;t wait? Browse sarees via WhatsApp and order directly with free shipping.</p>
                <a
                  href="https://wa.me/918317551337?text=Hello%20Ravichandra%20Textiles,%20I%20would%20like%20to%20view%20sarees%20via%20WhatsApp."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cs-btn cs-btn-wa"
                >
                  Chat with Us (+91 83175 51337) →
                </a>
              </div>
            </div>

            <div className="cs-action-card cs-card-store">
              <div className="cs-card-icon-wrap store-icon-wrap">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div className="cs-card-body">
                <h3>Visit Our Physical Flagship Store</h3>
                <p>10-28, Kpt street, near Punjab National Bank, Dharmavaram, Andhra Pradesh - 515671</p>
                <div className="cs-store-timing">
                  <span>⏰ Open Daily: 10:00 AM – 10:00 PM</span>
                  <button type="button" onClick={copyPhone} className="cs-copy-phone-btn">
                    {copied ? '✓ Number Copied' : '📞 Call +91 83175 51337'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="cs-footer">
          <p className="cs-footer-copy">
            © {new Date().getFullYear()} Ravichandra Textiles. Handwoven in Dharmavaram.
          </p>
        </footer>
      </div>

      <style>{`
        .coming-soon-wrapper {
          position: fixed;
          inset: 0;
          z-index: 99999;
          background: #FAF6F0;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          font-family: var(--font-body, system-ui, -apple-system, sans-serif);
          color: #220D0A;
        }

        .cs-bg-art {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          z-index: 0;
        }

        .cs-glow-a {
          position: absolute;
          top: -150px;
          right: -100px;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(184, 125, 43, 0.16) 0%, transparent 70%);
        }

        .cs-glow-b {
          position: absolute;
          bottom: -150px;
          left: -100px;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(88, 30, 21, 0.12) 0%, transparent 70%);
        }

        .cs-motif-pattern {
          position: absolute;
          inset: 0;
          background-image: url('/images/motif-bg.svg');
          background-size: 320px;
          opacity: 0.045;
        }

        .cs-container {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 980px;
          margin: 0 auto;
          padding: 24px 20px 32px;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .cs-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 24px;
        }

        .cs-logo-img {
          height: 44px;
          width: auto;
          object-fit: contain;
          filter: drop-shadow(0 2px 4px rgba(44, 24, 16, 0.1));
        }

        .cs-header-wa-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #25D366;
          color: #FFFFFF !important;
          padding: 7px 16px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
          box-shadow: 0 4px 12px rgba(37, 211, 102, 0.25);
          transition: transform 0.15s ease, background 0.15s ease;
        }

        .cs-header-wa-btn:hover {
          transform: translateY(-1px);
          background: #1ebc57;
        }

        .cs-main-card {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin: auto 0;
          padding: 36px 20px;
        }

        .cs-pill-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #FFFFFF;
          border: 1px solid rgba(184, 125, 43, 0.35);
          color: #8c5d1e;
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 6px 16px;
          border-radius: 999px;
          box-shadow: 0 4px 14px rgba(184, 125, 43, 0.1);
          margin-bottom: 22px;
        }

        .cs-sparkle {
          color: #b87d2b;
          font-size: 10px;
        }

        .cs-title {
          font-family: var(--font-display, 'Playfair Display', Georgia, serif);
          font-size: clamp(32px, 5.5vw, 54px);
          line-height: 1.15;
          font-weight: 700;
          color: #2c1810;
          margin: 0 0 16px;
          letter-spacing: -0.01em;
        }

        .cs-title-accent {
          color: #581e15;
          font-style: italic;
          font-weight: 600;
          position: relative;
        }

        .cs-description {
          max-width: 680px;
          font-size: clamp(14.5px, 2.1vw, 17px);
          line-height: 1.65;
          color: #6a5348;
          margin: 0 auto 28px;
        }

        .cs-pillars-row {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 34px;
        }

        .cs-pillar-item {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #FFFFFF;
          border: 1px solid rgba(184, 125, 43, 0.22);
          border-radius: 999px;
          padding: 6px 14px;
          font-size: 12.5px;
          font-weight: 500;
          color: #422a20;
          box-shadow: 0 2px 8px rgba(44, 24, 16, 0.04);
        }

        .cs-actions-grid {
          width: 100%;
          max-width: 860px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(310px, 1fr));
          gap: 20px;
          text-align: left;
        }

        .cs-action-card {
          background: #FFFFFF;
          border: 1px solid rgba(184, 125, 43, 0.25);
          border-radius: 20px;
          padding: 24px;
          box-shadow: 0 8px 24px rgba(44, 24, 16, 0.06);
          display: flex;
          gap: 16px;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .cs-action-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(44, 24, 16, 0.1);
        }

        .cs-card-icon-wrap {
          flex-shrink: 0;
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .wa-icon-wrap {
          background: rgba(37, 211, 102, 0.14);
          color: #25D366;
        }

        .store-icon-wrap {
          background: rgba(88, 30, 21, 0.1);
          color: #581e15;
        }

        .cs-card-body h3 {
          font-size: 16px;
          font-weight: 600;
          color: #2c1810;
          margin: 0 0 6px;
        }

        .cs-card-body p {
          font-size: 13px;
          color: #6e594d;
          line-height: 1.5;
          margin: 0 0 14px;
        }

        .cs-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 9px 18px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.15s ease;
        }

        .cs-btn-wa {
          background: #581e15;
          color: #FFFFFF !important;
          box-shadow: 0 4px 14px rgba(88, 30, 21, 0.25);
        }

        .cs-btn-wa:hover {
          background: #41140d;
        }

        .cs-store-timing {
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 12px;
          color: #7d685c;
        }

        .cs-copy-phone-btn {
          background: none;
          border: 1px solid rgba(184, 125, 43, 0.35);
          color: #8c5d1e;
          font-size: 12px;
          font-weight: 600;
          padding: 5px 12px;
          border-radius: 999px;
          cursor: pointer;
          align-self: flex-start;
          transition: background 0.15s ease;
        }

        .cs-copy-phone-btn:hover {
          background: rgba(184, 125, 43, 0.1);
        }

        .cs-footer {
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding-top: 24px;
          border-top: 1px solid rgba(184, 125, 43, 0.2);
        }

        .cs-footer-copy {
          font-size: 12.5px;
          color: #8c7365;
          margin: 0;
        }

        @media (max-width: 768px) {
          .cs-container {
            padding: max(16px, env(safe-area-inset-top)) 16px max(24px, env(safe-area-inset-bottom));
          }
          .cs-header {
            padding-bottom: 18px;
            gap: 12px;
          }
          .cs-logo-img {
            height: 38px;
            max-width: 190px;
          }
          .cs-header-wa-btn {
            padding: 6px 13px;
            font-size: 12px;
          }
          .cs-main-card {
            padding: 24px 8px;
          }
          .cs-br-desktop {
            display: none;
          }
          .cs-title {
            font-size: clamp(26px, 7vw, 38px);
            margin-bottom: 14px;
          }
          .cs-description {
            font-size: 14.5px;
            line-height: 1.6;
            margin-bottom: 24px;
          }
          .cs-pillars-row {
            gap: 8px;
            margin-bottom: 26px;
          }
          .cs-pillar-item {
            font-size: 12px;
            padding: 5px 11px;
          }
          .cs-actions-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .cs-action-card {
            padding: 18px 16px;
            border-radius: 18px;
          }
        }

        @media (max-width: 480px) {
          .cs-container {
            padding: max(12px, env(safe-area-inset-top)) 12px max(20px, env(safe-area-inset-bottom));
          }
          .cs-header {
            padding-bottom: 14px;
          }
          .cs-logo-img {
            height: 32px;
            max-width: 160px;
          }
          .cs-header-wa-btn {
            padding: 5px 10px;
            font-size: 11px;
            gap: 4px;
          }
          .cs-header-wa-btn svg {
            width: 14px;
            height: 14px;
          }
          .cs-main-card {
            padding: 16px 2px;
          }
          .cs-pill-badge {
            font-size: 10px;
            padding: 5px 12px;
            letter-spacing: 0.08em;
            margin-bottom: 16px;
          }
          .cs-title {
            font-size: 25px;
            line-height: 1.22;
          }
          .cs-description {
            font-size: 13.5px;
            line-height: 1.55;
            margin-bottom: 20px;
          }
          .cs-pillar-item {
            font-size: 11px;
            padding: 4px 9px;
            gap: 4px;
          }
          .cs-action-card {
            flex-direction: column;
            gap: 12px;
            padding: 16px 14px;
            border-radius: 16px;
          }
          .cs-card-icon-wrap {
            width: 38px;
            height: 38px;
            border-radius: 10px;
          }
          .cs-card-body h3 {
            font-size: 15px;
          }
          .cs-card-body p {
            font-size: 12.5px;
            margin-bottom: 12px;
          }
          .cs-btn-wa {
            width: 100%;
            justify-content: center;
            text-align: center;
            padding: 10px 14px;
            font-size: 13px;
          }
          .cs-copy-phone-btn {
            width: 100%;
            justify-content: center;
            text-align: center;
            padding: 9px 12px;
            font-size: 12px;
          }
          .cs-footer {
            padding-top: 18px;
          }
          .cs-footer-copy {
            font-size: 11px;
          }
        }

        @media (max-width: 360px) {
          .cs-logo-img {
            height: 28px;
            max-width: 135px;
          }
          .cs-title {
            font-size: 22px;
          }
          .cs-pill-badge {
            font-size: 9px;
            padding: 4px 10px;
          }
        }
      `}</style>
    </div>
  );
}
