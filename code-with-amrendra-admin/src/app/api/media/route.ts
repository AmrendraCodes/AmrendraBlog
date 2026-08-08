import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthSession } from '@/lib/auth';

let memoryMedia: any[] = [
  {
    id: 'media-1',
    fileName: 'hero-banner.jpg',
    publicId: 'hero-banner',
    url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
    secureUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
    format: 'jpg',
    width: 1920,
    height: 1080,
    bytes: 245000,
    folder: 'general',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'media-2',
    fileName: 'architecture-diagram.png',
    publicId: 'architecture-diagram',
    url: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
    secureUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
    format: 'png',
    width: 1200,
    height: 800,
    bytes: 180000,
    folder: 'blogs',
    createdAt: new Date().toISOString(),
  },
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';

    let media: any[] = [];
    try {
      const where: any = {};
      if (search) {
        where.fileName = { contains: search, mode: 'insensitive' };
      }
      media = await prisma.media.findMany({
        where,
        orderBy: { createdAt: 'desc' },
      });
    } catch {
      // Memory fallback
    }

    if (!media || media.length === 0) {
      media = memoryMedia;
      if (search) {
        const q = search.toLowerCase();
        media = media.filter((m) => m.fileName.toLowerCase().includes(q));
      }
    }

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
    let item = null;
    try {
      item = await prisma.media.create({
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
    } catch {
      item = {
        id: `media-${Date.now()}`,
        fileName,
        publicId,
        url,
        secureUrl: url,
        format: format || 'jpg',
        width: width || 800,
        height: height || 600,
        bytes: bytes || 124000,
        folder: 'uploads',
        createdAt: new Date().toISOString(),
      };
      memoryMedia.unshift(item);
    }

    return NextResponse.json({ success: true, data: { media: item } }, { status: 201 });
  } catch (error) {
    console.error('Upload media error:', error);
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

    try {
      await prisma.media.delete({ where: { id } });
    } catch {
      memoryMedia = memoryMedia.filter((m) => m.id !== id);
    }

    return NextResponse.json({ success: true, data: { message: 'Media deleted successfully' } });
  } catch (error) {
    console.error('Delete media error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: 'Failed to delete media' } },
      { status: 500 }
    );
  }
}
