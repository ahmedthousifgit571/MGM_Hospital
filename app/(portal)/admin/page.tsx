import { Calendar, Users, IndianRupee, Activity } from 'lucide-react';
import { getAnalytics } from '@/lib/data/admin';

export default async function AdminDashboard() {
  const analytics = await getAnalytics();
  const deptEntries = Object.entries(analytics.department_breakdown);
  const maxCount = deptEntries.length ? Math.max(...deptEntries.map(([, c]) => c)) : 0;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-500 mt-1">Hospital appointment analytics overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Calendar size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{analytics.total_appointments || 0}</p>
              <p className="text-sm text-gray-500">Total Appointments</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <Activity size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{analytics.today_appointments || 0}</p>
              <p className="text-sm text-gray-500">Today&apos;s Appointments</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <Users size={20} className="text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{analytics.total_patients || 0}</p>
              <p className="text-sm text-gray-500">Total Patients</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
              <IndianRupee size={20} className="text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{analytics.revenue_30_days_formatted || '₹0'}</p>
              <p className="text-sm text-gray-500">Revenue (30 days)</p>
            </div>
          </div>
        </div>
      </div>

      {deptEntries.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Appointments by Department</h2>
          <div className="space-y-3">
            {deptEntries
              .sort(([, a], [, b]) => b - a)
              .map(([dept, count]) => {
                const pct = maxCount ? (count / maxCount) * 100 : 0;
                return (
                  <div key={dept}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700">{dept}</span>
                      <span className="text-gray-500">{count} appointments</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-primary rounded-full h-2" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}
