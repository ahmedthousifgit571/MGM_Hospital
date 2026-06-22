import { getMySchedule } from '@/lib/data/doctor';
import { LeavesManager } from '@/components/portal/LeavesManager';

export default async function DoctorLeaves() {
  const { leaves } = await getMySchedule();
  return <LeavesManager initialLeaves={leaves || []} />;
}
