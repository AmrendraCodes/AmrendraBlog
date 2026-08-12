import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyPassword, createAdminSession, ADMIN_SESSION_COOKIE } from '@/lib/auth';
import { loginSchema } from '@/schemas/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: parsed.error.issues[0]?.message || 'Invalid request' } },
        { status: 400 }
      );
    }

    const { email, password } = parsed.data;

    let user = null;
    try {
      user = await prisma.user.findUnique({
        where: { email: email.toLowerCase() },
      });
    } catch {
      // Fallback dev check
    }

    if (!user) {
      // Fallback for seed admin credential if DB is not yet populated
      if (email.toLowerCase() === 'codewithamrendra@outlook.com' && password === 'Admin@1234') {
        const token = 'session_seed_' + Date.now();
        const response = NextResponse.json({
          success: true,
          data: {
            user: {
              id: 'seed-admin-user',
              name: 'Amrendra Kumar',
              email: 'codewithamrendra@outlook.com',
              role: 'ADMIN',
            },
          },
        });

        response.cookies.set(ADMIN_SESSION_COOKIE, token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/',
          maxAge: 7 * 24 * 60 * 60,
        });

        return response;
      }

      return NextResponse.json(
        { success: false, error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' } },
        { status: 401 }
      );
    }

    const isValid = await verifyPassword(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json(
        { success: false, error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' } },
        { status: 401 }
      );
    }

    const { token } = await createAdminSession(user.id);
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

    response.cookies.set(ADMIN_SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: 'An error occurred during authentication' } },
      { status: 500 }
    );
  }
}
