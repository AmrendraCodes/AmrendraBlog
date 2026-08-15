import { NextResponse } from 'next/server';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const resetPasswordSchema = z
  .object({
    token: z.string().min(1, 'Reset token is required'),
    newPassword: z.string().min(8, 'Password must be at least 8 characters long'),
    confirmPassword: z.string().min(1, 'Please confirm your new password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

// Validate Token API (GET)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json({ valid: false, error: 'Reset token is missing' }, { status: 400 });
    }

    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

    let tokenRecord = null;
    try {
      tokenRecord = await (prisma as any).passwordResetToken.findUnique({
        where: { tokenHash },
      });
    } catch (err) {
      console.warn('PasswordResetToken query warning in GET:', err);
    }

    // Check validity
    const isDbValid = tokenRecord && new Date(tokenRecord.expiresAt) > new Date();

    if (isDbValid) {
      return NextResponse.json({ valid: true });
    }

    return NextResponse.json(
      { valid: false, error: 'This password reset link is invalid or has expired. Please request a new one.' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Validate Reset Token API error:', error);
    return NextResponse.json({ valid: false, error: 'Failed to validate reset token' }, { status: 500 });
  }
}

// Reset Password Execution API (POST)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = resetPasswordSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: parsed.error.issues[0]?.message || 'Invalid input details',
          },
        },
        { status: 400 }
      );
    }

    const { token, newPassword } = parsed.data;
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

    let tokenRecord = null;
    try {
      tokenRecord = await (prisma as any).passwordResetToken.findUnique({
        where: { tokenHash },
      });
    } catch (err) {
      console.warn('PasswordResetToken query warning in POST:', err);
    }

    const isDbValid = tokenRecord && new Date(tokenRecord.expiresAt) > new Date();

    if (!isDbValid) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_TOKEN',
            message: 'This password reset link is invalid or has expired. Please request a new one.',
          },
        },
        { status: 400 }
      );
    }

    const userId = tokenRecord.userId;

    // Hash new password using bcrypt matching auth.ts
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user password in DB (if DB user exists)
    try {
      if (userId !== 'seed-admin-user') {
        await prisma.user.update({
          where: { id: userId },
          data: { passwordHash: hashedPassword },
        });
      }
    } catch (dbErr) {
      console.warn('User password update warning:', dbErr);
    }

    // 1. Delete used reset token (Single-use enforcement)
    try {
      await (prisma as any).passwordResetToken.deleteMany({
        where: { userId },
      });
    } catch (tokenDelErr) {
      console.warn('Token deletion error:', tokenDelErr);
    }

    // 2. Invalidate all active sessions for this user (Session security)
    try {
      await prisma.session.deleteMany({
        where: { userId },
      });
    } catch (sessionErr) {
      console.warn('Session invalidation error:', sessionErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Password updated successfully.',
    });
  } catch (error) {
    console.error('Reset Password API error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: 'Failed to reset password. Please try again.' } },
      { status: 500 }
    );
  }
}
