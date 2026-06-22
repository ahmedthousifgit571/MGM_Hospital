'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import { createDepartment, updateDepartment, deleteDepartment } from '@/actions/admin.actions';

interface Department {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean;
}

export function DepartmentsManager({ initialDepartments }: { initialDepartments: Department[] }) {
  const router = useRouter();
  const [departments, setDepartments] = useState<Department[]>(initialDepartments);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', description: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const result = editingId ? await updateDepartment(editingId, form) : await createDepartment(form);

    if (result.error) {
      setError(result.error);
      return;
    }

    setShowModal(false);
    router.refresh();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Deactivate this department?')) return;
    await deleteDepartment(id);
    setDepartments((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage Departments</h1>
        <button
          onClick={() => { setForm({ name: '', description: '' }); setEditingId(null); setShowModal(true); setError(''); }}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark"
        >
          <Plus size={16} /> Add Department
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {departments.map((dept) => (
          <div key={dept.id} className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">{dept.name}</h3>
                {dept.description && <p className="text-sm text-gray-500 mt-1">{dept.description}</p>}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => { setForm({ name: dept.name, description: dept.description || '' }); setEditingId(dept.id); setShowModal(true); }}
                  className="text-gray-400 hover:text-primary"
                >
                  <Edit size={16} />
                </button>
                <button onClick={() => handleDelete(dept.id)} className="text-gray-400 hover:text-red-600">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">{editingId ? 'Edit Department' : 'Add Department'}</h2>
              <button onClick={() => setShowModal(false)}><X size={20} /></button>
            </div>
            {error && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text" placeholder="Department Name" value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm" required
              />
              <textarea
                placeholder="Description (optional)" value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3} className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm resize-none"
              />
              <button type="submit" className="w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark">
                {editingId ? 'Update' : 'Create'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
