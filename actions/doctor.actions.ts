'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { createAdminSupabaseClient } from '@/lib/supabase/server';
import { requireRole } from '@/lib/auth';

const scheduleSchema = z.object({
  schedules: z.array(z.object({
    day_of_week: z.number().min(0).max(6),
    start_time: z.string().regex(/^\d{2}:\d{2}$/),
    end_time: z.string().regex(/^\d{2}:\d{2}$/),
    slot_duration: z.number().min(15).max(60).default(30),
    is_available: z.boolean().default(true),
  })),
});

const leaveSchema = z.object({
  leave_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  reason: z.string().optional(),
});

async function getDoctorId(userId: string, supabaseAdmin: ReturnType<typeof createAdminSupabaseClient>) {
  const { data: doctor } = await supabaseAdmin
    .from('doctors')
    .select('id')
    .eq('user_id', userId)
    .single();
  return doctor?.id as string | undefined;
}

export async function updateSchedule(input: z.infer<typeof scheduleSchema>) {
  const parsed = scheduleSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const user = await requireRole('doctor');
  const supabaseAdmin = createAdminSupabaseClient();
  const doctorId = await getDoctorId(user.id, supabaseAdmin);

  if (!doctorId) return { error: 'Doctor profile not found' };

  const schedulesWithDoctor = parsed.data.schedules.map((s) => ({
    ...s,
    doctor_id: doctorId,
  }));

  const { error } = await supabaseAdmin
    .from('doctor_schedules')
    .upsert(schedulesWithDoctor, { onConflict: 'doctor_id,day_of_week' });

  if (error) return { error: error.message };

  revalidatePath('/doctor/schedule');
  return { message: 'Schedule updated successfully' };
}

export async function addLeave(input: z.infer<typeof leaveSchema>) {
  const parsed = leaveSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const user = await requireRole('doctor');
  const supabaseAdmin = createAdminSupabaseClient();
  const doctorId = await getDoctorId(user.id, supabaseAdmin);

  if (!doctorId) return { error: 'Doctor profile not found' };

  const { data, error } = await supabaseAdmin
    .from('doctor_leaves')
    .insert({
      doctor_id: doctorId,
      leave_date: parsed.data.leave_date,
      reason: parsed.data.reason,
    })
    .select()
    .single();

  if (error) {
    if (error.code === '23505') return { error: 'Leave already marked for this date' };
    return { error: error.message };
  }

  revalidatePath('/doctor/leaves');
  return { leave: data };
}

export async function removeLeave(leaveId: string) {
  const user = await requireRole('doctor');
  const supabaseAdmin = createAdminSupabaseClient();
  const doctorId = await getDoctorId(user.id, supabaseAdmin);

  if (!doctorId) return { error: 'Doctor profile not found' };

  const { error } = await supabaseAdmin
    .from('doctor_leaves')
    .delete()
    .eq('id', leaveId)
    .eq('doctor_id', doctorId);

  if (error) return { error: error.message };

  revalidatePath('/doctor/leaves');
  return { message: 'Leave removed' };
}

export async function completeAppointment(appointmentId: string) {
  const user = await requireRole('doctor');
  const supabaseAdmin = createAdminSupabaseClient();
  const doctorId = await getDoctorId(user.id, supabaseAdmin);

  if (!doctorId) return { error: 'Doctor profile not found' };

  const { error } = await supabaseAdmin
    .from('appointments')
    .update({ status: 'completed' })
    .eq('id', appointmentId)
    .eq('doctor_id', doctorId)
    .eq('status', 'confirmed');

  if (error) return { error: error.message };

  revalidatePath('/doctor/appointments');
  return { message: 'Appointment marked as completed' };
}
