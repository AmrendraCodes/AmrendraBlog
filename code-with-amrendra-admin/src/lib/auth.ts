import bcrypt from 'bcryptjs';
import { cookies, headers } from 'next/headers';
import { prisma } from './prisma';
export enum Role {
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR',
  AUTHOR = 'AUTHOR',
}

export const ADMIN_SESSION_COOKIE = 'admin_session_token';

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}

export async function createAdminSession(userId: string) {
  const token = `cwa_${Date.now()}_${Math.random().toString(36).substring(2, 15)}_${Math.random().toString(36).substring(2, 15)}`;
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

  const session = await prisma.session.create({
    data: {
      sessionToken: token,
      userId,
      expires,
    },
  });
  return { token, expires, session };
}

export interface AuthenticatedUser {
  id: string;
  name: string | null;
  email: string;
  role: Role;
  avatar: string | null;
}

export async function getAuthSession(): Promise<{ user: AuthenticatedUser } | null> {
  let token: string | undefined;

  // 1. Try to read Bearer token from request Authorization header
  try {
    const headersList = await headers();
    const authHeader = headersList.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7).trim();
    }
  } catch {
    // Headers lookup fallback
  }

  // 2. Fall back to secure HTTP-only session cookie
  if (!token) {
    try {
      const cookieStore = await cookies();
      token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
    } catch {
      // Cookies lookup fallback
    }
  }

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

    if (session && session.user && session.expires >= new Date()) {
      return { user: { ...session.user, role: session.user.role as Role } };
    }
  } catch (err) {
    console.warn('DB session lookup error:', err);
  }

  // Strict Development Fallback: Requires explicit non-production environment AND an exact match against DEV_SEED_ADMIN_TOKEN env variable
  if (
    process.env.NODE_ENV !== 'production' &&
    process.env.DEV_SEED_ADMIN_TOKEN &&
    token === process.env.DEV_SEED_ADMIN_TOKEN
  ) {
    return {
      user: {
        id: 'seed-admin-user',
        name: 'Amrendra Kumar',
        email: 'codewithamrendra@outlook.com',
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
