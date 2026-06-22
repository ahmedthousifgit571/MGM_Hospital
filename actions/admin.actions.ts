'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { createAdminSupabaseClient } from '@/lib/supabase/server';
import { requireRole } from '@/lib/auth';

const doctorSchema = z.object({
  name: z.string().min(2),
  phone: z.string().regex(/^\+91\d{10}$/),
  email: z.string().email().optional(),
  department_id: z.string().uuid(),
  qualification: z.string().optional(),
  experience_years: z.number().min(0).optional(),
  consultation_fee: z.number().min(0),
  avatar_url: z.string().url().optional(),
});

const departmentSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  icon_url: z.string().optional(),
});

const staffSchema = z.object({
  name: z.string().min(2),
  phone: z.string().regex(/^\+91\d{10}$/),
  email: z.string().email().optional(),
  role: z.enum(['admin', 'receptionist']),
});

export async function createDoctor(input: z.infer<typeof doctorSchema>) {
  const parsed = doctorSchema.safeParse(input);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  await requireRole('admin');
  const supabaseAdmin = createAdminSupabaseClient();

  const { data, error } = await supabaseAdmin.from('doctors').insert(parsed.data).select().single();
  if (error) return { error: error.message };

  revalidatePath('/admin/doctors');
  return { doctor: data };
}

export async function updateDoctor(doctorId: string, input: Partial<z.infer<typeof doctorSchema>>) {
  const parsed = doctorSchema.partial().safeParse(input);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  await requireRole('admin');
  const supabaseAdmin = createAdminSupabaseClient();

  const { data, error } = await supabaseAdmin
    .from('doctors')
    .update(parsed.data)
    .eq('id', doctorId)
    .select()
    .single();
  if (error) return { error: error.message };

  revalidatePath('/admin/doctors');
  return { doctor: data };
}

export async function deleteDoctor(doctorId: string) {
  await requireRole('admin');
  const supabaseAdmin = createAdminSupabaseClient();

  const { error } = await supabaseAdmin.from('doctors').update({ is_active: false }).eq('id', doctorId);
  if (error) return { error: error.message };

  revalidatePath('/admin/doctors');
  return { message: 'Doctor deactivated' };
}

export async function createDepartment(input: z.infer<typeof departmentSchema>) {
  const parsed = departmentSchema.safeParse(input);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  await requireRole('admin');
  const supabaseAdmin = createAdminSupabaseClient();

  const { data, error } = await supabaseAdmin.from('departments').insert(parsed.data).select().single();
  if (error) {
    if (error.code === '23505') return { error: 'Department already exists' };
    return { error: error.message };
  }

  revalidatePath('/admin/departments');
  return { department: data };
}

export async function updateDepartment(departmentId: string, input: Partial<z.infer<typeof departmentSchema>>) {
  const parsed = departmentSchema.partial().safeParse(input);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  await requireRole('admin');
  const supabaseAdmin = createAdminSupabaseClient();

  const { data, error } = await supabaseAdmin
    .from('departments')
    .update(parsed.data)
    .eq('id', departmentId)
    .select()
    .single();
  if (error) return { error: error.message };

  revalidatePath('/admin/departments');
  return { department: data };
}

export async function deleteDepartment(departmentId: string) {
  await requireRole('admin');
  const supabaseAdmin = createAdminSupabaseClient();

  const { error } = await supabaseAdmin.from('departments').update({ is_active: false }).eq('id', departmentId);
  if (error) return { error: error.message };

  revalidatePath('/admin/departments');
  return { message: 'Department deactivated' };
}

export async function createStaff(input: z.infer<typeof staffSchema>) {
  const parsed = staffSchema.safeParse(input);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  await requireRole('admin');
  const supabaseAdmin = createAdminSupabaseClient();

  const { data, error } = await supabaseAdmin.from('staff').insert(parsed.data).select().single();
  if (error) return { error: error.message };

  revalidatePath('/admin/staff');
  return { staff: data };
}

export async function updateStaff(staffId: string, input: Record<string, unknown>) {
  await requireRole('admin');
  const supabaseAdmin = createAdminSupabaseClient();

  const { data, error } = await supabaseAdmin.from('staff').update(input).eq('id', staffId).select().single();
  if (error) return { error: error.message };

  revalidatePath('/admin/staff');
  return { staff: data };
}
