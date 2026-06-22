import { getDepartmentsList } from '@/lib/data/doctors';
import { DepartmentsManager } from '@/components/portal/DepartmentsManager';

export default async function AdminDepartments() {
  const departments = await getDepartmentsList();
  return <DepartmentsManager initialDepartments={departments} />;
}
