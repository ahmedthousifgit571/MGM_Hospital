import type { Metadata } from 'next';
import { ContactPage } from '@/components/ContactPageContent';

export const metadata: Metadata = {
  title: 'Contact Us — MGM Hospitals',
};

export default function Page() {
  return <ContactPage />;
}
