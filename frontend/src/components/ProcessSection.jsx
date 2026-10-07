import { useState, useRef } from 'react';
import ScrollReveal from './ScrollReveal';
import TextReveal from './TextReveal';

const PROCESS_STEPS = [
  {
    number: '01',
    title: 'SILK SELECTION',
    description: 'Finest silk yarn are carefully selected for their strength, lustre, and purity.',
    quote: '“Only the most resilient mulberry silk fibers are chosen to ensure a drape that endures for lifetimes.”',
    time: 0,
  },
  {
    number: '02',
    title: 'HAND DYING',
    description: 'Threads are dyed in small batches using time-honoured technique.',
    quote: '“Rich earthen dyes and pure jewel pigments are infused thread by thread for unfading brilliance.”',
    time: 2,
  },
  {
    number: '03',
    title: 'LOOM PREPARATION',
    description: 'The loom is prepared with precision, setting the foundation for the weave.',
    quote: '“Thousands of warp threads are meticulously aligned on traditional pit looms with sacred precision.”',
    time: 3,
  },
  {
    number: '04',
    title: 'WEAVING PROCESS',
    description: 'Motifs are woven by hands, thread by thread, with patience and skill.',
    quote: '“Every Ravichandra saree passes through hands that have spent decades mastering the sacred Dharmavaram handloom craft.”',
    time: 4,
  },
  {
    number: '05',
    title: 'FINISHING & PRESERVATION',
    description: 'Each saree is finished with care and preserved to ensure it lasts for generations.',
    quote: '“Hand-inspected, steam-pressed, and folded with heirloom care to preserve its pure zari lustre forever.”',
    time: 6,
  },
];

export default function ProcessSection({
  eyebrow = 'OUR PROCESS',
  heading = 'Process of a Thread to',
  headingAccent = 'Heirloom',
  videoUrl = '/videos/process-craft.mp4',
  posterUrl = '/images/process-poster.jpg',
  steps = PROCESS_STEPS,
}) {
  const stepList = steps && steps.length > 0 ? steps : PROCESS_STEPS;
  const [activeStep, setActiveStep] = useState(3); // Default to Step 04 (WEAVING PROCESS)
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

  const handleStepClick = (index) => {
    setActiveStep(index);
    if (videoRef.current) {
      const targetTime = stepList[index]?.time || 0;
      if (videoRef.current.duration && targetTime < videoRef.current.duration) {
        videoRef.current.currentTime = targetTime;
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const currentStep = stepList[activeStep] || stepList[0] || {};

  return (
    <section className="process-section" id="process">
      <div className="container process-container">
        
        {/* LEFT COLUMN: Header, Video & Artisan Quote */}
        <div className="process-left">
          <div className="process-head">
            {eyebrow && (
              <TextReveal as="p" direction="fade" className="eyebrow process-eyebrow">
                {eyebrow}
              </TextReveal>
            )}
            <TextReveal as="h2" delay={0.06} direction="left" distance={28} className="process-title">
              {heading} {headingAccent && <em>{headingAccent}</em>}
            </TextReveal>
          </div>

          <ScrollReveal delay={0.12} className="process-video-card">
            <div className="video-wrapper">
              <video
                ref={videoRef}
                src={videoUrl || '/videos/process-craft.mp4'}
                poster={posterUrl || '/images/process-poster.jpg'}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="process-video"
                onClick={togglePlay}
              />
              <button
                type="button"
                className="video-toggle-badge"
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
              >
                <span className="toggle-icon">{isPlaying ? '❚❚' : '▶'}</span>
                <span className="toggle-label">{isPlaying ? 'Live Craft' : 'Play Craft'}</span>
              </button>
            </div>

            <p className="process-quote">
              {currentStep.quote}
            </p>
          </ScrollReveal>
        </div>

        {/* CENTER DIVIDER with dynamic active marker dot */}
        <div className="process-divider" aria-hidden="true">
          <div
            className="divider-dot"
            style={{
              top: `calc(${activeStep} * 20% + 10%)`,
            }}
          />
        </div>

        {/* RIGHT COLUMN: Interactive Step Sequence */}
        <div className="process-right">
          <div className="process-steps-list" role="tablist" aria-label="Crafting Process Steps">
            {stepList.map((step, idx) => {
              const isActive = idx === activeStep;
              return (
                <div
                  key={step.number}
                  role="tab"
                  tabIndex={0}
                  aria-selected={isActive}
                  className={`process-step-item ${isActive ? 'active' : ''}`}
                  onClick={() => handleStepClick(idx)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleStepClick(idx);
                    }
                  }}
                >
                  <span className="step-num">{step.number}</span>
                  <span className="step-dash" aria-hidden="true" />
                  <div className="step-content">
                    <h3 className="step-title">{step.title}</h3>
                    <p className="step-desc">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      <style>{`
        .process-section {
          position: relative;
          background: #f7f2ed;
          padding: 96px 0 104px;
          overflow: hidden;
          border-top: 1px solid rgba(197, 139, 56, 0.15);
          border-bottom: 1px solid rgba(197, 139, 56, 0.15);
        }

        .process-container {
          position: relative;
          display: grid;
          grid-template-columns: 1fr 32px 1.12fr;
          gap: 36px;
          align-items: center;
        }

        /* ===== LEFT COLUMN ===== */
        .process-left {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .process-eyebrow {
          color: #8c3b30;
          letter-spacing: 0.22em;
          font-size: 11.5px;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .process-title {
          font-family: var(--font-display, 'Marcellus', serif);
          font-size: 42px;
          line-height: 1.15;
          color: #2b1814;
          font-weight: 400;
          letter-spacing: -0.01em;
          margin: 0;
        }

        .process-title em {
          font-family: var(--font-script, 'Cormorant Garamond', Georgia, serif);
          font-style: italic;
          font-weight: 500;
          color: #581e15;
          letter-spacing: normal;
        }

        .process-video-card {
          margin-top: 10px;
        }

        .video-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 0.94;
          max-height: 480px;
          border-radius: 22px;
          overflow: hidden;
          box-shadow: 0 16px 42px rgba(43, 24, 20, 0.12), 0 2px 8px rgba(0, 0, 0, 0.04);
          background: #241410;
        }

        .process-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          cursor: pointer;
        }

        .video-toggle-badge {
          position: absolute;
          bottom: 16px;
          left: 16px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 7px 14px;
          background: rgba(32, 12, 8, 0.75);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(251, 223, 162, 0.35);
          border-radius: 999px;
          color: #fff6e0;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.04em;
          cursor: pointer;
          transition: background 0.25s ease, transform 0.2s ease;
          z-index: 2;
        }

        .video-toggle-badge:hover {
          background: rgba(88, 30, 21, 0.9);
          transform: scale(1.03);
        }

        .toggle-icon {
          font-size: 10px;
          color: #fbdfa2;
        }

        .process-quote {
          margin: 18px 0 0;
          font-family: var(--font-script, 'Cormorant Garamond', Georgia, serif);
          font-style: italic;
          font-size: 16.5px;
          line-height: 1.6;
          color: #5e4640;
          max-width: 520px;
          min-height: 48px;
          transition: opacity 0.3s ease;
        }

        /* ===== CENTER DIVIDER ===== */
        .process-divider {
          position: relative;
          height: 82%;
          width: 1px;
          background: rgba(180, 130, 90, 0.22);
          margin: auto;
        }

        .divider-dot {
          position: absolute;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #8b261d;
          box-shadow: 0 0 0 4px rgba(139, 38, 29, 0.16);
          transition: top 0.45s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        /* ===== RIGHT COLUMN (STEPS) ===== */
        .process-right {
          display: flex;
          flex-direction: column;
        }

        .process-steps-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .process-step-item {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 16px 20px;
          border-radius: 20px;
          background: transparent;
          cursor: pointer;
          transition: all 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
          border: 1px solid transparent;
          outline: none;
        }

        .process-step-item:hover:not(.active) {
          background: rgba(255, 255, 255, 0.45);
          transform: translateX(4px);
        }

        .process-step-item:focus-visible {
          box-shadow: 0 0 0 2px #8b261d;
        }

        /* Active Step Pill Card (as shown in reference image) */
        .process-step-item.active {
          background: #ffffff;
          box-shadow: 0 12px 32px rgba(60, 24, 16, 0.08), 0 2px 6px rgba(0, 0, 0, 0.02);
          border-color: rgba(230, 215, 195, 0.7);
          transform: translateX(6px);
        }

        .step-num {
          font-family: var(--font-display, 'Marcellus', serif);
          font-size: 30px;
          line-height: 1;
          color: #38241e;
          font-weight: 400;
          min-width: 38px;
          transition: color 0.3s ease;
        }

        .process-step-item.active .step-num {
          color: #581e15;
          font-weight: 500;
        }

        .step-dash {
          width: 32px;
          height: 1px;
          background: rgba(140, 95, 65, 0.35);
          flex-shrink: 0;
          transition: width 0.3s ease, background 0.3s ease;
        }

        .process-step-item.active .step-dash {
          width: 38px;
          background: #8b261d;
        }

        .step-content {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .step-title {
          font-family: var(--font-body, 'Poppins', sans-serif);
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #2b1814;
          margin: 0;
          transition: color 0.3s ease;
        }

        .process-step-item.active .step-title {
          color: #581e15;
        }

        .step-desc {
          font-size: 13.5px;
          line-height: 1.55;
          color: #6a534c;
          margin: 0;
        }

        /* ===== RESPONSIVE BREAKPOINTS ===== */
        @media (max-width: 980px) {
          .process-container {
            grid-template-columns: 1fr;
            gap: 48px;
          }

          .process-divider {
            display: none;
          }

          .process-title {
            font-size: 34px;
          }

          .video-wrapper {
            max-height: 380px;
          }

          .process-step-item.active {
            transform: none;
          }
        }

        @media (max-width: 600px) {
          .process-section {
            padding: 64px 0 72px;
          }

          .process-title {
            font-size: 27px;
          }

          .video-wrapper {
            border-radius: 16px;
            aspect-ratio: 16 / 11;
          }

          .process-step-item {
            padding: 14px 16px;
            gap: 14px;
            border-radius: 16px;
          }

          .step-num {
            font-size: 24px;
            min-width: 30px;
          }

          .step-dash {
            width: 20px;
          }

          .step-title {
            font-size: 12px;
          }

          .step-desc {
            font-size: 12.5px;
          }
        }
      `}</style>
    </section>
  );
}
