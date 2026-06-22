import type { Metadata } from 'next';
import CinematicHome from '@/components/CinematicHome';

export const metadata: Metadata = {
  title: 'MGM Hospitals — Advanced Healthcare. Human Compassion.',
};

export default function Page() {
  return <CinematicHome />;
}
