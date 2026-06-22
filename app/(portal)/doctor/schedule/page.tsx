import { getMySchedule } from '@/lib/data/doctor';
import { ScheduleEditor } from '@/components/portal/ScheduleEditor';

interface ScheduleItem {
  day_of_week: number;
  start_time: string;
  end_time: string;
  slot_duration: number;
  is_available: boolean;
}

export default async function DoctorSchedule() {
  const { schedules: existing } = await getMySchedule();

  const full: ScheduleItem[] = Array.from({ length: 7 }, (_, i) => {
    const found = (existing || []).find((s: ScheduleItem) => s.day_of_week === i);
    return (
      found || {
        day_of_week: i,
        start_time: '09:00',
        end_time: '17:00',
        slot_duration: 30,
        is_available: i !== 0,
      }
    );
  });

  return <ScheduleEditor initialSchedules={full} />;
}
