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
          error: { message: 'Too many subscription attempts. Please wait a few minutes.' },
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

    const { email } = body || {};

    // Validate email
    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim()) || email.trim().length > 254) {
      return NextResponse.json(
        { success: false, error: { message: 'A valid email address is required.' } },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check if already subscribed
    const existing = await prisma.newsletter.findUnique({
      where: { email: normalizedEmail },
    });

    if (existing) {
      return NextResponse.json(
        {
          success: true,
          isDuplicate: true,
          message: 'Looks like you are already subscribed!',
        },
        { status: 200 }
      );
    }

    // Persist new subscriber
    await prisma.newsletter.create({
      data: {
        email: normalizedEmail,
      },
    });

    return NextResponse.json(
      {
        success: true,
        isDuplicate: false,
        message: 'Successfully subscribed to the newsletter!',
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('Newsletter subscription error:', err);
    return NextResponse.json(
      {
        success: false,
        error: { message: 'Failed to subscribe. Please try again later.' },
      },
      { status: 500 }
    );
  }
}
