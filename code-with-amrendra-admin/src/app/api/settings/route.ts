import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

const defaultSettings = {
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
    const settings = await prisma.settings.findUnique({ where: { id: 'global' } });

    if (!settings) {
      return NextResponse.json({
        success: true,
        data: { settings: defaultSettings },
      });
    }

    let parsedSocialLinks = defaultSettings.socialLinks;
    if (settings.socialLinks) {
      try {
        parsedSocialLinks = typeof settings.socialLinks === 'string' ? JSON.parse(settings.socialLinks) : settings.socialLinks;
      } catch (parseErr) {
        console.error('Failed to parse socialLinks JSON from DB:', parseErr);
      }
    }

    const formattedSettings = {
      ...settings,
      socialLinks: parsedSocialLinks,
    };

    return NextResponse.json({
      success: true,
      data: { settings: formattedSettings },
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
    const socialLinksString = JSON.stringify(body.socialLinks || {});

    const updated = await prisma.settings.upsert({
      where: { id: 'global' },
      create: {
        id: 'global',
        siteName: body.siteName || 'Code with Amrendra',
        contactEmail: body.contactEmail,
        phone: body.phone,
        address: body.address,
        analyticsId: body.analyticsId,
        socialLinks: socialLinksString,
      },
      update: {
        siteName: body.siteName,
        contactEmail: body.contactEmail,
        phone: body.phone,
        address: body.address,
        analyticsId: body.analyticsId,
        socialLinks: socialLinksString,
      },
    });

    let returnedSocialLinks = body.socialLinks || {};
    if (updated.socialLinks) {
      try {
        returnedSocialLinks = typeof updated.socialLinks === 'string' ? JSON.parse(updated.socialLinks) : updated.socialLinks;
      } catch {}
    }

    const returnedSettings = {
      ...updated,
      socialLinks: returnedSocialLinks,
    };

    return NextResponse.json({ success: true, data: { settings: returnedSettings } });
  } catch (error) {
    console.error('Update settings error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: 'Failed to update settings' } },
      { status: 500 }
    );
  }
}
