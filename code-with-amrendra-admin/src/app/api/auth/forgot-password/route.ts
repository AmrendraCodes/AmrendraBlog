import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';
import { sendPasswordResetEmail } from '@/lib/email';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = forgotPasswordSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: parsed.error.issues[0]?.message || 'Please enter a valid email address',
          },
        },
        { status: 400 }
      );
    }

    const { email } = parsed.data;
    const normalizedEmail = email.toLowerCase().trim();

    // User enumeration protection response
    const genericResponse = NextResponse.json({
      success: true,
      message: 'If an account exists for this email address, a password reset link has been sent.',
    });

    let user = null;
    try {
      user = await prisma.user.findUnique({
        where: { email: normalizedEmail },
      });
    } catch (err) {
      console.warn('User query warning in forgot-password:', err);
    }

    // Check if matching seed fallback admin if DB user not found
    let targetUserId = user?.id;
    let targetUserName = user?.name || 'Admin';

    if (!user && normalizedEmail === 'codewithamrendra@outlook.com') {
      targetUserId = 'seed-admin-user';
      targetUserName = 'Amrendra Kumar';
    }

    if (!targetUserId) {
      // User not found — return generic response without revealing account existence
      return genericResponse;
    }

    // Generate cryptographically secure random token (64 hex characters)
    const rawToken = crypto.randomBytes(32).toString('hex');

    // Hash token with SHA-256 before database storage
    const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');

    // Expiration: 30 minutes from now
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

    // Save token in DB (if DB table exists)
    try {
      // Delete any pre-existing reset tokens for this user
      await (prisma as any).passwordResetToken.deleteMany({
        where: { userId: targetUserId },
      });

      await (prisma as any).passwordResetToken.create({
        data: {
          tokenHash,
          userId: targetUserId,
          expiresAt,
        },
      });
    } catch (dbErr) {
      console.warn('PasswordResetToken DB storage warning:', dbErr);
    }

    // Determine Base URL (No hardcoded localhost in production)
    const hostHeader = request.headers.get('host') || 'localhost:3000';
    const protocol = request.headers.get('x-forwarded-proto') || (hostHeader.includes('localhost') ? 'http' : 'https');
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || `${protocol}://${hostHeader}`;

    const resetUrl = `${baseUrl}/reset-password?token=${rawToken}`;

    // Send email notification
    await sendPasswordResetEmail({
      email: normalizedEmail,
      name: targetUserName,
      resetUrl,
      expiresMinutes: 30,
    });

    return genericResponse;
  } catch (error) {
    console.error('Forgot Password API error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: 'An unexpected error occurred. Please try again.' } },
      { status: 500 }
    );
  }
}
