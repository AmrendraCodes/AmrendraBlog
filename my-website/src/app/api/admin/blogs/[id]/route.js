import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const blog = await prisma.blog.findUnique({
      where: { id },
      include: {
        category: true,
        tags: { include: { tag: true } },
      },
    });

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

    const existing = await prisma.blog.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }

    // Word count & reading time
    const wordCount = content ? content.trim().split(/\s+/).length : existing.wordCount;
    const readingTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;

    let categorySlug = existing.categorySlug;
    if (categoryId) {
      const cat = await prisma.category.findUnique({ where: { id: categoryId } });
      if (cat) categorySlug = cat.slug;
    }

    const updatedBlog = await prisma.blog.update({
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

    // Update Tag associations
    if (Array.isArray(tags)) {
      await prisma.blogTag.deleteMany({ where: { blogId: id } });

      for (const tagName of tags) {
        const tagSlug = tagName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        const tag = await prisma.tag.upsert({
          where: { slug: tagSlug },
          update: {},
          create: { name: tagName, slug: tagSlug },
        });

        await prisma.blogTag.create({
          data: {
            blogId: id,
            tagId: tag.id,
          },
        });
      }
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
    await prisma.blog.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete blog post' }, { status: 500 });
  }
}
