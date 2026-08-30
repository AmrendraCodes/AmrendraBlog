import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthSession, authorizeRole, Role } from '@/lib/auth';
import type { Prisma } from '@prisma/client';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';

    const where: Prisma.MediaWhereInput = {};
    if (search) {
      where.fileName = { contains: search };
    }
    const media = await prisma.media.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, data: { media } });
  } catch (error) {
    console.error('Fetch media error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: 'Failed to fetch media' } },
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
        { success: false, error: { code: 'FORBIDDEN', message: 'You do not have permission to upload media assets' } },
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
    const { fileName, url, format, width, height, bytes } = body || {};

    if (!fileName || !url) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'File name and URL are required' } },
        { status: 400 }
      );
    }

    const publicId = `media_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    const item = await prisma.media.create({
      data: {
        fileName,
        publicId,
        url,
        secureUrl: url,
        format: format || 'jpg',
        width: width || 800,
        height: height || 600,
        bytes: bytes || 124000,
        folder: 'uploads',
      },
    });

    return NextResponse.json({ success: true, data: { media: item } }, { status: 201 });
  } catch (error: unknown) {
    console.error('Upload media error:', error);
    if (typeof error === 'object' && error !== null && 'code' in error && (error as { code: string }).code === 'P2002') {
      return NextResponse.json(
        { success: false, error: { code: 'DUPLICATE', message: 'A media file with this name already exists' } },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: 'Failed to upload media' } },
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
        { success: false, error: { code: 'FORBIDDEN', message: 'You do not have permission to delete media assets' } },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'Media ID is required' } },
        { status: 400 }
      );
    }

    const media = await prisma.media.findUnique({ where: { id } });
    if (!media) {
      return NextResponse.json(
        { success: false, error: { code: 'NOT_FOUND', message: 'Media not found' } },
        { status: 404 }
      );
    }

    await prisma.media.delete({ where: { id } });

    return NextResponse.json({ success: true, data: { message: 'Media deleted successfully' } });
  } catch (error) {
    console.error('Delete media error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: 'Failed to delete media' } },
      { status: 500 }
    );
  }
}
