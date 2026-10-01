import { Router } from 'express';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { OAuth2Client } from 'google-auth-library';
import { query } from '../db.js';
import { signToken, requireAuth } from '../middleware/auth.js';
import { sendLoginEmail, sendPasswordResetEmail } from '../lib/email.js';
import { authApiRateLimiter, checkLoginLockout, recordFailedLogin, recordSuccessfulLogin } from '../middleware/rateLimiter.js';

const router = Router();
const ADMIN_EMAILS = [
  (process.env.ADMIN_EMAIL || '').toLowerCase(),
  'ravichandratextiles39@gmail.com',
  'admin@ravichandratextiles.com',
  'admin@srikala.com',
].filter(Boolean);
const RESET_TOKEN_TTL_MS = 30 * 60 * 1000; // 30 minutes
// A link inside an email needs exactly ONE url — CLIENT_URL can be a
// comma-separated list of allowed CORS origins, so only the first is used
// here (same approach already used for the other emailed links).
const SITE_URL = (process.env.CLIENT_URL || 'http://localhost:5173').split(',')[0].trim();
const googleClient = process.env.GOOGLE_CLIENT_ID ? new OAuth2Client(process.env.GOOGLE_CLIENT_ID) : null;

router.post('/signup', async (req, res) => {
  const { name, email, password, mobile } = req.body || {};
  if (!name?.trim() || !email?.trim() || !password || password.length < 6) {
    return res.status(400).json({ error: 'Name, email and a password (6+ chars) are required.' });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const existing = await query('SELECT id FROM users WHERE email = $1', [normalizedEmail]);
  if (existing.rows.length) {
    return res.status(409).json({ error: 'An account with this email already exists.' });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const isAdmin = ADMIN_EMAILS.includes(normalizedEmail);

  const { rows } = await query(
    `INSERT INTO users (name, email, password_hash, mobile, is_admin)
     VALUES ($1,$2,$3,$4,$5) RETURNING id, name, email, mobile, is_admin`,
    [name.trim(), normalizedEmail, passwordHash, mobile || null, isAdmin]
  );

  const user = rows[0];
  const token = signToken(user);
  res.status(201).json({ token, user: publicUser(user) });
});

router.post('/login', authApiRateLimiter, checkLoginLockout, async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'Email and password are required.' });

  const normalizedEmail = email.trim().toLowerCase();
  const { rows } = await query('SELECT * FROM users WHERE email = $1', [normalizedEmail]);
  const user = rows[0];

  if (!user) {
    const { isLocked, remainingAttempts } = await recordFailedLogin(req, normalizedEmail);
    if (isLocked) {
      return res.status(429).json({
        error: 'Security Alert: Too many failed login attempts. Your account has been temporarily locked for 15 minutes to protect against brute-force attacks.',
        locked: true,
      });
    }
    return res.status(401).json({
      error: `Invalid email or password.${remainingAttempts <= 3 ? ` (${remainingAttempts} attempt${remainingAttempts === 1 ? '' : 's'} remaining before temporary account lock)` : ''}`,
    });
  }

  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) {
    const { isLocked, remainingAttempts } = await recordFailedLogin(req, normalizedEmail);
    if (isLocked) {
      return res.status(429).json({
        error: 'Security Alert: Too many failed login attempts. Your account has been temporarily locked for 15 minutes to protect against brute-force attacks.',
        locked: true,
      });
    }
    return res.status(401).json({
      error: `Invalid email or password.${remainingAttempts <= 3 ? ` (${remainingAttempts} attempt${remainingAttempts === 1 ? '' : 's'} remaining before temporary account lock)` : ''}`,
    });
  }

  // Reset failed login tracking on success
  recordSuccessfulLogin(req, normalizedEmail);

  const token = signToken(user);

  // Fire-and-forget: don't make the user wait on email delivery to log in.
  sendLoginEmail(user).catch(() => {});

  res.json({ token, user: publicUser(user) });
});

// Sign in (or sign up, on first use) with Google. The frontend uses Google
// Identity Services to get an ID token directly in the browser — that
// token is verified here against Google's own keys before we trust
// anything in it, so a forged/tampered token is rejected before it ever
// reaches a database query.
router.post('/google', async (req, res) => {
  const clientId = (process.env.GOOGLE_CLIENT_ID || '').trim();
  if (!clientId) {
    return res.status(503).json({ error: 'Google sign-in is not configured yet. Server is missing GOOGLE_CLIENT_ID.' });
  }
  const { credential } = req.body || {};
  if (!credential) return res.status(400).json({ error: 'Missing Google credential.' });

  let payload;
  try {
    const client = new OAuth2Client(clientId);
    const ticket = await client.verifyIdToken({ idToken: credential, audience: clientId });
    payload = ticket.getPayload();
  } catch (err) {
    console.error('[auth/google] verification failed:', err?.message || err);
    return res.status(401).json({ error: 'Could not verify Google sign-in. Please try again.' });
  }
  if (!payload?.email || !payload.email_verified) {
    return res.status(401).json({ error: 'Your Google account email is not verified.' });
  }

  const normalizedEmail = payload.email.toLowerCase();
  const { rows } = await query('SELECT * FROM users WHERE email = $1', [normalizedEmail]);
  let user = rows[0];

  const isAdmin = ADMIN_EMAILS.includes(normalizedEmail);

  if (!user) {
    const randomPasswordHash = await bcrypt.hash(crypto.randomBytes(32).toString('hex'), 10);
    const insert = await query(
      `INSERT INTO users (name, email, password_hash, google_id, is_admin)
       VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [payload.name?.trim() || normalizedEmail.split('@')[0], normalizedEmail, randomPasswordHash, payload.sub, isAdmin]
    );
    user = insert.rows[0];
  } else {
    const promoteAdmin = Boolean(user.is_admin || isAdmin);
    const update = await query(
      'UPDATE users SET google_id = COALESCE(google_id, $1), is_admin = $2 WHERE id = $3 RETURNING *',
      [payload.sub, promoteAdmin, user.id]
    );
    user = update.rows[0];
  }

  const token = signToken(user);
  const profileStatus = await checkProfileComplete(user);
  res.json({
    token,
    user: publicUser(user),
    needsProfile: !profileStatus.isComplete,
    needsMobile: !user.mobile,
    defaultAddress: profileStatus.defaultAddress,
  });
});


// Always responds the same way whether or not the email is registered —
// otherwise the response itself would let someone check which emails have
// an account (a common "user enumeration" issue with forgot-password
// endpoints).
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body || {};
  if (!email?.trim()) return res.status(400).json({ error: 'Email is required.' });

  const normalizedEmail = email.trim().toLowerCase();
  const { rows } = await query('SELECT id, name, email FROM users WHERE email = $1', [normalizedEmail]);
  const user = rows[0];

  if (user) {
    const rawToken = crypto.randomBytes(32).toString('hex');
    const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');
    const expiresAt = new Date(Date.now() + RESET_TOKEN_TTL_MS);

    // Only one live reset link per account at a time — clears out any
    // earlier request before issuing a new one.
    await query('DELETE FROM password_resets WHERE user_id = $1', [user.id]);
    await query(
      'INSERT INTO password_resets (user_id, token_hash, expires_at) VALUES ($1,$2,$3)',
      [user.id, tokenHash, expiresAt]
    );

    const resetUrl = `${SITE_URL}/reset-password?token=${rawToken}`;
    sendPasswordResetEmail(user, resetUrl).catch(() => {});
  }

  res.json({ ok: true, message: "If an account exists for that email, we've sent a password reset link." });
});

router.post('/reset-password', async (req, res) => {
  const { token, newPassword } = req.body || {};
  if (!token || !newPassword) return res.status(400).json({ error: 'Reset token and new password are required.' });
  if (newPassword.length < 6) return res.status(400).json({ error: 'New password must be at least 6 characters.' });

  const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
  const { rows } = await query(
    `SELECT pr.id, pr.user_id, pr.expires_at, pr.used_at
     FROM password_resets pr WHERE pr.token_hash = $1`,
    [tokenHash]
  );
  const reset = rows[0];
  if (!reset || reset.used_at || new Date(reset.expires_at) < new Date()) {
    return res.status(400).json({ error: 'This reset link is invalid or has expired. Please request a new one.' });
  }

  const passwordHash = await bcrypt.hash(newPassword, 10);
  await query('UPDATE users SET password_hash = $1 WHERE id = $2', [passwordHash, reset.user_id]);
  await query('UPDATE password_resets SET used_at = now() WHERE id = $1', [reset.id]);
  // Any other outstanding reset link for this account is invalidated too,
  // so an old emailed link can't still be used after this one succeeds.
  await query('DELETE FROM password_resets WHERE user_id = $1 AND id != $2', [reset.user_id, reset.id]);

  const { rows: userRows } = await query('SELECT id, name, email, mobile, is_admin FROM users WHERE id = $1', [reset.user_id]);
  const user = userRows[0];
  const authToken = signToken(user);
  res.json({ ok: true, token: authToken, user: publicUser(user) });
});

router.get('/me', requireAuth, async (req, res) => {
  const { rows } = await query('SELECT id, name, email, mobile, is_admin FROM users WHERE id = $1', [req.user.id]);
  const user = rows[0];
  if (!user) return res.status(404).json({ error: 'User not found.' });
  const profileStatus = await checkProfileComplete(user);
  res.json({
    user: publicUser(user),
    needsProfile: !profileStatus.isComplete,
    defaultAddress: profileStatus.defaultAddress,
  });
});

router.put('/me', requireAuth, async (req, res) => {
  const { name, mobile } = req.body || {};
  const { rows } = await query(
    'UPDATE users SET name = COALESCE($1, name), mobile = COALESCE($2, mobile) WHERE id = $3 RETURNING id, name, email, mobile, is_admin',
    [name?.trim() || null, mobile?.trim() || null, req.user.id]
  );
  const user = rows[0];
  const profileStatus = await checkProfileComplete(user);
  res.json({
    user: publicUser(user),
    needsProfile: !profileStatus.isComplete,
    defaultAddress: profileStatus.defaultAddress,
  });
});

// POST /api/auth/complete-profile — enforces mandatory details:
// Full name, mobile/phone, address line1, city, state, pincode, country
router.post('/complete-profile', requireAuth, async (req, res) => {
  const { name, mobile, line1, line2, city, state, pincode, country } = req.body || {};
  if (!name?.trim() || !mobile?.trim() || !line1?.trim() || !city?.trim() || !state?.trim() || !pincode?.trim()) {
    return res.status(400).json({ error: 'Full name, mobile number, address, city, state and pincode are required.' });
  }

  // Update user name and mobile
  const userResult = await query(
    'UPDATE users SET name = $1, mobile = $2 WHERE id = $3 RETURNING id, name, email, mobile, is_admin',
    [name.trim(), mobile.trim(), req.user.id]
  );
  const updatedUser = userResult.rows[0];

  // Check if user already has an address; if yes, update default, otherwise insert
  const { rows: existingAddrs } = await query(
    'SELECT id FROM addresses WHERE user_id = $1 ORDER BY is_default DESC, id DESC LIMIT 1',
    [req.user.id]
  );

  let address;
  if (existingAddrs.length) {
    const updateAddr = await query(
      `UPDATE addresses SET
         name = $1, mobile = $2, line1 = $3, line2 = $4, city = $5, state = $6, pincode = $7,
         country = $8, is_default = TRUE, updated_at = now()
       WHERE id = $9 AND user_id = $10 RETURNING *`,
      [name.trim(), mobile.trim(), line1.trim(), line2?.trim() || null, city.trim(), state.trim(), pincode.trim(), country?.trim() || 'India', existingAddrs[0].id, req.user.id]
    );
    address = updateAddr.rows[0];
  } else {
    const insertAddr = await query(
      `INSERT INTO addresses (user_id, name, mobile, line1, line2, city, state, pincode, country, is_default)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, TRUE) RETURNING *`,
      [req.user.id, name.trim(), mobile.trim(), line1.trim(), line2?.trim() || null, city.trim(), state.trim(), pincode.trim(), country?.trim() || 'India']
    );
    address = insertAddr.rows[0];
  }

  res.json({
    ok: true,
    user: publicUser(updatedUser),
    needsProfile: false,
    defaultAddress: address,
  });
});

router.post('/change-password', requireAuth, async (req, res) => {
  const { currentPassword, newPassword } = req.body || {};
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Current and new password are required.' });
  }
  if (newPassword.length < 6) {
    return res.status(400).json({ error: 'New password must be at least 6 characters.' });
  }

  const { rows } = await query('SELECT * FROM users WHERE id = $1', [req.user.id]);
  const user = rows[0];
  if (!user) return res.status(404).json({ error: 'User not found.' });

  const ok = await bcrypt.compare(currentPassword, user.password_hash);
  if (!ok) return res.status(401).json({ error: 'Current password is incorrect.' });

  const newHash = await bcrypt.hash(newPassword, 10);
  await query('UPDATE users SET password_hash = $1 WHERE id = $2', [newHash, req.user.id]);
  res.json({ ok: true });
});

// --- Addresses ---
router.get('/addresses', requireAuth, async (req, res) => {
  const { rows } = await query(
    'SELECT * FROM addresses WHERE user_id = $1 ORDER BY is_default DESC, id DESC',
    [req.user.id]
  );
  res.json({ addresses: rows });
});

router.post('/addresses', requireAuth, async (req, res) => {
  const { name, mobile, line1, line2, city, state, pincode, country, isDefault } = req.body || {};
  if (!name?.trim() || !mobile?.trim() || !line1?.trim() || !city?.trim() || !pincode?.trim()) {
    return res.status(400).json({ error: 'Name, mobile, address, city and pincode are required.' });
  }

  const { rows: countRows } = await query('SELECT COUNT(*)::int as count FROM addresses WHERE user_id = $1', [req.user.id]);
  const shouldBeDefault = Boolean(isDefault || countRows[0]?.count === 0);

  if (shouldBeDefault) {
    await query('UPDATE addresses SET is_default = FALSE WHERE user_id = $1', [req.user.id]);
  }

  const { rows } = await query(
    `INSERT INTO addresses (user_id, name, mobile, line1, line2, city, state, pincode, country, is_default)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
    [
      req.user.id,
      name.trim(),
      mobile.trim(),
      line1.trim(),
      line2?.trim() || null,
      city.trim(),
      state?.trim() || '',
      pincode.trim(),
      country?.trim() || 'India',
      shouldBeDefault,
    ]
  );
  res.status(201).json({ address: rows[0] });
});

router.put('/addresses/:id', requireAuth, async (req, res) => {
  const { name, mobile, line1, line2, city, state, pincode, country, isDefault } = req.body || {};
  const { rows: existing } = await query('SELECT * FROM addresses WHERE id = $1 AND user_id = $2', [req.params.id, req.user.id]);
  if (!existing[0]) return res.status(404).json({ error: 'Address not found.' });

  if (isDefault) {
    await query('UPDATE addresses SET is_default = FALSE WHERE user_id = $1', [req.user.id]);
  }

  const { rows } = await query(
    `UPDATE addresses SET
       name = COALESCE($1, name),
       mobile = COALESCE($2, mobile),
       line1 = COALESCE($3, line1),
       line2 = COALESCE($4, line2),
       city = COALESCE($5, city),
       state = COALESCE($6, state),
       pincode = COALESCE($7, pincode),
       country = COALESCE($8, country),
       is_default = COALESCE($9, is_default),
       updated_at = now()
     WHERE id = $10 AND user_id = $11 RETURNING *`,
    [
      name?.trim() || null,
      mobile?.trim() || null,
      line1?.trim() || null,
      line2 !== undefined ? line2?.trim() || null : null,
      city?.trim() || null,
      state?.trim() || null,
      pincode?.trim() || null,
      country?.trim() || null,
      isDefault !== undefined ? Boolean(isDefault) : null,
      req.params.id,
      req.user.id,
    ]
  );

  res.json({ address: rows[0] });
});

router.put('/addresses/:id/default', requireAuth, async (req, res) => {
  const { rows: existing } = await query('SELECT * FROM addresses WHERE id = $1 AND user_id = $2', [req.params.id, req.user.id]);
  if (!existing[0]) return res.status(404).json({ error: 'Address not found.' });

  await query('UPDATE addresses SET is_default = FALSE WHERE user_id = $1', [req.user.id]);
  const { rows } = await query('UPDATE addresses SET is_default = TRUE WHERE id = $1 AND user_id = $2 RETURNING *', [req.params.id, req.user.id]);
  res.json({ address: rows[0] });
});

router.delete('/addresses/:id', requireAuth, async (req, res) => {
  const { rows: existing } = await query('SELECT * FROM addresses WHERE id = $1 AND user_id = $2', [req.params.id, req.user.id]);
  if (!existing[0]) return res.status(404).json({ error: 'Address not found.' });

  await query('DELETE FROM addresses WHERE id = $1 AND user_id = $2', [req.params.id, req.user.id]);

  // If the deleted address was default, set the newest remaining address as default
  if (existing[0].is_default) {
    const { rows: remaining } = await query(
      'SELECT id FROM addresses WHERE user_id = $1 ORDER BY id DESC LIMIT 1',
      [req.user.id]
    );
    if (remaining.length) {
      await query('UPDATE addresses SET is_default = TRUE WHERE id = $1', [remaining[0].id]);
    }
  }

  res.json({ ok: true });
});

async function checkProfileComplete(user) {
  if (!user || !user.name || !user.mobile) {
    return { isComplete: false, defaultAddress: null };
  }
  const { rows: addrs } = await query(
    'SELECT * FROM addresses WHERE user_id = $1 ORDER BY is_default DESC, id DESC LIMIT 1',
    [user.id]
  );
  const defaultAddress = addrs[0] || null;
  const isComplete = Boolean(
    defaultAddress &&
    defaultAddress.line1 &&
    defaultAddress.city &&
    defaultAddress.state &&
    defaultAddress.pincode
  );
  return { isComplete, defaultAddress };
}

function publicUser(u) {
  return { id: u.id, name: u.name, email: u.email, mobile: u.mobile, isAdmin: u.is_admin };
}

export default router;

