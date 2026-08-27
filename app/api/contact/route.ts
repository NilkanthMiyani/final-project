import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

import connectToDatabase from '@/lib/database';
import MessageModel from '@/model/message.model';

export const runtime = 'nodejs';

const MAX_LENGTHS = { fullname: 120, email: 200, message: 5000 };

function clean(value: unknown, max: number): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const payload = body as Record<string, unknown>;
  const fullname = clean(payload.fullname, MAX_LENGTHS.fullname);
  const email = clean(payload.email, MAX_LENGTHS.email);
  const message = clean(payload.message, MAX_LENGTHS.message);

  if (!fullname || !email || !message) {
    return NextResponse.json(
      { error: 'Name, email and message are all required.' },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: 'That email address does not look right.' },
      { status: 400 }
    );
  }

  // Persist first: a mail transport outage should never lose the message.
  let stored = false;
  try {
    await connectToDatabase();
    await MessageModel.create({ fullname, email, message });
    stored = true;
  } catch (error) {
    console.error('Failed to store contact message:', error);
  }

  const recipient = process.env.USER_TO;
  const smtpPass = process.env.NODEMAILER_PASS;

  if (recipient && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.NODEMAILER_HOST ?? 'smtp.resend.com',
        port: Number(process.env.NODEMAILER_PORT) || 465,
        secure: true,
        auth: {
          user: process.env.NODEMAILER_USER ?? 'resend',
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: process.env.USER_MAILER ?? 'onboarding@resend.dev',
        to: recipient,
        replyTo: email,
        subject: `Portfolio message from ${fullname}`,
        text: `Name: ${fullname}\nEmail: ${email}\n\n${message}`,
      });
    } catch (error) {
      console.error('Failed to send contact email:', error);
      if (!stored) {
        return NextResponse.json(
          { error: 'Could not deliver your message. Please email me directly.' },
          { status: 500 }
        );
      }
    }
  } else if (!stored) {
    return NextResponse.json(
      { error: 'Could not deliver your message. Please email me directly.' },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
