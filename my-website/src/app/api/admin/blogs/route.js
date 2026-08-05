import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    const where = {};
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { slug: { contains: search, mode: 'insensitive' } },
      ];
    }
    if (status && status !== 'ALL') {
      where.status = status;
    }

    const total = await prisma.blog.count({ where });
    const posts = await prisma.blog.findMany({
      where,
      include: {
        category: true,
        tags: { include: { tag: true } },
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return NextResponse.json({
      posts,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Fetch blogs API error:', error);
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      title,
      slug,
      excerpt,
      description,
      content,
      featuredImage,
      ogImage,
      canonicalUrl,
      metaTitle,
      metaDescription,
      status = 'DRAFT',
      categoryId,
      tags = [],
    } = body;

    if (!title || !slug || !content) {
      return NextResponse.json({ error: 'Title, slug, and content are required' }, { status: 400 });
    }

    // Check slug collision
    const existing = await prisma.blog.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json({ error: 'A post with this slug already exists' }, { status: 400 });
    }

    // Calculate reading time & word count
    const wordCount = content.trim().split(/\s+/).length;
    const readingTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;

    let categorySlug = null;
    if (categoryId) {
      const cat = await prisma.category.findUnique({ where: { id: categoryId } });
      if (cat) categorySlug = cat.slug;
    }

    const newBlog = await prisma.blog.create({
      data: {
        title,
        slug,
        excerpt,
        description: description || excerpt,
        content,
        featuredImage,
        ogImage: ogImage || featuredImage,
        canonicalUrl,
        metaTitle: metaTitle || title,
        metaDescription: metaDescription || excerpt,
        status,
        publishedAt: status === 'PUBLISHED' ? new Date() : null,
        readingTime,
        wordCount,
        categoryId: categoryId || null,
        categorySlug,
      },
    });

    // Handle tag relationships
    if (Array.isArray(tags) && tags.length > 0) {
      for (const tagName of tags) {
        const tagSlug = tagName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        const tag = await prisma.tag.upsert({
          where: { slug: tagSlug },
          update: {},
          create: { name: tagName, slug: tagSlug },
        });

        await prisma.blogTag.create({
          data: {
            blogId: newBlog.id,
            tagId: tag.id,
          },
        });
      }
    }

    return NextResponse.json({ success: true, blog: newBlog });
  } catch (error) {
    console.error('Create blog API error:', error);
    return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 });
  }
}
