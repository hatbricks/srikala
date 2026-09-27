import { useEffect, useState } from 'react';
import { api } from '../data/api';
import BRAND from '../config/brand';

function getWhatsAppUrl(number) {
  const digits = (number || '').replace(/[^\d]/g, '');
  if (!digits) return '';
  const message = encodeURIComponent('Hello Sri Kala, I would like to inquire about your saree collection.');
  return `https://wa.me/${digits}?text=${message}`;
}

export default function WhatsAppButton() {
  const [phone, setPhone] = useState(BRAND.contact.whatsapp);

  useEffect(() => {
    api
      .getHomeSection('social_links')
      .then(({ section }) => {
        if (section?.content?.whatsapp) {
          setPhone(section.content.whatsapp);
        }
      })
      .catch(() => {});
  }, []);

  const waUrl = getWhatsAppUrl(phone);
  if (!waUrl) return null;

  return (
    <aside className="whatsapp-floating-widget" aria-label="WhatsApp Support">
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-btn"
        aria-label="Chat with Sri Kala on WhatsApp"
      >
        <span className="whatsapp-tooltip">Chat with us</span>
        <svg
          className="whatsapp-icon"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16 2C8.268 2 2 8.268 2 16c0 2.583.694 5.006 1.905 7.09L2 30l7.155-1.874A13.935 13.935 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2Zm7.11 19.986c-.297.834-1.468 1.53-2.42 1.734-.652.14-1.503.252-4.364-.935-3.658-1.517-6.02-5.234-6.202-5.476-.182-.243-1.487-1.98-1.487-3.776 0-1.796.938-2.68 1.272-3.045.333-.364.727-.455.97-.455.242 0 .484.002.696.013.224.01.523-.085.818.622.303.727 1.03 2.518 1.121 2.7.09.183.151.395.03.638-.12.242-.181.394-.363.606-.182.213-.383.475-.547.638-.182.182-.372.38-.16.744.212.364.945 1.558 2.028 2.524 1.392 1.24 2.566 1.625 2.93 1.807.364.182.576.152.788-.09.213-.243.91-1.06 1.152-1.424.243-.364.485-.304.818-.182.333.12 2.12 1 2.484 1.182.364.182.606.273.697.424.09.152.09.88-.207 1.714Z"
            fill="currentColor"
          />
        </svg>
      </a>

      <style>{`
        .whatsapp-floating-widget {
          position: fixed;
          bottom: 28px;
          right: 28px;
          z-index: 90;
        }
        .whatsapp-btn {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background: #25D366;
          color: #ffffff;
          box-shadow:
            0 8px 24px rgba(37, 211, 102, 0.4),
            0 3px 8px rgba(0, 0, 0, 0.15);
          transition: transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.28s ease, background 0.2s ease;
          animation: waPulse 3.5s infinite;
        }
        .whatsapp-btn:hover {
          background: #20bd5a;
          transform: scale(1.08) translateY(-2px);
          box-shadow:
            0 12px 30px rgba(37, 211, 102, 0.5),
            0 4px 12px rgba(0, 0, 0, 0.2);
        }
        .whatsapp-btn:active {
          transform: scale(0.96);
        }
        .whatsapp-icon {
          width: 32px;
          height: 32px;
          filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.12));
        }
        .whatsapp-tooltip {
          position: absolute;
          right: calc(100% + 14px);
          top: 50%;
          transform: translateY(-50%) translateX(6px);
          opacity: 0;
          pointer-events: none;
          white-space: nowrap;
          background: #20080b;
          color: #fbf5ef;
          font-family: var(--font-body);
          font-size: 12.5px;
          font-weight: 500;
          letter-spacing: 0.02em;
          padding: 7px 14px;
          border-radius: 999px;
          border: 1px solid rgba(197, 139, 56, 0.35);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
          transition: opacity 0.22s ease, transform 0.22s ease;
        }
        .whatsapp-tooltip::after {
          content: '';
          position: absolute;
          left: 100%;
          top: 50%;
          transform: translateY(-50%);
          border-width: 5px;
          border-style: solid;
          border-color: transparent transparent transparent #20080b;
        }
        .whatsapp-btn:hover .whatsapp-tooltip {
          opacity: 1;
          transform: translateY(-50%) translateX(0);
        }

        @keyframes waPulse {
          0% {
            box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.55), 0 8px 24px rgba(37, 211, 102, 0.35);
          }
          70% {
            box-shadow: 0 0 0 16px rgba(37, 211, 102, 0), 0 8px 24px rgba(37, 211, 102, 0.35);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(37, 211, 102, 0), 0 8px 24px rgba(37, 211, 102, 0.35);
          }
        }

        @media (max-width: 860px) {
          .whatsapp-floating-widget {
            bottom: calc(82px + env(safe-area-inset-bottom, 0px));
            right: 18px;
          }
          .whatsapp-btn {
            width: 52px;
            height: 52px;
          }
          .whatsapp-icon {
            width: 28px;
            height: 28px;
          }
          .whatsapp-tooltip {
            display: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .whatsapp-btn {
            animation: none;
            transition: none;
          }
        }
      `}</style>
    </aside>
  );
}
