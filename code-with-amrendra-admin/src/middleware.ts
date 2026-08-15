import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ADMIN_SESSION_COOKIE = 'admin_session_token';

export function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  const { pathname } = request.nextUrl;

  const isAuthRoute = pathname === '/login' || pathname === '/forgot-password' || pathname === '/reset-password';
  const isProtectedRoute =
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/content') ||
    pathname.startsWith('/media') ||
    pathname.startsWith('/seo') ||
    pathname.startsWith('/analytics') ||
    pathname.startsWith('/users') ||
    pathname.startsWith('/settings');

  // If user is already authenticated and visits login page, redirect to dashboard
  if (isAuthRoute && sessionToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // If user is not authenticated and attempts to access protected routes, redirect to login
  if (isProtectedRoute && !sessionToken) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/content/:path*',
    '/media/:path*',
    '/seo/:path*',
    '/analytics/:path*',
    '/users/:path*',
    '/settings/:path*',
    '/login',
    '/forgot-password',
    '/reset-password',
  ],
};
