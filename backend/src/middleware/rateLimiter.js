import rateLimit from 'express-rate-limit';

// Track failed login attempts in-memory (keyed by IP and normalized email)
// Maps key -> { attempts: number, firstAttemptAt: number, lockedUntil: number | null }
const failedAttemptsMap = new Map();

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes lockout
const TRACKING_WINDOW_MS = 15 * 60 * 1000; // 15 minute sliding window

function cleanKey(ip, email) {
  return `${ip || 'unknown'}:${(email || '').trim().toLowerCase()}`;
}

// Periodic cleanup of expired entries every 10 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of failedAttemptsMap.entries()) {
    if (record.lockedUntil && record.lockedUntil < now) {
      failedAttemptsMap.delete(key);
    } else if (now - record.firstAttemptAt > TRACKING_WINDOW_MS) {
      failedAttemptsMap.delete(key);
    }
  }
}, 10 * 60 * 1000).unref?.();

/**
 * Middleware: Checks whether client IP or Email is locked out due to repeated failed attempts.
 */
export function checkLoginLockout(req, res, next) {
  const ip = req.ip || req.headers['x-forwarded-for'] || req.socket?.remoteAddress;
  const email = req.body?.email || '';
  const key = cleanKey(ip, email);
  const ipKey = `ip:${ip}`;

  const now = Date.now();
  const record = failedAttemptsMap.get(key) || failedAttemptsMap.get(ipKey);

  if (record && record.lockedUntil && record.lockedUntil > now) {
    const remainingSeconds = Math.ceil((record.lockedUntil - now) / 1000);
    const remainingMinutes = Math.ceil(remainingSeconds / 60);
    return res.status(429).json({
      error: `Security Alert: Too many failed login attempts. Your account has been temporarily locked for ${remainingMinutes} minute(s) to protect against brute-force attacks. Please try again later.`,
      locked: true,
      remainingSeconds,
    });
  }

  next();
}

/**
 * Called when a login password comparison fails.
 * Increments failed attempt count and locks out if threshold reached.
 */
export async function recordFailedLogin(req, email) {
  const ip = req.ip || req.headers['x-forwarded-for'] || req.socket?.remoteAddress;
  const key = cleanKey(ip, email);
  const now = Date.now();

  let record = failedAttemptsMap.get(key);
  if (!record || now - record.firstAttemptAt > TRACKING_WINDOW_MS) {
    record = { attempts: 1, firstAttemptAt: now, lockedUntil: null };
  } else {
    record.attempts += 1;
  }

  if (record.attempts >= MAX_FAILED_ATTEMPTS) {
    record.lockedUntil = now + LOCKOUT_DURATION_MS;
  }

  failedAttemptsMap.set(key, record);

  // Progressive delay / Tarpitting:
  // Adds 700ms - 1000ms artificial latency on bad passwords to slow down bots
  await new Promise((resolve) => setTimeout(resolve, 800));

  const remainingAttempts = Math.max(0, MAX_FAILED_ATTEMPTS - record.attempts);
  return {
    isLocked: Boolean(record.lockedUntil),
    remainingAttempts,
  };
}

/**
 * Called on successful login to reset failed counter.
 */
export function recordSuccessfulLogin(req, email) {
  const ip = req.ip || req.headers['x-forwarded-for'] || req.socket?.remoteAddress;
  const key = cleanKey(ip, email);
  failedAttemptsMap.delete(key);
  failedAttemptsMap.delete(`ip:${ip}`);
}

/**
 * General Express Rate Limiter for Authentication Endpoints.
 * Caps requests from a single IP to 30 requests per 15-minute window.
 */
export const authApiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // Limit each IP to 30 auth requests per windowMs
  standardHeaders: true, // Return standard RateLimit headers
  legacyHeaders: false,
  message: {
    error: 'Too many authentication requests from this IP address. Please wait a few minutes before trying again.',
  },
});
