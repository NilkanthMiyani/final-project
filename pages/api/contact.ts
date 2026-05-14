import nodemailer from 'nodemailer';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { fullname, email, message } = req.body;

  if (!fullname || !email || !message) {
    return res.status(400).json({ success: false, error: 'All fields are required.' });
  }

  const recipientEmail = process.env.USER_TO;
  const senderEmail = process.env.USER_MAILER || 'onboarding@resend.dev';
  const smtpPass = process.env.NODEMAILER_PASS;

  if (!recipientEmail || !smtpPass) {
    console.error('Missing env variables: USER_TO or NODEMAILER_PASS is not set.');
    return res.status(500).json({ success: false, error: 'Server email configuration is missing.' });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST || 'smtp.resend.com',
    port: Number(process.env.NODEMAILER_PORT) || 465,
    secure: true,
    auth: {
      user: process.env.NODEMAILER_USER || 'resend',
      pass: smtpPass,
    },
  });

  try {
    await transporter.sendMail({
      from: senderEmail,
      to: recipientEmail,
      replyTo: email,
      subject: `New message from ${fullname}`,
      text: `You have received a new message from your portfolio contact form.\n\nName: ${fullname}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    return res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Failed to send email:', error);
    return res.status(500).json({ success: false, error: 'Failed to send message.' });
  }
}
