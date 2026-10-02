import { useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import BRAND from '../config/brand';

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState('intro');

  const lastUpdated = 'October 2026';
  const cleanPhone = BRAND.contact.phone.replace(/[^\d+]/g, '');
  const cleanWa = BRAND.contact.whatsapp.replace(/[^\d]/g, '');

  const sections = [
    { id: 'intro', title: '1. Introduction & Overview' },
    { id: 'information-collected', title: '2. Information We Collect' },
    { id: 'how-we-use', title: '3. How We Use Your Information' },
    { id: 'payment-security', title: '4. Payment Security & Processing' },
    { id: 'sharing-disclosure', title: '5. Logistics & Data Sharing' },
    { id: 'cookies-tracking', title: '6. Cookies & Tracking Technologies' },
    { id: 'data-retention', title: '7. Data Retention & Protection' },
    { id: 'user-rights', title: '8. Your Rights & Choices' },
    { id: 'contact-grievance', title: '9. Grievance Officer & Contact' },
  ];

  const scrollTo = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="policy-page">
      <Seo
        title="Privacy Policy"
        path="/privacy-policy"
        description={`Read the official Privacy Policy of ${BRAND.name}. Learn how we protect your personal information, handle secure payments via Razorpay, and safeguard your data.`}
      />

      {/* Hero Banner */}
      <section className="policy-hero">
        <div className="container policy-hero-inner">
          <nav className="policy-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="separator">/</span>
            <span>Legal</span>
            <span className="separator">/</span>
            <span className="current">Privacy Policy</span>
          </nav>
          <div className="policy-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span>Data Security &amp; Trust Assurance</span>
          </div>
          <h1 className="policy-title">Privacy Policy</h1>
          <p className="policy-subtitle">
            At {BRAND.name} ({BRAND.legalName}), we value your sacred trust and are committed to safeguarding the personal
            information you share with us while discovering authentic Dharmavaram handloom silk sarees.
          </p>
          <div className="policy-meta">
            <span>Last Updated: {lastUpdated}</span>
            <span className="dot">•</span>
            <span>Applicable to {BRAND.seo.siteUrl}</span>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="policy-body-section">
        <div className="container policy-grid">
          {/* Sticky Table of Contents */}
          <aside className="policy-sidebar">
            <div className="toc-box">
              <h3 className="toc-heading">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M4 6h16M4 12h16M4 18h7" />
                </svg>
                Table of Contents
              </h3>
              <ul className="toc-list">
                {sections.map((s) => (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => scrollTo(s.id)}
                      className={`toc-btn ${activeSection === s.id ? 'active' : ''}`}
                    >
                      {s.title}
                    </button>
                  </li>
                ))}
              </ul>

              <div className="toc-support-card">
                <h4>Have Privacy Concerns?</h4>
                <p>Our Data Officer is here to assist with any questions about your information.</p>
                <a href={`mailto:${BRAND.contact.email}`} className="support-link">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  {BRAND.contact.email}
                </a>
              </div>
            </div>
          </aside>

          {/* Detailed Content */}
          <article className="policy-content">
            {/* Section 1 */}
            <div id="intro" className="policy-card">
              <h2>1. Introduction &amp; Commitment to Privacy</h2>
              <p>
                This Privacy Policy describes the policies and procedures of <strong>{BRAND.legalName}</strong> (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) regarding the collection, use, protection, and disclosure of your personal data when you visit our website <strong>{BRAND.seo.siteUrl}</strong> or make a purchase from our pure silk handloom emporium based in Dharmavaram, Andhra Pradesh.
              </p>
              <p>
                By accessing our online store, creating an account, or placing an order, you agree to the collection and use of information in accordance with this Privacy Policy and Indian Information Technology laws (including the Information Technology Act, 2000 and the Digital Personal Data Protection Act, 2023).
              </p>
              <div className="highlight-banner">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
                <div>
                  <strong>Our Privacy Promise:</strong> We never sell, rent, trade, or distribute your personal contact information to third-party telemarketers or external advertising networks.
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div id="information-collected" className="policy-card">
              <h2>2. Information We Collect</h2>
              <p>
                To provide you with seamless service, bespoke saree consultations, and insured order delivery, we collect the following types of information:
              </p>
              <div className="info-subgrid">
                <div className="info-subcard">
                  <div className="subcard-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <h4>Personal Identification Details</h4>
                  <ul>
                    <li>Full Name and Title</li>
                    <li>Verified Mobile Number &amp; WhatsApp contact</li>
                    <li>Email address for order receipts &amp; shipment links</li>
                    <li>Complete postal delivery address &amp; PIN code</li>
                  </ul>
                </div>

                <div className="info-subcard">
                  <div className="subcard-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <rect x="2" y="5" width="20" height="14" rx="2" />
                      <line x1="2" y1="10" x2="22" y2="10" />
                    </svg>
                  </div>
                  <h4>Order &amp; Billing Data</h4>
                  <ul>
                    <li>Purchased handloom saree SKUs and specifications</li>
                    <li>Razorpay Order ID &amp; Payment Transaction Reference</li>
                    <li>State of supply and applicable GST calculation details</li>
                    <li>Order status, tracking AWB codes, and delivery timestamps</li>
                  </ul>
                </div>

                <div className="info-subcard">
                  <div className="subcard-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  </div>
                  <h4>Device &amp; Interaction Data</h4>
                  <ul>
                    <li>IP address and broad geographic region</li>
                    <li>Browser family, operating system, and device screen size</li>
                    <li>Shopping cart persistence data and viewed saree collections</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 3 */}
            <div id="how-we-use" className="policy-card">
              <h2>3. How We Use Your Information</h2>
              <p>We process your personal information strictly for legitimate commercial and customer-support purposes:</p>
              <ul className="bullet-list">
                <li>
                  <strong>Order Processing &amp; Tax Invoicing:</strong> Generating GST-compliant tax invoices, packing your pure silk handloom sarees safely at our Dharmavaram facility, and processing insurance-backed dispatches.
                </li>
                <li>
                  <strong>Shipment &amp; Delivery Tracking:</strong> Sending real-time SMS, WhatsApp, and email notifications containing carrier AWB tracking numbers and estimated delivery dates.
                </li>
                <li>
                  <strong>Customer Consultation:</strong> Providing personalized saree drape guidance, matching blouse piece consultations, and responding to inquiries about zari purity or weave density.
                </li>
                <li>
                  <strong>Returns &amp; Cancellations:</strong> Verifying order authenticity and facilitating automated refund processing via Razorpay if you cancel or return an item under our policy.
                </li>
                <li>
                  <strong>Security &amp; Fraud Prevention:</strong> Protecting your account from unauthorized access, verifying suspicious transactions, and maintaining compliance with Indian tax authorities.
                </li>
              </ul>
            </div>

            {/* Section 4 */}
            <div id="payment-security" className="policy-card">
              <h2>4. Payment Security &amp; Financial Information</h2>
              <div className="security-callout">
                <div className="callout-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <div>
                  <h4>Zero Card / UPI Credential Storage</h4>
                  <p>
                    <strong>We do NOT store or have access to your credit card numbers, CVVs, debit card PINs, UPI PINs, or net banking passwords.</strong>
                  </p>
                </div>
              </div>
              <p>
                All electronic transactions on {BRAND.name} are processed through <strong>Razorpay Payment Solutions</strong>, an RBI-authorized payment aggregator certified under <strong>PCI-DSS (Payment Card Industry Data Security Standard) Level 1</strong>, the highest global security standard.
              </p>
              <p>
                Your card and payment data is encrypted using 256-bit Secure Sockets Layer (SSL) encryption and transmitted directly from your device to the payment gateway without touching our web servers.
              </p>
            </div>

            {/* Section 5 */}
            <div id="sharing-disclosure" className="policy-card">
              <h2>5. Logistics &amp; Data Sharing</h2>
              <p>
                We only share the necessary minimum data with trusted operational service partners strictly to deliver your order:
              </p>
              <ul className="bullet-list">
                <li>
                  <strong>Logistics &amp; Courier Partners:</strong> We share your recipient name, delivery address, postal code, and contact mobile number with reputable courier partners (such as Delhivery, Blue Dart, DTDC, India Post) to ensure safe, tracked, and insured doorstep delivery.
                </li>
                <li>
                  <strong>Statutory Authorities:</strong> We may disclose information if legally mandated by government or tax authorities under applicable Indian laws, tax audits, or court orders.
                </li>
              </ul>
            </div>

            {/* Section 6 */}
            <div id="cookies-tracking" className="policy-card">
              <h2>6. Cookies &amp; Local Storage</h2>
              <p>
                Our website utilizes lightweight browser cookies and session storage mechanisms to ensure a seamless shopping experience:
              </p>
              <ul className="bullet-list">
                <li>
                  <strong>Essential Shopping Cookies:</strong> Required to keep track of your shopping bag, preserve login sessions, and maintain your checkout progress.
                </li>
                <li>
                  <strong>Preference Cookies:</strong> Remember your preferred viewing options, such as currency or filter preferences.
                </li>
              </ul>
              <p>
                You can configure your browser settings to refuse or delete cookies; however, please note that disabling essential cookies may impact your ability to add sarees to the cart or complete a purchase.
              </p>
            </div>

            {/* Section 7 */}
            <div id="data-retention" className="policy-card">
              <h2>7. Data Retention &amp; Protection</h2>
              <p>
                We retain your order records, tax invoices, and transaction logs for the statutory period required under Indian Goods and Services Tax (GST) laws and commercial regulations (typically up to 7 years).
              </p>
              <p>
                Our infrastructure is protected by firewalls, HTTPS encrypted transport, role-based database access, and secure authentication tokens to prevent unauthorized data access or loss.
              </p>
            </div>

            {/* Section 8 */}
            <div id="user-rights" className="policy-card">
              <h2>8. Your Rights &amp; Choices</h2>
              <p>As a valued patron of {BRAND.name}, you have full control over your personal data:</p>
              <ul className="bullet-list">
                <li>
                  <strong>Access &amp; Edit Profile:</strong> You can view and update your name, phone number, and saved shipping addresses at any time in the <Link to="/profile">My Profile</Link> section.
                </li>
                <li>
                  <strong>Order History:</strong> Review past orders and download official GST invoices in the <Link to="/orders">My Orders</Link> dashboard.
                </li>
                <li>
                  <strong>Account Deletion:</strong> You may request the closure of your account and deletion of non-statutory records by writing to us at <a href={`mailto:${BRAND.contact.email}`}>{BRAND.contact.email}</a>.
                </li>
              </ul>
            </div>

            {/* Section 9 */}
            <div id="contact-grievance" className="policy-card">
              <h2>9. Grievance Officer &amp; Contact Information</h2>
              <p>
                In accordance with the Information Technology Act, 2000 and rules made thereunder, if you have any questions, feedback, or grievances regarding this Privacy Policy, please contact our designated Grievance Officer:
              </p>
              <div className="contact-box">
                <div className="contact-details">
                  <p><strong>Grievance Officer:</strong> Customer Care &amp; Compliance Team</p>
                  <p><strong>Entity:</strong> {BRAND.legalName}</p>
                  <p><strong>Registered Address:</strong> {BRAND.contact.address}</p>
                  <p>
                    <strong>Email:</strong> <a href={`mailto:${BRAND.contact.email}`}>{BRAND.contact.email}</a>
                  </p>
                  <p>
                    <strong>Customer Support Hotline:</strong> <a href={`tel:${cleanPhone}`}>{BRAND.contact.phone}</a>
                  </p>
                  <p>
                    <strong>WhatsApp Helpline:</strong> <a href={`https://wa.me/${cleanWa}`} target="_blank" rel="noreferrer">Chat on WhatsApp</a>
                  </p>
                  <p><strong>Operational Hours:</strong> {BRAND.contact.hoursWeekday}</p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <style>{`
        .policy-page {
          background-color: var(--brand-background);
          min-height: 100vh;
          padding-bottom: 80px;
        }
        .policy-hero {
          background: linear-gradient(180deg, #20080b 0%, #3d1410 100%);
          color: #ffffff;
          padding: 56px 0 48px;
          border-bottom: 1px solid rgba(197, 139, 56, 0.3);
        }
        .policy-hero-inner {
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
        }
        .policy-breadcrumb {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 13px;
          color: var(--brand-gold-subtle);
          margin-bottom: 20px;
        }
        .policy-breadcrumb a {
          color: var(--brand-gold-subtle);
          text-decoration: none;
          transition: color 0.2s;
        }
        .policy-breadcrumb a:hover {
          color: #ffffff;
          text-decoration: underline;
        }
        .policy-breadcrumb .separator {
          opacity: 0.6;
        }
        .policy-breadcrumb .current {
          color: #ffffff;
          font-weight: 500;
        }
        .policy-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(197, 139, 56, 0.15);
          border: 1px solid rgba(197, 139, 56, 0.4);
          color: var(--brand-gold-light);
          padding: 6px 16px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          margin-bottom: 16px;
        }
        .policy-badge svg {
          width: 14px;
          height: 14px;
        }
        .policy-title {
          font-family: var(--font-display);
          font-size: clamp(32px, 5vw, 44px);
          font-weight: 600;
          color: #ffffff;
          margin: 0 0 16px;
          letter-spacing: 0.5px;
        }
        .policy-subtitle {
          font-size: 16px;
          line-height: 1.65;
          color: var(--blush-300);
          max-width: 760px;
          margin: 0 auto 20px;
        }
        .policy-meta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          font-size: 13px;
          color: var(--brand-gold-subtle);
        }
        .policy-meta .dot {
          opacity: 0.5;
        }

        /* Body & Grid */
        .policy-body-section {
          padding-top: 48px;
        }
        .policy-grid {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 40px;
          align-items: start;
        }

        /* Sidebar TOC */
        .policy-sidebar {
          position: sticky;
          top: 100px;
        }
        .toc-box {
          background: var(--brand-surface);
          border: 1px solid var(--brand-border);
          border-radius: var(--radius-md);
          padding: 24px;
          box-shadow: 0 4px 20px rgba(34, 13, 10, 0.04);
        }
        .toc-heading {
          font-family: var(--font-display);
          font-size: 16px;
          font-weight: 600;
          color: var(--brand-primary);
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 0 0 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--brand-border);
        }
        .toc-heading svg {
          width: 18px;
          height: 18px;
          color: var(--brand-secondary);
        }
        .toc-list {
          list-style: none;
          padding: 0;
          margin: 0 0 24px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .toc-btn {
          width: 100%;
          text-align: left;
          background: none;
          border: none;
          padding: 8px 12px;
          font-size: 13.5px;
          color: var(--brand-muted);
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all 0.2s;
          line-height: 1.4;
        }
        .toc-btn:hover {
          color: var(--brand-primary);
          background: var(--brand-background);
        }
        .toc-btn.active {
          color: var(--brand-primary);
          background: rgba(176, 115, 46, 0.12);
          font-weight: 600;
        }
        .toc-support-card {
          background: #FAF6F0;
          border: 1px dashed var(--brand-border);
          border-radius: var(--radius-sm);
          padding: 16px;
        }
        .toc-support-card h4 {
          font-size: 14px;
          font-weight: 600;
          color: var(--brand-text);
          margin: 0 0 6px;
        }
        .toc-support-card p {
          font-size: 12.5px;
          color: var(--brand-muted);
          line-height: 1.4;
          margin: 0 0 12px;
        }
        .support-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12.5px;
          font-weight: 500;
          color: var(--brand-primary);
          text-decoration: none;
          word-break: break-all;
        }
        .support-link svg {
          width: 14px;
          height: 14px;
          flex-shrink: 0;
        }
        .support-link:hover {
          text-decoration: underline;
        }

        /* Policy Cards */
        .policy-content {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }
        .policy-card {
          background: var(--brand-surface);
          border: 1px solid var(--brand-border);
          border-radius: var(--radius-md);
          padding: 32px 36px;
          box-shadow: 0 4px 18px rgba(34, 13, 10, 0.03);
        }
        .policy-card h2 {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 600;
          color: var(--brand-primary);
          margin: 0 0 18px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(176, 115, 46, 0.18);
        }
        .policy-card p {
          font-size: 15px;
          line-height: 1.7;
          color: var(--brand-text);
          margin: 0 0 16px;
        }
        .policy-card p:last-child {
          margin-bottom: 0;
        }

        .highlight-banner {
          display: flex;
          gap: 14px;
          background: #FAF6F1;
          border-left: 4px solid var(--brand-secondary);
          padding: 16px 20px;
          border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
          margin-top: 20px;
          font-size: 14.5px;
          color: var(--brand-text);
          align-items: flex-start;
        }
        .highlight-banner svg {
          width: 20px;
          height: 20px;
          color: var(--brand-secondary);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .info-subgrid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 18px;
          margin-top: 20px;
        }
        .info-subcard {
          background: var(--brand-background);
          border: 1px solid var(--brand-border);
          border-radius: var(--radius-sm);
          padding: 20px;
        }
        .subcard-icon {
          width: 36px;
          height: 36px;
          background: rgba(176, 115, 46, 0.12);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--brand-primary);
          margin-bottom: 12px;
        }
        .subcard-icon svg {
          width: 18px;
          height: 18px;
        }
        .info-subcard h4 {
          font-size: 15px;
          font-weight: 600;
          color: var(--brand-text);
          margin: 0 0 10px;
        }
        .info-subcard ul {
          list-style: disc;
          padding-left: 18px;
          margin: 0;
          font-size: 13.5px;
          color: var(--brand-muted);
          line-height: 1.6;
        }

        .bullet-list {
          list-style: disc;
          padding-left: 20px;
          margin: 16px 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
          font-size: 15px;
          line-height: 1.65;
          color: var(--brand-text);
        }

        .security-callout {
          display: flex;
          gap: 16px;
          align-items: center;
          background: rgba(88, 30, 21, 0.04);
          border: 1px solid rgba(88, 30, 21, 0.15);
          border-radius: var(--radius-sm);
          padding: 16px 20px;
          margin-bottom: 18px;
        }
        .security-callout .callout-icon {
          width: 42px;
          height: 42px;
          background: var(--brand-primary);
          color: #ffffff;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .security-callout .callout-icon svg {
          width: 20px;
          height: 20px;
        }
        .security-callout h4 {
          font-size: 15px;
          font-weight: 600;
          color: var(--brand-primary);
          margin: 0 0 4px;
        }
        .security-callout p {
          margin: 0;
          font-size: 13.5px;
          color: var(--brand-text);
        }

        .contact-box {
          background: var(--brand-background);
          border: 1px solid var(--brand-border);
          border-radius: var(--radius-sm);
          padding: 22px;
          margin-top: 16px;
        }
        .contact-details p {
          font-size: 14.5px;
          margin: 0 0 10px;
          line-height: 1.5;
        }
        .contact-details p:last-child {
          margin-bottom: 0;
        }
        .contact-details a {
          color: var(--brand-primary);
          text-decoration: none;
          font-weight: 500;
        }
        .contact-details a:hover {
          text-decoration: underline;
        }

        /* Responsive */
        @media (max-width: 900px) {
          .policy-grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }
          .policy-sidebar {
            position: static;
          }
          .policy-card {
            padding: 24px 20px;
          }
        }
      `}</style>
    </div>
  );
}
