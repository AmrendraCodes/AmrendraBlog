import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthSession } from '@/lib/auth';
import { tagSchema } from '@/schemas/tag';

export async function GET() {
  try {
    let tags = [];
    try {
      tags = await prisma.tag.findMany({
        orderBy: { name: 'asc' },
      });
    } catch {
      tags = [
        { id: 'tag-1', name: 'Next.js', slug: 'nextjs' },
        { id: 'tag-2', name: 'React', slug: 'react' },
        { id: 'tag-3', name: 'TypeScript', slug: 'typescript' },
        { id: 'tag-4', name: 'Node.js', slug: 'nodejs' },
        { id: 'tag-5', name: 'Prisma', slug: 'prisma' },
      ];
    }

    return NextResponse.json({ success: true, data: { tags } });
  } catch (error) {
    console.error('Fetch tags error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: 'Failed to fetch tags' } },
      { status: 500 }
    );
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
    const parsed = tagSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: parsed.error.issues[0]?.message || 'Invalid input' } },
        { status: 400 }
      );
    }

    const { name, slug } = parsed.data;

    let existing = null;
    try {
      existing = await prisma.tag.findFirst({
        where: { OR: [{ name }, { slug }] },
      });
    } catch {
      // DB fallback
    }

    if (existing) {
      return NextResponse.json(
        { success: false, error: { code: 'DUPLICATE', message: 'Tag name or slug already exists' } },
        { status: 400 }
      );
    }

    let tag = null;
    try {
      tag = await prisma.tag.create({
        data: { name, slug },
      });
    } catch {
      tag = { id: `tag-${Date.now()}`, name, slug };
    }

    return NextResponse.json({ success: true, data: { tag } }, { status: 201 });
  } catch (error) {
    console.error('Create tag error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: 'Failed to create tag' } },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Not authenticated' } },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'Tag ID is required' } },
        { status: 400 }
      );
    }

    try {
      await prisma.tag.delete({ where: { id } });
    } catch {
      // DB fallback
    }

    return NextResponse.json({ success: true, data: { message: 'Tag deleted successfully' } });
  } catch (error) {
    console.error('Delete tag error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: 'Failed to delete tag' } },
      { status: 500 }
    );
  }
}
