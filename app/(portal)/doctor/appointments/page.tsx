import { getMyDoctorAppointments } from '@/lib/data/doctor';
import { CompleteAppointmentButton } from '@/components/portal/CompleteAppointmentButton';
import { DateFilterInput } from '@/components/portal/DateFilterInput';

function calculateAge(dob: string): number {
  const birth = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

export default async function DoctorAppointments({
  searchParams,
}: {
  searchParams: Promise<{ date?: string }>;
}) {
  const params = await searchParams;
  const dateFilter = params.date || new Date().toISOString().split('T')[0];
  const appointments = await getMyDoctorAppointments({ date: dateFilter });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
        <DateFilterInput value={dateFilter} />
      </div>

      {appointments.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <p className="text-gray-500">No appointments for this date</p>
        </div>
      ) : (
        <div className="space-y-3">
          {appointments.map((apt) => (
            <div key={apt.id} className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-gray-900">{apt.patients?.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      apt.status === 'completed' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'
                    }`}>
                      {apt.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {apt.start_time} - {apt.end_time} | {apt.patients?.phone}
                  </p>
                  {apt.patients?.gender && (
                    <p className="text-sm text-gray-500 capitalize">
                      {apt.patients.gender}
                      {apt.patients.date_of_birth && `, Age: ${calculateAge(apt.patients.date_of_birth)}`}
                    </p>
                  )}
                  {apt.notes && <p className="text-sm text-gray-600 mt-2 italic">Note: {apt.notes}</p>}
                </div>
                {apt.status === 'confirmed' && <CompleteAppointmentButton appointmentId={apt.id} variant="button" />}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
