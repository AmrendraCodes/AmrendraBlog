import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { revalidatePublicBlog } from '@/lib/public-site-revalidation';

export const dynamic = 'force-dynamic';

async function handlePublishScheduled(request: Request) {
  try {
    const cronSecret = process.env.CRON_SECRET;

    // Validate CRON_SECRET if configured (Vercel Cron sends "Authorization: Bearer <CRON_SECRET>")
    if (cronSecret) {
      const authHeader = request.headers.get('authorization');
      const url = new URL(request.url);
      const querySecret = url.searchParams.get('secret');

      const isAuthorized =
        (authHeader && authHeader === `Bearer ${cronSecret}`) ||
        (querySecret && querySecret === cronSecret);

      if (!isAuthorized) {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: 'UNAUTHORIZED',
              message: 'Invalid or missing cron authorization secret',
            },
          },
          { status: 401 }
        );
      }
    }

    const now = new Date();

    // Find all scheduled posts whose schedule time has arrived
    const duePosts = await prisma.blog.findMany({
      where: {
        status: 'SCHEDULED',
        scheduledAt: {
          lte: now,
        },
      },
      select: {
        id: true,
        title: true,
        slug: true,
        categorySlug: true,
        scheduledAt: true,
        publishedAt: true,
      },
    });

    if (duePosts.length === 0) {
      return NextResponse.json({
        success: true,
        data: {
          publishedCount: 0,
          posts: [],
          message: 'No scheduled posts due for publication.',
        },
      });
    }

    const publishedResults = [];

    for (const post of duePosts) {
      const updated = await prisma.blog.update({
        where: { id: post.id },
        data: {
          status: 'PUBLISHED',
          publishedAt: post.publishedAt || now,
        },
      });

      publishedResults.push({
        id: updated.id,
        title: updated.title,
        slug: updated.slug,
      });

      // Invalidate public site cache
      try {
        revalidatePath('/resources/blog');
        revalidatePath('/blog');
        revalidatePath('/');
        revalidatePath('/categories');
        if (post.categorySlug) revalidatePath(`/category/${post.categorySlug}`);
        if (post.slug) {
          revalidatePath(`/resources/blog/${post.slug}`);
          revalidatePath(`/blog/${post.slug}`);
        }
      } catch {
        // Continue if revalidation warning in dev
      }

      await revalidatePublicBlog({ slug: post.slug, categorySlug: post.categorySlug });
    }

    return NextResponse.json({
      success: true,
      data: {
        publishedCount: publishedResults.length,
        posts: publishedResults,
        message: `Successfully published ${publishedResults.length} scheduled post(s).`,
      },
    });
  } catch (error) {
    console.error('Error during scheduled post publication cron:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'CRON_EXECUTION_ERROR',
          message: error instanceof Error ? error.message : 'Internal cron error',
        },
      },
      { status: 500 }
    );
  }
}

// Support both GET (default for Vercel Cron) and POST
export async function GET(request: Request) {
  return handlePublishScheduled(request);
}

export async function POST(request: Request) {
  return handlePublishScheduled(request);
}
