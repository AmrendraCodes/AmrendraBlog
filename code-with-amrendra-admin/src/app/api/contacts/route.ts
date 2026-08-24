import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthSession } from '@/lib/auth';
import type { Prisma } from '@prisma/client';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Not authenticated' } },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';

    const where: Prisma.ContactWhereInput = {};
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { subject: { contains: search, mode: 'insensitive' } },
        { message: { contains: search, mode: 'insensitive' } },
      ];
    }
    if (status) {
      where.status = status;
    }

    const inquiries = await prisma.contact.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    const unreadCount = await prisma.contact.count({
      where: { status: 'UNREAD' },
    });

    return NextResponse.json({
      success: true,
      data: {
        inquiries,
        unreadCount,
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to fetch contact inquiries';
    console.error('Fetch contacts error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message } },
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

    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'Inquiry ID and status are required' } },
        { status: 400 }
      );
    }

    const updated = await prisma.contact.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ success: true, data: { inquiry: updated } });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to update contact inquiry';
    console.error('Update contact error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message } },
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
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'Inquiry ID is required' } },
        { status: 400 }
      );
    }

    await prisma.contact.delete({ where: { id } });

    return NextResponse.json({ success: true, data: { message: 'Inquiry deleted successfully' } });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to delete contact inquiry';
    console.error('Delete contact error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message } },
      { status: 500 }
    );
  }
}
