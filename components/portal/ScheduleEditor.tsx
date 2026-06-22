'use client';

import { useState } from 'react';
import { Save } from 'lucide-react';
import { updateSchedule } from '@/actions/doctor.actions';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

interface ScheduleItem {
  day_of_week: number;
  start_time: string;
  end_time: string;
  slot_duration: number;
  is_available: boolean;
}

export function ScheduleEditor({ initialSchedules }: { initialSchedules: ScheduleItem[] }) {
  const [schedules, setSchedules] = useState<ScheduleItem[]>(initialSchedules);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const update = (index: number, field: keyof ScheduleItem, value: string | number | boolean) => {
    setSchedules((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    const result = await updateSchedule({ schedules });
    setMessage(result.error || result.message || 'Schedule saved successfully');
    setSaving(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Weekly Schedule</h1>
          <p className="text-gray-500 mt-1">Set your recurring weekly availability</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark disabled:opacity-50"
        >
          <Save size={16} />
          {saving ? 'Saving...' : 'Save Schedule'}
        </button>
      </div>

      {message && (
        <div className={`mb-4 p-3 rounded-lg text-sm ${message.includes('success') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {message}
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left text-sm font-medium text-gray-600 px-6 py-3">Day</th>
              <th className="text-left text-sm font-medium text-gray-600 px-4 py-3">Available</th>
              <th className="text-left text-sm font-medium text-gray-600 px-4 py-3">Start Time</th>
              <th className="text-left text-sm font-medium text-gray-600 px-4 py-3">End Time</th>
              <th className="text-left text-sm font-medium text-gray-600 px-4 py-3">Slot Duration</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {schedules.map((schedule, i) => (
              <tr key={i} className={!schedule.is_available ? 'opacity-50' : ''}>
                <td className="px-6 py-4 font-medium text-gray-900">{DAYS[i]}</td>
                <td className="px-4 py-4">
                  <input
                    type="checkbox"
                    checked={schedule.is_available}
                    onChange={(e) => update(i, 'is_available', e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-primary"
                  />
                </td>
                <td className="px-4 py-4">
                  <input
                    type="time"
                    value={schedule.start_time}
                    onChange={(e) => update(i, 'start_time', e.target.value)}
                    disabled={!schedule.is_available}
                    className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm disabled:bg-gray-50"
                  />
                </td>
                <td className="px-4 py-4">
                  <input
                    type="time"
                    value={schedule.end_time}
                    onChange={(e) => update(i, 'end_time', e.target.value)}
                    disabled={!schedule.is_available}
                    className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm disabled:bg-gray-50"
                  />
                </td>
                <td className="px-4 py-4">
                  <select
                    value={schedule.slot_duration}
                    onChange={(e) => update(i, 'slot_duration', parseInt(e.target.value))}
                    disabled={!schedule.is_available}
                    className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm disabled:bg-gray-50"
                  >
                    <option value={15}>15 min</option>
                    <option value={30}>30 min</option>
                    <option value={45}>45 min</option>
                    <option value={60}>60 min</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
