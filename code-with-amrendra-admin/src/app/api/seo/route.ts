import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

const defaultSeoConfig = {
  defaultTitle: 'Code with Amrendra | Full-Stack Software Engineering',
  defaultDescription: 'Articles, guides, and engineering insights on modern web development, architecture, AI, and systems by Amrendra Kumar.',
  defaultOgImage: 'https://codewithamrendra.in/images/og-default.png',
  robots: 'index, follow',
  canonicalDomain: 'https://codewithamrendra.in',
  sitemapEnabled: true,
};

export async function GET() {
  try {
    const settings = await prisma.settings.findUnique({ where: { id: 'global' } });

    let seo = defaultSeoConfig;
    if (settings?.seoDefaults) {
      try {
        seo = typeof settings.seoDefaults === 'string' ? JSON.parse(settings.seoDefaults) : settings.seoDefaults;
      } catch (parseErr) {
        console.error('Failed to parse seoDefaults JSON from DB:', parseErr);
      }
    }

    return NextResponse.json({ success: true, data: { seo } });
  } catch (error) {
    console.error('Fetch SEO settings error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: 'Failed to fetch SEO settings' } },
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
    const seoDefaultsString = JSON.stringify(body);

    const updated = await prisma.settings.upsert({
      where: { id: 'global' },
      create: {
        id: 'global',
        seoDefaults: seoDefaultsString,
      },
      update: {
        seoDefaults: seoDefaultsString,
      },
    });

    let returnedSeo = body;
    if (updated.seoDefaults) {
      try {
        returnedSeo = typeof updated.seoDefaults === 'string' ? JSON.parse(updated.seoDefaults) : updated.seoDefaults;
      } catch {}
    }

    return NextResponse.json({ success: true, data: { seo: returnedSeo } });
  } catch (error) {
    console.error('Update SEO settings error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: 'Failed to update SEO settings' } },
      { status: 500 }
    );
  }
}
