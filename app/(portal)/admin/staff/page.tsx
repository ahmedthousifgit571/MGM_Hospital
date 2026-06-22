import { getAllStaff } from '@/lib/data/admin';
import { StaffManager } from '@/components/portal/StaffManager';

export default async function AdminStaff() {
  const staff = await getAllStaff();
  return <StaffManager initialStaff={staff} />;
}
