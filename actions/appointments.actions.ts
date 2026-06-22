'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { createAdminSupabaseClient } from '@/lib/supabase/server';
import { requireUser } from '@/lib/auth';
import { createRazorpayOrder } from '@/lib/razorpay';

const initiateSchema = z.object({
  slot_id: z.string().uuid(),
  notes: z.string().optional(),
});

export async function initiateAppointment(input: z.infer<typeof initiateSchema>) {
  const parsed = initiateSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const user = await requireUser();
  const { slot_id, notes } = parsed.data;
  const supabaseAdmin = createAdminSupabaseClient();

  const { data: patient } = await supabaseAdmin
    .from('patients')
    .select('id')
    .eq('user_id', user.id)
    .single();

  if (!patient) {
    return { error: 'Please complete your profile before booking' };
  }

  const { data: slot, error: slotError } = await supabaseAdmin
    .from('appointment_slots')
    .select('*')
    .eq('id', slot_id)
    .eq('is_booked', false)
    .single();

  if (slotError || !slot) {
    return { error: 'Slot is no longer available' };
  }

  if (slot.locked_until && new Date(slot.locked_until) > new Date()) {
    return { error: 'Slot is temporarily reserved by another user' };
  }

  const lockExpiry = new Date(Date.now() + 10 * 60 * 1000).toISOString();
  const { error: lockError } = await supabaseAdmin
    .from('appointment_slots')
    .update({ locked_until: lockExpiry })
    .eq('id', slot_id)
    .eq('is_booked', false);

  if (lockError) {
    return { error: 'Failed to reserve slot' };
  }

  const { data: doctor } = await supabaseAdmin
    .from('doctors')
    .select('id, consultation_fee, department_id')
    .eq('id', slot.doctor_id)
    .single();

  if (!doctor) {
    return { error: 'Doctor not found' };
  }

  const { data: appointment, error: aptError } = await supabaseAdmin
    .from('appointments')
    .insert({
      patient_id: patient.id,
      doctor_id: doctor.id,
      slot_id: slot_id,
      department_id: doctor.department_id,
      appointment_date: slot.slot_date,
      start_time: slot.start_time,
      end_time: slot.end_time,
      status: 'pending',
      notes: notes || null,
    })
    .select()
    .single();

  if (aptError || !appointment) {
    await supabaseAdmin
      .from('appointment_slots')
      .update({ locked_until: null })
      .eq('id', slot_id);

    return { error: 'Failed to create appointment' };
  }

  const amount = doctor.consultation_fee;
  const order = await createRazorpayOrder(amount, appointment.id);

  if (!order) {
    await supabaseAdmin.from('appointments').delete().eq('id', appointment.id);
    await supabaseAdmin
      .from('appointment_slots')
      .update({ locked_until: null })
      .eq('id', slot_id);

    return { error: 'Failed to create payment order' };
  }

  await supabaseAdmin.from('payments').insert({
    appointment_id: appointment.id,
    patient_id: patient.id,
    razorpay_order_id: order.id,
    amount,
    status: 'created',
  });

  return {
    appointment_id: appointment.id,
    order_id: order.id,
    amount,
    currency: 'INR',
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  };
}

export async function cancelAppointment(appointmentId: string, reason?: string) {
  const user = await requireUser();
  const supabaseAdmin = createAdminSupabaseClient();

  const { data: patient } = await supabaseAdmin
    .from('patients')
    .select('id')
    .eq('user_id', user.id)
    .single();

  if (!patient) {
    return { error: 'Patient not found' };
  }

  const { data: appointment } = await supabaseAdmin
    .from('appointments')
    .select('*, payments(*)')
    .eq('id', appointmentId)
    .eq('patient_id', patient.id)
    .single();

  if (!appointment) {
    return { error: 'Appointment not found' };
  }

  if (appointment.status === 'cancelled' || appointment.status === 'completed') {
    return { error: `Cannot cancel a ${appointment.status} appointment` };
  }

  await supabaseAdmin
    .from('appointments')
    .update({ status: 'cancelled', cancellation_reason: reason })
    .eq('id', appointmentId);

  await supabaseAdmin
    .from('appointment_slots')
    .update({ is_booked: false, locked_until: null })
    .eq('id', appointment.slot_id);

  // TODO: Initiate refund if payment was made
  // TODO: Send cancellation notifications

  revalidatePath('/appointments');
  return { message: 'Appointment cancelled successfully' };
}
