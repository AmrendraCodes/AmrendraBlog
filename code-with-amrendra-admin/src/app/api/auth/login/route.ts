import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyPassword, hashPassword, createAdminSession, ADMIN_SESSION_COOKIE } from '@/lib/auth';
import { loginSchema } from '@/schemas/auth';
import { checkRateLimit, recordFailedAttempt, resetRateLimit, getClientIp } from '@/lib/rate-limit';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const clientIp = getClientIp(request);
  const rateLimitKey = `login:${clientIp}`;

  // Rate Limiting: max 5 failed attempts per 1 minute (60s)
  const rateCheck = checkRateLimit(rateLimitKey, 5, 60 * 1000);
  if (rateCheck.isLimited) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'TOO_MANY_REQUESTS',
          message: 'Too many login attempts. Please try again after some time.',
        },
      },
      {
        status: 429,
        headers: {
          'Retry-After': String(rateCheck.retryAfterSec),
        },
      }
    );
  }

  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      recordFailedAttempt(rateLimitKey, 60 * 1000);
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid JSON request payload',
          },
        },
        { status: 400 }
      );
    }

    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      recordFailedAttempt(rateLimitKey, 60 * 1000);
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: parsed.error.issues[0]?.message || 'Invalid login request payload',
          },
        },
        { status: 400 }
      );
    }

    const { email, password } = parsed.data;
    const normalizedEmail = email.trim().toLowerCase();

    // 1. Look up user in database
    let user = null;
    try {
      user = await prisma.user.findUnique({
        where: { email: normalizedEmail },
      });
    } catch (dbError) {
      console.error('Database connection error during login lookup:', dbError instanceof Error ? dbError.message : 'Unknown DB error');
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'DATABASE_ERROR',
            message: 'Database connection failed. Please ensure DATABASE_URL is configured and database is reachable.',
          },
        },
        { status: 503 }
      );
    }

    // 2. Fresh deployment bootstrap fallback (only if DB has zero users and env seed is configured)
    if (!user) {
      try {
        const totalUsers = await prisma.user.count();
        const initialEmail = (process.env.ADMIN_INITIAL_EMAIL || 'codewithamrendra@outlook.com').toLowerCase();
        const initialPassword = process.env.ADMIN_INITIAL_PASSWORD;

        if (totalUsers === 0 && initialPassword && normalizedEmail === initialEmail && password === initialPassword) {
          const seedPasswordHash = await hashPassword(initialPassword);
          user = await prisma.user.create({
            data: {
              name: 'Amrendra Kumar',
              email: initialEmail,
              passwordHash: seedPasswordHash,
              role: 'ADMIN',
            },
          });
        }
      } catch (bootstrapErr) {
        console.warn('Initial admin bootstrap check failed:', bootstrapErr instanceof Error ? bootstrapErr.message : 'Unknown bootstrap error');
      }
    }

    // 3. User not found
    if (!user) {
      recordFailedAttempt(rateLimitKey, 60 * 1000);
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_CREDENTIALS',
            message: 'Invalid email or password. Please verify your credentials.',
          },
        },
        { status: 401 }
      );
    }

    // 4. Verify password with bcrypt
    const isPasswordValid = await verifyPassword(password, user.passwordHash);
    if (!isPasswordValid) {
      recordFailedAttempt(rateLimitKey, 60 * 1000);
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_CREDENTIALS',
            message: 'Invalid email or password. Please verify your credentials.',
          },
        },
        { status: 401 }
      );
    }

    // 5. Successful login: reset rate limit attempts for this IP
    resetRateLimit(rateLimitKey);

    // 6. Create database session token
    let sessionToken: string;
    try {
      const sessionResult = await createAdminSession(user.id);
      sessionToken = sessionResult.token;
    } catch (sessionErr) {
      console.error('Failed to create admin session in database:', sessionErr instanceof Error ? sessionErr.message : 'Unknown session error');
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'SESSION_CREATE_ERROR',
            message: 'Failed to create active session. Please ensure the database schema is synchronized.',
          },
        },
        { status: 500 }
      );
    }

    // 6. Return response with httpOnly session cookie
    const response = NextResponse.json({
      success: true,
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    });

    response.cookies.set(ADMIN_SESSION_COOKIE, sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Unexpected login authentication error:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'SERVER_ERROR',
          message: 'An unexpected authentication error occurred.',
        },
      },
      { status: 500 }
    );
  }
}
