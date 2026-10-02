import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../data/api';
import BRAND from '../config/brand';

const defaultSocial = {
  whatsapp: BRAND.contact.whatsapp,
  facebook: BRAND.contact.facebook,
  twitter: BRAND.contact.twitter,
  instagram: BRAND.contact.instagram,
};

function whatsappUrl(number) {
  const digits = (number || '').replace(/[^\d]/g, '');
  return digits ? `https://wa.me/${digits}` : '';
}

export default function Footer() {
  const [social, setSocial] = useState(defaultSocial);

  useEffect(() => {
    api
      .getHomeSection('social_links')
      .then(({ section }) => {
        if (section?.content) setSocial({ ...defaultSocial, ...section.content });
      })
      .catch(() => {});
  }, []);

  const wa = whatsappUrl(social.whatsapp || BRAND.contact.whatsapp);

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        {/* Brand Column */}
        <div className="footer-brand">
          <Link to="/" className="footer-logo-link">
            <img src={BRAND.assets.logoHorizontal || BRAND.assets.logoLight} alt={BRAND.name} className="footer-logo" width="210" height="46" />
          </Link>
          <p className="footer-desc">
            {BRAND.description}
          </p>

          <div className="social-links">
            {social.instagram && (
              <a href={social.instagram} target="_blank" rel="noreferrer" aria-label={`${BRAND.name} on Instagram`} className="social-link">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
                  <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
                  <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" />
                </svg>
              </a>
            )}
            {wa && (
              <a href={wa} target="_blank" rel="noreferrer" aria-label={`Chat with ${BRAND.name} on WhatsApp`} className="social-link">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.7-1.2A9 9 0 1 0 12 3z" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M8.5 8.7c.2-.5.4-.5.6-.5h.5c.2 0 .4 0 .6.4.2.5.7 1.6.7 1.7.1.1.1.3 0 .4-.1.2-.2.3-.3.4l-.4.5c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.6-.7c.2-.2.4-.2.6-.1l1.5.7c.2.1.4.2.4.4.1.5-.1 1.4-.6 1.8-.6.5-1.6.8-2.6.5-1.8-.5-3.7-1.6-5.1-3.1-1.3-1.3-2.1-2.7-2.4-3.4-.3-.7-.4-1.7.2-2.4z" fill="currentColor" />
                </svg>
              </a>
            )}
            {social.facebook && (
              <a href={social.facebook} target="_blank" rel="noreferrer" aria-label={`${BRAND.name} on Facebook`} className="social-link">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M15.5 8.5h-2a1 1 0 0 0-1 1V12h3l-.4 3h-2.6v7h-3v-7H8v-3h2.5V9.2c0-2.3 1.4-3.7 3.6-3.7h1.9v3z" fill="currentColor" />
                </svg>
              </a>
            )}
            {social.twitter && (
              <a href={social.twitter} target="_blank" rel="noreferrer" aria-label={`${BRAND.name} on Twitter / X`} className="social-link">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 4l7.2 9.4L4.4 20H6l6-6.4 4.5 6.4H20l-7.5-9.9L19 4h-1.6l-5.5 5.9L8 4H4z" fill="currentColor" />
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Shop Column */}
        <div className="footer-col">
          <h4>Shop</h4>
          <Link to="/products">All Sarees</Link>
          <Link to="/products?sort=newest">New Arrivals</Link>
          <Link to="/#collections">Collections</Link>
          <Link to="/about">Heritage &amp; Craft</Link>
        </div>

        {/* Customer Care & Policies Column */}
        <div className="footer-col">
          <h4>Customer Care</h4>
          <Link to="/orders">Orders &amp; Tracking</Link>
          <Link to="/user-guide">User &amp; Silk Guide</Link>
          <Link to="/returns-and-cancellation">Returns &amp; Cancellation</Link>
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/contact">Contact Us</Link>
        </div>

        {/* Store Concierge */}
        <div className="footer-col footer-col-wide">
          <h4>Contact &amp; Store</h4>
          <p className="contact-item">
            <span className="contact-label">Phone:</span>
            <a href={`tel:${BRAND.contact.phone.replace(/\s+/g, '')}`}>{BRAND.contact.phone}</a>
          </p>
          <p className="contact-item">
            <span className="contact-label">Email:</span>
            <a href={`mailto:${BRAND.contact.email}`}>{BRAND.contact.email}</a>
          </p>
          <p className="contact-item addr">
            {BRAND.contact.address}
          </p>
        </div>
      </div>

      <div className="container footer-bottom">
        <div className="footer-bottom-copy">
          <span>&copy; {new Date().getFullYear()} {BRAND.legalName}. All rights reserved.</span>
          <a
            href="https://hatbricks.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-powered-by"
            aria-label="Powered by Hatbricks"
          >
            <span>Powered by</span>
            <img src="/images/hatbricks-logo.png" alt="Hatbricks" className="powered-by-brand-img" height="18" />
          </a>
        </div>
        <div className="footer-bottom-links">
          <Link to="/privacy-policy">Privacy Policy</Link>
          <span className="dot">•</span>
          <Link to="/returns-and-cancellation">Returns &amp; Cancellation</Link>
          <span className="dot">•</span>
          <Link to="/user-guide">User Guide</Link>
        </div>
      </div>

      <style>{`
        .site-footer {
          background: var(--maroon-950);
          color: var(--blush-300);
          padding-top: 72px;
          border-top: 1px solid rgba(197, 139, 56, 0.2);
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1.6fr;
          gap: 44px;
          padding-bottom: 52px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .footer-brand .footer-logo {
          height: 46px;
          max-width: 230px;
          width: auto;
          display: block;
          object-fit: contain;
        }
        .footer-brand .footer-desc {
          font-size: 13.5px;
          line-height: 1.75;
          color: var(--blush-300);
          opacity: 0.85;
          max-width: 290px;
          margin: 18px 0 20px;
        }
        .social-links { display: flex; gap: 10px; }
        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid rgba(197, 139, 56, 0.35);
          color: var(--brand-gold-light);
          transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
        }
        .social-link svg { width: 16px; height: 16px; }
        .social-link:hover {
          background: rgba(197, 139, 56, 0.2);
          border-color: var(--brand-gold-light);
          transform: translateY(-2px);
        }
        .footer-col h4 {
          font-family: var(--font-body);
          color: var(--brand-gold-light);
          font-size: 12px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-weight: 600;
          margin-bottom: 20px;
        }
        .footer-col a, .footer-col p {
          display: block;
          font-size: 13.5px;
          color: var(--blush-300);
          opacity: 0.85;
          margin-bottom: 12px;
          line-height: 1.6;
          transition: opacity 0.2s ease, color 0.2s ease;
        }
        .footer-col a:hover { opacity: 1; color: var(--brand-gold-light); }
        .contact-item { margin-bottom: 8px; }
        .contact-label { color: var(--brand-gold-light); font-weight: 500; margin-right: 6px; }
        .addr { font-size: 13px; line-height: 1.5; opacity: 0.75; }

        .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 32px;
          font-size: 12.5px;
          color: var(--blush-300);
          opacity: 0.9;
        }
        .footer-bottom-copy {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
        }
        .footer-powered-by {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #f5ecd7;
          text-decoration: none;
          font-weight: 500;
          font-size: 12px;
          padding: 5px 13px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(197, 139, 56, 0.28);
          transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
        }
        .footer-powered-by:hover {
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(223, 177, 91, 0.6);
          color: #ffffff;
          transform: translateY(-1px);
        }
        .powered-by-brand-img {
          height: 19px;
          width: auto;
          max-width: 105px;
          object-fit: contain;
          display: inline-block;
          vertical-align: middle;
        }
        .footer-bottom-links {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }
        .footer-bottom-links a {
          color: var(--blush-300);
          text-decoration: none;
          opacity: 0.85;
          font-size: 12px;
          transition: opacity 0.2s ease, color 0.2s ease;
        }
        .footer-bottom-links a:hover {
          opacity: 1;
          color: var(--brand-gold-light);
          text-decoration: underline;
        }
        .footer-bottom-links .dot {
          opacity: 0.35;
          font-size: 9px;
        }
        @media (max-width: 980px) {
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 36px; }
        }
        @media (max-width: 580px) {
          .footer-grid { grid-template-columns: 1fr; gap: 32px; }
          .footer-bottom { flex-direction: column; gap: 10px; text-align: center; }
          .footer-bottom-copy { justify-content: center; }
        }
      `}</style>
    </footer>
  );
}
