import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Not authenticated' } },
        { status: 401 }
      );
    }
    const [
      totalBlogsCount,
      publishedBlogsCount,
      draftBlogsCount,
      categoriesCount,
      mediaCount,
      visitorsCount,
      pageViewsCount,
      recentPostsList,
      deviceCounts,
      referrerCounts,
    ] = await Promise.all([
      prisma.blog.count(),
      prisma.blog.count({ where: { status: 'PUBLISHED' } }),
      prisma.blog.count({ where: { status: 'DRAFT' } }),
      prisma.category.count(),
      prisma.media.count(),
      prisma.visitor.count(),
      prisma.pageView.count(),
      prisma.blog.findMany({
        take: 5,
        orderBy: { updatedAt: 'desc' },
        include: { category: true },
      }),
      prisma.visitor.groupBy({ by: ['device'], _count: { _all: true } }),
      prisma.pageView.groupBy({
        by: ['referrer'],
        _count: { _all: true },
        orderBy: { _count: { referrer: 'desc' } },
        take: 5,
      }),
    ]);

    const knownDeviceCount = deviceCounts.reduce((sum, item) => sum + item._count._all, 0);
    const devices = deviceCounts
      .filter((item) => item.device)
      .map((item) => ({
        name: item.device as string,
        percentage: knownDeviceCount ? Math.round((item._count._all / knownDeviceCount) * 100) : 0,
      }));
    const trafficSources = referrerCounts.map((item) => {
      let source = 'Direct';
      if (item.referrer) {
        try {
          source = new URL(item.referrer).hostname;
        } catch {
          source = item.referrer;
        }
      }
      return { source, views: item._count._all };
    });

    return NextResponse.json({
      success: true,
      data: {
        stats: {
          totalBlogs: totalBlogsCount,
          publishedBlogs: publishedBlogsCount,
          draftBlogs: draftBlogsCount,
          totalCategories: categoriesCount,
          totalMedia: mediaCount,
          totalVisitors: visitorsCount,
          totalPageViews: pageViewsCount,
        },
        recentPosts: recentPostsList,
        devices,
        trafficSources,
      },
    });
  } catch (error) {
    console.error('Fetch analytics error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'DATABASE_ERROR', message: 'Dashboard data could not be loaded. Check the database connection and schema, then retry.' } },
      { status: 500 }
    );
  }
}
