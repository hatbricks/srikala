import ScrollReveal from './ScrollReveal';
import TextReveal from './TextReveal';

const COMPARISON_ROWS = [
  {
    id: 'weaving',
    label: 'Weaving',
    handloom: '100% handwoven by skilled artisans',
    machine: 'Machine-made for speed',
    icon: (
      <svg viewBox="0 0 64 64" width="28" height="28" fill="none" stroke="#581e15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 14V49M17 50V54M47 14V49M47 50V54" />
        <circle cx="17" cy="14" r="2.5" fill="none" />
        <circle cx="47" cy="14" r="2.5" fill="none" />
        <rect x="17" y="16" width="30" height="3" rx="1.5" />
        <circle cx="32" cy="14.5" r="3.5" />
        <circle cx="32" cy="14.5" r="1.2" fill="#581e15" />
        <line x1="22" y1="19" x2="22" y2="39" strokeWidth="1.4" />
        <line x1="26" y1="19" x2="26" y2="39" strokeWidth="1.4" />
        <line x1="30" y1="19" x2="30" y2="39" strokeWidth="1.4" />
        <line x1="34" y1="19" x2="34" y2="39" strokeWidth="1.4" />
        <line x1="38" y1="19" x2="38" y2="39" strokeWidth="1.4" />
        <line x1="42" y1="19" x2="42" y2="39" strokeWidth="1.4" />
        <rect x="19" y="31" width="26" height="3.5" rx="1.75" fill="#ffffff" stroke="#581e15" strokeWidth="1.8" />
        <rect x="14" y="41" width="36" height="3" rx="1.5" />
        <rect x="22" y="41" width="20" height="8" fill="#ffffff" stroke="#581e15" strokeWidth="1.8" />
        <path d="M24.5 45L26 43L27.5 45L26 47Z" fill="#581e15" stroke="none" />
        <circle cx="29" cy="45" r="0.7" fill="#581e15" />
        <path d="M32 45L33.5 43L35 45L33.5 47Z" fill="#581e15" stroke="none" />
        <circle cx="36.5" cy="45" r="0.7" fill="#581e15" />
        <path d="M39.5 45L41 43L42.5 45L41 47Z" fill="#581e15" stroke="none" />
      </svg>
    ),
  },
  {
    id: 'material',
    label: 'Fabric & Material',
    handloom: 'Pure, authentic silk for a rich, natural feel',
    machine: 'Use of blended yarns and synthetic silk that lack natural richness and longevity',
    icon: (
      <svg viewBox="0 0 64 64" width="28" height="28" fill="none" stroke="#581e15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 16C26 14 31 13 36 15C40 17 44 21 44 26C37 25 31 23 27 18" />
        <path d="M30 16L37 21M34 18L39 19" strokeWidth="1.5" />
        <path d="M22 18C21.5 19 21 21 21 23" strokeDasharray="1,2" />
        <path d="M22 24C19 28 17 37 21 44C24 49 32 50 40 46C49 41 51 28 51 22C41 24 28 22 22 24Z" />
        <path d="M24 47C28 42 34 35 50 23" strokeWidth="1.8" />
        <path d="M28 43C31 46 36 46 38 46" strokeWidth="1.4" />
        <path d="M32 38C35 42 41 43 43 42" strokeWidth="1.4" />
        <path d="M37 32C41 36 45 37 47 36" strokeWidth="1.4" />
        <path d="M29 39C26 35 24 31 23 26" strokeWidth="1.4" />
        <path d="M35 33C32 29 28 26 27 24" strokeWidth="1.4" />
        <path d="M41 28C38 25 35 23 34 23" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    id: 'craftsmanship',
    label: 'Craftsmanship',
    handloom: 'Timeless craftsmanship made to last generations',
    machine: 'Lack the soul and slight variation that make every saree one of a kind',
    icon: (
      <svg viewBox="0 0 64 64" width="28" height="28" fill="none" stroke="#581e15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="32" cy="34" r="11" strokeWidth="2" />
        <path d="M18 25C21 21 27 19 36 21C40 22 43 24 46 27" strokeWidth="1.8" />
        <path d="M44 18L48 22C50 24 49 26 47 28L18 49C16 50.5 15 50 15.5 48.5L25 29C27 25 30 24 32 26" />
        <line x1="16" y1="49" x2="22" y2="43" strokeWidth="2" />
        <ellipse cx="44.5" cy="22.5" rx="1.5" ry="2.8" transform="rotate(-45 44.5 22.5)" fill="#581e15" />
      </svg>
    ),
  },
  {
    id: 'durability',
    label: 'Durability',
    handloom: 'Stronger weaves, natural fibres and traditional techniques ensure long-lasting beauty.',
    machine: 'Lower durability with loose weaves and synthetic blend',
    icon: (
      <svg viewBox="0 0 64 64" width="28" height="28" fill="none" stroke="#581e15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M32 14L46 19.5V32C46 41 39.5 48 32 50.5C24.5 48 18 41 18 32V19.5L32 14Z" strokeWidth="2.4" />
        <path d="M32 18.5L42.5 22.8V32C42.5 39 37.5 44.5 32 46.5C26.5 44.5 21.5 39 21.5 32V22.8L32 18.5Z" strokeWidth="1.6" />
      </svg>
    ),
  },
];

export default function DifferenceSection() {
  return (
    <section className="difference-section" id="handloom-difference">
      <div className="container difference-container">
        {/* Header */}
        <div className="difference-head">
          <TextReveal as="p" direction="fade" className="eyebrow difference-eyebrow">
            THE RAVICHANDRA DIFFERENCE
          </TextReveal>
          <TextReveal as="h2" delay={0.06} direction="left" distance={24} className="difference-title">
            <em>Handwoven, Not</em> Just Made
          </TextReveal>
        </div>

        {/* Top Header Comparison Capsule */}
        <ScrollReveal delay={0.12} className="comparison-header-pill">
          <div className="comp-col comp-col-left">
            <span className="comp-eyebrow">WHAT WE DO?</span>
            <span className="comp-heading">Handloom Weave</span>
          </div>

          <div className="comp-vs" aria-hidden="true">
            <em>V/S</em>
          </div>

          <div className="comp-col comp-col-right">
            <span className="comp-eyebrow">WHAT YOU&apos;LL COMMONLY FIND?</span>
            <span className="comp-heading">Mechanical Loom</span>
          </div>
        </ScrollReveal>

        {/* Comparison Rows */}
        <div className="comparison-rows">
          {COMPARISON_ROWS.map((row, idx) => (
            <ScrollReveal key={row.id} delay={0.08 * (idx + 1)} y={18} duration={0.7} className="comp-row-card">
              {/* Left Side: Handloom (Royal Silk Crimson Maroon with Gold accents) */}
              <div className="comp-side comp-handloom">
                <span className="status-icon check-icon" aria-hidden="true">✓</span>
                <span className="comp-text">{row.handloom}</span>
              </div>

              {/* Center Icon Badge with Label */}
              <div className="comp-badge-wrapper">
                <div className="comp-badge-circle" title={row.label} aria-hidden="true">
                  {row.icon}
                </div>
                <span className="comp-badge-label">{row.label}</span>
              </div>

              {/* Right Side: Mechanical Loom (Light Neutral) */}
              <div className="comp-side comp-machine">
                <span className="comp-text">{row.machine}</span>
                <span className="status-icon cross-icon" aria-hidden="true">✕</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <style>{`
        .difference-section {
          position: relative;
          background: #faf6f0;
          background-image: 
            radial-gradient(circle at 12% 18%, rgba(197, 139, 56, 0.08) 0%, transparent 45%),
            radial-gradient(circle at 88% 82%, rgba(88, 30, 21, 0.06) 0%, transparent 45%);
          padding: 96px 0 108px;
          overflow: hidden;
          border-top: 1px solid rgba(197, 139, 56, 0.16);
          border-bottom: 1px solid rgba(197, 139, 56, 0.16);
        }

        .difference-container {
          max-width: 1080px;
          margin: 0 auto;
        }

        .difference-head {
          text-align: center;
          margin-bottom: 46px;
        }

        .difference-eyebrow {
          color: #8c3b30;
          letter-spacing: 0.22em;
          font-size: 11.5px;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .difference-title {
          font-family: var(--font-display, 'Marcellus', serif);
          font-size: 44px;
          line-height: 1.15;
          color: #2b1814;
          font-weight: 400;
          letter-spacing: -0.01em;
          margin: 0;
        }

        .difference-title em {
          font-family: var(--font-script, 'Cormorant Garamond', Georgia, serif);
          font-style: italic;
          font-weight: 500;
          color: #581e15;
          margin-right: 6px;
        }

        /* ===== TOP COMPARISON HEADER PILL ===== */
        .comparison-header-pill {
          background: #ffffff;
          border-radius: 999px;
          border: 1px solid rgba(225, 210, 195, 0.7);
          box-shadow: 0 4px 20px rgba(88, 30, 21, 0.05);
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          padding: 16px 44px;
          margin-bottom: 34px;
        }

        .comp-col {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .comp-col-left {
          text-align: center;
        }

        .comp-col-right {
          text-align: center;
        }

        .comp-eyebrow {
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 0.12em;
          color: #8a736c;
          text-transform: uppercase;
        }

        .comp-heading {
          font-family: var(--font-body, 'Poppins', sans-serif);
          font-size: 17px;
          font-weight: 600;
          color: #2b1814;
          letter-spacing: -0.01em;
        }

        .comp-col-left .comp-heading {
          color: #581e15;
        }

        .comp-vs {
          padding: 0 24px;
        }

        .comp-vs em {
          font-family: var(--font-script, 'Cormorant Garamond', Georgia, serif);
          font-style: italic;
          font-size: 22px;
          font-weight: 600;
          color: #b0732e;
        }

        /* ===== COMPARISON ROWS ===== */
        .comparison-rows {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .comp-row-card {
          position: relative;
          background: #ffffff;
          border-radius: 999px;
          border: 1px solid rgba(225, 210, 195, 0.75);
          box-shadow: 0 6px 26px rgba(88, 30, 21, 0.06);
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 74px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .comp-row-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 34px rgba(88, 30, 21, 0.11);
        }

        .comp-side {
          display: flex;
          align-items: center;
          padding: 18px 48px;
          line-height: 1.45;
          position: relative;
        }

        /* Left Side: Handloom (Royal Silk Crimson Maroon with Zari Shimmer) */
        .comp-handloom {
          background: linear-gradient(135deg, #6c241a 0%, #581e15 100%);
          color: #ffffff;
          border-radius: 999px 0 0 999px;
          padding-right: 56px;
          padding-left: 32px;
          gap: 14px;
          box-shadow: inset 0 1px 0 rgba(251, 223, 162, 0.25);
        }

        .comp-handloom .comp-text {
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.01em;
          color: #ffffff;
        }

        .check-icon {
          font-size: 15px;
          font-weight: 700;
          color: #fbdfa2;
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        /* Right Side: Machine Loom */
        .comp-machine {
          background: #ffffff;
          color: #3b2a24;
          border-radius: 0 999px 999px 0;
          padding-left: 56px;
          padding-right: 32px;
          justify-content: flex-end;
          gap: 14px;
          text-align: right;
        }

        .comp-machine .comp-text {
          font-size: 13.5px;
          font-weight: 400;
          color: #44322c;
          line-height: 1.45;
        }

        .cross-icon {
          font-size: 13px;
          font-weight: 700;
          color: #6a534c;
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        /* Center Icon Badge */
        .comp-badge-wrapper {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 3;
          pointer-events: none;
        }

        .comp-badge-circle {
          width: 58px;
          height: 58px;
          background: #ffffff;
          border-radius: 50%;
          border: 1.5px solid rgba(197, 139, 56, 0.4);
          box-shadow: 0 4px 18px rgba(88, 30, 21, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease, border-color 0.3s ease;
        }

        .comp-row-card:hover .comp-badge-circle {
          transform: scale(1.06);
          border-color: #c58b38;
        }

        .comp-badge-label {
          position: absolute;
          top: calc(100% + 4px);
          white-space: nowrap;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: #581e15;
          background: #faf6f0;
          padding: 1px 8px;
          border-radius: 999px;
          border: 1px solid rgba(197, 139, 56, 0.22);
        }

        /* ===== RESPONSIVE BREAKPOINTS ===== */
        @media (max-width: 900px) {
          .comparison-header-pill {
            padding: 14px 20px;
          }

          .comp-heading {
            font-size: 15px;
          }

          .comp-side {
            padding: 16px 36px;
          }

          .comp-handloom {
            padding-left: 20px;
            padding-right: 42px;
          }

          .comp-machine {
            padding-left: 42px;
            padding-right: 20px;
          }

          .comp-handloom .comp-text,
          .comp-machine .comp-text {
            font-size: 13px;
          }
        }

        @media (max-width: 720px) {
          .difference-section {
            padding: 64px 0 76px;
          }

          .difference-title {
            font-size: 30px;
          }

          .comparison-header-pill {
            grid-template-columns: 1fr;
            gap: 12px;
            border-radius: 20px;
            text-align: center;
            padding: 18px 16px;
          }

          .comp-vs {
            padding: 4px 0;
          }

          .comp-row-card {
            grid-template-columns: 1fr;
            border-radius: 24px;
            overflow: hidden;
            min-height: auto;
          }

          .comp-handloom {
            border-radius: 24px 24px 0 0;
            padding: 18px 20px 24px;
          }

          .comp-machine {
            border-radius: 0 0 24px 24px;
            padding: 24px 20px 18px;
            text-align: left;
            justify-content: space-between;
          }

          .comp-machine .cross-icon {
            order: -1;
          }

          .comp-badge-wrapper {
            position: static;
            transform: none;
            margin: -24px auto -12px;
          }

          .comp-badge-label {
            position: static;
            margin-top: 4px;
            background: transparent;
            border: none;
          }
        }
      `}</style>
    </section>
  );
}
