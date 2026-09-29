import Razorpay from 'razorpay';
import crypto from 'crypto';

const keyId = process.env.RAZORPAY_KEY_ID;
const keySecret = process.env.RAZORPAY_KEY_SECRET;

export const razorpayEnabled = Boolean(keyId && keySecret && !keyId.includes('xxxx'));

export const razorpay = razorpayEnabled
  ? new Razorpay({ key_id: keyId, key_secret: keySecret })
  : null;

if (!razorpayEnabled) {
  console.warn(
    '[razorpay] RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET not set — payment endpoints will return an error until you add real keys to .env'
  );
}

// Verifies the signature Razorpay sends back after a successful checkout.
// This is the step that actually proves the payment is genuine — never mark
// an order paid without it.
export function verifyPaymentSignature({ orderId, paymentId, signature }) {
  const expected = crypto
    .createHmac('sha256', keySecret)
    .update(`${orderId}|${paymentId}`)
    .digest('hex');
  return expected === signature;
}

// Verifies Razorpay webhook signatures (X-Razorpay-Signature header)
export function verifyWebhookSignature(rawBody, signatureHeader, webhookSecret) {
  const secret = webhookSecret || process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret || !signatureHeader) return false;
  const expected = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
  return expected === signatureHeader;
}

// Issue a real refund via Razorpay
export async function createRazorpayRefund({ paymentId, amountInRupees, notes = {} }) {
  if (!razorpayEnabled || !razorpay) {
    console.warn('[razorpay] refund requested in simulated mode (no live keys):', { paymentId, amountInRupees });
    return {
      id: `rfnd_sim_${Date.now()}`,
      payment_id: paymentId,
      amount: Math.round(Number(amountInRupees) * 100),
      currency: 'INR',
      status: 'processed',
      simulated: true,
    };
  }

  const amountPaise = Math.round(Number(amountInRupees) * 100);
  const refund = await razorpay.payments.refund(paymentId, {
    amount: amountPaise,
    notes,
  });
  return refund;
}
