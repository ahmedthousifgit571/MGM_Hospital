import 'server-only';
import { createAdminSupabaseClient } from '@/lib/supabase/server';
import { requireRole } from '@/lib/auth';

async function getDoctorId(userId: string, supabaseAdmin: ReturnType<typeof createAdminSupabaseClient>) {
  const { data: doctor } = await supabaseAdmin
    .from('doctors')
    .select('id')
    .eq('user_id', userId)
    .single();
  return doctor?.id as string | undefined;
}

export async function getMySchedule() {
  const user = await requireRole('doctor');
  const supabaseAdmin = createAdminSupabaseClient();
  const doctorId = await getDoctorId(user.id, supabaseAdmin);

  if (!doctorId) throw new Error('Doctor profile not found');

  const { data: schedules } = await supabaseAdmin
    .from('doctor_schedules')
    .select('*')
    .eq('doctor_id', doctorId)
    .order('day_of_week');

  const { data: leaves } = await supabaseAdmin
    .from('doctor_leaves')
    .select('*')
    .eq('doctor_id', doctorId)
    .gte('leave_date', new Date().toISOString().split('T')[0])
    .order('leave_date');

  return { schedules, leaves };
}

export async function getMyDoctorAppointments(filters: { date?: string; status?: string } = {}) {
  const user = await requireRole('doctor');
  const supabaseAdmin = createAdminSupabaseClient();
  const doctorId = await getDoctorId(user.id, supabaseAdmin);

  if (!doctorId) throw new Error('Doctor profile not found');

  let query = supabaseAdmin
    .from('appointments')
    .select('*, patients(name, phone, gender, date_of_birth), departments(name)')
    .eq('doctor_id', doctorId)
    .in('status', ['confirmed', 'completed']);

  if (filters.date) query = query.eq('appointment_date', filters.date);
  if (filters.status) query = query.eq('status', filters.status);

  const { data, error } = await query.order('appointment_date').order('start_time');

  if (error) throw new Error(error.message);
  return data;
}
