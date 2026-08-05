import { NextResponse } from 'next/server';
import { destroySession, ADMIN_SESSION_COOKIE } from '@/lib/auth';

export async function POST(request) {
  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  if (token) {
    await destroySession(token);
  }

  const response = NextResponse.json({ success: true });
  response.cookies.delete(ADMIN_SESSION_COOKIE);
  return response;
}
