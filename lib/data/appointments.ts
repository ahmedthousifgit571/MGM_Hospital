import 'server-only';
import { createAdminSupabaseClient } from '@/lib/supabase/server';
import { requireUser } from '@/lib/auth';

export async function getMyAppointments() {
  const user = await requireUser();
  const supabaseAdmin = createAdminSupabaseClient();

  const { data: patient } = await supabaseAdmin
    .from('patients')
    .select('id')
    .eq('user_id', user.id)
    .single();

  if (!patient) return [];

  const { data, error } = await supabaseAdmin
    .from('appointments')
    .select(`
      *,
      doctors(name, phone, qualification, avatar_url),
      departments(name),
      payments(amount, status, razorpay_payment_id)
    `)
    .eq('patient_id', patient.id)
    .order('appointment_date', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}
