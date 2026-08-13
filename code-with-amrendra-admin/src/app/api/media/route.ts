import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthSession } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';

    const where: any = {};
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

    const body = await request.json();
    const { fileName, url, format, width, height, bytes } = body;

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
  } catch (error: any) {
    console.error('Upload media error:', error);
    if (error?.code === 'P2002') {
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
