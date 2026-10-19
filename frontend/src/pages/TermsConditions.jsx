import { useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import BRAND from '../config/brand';

export default function TermsConditions() {
  const [activeSection, setActiveSection] = useState('acceptance');

  const lastUpdated = 'October 2026';
  const cleanPhone = BRAND.contact.phone.replace(/[^\d+]/g, '');

  const sections = [
    { id: 'acceptance', title: '1. Acceptance of Terms' },
    { id: 'craft-nature', title: '2. Handloom Authenticity & Natural Variations' },
    { id: 'pricing-payment', title: '3. Pricing, GST & Payment Gateways' },
    { id: 'orders-dispatch', title: '4. Order Placement & Acceptance' },
    { id: 'shipping-delivery', title: '5. Regional Shipping & Delivery' },
    { id: 'cancellation-returns', title: '6. Cancellations, Returns & Refunds' },
    { id: 'intellectual-property', title: '7. Intellectual Property & Trademark' },
    { id: 'user-conduct', title: '8. User Accounts & Prohibited Uses' },
    { id: 'governing-law', title: '9. Governing Law & Jurisdiction' },
    { id: 'contact', title: '10. Contact & Business Details' },
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
        title="Terms & Conditions"
        path="/terms"
        description={`Read the official Terms and Conditions for purchasing authentic handloom sarees from ${BRAND.name}. Governed under the laws of Andhra Pradesh, India.`}
      />

      {/* Hero Banner */}
      <section className="policy-hero">
        <div className="container policy-hero-inner">
          <nav className="policy-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="separator">/</span>
            <span>Legal</span>
            <span className="separator">/</span>
            <span className="current">Terms &amp; Conditions</span>
          </nav>
          <div className="policy-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            <span>Legal Terms of Service</span>
          </div>
          <h1 className="policy-title">Terms &amp; Conditions</h1>
          <p className="policy-subtitle">
            Please read these terms carefully before exploring or placing an order with {BRAND.legalName}.
            By accessing our store, you agree to be bound by these legal conditions.
          </p>
          <p className="policy-updated">Last Updated: {lastUpdated}</p>
        </div>
      </section>

      {/* Content Layout */}
      <section className="policy-content-section">
        <div className="container policy-layout">
          {/* Sidebar Navigation */}
          <aside className="policy-sidebar">
            <div className="policy-nav-box">
              <h3 className="policy-nav-heading">Table of Contents</h3>
              <nav className="policy-nav">
                {sections.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    className={`policy-nav-btn ${activeSection === s.id ? 'active' : ''}`}
                    onClick={() => scrollTo(s.id)}
                  >
                    {s.title}
                  </button>
                ))}
              </nav>
            </div>

            <div className="policy-support-card">
              <h4>Need Legal Clarification?</h4>
              <p>Our concierge desk is ready to answer questions regarding our weave policies or orders.</p>
              <a href={`mailto:${BRAND.contact.email}`} className="btn btn-outline btn-sm">
                Email {BRAND.contact.email}
              </a>
            </div>
          </aside>

          {/* Main Content */}
          <main className="policy-main">
            {/* 1. Acceptance */}
            <article id="acceptance" className="policy-block">
              <h2>1. Acceptance of Terms</h2>
              <p>
                Welcome to <strong>{BRAND.legalName}</strong> (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;).
                These Terms and Conditions govern your use of the website <strong>https://ravichandratextiles.com</strong> and
                all associated digital services, orders, and interactions.
              </p>
              <p>
                By visiting our website, signing up for an account, or placing an order, you confirm that you are at least 18 years
                of age (or accessing under parental supervision) and agree to comply unconditionally with these terms, as well as our{' '}
                <Link to="/privacy-policy">Privacy Policy</Link>, <Link to="/shipping-policy">Shipping Policy</Link>, and{' '}
                <Link to="/returns-and-cancellation">Cancellation &amp; Returns Policy</Link>.
              </p>
            </article>

            {/* 2. Craft Nature */}
            <article id="craft-nature" className="policy-block">
              <h2>2. Handloom Authenticity &amp; Natural Variations</h2>
              <div className="policy-highlight-box">
                <strong>Handcrafted Heirloom Notice:</strong> Every saree in our catalog is an authentic creation
                woven by skilled artisans on traditional handlooms in Dharmavaram and surrounding weaver communities.
              </div>
              <p>
                Because genuine handloom weaving is a manual human artistry rather than high-speed machine stamping, minor
                irregularities—including slight weave slubs, yarn tension variations, border selvedge traits, or subtle dye shade
                differences—are intrinsic hallmarks of handloom heritage, not factory defects.
              </p>
              <p>
                While we photograph all sarees under balanced studio lighting with 4K color fidelity, slight variations in color
                may occur depending on your device&rsquo;s display calibration, brightness, and color gamut (OLED, sRGB, etc.).
              </p>
            </article>

            {/* 3. Pricing, GST & Payments */}
            <article id="pricing-payment" className="policy-block">
              <h2>3. Pricing, GST &amp; Payment Gateways</h2>
              <ul>
                <li>
                  <strong>Currency:</strong> All prices listed across our storefront are quoted in <strong>Indian Rupees (INR / ₹)</strong>.
                </li>
                <li>
                  <strong>Taxes &amp; GST:</strong> All displayed retail merchandise prices already include applicable Goods and Services Tax (GST)
                  under HSN Code 5007 (Handloom Silk Textiles) at 5%, or will be itemized clearly during checkout. Official GST Tax Invoices
                  are generated for every completed purchase.
                </li>
                <li>
                  <strong>Payment Processing:</strong> We partner with <strong>Razorpay</strong>, India&rsquo;s leading RBI-authorized
                  payment aggregator. You can securely pay via UPI (Google Pay, PhonePe, Paytm), Credit/Debit Cards (Visa, MasterCard, RuPay),
                  Net Banking, and digital wallets.
                </li>
                <li>
                  <strong>Card Security:</strong> We do not store or capture your CVV, full 16-digit card numbers, or banking MPINs on our
                  servers. All transactions are encrypted with 256-bit SSL/TLS and routed directly through PCI-DSS Level 1 compliant networks.
                </li>
              </ul>
            </article>

            {/* 4. Order Placement */}
            <article id="orders-dispatch" className="policy-block">
              <h2>4. Order Placement &amp; Acceptance</h2>
              <p>
                When you complete checkout and make payment, you will receive an immediate automated confirmation email containing
                your Order ID, itemized invoice, and shipping address.
              </p>
              <p>
                We reserve the right to decline or cancel an order prior to dispatch under exceptional circumstances, such as:
              </p>
              <ul>
                <li>Suspected fraudulent activity or unauthorized payment use.</li>
                <li>Inadvertent catalog pricing or typographical inventory errors.</li>
                <li>Unserviceable or incomplete shipping addresses where couriers cannot deliver.</li>
              </ul>
              <p>
                In the rare event that an order is cancelled by us, your full payment will be refunded immediately back to your
                original payment source via Razorpay within 3–5 business days.
              </p>
            </article>

            {/* 5. Shipping & Delivery */}
            <article id="shipping-delivery" className="policy-block">
              <h2>5. Regional Shipping &amp; Delivery</h2>
              <p>
                We deliver across India via premier courier services including Bluedart, Delhivery, DTDC, and India Post Speed Post:
              </p>
              <ul>
                <li>
                  <strong>South India Delivery Rate (₹120):</strong> Automatically applied to all 6-digit delivery PIN codes starting with{' '}
                  <strong>5</strong> or <strong>6</strong> (Andhra Pradesh, Telangana, Karnataka, Tamil Nadu, Kerala, and Puducherry).
                </li>
                <li>
                  <strong>North &amp; Rest of India Delivery Rate (₹150):</strong> Automatically applied to all other Indian postal zones
                  (PIN codes starting with 1, 2, 3, 4, 7, and 8).
                </li>
                <li>
                  <strong>Dispatch Time:</strong> In-stock sarees are dispatched within 24 to 48 business hours after thorough quality inspection.
                </li>
                <li>
                  <strong>Transit Timeline:</strong> South India deliveries typically arrive within 2–4 business days; North and North-East
                  deliveries arrive within 4–6 business days.
                </li>
              </ul>
              <p>
                For complete delivery details, tracking, and transit insurance, please view our full{' '}
                <Link to="/shipping-policy">Shipping Policy</Link>.
              </p>
            </article>

            {/* 6. Cancellations & Returns */}
            <article id="cancellation-returns" className="policy-block">
              <h2>6. Cancellations, Returns &amp; Refunds</h2>
              <p>
                We uphold fair and transparent consumer rights. Please review our detailed{' '}
                <Link to="/returns-and-cancellation">Returns &amp; Cancellation Policy</Link>:
              </p>
              <ul>
                <li>
                  <strong>Pre-Dispatch Cancellation:</strong> You can request immediate order cancellation from your account dashboard
                  within the eligible window prior to courier dispatch.
                </li>
                <li>
                  <strong>Returns Window:</strong> If you receive a damaged, defective, or incorrect saree, notify us within 24–48 hours of
                  delivery. The saree must remain unused, unworn, unwashed, with original folding and tags intact.
                </li>
              </ul>
            </article>

            {/* 7. Intellectual Property */}
            <article id="intellectual-property" className="policy-block">
              <h2>7. Intellectual Property &amp; Trademark</h2>
              <p>
                All content published on this website—including the {BRAND.name} brand emblem, bespoke saree photographs, artisan
                videos, typography, graphic designs, product descriptions, and software code—is the exclusive intellectual property of{' '}
                <strong>{BRAND.legalName}</strong> and protected under the Indian Copyright Act, 1957, and Trademark laws.
              </p>
              <p>
                No user or competitor may scrape, reproduce, replicate, or commercially distribute our catalog imagery or textual
                assets without explicit written authorization from our firm.
              </p>
            </article>

            {/* 8. User Conduct */}
            <article id="user-conduct" className="policy-block">
              <h2>8. User Accounts &amp; Prohibited Conduct</h2>
              <p>When accessing our storefront or creating an account, you agree not to:</p>
              <ul>
                <li>Use malicious bots, automated crawlers, or scrapers to overload our server infrastructure.</li>
                <li>Attempt to bypass security features, rate limiters, or payment gateways.</li>
                <li>Submit false, fraudulent, or impersonated order information.</li>
                <li>Post defamatory, abusive, or spam comments within customer review sections.</li>
              </ul>
            </article>

            {/* 9. Governing Law */}
            <article id="governing-law" className="policy-block">
              <h2>9. Governing Law &amp; Jurisdiction</h2>
              <p>
                These Terms and Conditions and any transactions concluded through our store shall be governed by and construed in
                accordance with the laws of <strong>India</strong>.
              </p>
              <p>
                Any legal dispute, claim, or proceeding arising out of or related to our products, shipping, or website usage shall be
                subject to the exclusive jurisdiction of the competent courts in <strong>Sri Sathya Sai / Anantapur District, Andhra Pradesh, India</strong>.
              </p>
            </article>

            {/* 10. Contact */}
            <article id="contact" className="policy-block">
              <h2>10. Contact &amp; Registered Business Details</h2>
              <p>If you have any questions, legal notices, or feedback regarding these Terms, please contact us:</p>
              <div className="policy-contact-card">
                <p><strong>Firm Name:</strong> {BRAND.legalName}</p>
                <p><strong>Brand:</strong> {BRAND.name}</p>
                <p><strong>GSTIN:</strong> 37AAAAA0000A1Z5</p>
                <p><strong>Registered Address:</strong> {BRAND.contact.address}</p>
                <p>
                  <strong>Email:</strong> <a href={`mailto:${BRAND.contact.email}`}>{BRAND.contact.email}</a>
                </p>
                <p>
                  <strong>Phone:</strong> <a href={`tel:${cleanPhone}`}>{BRAND.contact.phone}</a>
                </p>
              </div>
            </article>
          </main>
        </div>
      </section>

      <style>{`
        .policy-page {
          background: #FAF8F5;
          color: #2D2422;
          min-height: 100vh;
          font-family: var(--font-body, system-ui, -apple-system, sans-serif);
        }
        .policy-hero {
          background: linear-gradient(135deg, #42120B 0%, #581E15 60%, #300C07 100%);
          color: #FAF8F5;
          padding: 60px 0 50px;
          border-bottom: 2px solid #C58B38;
        }
        .policy-hero-inner {
          max-width: 900px;
          margin: 0 auto;
        }
        .policy-breadcrumb {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #D4AF37;
          margin-bottom: 18px;
        }
        .policy-breadcrumb a {
          color: rgba(250, 248, 245, 0.7);
          text-decoration: none;
        }
        .policy-breadcrumb a:hover {
          color: #FAF8F5;
        }
        .policy-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(197, 139, 56, 0.18);
          border: 1px solid rgba(197, 139, 56, 0.4);
          color: #E2B755;
          padding: 6px 14px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.04em;
          margin-bottom: 16px;
        }
        .policy-badge svg {
          width: 14px;
          height: 14px;
        }
        .policy-title {
          font-family: var(--font-heading, serif);
          font-size: clamp(30px, 4vw, 44px);
          font-weight: 600;
          color: #FFFFFF;
          margin: 0 0 12px;
        }
        .policy-subtitle {
          font-size: 15.5px;
          line-height: 1.6;
          color: rgba(250, 248, 245, 0.85);
          margin: 0 0 12px;
        }
        .policy-updated {
          font-size: 12.5px;
          color: #D4AF37;
          margin: 0;
        }
        .policy-content-section {
          padding: 50px 0 80px;
        }
        .policy-layout {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 48px;
          align-items: flex-start;
          max-width: 1140px;
          margin: 0 auto;
        }
        .policy-sidebar {
          position: sticky;
          top: 100px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .policy-nav-box {
          background: #FFFFFF;
          border: 1px solid #E8E2D9;
          border-radius: 10px;
          padding: 20px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
        }
        .policy-nav-heading {
          font-size: 14px;
          font-weight: 600;
          color: #581E15;
          margin: 0 0 12px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .policy-nav {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .policy-nav-btn {
          background: none;
          border: none;
          text-align: left;
          padding: 8px 12px;
          font-size: 13px;
          color: #5A4E4B;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
          line-height: 1.4;
        }
        .policy-nav-btn:hover {
          background: #F4EFEA;
          color: #581E15;
        }
        .policy-nav-btn.active {
          background: #581E15;
          color: #FFFFFF;
          font-weight: 500;
        }
        .policy-support-card {
          background: #F4EFEA;
          border: 1px solid #E2D7CC;
          border-radius: 10px;
          padding: 20px;
        }
        .policy-support-card h4 {
          font-size: 14px;
          color: #581E15;
          margin: 0 0 8px;
        }
        .policy-support-card p {
          font-size: 12.5px;
          color: #6B5E5B;
          line-height: 1.5;
          margin: 0 0 14px;
        }
        .policy-main {
          display: flex;
          flex-direction: column;
          gap: 36px;
        }
        .policy-block {
          background: #FFFFFF;
          border: 1px solid #E8E2D9;
          border-radius: 12px;
          padding: 32px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.02);
        }
        .policy-block h2 {
          font-family: var(--font-heading, serif);
          font-size: 22px;
          color: #581E15;
          margin: 0 0 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid #F0ECE6;
        }
        .policy-block p {
          font-size: 14.5px;
          line-height: 1.7;
          color: #423835;
          margin: 0 0 14px;
        }
        .policy-block p:last-child {
          margin-bottom: 0;
        }
        .policy-block ul {
          margin: 12px 0 16px 20px;
          padding: 0;
        }
        .policy-block li {
          font-size: 14px;
          line-height: 1.7;
          color: #423835;
          margin-bottom: 8px;
        }
        .policy-highlight-box {
          background: #FFF8E7;
          border-left: 4px solid #C58B38;
          padding: 14px 18px;
          border-radius: 0 8px 8px 0;
          font-size: 13.5px;
          line-height: 1.6;
          color: #664A10;
          margin: 16px 0;
        }
        .policy-contact-card {
          background: #FAF8F5;
          border: 1px solid #E8E2D9;
          border-radius: 8px;
          padding: 18px;
          margin-top: 14px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .policy-contact-card p {
          font-size: 13.5px;
          margin: 0;
        }
        @media (max-width: 900px) {
          .policy-layout {
            grid-template-columns: 1fr;
            gap: 30px;
          }
          .policy-sidebar {
            position: static;
          }
          .policy-block {
            padding: 24px;
          }
        }
      `}</style>
    </div>
  );
}
