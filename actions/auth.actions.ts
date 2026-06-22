'use server';

import { z } from 'zod';
import { createAdminSupabaseClient, createServerSupabaseClient } from '@/lib/supabase/server';
import { requireUser } from '@/lib/auth';

const sendOtpSchema = z.object({
  phone: z.string().regex(/^\+91\d{10}$/, 'Phone must be in +91XXXXXXXXXX format'),
});

const verifyOtpSchema = z.object({
  phone: z.string().regex(/^\+91\d{10}$/),
  token: z.string().length(6, 'OTP must be 6 digits'),
});

const registerProfileSchema = z.object({
  name: z.string().min(2).max(100),
  date_of_birth: z.string().optional(),
  gender: z.enum(['male', 'female', 'other']).optional(),
  email: z.string().email().optional(),
  address: z.string().optional(),
});

export async function sendOtp(input: z.infer<typeof sendOtpSchema>) {
  const parsed = sendOtpSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.auth.signInWithOtp({ phone: parsed.data.phone });

  if (error) return { error: error.message };

  return { message: 'OTP sent successfully', phone: parsed.data.phone };
}

export async function verifyOtp(input: z.infer<typeof verifyOtpSchema>) {
  const parsed = verifyOtpSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const { phone, token } = parsed.data;
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase.auth.verifyOtp({ phone, token, type: 'sms' });

  if (error || !data.session) {
    return { error: error?.message || 'OTP verification failed' };
  }

  const supabaseAdmin = createAdminSupabaseClient();
  const { data: existingPatient } = await supabaseAdmin
    .from('patients')
    .select('id, name')
    .eq('user_id', data.user!.id)
    .single();

  return {
    user: { id: data.user!.id, phone: data.user!.phone },
    profile: existingPatient,
    is_new_user: !existingPatient,
  };
}

export async function registerProfile(input: z.infer<typeof registerProfileSchema>) {
  const parsed = registerProfileSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const user = await requireUser();
  const supabaseAdmin = createAdminSupabaseClient();

  const { data: existing } = await supabaseAdmin
    .from('patients')
    .select('id')
    .eq('user_id', user.id)
    .single();

  if (existing) {
    const { data, error } = await supabaseAdmin
      .from('patients')
      .update(parsed.data)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) return { error: error.message };
    return { profile: data };
  }

  const { data, error } = await supabaseAdmin
    .from('patients')
    .insert({ ...parsed.data, user_id: user.id, phone: user.phone })
    .select()
    .single();

  if (error) return { error: error.message };
  return { profile: data };
}

export async function logout() {
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
}
