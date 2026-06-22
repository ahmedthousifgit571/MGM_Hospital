import 'server-only';
import { createAdminSupabaseClient } from './supabase/server';

export async function generateSlotsForDoctor(doctorId: string, date: string): Promise<number | null> {
  const supabaseAdmin = createAdminSupabaseClient();
  const requestedDate = new Date(date);
  const dayOfWeek = requestedDate.getDay(); // 0=Sunday

  const { data: schedule } = await supabaseAdmin
    .from('doctor_schedules')
    .select('*')
    .eq('doctor_id', doctorId)
    .eq('day_of_week', dayOfWeek)
    .eq('is_available', true)
    .single();

  if (!schedule) return null;

  const { data: leave } = await supabaseAdmin
    .from('doctor_leaves')
    .select('id')
    .eq('doctor_id', doctorId)
    .eq('leave_date', date)
    .single();

  if (leave) return null;

  const slots: Array<{
    doctor_id: string;
    slot_date: string;
    start_time: string;
    end_time: string;
  }> = [];

  const [startHour, startMin] = schedule.start_time.split(':').map(Number);
  const [endHour, endMin] = schedule.end_time.split(':').map(Number);
  const duration = schedule.slot_duration;

  let currentMinutes = startHour * 60 + startMin;
  const endMinutes = endHour * 60 + endMin;

  while (currentMinutes + duration <= endMinutes) {
    const slotStartHour = Math.floor(currentMinutes / 60);
    const slotStartMin = currentMinutes % 60;
    const slotEndMin = currentMinutes + duration;
    const slotEndHour = Math.floor(slotEndMin / 60);
    const slotEndMinute = slotEndMin % 60;

    slots.push({
      doctor_id: doctorId,
      slot_date: date,
      start_time: `${String(slotStartHour).padStart(2, '0')}:${String(slotStartMin).padStart(2, '0')}`,
      end_time: `${String(slotEndHour).padStart(2, '0')}:${String(slotEndMinute).padStart(2, '0')}`,
    });

    currentMinutes += duration;
  }

  if (slots.length === 0) return null;

  const { error } = await supabaseAdmin
    .from('appointment_slots')
    .upsert(slots, { onConflict: 'doctor_id,slot_date,start_time' });

  if (error) {
    console.error('Error generating slots:', error);
    return null;
  }

  return slots.length;
}
