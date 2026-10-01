import { useEffect, useRef, useState } from 'react';

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '548296304235-m5c7pfmdh2nr4kcjteuvtq3vtnbo9m7q.apps.googleusercontent.com';

let scriptPromise = null;
function loadGoogleScript() {
  if (window.google?.accounts?.id) return Promise.resolve();
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = resolve;
      script.onerror = () => reject(new Error('Could not load Google Sign-In script.'));
      document.body.appendChild(script);
    });
  }
  return scriptPromise;
}

export default function GoogleSignInButton({ onCredential, onError, text = 'continue_with', adminMode = false }) {
  const buttonRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [configMissing, setConfigMissing] = useState(!CLIENT_ID);
  const [showConfigModal, setShowConfigModal] = useState(false);

  useEffect(() => {
    if (!CLIENT_ID) {
      setConfigMissing(true);
      return;
    }

    let cancelled = false;

    loadGoogleScript()
      .then(() => {
        if (cancelled || !buttonRef.current) return;
        window.google.accounts.id.initialize({
          client_id: CLIENT_ID,
          callback: (response) => {
            if (response?.credential) {
              onCredential?.(response.credential);
            }
          },
          auto_select: false,
        });

        window.google.accounts.id.renderButton(buttonRef.current, {
          theme: 'outline',
          size: 'large',
          width: 320,
          text: text,
          shape: 'pill',
          logo_alignment: 'left',
        });

        setReady(true);
      })
      .catch((err) => {
        console.error('[GoogleSignInButton] load error:', err);
        onError?.(err.message);
      });

    return () => {
      cancelled = true;
    };
  }, [text, onCredential, onError]);

  function handleFallbackClick() {
    if (!CLIENT_ID) {
      setShowConfigModal(true);
    } else if (window.google?.accounts?.id) {
      try {
        window.google.accounts.id.prompt();
      } catch (e) {
        console.warn('Google prompt error:', e);
      }
    }
  }

  return (
    <div className="google-signin-wrapper">
      {/* Real Google GIS rendered button container */}
      <div
        ref={buttonRef}
        className={`gis-button-target ${ready && CLIENT_ID ? 'is-visible' : 'is-hidden'}`}
      />

      {/* Fallback button when Google script is loading or when CLIENT_ID is awaiting Vercel env variable */}
      {(!ready || !CLIENT_ID) && (
        <button
          type="button"
          className={`custom-google-btn ${adminMode ? 'admin-google-btn' : ''}`}
          onClick={handleFallbackClick}
        >
          <svg className="google-svg-icon" viewBox="0 0 24 24" width="20" height="20">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.27-2.09 3.665-5.17 3.665-9.12z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.27v3.13C3.26 21.34 7.33 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.57H1.27C.46 8.19 0 10.03 0 12s.46 3.81 1.27 5.43l4.01-3.14z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.66 1.27 6.57l4.01 3.14c.95-2.83 3.6-4.96 6.72-4.96z"
            />
          </svg>
          <span className="google-btn-text">
            {adminMode ? 'Sign In as Admin with Google' : text === 'signup_with' ? 'Sign up with Google' : 'Continue with Google'}
          </span>
        </button>
      )}

      {/* Modal shown if CLIENT_ID is not configured yet */}
      {showConfigModal && (
        <div className="google-cfg-backdrop" onClick={() => setShowConfigModal(false)}>
          <div className="google-cfg-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <h3>Google Sign-In Setup</h3>
              <button type="button" className="close-btn" onClick={() => setShowConfigModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <p>
                To enable 1-click Google Sign-In on your live store, please add your Google OAuth Client ID to your Vercel and VPS server settings.
              </p>
              <div className="cfg-steps-list">
                <div className="cfg-step">
                  <span className="step-num">1</span>
                  <span>Go to <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noreferrer">Google Cloud Console</a> &rarr; <strong>Credentials</strong>.</span>
                </div>
                <div className="cfg-step">
                  <span className="step-num">2</span>
                  <span>Create an <strong>OAuth Client ID</strong> for <strong>Web Application</strong>.</span>
                </div>
                <div className="cfg-step">
                  <span className="step-num">3</span>
                  <span>Add Authorized JavaScript Origins: <code>https://ravichandratextiles.com</code> and <code>https://www.ravichandratextiles.com</code></span>
                </div>
                <div className="cfg-step">
                  <span className="step-num">4</span>
                  <span>Copy Client ID and add to Vercel Environment Variables: <code>VITE_GOOGLE_CLIENT_ID</code></span>
                </div>
              </div>
              <button type="button" className="btn btn-primary btn-block" onClick={() => setShowConfigModal(false)}>
                Got It
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .google-signin-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          min-height: 48px;
          position: relative;
        }
        .gis-button-target.is-visible {
          display: flex;
          justify-content: center;
        }
        .gis-button-target.is-hidden {
          display: none;
        }
        .custom-google-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          width: 100%;
          max-width: 320px;
          height: 46px;
          padding: 0 20px;
          background: #ffffff;
          border: 1px solid #dadce0;
          border-radius: 999px;
          box-shadow: 0 1px 3px rgba(60, 64, 67, 0.08);
          font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: #3c4043;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .custom-google-btn:hover {
          background: #f8f9fa;
          border-color: #c6c9ce;
          box-shadow: 0 1px 4px rgba(60, 64, 67, 0.16);
        }
        .admin-google-btn {
          background: #faf6f0;
          border: 1.5px solid var(--gold-500, #c58b38);
          color: var(--maroon-900, #581e15);
          font-weight: 600;
        }
        .admin-google-btn:hover {
          background: #fdfaf4;
          box-shadow: 0 3px 12px rgba(88, 30, 21, 0.15);
        }
        .google-svg-icon {
          flex-shrink: 0;
        }

        /* Config Modal */
        .google-cfg-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.55);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          padding: 20px;
        }
        .google-cfg-modal {
          background: #ffffff;
          border-radius: 12px;
          max-width: 460px;
          width: 100%;
          padding: 24px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }
        .google-cfg-modal .modal-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
        }
        .google-cfg-modal .modal-head h3 {
          font-size: 17px;
          color: var(--maroon-900, #581e15);
          margin: 0;
        }
        .google-cfg-modal .close-btn {
          background: none;
          border: none;
          font-size: 18px;
          cursor: pointer;
          color: #888;
        }
        .google-cfg-modal .modal-body {
          font-size: 13px;
          color: #555;
          line-height: 1.5;
        }
        .cfg-steps-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin: 16px 0 20px;
        }
        .cfg-step {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 12.5px;
        }
        .step-num {
          background: var(--maroon-900, #581e15);
          color: #fff;
          font-size: 11px;
          font-weight: 700;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .cfg-step code {
          background: #f1f1f1;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 11.5px;
          color: #b0732e;
        }
        .btn-block {
          width: 100%;
          padding: 11px;
          border-radius: 6px;
        }
      `}</style>
    </div>
  );
}
