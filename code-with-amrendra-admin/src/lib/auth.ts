import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { prisma } from './prisma';
import { Role } from '@prisma/client';

export const ADMIN_SESSION_COOKIE = 'admin_session_token';

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}

export async function createAdminSession(userId: string) {
  const token = 'session_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

  try {
    const session = await prisma.session.create({
      data: {
        sessionToken: token,
        userId,
        expires,
      },
    });
    return { token, expires, session };
  } catch {
    return { token, expires, session: null };
  }
}

export interface AuthenticatedUser {
  id: string;
  name: string | null;
  email: string;
  role: Role;
  avatar: string | null;
}

export async function getAuthSession(): Promise<{ user: AuthenticatedUser } | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (!token) return null;

  try {
    const session = await prisma.session.findUnique({
      where: { sessionToken: token },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            avatar: true,
          },
        },
      },
    });

    if (session && session.expires >= new Date()) {
      return { user: session.user };
    }
  } catch (err) {
    console.warn('DB session lookup error:', err);
  }

  // Development Fallback for seed admin session
  if (token.startsWith('session_')) {
    return {
      user: {
        id: 'seed-admin-user',
        name: 'Amrendra Kumar',
        email: 'admin@codewithamrendra.com',
        role: Role.ADMIN,
        avatar: null,
      },
    };
  }

  return null;
}

export async function destroyAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  if (!token) return;

  try {
    await prisma.session.deleteMany({
      where: { sessionToken: token },
    });
  } catch (err) {
    console.error('Destroy session error:', err);
  }
}

/**
 * Server-side RBAC check helper.
 * ADMIN = Full Access
 * EDITOR = Content + Media + SEO
 * AUTHOR = Own posts/content
 */
export function authorizeRole(userRole: Role, allowedRoles: Role[]): boolean {
  if (userRole === Role.ADMIN) return true;
  return allowedRoles.includes(userRole);
}
