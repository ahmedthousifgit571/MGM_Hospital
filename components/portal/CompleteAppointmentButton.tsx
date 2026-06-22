'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { completeAppointment } from '@/actions/doctor.actions';

export function CompleteAppointmentButton({ appointmentId, variant = 'link' }: { appointmentId: string; variant?: 'link' | 'button' }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleComplete = async () => {
    setLoading(true);
    await completeAppointment(appointmentId);
    setLoading(false);
    router.refresh();
  };

  if (variant === 'button') {
    return (
      <button
        onClick={handleComplete}
        disabled={loading}
        className="px-4 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-medium hover:bg-green-100 disabled:opacity-50"
      >
        {loading ? 'Saving...' : 'Mark Complete'}
      </button>
    );
  }

  return (
    <button onClick={handleComplete} disabled={loading} className="text-sm text-primary font-medium hover:underline disabled:opacity-50">
      {loading ? 'Saving...' : 'Mark Complete'}
    </button>
  );
}
