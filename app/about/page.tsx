import type { Metadata } from 'next';
import { AboutPage } from '@/components/AboutPageContent';

export const metadata: Metadata = {
  title: 'About Us — MGM Hospitals',
};

export default function Page() {
  return <AboutPage />;
}
