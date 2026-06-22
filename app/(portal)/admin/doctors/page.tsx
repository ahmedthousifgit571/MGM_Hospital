import { getDoctorsList, getDepartmentsList } from '@/lib/data/doctors';
import { DoctorsManager } from '@/components/portal/DoctorsManager';

export default async function AdminDoctors() {
  const [doctors, departments] = await Promise.all([getDoctorsList(), getDepartmentsList()]);
  return <DoctorsManager initialDoctors={doctors} departments={departments} />;
}
