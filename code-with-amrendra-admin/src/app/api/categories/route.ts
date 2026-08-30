import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthSession, authorizeRole, Role } from '@/lib/auth';
import { categorySchema } from '@/schemas/category';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: { _count: { select: { posts: true } } },
      orderBy: { name: 'asc' },
    });

    return NextResponse.json({ success: true, data: { categories } });
  } catch (error) {
    console.error('Fetch categories error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: 'Failed to fetch categories' } },
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

    if (!authorizeRole(session.user.role, [Role.EDITOR])) {
      return NextResponse.json(
        { success: false, error: { code: 'FORBIDDEN', message: 'You do not have permission to manage categories' } },
        { status: 403 }
      );
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid JSON request payload' } },
        { status: 400 }
      );
    }
    const parsed = categorySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: parsed.error.issues[0]?.message || 'Invalid input' } },
        { status: 400 }
      );
    }

    const { name, slug, description } = parsed.data;

    const existing = await prisma.category.findFirst({
      where: { OR: [{ name }, { slug }] },
    });

    if (existing) {
      return NextResponse.json(
        { success: false, error: { code: 'DUPLICATE', message: 'Category name or slug already exists' } },
        { status: 400 }
      );
    }

    const category = await prisma.category.create({
      data: { name, slug, description },
    });

    try {
      revalidatePath('/resources/blog');
      revalidatePath(`/category/${slug}`);
    } catch {}

    return NextResponse.json({ success: true, data: { category } }, { status: 201 });
  } catch (error) {
    console.error('Create category error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: 'Failed to create category' } },
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

    if (!authorizeRole(session.user.role, [Role.EDITOR])) {
      return NextResponse.json(
        { success: false, error: { code: 'FORBIDDEN', message: 'You do not have permission to manage categories' } },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'Category ID is required' } },
        { status: 400 }
      );
    }

    // Check if category has associated blogs before deleting
    const postCount = await prisma.blog.count({ where: { categoryId: id } });
    if (postCount > 0) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'CATEGORY_IN_USE',
            message: `Cannot delete category: ${postCount} blog post(s) are currently assigned to it. Please reassign or delete those posts first.`,
          },
        },
        { status: 400 }
      );
    }

    const category = await prisma.category.findUnique({ where: { id } });

    await prisma.category.delete({ where: { id } });

    try {
      revalidatePath('/resources/blog');
      if (category?.slug) revalidatePath(`/category/${category.slug}`);
    } catch {}

    return NextResponse.json({ success: true, data: { message: 'Category deleted successfully' } });
  } catch (error) {
    console.error('Delete category error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: 'Failed to delete category' } },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Not authenticated' } },
        { status: 401 }
      );
    }

    if (!authorizeRole(session.user.role, [Role.EDITOR])) {
      return NextResponse.json(
        { success: false, error: { code: 'FORBIDDEN', message: 'You do not have permission to manage categories' } },
        { status: 403 }
      );
    }

    let body: any;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid JSON request payload' } },
        { status: 400 }
      );
    }
    const { id, name, slug, description } = body || {};

    if (!id || !name || !slug) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'Category ID, name, and slug are required' } },
        { status: 400 }
      );
    }

    const existing = await prisma.category.findFirst({
      where: {
        AND: [
          { id: { not: id } },
          { OR: [{ name }, { slug }] },
        ],
      },
    });

    if (existing) {
      return NextResponse.json(
        { success: false, error: { code: 'DUPLICATE', message: 'Another category already uses this name or slug' } },
        { status: 409 }
      );
    }

    const oldCategory = await prisma.category.findUnique({ where: { id } });

    const updated = await prisma.category.update({
      where: { id },
      data: { name, slug, description },
    });

    // Also update any blogs that stored categorySlug
    if (oldCategory && oldCategory.slug !== slug) {
      await prisma.blog.updateMany({
        where: { categoryId: id },
        data: { categorySlug: slug },
      });
    }

    try {
      revalidatePath('/resources/blog');
      revalidatePath(`/category/${slug}`);
      if (oldCategory?.slug && oldCategory.slug !== slug) {
        revalidatePath(`/category/${oldCategory.slug}`);
      }
    } catch {}

    return NextResponse.json({ success: true, data: { category: updated } });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to update category';
    console.error('Update category error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message } },
      { status: 500 }
    );
  }
}
