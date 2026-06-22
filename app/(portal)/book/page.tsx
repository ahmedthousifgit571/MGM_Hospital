'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import { ArrowLeft, ArrowRight, Check, CreditCard } from 'lucide-react';
import { initiateAppointment } from '@/actions/appointments.actions';
import { verifyPayment } from '@/actions/payments.actions';

interface Department { id: string; name: string; description: string; }
interface Doctor { id: string; name: string; qualification: string; experience_years: number; consultation_fee: number; avatar_url: string | null; departments: { name: string }; }
interface Slot { id: string; start_time: string; end_time: string; slot_date: string; }

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open: () => void; on: (event: string, cb: () => void) => void };
  }
}

type Step = 'department' | 'doctor' | 'slot' | 'payment' | 'success';

export default function BookAppointment() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('department');
  const [departments, setDepartments] = useState<Department[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedDept, setSelectedDept] = useState<Department | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/appointments/departments')
      .then((res) => res.json())
      .then((data) => setDepartments(data.departments || []));
  }, []);

  const fetchDoctors = async (deptId: string) => {
    setLoading(true);
    const res = await fetch(`/api/appointments/doctors?department_id=${deptId}`);
    const data = await res.json();
    setDoctors(data.doctors || []);
    setLoading(false);
  };

  const fetchSlots = async (doctorId: string, date: string) => {
    setLoading(true);
    setError('');
    const res = await fetch(`/api/slots?doctor_id=${doctorId}&date=${date}`);
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || 'Failed to fetch slots');
      setSlots([]);
    } else {
      setSlots(data.slots || []);
      if (data.message) setError(data.message);
    }
    setLoading(false);
  };

  const handleSelectDepartment = (dept: Department) => {
    setSelectedDept(dept);
    fetchDoctors(dept.id);
    setStep('doctor');
  };

  const handleSelectDoctor = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setStep('slot');
  };

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    setSelectedSlot(null);
    if (selectedDoctor) {
      fetchSlots(selectedDoctor.id, date);
    }
  };

  const handleInitiatePayment = async () => {
    if (!selectedSlot) return;
    setLoading(true);
    setError('');

    const data = await initiateAppointment({ slot_id: selectedSlot.id, notes: notes || undefined });

    if ('error' in data && data.error) {
      setError(data.error);
      setLoading(false);
      return;
    }

    const options = {
      key: data.key_id,
      amount: data.amount,
      currency: data.currency,
      name: 'MGM Hospitals',
      description: `Consultation with ${selectedDoctor?.name}`,
      order_id: data.order_id,
      handler: async (response: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
        const verifyResult = await verifyPayment(response);
        if ('error' in verifyResult && verifyResult.error) {
          setError('Payment verification failed. Contact support.');
        } else {
          setStep('success');
        }
      },
      prefill: {},
      theme: { color: '#0f766e' },
    };

    const rzp = new window.Razorpay(options);
    rzp.on('payment.failed', () => {
      setError('Payment failed. Please try again.');
    });
    rzp.open();
    setLoading(false);
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  if (step === 'success') {
    return (
      <div className="max-w-md mx-auto text-center py-16">
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check size={40} className="text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
        <p className="text-gray-500 mb-8">
          Your appointment with {selectedDoctor?.name} on{' '}
          {new Date(selectedSlot!.slot_date).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
          {' '}at {selectedSlot?.start_time} has been confirmed.
        </p>
        <p className="text-sm text-gray-500 mb-6">You will receive a WhatsApp confirmation shortly.</p>
        <button
          onClick={() => router.push('/appointments')}
          className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark"
        >
          View My Appointments
        </button>
      </div>
    );
  }

  return (
    <div>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Book Appointment</h1>
        <div className="flex items-center gap-2 mt-4">
          {(['department', 'doctor', 'slot', 'payment'] as Step[]).map((s, i) => (
            <div key={s} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step === s ? 'bg-primary text-white' :
                (['department', 'doctor', 'slot', 'payment'].indexOf(step) > i) ? 'bg-green-100 text-green-700' :
                'bg-gray-100 text-gray-400'
              }`}>
                {(['department', 'doctor', 'slot', 'payment'].indexOf(step) > i) ? <Check size={14} /> : i + 1}
              </div>
              {i < 3 && <div className="w-12 h-0.5 bg-gray-200 mx-1" />}
            </div>
          ))}
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      {step === 'department' && (
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Select Department</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {departments.map((dept) => (
              <button
                key={dept.id}
                onClick={() => handleSelectDepartment(dept)}
                className="p-5 bg-white border border-gray-200 rounded-xl text-left hover:border-primary/50 hover:shadow-sm transition-all"
              >
                <h3 className="font-medium text-gray-900">{dept.name}</h3>
                {dept.description && (
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">{dept.description}</p>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 'doctor' && (
        <div>
          <button onClick={() => setStep('department')} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4">
            <ArrowLeft size={16} /> Back to departments
          </button>
          <h2 className="text-lg font-semibold text-gray-800 mb-1">Select Doctor</h2>
          <p className="text-sm text-gray-500 mb-4">{selectedDept?.name}</p>

          {loading ? (
            <p className="text-gray-400">Loading doctors...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {doctors.map((doctor) => (
                <button
                  key={doctor.id}
                  onClick={() => handleSelectDoctor(doctor)}
                  className="p-5 bg-white border border-gray-200 rounded-xl text-left hover:border-primary/50 hover:shadow-sm transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                      {doctor.name.split(' ').slice(1).map((n) => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{doctor.name}</h3>
                      <p className="text-sm text-gray-500">{doctor.qualification}</p>
                      <p className="text-sm text-gray-500">{doctor.experience_years} years experience</p>
                      <p className="text-sm font-medium text-primary mt-1">
                        ₹{(doctor.consultation_fee / 100).toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {step === 'slot' && (
        <div>
          <button onClick={() => setStep('doctor')} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4">
            <ArrowLeft size={16} /> Back to doctors
          </button>
          <h2 className="text-lg font-semibold text-gray-800 mb-1">Select Date & Time</h2>
          <p className="text-sm text-gray-500 mb-4">{selectedDoctor?.name} - {selectedDept?.name}</p>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Choose Date</label>
            <input
              type="date"
              value={selectedDate}
              min={getMinDate()}
              onChange={(e) => handleDateChange(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg text-sm"
            />
          </div>

          {selectedDate && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Available Slots</h3>
              {loading ? (
                <p className="text-gray-400">Loading slots...</p>
              ) : slots.length === 0 ? (
                <p className="text-gray-500 text-sm">No slots available for this date. Try another date.</p>
              ) : (
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                  {slots.map((slot) => (
                    <button
                      key={slot.id}
                      onClick={() => setSelectedSlot(slot)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${
                        selectedSlot?.id === slot.id
                          ? 'bg-primary text-white border-primary'
                          : 'bg-white border-gray-200 text-gray-700 hover:border-primary/50'
                      }`}
                    >
                      {slot.start_time}
                    </button>
                  ))}
                </div>
              )}

              {selectedSlot && (
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notes (optional)</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    placeholder="Any symptoms or concerns you'd like to mention..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm resize-none"
                  />
                  <button
                    onClick={() => setStep('payment')}
                    className="mt-4 flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark"
                  >
                    Continue to Payment <ArrowRight size={16} />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {step === 'payment' && (
        <div className="max-w-lg">
          <button onClick={() => setStep('slot')} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4">
            <ArrowLeft size={16} /> Back to slots
          </button>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Confirm & Pay</h2>

          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
            <h3 className="font-medium text-gray-900 mb-4">Booking Summary</h3>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-500">Department</dt>
                <dd className="font-medium text-gray-900">{selectedDept?.name}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Doctor</dt>
                <dd className="font-medium text-gray-900">{selectedDoctor?.name}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Date</dt>
                <dd className="font-medium text-gray-900">
                  {new Date(selectedDate).toLocaleDateString('en-IN', {
                    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
                  })}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Time</dt>
                <dd className="font-medium text-gray-900">{selectedSlot?.start_time} - {selectedSlot?.end_time}</dd>
              </div>
              <hr className="my-3" />
              <div className="flex justify-between text-base">
                <dt className="font-medium text-gray-900">Consultation Fee</dt>
                <dd className="font-bold text-primary">
                  ₹{((selectedDoctor?.consultation_fee || 0) / 100).toLocaleString('en-IN')}
                </dd>
              </div>
            </dl>
          </div>

          <button
            onClick={handleInitiatePayment}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark disabled:opacity-50"
          >
            <CreditCard size={18} />
            {loading ? 'Processing...' : `Pay ₹${((selectedDoctor?.consultation_fee || 0) / 100).toLocaleString('en-IN')}`}
          </button>
          <p className="text-xs text-gray-500 text-center mt-3">Secured by Razorpay. Your slot is reserved for 10 minutes.</p>
        </div>
      )}
    </div>
  );
}
