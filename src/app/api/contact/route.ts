import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import * as nodemailer from 'nodemailer';

import { getThankYouEmail, getThankYouText, NOTIFICATION_EMAIL_TEMPLATE } from '@/lib/api/utils';

interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, message }: ContactPayload = await request.json();

    const agLanguage = request.cookies.get('aglanguage')?.value || 'en';

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 },
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 },
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport(
      {
        host: process.env.SMTP_HOST ?? 'smtp.hostinger.com',
        port: Number(process.env.SMTP_PORT) || 465,
        secure: (process.env.SMTP_PORT ?? '465') === '465',
        auth: {
          user: process.env.SMTP_USER ?? 'admin@antiguatechlabs.com',
          pass: process.env.SMTP_PASS,
        },
      },
      {
        from: '"Antigua Tech Labs" <info@antiguatechlabs.com>',
      },
    );

    // Verify the transporter configuration
    await transporter.verify();

    const thankYouMailOptions = {
      from: '"Antigua Tech Labs" <info@antiguatechlabs.com>',
      to: email,
      subject: 'Thank You for Contacting Antigua Tech Labs',
      text: getThankYouText(agLanguage,name),
      html: getThankYouEmail(agLanguage, name),
    };

    await transporter.sendMail(thankYouMailOptions);

    // 2. Send notification email to internal team
    const notificationMailOptions = {
      from: '"Antigua Tech Labs" <info@antiguatechlabs.com>',
      to: ['info@antiguatechlabs.com', 'jm10cuyun@gmail.com', 'marcosovando9@yahoo.com'],
      replyTo: email, // Set reply-to as the form submitter's email
      subject: `New Contact Form Submission - ATL - ${name} - #${new Date()}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: NOTIFICATION_EMAIL_TEMPLATE(name, email, message),
    };

    await transporter.sendMail(notificationMailOptions);

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
    });
  } catch (error) {
    console.error('Error sending email:', error);

    // Return different error messages based on the error type
    if (error instanceof Error) {
      if (error.message.includes('Invalid login')) {
        return NextResponse.json(
          { success: false, error: 'Email configuration error' },
          { status: 500 },
        );
      }
      if (error.message.includes('Network')) {
        return NextResponse.json(
          { success: false, error: 'Network error, please try again' },
          { status: 500 },
        );
      }
    }

    return NextResponse.json(
      { success: false, error: 'Failed to send email. Please try again later.' },
      { status: 500 },
    );
  }
}
