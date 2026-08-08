import { NextResponse } from 'next/server';
import { destroyAdminSession, ADMIN_SESSION_COOKIE } from '@/lib/auth';

export async function POST() {
  await destroyAdminSession();
  const response = NextResponse.json({ success: true, data: { message: 'Logged out successfully' } });

  response.cookies.set(ADMIN_SESSION_COOKIE, '', {
    httpOnly: true,
    expires: new Date(0),
    path: '/',
  });

  return response;
}
