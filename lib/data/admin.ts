import 'server-only';
import { createAdminSupabaseClient } from '@/lib/supabase/server';
import { requireRole } from '@/lib/auth';

export async function getAllAppointments(filters: {
  date?: string;
  status?: string;
  doctor_id?: string;
  department_id?: string;
  page?: number;
  limit?: number;
} = {}) {
  await requireRole('admin', 'receptionist');
  const supabaseAdmin = createAdminSupabaseClient();

  let query = supabaseAdmin
    .from('appointments')
    .select(
      `
      *,
      patients(name, phone),
      doctors(name, phone),
      departments(name),
      payments(amount, status, razorpay_payment_id)
    `,
      { count: 'exact' }
    );

  if (filters.date) query = query.eq('appointment_date', filters.date);
  if (filters.status) query = query.eq('status', filters.status);
  if (filters.doctor_id) query = query.eq('doctor_id', filters.doctor_id);
  if (filters.department_id) query = query.eq('department_id', filters.department_id);

  const page = filters.page ?? 1;
  const limit = filters.limit ?? 20;
  const from = (page - 1) * limit;

  query = query.range(from, from + limit - 1).order('created_at', { ascending: false });

  const { data, error, count } = await query;
  if (error) throw new Error(error.message);

  return {
    appointments: data,
    pagination: { page, limit, total: count, pages: Math.ceil((count || 0) / limit) },
  };
}

export async function getAnalytics() {
  await requireRole('admin');
  const supabaseAdmin = createAdminSupabaseClient();

  const today = new Date().toISOString().split('T')[0];
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const [
    { count: totalAppointments },
    { count: todayAppointments },
    { data: revenueData },
    { data: departmentStats },
    { count: totalPatients },
  ] = await Promise.all([
    supabaseAdmin.from('appointments').select('*', { count: 'exact', head: true }),
    supabaseAdmin.from('appointments').select('*', { count: 'exact', head: true }).eq('appointment_date', today),
    supabaseAdmin.from('payments').select('amount').eq('status', 'paid').gte('created_at', thirtyDaysAgo),
    supabaseAdmin.from('appointments').select('department_id, departments(name)').eq('status', 'confirmed'),
    supabaseAdmin.from('patients').select('*', { count: 'exact', head: true }),
  ]);

  const totalRevenue = (revenueData || []).reduce((sum, p) => sum + p.amount, 0);

  const deptCounts: Record<string, number> = {};
  (departmentStats || []).forEach((apt: any) => {
    const name = apt.departments?.name || 'Unknown';
    deptCounts[name] = (deptCounts[name] || 0) + 1;
  });

  return {
    total_appointments: totalAppointments,
    today_appointments: todayAppointments,
    total_patients: totalPatients,
    revenue_30_days: totalRevenue,
    revenue_30_days_formatted: `₹${(totalRevenue / 100).toLocaleString('en-IN')}`,
    department_breakdown: deptCounts,
  };
}

export async function getAllStaff() {
  await requireRole('admin');
  const supabaseAdmin = createAdminSupabaseClient();

  const { data, error } = await supabaseAdmin.from('staff').select('*').order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data;
}

export async function getNotificationLogs(page = 1, limit = 50) {
  await requireRole('admin', 'receptionist');
  const supabaseAdmin = createAdminSupabaseClient();

  const from = (page - 1) * limit;
  const { data, error, count } = await supabaseAdmin
    .from('notifications')
    .select('*, appointments(appointment_date, start_time)', { count: 'exact' })
    .range(from, from + limit - 1)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return { notifications: data, pagination: { page, limit, total: count } };
}
