import Link from 'next/link';
import { getAllAppointments } from '@/lib/data/admin';
import { AppointmentFilters } from '@/components/portal/AppointmentFilters';

const statusColors: Record<string, string> = {
  confirmed: 'bg-blue-50 text-blue-700',
  completed: 'bg-green-50 text-green-700',
  cancelled: 'bg-red-50 text-red-700',
  pending: 'bg-amber-50 text-amber-700',
  no_show: 'bg-gray-100 text-gray-600',
};

export default async function AdminAppointments({
  searchParams,
}: {
  searchParams: Promise<{ date?: string; status?: string; page?: string }>;
}) {
  const params = await searchParams;
  const date = params.date || '';
  const status = params.status || '';
  const page = parseInt(params.page || '1');

  const { appointments, pagination } = await getAllAppointments({ date, status, page, limit: 20 });

  const pageHref = (p: number) => {
    const sp = new URLSearchParams();
    if (date) sp.set('date', date);
    if (status) sp.set('status', status);
    sp.set('page', String(p));
    return `/admin/appointments?${sp}`;
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">All Appointments</h1>

      <AppointmentFilters date={date} status={status} />

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left text-sm font-medium text-gray-600 px-6 py-3">Patient</th>
                <th className="text-left text-sm font-medium text-gray-600 px-4 py-3">Doctor</th>
                <th className="text-left text-sm font-medium text-gray-600 px-4 py-3">Department</th>
                <th className="text-left text-sm font-medium text-gray-600 px-4 py-3">Date</th>
                <th className="text-left text-sm font-medium text-gray-600 px-4 py-3">Time</th>
                <th className="text-left text-sm font-medium text-gray-600 px-4 py-3">Status</th>
                <th className="text-left text-sm font-medium text-gray-600 px-4 py-3">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {appointments?.map((apt) => (
                <tr key={apt.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-900">{apt.patients?.name}</p>
                    <p className="text-xs text-gray-500">{apt.patients?.phone}</p>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-700">{apt.doctors?.name}</td>
                  <td className="px-4 py-4 text-sm text-gray-500">{apt.departments?.name}</td>
                  <td className="px-4 py-4 text-sm text-gray-700">
                    {new Date(apt.appointment_date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">{apt.start_time}</td>
                  <td className="px-4 py-4">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[apt.status] || ''}`}>
                      {apt.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-700">
                    {apt.payments?.[0] ? `₹${(apt.payments[0].amount / 100).toLocaleString('en-IN')}` : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {pagination.pages > 1 && (
          <div className="flex items-center justify-between px-6 py-3 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              Page {pagination.page} of {pagination.pages} ({pagination.total} total)
            </p>
            <div className="flex gap-2">
              <Link
                href={pageHref(page - 1)}
                aria-disabled={page <= 1}
                className={`px-3 py-1 border border-gray-300 rounded text-sm ${page <= 1 ? 'opacity-50 pointer-events-none' : ''}`}
              >
                Previous
              </Link>
              <Link
                href={pageHref(page + 1)}
                aria-disabled={page >= pagination.pages}
                className={`px-3 py-1 border border-gray-300 rounded text-sm ${page >= pagination.pages ? 'opacity-50 pointer-events-none' : ''}`}
              >
                Next
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
