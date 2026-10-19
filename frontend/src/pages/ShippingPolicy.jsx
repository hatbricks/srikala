import { useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import BRAND from '../config/brand';

export default function ShippingPolicy() {
  const [activeSection, setActiveSection] = useState('zones');

  const lastUpdated = 'October 2026';
  const cleanPhone = BRAND.contact.phone.replace(/[^\d+]/g, '');

  const sections = [
    { id: 'zones', title: '1. Regional Shipping Rates & Pincodes' },
    { id: 'dispatch', title: '2. Processing & Dispatch Timelines' },
    { id: 'delivery-times', title: '3. Estimated Delivery Times' },
    { id: 'packaging', title: '4. Packaging & Saree Protection' },
    { id: 'tracking', title: '5. Order Tracking & Notifications' },
    { id: 'attempted-delivery', title: '6. Non-Delivery & Address Issues' },
    { id: 'transit-damage', title: '7. Damaged Shipments & Insurance' },
    { id: 'contact', title: '8. Logistics Support Desk' },
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
        title="Shipping & Delivery Policy"
        path="/shipping-policy"
        description={`Read the official Shipping and Delivery Policy of ${BRAND.name}. Learn about our transparent regional rates (₹120 South India, ₹150 North/Rest), delivery timelines, and courier partners.`}
      />

      {/* Hero Banner */}
      <section className="policy-hero">
        <div className="container policy-hero-inner">
          <nav className="policy-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="separator">/</span>
            <span>Legal</span>
            <span className="separator">/</span>
            <span className="current">Shipping Policy</span>
          </nav>
          <div className="policy-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <rect x="1" y="3" width="15" height="13" />
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
              <circle cx="5.5" cy="18.5" r="2.5" />
              <circle cx="18.5" cy="18.5" r="2.5" />
            </svg>
            <span>Express Courier Logistics</span>
          </div>
          <h1 className="policy-title">Shipping &amp; Delivery Policy</h1>
          <p className="policy-subtitle">
            Every handloom saree is inspected, steam-pressed, and securely packaged at our Dharmavaram facility.
            Here is everything you need to know about our regional delivery rates and transit schedules.
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
              <h4>Track Your Parcel</h4>
              <p>Have an active order? Monitor real-time courier movement and AWB checkpoints.</p>
              <Link to="/orders" className="btn btn-outline btn-sm">
                View My Orders
              </Link>
            </div>
          </aside>

          {/* Main Content */}
          <main className="policy-main">
            {/* 1. Regional Shipping Rates */}
            <article id="zones" className="policy-block">
              <h2>1. Regional Shipping Rates &amp; Pincode Logic</h2>
              <p>
                To provide fair, transparent shipping costs reflecting actual courier surface and air network tariffs across
                India, delivery charges are dynamically determined at checkout based on your destination PIN code:
              </p>
              <div className="rates-table-wrapper">
                <table className="policy-table">
                  <thead>
                    <tr>
                      <th>Delivery Region</th>
                      <th>Postal Pincode Criteria</th>
                      <th>Delivery Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>South India</strong>
                        <div className="table-sub">AP, Telangana, Karnataka, Tamil Nadu, Kerala, Puducherry</div>
                      </td>
                      <td>Pincodes starting with <strong>5</strong> or <strong>6</strong></td>
                      <td className="rate-col">₹120</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>North &amp; Rest of India</strong>
                        <div className="table-sub">Maharashtra, Delhi NCR, Gujarat, UP, Rajasthan, Bengal, North-East, etc.</div>
                      </td>
                      <td>Pincodes starting with <strong>1, 2, 3, 4, 7, or 8</strong></td>
                      <td className="rate-col">₹150</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="note-text">
                * Note: Delivery charges are calculated dynamically at checkout when your delivery address is entered.
                No delivery fee is displayed or added in the preliminary cart summary.
              </p>
            </article>

            {/* 2. Dispatch Timelines */}
            <article id="dispatch" className="policy-block">
              <h2>2. Processing &amp; Dispatch Timelines</h2>
              <p>
                Each saree undergoes a multi-point quality audit (verifying zari luster, border symmetry, pallu finishing,
                and blouse fabric allotment) before packing:
              </p>
              <ul>
                <li>
                  <strong>Standard Dispatch:</strong> In-stock sarees are dispatched within <strong>24 to 48 business hours</strong> of
                  order confirmation.
                </li>
                <li>
                  <strong>Business Days:</strong> Orders are processed and handed over to couriers Monday through Saturday.
                  Orders placed on Sunday or national gazetted holidays are dispatched on the next working day.
                </li>
              </ul>
            </article>

            {/* 3. Estimated Delivery Times */}
            <article id="delivery-times" className="policy-block">
              <h2>3. Estimated Delivery Times</h2>
              <p>Once your parcel is handed over to our logistics partners, transit timelines are as follows:</p>
              <ul>
                <li>
                  <strong>South India Destinations:</strong> <strong>2 to 4 business days</strong>.
                </li>
                <li>
                  <strong>North, West &amp; Central India:</strong> <strong>3 to 5 business days</strong>.
                </li>
                <li>
                  <strong>North-East, Jammu &amp; Kashmir &amp; Remote Islands:</strong> <strong>5 to 7 business days</strong>.
                </li>
              </ul>
              <div className="policy-highlight-box">
                <strong>Logistics Partners:</strong> We ship exclusively with tier-1 courier carriers—including Bluedart,
                Delhivery, DTDC, and India Post Speed Post—for guaranteed doorstep delivery and electronic POD (Proof of Delivery).
              </div>
            </article>

            {/* 4. Packaging */}
            <article id="packaging" className="policy-block">
              <h2>4. Packaging &amp; Saree Protection</h2>
              <p>
                Pure and semi-silk handlooms require careful handling to safeguard delicate gold zari threads from moisture
                and creasing:
              </p>
              <ul>
                <li>Each saree is wrapped in protective acid-free paper tissue to prevent zari oxidation.</li>
                <li>Sealed inside a weather-proof, tamper-evident security poly-mailer.</li>
                <li>Cased within a rigid outer carton box to prevent transit impact or crushing.</li>
              </ul>
            </article>

            {/* 5. Tracking */}
            <article id="tracking" className="policy-block">
              <h2>5. Order Tracking &amp; Notifications</h2>
              <p>
                As soon as your shipment is manifest with the courier, you will receive:
              </p>
              <ul>
                <li>An automated dispatch confirmation email containing the <strong>Tracking AWB Number</strong> and direct courier tracking link.</li>
                <li>SMS / WhatsApp updates as your parcel reaches delivery milestones.</li>
                <li>Real-time live tracking from your personal <Link to="/orders">Orders Dashboard</Link>.</li>
              </ul>
            </article>

            {/* 6. Non-Delivery */}
            <article id="attempted-delivery" className="policy-block">
              <h2>6. Non-Delivery &amp; Address Issues</h2>
              <p>
                Our courier partners will make up to three delivery attempts before returning the shipment to our hub (RTO):
              </p>
              <ul>
                <li>Please ensure your delivery phone number is active and accurate for delivery OTP / call verification.</li>
                <li>
                  If a package is returned due to an incomplete address or customer unavailability after 3 attempts, re-shipping
                  charges may apply to re-dispatch the consignment.
                </li>
              </ul>
            </article>

            {/* 7. Transit Damage */}
            <article id="transit-damage" className="policy-block">
              <h2>7. Damaged Shipments &amp; Insurance</h2>
              <p>
                All parcels shipped by {BRAND.name} are fully transit-insured.
              </p>
              <div className="policy-highlight-box">
                <strong>Tamper Notice:</strong> If the outer courier box or seal appears significantly torn, crushed, or tampered
                with at the time of delivery, please <strong>refuse to accept the package</strong> or record an unboxing video and
                contact our support desk within 24 hours.
              </div>
            </article>

            {/* 8. Contact */}
            <article id="contact" className="policy-block">
              <h2>8. Logistics Support Desk</h2>
              <p>Have an urgent query regarding your delivery schedule or change of address?</p>
              <div className="policy-contact-card">
                <p><strong>Logistics Desk:</strong> {BRAND.name} Dispatch Facility</p>
                <p><strong>Address:</strong> {BRAND.contact.address}</p>
                <p>
                  <strong>Email:</strong> <a href={`mailto:${BRAND.contact.email}`}>{BRAND.contact.email}</a>
                </p>
                <p>
                  <strong>Direct Helpdesk:</strong> <a href={`tel:${cleanPhone}`}>{BRAND.contact.phone}</a>
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
        .rates-table-wrapper {
          overflow-x: auto;
          margin: 16px 0;
        }
        .policy-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13.5px;
        }
        .policy-table th {
          background: #F4EFEA;
          color: #581E15;
          padding: 12px 16px;
          text-align: left;
          font-weight: 600;
          border-bottom: 2px solid #E2D7CC;
        }
        .policy-table td {
          padding: 14px 16px;
          border-bottom: 1px solid #E8E2D9;
          vertical-align: top;
        }
        .table-sub {
          font-size: 11.5px;
          color: #7A6D6A;
          margin-top: 4px;
        }
        .rate-col {
          font-size: 15px;
          font-weight: 700;
          color: #581E15;
        }
        .note-text {
          font-size: 12.5px !important;
          color: #7A6D6A !important;
          font-style: italic;
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
