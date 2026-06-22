import Link from 'next/link';
import { Calendar, Clock, Plus } from 'lucide-react';
import { getProfile } from '@/lib/auth';
import { getMyAppointments } from '@/lib/data/appointments';

interface Appointment {
  id: string;
  appointment_date: string;
  start_time: string;
  end_time: string;
  status: string;
  doctors: { name: string } | null;
  departments: { name: string } | null;
}

export default async function PatientDashboard() {
  const { profile } = await getProfile();
  const appointments = (await getMyAppointments()) as Appointment[];

  const now = new Date();
  const upcoming = appointments
    .filter((a) => a.status === 'confirmed' && new Date(a.appointment_date) >= now)
    .slice(0, 5);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {(profile as { name?: string } | null)?.name || 'Patient'}
        </h1>
        <p className="text-gray-500 mt-1">Manage your health appointments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link
          href="/book"
          className="flex items-center gap-4 p-6 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors"
        >
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
            <Plus size={24} />
          </div>
          <div>
            <p className="font-semibold">Book Appointment</p>
            <p className="text-sm opacity-80">Schedule a consultation</p>
          </div>
        </Link>

        <Link
          href="/appointments"
          className="flex items-center gap-4 p-6 bg-white border border-gray-200 rounded-xl hover:border-primary/30 transition-colors"
        >
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <Clock size={24} className="text-primary" />
          </div>
          <div>
            <p className="font-semibold text-gray-900">My Appointments</p>
            <p className="text-sm text-gray-500">View booking history</p>
          </div>
        </Link>

        <div className="flex items-center gap-4 p-6 bg-white border border-gray-200 rounded-xl">
          <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center">
            <Calendar size={24} className="text-amber-600" />
          </div>
          <div>
            <p className="font-semibold text-gray-900">{upcoming.length}</p>
            <p className="text-sm text-gray-500">Upcoming appointments</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Upcoming Appointments</h2>
        </div>

        {upcoming.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500">No upcoming appointments</p>
            <Link href="/book" className="text-primary text-sm font-medium mt-2 inline-block hover:underline">
              Book your first appointment
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {upcoming.map((apt) => (
              <div key={apt.id} className="px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{apt.doctors?.name}</p>
                  <p className="text-sm text-gray-500">{apt.departments?.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(apt.appointment_date).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                  <p className="text-sm text-gray-500">{apt.start_time} - {apt.end_time}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
