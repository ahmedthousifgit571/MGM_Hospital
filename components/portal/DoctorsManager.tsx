'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import { createDoctor, updateDoctor, deleteDoctor } from '@/actions/admin.actions';

interface Doctor {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  department_id: string;
  qualification: string;
  experience_years: number;
  consultation_fee: number;
  is_active: boolean;
}

interface Department {
  id: string;
  name: string;
}

const emptyForm = {
  name: '', phone: '', email: '', department_id: '', qualification: '',
  experience_years: 0, consultation_fee: 50000,
};

export function DoctorsManager({ initialDoctors, departments }: { initialDoctors: Doctor[]; departments: Department[] }) {
  const router = useRouter();
  const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');

  const openCreate = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowModal(true);
    setError('');
  };

  const openEdit = (doctor: Doctor) => {
    setForm({
      name: doctor.name,
      phone: doctor.phone,
      email: doctor.email || '',
      department_id: doctor.department_id,
      qualification: doctor.qualification || '',
      experience_years: doctor.experience_years || 0,
      consultation_fee: doctor.consultation_fee,
    });
    setEditingId(doctor.id);
    setShowModal(true);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const payload = {
      ...form,
      phone: form.phone.startsWith('+91') ? form.phone : `+91${form.phone.replace(/\D/g, '')}`,
      email: form.email || undefined,
      consultation_fee: Number(form.consultation_fee),
      experience_years: Number(form.experience_years),
    };

    const result = editingId ? await updateDoctor(editingId, payload) : await createDoctor(payload);

    if (result.error) {
      setError(result.error);
      return;
    }

    setShowModal(false);
    router.refresh();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Deactivate this doctor?')) return;
    await deleteDoctor(id);
    setDoctors((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage Doctors</h1>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark">
          <Plus size={16} /> Add Doctor
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left text-sm font-medium text-gray-600 px-6 py-3">Name</th>
              <th className="text-left text-sm font-medium text-gray-600 px-4 py-3">Phone</th>
              <th className="text-left text-sm font-medium text-gray-600 px-4 py-3">Department</th>
              <th className="text-left text-sm font-medium text-gray-600 px-4 py-3">Fee</th>
              <th className="text-left text-sm font-medium text-gray-600 px-4 py-3">Experience</th>
              <th className="text-right text-sm font-medium text-gray-600 px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {doctors.map((doc) => (
              <tr key={doc.id}>
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                  <p className="text-xs text-gray-500">{doc.qualification}</p>
                </td>
                <td className="px-4 py-4 text-sm text-gray-600">{doc.phone}</td>
                <td className="px-4 py-4 text-sm text-gray-600">
                  {departments.find((d) => d.id === doc.department_id)?.name}
                </td>
                <td className="px-4 py-4 text-sm text-gray-700">₹{(doc.consultation_fee / 100).toLocaleString()}</td>
                <td className="px-4 py-4 text-sm text-gray-600">{doc.experience_years} yrs</td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => openEdit(doc)} className="text-gray-400 hover:text-primary mr-3"><Edit size={16} /></button>
                  <button onClick={() => handleDelete(doc.id)} className="text-gray-400 hover:text-red-600"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-lg mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">{editingId ? 'Edit Doctor' : 'Add Doctor'}</h2>
              <button onClick={() => setShowModal(false)}><X size={20} /></button>
            </div>
            {error && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm" required />
              <input type="tel" placeholder="Phone (+91...)" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm" required />
              <input type="email" placeholder="Email (optional)" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm" />
              <select value={form.department_id} onChange={(e) => setForm({ ...form, department_id: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm" required>
                <option value="">Select Department</option>
                {departments.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
              </select>
              <input type="text" placeholder="Qualification" value={form.qualification} onChange={(e) => setForm({ ...form, qualification: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm" />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-500">Experience (years)</label>
                  <input type="number" value={form.experience_years} onChange={(e) => setForm({ ...form, experience_years: parseInt(e.target.value) || 0 })} className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm" />
                </div>
                <div>
                  <label className="text-xs text-gray-500">Fee (paise, e.g. 50000 = ₹500)</label>
                  <input type="number" value={form.consultation_fee} onChange={(e) => setForm({ ...form, consultation_fee: parseInt(e.target.value) || 0 })} className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm" />
                </div>
              </div>
              <button type="submit" className="w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark">
                {editingId ? 'Update Doctor' : 'Create Doctor'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
