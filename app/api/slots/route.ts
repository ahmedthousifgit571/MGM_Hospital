import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createAdminSupabaseClient } from '@/lib/supabase/server';
import { generateSlotsForDoctor } from '@/lib/slots';

const getSlotsSchema = z.object({
  doctor_id: z.string().uuid(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD'),
});

export async function GET(req: NextRequest) {
  const parsed = getSlotsSchema.safeParse({
    doctor_id: req.nextUrl.searchParams.get('doctor_id'),
    date: req.nextUrl.searchParams.get('date'),
  });
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  }

  const { doctor_id, date } = parsed.data;
  const supabaseAdmin = createAdminSupabaseClient();

  const requestedDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (requestedDate < today) {
    return NextResponse.json({ error: 'Cannot book slots in the past' }, { status: 400 });
  }

  const { data: leave } = await supabaseAdmin
    .from('doctor_leaves')
    .select('id')
    .eq('doctor_id', doctor_id)
    .eq('leave_date', date)
    .single();

  if (leave) {
    return NextResponse.json({ slots: [], message: 'Doctor is on leave for this date' });
  }

  let { data: slots } = await supabaseAdmin
    .from('appointment_slots')
    .select('*')
    .eq('doctor_id', doctor_id)
    .eq('slot_date', date)
    .eq('is_booked', false)
    .is('locked_until', null)
    .order('start_time');

  if (!slots || slots.length === 0) {
    const generated = await generateSlotsForDoctor(doctor_id, date);
    if (generated) {
      const { data: freshSlots } = await supabaseAdmin
        .from('appointment_slots')
        .select('*')
        .eq('doctor_id', doctor_id)
        .eq('slot_date', date)
        .eq('is_booked', false)
        .is('locked_until', null)
        .order('start_time');
      slots = freshSlots;
    }
  }

  // Filter out slots with expired locks
  const now = new Date();
  const availableSlots = (slots || []).filter((slot) => {
    if (!slot.locked_until) return true;
    return new Date(slot.locked_until) < now;
  });

  return NextResponse.json({ slots: availableSlots });
}

export async function POST(req: NextRequest) {
  const { doctor_id, date } = await req.json();

  if (!doctor_id || !date) {
    return NextResponse.json({ error: 'doctor_id and date are required' }, { status: 400 });
  }

  const result = await generateSlotsForDoctor(doctor_id, date);
  if (!result) {
    return NextResponse.json({ error: 'No schedule found for this doctor on this day' }, { status: 400 });
  }

  return NextResponse.json({ message: 'Slots generated', count: result });
}
