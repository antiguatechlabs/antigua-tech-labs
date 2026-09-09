import type { NextRequest } from 'next/server';
import * as nodemailer from 'nodemailer';

import { getThankYouEmail, getThankYouText, NOTIFICATION_EMAIL_TEMPLATE } from '@/lib/api/utils';
import { CONTACT_API } from '@/lib/api/catalog';
import {
  type ApiErrorDetail,
  jsonError,
  methodNotAllowed,
  optionsResponse,
} from '@/lib/api/errors';

interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isJsonRequest(contentType: string | null): boolean {
  const mediaType = contentType?.split(';', 1)[0].trim().toLowerCase();
  return mediaType === 'application/json'
    || Boolean(mediaType?.startsWith('application/') && mediaType.endsWith('+json'));
}

function validateContactPayload(payload: unknown):
  | { data: ContactPayload; issues?: never }
  | { data?: never; issues: ApiErrorDetail[] } {
  if (typeof payload !== 'object' || payload === null || Array.isArray(payload)) {
    return {
      issues: [{
        field: 'body',
        issue: 'type',
        message: 'The request body must be a JSON object.',
        hint: 'Send an object with name, email, and message string fields.',
      }],
    };
  }

  const record = payload as Record<string, unknown>;
  const data: Partial<ContactPayload> = {};
  const issues: ApiErrorDetail[] = [];

  for (const field of ['name', 'email', 'message'] as const) {
    const value = record[field];
    if (typeof value !== 'string') {
      issues.push({
        field,
        issue: value === undefined ? 'required' : 'type',
        message: `${field} must be provided as a string.`,
        hint: `Set ${field} to a non-empty string.`,
      });
      continue;
    }

    const trimmedValue = value.trim();
    if (!trimmedValue) {
      issues.push({
        field,
        issue: 'required',
        message: `${field} cannot be empty.`,
        hint: `Set ${field} to a non-empty string.`,
      });
      continue;
    }

    data[field] = trimmedValue;
  }

  if (typeof data.email === 'string' && !EMAIL_PATTERN.test(data.email)) {
    issues.push({
      field: 'email',
      issue: 'format',
      message: 'email must be a valid email address.',
      hint: 'Use an address such as name@example.com.',
    });
  }

  if (issues.length > 0) return { issues };
  return { data: data as ContactPayload };
}

export async function POST(request: NextRequest) {
  if (!isJsonRequest(request.headers.get('content-type'))) {
    return jsonError({
      status: 415,
      code: 'UNSUPPORTED_MEDIA_TYPE',
      message: 'Content-Type must be application/json',
      hint: 'Set Content-Type: application/json and send a JSON object.',
    });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return jsonError({
      status: 400,
      code: 'INVALID_JSON',
      message: 'Request body contains invalid JSON',
      hint: 'Check JSON syntax and send an object with name, email, and message.',
    });
  }

  const validation = validateContactPayload(payload);
  if (validation.issues) {
    return jsonError({
      status: 400,
      code: 'VALIDATION_ERROR',
      message: 'Contact payload validation failed',
      hint: 'Correct the fields listed in details and retry the request.',
      details: validation.issues,
    });
  }

  const dryRunValue = request.nextUrl.searchParams.get('dryRun');
  if (dryRunValue !== null && dryRunValue !== 'true' && dryRunValue !== 'false') {
    return jsonError({
      status: 400,
      code: 'VALIDATION_ERROR',
      message: 'dryRun must be true or false',
      hint: 'Use ?dryRun=true to validate without sending email.',
      details: [{
        field: 'dryRun',
        issue: 'format',
        message: 'dryRun must be a boolean query value.',
      }],
    });
  }

  if (dryRunValue === 'true') {
    return Response.json({
      success: true,
      message: 'Contact payload is valid. No email was sent.',
      sandbox: true,
    });
  }

  const { name, email, message } = validation.data;

  try {
    const agLanguage = request.cookies.get('aglanguage')?.value || 'en';

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

    return Response.json({
      success: true,
      message: 'Email sent successfully',
    });
  } catch (error) {
    console.error('Error sending email:', error);

    // Return different error messages based on the error type
    if (error instanceof Error) {
      if (error.message.includes('Invalid login')) {
        return jsonError({
          status: 500,
          code: 'EMAIL_CONFIGURATION_ERROR',
          message: 'Email configuration error',
          hint: 'Contact Antigua Tech Labs directly at info@antiguatechlabs.com.',
        });
      }
      if (error.message.includes('Network')) {
        return jsonError({
          status: 502,
          code: 'EMAIL_DELIVERY_FAILED',
          message: 'Email delivery failed',
          hint: 'Retry later or contact info@antiguatechlabs.com directly.',
        });
      }
    }

    return jsonError({
      status: 500,
      code: 'INTERNAL_ERROR',
      message: 'Failed to send email. Please try again later.',
      hint: 'Retry later or contact info@antiguatechlabs.com directly.',
    });
  }
}

const allowedMethods = [CONTACT_API.method];

export function GET() {
  return methodNotAllowed(allowedMethods);
}

export function HEAD() {
  return methodNotAllowed(allowedMethods);
}

export function PUT() {
  return methodNotAllowed(allowedMethods);
}

export function PATCH() {
  return methodNotAllowed(allowedMethods);
}

export function DELETE() {
  return methodNotAllowed(allowedMethods);
}

export function OPTIONS() {
  return optionsResponse(allowedMethods);
}
