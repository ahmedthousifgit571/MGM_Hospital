import type { Metadata } from 'next';
import { DoctorsPage } from '@/components/DoctorsPageContent';

export const metadata: Metadata = {
  title: 'Our Doctors — MGM Hospitals',
};

export default function Page() {
  return <DoctorsPage />;
}
