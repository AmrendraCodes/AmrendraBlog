import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// In-memory rate limiting map for sliding window (limits rapid spam)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

function checkRateLimit(ip) {
  const now = Date.now();
  const clientData = rateLimitMap.get(ip);

  // Periodic cleanup of expired entries
  if (rateLimitMap.size > 1000) {
    for (const [key, val] of rateLimitMap.entries()) {
      if (now - val.startTime > RATE_LIMIT_WINDOW_MS) {
        rateLimitMap.delete(key);
      }
    }
  }

  if (!clientData || now - clientData.startTime > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, startTime: now });
    return { allowed: true };
  }

  if (clientData.count >= MAX_REQUESTS_PER_WINDOW) {
    return { allowed: false };
  }

  clientData.count += 1;
  return { allowed: true };
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  try {
    const rawIp = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '127.0.0.1';
    const clientIp = rawIp.split(',')[0].trim();

    // Check rate limit
    const { allowed } = checkRateLimit(clientIp);
    if (!allowed) {
      return NextResponse.json(
        {
          success: false,
          error: { message: 'Too many requests. Please wait a few minutes before sending another message.' },
        },
        { status: 429 }
      );
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: { message: 'Invalid JSON payload in request body.' } },
        { status: 400 }
      );
    }

    const { name, email, subject, message, company, phone } = body || {};

    // Validate name
    if (!name || typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 100) {
      return NextResponse.json(
        { success: false, error: { message: 'Name is required (between 2 and 100 characters).' } },
        { status: 400 }
      );
    }

    // Validate email
    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim()) || email.trim().length > 254) {
      return NextResponse.json(
        { success: false, error: { message: 'A valid email address is required.' } },
        { status: 400 }
      );
    }

    // Validate message
    if (!message || typeof message !== 'string' || message.trim().length < 5 || message.trim().length > 5000) {
      return NextResponse.json(
        { success: false, error: { message: 'Message is required (between 5 and 5000 characters).' } },
        { status: 400 }
      );
    }

    // Validate optional subject
    const cleanSubject = typeof subject === 'string' && subject.trim() ? subject.trim().slice(0, 200) : 'General Inquiry';
    const cleanCompany = typeof company === 'string' && company.trim() ? company.trim().slice(0, 100) : null;
    const cleanPhone = typeof phone === 'string' && phone.trim() ? phone.trim().slice(0, 50) : null;

    // Persist to PostgreSQL database using Prisma Contact model
    const contact = await prisma.contact.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        subject: cleanSubject,
        message: message.trim(),
        company: cleanCompany,
        phone: cleanPhone,
        status: 'UNREAD',
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          id: contact.id,
          message: 'Thank you! Your message has been received.',
        },
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('Contact submission error:', err);
    return NextResponse.json(
      {
        success: false,
        error: { message: 'Failed to send your message. Please try again later.' },
      },
      { status: 500 }
    );
  }
}
