import 'server-only';
import Razorpay from 'razorpay';
import crypto from 'crypto';

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function createRazorpayOrder(amount: number, appointmentId: string) {
  try {
    const order = await razorpay.orders.create({
      amount,
      currency: 'INR',
      receipt: `apt_${appointmentId}`,
      notes: { appointment_id: appointmentId },
    });
    return order;
  } catch (error) {
    console.error('Razorpay order creation failed:', error);
    return null;
  }
}

export function verifyRazorpaySignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  const body = `${orderId}|${paymentId}`;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
    .update(body)
    .digest('hex');

  return expectedSignature === signature;
}

export async function initiateRazorpayRefund(paymentId: string, amount: number) {
  try {
    const refund = await razorpay.payments.refund(paymentId, {
      amount,
      notes: { reason: 'Appointment cancelled' },
    });
    return refund;
  } catch (error) {
    console.error('Razorpay refund failed:', error);
    return null;
  }
}
