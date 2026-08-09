import { NextResponse } from 'next/server';

export function middleware(request) {
  const host = request.headers.get('host') || '';

  // 1. WWW -> Non-WWW 301 Permanent Redirect
  if (host.startsWith('www.')) {
    const canonicalHost = host.replace(/^www\./, '');
    const url = request.nextUrl.clone();
    url.protocol = 'https:';
    url.host = canonicalHost;
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - static image/asset files
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico)).*)',
  ],
};
