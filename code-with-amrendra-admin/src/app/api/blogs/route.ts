import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthSession } from '@/lib/auth';
import { blogSchema } from '@/schemas/blog';
import { calculateReadingTime, countWords } from '@/lib/utils';
import { revalidatePath } from 'next/cache';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const category = searchParams.get('category') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '50', 10);

    const where: any = {};
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { excerpt: { contains: search } },
        { slug: { contains: search } },
      ];
    }
    if (status) where.status = status;
    if (category) where.categoryId = category;

    let total = 0;
    let posts: any[] = [];

    try {
      total = await prisma.blog.count({ where });
      posts = await prisma.blog.findMany({
        where,
        include: {
          category: true,
          tags: { include: { tag: true } },
          author: { select: { name: true, email: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      });
    } catch (dbErr) {
      console.warn('Blogs GET DB query warning:', dbErr);
    }

    return NextResponse.json({
      success: true,
      data: {
        posts,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit) || 1,
        },
      },
    });
  } catch (error) {
    console.error('Fetch posts error:', error);
    return NextResponse.json({
      success: true,
      data: {
        posts: [],
        pagination: { total: 0, page: 1, limit: 50, totalPages: 1 },
      },
    });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Not authenticated' } },
        { status: 401 }
      );
    }

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

    const createdPost = await prisma.blog.create({
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
        authorName: data.authorName || session.user.name || 'Amrendra Kumar',
        categoryId: data.categoryId || null,
        categorySlug,
      },
    });

    try {
      revalidatePath('/resources/blog');
      revalidatePath(`/resources/blog/${createdPost.slug}`);
    } catch {}

    return NextResponse.json({ success: true, data: { post: createdPost } }, { status: 201 });
  } catch (error: any) {
    console.error('Create post error:', error);
    if (error?.code === 'P2002') {
      return NextResponse.json(
        { success: false, error: { code: 'SLUG_EXISTS', message: 'A blog post with this URL slug already exists' } },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: 'Failed to create blog post' } },
      { status: 500 }
    );
  }
}
