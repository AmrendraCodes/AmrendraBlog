import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthSession } from '@/lib/auth';
import { blogSchema } from '@/schemas/blog';
import { calculateReadingTime, countWords, slugify } from '@/lib/utils';
import { revalidatePath } from 'next/cache';

async function resolveOrCreateTag(rawTagInput: string) {
  const cleanedName = rawTagInput.trim().replace(/\s+/g, ' ');
  if (!cleanedName) return null;

  const tagSlug = slugify(cleanedName);

  // 1. Primary lookup by normalized slug or exact name
  let tag = await prisma.tag.findFirst({
    where: {
      OR: [
        { slug: tagSlug },
        { name: cleanedName },
        { id: cleanedName },
      ],
    },
  });

  // 2. Create tag if it doesn't exist
  if (!tag) {
    try {
      tag = await prisma.tag.create({
        data: {
          name: cleanedName,
          slug: tagSlug,
        },
      });
    } catch {
      // 3. Fallback on race-condition or unique constraint clash: lookup by slug
      tag = await prisma.tag.findFirst({
        where: {
          OR: [
            { slug: tagSlug },
            { name: cleanedName },
          ],
        },
      });
    }
  }

  return tag;
}

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

    // Explicitly clear existing BlogTag join records for this post
    await prisma.blogTag.deleteMany({
      where: { blogId: id },
    });

    // Connect/create updated tags with normalized slug matching
    if (data.tags && Array.isArray(data.tags)) {
      for (const rawTag of data.tags) {
        if (typeof rawTag !== 'string') continue;
        const tag = await resolveOrCreateTag(rawTag);

        if (tag) {
          await prisma.blogTag.upsert({
            where: {
              blogId_tagId: {
                blogId: id,
                tagId: tag.id,
              },
            },
            create: {
              blogId: id,
              tagId: tag.id,
            },
            update: {},
          });
        }
      }
    }

    // Revalidate live website cache
    try {
      revalidatePath('/resources/blog');
      revalidatePath(`/resources/blog/${updatedPost.slug}`);
    } catch {
      // Ignore cache warning
    }

    const fullPost = await prisma.blog.findUnique({
      where: { id },
      include: {
        category: true,
        tags: { include: { tag: true } },
        author: true,
      },
    });

    return NextResponse.json({ success: true, data: { post: fullPost || updatedPost } });
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
    if (!post) {
      return NextResponse.json(
        { success: false, error: { code: 'NOT_FOUND', message: 'Blog post not found' } },
        { status: 404 }
      );
    }

    // Explicitly delete BlogTag records before deleting blog
    await prisma.blogTag.deleteMany({
      where: { blogId: id },
    });

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
