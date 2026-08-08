import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthSession } from '@/lib/auth';

let memorySettings = {
  siteName: 'Code with Amrendra',
  contactEmail: 'contact@codewithamrendra.in',
  phone: '+91 9876543210',
  address: 'New Delhi, India',
  analyticsId: 'GA-CW-2026-X',
  logoUrl: '/logo.svg',
  faviconUrl: '/favicon.ico',
  socialLinks: {
    github: 'https://github.com/amrendra',
    twitter: 'https://twitter.com/codewithamrendra',
    linkedin: 'https://linkedin.com/in/amrendra',
  },
};

export async function GET() {
  try {
    let settings = null;
    try {
      settings = await prisma.settings.findUnique({ where: { id: 'global' } });
    } catch {
      // Fallback
    }

    return NextResponse.json({
      success: true,
      data: { settings: settings || memorySettings },
    });
  } catch (error) {
    console.error('Fetch settings error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: 'Failed to fetch settings' } },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Not authenticated' } },
        { status: 401 }
      );
    }

    const body = await request.json();
    try {
      await prisma.settings.upsert({
        where: { id: 'global' },
        create: {
          id: 'global',
          siteName: body.siteName || 'Code with Amrendra',
          contactEmail: body.contactEmail,
          phone: body.phone,
          address: body.address,
          analyticsId: body.analyticsId,
          socialLinks: body.socialLinks || {},
        },
        update: {
          siteName: body.siteName,
          contactEmail: body.contactEmail,
          phone: body.phone,
          address: body.address,
          analyticsId: body.analyticsId,
          socialLinks: body.socialLinks || {},
        },
      });
    } catch {
      memorySettings = { ...memorySettings, ...body };
    }

    return NextResponse.json({ success: true, data: { settings: body } });
  } catch (error) {
    console.error('Update settings error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: 'Failed to update settings' } },
      { status: 500 }
    );
  }
}
