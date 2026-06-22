import { NextRequest, NextResponse } from 'next/server';
import { createAdminSupabaseClient } from '@/lib/supabase/server';
import { sendReminder } from '@/lib/notifications';

function isAuthorized(req: NextRequest) {
  return req.headers.get('authorization') === `Bearer ${process.env.CRON_SECRET}`;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabaseAdmin = createAdminSupabaseClient();

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowDate = tomorrow.toISOString().split('T')[0];

  const { data: appointments } = await supabaseAdmin
    .from('appointments')
    .select('*, doctors(name, phone), patients(name, phone), departments(name)')
    .eq('appointment_date', tomorrowDate)
    .eq('status', 'confirmed');

  if (!appointments || appointments.length === 0) {
    return NextResponse.json({ processed: 0 });
  }

  const appointmentIds = appointments.map((a) => a.id);
  const { data: sentReminders } = await supabaseAdmin
    .from('notifications')
    .select('appointment_id')
    .in('appointment_id', appointmentIds)
    .eq('message_type', 'reminder');

  const alreadySent = new Set((sentReminders || []).map((n) => n.appointment_id));

  for (const appointment of appointments) {
    if (!alreadySent.has(appointment.id)) {
      await sendReminder(appointment);
    }
  }

  return NextResponse.json({ processed: appointments.length });
}
