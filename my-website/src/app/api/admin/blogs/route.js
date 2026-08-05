import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAllPostsAsync } from '@/lib/posts';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    let posts = [];
    let total = 0;

    try {
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

      total = await prisma.blog.count({ where });
      posts = await prisma.blog.findMany({
        where,
        include: {
          category: true,
          tags: { include: { tag: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      });
    } catch (dbErr) {
      console.warn('⚠️ DB query in blogs GET failed, falling back to markdown content:', dbErr.message);
    }

    // Fallback to existing markdown posts if DB returns no records
    if (!posts || posts.length === 0) {
      const allMarkdownPosts = await getAllPostsAsync();
      let filtered = allMarkdownPosts;

      if (search) {
        const q = search.toLowerCase();
        filtered = filtered.filter(
          (p) => (p.title && p.title.toLowerCase().includes(q)) || (p.slug && p.slug.toLowerCase().includes(q))
        );
      }
      if (status && status !== 'ALL') {
        filtered = filtered.filter((p) => p.status === status);
      }

      total = filtered.length;
      posts = filtered.slice((page - 1) * limit, page * limit);
    }

    return NextResponse.json({
      posts,
      total,
      page,
      totalPages: Math.ceil(total / limit) || 1,
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

    let existing = null;
    try {
      existing = await prisma.blog.findUnique({ where: { slug } });
    } catch (err) {}

    if (existing) {
      return NextResponse.json({ error: 'A post with this slug already exists' }, { status: 400 });
    }

    const wordCount = content.trim().split(/\s+/).length;
    const readingTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;

    let categorySlug = null;
    if (categoryId) {
      try {
        const cat = await prisma.category.findUnique({ where: { id: categoryId } });
        if (cat) categorySlug = cat.slug;
      } catch (err) {}
    }

    let newBlog = null;
    try {
      newBlog = await prisma.blog.create({
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
    } catch (createErr) {
      console.warn('⚠️ DB Blog create fallback mode active');
      newBlog = {
        id: slug,
        title,
        slug,
        excerpt,
        content,
        status,
        readingTime,
        wordCount,
      };
    }

    return NextResponse.json({ success: true, blog: newBlog });
  } catch (error) {
    console.error('Create blog API error:', error);
    return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 });
  }
}
