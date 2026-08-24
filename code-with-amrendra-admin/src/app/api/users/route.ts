import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthSession, authorizeRole, hashPassword } from '@/lib/auth';
import type { Prisma } from '@prisma/client';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getAuthSession();
    if (!session || !authorizeRole(session.user.role, [])) {
      return NextResponse.json(
        { success: false, error: { code: 'FORBIDDEN', message: 'Only Super Admins can view users' } },
        { status: 403 }
      );
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        _count: { select: { posts: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, data: { users } });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to fetch users';
    console.error('Fetch users error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message } },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getAuthSession();
    if (!session || !authorizeRole(session.user.role, [])) {
      return NextResponse.json(
        { success: false, error: { code: 'FORBIDDEN', message: 'Only Super Admins can create users' } },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { name, email, password, role } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'Name, email, and password are required' } },
        { status: 400 }
      );
    }

    const existing = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
    if (existing) {
      return NextResponse.json(
        { success: false, error: { code: 'DUPLICATE', message: 'A user with this email already exists' } },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        passwordHash,
        role: role || 'EDITOR',
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ success: true, data: { user } }, { status: 201 });
  } catch (error: unknown) {
    console.error('Create user error:', error);
    if (typeof error === 'object' && error !== null && 'code' in error && (error as { code: string }).code === 'P2002') {
      return NextResponse.json(
        { success: false, error: { code: 'DUPLICATE', message: 'A user with this email already exists' } },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: 'Failed to create user' } },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getAuthSession();
    if (!session || !authorizeRole(session.user.role, [])) {
      return NextResponse.json(
        { success: false, error: { code: 'FORBIDDEN', message: 'Only Super Admins can manage users' } },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { id, name, email, password, role } = body;

    if (!id || !email) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'User ID and email are required' } },
        { status: 400 }
      );
    }

    const updateData: Prisma.UserUpdateInput = {
      name: name || 'Admin User',
      email: email.toLowerCase(),
      role: role || 'EDITOR',
    };

    if (password && password.trim().length > 0) {
      updateData.passwordHash = await hashPassword(password);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ success: true, data: { user: updatedUser } });
  } catch (error: unknown) {
    console.error('Update user error:', error);
    if (typeof error === 'object' && error !== null && 'code' in error && (error as { code: string }).code === 'P2002') {
      return NextResponse.json(
        { success: false, error: { code: 'DUPLICATE', message: 'Another user already uses this email' } },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: 'Failed to update user' } },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getAuthSession();
    if (!session || !authorizeRole(session.user.role, [])) {
      return NextResponse.json(
        { success: false, error: { code: 'FORBIDDEN', message: 'Only Super Admins can delete users' } },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'User ID is required' } },
        { status: 400 }
      );
    }

    if (session.user.id === id) {
      return NextResponse.json(
        { success: false, error: { code: 'BAD_REQUEST', message: 'You cannot delete your own account' } },
        { status: 400 }
      );
    }

    await prisma.blog.updateMany({
      where: { authorId: id },
      data: { authorId: null },
    });

    await prisma.session.deleteMany({
      where: { userId: id },
    });

    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, data: { message: 'User deleted successfully' } });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to delete user';
    console.error('Delete user error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message } },
      { status: 500 }
    );
  }
}
