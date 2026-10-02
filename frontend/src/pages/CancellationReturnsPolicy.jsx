import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { api } from '../data/api';
import BRAND from '../config/brand';

export default function CancellationReturnsPolicy() {
  const [tiers, setTiers] = useState([]);
  const [loadingTiers, setLoadingTiers] = useState(true);

  const cleanPhone = BRAND.contact.phone.replace(/[^\d+]/g, '');
  const cleanWa = BRAND.contact.whatsapp.replace(/[^\d]/g, '');

  useEffect(() => {
    api
      .getCancellationPolicy()
      .then(({ policy }) => {
        if (Array.isArray(policy) && policy.length > 0) {
          setTiers(policy);
        } else {
          // Standard handloom default tiers if none configured
          setTiers([
            { id: 1, label: 'Within 24 Hours of Payment (Pre-Dispatch)', refund_percent: 100, max_days: 1 },
            { id: 2, label: 'Before Saree Dispatched / Manifested', refund_percent: 100, max_days: 2 },
            { id: 3, label: 'After Dispatch & In Transit', refund_percent: 90, max_days: 5 },
          ]);
        }
      })
      .catch(() => {
        setTiers([
          { id: 1, label: 'Within 24 Hours of Payment (Pre-Dispatch)', refund_percent: 100, max_days: 1 },
          { id: 2, label: 'Before Saree Dispatched / Manifested', refund_percent: 100, max_days: 2 },
        ]);
      })
      .finally(() => setLoadingTiers(false));
  }, []);

  return (
    <div className="policy-page">
      <Seo
        title="Returns &amp; Cancellation Policy"
        path="/returns-and-cancellation"
        description={`Learn about our easy pre-dispatch cancellation rules, 48-hour return window for transit damages, and transparent Razorpay refund timelines at ${BRAND.name}.`}
      />

      {/* Hero Section */}
      <section className="policy-hero">
        <div className="container policy-hero-inner">
          <nav className="policy-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="separator">/</span>
            <span>Customer Care</span>
            <span className="separator">/</span>
            <span className="current">Returns &amp; Cancellation</span>
          </nav>
          <div className="policy-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span>Fair &amp; Transparent Handloom Commerce</span>
          </div>
          <h1 className="policy-title">Returns &amp; Cancellation Policy</h1>
          <p className="policy-subtitle">
            Every Dharmavaram pure silk saree is a masterwork woven on traditional looms. We are committed to complete transparency,
            seamless pre-dispatch cancellations, and swift resolution for any rare defect or transit issue.
          </p>
        </div>
      </section>

      {/* Quick Policy Highlights */}
      <section className="container highlights-section">
        <div className="highlight-cards-grid">
          <div className="hl-card">
            <div className="hl-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <h3>Quick Order Cancellation</h3>
            <p>Cancel directly from your account before dispatch with instant automated refund initiation.</p>
          </div>

          <div className="hl-card">
            <div className="hl-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
            </div>
            <h3>48-Hour Return Window</h3>
            <p>Notify us within 48 hours of delivery if a product arrives damaged, defective, or incorrect.</p>
          </div>

          <div className="hl-card">
            <div className="hl-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <line x1="2" y1="10" x2="22" y2="10" />
              </svg>
            </div>
            <h3>5–7 Days Refund via Razorpay</h3>
            <p>Refunds are credited directly to your original payment method (Bank / Card / UPI) swiftly.</p>
          </div>

          <div className="hl-card">
            <div className="hl-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h3>Authentic Silk Guarantee</h3>
            <p>Handloom marks and pure zari purity guaranteed with direct artisan provenance from Dharmavaram.</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container policy-body-container">
        {/* Live Cancellation Refund Tiers */}
        <div className="policy-block">
          <div className="block-header">
            <div className="block-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
            <div>
              <h2>Order Cancellation Policy &amp; Refund Tiers</h2>
              <p>You can cancel your order before it enters logistics dispatch directly from your account.</p>
            </div>
          </div>

          <div className="tier-table-wrapper">
            <table className="tier-table">
              <thead>
                <tr>
                  <th>Cancellation Stage</th>
                  <th>Maximum Window</th>
                  <th>Refund Eligibility</th>
                  <th>Processing Fee</th>
                </tr>
              </thead>
              <tbody>
                {loadingTiers ? (
                  <tr>
                    <td colSpan="4" style={{ textAlign: 'center', padding: '24px' }}>
                      Loading policy tiers...
                    </td>
                  </tr>
                ) : (
                  tiers.map((t) => (
                    <tr key={t.id || t.label}>
                      <td>
                        <strong>{t.label}</strong>
                      </td>
                      <td>Within {t.max_days ?? t.maxDays} day(s) of payment</td>
                      <td>
                        <span className="badge-refund">{t.refund_percent ?? t.refundPercent}% Refund</span>
                      </td>
                      <td>{100 - (t.refund_percent ?? t.refundPercent) > 0 ? `${100 - (t.refund_percent ?? t.refundPercent)}% Processing Fee` : 'Nil / Zero Fee'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="cancellation-steps">
            <h4>How to cancel an order online:</h4>
            <ol>
              <li>Log in to your account and navigate to <Link to="/orders">My Orders</Link>.</li>
              <li>Locate your pending order and click <strong>Order Details</strong>.</li>
              <li>Click the <strong>Cancel Order</strong> button. You will be prompted to select a cancellation reason.</li>
              <li>Once confirmed, the refund is automatically initiated to your original payment mode through Razorpay.</li>
            </ol>
          </div>
        </div>

        {/* Handloom Return & Replacement Policy */}
        <div className="policy-block">
          <div className="block-header">
            <div className="block-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <polyline points="23 4 23 10 17 10" />
                <polyline points="1 20 1 14 7 14" />
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
              </svg>
            </div>
            <div>
              <h2>Returns &amp; Replacement Policy</h2>
              <p>Guidelines for eligible returns on authentic pure silk handloom sarees.</p>
            </div>
          </div>

          <div className="handloom-notice">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <div>
              <strong>Important Note on Handloom Artistry:</strong>
              <p>
                Our pure silk sarees are woven by hand on traditional wooden pit looms by Dharmavaram master weavers. Minor slubs, natural yarn texture variations, tiny knotting of weft threads, or slight differences in zari border symmetry are hallmarks of human craftsmanship, not manufacturing flaws.
              </p>
            </div>
          </div>

          <h3 className="section-subhead">1. Eligible Reasons for Return or Replacement</h3>
          <ul className="policy-list">
            <li>
              <strong>Physical Transit Damage:</strong> The saree or package arrived physically torn, damaged, or wet during courier transit.
            </li>
            <li>
              <strong>Wrong Product Delivered:</strong> The design, colorway, or saree SKU received does not match the confirmed order.
            </li>
            <li>
              <strong>Major Weaving Defect:</strong> A substantial structural tear, hole, or major printing/dye stain not consistent with normal handloom characteristics.
            </li>
          </ul>

          <h3 className="section-subhead">2. Return Eligibility Conditions</h3>
          <p>To qualify for a full replacement or refund, the saree must meet the following mandatory conditions:</p>
          <div className="conditions-grid">
            <div className="condition-box check">
              <div className="status-indicator pass">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div>
                <h5>Reported Within 48 Hours</h5>
                <p>Must be communicated within 48 hours of delivery timestamp with unboxing photos.</p>
              </div>
            </div>

            <div className="condition-box check">
              <div className="status-indicator pass">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div>
                <h5>Uncut Blouse Fabric</h5>
                <p>The unstitched running blouse fabric must remain completely intact and uncut from the saree.</p>
              </div>
            </div>

            <div className="condition-box check">
              <div className="status-indicator pass">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div>
                <h5>Original Tags &amp; Folds</h5>
                <p>Original silk mark tag, brand barcode tag, and luxury box packaging must be intact.</p>
              </div>
            </div>

            <div className="condition-box check">
              <div className="status-indicator pass">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div>
                <h5>Unworn &amp; Unwashed</h5>
                <p>Saree must be in brand new, original condition, free of perfumes, stains, or pleat creases.</p>
              </div>
            </div>
          </div>

          <h3 className="section-subhead" style={{ marginTop: '28px' }}>3. Non-Returnable Scenarios</h3>
          <ul className="policy-list">
            <li>Sarees with the blouse piece detached or cut by the customer or customer&rsquo;s tailor.</li>
            <li>Customized products (e.g. customized fall/pico stitching, customized tassels, or custom dyed sarees done on special request).</li>
            <li>Products washed, dry-cleaned, ironed, or damaged due to improper post-purchase handling.</li>
            <li>Subjective minor shade variations attributable to varying mobile/monitor screen color calibration (pure silk yarn naturally reflects light differently under varied ambient illumination).</li>
          </ul>
        </div>

        {/* Step by step return procedure */}
        <div className="policy-block">
          <div className="block-header">
            <div className="block-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
              </svg>
            </div>
            <div>
              <h2>Step-by-Step Return &amp; Refund Workflow</h2>
              <p>How our seamless inspection and refund process works.</p>
            </div>
          </div>

          <div className="process-timeline">
            <div className="step-item">
              <div className="step-num">1</div>
              <div className="step-info">
                <h4>Initiate Request within 48 Hours</h4>
                <p>
                  Contact our concierge via WhatsApp at <a href={`https://wa.me/${cleanWa}`} target="_blank" rel="noreferrer">{BRAND.contact.phone}</a> or email <a href={`mailto:${BRAND.contact.email}`}>{BRAND.contact.email}</a> with your Order ID and 2–3 clear unboxing photos/video highlighting the issue.
                </p>
              </div>
            </div>

            <div className="step-item">
              <div className="step-num">2</div>
              <div className="step-info">
                <h4>Artisan Review &amp; Return Approval</h4>
                <p>
                  Our Dharmavaram master weaver inspection team will verify the claim within 24 business hours and approve the return or dispatch a replacement saree.
                </p>
              </div>
            </div>

            <div className="step-item">
              <div className="step-num">3</div>
              <div className="step-info">
                <h4>Reverse Pickup / Return Shipment</h4>
                <p>
                  We schedule an insured reverse courier pickup from your address. In PIN codes where reverse pickup is unavailable, we assist you in dispatching the package via insured courier, reimbursing standard courier charges upon receipt.
                </p>
              </div>
            </div>

            <div className="step-item">
              <div className="step-num">4</div>
              <div className="step-info">
                <h4>Verification &amp; Swift Refund</h4>
                <p>
                  Upon receiving the saree at our Dharmavaram studio, our quality audit is concluded within 48 hours, and your refund is released immediately to your original payment method via Razorpay (typically credited within 5 to 7 business days depending on your bank).
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Support Box */}
        <div className="policy-support-box">
          <div>
            <h3>Need Help with an Order or Return?</h3>
            <p>Our dedicated handloom customer care team is available 7 days a week to support you.</p>
          </div>
          <div className="support-actions">
            <a href={`https://wa.me/${cleanWa}`} target="_blank" rel="noreferrer" className="btn-primary-action">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.7-1.2A9 9 0 1 0 12 3z" />
                <path d="M8.5 8.7c.2-.5.4-.5.6-.5h.5c.2 0 .4 0 .6.4.2.5.7 1.6.7 1.7.1.1.1.3 0 .4-.1.2-.2.3-.3.4l-.4.5c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.6-.7c.2-.2.4-.2.6-.1l1.5.7c.2.1.4.2.4.4.1.5-.1 1.4-.6 1.8-.6.5-1.6.8-2.6.5-1.8-.5-3.7-1.6-5.1-3.1-1.3-1.3-2.1-2.7-2.4-3.4-.3-.7-.4-1.7.2-2.4z" />
              </svg>
              Chat on WhatsApp
            </a>
            <a href={`tel:${cleanPhone}`} className="btn-secondary-action">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Call {BRAND.contact.phone}
            </a>
          </div>
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
          max-width: 920px;
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
          font-size: clamp(30px, 4.5vw, 42px);
          font-weight: 600;
          color: #ffffff;
          margin: 0 0 16px;
        }
        .policy-subtitle {
          font-size: 16px;
          line-height: 1.65;
          color: var(--blush-300);
          max-width: 780px;
          margin: 0 auto;
        }

        /* Highlights Grid */
        .highlights-section {
          margin-top: -24px;
          margin-bottom: 40px;
          position: relative;
          z-index: 2;
        }
        .highlight-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 18px;
        }
        .hl-card {
          background: var(--brand-surface);
          border: 1px solid var(--brand-border);
          border-radius: var(--radius-md);
          padding: 24px;
          box-shadow: 0 8px 24px rgba(34, 13, 10, 0.05);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .hl-icon {
          width: 44px;
          height: 44px;
          background: rgba(176, 115, 46, 0.12);
          color: var(--brand-primary);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 14px;
        }
        .hl-icon svg {
          width: 22px;
          height: 22px;
        }
        .hl-card h3 {
          font-size: 16px;
          font-weight: 600;
          color: var(--brand-text);
          margin: 0 0 8px;
        }
        .hl-card p {
          font-size: 13.5px;
          color: var(--brand-muted);
          line-height: 1.55;
          margin: 0;
        }

        /* Body blocks */
        .policy-body-container {
          display: flex;
          flex-direction: column;
          gap: 36px;
          max-width: 1040px;
        }
        .policy-block {
          background: var(--brand-surface);
          border: 1px solid var(--brand-border);
          border-radius: var(--radius-md);
          padding: 36px 40px;
          box-shadow: 0 4px 20px rgba(34, 13, 10, 0.03);
        }
        .block-header {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 24px;
          padding-bottom: 18px;
          border-bottom: 1px solid var(--brand-border);
        }
        .block-icon {
          width: 46px;
          height: 46px;
          background: var(--brand-primary);
          color: #ffffff;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .block-icon svg {
          width: 24px;
          height: 24px;
        }
        .block-header h2 {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 600;
          color: var(--brand-primary);
          margin: 0 0 4px;
        }
        .block-header p {
          font-size: 14px;
          color: var(--brand-muted);
          margin: 0;
        }

        /* Tier table */
        .tier-table-wrapper {
          overflow-x: auto;
          margin-bottom: 24px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--brand-border);
        }
        .tier-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 14px;
        }
        .tier-table th {
          background: #FAF6F1;
          color: var(--brand-primary);
          font-weight: 600;
          padding: 14px 18px;
          border-bottom: 1px solid var(--brand-border);
        }
        .tier-table td {
          padding: 14px 18px;
          border-bottom: 1px solid var(--brand-border);
          color: var(--brand-text);
        }
        .tier-table tr:last-child td {
          border-bottom: none;
        }
        .badge-refund {
          display: inline-block;
          background: rgba(34, 150, 80, 0.12);
          color: #1e7e43;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 999px;
          font-size: 12.5px;
        }

        .cancellation-steps {
          background: var(--brand-background);
          border-radius: var(--radius-sm);
          padding: 20px 24px;
        }
        .cancellation-steps h4 {
          font-size: 15px;
          color: var(--brand-text);
          margin: 0 0 10px;
        }
        .cancellation-steps ol {
          margin: 0;
          padding-left: 20px;
          font-size: 14px;
          color: var(--brand-text);
          line-height: 1.65;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .cancellation-steps a {
          color: var(--brand-primary);
          font-weight: 500;
        }

        /* Handloom Notice */
        .handloom-notice {
          display: flex;
          gap: 14px;
          background: #FAF6F1;
          border-left: 4px solid var(--brand-secondary);
          border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
          padding: 18px 22px;
          margin-bottom: 24px;
          font-size: 14.5px;
        }
        .handloom-notice svg {
          width: 22px;
          height: 22px;
          color: var(--brand-secondary);
          flex-shrink: 0;
          margin-top: 2px;
        }
        .handloom-notice p {
          margin: 4px 0 0;
          color: var(--brand-text);
          line-height: 1.6;
        }

        .section-subhead {
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 600;
          color: var(--brand-text);
          margin: 22px 0 12px;
        }
        .policy-list {
          list-style: disc;
          padding-left: 20px;
          margin: 0 0 20px;
          font-size: 14.5px;
          line-height: 1.65;
          color: var(--brand-text);
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .conditions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 16px;
          margin-top: 14px;
        }
        .condition-box {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          background: var(--brand-background);
          border: 1px solid var(--brand-border);
          border-radius: var(--radius-sm);
          padding: 16px;
        }
        .status-indicator {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .status-indicator.pass {
          background: rgba(34, 150, 80, 0.15);
          color: #1e7e43;
        }
        .status-indicator svg {
          width: 14px;
          height: 14px;
        }
        .condition-box h5 {
          margin: 0 0 4px;
          font-size: 14px;
          font-weight: 600;
          color: var(--brand-text);
        }
        .condition-box p {
          margin: 0;
          font-size: 12.5px;
          color: var(--brand-muted);
          line-height: 1.45;
        }

        /* Timeline */
        .process-timeline {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-top: 16px;
        }
        .step-item {
          display: flex;
          gap: 18px;
          align-items: flex-start;
        }
        .step-num {
          width: 36px;
          height: 36px;
          background: rgba(176, 115, 46, 0.15);
          color: var(--brand-primary);
          border: 2px solid var(--brand-secondary);
          border-radius: 50%;
          font-weight: 700;
          font-size: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .step-info h4 {
          margin: 0 0 6px;
          font-size: 15.5px;
          font-weight: 600;
          color: var(--brand-text);
        }
        .step-info p {
          margin: 0;
          font-size: 14px;
          color: var(--brand-muted);
          line-height: 1.6;
        }
        .step-info a {
          color: var(--brand-primary);
          font-weight: 500;
        }

        /* Bottom Support */
        .policy-support-box {
          background: linear-gradient(135deg, #FAF6F1 0%, #F5ECE0 100%);
          border: 1px solid var(--brand-secondary);
          border-radius: var(--radius-md);
          padding: 32px 36px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
        }
        .policy-support-box h3 {
          font-family: var(--font-display);
          font-size: 20px;
          font-weight: 600;
          color: var(--brand-primary);
          margin: 0 0 6px;
        }
        .policy-support-box p {
          margin: 0;
          font-size: 14px;
          color: var(--brand-muted);
        }
        .support-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }
        .btn-primary-action {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--brand-primary);
          color: #ffffff;
          padding: 10px 20px;
          border-radius: var(--radius-sm);
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          transition: background 0.2s;
        }
        .btn-primary-action:hover {
          background: var(--maroon-800);
        }
        .btn-primary-action svg {
          width: 16px;
          height: 16px;
        }
        .btn-secondary-action {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #ffffff;
          border: 1px solid var(--brand-border);
          color: var(--brand-text);
          padding: 10px 18px;
          border-radius: var(--radius-sm);
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.2s;
        }
        .btn-secondary-action:hover {
          border-color: var(--brand-primary);
          color: var(--brand-primary);
        }
        .btn-secondary-action svg {
          width: 16px;
          height: 16px;
        }

        @media (max-width: 768px) {
          .policy-block {
            padding: 24px 18px;
          }
          .policy-support-box {
            padding: 24px 20px;
          }
          .support-actions {
            width: 100%;
          }
          .btn-primary-action, .btn-secondary-action {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
