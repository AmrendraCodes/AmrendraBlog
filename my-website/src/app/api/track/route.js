import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// In-memory telemetry buffer for real-time tracking fallback
let memoryPageViews = [];
let memoryVisitors = new Set();
let memoryBlogViews = {};

export async function POST(request) {
  try {
    let body = {};
    try {
      body = await request.json();
    } catch (e) {
      body = {};
    }
    const { path, referrer, slug } = body || {};

    const userAgent = request.headers?.get?.('user-agent') || 'Unknown';
    const ip = request.headers?.get?.('x-forwarded-for') || '127.0.0.1';

    // 1. Increment blog view if it's a blog post page
    if (slug) {
      memoryBlogViews[slug] = (memoryBlogViews[slug] || 0) + 1;
      if (process.env.DATABASE_URL) {
        try {
          await prisma.blog.update({
            where: { slug },
            data: { views: { increment: 1 } },
          });
        } catch (err) {}
      }
    }

    // 2. Record visitor & pageview
    const visitorKey = `${ip}-${userAgent.slice(0, 30)}`;
    memoryVisitors.add(visitorKey);
    memoryPageViews.push({
      path: path || '/',
      referrer: referrer || 'Direct',
      createdAt: new Date(),
    });

    if (process.env.DATABASE_URL) {
      try {
        let visitor = await prisma.visitor.findFirst({
          where: { ip, userAgent },
        });

        if (!visitor) {
          visitor = await prisma.visitor.create({
            data: {
              ip,
              userAgent,
              browser: userAgent.includes('Chrome') ? 'Chrome' : userAgent.includes('Firefox') ? 'Firefox' : 'Safari',
              device: userAgent.includes('Mobile') ? 'Mobile' : 'Desktop',
            },
          });
        }

        if (visitor) {
          await prisma.pageView.create({
            data: {
              path: path || '/',
              referrer: referrer || 'Direct',
              visitorId: visitor.id,
            },
          });
        }
      } catch (err) {}
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    totalVisitors: memoryVisitors.size,
    totalPageViews: memoryPageViews.length,
    blogViews: memoryBlogViews,
  });
}

export { memoryVisitors, memoryPageViews, memoryBlogViews };
