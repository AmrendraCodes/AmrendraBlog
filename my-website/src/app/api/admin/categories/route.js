import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAllCategories } from '@/lib/posts';

export async function GET() {
  try {
    let categories = [];
    try {
      categories = await prisma.category.findMany({
        include: {
          _count: { select: { posts: true } },
        },
        orderBy: { name: 'asc' },
      });
    } catch (dbErr) {
      console.warn('⚠️ Category DB query fallback');
    }

    if (!categories || categories.length === 0) {
      const siteCategories = getAllCategories();
      const uniqueCategorySlugs = new Set();
      categories = [];

      siteCategories.forEach((cat, idx) => {
        const catSlug = cat.slug || cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        if (!uniqueCategorySlugs.has(catSlug)) {
          uniqueCategorySlugs.add(catSlug);
          categories.push({
            id: `cat-${catSlug || idx}`,
            name: cat.name,
            slug: catSlug,
            description: `${cat.name} category`,
            _count: { posts: cat.count || 0 },
          });
        }
      });
    }

    return NextResponse.json({ categories });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { name, slug, description } = await request.json();
    if (!name) {
      return NextResponse.json({ error: 'Category name is required' }, { status: 400 });
    }

    const categorySlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    let category = null;

    try {
      category = await prisma.category.create({
        data: {
          name,
          slug: categorySlug,
          description,
        },
      });
    } catch (err) {
      category = {
        id: `cat-${categorySlug}`,
        name,
        slug: categorySlug,
        description,
        _count: { posts: 0 },
      };
    }

    return NextResponse.json({ success: true, category });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    try {
      await prisma.category.delete({ where: { id } });
    } catch (err) {}

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
  }
}
