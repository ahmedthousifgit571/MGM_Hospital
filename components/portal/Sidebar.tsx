'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Calendar, Home, User, Clock, LogOut, Stethoscope, Building2, Users, BarChart3 } from 'lucide-react';
import { logout } from '@/actions/auth.actions';
import type { Role } from '@/lib/auth';

interface Props {
  role: Role;
  profile: { name?: string; phone?: string } | null;
}

const patientLinks = [
  { href: '/dashboard', icon: Home, label: 'Dashboard' },
  { href: '/book', icon: Calendar, label: 'Book Appointment' },
  { href: '/appointments', icon: Clock, label: 'My Appointments' },
];

const doctorLinks = [
  { href: '/doctor', icon: Home, label: 'Dashboard' },
  { href: '/doctor/appointments', icon: Clock, label: 'Appointments' },
  { href: '/doctor/schedule', icon: Calendar, label: 'Schedule' },
  { href: '/doctor/leaves', icon: Calendar, label: 'Leaves' },
];

const adminLinks = [
  { href: '/admin', icon: BarChart3, label: 'Dashboard' },
  { href: '/admin/appointments', icon: Clock, label: 'Appointments' },
  { href: '/admin/doctors', icon: Stethoscope, label: 'Doctors' },
  { href: '/admin/departments', icon: Building2, label: 'Departments' },
  { href: '/admin/staff', icon: Users, label: 'Staff' },
];

export function Sidebar({ role, profile }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const links = role === 'doctor' ? doctorLinks : role === 'admin' || role === 'receptionist' ? adminLinks : patientLinks;

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 fixed h-full flex flex-col">
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-xl font-bold text-primary">MGM Hospitals</h1>
        <p className="text-sm text-gray-500 mt-1 capitalize">{role} Portal</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {links.map((link) => {
          const isActive =
            pathname === link.href ||
            (link.href !== '/dashboard' && link.href !== '/doctor' && link.href !== '/admin' && pathname.startsWith(link.href + '/'));
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <link.icon size={18} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3 px-4 py-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <User size={16} className="text-primary" />
          </div>
          <div className="truncate">
            <p className="text-sm font-medium text-gray-900 truncate">{profile?.name || 'User'}</p>
            <p className="text-xs text-gray-500">{profile?.phone}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 w-full transition-colors"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
