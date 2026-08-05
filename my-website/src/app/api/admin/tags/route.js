import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAllTags } from '@/lib/posts';

export async function GET() {
  try {
    let tags = [];
    try {
      tags = await prisma.tag.findMany({
        include: {
          _count: { select: { posts: true } },
        },
        orderBy: { name: 'asc' },
      });
    } catch (dbErr) {
      console.warn('⚠️ Tag DB query fallback');
    }

    if (!tags || tags.length === 0) {
      const siteTags = getAllTags();
      const uniqueTagSlugs = new Set();
      tags = [];

      siteTags.forEach((tagName, idx) => {
        const tagSlug = tagName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        if (!uniqueTagSlugs.has(tagSlug)) {
          uniqueTagSlugs.add(tagSlug);
          tags.push({
            id: `tag-${tagSlug || idx}`,
            name: tagName,
            slug: tagSlug,
            _count: { posts: 1 },
          });
        }
      });
    }

    return NextResponse.json({ tags });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch tags' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { name, slug } = await request.json();
    if (!name) {
      return NextResponse.json({ error: 'Tag name is required' }, { status: 400 });
    }

    const tagSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    let tag = null;

    try {
      tag = await prisma.tag.create({
        data: {
          name,
          slug: tagSlug,
        },
      });
    } catch (err) {
      tag = {
        id: `tag-${tagSlug}`,
        name,
        slug: tagSlug,
        _count: { posts: 0 },
      };
    }

    return NextResponse.json({ success: true, tag });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create tag' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    try {
      await prisma.tag.delete({ where: { id } });
    } catch (err) {}

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete tag' }, { status: 500 });
  }
}
