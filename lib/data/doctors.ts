import 'server-only';
import { createAdminSupabaseClient } from '@/lib/supabase/server';

export async function getDoctorsList() {
  const supabaseAdmin = createAdminSupabaseClient();
  const { data, error } = await supabaseAdmin
    .from('doctors')
    .select('*, departments(name)')
    .eq('is_active', true)
    .order('name');

  if (error) throw new Error(error.message);
  return data;
}

export async function getDepartmentsList() {
  const supabaseAdmin = createAdminSupabaseClient();
  const { data, error } = await supabaseAdmin
    .from('departments')
    .select('*')
    .eq('is_active', true)
    .order('name');

  if (error) throw new Error(error.message);
  return data;
}
