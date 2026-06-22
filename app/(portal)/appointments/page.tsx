import { Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { getMyAppointments } from '@/lib/data/appointments';
import { CancelAppointmentButton } from '@/components/portal/CancelAppointmentButton';

interface Appointment {
  id: string;
  appointment_date: string;
  start_time: string;
  end_time: string;
  status: string;
  notes: string | null;
  doctors: { name: string; phone: string; qualification: string } | null;
  departments: { name: string } | null;
  payments: { amount: number; status: string }[] | null;
}

const statusConfig: Record<string, { icon: typeof Clock; color: string; label: string }> = {
  confirmed: { icon: Clock, color: 'text-blue-600 bg-blue-50', label: 'Confirmed' },
  completed: { icon: CheckCircle, color: 'text-green-600 bg-green-50', label: 'Completed' },
  cancelled: { icon: XCircle, color: 'text-red-600 bg-red-50', label: 'Cancelled' },
  pending: { icon: AlertCircle, color: 'text-amber-600 bg-amber-50', label: 'Pending Payment' },
  no_show: { icon: XCircle, color: 'text-gray-600 bg-gray-50', label: 'No Show' },
};

export default async function MyAppointments() {
  const appointments = (await getMyAppointments()) as Appointment[];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Appointments</h1>

      {appointments.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <p className="text-gray-500">You haven&apos;t booked any appointments yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {appointments.map((apt) => {
            const config = statusConfig[apt.status] || statusConfig.pending;
            const StatusIcon = config.icon;
            const isPast = new Date(apt.appointment_date) < new Date();
            const canCancel = apt.status === 'confirmed' && !isPast;

            return (
              <div key={apt.id} className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{apt.doctors?.name}</h3>
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
                        <StatusIcon size={12} />
                        {config.label}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{apt.departments?.name}</p>
                    <p className="text-sm text-gray-500">{apt.doctors?.qualification}</p>

                    <div className="flex items-center gap-4 mt-3 text-sm">
                      <span className="text-gray-700 font-medium">
                        {new Date(apt.appointment_date).toLocaleDateString('en-IN', {
                          weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
                        })}
                      </span>
                      <span className="text-gray-500">{apt.start_time} - {apt.end_time}</span>
                    </div>

                    {apt.notes && <p className="text-sm text-gray-500 mt-2 italic">&quot;{apt.notes}&quot;</p>}
                  </div>

                  <div className="text-right">
                    {apt.payments?.[0] && (
                      <p className="text-sm font-medium text-gray-900">
                        ₹{(apt.payments[0].amount / 100).toLocaleString('en-IN')}
                      </p>
                    )}
                    {canCancel && <CancelAppointmentButton appointmentId={apt.id} />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
