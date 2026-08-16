import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAllPostsAsync } from '@/lib/posts';

export const dynamic = 'force-dynamic';

export async function GET() {
  const diagnostics = {
    hasDatabaseUrl: Boolean(process.env.DATABASE_URL),
    databaseUrlMasked: process.env.DATABASE_URL ? process.env.DATABASE_URL.replace(/:([^:@]+)@/, ':****@') : null,
    nodeEnv: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  };

  try {
    const rawDbPosts = await prisma.blog.findMany({
      where: { status: 'PUBLISHED' },
      select: {
        id: true,
        title: true,
        slug: true,
        status: true,
        publishedAt: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    const allPostsAsync = await getAllPostsAsync();

    return NextResponse.json({
      success: true,
      diagnostics,
      rawDbCount: rawDbPosts.length,
      rawDbPosts,
      getAllPostsCount: allPostsAsync.length,
      getAllPostsFirst3: allPostsAsync.slice(0, 3).map(p => ({ title: p.title, slug: p.slug, date: p.date })),
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      diagnostics,
      error: {
        message: error?.message || String(error),
        name: error?.name,
        code: error?.code,
        stack: error?.stack,
      },
    }, { status: 500 });
  }
}
