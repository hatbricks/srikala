import { useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import BRAND from '../config/brand';

export default function UserGuide() {
  const [activeTab, setActiveTab] = useState('care');

  const cleanPhone = BRAND.contact.phone.replace(/[^\d+]/g, '');
  const cleanWa = BRAND.contact.whatsapp.replace(/[^\d]/g, '');

  const tabs = [
    {
      id: 'care',
      label: 'Silk Care & Maintenance',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
        </svg>
      ),
    },
    {
      id: 'sizing',
      label: 'Saree Sizing & Blouse Piece',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
          <path d="M22 12A10 10 0 0 0 12 2v10z" />
        </svg>
      ),
    },
    {
      id: 'authenticity',
      label: 'Silk & Zari Authenticity',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
    },
    {
      id: 'shopping',
      label: 'Shopping & Order Tracking',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
      ),
    },
  ];

  return (
    <div className="guide-page">
      <Seo
        title="User &amp; Silk Care Guide"
        path="/user-guide"
        description={`Comprehensive user guide for ${BRAND.name} patrons: Saree care masterclass, sizing, blouse piece cutting, real zari preservation, and order tracking.`}
      />

      {/* Hero Section */}
      <section className="guide-hero">
        <div className="container guide-hero-inner">
          <nav className="guide-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="separator">/</span>
            <span>Customer Care</span>
            <span className="separator">/</span>
            <span className="current">User &amp; Silk Care Guide</span>
          </nav>
          <div className="guide-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            <span>Handloom Masterclass &amp; Knowledge Base</span>
          </div>
          <h1 className="guide-title">Patron&rsquo;s Guide to Pure Silk Handlooms</h1>
          <p className="guide-subtitle">
            An heirloom Dharmavaram silk saree is woven to last for generations. Discover how to care for pure mulberry silk,
            safeguard golden zari luster, cut blouse pieces correctly, and effortlessly track your purchases.
          </p>
        </div>
      </section>

      {/* Main Tabs Navigation */}
      <section className="container guide-nav-wrapper">
        <div className="guide-tabs" role="tablist">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`guide-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-text">{tab.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Tab Panels */}
      <section className="container guide-content-area">
        {/* TAB 1: SILK CARE & MAINTENANCE */}
        {activeTab === 'care' && (
          <div className="tab-pane animate-fade">
            <div className="guide-card">
              <div className="card-header-row">
                <div className="header-icon-box">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                  </svg>
                </div>
                <div>
                  <h2>Preserving Your Pure Silk Saree for Generations</h2>
                  <p>Mulberry silk and gold zari are natural luxury fibers that respond with lifelong radiance when treated with care.</p>
                </div>
              </div>

              <div className="guidelines-grid">
                <div className="guide-rule-card">
                  <div className="rule-badge">Rule 01</div>
                  <h4>Professional Dry Clean Only</h4>
                  <p>
                    Always dry clean your pure silk handloom sarees. Water washing, machine spinning, or household detergents can alter the natural sericin protein in silk yarns and dull the pure zari coating.
                  </p>
                </div>

                <div className="guide-rule-card">
                  <div className="rule-badge">Rule 02</div>
                  <h4>Store in Breathable Muslin Cloth</h4>
                  <p>
                    Wrap your saree in a soft white muslin or pure cotton saree bag. Never store silk sarees inside airtight plastic bags, which trap humidity and can lead to fabric yellowing or fungal spots.
                  </p>
                </div>

                <div className="guide-rule-card">
                  <div className="rule-badge">Rule 03</div>
                  <h4>Periodic Airing &amp; Fold Rotation</h4>
                  <p>
                    Unfold your silk sarees once every three to four months. Let them air in shade inside a well-ventilated room (never under direct sunlight), and refold along different lines to avoid crease fatigue.
                  </p>
                </div>

                <div className="guide-rule-card">
                  <div className="rule-badge">Rule 04</div>
                  <h4>Low-Heat Reverse Ironing</h4>
                  <p>
                    Iron your saree strictly on the reverse side with the iron set to &ldquo;Silk&rdquo; mode. Place a thin cotton muslin cloth over the zari embroidery while ironing. Never spray water directly while pressing.
                  </p>
                </div>

                <div className="guide-rule-card">
                  <div className="rule-badge">Rule 05</div>
                  <h4>Avoid Direct Perfumes &amp; Sprays</h4>
                  <p>
                    Spritz your perfumes, hair sprays, and deodorants well before draping the saree. The alcohol and chemical propellants in perfumes can oxidize and tarnish genuine metallic zari threads.
                  </p>
                </div>

                <div className="guide-rule-card">
                  <div className="rule-badge">Rule 06</div>
                  <h4>Natural Moth Repellents</h4>
                  <p>
                    Do not place naphthalene balls or camphor blocks in direct contact with silk or zari. Instead, place dried neem leaves or cloves in small cotton sachets in your wardrobe corners.
                  </p>
                </div>
              </div>

              <div className="pro-tip-box">
                <div className="tip-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12.01" y2="8" />
                  </svg>
                </div>
                <div>
                  <strong>Master Weaver Secret:</strong>
                  <p>
                    If a sweat mark or accidental liquid stain occurs during a wedding or festive celebration, gently blot with a clean dry cotton cloth immediately without rubbing. Take the saree to a dry cleaner promptly and inform them of the stain origin.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SIZING & BLOUSE FABRIC */}
        {activeTab === 'sizing' && (
          <div className="tab-pane animate-fade">
            <div className="guide-card">
              <div className="card-header-row">
                <div className="header-icon-box">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
                    <path d="M22 12A10 10 0 0 0 12 2v10z" />
                  </svg>
                </div>
                <div>
                  <h2>Saree Anatomy &amp; Tailoring Guidelines</h2>
                  <p>Understanding the standard measurements and how to separate the matching blouse fabric.</p>
                </div>
              </div>

              <div className="anatomy-diagram">
                <div className="diagram-bar">
                  <div className="bar-segment blouse-part">
                    <span>Blouse Fabric (0.8m)</span>
                  </div>
                  <div className="bar-segment body-part">
                    <span>Saree Body &amp; Pleats (4.5m)</span>
                  </div>
                  <div className="bar-segment pallu-part">
                    <span>Grand Pallu (1.0m)</span>
                  </div>
                </div>
                <div className="diagram-caption">Total Handloom Length: ~6.30 Meters (Including Running Blouse) | Width: 45–47 Inches</div>
              </div>

              <div className="specs-grid">
                <div className="spec-card">
                  <h4>Standard Saree Body</h4>
                  <div className="spec-val">5.50 Meters</div>
                  <p>Provides ample length for 6–8 generous traditional pleats and a rich shoulder drape for all heights up to 6 feet.</p>
                </div>

                <div className="spec-card">
                  <h4>Running Blouse Fabric</h4>
                  <div className="spec-val">0.80 Meters (80 cm)</div>
                  <p>Attached seamlessly to the inner tucking end of the saree, featuring matching zari borders for sleeve styling.</p>
                </div>

                <div className="spec-card">
                  <h4>Standard Width / Height</h4>
                  <div className="spec-val">45 to 47 Inches (115–120 cm)</div>
                  <p>Optimal drape height suitable for wearing with 2-4 inch heels without showing underskirt hems.</p>
                </div>
              </div>

              <div className="cutting-instructions">
                <h3>How to Cut the Attached Blouse Fabric:</h3>
                <ol className="styled-steps">
                  <li>
                    <strong>Identify the Inner Tucking End:</strong> Hold up the saree and locate the plain end opposite the heavily woven Grand Pallu.
                  </li>
                  <li>
                    <strong>Measure 80 Centimeters:</strong> Unroll from the inner end and measure exactly 80 to 85 cm using a tailor&rsquo;s measuring tape.
                  </li>
                  <li>
                    <strong>Follow the Weft Thread Line:</strong> Pull a single weft yarn gently or use tailor&rsquo;s chalk along a straight thread line so the cut is straight and clean.
                  </li>
                  <li>
                    <strong>Edge Finishing (Fall &amp; Pico):</strong> Have your tailor stitch a matching cotton fall (5 inches wide) along the bottom pleats and finish the pallu edge with delicate hand-knotted tassels (kuchu) or pico hem.
                  </li>
                </ol>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: AUTHENTICITY */}
        {activeTab === 'authenticity' && (
          <div className="tab-pane animate-fade">
            <div className="guide-card">
              <div className="card-header-row">
                <div className="header-icon-box">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>
                <div>
                  <h2>Authenticity &amp; Dharmavaram Handloom Heritage</h2>
                  <p>How to distinguish authentic handloom pattu from powerloom and synthetic imitations.</p>
                </div>
              </div>

              <div className="auth-features-list">
                <div className="auth-feature-row">
                  <div className="auth-icon-badge">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                  <div>
                    <h4>100% Pure Mulberry Silk Mark Quality</h4>
                    <p>
                      Each Ravichandra Textiles saree is woven with pure cultivated Mulberry silk yarns in warp and weft, delivering rich natural sheen, lightweight breathability, and luxurious warmth against the skin.
                    </p>
                  </div>
                </div>

                <div className="auth-feature-row">
                  <div className="auth-icon-badge">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                      <line x1="9" y1="9" x2="9.01" y2="9" />
                      <line x1="15" y1="9" x2="15.01" y2="9" />
                    </svg>
                  </div>
                  <div>
                    <h4>Interlocking Temple (Korvai / Kuttu) Borders</h4>
                    <p>
                      Traditional Dharmavaram weavers use the time-honored interlocking technique where the border warp and body warp are manually joined on the pit loom, creating authentic sawtooth temple motifs that powerlooms cannot replicate.
                    </p>
                  </div>
                </div>

                <div className="auth-feature-row">
                  <div className="auth-icon-badge">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  </div>
                  <div>
                    <h4>The Pure Silk Burn Test</h4>
                    <p>
                      A genuine silk yarn, when burned, chars slowly with an organic odor resembling burning hair and leaves behind a soft, crushable dark ash. Synthetic polyester fibers melt quickly, drip, and form a hard plastic bead.
                    </p>
                  </div>
                </div>
              </div>

              <div className="heritage-quote">
                <p>
                  &ldquo;In Dharmavaram, every warp thread is steeped in heritage and blessed by weaving traditions passed down through generations. Our sarees carry the pride of master weaver families.&rdquo;
                </p>
                <span>— Ravichandra Textiles Master Artisans</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SHOPPING & ORDER TRACKING */}
        {activeTab === 'shopping' && (
          <div className="tab-pane animate-fade">
            <div className="guide-card">
              <div className="card-header-row">
                <div className="header-icon-box">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                </div>
                <div>
                  <h2>Shopping, Payment &amp; Real-Time Order Tracking</h2>
                  <p>Step-by-step guidance on browsing, checkout with Razorpay, and monitoring courier delivery.</p>
                </div>
              </div>

              <div className="flow-steps-grid">
                <div className="flow-card">
                  <div className="step-tag">Step 1</div>
                  <h4>Explore Curated Sarees</h4>
                  <p>
                    Browse through our <Link to="/products">All Sarees collection</Link>. Use the sort filters (Price, Newest Arrivals) and color tags to find the exact hue for your auspicious occasion.
                  </p>
                </div>

                <div className="flow-card">
                  <div className="step-tag">Step 2</div>
                  <h4>Interactive Saree View</h4>
                  <p>
                    Hover over any saree card to view how it drapes on our model. Need a live video consultation? Message us on WhatsApp for a 360-degree daylight video of the border and pallu.
                  </p>
                </div>

                <div className="flow-card">
                  <div className="step-tag">Step 3</div>
                  <h4>Secure Razorpay Checkout</h4>
                  <p>
                    Add to bag and proceed to checkout. Complete your payment using UPI (GPay, PhonePe, Paytm), Credit/Debit cards, or Net Banking with 256-bit encryption.
                  </p>
                </div>

                <div className="flow-card">
                  <div className="step-tag">Step 4</div>
                  <h4>Download Tax Invoice</h4>
                  <p>
                    Once payment is confirmed, an official GST-compliant tax invoice is automatically generated. You can view or download it anytime under <Link to="/orders">My Orders</Link>.
                  </p>
                </div>

                <div className="flow-card">
                  <div className="step-tag">Step 5</div>
                  <h4>Live AWB Tracking</h4>
                  <p>
                    Your saree is hand-inspected, wrapped in luxury packaging, and dispatched via insured air courier. Track the live delivery status from the courier tracking link sent to your SMS/WhatsApp.
                  </p>
                </div>

                <div className="flow-card">
                  <div className="step-tag">Step 6</div>
                  <h4>Doorstep Delivery</h4>
                  <p>
                    Receive your sacred weave with verified tamper-proof packaging right at your doorstep. We are always available for any post-purchase questions or styling advice.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Support Concierge Section */}
        <div className="concierge-box">
          <div className="concierge-text">
            <h3>Need Personal Styling or Bridal Saree Consultation?</h3>
            <p>
              Connect directly with our Dharmavaram silk specialists for custom pallu colors, bulk wedding orders, or family ensemble matching.
            </p>
          </div>
          <div className="concierge-buttons">
            <a href={`https://wa.me/${cleanWa}`} target="_blank" rel="noreferrer" className="btn-wa">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.7-1.2A9 9 0 1 0 12 3z" />
                <path d="M8.5 8.7c.2-.5.4-.5.6-.5h.5c.2 0 .4 0 .6.4.2.5.7 1.6.7 1.7.1.1.1.3 0 .4-.1.2-.2.3-.3.4l-.4.5c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.6-.7c.2-.2.4-.2.6-.1l1.5.7c.2.1.4.2.4.4.1.5-.1 1.4-.6 1.8-.6.5-1.6.8-2.6.5-1.8-.5-3.7-1.6-5.1-3.1-1.3-1.3-2.1-2.7-2.4-3.4-.3-.7-.4-1.7.2-2.4z" />
              </svg>
              WhatsApp Consultation
            </a>
            <Link to="/products" className="btn-shop">
              Shop Handloom Sarees
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        .guide-page {
          background-color: var(--brand-background);
          min-height: 100vh;
          padding-bottom: 80px;
        }
        .guide-hero {
          background: linear-gradient(180deg, #20080b 0%, #3d1410 100%);
          color: #ffffff;
          padding: 56px 0 48px;
          border-bottom: 1px solid rgba(197, 139, 56, 0.3);
        }
        .guide-hero-inner {
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
        }
        .guide-breadcrumb {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 13px;
          color: var(--brand-gold-subtle);
          margin-bottom: 20px;
        }
        .guide-breadcrumb a {
          color: var(--brand-gold-subtle);
          text-decoration: none;
        }
        .guide-breadcrumb a:hover {
          color: #ffffff;
          text-decoration: underline;
        }
        .guide-breadcrumb .separator {
          opacity: 0.6;
        }
        .guide-breadcrumb .current {
          color: #ffffff;
          font-weight: 500;
        }
        .guide-badge {
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
        .guide-badge svg {
          width: 14px;
          height: 14px;
        }
        .guide-title {
          font-family: var(--font-display);
          font-size: clamp(30px, 4.5vw, 42px);
          font-weight: 600;
          color: #ffffff;
          margin: 0 0 16px;
        }
        .guide-subtitle {
          font-size: 16px;
          line-height: 1.65;
          color: var(--blush-300);
          max-width: 780px;
          margin: 0 auto;
        }

        /* Tabs Nav */
        .guide-nav-wrapper {
          margin-top: -24px;
          margin-bottom: 36px;
          position: relative;
          z-index: 2;
        }
        .guide-tabs {
          display: flex;
          background: var(--brand-surface);
          border: 1px solid var(--brand-border);
          border-radius: var(--radius-md);
          padding: 6px;
          box-shadow: 0 6px 20px rgba(34, 13, 10, 0.05);
          overflow-x: auto;
          gap: 6px;
        }
        .guide-tab-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px 18px;
          border: none;
          background: transparent;
          color: var(--brand-muted);
          font-size: 14px;
          font-weight: 500;
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
        }
        .guide-tab-btn:hover {
          color: var(--brand-primary);
          background: var(--brand-background);
        }
        .guide-tab-btn.active {
          background: var(--brand-primary);
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(88, 30, 21, 0.2);
        }
        .tab-icon svg {
          width: 17px;
          height: 17px;
          display: block;
        }

        /* Content Area */
        .guide-content-area {
          max-width: 1040px;
        }
        .guide-card {
          background: var(--brand-surface);
          border: 1px solid var(--brand-border);
          border-radius: var(--radius-md);
          padding: 36px 40px;
          box-shadow: 0 4px 20px rgba(34, 13, 10, 0.03);
          margin-bottom: 36px;
        }
        .card-header-row {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 28px;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--brand-border);
        }
        .header-icon-box {
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
        .header-icon-box svg {
          width: 22px;
          height: 22px;
        }
        .card-header-row h2 {
          font-family: var(--font-display);
          font-size: 24px;
          font-weight: 600;
          color: var(--brand-primary);
          margin: 0 0 6px;
        }
        .card-header-row p {
          margin: 0;
          font-size: 14.5px;
          color: var(--brand-muted);
        }

        /* Guidelines Grid */
        .guidelines-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          margin-bottom: 28px;
        }
        .guide-rule-card {
          background: var(--brand-background);
          border: 1px solid var(--brand-border);
          border-radius: var(--radius-sm);
          padding: 22px;
          position: relative;
        }
        .rule-badge {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.5px;
          color: var(--brand-secondary);
          background: rgba(176, 115, 46, 0.12);
          padding: 3px 8px;
          border-radius: 4px;
          margin-bottom: 10px;
        }
        .guide-rule-card h4 {
          font-size: 15.5px;
          font-weight: 600;
          color: var(--brand-text);
          margin: 0 0 8px;
        }
        .guide-rule-card p {
          font-size: 13.5px;
          line-height: 1.6;
          color: var(--brand-muted);
          margin: 0;
        }

        .pro-tip-box {
          display: flex;
          gap: 14px;
          background: #FAF6F1;
          border-left: 4px solid var(--brand-secondary);
          border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
          padding: 18px 22px;
          font-size: 14.5px;
        }
        .tip-icon svg {
          width: 20px;
          height: 20px;
          color: var(--brand-secondary);
          flex-shrink: 0;
          margin-top: 2px;
        }
        .pro-tip-box p {
          margin: 4px 0 0;
          color: var(--brand-text);
          line-height: 1.6;
        }

        /* Anatomy Diagram */
        .anatomy-diagram {
          margin-bottom: 28px;
        }
        .diagram-bar {
          display: flex;
          height: 48px;
          border-radius: var(--radius-sm);
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          margin-bottom: 10px;
        }
        .bar-segment {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 600;
          text-align: center;
          padding: 0 8px;
        }
        .bar-segment.blouse-part {
          width: 14%;
          background: #C58B38;
          color: #ffffff;
        }
        .bar-segment.body-part {
          width: 66%;
          background: #581E15;
          color: #ffffff;
        }
        .bar-segment.pallu-part {
          width: 20%;
          background: #822A1F;
          color: #ffffff;
        }
        .diagram-caption {
          font-size: 13px;
          color: var(--brand-muted);
          text-align: center;
        }

        .specs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 18px;
          margin-bottom: 32px;
        }
        .spec-card {
          background: var(--brand-background);
          border: 1px solid var(--brand-border);
          border-radius: var(--radius-sm);
          padding: 20px;
        }
        .spec-card h4 {
          font-size: 14px;
          color: var(--brand-muted);
          margin: 0 0 6px;
        }
        .spec-val {
          font-family: var(--font-display);
          font-size: 20px;
          font-weight: 700;
          color: var(--brand-primary);
          margin-bottom: 8px;
        }
        .spec-card p {
          font-size: 13px;
          color: var(--brand-text);
          line-height: 1.5;
          margin: 0;
        }

        .cutting-instructions h3 {
          font-family: var(--font-display);
          font-size: 18px;
          color: var(--brand-text);
          margin: 0 0 16px;
        }
        .styled-steps {
          margin: 0;
          padding-left: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          font-size: 14.5px;
          line-height: 1.6;
          color: var(--brand-text);
        }

        /* Authenticity list */
        .auth-features-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 28px;
        }
        .auth-feature-row {
          display: flex;
          gap: 18px;
          align-items: flex-start;
          background: var(--brand-background);
          border: 1px solid var(--brand-border);
          border-radius: var(--radius-sm);
          padding: 20px;
        }
        .auth-icon-badge {
          width: 40px;
          height: 40px;
          background: rgba(176, 115, 46, 0.15);
          color: var(--brand-primary);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .auth-icon-badge svg {
          width: 20px;
          height: 20px;
        }
        .auth-feature-row h4 {
          font-size: 16px;
          font-weight: 600;
          color: var(--brand-text);
          margin: 0 0 6px;
        }
        .auth-feature-row p {
          font-size: 14px;
          color: var(--brand-muted);
          line-height: 1.6;
          margin: 0;
        }

        .heritage-quote {
          background: linear-gradient(135deg, #FAF6F1 0%, #F5ECE0 100%);
          border-left: 4px solid var(--brand-primary);
          padding: 24px;
          border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
          text-align: center;
        }
        .heritage-quote p {
          font-family: var(--font-script);
          font-size: 20px;
          font-style: italic;
          color: var(--brand-primary);
          line-height: 1.6;
          margin: 0 0 8px;
        }
        .heritage-quote span {
          font-size: 12.5px;
          font-weight: 600;
          letter-spacing: 0.5px;
          color: var(--brand-secondary);
          text-transform: uppercase;
        }

        /* Flow steps */
        .flow-steps-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 18px;
        }
        .flow-card {
          background: var(--brand-background);
          border: 1px solid var(--brand-border);
          border-radius: var(--radius-sm);
          padding: 22px;
          position: relative;
        }
        .step-tag {
          font-size: 11px;
          font-weight: 700;
          color: var(--brand-secondary);
          background: rgba(176, 115, 46, 0.12);
          display: inline-block;
          padding: 2px 8px;
          border-radius: 4px;
          margin-bottom: 10px;
        }
        .flow-card h4 {
          font-size: 15.5px;
          font-weight: 600;
          color: var(--brand-text);
          margin: 0 0 8px;
        }
        .flow-card p {
          font-size: 13.5px;
          color: var(--brand-muted);
          line-height: 1.6;
          margin: 0;
        }
        .flow-card a {
          color: var(--brand-primary);
          font-weight: 500;
        }

        /* Concierge Banner */
        .concierge-box {
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
        .concierge-text h3 {
          font-family: var(--font-display);
          font-size: 20px;
          font-weight: 600;
          color: var(--brand-primary);
          margin: 0 0 6px;
        }
        .concierge-text p {
          margin: 0;
          font-size: 14px;
          color: var(--brand-muted);
          max-width: 600px;
        }
        .concierge-buttons {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }
        .btn-wa {
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
        .btn-wa:hover {
          background: var(--maroon-800);
        }
        .btn-wa svg {
          width: 16px;
          height: 16px;
        }
        .btn-shop {
          display: inline-flex;
          align-items: center;
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
        .btn-shop:hover {
          border-color: var(--brand-primary);
          color: var(--brand-primary);
        }

        .animate-fade {
          animation: fadeIn 0.3s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .guide-tabs {
            padding: 4px;
          }
          .guide-tab-btn {
            font-size: 13px;
            padding: 10px 12px;
          }
          .guide-card {
            padding: 24px 18px;
          }
          .concierge-box {
            padding: 24px 20px;
          }
          .concierge-buttons {
            width: 100%;
          }
          .btn-wa, .btn-shop {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
