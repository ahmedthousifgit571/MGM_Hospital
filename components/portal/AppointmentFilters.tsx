'use client';

import { useRouter, usePathname } from 'next/navigation';

export function AppointmentFilters({ date, status }: { date: string; status: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const update = (next: { date?: string; status?: string }) => {
    const params = new URLSearchParams();
    const nextDate = next.date ?? date;
    const nextStatus = next.status ?? status;
    if (nextDate) params.set('date', nextDate);
    if (nextStatus) params.set('status', nextStatus);
    router.push(`${pathname}${params.toString() ? `?${params}` : ''}`);
  };

  return (
    <div className="flex items-center gap-4 mb-6">
      <input
        type="date"
        defaultValue={date}
        onChange={(e) => update({ date: e.target.value })}
        className="px-4 py-2 border border-gray-300 rounded-lg text-sm"
      />
      <select
        defaultValue={status}
        onChange={(e) => update({ status: e.target.value })}
        className="px-4 py-2 border border-gray-300 rounded-lg text-sm"
      >
        <option value="">All Statuses</option>
        <option value="confirmed">Confirmed</option>
        <option value="completed">Completed</option>
        <option value="cancelled">Cancelled</option>
        <option value="pending">Pending</option>
      </select>
      {(date || status) && (
        <button onClick={() => router.push(pathname)} className="text-sm text-gray-500 hover:text-gray-700">
          Clear filters
        </button>
      )}
    </div>
  );
}
