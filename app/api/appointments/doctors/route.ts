import { NextRequest, NextResponse } from 'next/server';
import { createAdminSupabaseClient } from '@/lib/supabase/server';

export async function GET(req: NextRequest) {
  const supabaseAdmin = createAdminSupabaseClient();
  const departmentId = req.nextUrl.searchParams.get('department_id');

  let query = supabaseAdmin
    .from('doctors')
    .select('*, departments(name)')
    .eq('is_active', true);

  if (departmentId) {
    query = query.eq('department_id', departmentId);
  }

  const { data, error } = await query.order('name');

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ doctors: data });
}
