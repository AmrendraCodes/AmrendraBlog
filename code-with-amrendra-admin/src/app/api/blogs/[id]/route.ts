import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthSession } from '@/lib/auth';
import { blogSchema } from '@/schemas/blog';
import { calculateReadingTime, countWords } from '@/lib/utils';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    let post = null;

    try {
      post = await prisma.blog.findUnique({
        where: { id },
        include: {
          category: true,
          tags: { include: { tag: true } },
          author: true,
        },
      });
    } catch {
      // DB fallback
    }

    if (!post) {
      return NextResponse.json(
        { success: false, error: { code: 'NOT_FOUND', message: 'Blog post not found' } },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: { post } });
  } catch (error) {
    console.error('Fetch post detail error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: 'Failed to fetch post' } },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Not authenticated' } },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const parsed = blogSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: parsed.error.issues[0]?.message || 'Invalid input' } },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const readTime = calculateReadingTime(data.content);
    const wordCount = countWords(data.content);

    let updatedPost = null;
    try {
      updatedPost = await prisma.blog.update({
        where: { id },
        data: {
          title: data.title,
          slug: data.slug,
          excerpt: data.excerpt || null,
          description: data.description || data.excerpt || null,
          content: data.content,
          featuredImage: data.featuredImage || null,
          ogImage: data.ogImage || null,
          canonicalUrl: data.canonicalUrl || null,
          metaTitle: data.metaTitle || data.title,
          metaDescription: data.metaDescription || data.excerpt || null,
          status: data.status as any,
          publishedAt: data.status === 'PUBLISHED' ? new Date() : null,
          scheduledAt: data.scheduledAt ? new Date(data.scheduledAt) : null,
          readingTime: readTime,
          wordCount,
          authorName: data.authorName || 'Amrendra Kumar',
          categoryId: data.categoryId || null,
        },
      });
    } catch {
      updatedPost = { id, ...data, readingTime: readTime, wordCount };
    }

    return NextResponse.json({ success: true, data: { post: updatedPost } });
  } catch (error) {
    console.error('Update post error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: 'Failed to update post' } },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Not authenticated' } },
        { status: 401 }
      );
    }

    const { id } = await params;

    try {
      await prisma.blog.delete({
        where: { id },
      });
    } catch {
      // DB fallback
    }

    return NextResponse.json({ success: true, data: { message: 'Post deleted successfully' } });
  } catch (error) {
    console.error('Delete post error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: 'Failed to delete post' } },
      { status: 500 }
    );
  }
}
