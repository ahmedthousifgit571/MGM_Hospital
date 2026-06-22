import 'server-only';
import { createAdminSupabaseClient } from './supabase/server';

interface NotificationProvider {
  sendMessage(phone: string, message: string): Promise<boolean>;
}

class ConsoleNotificationProvider implements NotificationProvider {
  async sendMessage(phone: string, message: string): Promise<boolean> {
    console.log(`[NOTIFICATION] To: ${phone}`);
    console.log(`[NOTIFICATION] Message: ${message}`);
    return true;
  }
}

// Placeholder for WhatsApp provider - swap implementation when ready
// class WhatsAppProvider implements NotificationProvider {
//   async sendMessage(phone: string, message: string): Promise<boolean> {
//     const response = await fetch(process.env.WHATSAPP_API_URL!, {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${process.env.WHATSAPP_API_KEY}`,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ phone, message }),
//     });
//     return response.ok;
//   }
// }

const provider: NotificationProvider = new ConsoleNotificationProvider();

interface AppointmentDetails {
  id: string;
  appointment_date: string;
  start_time: string;
  end_time: string;
  doctors: { name: string; phone: string } | null;
  patients: { name: string; phone: string } | null;
  departments: { name: string } | null;
}

export async function sendBookingConfirmation(appointment: AppointmentDetails) {
  const supabaseAdmin = createAdminSupabaseClient();
  const patientPhone = appointment.patients?.phone;
  const doctorPhone = appointment.doctors?.phone;
  const receptionistPhone = process.env.RECEPTIONIST_PHONE;

  const dateStr = new Date(appointment.appointment_date).toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const patientMessage = `
Booking Confirmed! ✅
Patient: ${appointment.patients?.name}
Doctor: ${appointment.doctors?.name}
Department: ${appointment.departments?.name}
Date: ${dateStr}
Time: ${appointment.start_time} - ${appointment.end_time}
Appointment ID: ${appointment.id.slice(0, 8).toUpperCase()}

Please arrive 15 minutes before your appointment.
- MGM Hospitals
`.trim();

  const doctorMessage = `
New Appointment Booked
Patient: ${appointment.patients?.name}
Date: ${dateStr}
Time: ${appointment.start_time} - ${appointment.end_time}
Department: ${appointment.departments?.name}
`.trim();

  const notifications: Array<{
    appointment_id: string;
    recipient_phone: string;
    recipient_role: string;
    message_type: string;
    message_body: string;
    status: string;
  }> = [];

  if (patientPhone) {
    const success = await provider.sendMessage(patientPhone, patientMessage);
    notifications.push({
      appointment_id: appointment.id,
      recipient_phone: patientPhone,
      recipient_role: 'patient',
      message_type: 'booking_confirmed',
      message_body: patientMessage,
      status: success ? 'sent' : 'failed',
    });
  }

  if (doctorPhone) {
    const success = await provider.sendMessage(doctorPhone, doctorMessage);
    notifications.push({
      appointment_id: appointment.id,
      recipient_phone: doctorPhone,
      recipient_role: 'doctor',
      message_type: 'booking_confirmed',
      message_body: doctorMessage,
      status: success ? 'sent' : 'failed',
    });
  }

  if (receptionistPhone) {
    const receptionistMessage = `New booking: ${appointment.patients?.name} with ${appointment.doctors?.name} on ${dateStr} at ${appointment.start_time}`;
    const success = await provider.sendMessage(receptionistPhone, receptionistMessage);
    notifications.push({
      appointment_id: appointment.id,
      recipient_phone: receptionistPhone,
      recipient_role: 'receptionist',
      message_type: 'booking_confirmed',
      message_body: receptionistMessage,
      status: success ? 'sent' : 'failed',
    });
  }

  if (notifications.length > 0) {
    await supabaseAdmin.from('notifications').insert(notifications);
  }
}

export async function sendCancellationNotification(appointment: AppointmentDetails) {
  const supabaseAdmin = createAdminSupabaseClient();
  const patientPhone = appointment.patients?.phone;
  const doctorPhone = appointment.doctors?.phone;

  const dateStr = new Date(appointment.appointment_date).toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  if (patientPhone) {
    const message = `Your appointment with ${appointment.doctors?.name} on ${dateStr} at ${appointment.start_time} has been cancelled. Refund will be processed within 5-7 business days.`;
    await provider.sendMessage(patientPhone, message);

    await supabaseAdmin.from('notifications').insert({
      appointment_id: appointment.id,
      recipient_phone: patientPhone,
      recipient_role: 'patient',
      message_type: 'cancellation',
      message_body: message,
      status: 'sent',
    });
  }

  if (doctorPhone) {
    const message = `Appointment cancelled: ${appointment.patients?.name} on ${dateStr} at ${appointment.start_time}`;
    await provider.sendMessage(doctorPhone, message);

    await supabaseAdmin.from('notifications').insert({
      appointment_id: appointment.id,
      recipient_phone: doctorPhone,
      recipient_role: 'doctor',
      message_type: 'cancellation',
      message_body: message,
      status: 'sent',
    });
  }
}

export async function sendReminder(appointment: AppointmentDetails) {
  const supabaseAdmin = createAdminSupabaseClient();
  const patientPhone = appointment.patients?.phone;
  if (!patientPhone) return;

  const dateStr = new Date(appointment.appointment_date).toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const message = `Reminder: You have an appointment with ${appointment.doctors?.name} tomorrow (${dateStr}) at ${appointment.start_time}. Please arrive 15 minutes early. - MGM Hospitals`;

  await provider.sendMessage(patientPhone, message);

  await supabaseAdmin.from('notifications').insert({
    appointment_id: appointment.id,
    recipient_phone: patientPhone,
    recipient_role: 'patient',
    message_type: 'reminder',
    message_body: message,
    status: 'sent',
  });
}
