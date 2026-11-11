import { NextResponse } from 'next/server';
import { z } from 'zod';
import { fetchHtmlSafely, extractPageDataWithCheerio } from '@/features/seo-tools/lib/secureUrlFetcher.js';

// In-memory rate limiter (5 requests per minute per IP for MVP)
// Note: In serverless environments (Vercel), in-memory stores apply per-container instance.
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 6;

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip) || { count: 0, resetAt: now + RATE_LIMIT_WINDOW_MS };

  if (now > entry.resetAt) {
    entry.count = 1;
    entry.resetAt = now + RATE_LIMIT_WINDOW_MS;
    rateLimitMap.set(ip, entry);
    return { allowed: true };
  }

  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    const retryAfterSec = Math.ceil((entry.resetAt - now) / 1000);
    return { allowed: false, retryAfter: retryAfterSec };
  }

  entry.count++;
  rateLimitMap.set(ip, entry);
  return { allowed: true };
}

// Zod Input Schema
const RequestSchema = z.object({
  url: z.string().trim().url({ message: 'Please enter a valid URL including http:// or https://' }),
});

export async function POST(req) {
  // Extract client IP
  const forwardedFor = req.headers.get('x-forwarded-for');
  const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1';

  // Apply rate limit
  const rateLimit = checkRateLimit(ip);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        success: false,
        error: `Rate limit reached. Please wait ${rateLimit.retryAfter}s before analyzing another URL.`,
      },
      { status: 429 }
    );
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, error: 'Malformed JSON payload.' },
      { status: 400 }
    );
  }

  // Validate input
  const validation = RequestSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      {
        success: false,
        error: validation.error.errors[0]?.message || 'Invalid URL provided.',
      },
      { status: 400 }
    );
  }

  const { url } = validation.data;

  try {
    const { html, finalUrl } = await fetchHtmlSafely(url);
    const extracted = extractPageDataWithCheerio(html);

    return NextResponse.json({
      success: true,
      data: {
        ...extracted,
        finalUrl,
      },
    });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        error: err.message || 'An unexpected error occurred while fetching the URL.',
      },
      { status: 400 }
    );
  }
}

