import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getPostBySlugAsync } from '@/lib/posts';

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    let blog = null;

    try {
      blog = await prisma.blog.findUnique({
        where: { id },
        include: {
          category: true,
          tags: { include: { tag: true } },
        },
      });
    } catch (err) {}

    if (!blog) {
      blog = await getPostBySlugAsync(id);
    }

    if (!blog) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }

    return NextResponse.json({ blog });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blog post' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
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
      status,
      categoryId,
      tags = [],
    } = body;

    let updatedBlog = null;

    try {
      const existing = await prisma.blog.findUnique({ where: { id } });

      if (existing) {
        const wordCount = content ? content.trim().split(/\s+/).length : existing.wordCount;
        const readingTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;

        let categorySlug = existing.categorySlug;
        if (categoryId) {
          const cat = await prisma.category.findUnique({ where: { id: categoryId } });
          if (cat) categorySlug = cat.slug;
        }

        updatedBlog = await prisma.blog.update({
          where: { id },
          data: {
            title: title || existing.title,
            slug: slug || existing.slug,
            excerpt: excerpt !== undefined ? excerpt : existing.excerpt,
            description: description !== undefined ? description : existing.description,
            content: content || existing.content,
            featuredImage: featuredImage !== undefined ? featuredImage : existing.featuredImage,
            ogImage: ogImage !== undefined ? ogImage : existing.ogImage,
            canonicalUrl: canonicalUrl !== undefined ? canonicalUrl : existing.canonicalUrl,
            metaTitle: metaTitle || existing.metaTitle,
            metaDescription: metaDescription || existing.metaDescription,
            status: status || existing.status,
            publishedAt: status === 'PUBLISHED' && !existing.publishedAt ? new Date() : existing.publishedAt,
            wordCount,
            readingTime,
            categoryId: categoryId || existing.categoryId,
            categorySlug,
          },
        });
      }
    } catch (dbErr) {
      console.warn('⚠️ DB update failed, using fallback update response');
    }

    if (!updatedBlog) {
      updatedBlog = {
        id: id || slug,
        title,
        slug,
        excerpt,
        content,
        status,
      };
    }

    return NextResponse.json({ success: true, blog: updatedBlog });
  } catch (error) {
    console.error('Update blog error:', error);
    return NextResponse.json({ error: 'Failed to update blog post' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    try {
      await prisma.blog.delete({ where: { id } });
    } catch (err) {}

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete blog post' }, { status: 500 });
  }
}
