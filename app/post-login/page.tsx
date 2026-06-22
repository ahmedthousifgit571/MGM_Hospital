import { redirect } from 'next/navigation';
import { getProfile } from '@/lib/auth';

export default async function PostLoginPage() {
  const { role, profile } = await getProfile();

  if (!profile && role === 'patient') redirect('/register');
  if (role === 'doctor') redirect('/doctor');
  if (role === 'admin' || role === 'receptionist') redirect('/admin');
  redirect('/dashboard');
}
