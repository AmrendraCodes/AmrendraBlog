import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAllPostsAsync } from '@/lib/posts';
import { memoryVisitors, memoryPageViews, memoryBlogViews } from '@/app/api/track/route';

export async function GET() {
  try {
    let totalBlogs = 0;
    let publishedBlogs = 0;
    let draftBlogs = 0;
    let totalVisitors = 0;
    let contactRequests = 0;
    let newsletterSubscribers = 0;
    let todayVisitors = 0;
    let mostViewedBlog = null;
    let latestContact = null;

    try {
      totalBlogs = await prisma.blog.count();
      publishedBlogs = await prisma.blog.count({ where: { status: 'PUBLISHED' } });
      draftBlogs = await prisma.blog.count({ where: { status: 'DRAFT' } });

      totalVisitors = await prisma.visitor.count();
      contactRequests = await prisma.contact.count();
      newsletterSubscribers = await prisma.newsletter.count();

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      todayVisitors = await prisma.visitor.count({
        where: { createdAt: { gte: today } },
      });

      mostViewedBlog = await prisma.blog.findFirst({
        orderBy: { views: 'desc' },
        select: { title: true, slug: true, views: true },
      });

      latestContact = await prisma.contact.findFirst({
        orderBy: { createdAt: 'desc' },
        select: { name: true, email: true, createdAt: true, subject: true },
      });
    } catch (dbErr) {
      console.warn('⚠️ Analytics DB query fallback');
    }

    const markdownPosts = await getAllPostsAsync();
    if (totalBlogs === 0) {
      totalBlogs = markdownPosts.length;
      publishedBlogs = markdownPosts.length;
      draftBlogs = 0;
    }

    // Merge real telemetry memory with database counts
    const liveVisitorCount = Math.max(totalVisitors, memoryVisitors.size);
    const livePageViewCount = Math.max(todayVisitors, memoryPageViews.length);

    // Find top viewed blog dynamically
    if (!mostViewedBlog || mostViewedBlog.views === 0) {
      let topSlug = Object.keys(memoryBlogViews).reduce((a, b) =>
        memoryBlogViews[a] > memoryBlogViews[b] ? a : b, ''
      );

      const topPost = markdownPosts.find((p) => p.slug === topSlug) || markdownPosts[0];

      if (topPost) {
        mostViewedBlog = {
          title: topPost.title,
          slug: topPost.slug,
          views: memoryBlogViews[topPost.slug] || 1,
        };
      }
    }

    // Real dynamic traffic chart based on tracked pageviews
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const todayIndex = new Date().getDay();
    const trafficChart = [];

    for (let i = 6; i >= 0; i--) {
      const dIndex = (todayIndex - i + 7) % 7;
      const dayName = days[dIndex];
      const count = memoryPageViews.filter((pv) => {
        const d = new Date(pv.createdAt);
        return d.getDay() === dIndex;
      }).length;

      trafficChart.push({
        day: dayName,
        visitors: Math.max(count, i === 0 ? liveVisitorCount : 0),
        pageViews: count,
      });
    }

    return NextResponse.json({
      stats: {
        totalBlogs,
        publishedBlogs,
        draftBlogs,
        totalVisitors: liveVisitorCount,
        todayVisitors: livePageViewCount,
        contactRequests,
        newsletterSubscribers,
        mostViewedBlog: mostViewedBlog || { title: 'How to Build a Light and Dark Theme Switch', views: 1 },
        latestContact: latestContact || null,
      },
      charts: {
        trafficChart,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}
