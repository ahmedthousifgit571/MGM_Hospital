import { redirect } from 'next/navigation';
import { getProfile } from '@/lib/auth';
import { Sidebar } from '@/components/portal/Sidebar';

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const { role, profile } = await getProfile();

  if (!profile && role === 'patient') {
    redirect('/register');
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar role={role} profile={profile as { name?: string; phone?: string } | null} />
      <main className="ml-64 flex-1 p-8">{children}</main>
    </div>
  );
}
