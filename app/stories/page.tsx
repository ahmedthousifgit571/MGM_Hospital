import type { Metadata } from 'next';
import { StoriesPage } from '@/components/StoriesPageContent';

export const metadata: Metadata = {
  title: 'Patient Stories — MGM Hospitals',
};

export default function Page() {
  return <StoriesPage />;
}
