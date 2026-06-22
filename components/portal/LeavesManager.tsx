'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Trash2 } from 'lucide-react';
import { addLeave, removeLeave } from '@/actions/doctor.actions';

interface Leave {
  id: string;
  leave_date: string;
  reason: string | null;
}

export function LeavesManager({ initialLeaves }: { initialLeaves: Leave[] }) {
  const router = useRouter();
  const [leaves, setLeaves] = useState<Leave[]>(initialLeaves);
  const [showForm, setShowForm] = useState(false);
  const [newLeave, setNewLeave] = useState({ leave_date: '', reason: '' });
  const [error, setError] = useState('');

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const result = await addLeave({ leave_date: newLeave.leave_date, reason: newLeave.reason || undefined });
    if (result.error) {
      setError(result.error);
      return;
    }
    if (result.leave) setLeaves((prev) => [...prev, result.leave as Leave]);
    setNewLeave({ leave_date: '', reason: '' });
    setShowForm(false);
    router.refresh();
  };

  const handleRemove = async (id: string) => {
    await removeLeave(id);
    setLeaves((prev) => prev.filter((l) => l.id !== id));
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Leaves</h1>
          <p className="text-gray-500 mt-1">Block dates when you&apos;re unavailable</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark"
        >
          <Plus size={16} />
          Add Leave
        </button>
      </div>

      {showForm && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
          <form onSubmit={handleAdd} className="flex items-end gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                value={newLeave.leave_date}
                min={getMinDate()}
                onChange={(e) => setNewLeave({ ...newLeave, leave_date: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Reason (optional)</label>
              <input
                type="text"
                value={newLeave.reason}
                onChange={(e) => setNewLeave({ ...newLeave, reason: e.target.value })}
                placeholder="e.g., Personal leave"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm"
              />
            </div>
            <button type="submit" className="px-5 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark">
              Save
            </button>
          </form>
          {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
        </div>
      )}

      {leaves.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <p className="text-gray-500">No upcoming leaves scheduled</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left text-sm font-medium text-gray-600 px-6 py-3">Date</th>
                <th className="text-left text-sm font-medium text-gray-600 px-6 py-3">Day</th>
                <th className="text-left text-sm font-medium text-gray-600 px-6 py-3">Reason</th>
                <th className="text-right text-sm font-medium text-gray-600 px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {leaves.map((leave) => (
                <tr key={leave.id}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {new Date(leave.leave_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(leave.leave_date).toLocaleDateString('en-IN', { weekday: 'long' })}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{leave.reason || '—'}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleRemove(leave.id)} className="text-red-500 hover:text-red-700">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
