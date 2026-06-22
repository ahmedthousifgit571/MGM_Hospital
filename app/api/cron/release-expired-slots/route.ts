import { NextRequest, NextResponse } from 'next/server';
import { createAdminSupabaseClient } from '@/lib/supabase/server';

function isAuthorized(req: NextRequest) {
  return req.headers.get('authorization') === `Bearer ${process.env.CRON_SECRET}`;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabaseAdmin = createAdminSupabaseClient();
  const now = new Date().toISOString();

  const { data: expiredSlots } = await supabaseAdmin
    .from('appointment_slots')
    .select('id')
    .eq('is_booked', false)
    .lt('locked_until', now)
    .not('locked_until', 'is', null);

  if (!expiredSlots || expiredSlots.length === 0) {
    return NextResponse.json({ released: 0 });
  }

  const ids = expiredSlots.map((s) => s.id);

  await supabaseAdmin
    .from('appointment_slots')
    .update({ locked_until: null })
    .in('id', ids);

  await supabaseAdmin
    .from('appointments')
    .update({ status: 'cancelled', cancellation_reason: 'Payment timeout' })
    .in('slot_id', ids)
    .eq('status', 'pending');

  return NextResponse.json({ released: ids.length });
}
