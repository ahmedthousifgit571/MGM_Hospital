import type { Metadata } from 'next';
import { DepartmentsPage } from '@/components/DepartmentsPageContent';

export const metadata: Metadata = {
  title: 'Departments — MGM Hospitals',
};

export default function Page() {
  return <DepartmentsPage />;
}
