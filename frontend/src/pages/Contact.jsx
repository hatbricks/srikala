import { useState } from 'react';
import RecommendedProducts from '../components/RecommendedProducts';
import Seo from '../components/Seo';
import BRAND from '../config/brand';

export default function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  const cleanPhone = BRAND.contact.phone.replace(/[^\d+]/g, '');
  const cleanWa = BRAND.contact.whatsapp.replace(/[^\d]/g, '');

  return (
    <div className="contact-page">
      <Seo
        title="Contact Us"
        path="/contact"
        description={`Get in touch with ${BRAND.name} Silk Emporium for order queries, bridal consultation, or custom saree requests.`}
      />
      <div className="container contact-grid">
        <div className="contact-info">
          <p className="eyebrow" style={{ color: 'var(--brand-secondary)' }}>Get in touch</p>
          <h1>Contact Us</h1>
          <p className="contact-lead">
            Questions about a saree, a bridal consultation, or a custom order — reach out directly
            or drop a note and our curation team will assist you shortly.
          </p>

          <dl className="info-list">
            <div>
              <dt>Phone</dt>
              <dd><a href={`tel:${cleanPhone}`}>{BRAND.contact.phone}</a></dd>
            </div>
            <div>
              <dt>WhatsApp</dt>
              <dd>
                <a href={`https://wa.me/${cleanWa}`} target="_blank" rel="noreferrer" className="whatsapp-link">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.7-1.2A9 9 0 1 0 12 3z" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M8.5 8.7c.2-.5.4-.5.6-.5h.5c.2 0 .4 0 .6.4.2.5.7 1.6.7 1.7.1.1.1.3 0 .4-.1.2-.2.3-.3.4l-.4.5c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.6-.7c.2-.2.4-.2.6-.1l1.5.7c.2.1.4.2.4.4.1.5-.1 1.4-.6 1.8-.6.5-1.6.8-2.6.5-1.8-.5-3.7-1.6-5.1-3.1-1.3-1.3-2.1-2.7-2.4-3.4-.3-.7-.4-1.7.2-2.4z" fill="currentColor" />
                  </svg>
                  {BRAND.contact.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd><a href={`mailto:${BRAND.contact.email}`}>{BRAND.contact.email}</a></dd>
            </div>
            <div>
              <dt>Store Location</dt>
              <dd>
                {BRAND.contact.address}
                <br />
                <a href={`https://maps.google.com/?q=${encodeURIComponent(BRAND.contact.address)}`} target="_blank" rel="noreferrer" className="directions-link">Get Directions →</a>
              </dd>
            </div>
            <div>
              <dt>Store Hours</dt>
              <dd>{BRAND.contact.hoursWeekday} &middot; {BRAND.contact.hoursSunday}</dd>
            </div>
            {BRAND.contact.instagram && (
              <div>
                <dt>Instagram</dt>
                <dd><a href={BRAND.contact.instagram} target="_blank" rel="noreferrer">@srikalasilks</a></dd>
              </div>
            )}
          </dl>

          <div className="map-embed">
            <iframe
              title="Sri Kala store location"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(BRAND.contact.address)}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          {sent ? (
            <div className="form-sent">
              <h3>Message received</h3>
              <p>Thank you — someone from Sri Kala will get back to you shortly.</p>
            </div>
          ) : (
            <>
              <label>
                Name
                <input type="text" name="name" required placeholder="Your name" />
              </label>
              <label>
                Phone or Email
                <input type="text" name="contact" required placeholder="How should we reach you?" />
              </label>
              <label>
                Message
                <textarea name="message" rows="5" required placeholder="Tell us about the sarees or consultation you need" />
              </label>
              <button type="submit" className="btn btn-primary">Send Message</button>
            </>
          )}
        </form>
      </div>

      <RecommendedProducts />

      <style>{`
        .contact-page { padding: 70px 0 0; }
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 70px;
          margin-bottom: 60px;
        }
        .contact-page h1 {
          font-family: var(--font-display);
          font-size: 38px;
          color: var(--brand-primary);
          margin: 8px 0 18px;
        }
        .contact-lead {
          font-size: 14.5px;
          line-height: 1.8;
          color: var(--ink-600);
          max-width: 440px;
          margin-bottom: 34px;
        }
        .info-list { display: flex; flex-direction: column; gap: 18px; }
        .info-list dt {
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--brand-secondary);
          margin-bottom: 4px;
          font-weight: 600;
        }
        .info-list dd { margin: 0; font-size: 14.5px; color: var(--ink-900); line-height: 1.6; }
        .whatsapp-link { display: inline-flex; align-items: center; gap: 8px; }
        .whatsapp-link svg { width: 17px; height: 17px; color: #25D366; flex: 0 0 auto; }
        .directions-link { font-size: 12.5px; color: var(--brand-secondary); font-weight: 500; }
        .directions-link:hover { text-decoration: underline; }

        .map-embed {
          margin-top: 28px;
          border-radius: var(--radius-md);
          overflow: hidden;
          aspect-ratio: 16 / 10;
          border: 1px solid var(--brand-border);
          box-shadow: 0 8px 24px rgba(32, 8, 11, 0.05);
        }
        .map-embed iframe { width: 100%; height: 100%; border: 0; }

        .contact-form {
          background: #fbf7f2;
          border: 1px solid rgba(197, 139, 56, 0.2);
          border-radius: var(--radius-md);
          padding: 40px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          box-shadow: 0 10px 30px rgba(32, 8, 11, 0.04);
        }
        .contact-form label {
          font-size: 13px;
          color: var(--brand-primary);
          font-weight: 500;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .contact-form input, .contact-form textarea {
          font-family: var(--font-body);
          font-size: 14px;
          padding: 13px 15px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--brand-border);
          background: var(--paper);
          color: var(--ink-900);
          resize: vertical;
          outline: none;
          transition: border-color 0.2s ease;
        }
        .contact-form input:focus, .contact-form textarea:focus {
          border-color: var(--brand-secondary);
        }
        .contact-form .btn { margin-top: 8px; align-self: flex-start; }
        .form-sent { text-align: center; padding: 40px 10px; }
        .form-sent h3 {
          font-family: var(--font-display);
          font-size: 22px;
          color: var(--brand-primary);
          margin-bottom: 10px;
        }
        .form-sent p { font-size: 14px; color: var(--ink-600); }
        @media (max-width: 860px) {
          .contact-grid { grid-template-columns: 1fr; gap: 40px; }
          .contact-form { padding: 26px 20px; }
        }
      `}</style>
    </div>
  );
}
