import type { Metadata } from 'next';
import { GalleryPage } from '@/components/GalleryPageContent';

export const metadata: Metadata = {
  title: 'Gallery — MGM Hospitals',
};

export default function Page() {
  return <GalleryPage />;
}
