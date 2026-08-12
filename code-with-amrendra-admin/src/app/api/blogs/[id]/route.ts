import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthSession } from '@/lib/auth';
import { blogSchema } from '@/schemas/blog';
import { calculateReadingTime, countWords } from '@/lib/utils';
import { revalidatePath } from 'next/cache';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const post = await prisma.blog.findUnique({
      where: { id },
      include: {
        category: true,
        tags: { include: { tag: true } },
        author: true,
      },
    });

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
      { success: false, error: { code: 'SERVER_ERROR', message: 'Failed to fetch post from database' } },
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

    let categorySlug = null;
    if (data.categoryId) {
      const cat = await prisma.category.findUnique({ where: { id: data.categoryId } });
      if (cat) categorySlug = cat.slug;
    }

    const updatedPost = await prisma.blog.update({
      where: { id },
      data: {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt || null,
        description: data.description || data.excerpt || null,
        content: data.content,
        featuredImage: data.featuredImage || null,
        ogImage: data.ogImage || data.featuredImage || null,
        canonicalUrl: data.canonicalUrl || null,
        metaTitle: data.metaTitle || data.title,
        metaDescription: data.metaDescription || data.excerpt || null,
        status: data.status || 'PUBLISHED',
        publishedAt: data.status === 'PUBLISHED' ? new Date() : null,
        scheduledAt: data.scheduledAt ? new Date(data.scheduledAt) : null,
        readingTime: readTime,
        wordCount,
        authorName: data.authorName || 'Amrendra Kumar',
        categoryId: data.categoryId || null,
        categorySlug,
      },
    });

    // Revalidate live website cache
    try {
      revalidatePath('/resources/blog');
      revalidatePath(`/resources/blog/${updatedPost.slug}`);
    } catch {
      // Ignore cache warning
    }

    return NextResponse.json({ success: true, data: { post: updatedPost } });
  } catch (error: any) {
    console.error('Update post error:', error);
    if (error?.code === 'P2002') {
      return NextResponse.json(
        { success: false, error: { code: 'SLUG_EXISTS', message: 'A blog post with this URL slug already exists' } },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: 'Failed to update post in database' } },
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

    const post = await prisma.blog.findUnique({ where: { id } });

    await prisma.blog.delete({
      where: { id },
    });

    // Revalidate live website cache
    try {
      revalidatePath('/resources/blog');
      if (post?.slug) revalidatePath(`/resources/blog/${post.slug}`);
    } catch {
      // Ignore cache warning
    }

    return NextResponse.json({ success: true, data: { message: 'Post deleted successfully' } });
  } catch (error) {
    console.error('Delete post error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: 'Failed to delete post from database' } },
      { status: 500 }
    );
  }
}
