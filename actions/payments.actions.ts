'use server';

import { z } from 'zod';
import { createAdminSupabaseClient } from '@/lib/supabase/server';
import { requireUser } from '@/lib/auth';
import { verifyRazorpaySignature, initiateRazorpayRefund } from '@/lib/razorpay';
import { sendBookingConfirmation } from '@/lib/notifications';

const verifySchema = z.object({
  razorpay_order_id: z.string(),
  razorpay_payment_id: z.string(),
  razorpay_signature: z.string(),
});

export async function verifyPayment(input: z.infer<typeof verifySchema>) {
  const parsed = verifySchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  await requireUser();
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = parsed.data;
  const supabaseAdmin = createAdminSupabaseClient();

  const isValid = verifyRazorpaySignature(razorpay_order_id, razorpay_payment_id, razorpay_signature);

  if (!isValid) {
    await supabaseAdmin
      .from('payments')
      .update({ status: 'failed' })
      .eq('razorpay_order_id', razorpay_order_id);

    return { error: 'Payment verification failed' };
  }

  const { data: payment } = await supabaseAdmin
    .from('payments')
    .update({
      razorpay_payment_id,
      razorpay_signature,
      status: 'paid',
    })
    .eq('razorpay_order_id', razorpay_order_id)
    .select()
    .single();

  if (!payment) {
    return { error: 'Payment record not found' };
  }

  await supabaseAdmin
    .from('appointments')
    .update({ status: 'confirmed' })
    .eq('id', payment.appointment_id);

  const { data: appointment } = await supabaseAdmin
    .from('appointments')
    .select('*, doctors(name, phone), patients(name, phone), departments(name)')
    .eq('id', payment.appointment_id)
    .single();

  if (appointment) {
    await supabaseAdmin
      .from('appointment_slots')
      .update({ is_booked: true, locked_until: null })
      .eq('id', appointment.slot_id);

    sendBookingConfirmation(appointment).catch(console.error);
  }

  return {
    message: 'Payment verified, appointment confirmed',
    appointment_id: payment.appointment_id,
  };
}

export async function initiateRefund(paymentId: string) {
  await requireUser();
  const supabaseAdmin = createAdminSupabaseClient();

  const { data: payment } = await supabaseAdmin
    .from('payments')
    .select('*')
    .eq('id', paymentId)
    .eq('status', 'paid')
    .single();

  if (!payment) {
    return { error: 'Payment not found or not eligible for refund' };
  }

  if (!payment.razorpay_payment_id) {
    return { error: 'No payment ID found for refund' };
  }

  const refund = await initiateRazorpayRefund(payment.razorpay_payment_id, payment.amount);

  if (!refund) {
    return { error: 'Refund initiation failed' };
  }

  await supabaseAdmin
    .from('payments')
    .update({
      status: 'refunded',
      refund_id: refund.id,
      refund_amount: payment.amount,
    })
    .eq('id', paymentId);

  return { message: 'Refund initiated', refund_id: refund.id };
}
