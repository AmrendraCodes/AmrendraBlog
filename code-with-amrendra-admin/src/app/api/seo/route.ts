import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthSession } from '@/lib/auth';

let defaultSeoConfig = {
  defaultTitle: 'Code with Amrendra | Full-Stack Software Engineering',
  defaultDescription: 'Articles, guides, and engineering insights on modern web development, architecture, AI, and systems by Amrendra Kumar.',
  defaultOgImage: 'https://codewithamrendra.in/images/og-default.png',
  robots: 'index, follow',
  canonicalDomain: 'https://codewithamrendra.in',
  sitemapEnabled: true,
};

export async function GET() {
  try {
    let settings = null;
    try {
      settings = await prisma.settings.findUnique({ where: { id: 'global' } });
    } catch {
      // Fallback
    }

    const seo = (settings?.seoDefaults as any) || defaultSeoConfig;
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
    try {
      await prisma.settings.upsert({
        where: { id: 'global' },
        create: { id: 'global', seoDefaults: body },
        update: { seoDefaults: body },
      });
    } catch {
      defaultSeoConfig = { ...defaultSeoConfig, ...body };
    }

    return NextResponse.json({ success: true, data: { seo: body } });
  } catch (error) {
    console.error('Update SEO settings error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: 'Failed to update SEO settings' } },
      { status: 500 }
    );
  }
}
