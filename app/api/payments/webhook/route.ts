import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { createAdminSupabaseClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const secret = process.env.RAZORPAY_KEY_SECRET!;
  const signature = req.headers.get('x-razorpay-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  // Verify against the raw request bytes, not a re-serialized JSON body --
  // Razorpay signs the exact bytes it sent, and re-stringifying parsed JSON
  // is not guaranteed to byte-match.
  const rawBody = await req.text();
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(rawBody)
    .digest('hex');

  if (signature !== expectedSignature) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const body = JSON.parse(rawBody);
  const event = body.event;
  const payload = body.payload;
  const supabaseAdmin = createAdminSupabaseClient();

  switch (event) {
    case 'payment.failed': {
      const orderId = payload.payment?.entity?.order_id;
      if (orderId) {
        await supabaseAdmin
          .from('payments')
          .update({ status: 'failed' })
          .eq('razorpay_order_id', orderId);

        const { data: payment } = await supabaseAdmin
          .from('payments')
          .select('appointment_id')
          .eq('razorpay_order_id', orderId)
          .single();

        if (payment) {
          const { data: apt } = await supabaseAdmin
            .from('appointments')
            .select('slot_id')
            .eq('id', payment.appointment_id)
            .single();

          if (apt) {
            await supabaseAdmin
              .from('appointment_slots')
              .update({ locked_until: null })
              .eq('id', apt.slot_id);
          }

          await supabaseAdmin
            .from('appointments')
            .update({ status: 'cancelled' })
            .eq('id', payment.appointment_id);
        }
      }
      break;
    }
  }

  return NextResponse.json({ status: 'ok' });
}
