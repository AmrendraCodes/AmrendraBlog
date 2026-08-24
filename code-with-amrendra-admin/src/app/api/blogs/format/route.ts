import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthSession } from '@/lib/auth';
import { formatArticleMarkdown, InterlinkTarget } from '@/lib/formatter';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json(
        { success: false, error: { message: 'Not authenticated' } },
        { status: 401 }
      );
    }
    const body = await request.json();
    const { content, slug, title } = body;

    if (!content) {
      return NextResponse.json(
        { success: false, error: { message: 'Content is required for formatting' } },
        { status: 400 }
      );
    }

    // Fetch published posts from database to build live interlink rules
    let dbRules: InterlinkTarget[] = [];
    try {
      const publishedPosts = await prisma.blog.findMany({
        where: { status: 'PUBLISHED' },
        select: { title: true, slug: true },
        take: 100,
      });

      dbRules = publishedPosts
        .filter((p) => p.slug !== slug)
        .map((p) => ({
          keywords: [p.title, p.slug.replace(/-/g, ' ')],
          url: `/resources/blog/${p.slug}`,
          title: p.title,
        }));
    } catch {
      // Prisma error fallback
      dbRules = [];
    }

    const result = formatArticleMarkdown(content, {
      currentSlug: slug,
      articleTitle: title,
      customRules: dbRules,
    });

    return NextResponse.json({
      success: true,
      data: {
        formattedContent: result.formattedContent,
        stats: result.stats,
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to format content';
    console.error('Format blog error:', error);
    return NextResponse.json(
      { success: false, error: { message } },
      { status: 500 }
    );
  }
}
