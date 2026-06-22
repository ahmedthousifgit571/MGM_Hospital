'use client';

import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { createStaff, updateStaff } from '@/actions/admin.actions';

interface StaffMember {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  role: 'admin' | 'receptionist';
  is_active: boolean;
}

export function StaffManager({ initialStaff }: { initialStaff: StaffMember[] }) {
  const [staff, setStaff] = useState<StaffMember[]>(initialStaff);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', role: 'receptionist' as string });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const payload = {
      name: form.name,
      phone: form.phone.startsWith('+91') ? form.phone : `+91${form.phone.replace(/\D/g, '')}`,
      email: form.email || undefined,
      role: form.role as 'admin' | 'receptionist',
    };

    const result = await createStaff(payload);
    if (result.error) {
      setError(result.error);
      return;
    }

    setShowModal(false);
    if (result.staff) setStaff((prev) => [result.staff as StaffMember, ...prev]);
  };

  const toggleActive = async (id: string, currentActive: boolean) => {
    await updateStaff(id, { is_active: !currentActive });
    setStaff((prev) => prev.map((s) => (s.id === id ? { ...s, is_active: !currentActive } : s)));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Staff Management</h1>
        <button
          onClick={() => { setForm({ name: '', phone: '', email: '', role: 'receptionist' }); setShowModal(true); setError(''); }}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark"
        >
          <Plus size={16} /> Add Staff
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left text-sm font-medium text-gray-600 px-6 py-3">Name</th>
              <th className="text-left text-sm font-medium text-gray-600 px-4 py-3">Phone</th>
              <th className="text-left text-sm font-medium text-gray-600 px-4 py-3">Role</th>
              <th className="text-left text-sm font-medium text-gray-600 px-4 py-3">Status</th>
              <th className="text-right text-sm font-medium text-gray-600 px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {staff.map((s) => (
              <tr key={s.id}>
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-gray-900">{s.name}</p>
                  {s.email && <p className="text-xs text-gray-500">{s.email}</p>}
                </td>
                <td className="px-4 py-4 text-sm text-gray-600">{s.phone}</td>
                <td className="px-4 py-4">
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium capitalize bg-purple-50 text-purple-700">
                    {s.role}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${s.is_active ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                    {s.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => toggleActive(s.id, s.is_active)} className="text-sm text-gray-500 hover:text-gray-700">
                    {s.is_active ? 'Deactivate' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Add Staff Member</h2>
              <button onClick={() => setShowModal(false)}><X size={20} /></button>
            </div>
            {error && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm" required />
              <input type="tel" placeholder="Phone (+91...)" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm" required />
              <input type="email" placeholder="Email (optional)" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm" />
              <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm" required>
                <option value="receptionist">Receptionist</option>
                <option value="admin">Admin</option>
              </select>
              <button type="submit" className="w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark">
                Create Staff
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
