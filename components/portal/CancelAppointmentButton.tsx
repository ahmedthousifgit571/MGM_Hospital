'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { cancelAppointment } from '@/actions/appointments.actions';

export function CancelAppointmentButton({ appointmentId }: { appointmentId: string }) {
  const router = useRouter();
  const [cancelling, setCancelling] = useState(false);

  const handleCancel = async () => {
    if (!confirm('Are you sure you want to cancel this appointment? A refund will be initiated.')) return;
    setCancelling(true);
    await cancelAppointment(appointmentId, 'Cancelled by patient');
    setCancelling(false);
    router.refresh();
  };

  return (
    <button
      onClick={handleCancel}
      disabled={cancelling}
      className="mt-2 text-sm text-red-600 hover:text-red-700 font-medium disabled:opacity-50"
    >
      {cancelling ? 'Cancelling...' : 'Cancel'}
    </button>
  );
}
