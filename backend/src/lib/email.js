import { Resend } from 'resend';
import nodemailer from 'nodemailer';

// CLIENT_URL can be a comma-separated list (needed for CORS, so both the
// bare domain and the www./".in" variants are all allowed origins) — but a
// link inside an email needs exactly ONE url, so only the first entry is
// used here.
const siteUrl = (process.env.CLIENT_URL || 'http://localhost:5173').split(',')[0].trim();

function getTransporter() {
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  if (smtpUser && smtpPass) {
    const port = Number(process.env.SMTP_PORT) || 587;
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port,
      secure: port === 465,
      auth: { user: smtpUser, pass: smtpPass },
    });
  }
  return null;
}

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey && !apiKey.includes('xxxx') && apiKey.startsWith('re_')) {
    return new Resend(apiKey);
  }
  return null;
}

export function isEmailConfigured() {
  return Boolean(
    (process.env.SMTP_USER && process.env.SMTP_PASS) ||
    (process.env.RESEND_API_KEY && !process.env.RESEND_API_KEY.includes('xxxx'))
  );
}

export const emailEnabled = isEmailConfigured();

if (!emailEnabled) {
  console.warn(
    '[email] Neither SMTP (SMTP_USER/SMTP_PASS) nor RESEND_API_KEY is configured — emails will be skipped (logged to console instead)'
  );
}

async function send({ to, subject, html }) {
  const smtp = getTransporter();
  if (smtp) {
    const rawFrom = process.env.FROM_EMAIL || process.env.SMTP_USER;
    const from = rawFrom.includes('<') ? rawFrom : `Ravichandra Textiles <${rawFrom}>`;
    try {
      const info = await smtp.sendMail({ from, to, subject, html });
      console.log(`[email:smtp-sent] To: ${to} | ID: ${info.messageId}`);
      return { success: true, messageId: info.messageId, provider: 'smtp' };
    } catch (err) {
      console.error(`[email:smtp-error] To: ${to} | Error:`, err.message);
      return { error: err.message, provider: 'smtp' };
    }
  }

  const resend = getResendClient();
  if (resend) {
    const from = process.env.RESEND_FROM_EMAIL || process.env.FROM_EMAIL || "Ravichandra Textiles <onboarding@resend.dev>";
    try {
      const res = await resend.emails.send({ from, to, subject, html });
      if (res?.error) {
        console.error(`[email:resend-error] To: ${to} | Error:`, res.error.message || res.error);
        return { error: res.error.message || 'Resend delivery failed', provider: 'resend' };
      }
      console.log(`[email:resend-sent] To: ${to} | ID: ${res?.data?.id}`);
      return { success: true, id: res?.data?.id, provider: 'resend' };
    } catch (err) {
      console.error(`[email:resend-exception] To: ${to} | Error:`, err.message);
      return { error: err.message, provider: 'resend' };
    }
  }

  console.warn(`[email:skipped] No email credentials configured. To: ${to} | Subject: ${subject}`);
  return { skipped: true, error: 'No email credentials configured' };
}

// ---------------------------------------------------------------------
// Shared layout — a table-based wrapper (safest across email clients,
// including Outlook) with the Ravichandra Textiles header/footer. Every email below
// just supplies the middle "content" block.
// ---------------------------------------------------------------------

const COLORS = {
  maroon900: '#581e15',
  maroon950: '#38120c',
  gold500: '#b0732e',
  ivory: '#faf6f0',
  stone100: '#f7f3ee',
  stone200: '#ebe3db',
  ink900: '#220d0a',
  ink600: '#6e5d57',
  ink400: '#9e8e88',
};

function layout({ preheader = '', content, ctaLabel, ctaUrl }) {
  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Ravichandra Textiles</title>
  </head>
  <body style="margin:0;padding:0;background:${COLORS.stone100};font-family:Georgia,'Times New Roman',serif;">
    <!-- preheader (hidden preview text) -->
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</div>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${COLORS.stone100};padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:14px;overflow:hidden;">

            <!-- header -->
            <tr>
              <td style="background:${COLORS.maroon950};padding:28px 32px;text-align:center;">
                <span style="font-family:Georgia,'Times New Roman',serif;font-size:22px;letter-spacing:0.08em;color:${COLORS.ivory};">
                  RAVICHANDRA TEXTILES
                </span>
                <div style="font-family:Helvetica,Arial,sans-serif;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:${COLORS.gold500};margin-top:6px;">
                  Authentic Dharmavaram Pure Silk Handlooms
                </div>
              </td>
            </tr>

            <!-- content -->
            <tr>
              <td style="padding:36px 36px 8px;font-family:Helvetica,Arial,sans-serif;color:${COLORS.ink900};">
                ${content}
              </td>
            </tr>

            ${
              ctaLabel && ctaUrl
                ? `
            <tr>
              <td style="padding:8px 36px 32px;font-family:Helvetica,Arial,sans-serif;">
                <table role="presentation" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="border-radius:999px;background:${COLORS.maroon900};">
                      <a href="${ctaUrl}" style="display:inline-block;padding:13px 28px;font-size:13px;font-weight:600;color:${COLORS.ivory};text-decoration:none;border-radius:999px;letter-spacing:0.02em;">
                        ${escapeHtml(ctaLabel)}
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>`
                : ''
            }

            <!-- footer -->
            <tr>
              <td style="padding:24px 36px 30px;border-top:1px solid ${COLORS.stone200};font-family:Helvetica,Arial,sans-serif;">
                <p style="margin:0 0 4px;font-size:12px;color:${COLORS.ink400};">
                  Ravichandra Textiles &middot; 10-28, Kpt street, near Punjab National Bank, Dharmavaram 515671, Andhra Pradesh
                </p>
                <p style="margin:0;font-size:12px;color:${COLORS.ink400};">
                  Questions? Reply to this email or write to
                  <a href="mailto:ravichandratextiles39@gmail.com" style="color:${COLORS.ink400};">ravichandratextiles39@gmail.com</a>
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

// ---------------------------------------------------------------------

export function sendPasswordResetEmail(user, resetUrl) {
  const content = `
    <h1 style="font-family:Georgia,'Times New Roman',serif;font-size:22px;font-weight:400;color:${COLORS.maroon900};margin:0 0 16px;">
      Hi ${escapeHtml(user.name)},
    </h1>
    <p style="font-size:14px;line-height:1.7;color:${COLORS.ink600};margin:0 0 8px;">
      We got a request to reset the password on your Ravichandra Textiles account. Click the button below to choose a new one — this link expires in 30 minutes.
    </p>
    <p style="font-size:13px;line-height:1.7;color:${COLORS.ink400};margin:16px 0 0;">
      If you didn&rsquo;t request this, you can safely ignore this email — your password won&rsquo;t change.
    </p>
  `;

  return send({
    to: user.email,
    subject: "Reset your Ravichandra Textiles password",
    html: layout({
      preheader: `Reset your Ravichandra Textiles password — this link expires in 30 minutes.`,
      content,
      ctaLabel: 'Reset password',
      ctaUrl: resetUrl,
    }),
  });
}

export function sendLoginEmail(user) {
  const content = `
    <h1 style="font-family:Georgia,'Times New Roman',serif;font-size:22px;font-weight:400;color:${COLORS.maroon900};margin:0 0 16px;">
      Hi ${escapeHtml(user.name)},
    </h1>
    <p style="font-size:14px;line-height:1.7;color:${COLORS.ink600};margin:0 0 8px;">
      We noticed a new login to your Ravichandra Textiles account just now.
    </p>
    <p style="font-size:13px;line-height:1.7;color:${COLORS.ink400};margin:16px 0 0;">
      If this wasn&rsquo;t you, please secure your account by resetting your password right away.
    </p>
  `;

  return send({
    to: user.email,
    subject: "New login to your Ravichandra Textiles account",
    html: layout({
      preheader: `New login to your Ravichandra Textiles account`,
      content,
      ctaLabel: 'View your account',
      ctaUrl: `${siteUrl}/profile`,
    }),
  });
}

export function sendOrderConfirmationEmail(user, order, items) {
  const rows = items
    .map(
      (i) => `
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid ${COLORS.stone200};font-size:13px;color:${COLORS.ink900};">${escapeHtml(i.product_name)}</td>
        <td style="padding:10px 0;border-bottom:1px solid ${COLORS.stone200};font-size:13px;color:${COLORS.ink600};text-align:center;">${i.qty}</td>
        <td style="padding:10px 0;border-bottom:1px solid ${COLORS.stone200};font-size:13px;color:${COLORS.maroon900};font-weight:600;text-align:right;">₹${(i.price * i.qty).toLocaleString('en-IN')}</td>
      </tr>`
    )
    .join('');

  const content = `
    <h1 style="font-family:Georgia,'Times New Roman',serif;font-size:22px;font-weight:400;color:${COLORS.maroon900};margin:0 0 6px;">
      Thank you, ${escapeHtml(user.name)}!
    </h1>
    <p style="font-size:14px;line-height:1.7;color:${COLORS.ink600};margin:0 0 22px;">
      Your order <strong style="color:${COLORS.ink900};">#SK${order.id}</strong> is confirmed and payment has been received.
    </p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:18px;">
      <thead>
        <tr>
          <th align="left" style="font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:${COLORS.ink400};padding-bottom:8px;font-weight:600;">Item</th>
          <th align="center" style="font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:${COLORS.ink400};padding-bottom:8px;font-weight:600;">Qty</th>
          <th align="right" style="font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:${COLORS.ink400};padding-bottom:8px;font-weight:600;">Total</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:22px;">
      <tr>
        <td align="right" style="font-size:16px;font-weight:700;color:${COLORS.maroon900};padding-top:4px;">
          Grand total &nbsp;₹${order.subtotal.toLocaleString('en-IN')}
        </td>
      </tr>
    </table>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${COLORS.stone100};border-radius:10px;">
      <tr>
        <td style="padding:16px 18px;">
          <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:${COLORS.ink400};font-weight:600;">Shipping to</p>
          <p style="margin:0;font-size:13px;line-height:1.6;color:${COLORS.ink900};">
            ${escapeHtml(order.address_name || user.name)}<br/>
            ${escapeHtml(order.address_line1)}, ${escapeHtml(order.address_city)}, ${escapeHtml(order.address_state || '')} &mdash; ${escapeHtml(order.address_pincode)}
          </p>
        </td>
      </tr>
    </table>

    <p style="font-size:12px;color:${COLORS.ink400};margin:20px 0 0;">
      We&rsquo;ll send another update once your order ships.
    </p>
  `;

  return send({
    to: user.email,
    subject: `Order confirmed — #${order.order_number || order.id} · Ravichandra Textiles`,
    html: layout({
      preheader: `Your order #${order.order_number || order.id} is confirmed — total ₹${order.subtotal.toLocaleString('en-IN')}`,
      content,
      ctaLabel: 'View your order',
      ctaUrl: `${siteUrl}/orders`,
    }),
  });
}

export function sendCancellationEmail(user, order, { refundPercent, refundAmount, tierLabel }) {
  const payable = order.subtotal - (order.discount || 0);
  const content = `
    <h1 style="font-family:Georgia,'Times New Roman',serif;font-size:22px;font-weight:400;color:${COLORS.maroon900};margin:0 0 6px;">
      Order cancelled
    </h1>
    <p style="font-size:14px;line-height:1.7;color:${COLORS.ink600};margin:0 0 22px;">
      Hi ${escapeHtml(user.name)}, your order <strong style="color:${COLORS.ink900};">#${order.order_number || order.id}</strong> has been cancelled as requested.
    </p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${COLORS.stone100};border-radius:10px;margin-bottom:20px;">
      <tr>
        <td style="padding:16px 18px;">
          <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:${COLORS.ink400};font-weight:600;">Refund</p>
          <p style="margin:0;font-size:15px;line-height:1.6;color:${COLORS.maroon900};font-weight:700;">
            ₹${refundAmount.toLocaleString('en-IN')} <span style="font-weight:400;color:${COLORS.ink600};font-size:13px;">(${refundPercent}% of ₹${payable.toLocaleString('en-IN')} — ${escapeHtml(tierLabel)})</span>
          </p>
        </td>
      </tr>
    </table>

    <p style="font-size:12px;color:${COLORS.ink400};margin:0;">
      This refund is being processed to your original payment method via Razorpay and typically reflects within 5&ndash;7 business days. If you don&rsquo;t see it by then, feel free to reach out and we&rsquo;ll look into it.
    </p>
  `;

  return send({
    to: user.email,
    subject: `Order cancelled — #${order.order_number || order.id} · Ravichandra Textiles`,
    html: layout({
      preheader: `Your order #${order.order_number || order.id} has been cancelled — ${refundPercent}% refund (₹${refundAmount.toLocaleString('en-IN')}) is on its way.`,
      content,
      ctaLabel: 'View your orders',
      ctaUrl: `${siteUrl}/orders`,
    }),
  });
}

function escapeHtml(str = '') {
  return String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

export async function sendTestEmail(targetEmail) {
  const content = `
    <h1 style="font-family:Georgia,serif;font-size:22px;color:${COLORS.maroon900};margin:0 0 16px;">
      Ravichandra Textiles Email Test
    </h1>
    <p style="font-size:14px;line-height:1.7;color:${COLORS.ink600};margin:0 0 12px;">
      This email confirms that your store's automated mailing service is configured properly and delivering messages successfully!
    </p>
    <div style="background:${COLORS.stone100};padding:14px;border-radius:8px;font-family:monospace;font-size:12px;color:${COLORS.ink900};">
      Dispatched at: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} (IST)
    </div>
  `;

  return send({
    to: targetEmail,
    subject: `Test Email from Ravichandra Textiles Storefront`,
    html: layout({
      preheader: `Email delivery test for Ravichandra Textiles`,
      content,
      ctaLabel: 'Visit Storefront',
      ctaUrl: siteUrl,
    }),
  });
}

