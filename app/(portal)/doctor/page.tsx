import Link from 'next/link';
import { Calendar, Clock, Users } from 'lucide-react';
import { getMyDoctorAppointments } from '@/lib/data/doctor';
import { CompleteAppointmentButton } from '@/components/portal/CompleteAppointmentButton';

export default async function DoctorDashboard() {
  const today = new Date().toISOString().split('T')[0];
  const todayAppointments = await getMyDoctorAppointments({ date: today });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Doctor Dashboard</h1>
        <p className="text-gray-500 mt-1">Manage your schedule and appointments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 bg-white border border-gray-200 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Users size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{todayAppointments.length}</p>
              <p className="text-sm text-gray-500">Today&apos;s Patients</p>
            </div>
          </div>
        </div>
        <Link href="/doctor/schedule" className="p-6 bg-white border border-gray-200 rounded-xl hover:border-primary/30 transition">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <Calendar size={20} className="text-green-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Manage Schedule</p>
              <p className="text-sm text-gray-500">Set availability</p>
            </div>
          </div>
        </Link>
        <Link href="/doctor/leaves" className="p-6 bg-white border border-gray-200 rounded-xl hover:border-primary/30 transition">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
              <Clock size={20} className="text-amber-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Manage Leaves</p>
              <p className="text-sm text-gray-500">Block dates</p>
            </div>
          </div>
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Today&apos;s Appointments</h2>
        </div>
        {todayAppointments.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No appointments today</div>
        ) : (
          <div className="divide-y divide-gray-100">
            {todayAppointments.map((apt) => (
              <div key={apt.id} className="px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{apt.patients?.name}</p>
                  <p className="text-sm text-gray-500">{apt.start_time} - {apt.end_time}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    apt.status === 'completed' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'
                  }`}>
                    {apt.status}
                  </span>
                  {apt.status === 'confirmed' && <CompleteAppointmentButton appointmentId={apt.id} />}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
