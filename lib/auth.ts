import 'server-only';
import { redirect } from 'next/navigation';
import { createAdminSupabaseClient, createServerSupabaseClient } from './supabase/server';

export type Role = 'patient' | 'doctor' | 'admin' | 'receptionist';

export interface SessionUser {
  id: string;
  phone?: string;
  email?: string;
  role: Role;
}

export async function getUserRole(userId: string): Promise<Role> {
  const supabaseAdmin = createAdminSupabaseClient();

  const { data: staff } = await supabaseAdmin
    .from('staff')
    .select('role')
    .eq('user_id', userId)
    .eq('is_active', true)
    .single();

  if (staff) return staff.role as 'admin' | 'receptionist';

  const { data: doctor } = await supabaseAdmin
    .from('doctors')
    .select('id')
    .eq('user_id', userId)
    .eq('is_active', true)
    .single();

  if (doctor) return 'doctor';

  return 'patient';
}

export async function getSessionUser(): Promise<SessionUser | null> {
  const supabase = await createServerSupabaseClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) return null;

  const role = await getUserRole(user.id);

  return {
    id: user.id,
    phone: user.phone ?? undefined,
    email: user.email ?? undefined,
    role,
  };
}

export async function requireUser(): Promise<SessionUser> {
  const user = await getSessionUser();
  if (!user) redirect('/login');
  return user;
}

export async function requireRole(...roles: Role[]): Promise<SessionUser> {
  const user = await requireUser();
  if (!roles.includes(user.role)) redirect('/login');
  return user;
}

export async function getProfile() {
  const user = await requireUser();
  const supabaseAdmin = createAdminSupabaseClient();

  const { data: patient } = await supabaseAdmin
    .from('patients')
    .select('*')
    .eq('user_id', user.id)
    .single();

  if (patient) return { role: 'patient' as const, profile: patient };

  const { data: doctor } = await supabaseAdmin
    .from('doctors')
    .select('*, departments(name)')
    .eq('user_id', user.id)
    .single();

  if (doctor) return { role: 'doctor' as const, profile: doctor };

  const { data: staff } = await supabaseAdmin
    .from('staff')
    .select('*')
    .eq('user_id', user.id)
    .single();

  if (staff) return { role: staff.role as Role, profile: staff };

  return { role: 'patient' as const, profile: null, is_new_user: true };
}
