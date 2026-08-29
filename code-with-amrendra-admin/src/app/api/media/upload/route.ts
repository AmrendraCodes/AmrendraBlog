import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthSession } from '@/lib/auth';
import { put } from '@vercel/blob';
import path from 'path';

export const dynamic = 'force-dynamic';

const ALLOWED_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif'];
const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15MB limit

export async function POST(request: Request) {
  try {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Not authenticated' } },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = (formData.get('file') || formData.get('image')) as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'No file uploaded' } },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, error: { code: 'FILE_TOO_LARGE', message: 'File exceeds 15MB limit' } },
        { status: 400 }
      );
    }

    const originalName = file.name || 'image.png';
    const ext = path.extname(originalName).toLowerCase();

    if (!ALLOWED_EXTENSIONS.includes(ext) && !file.type.startsWith('image/')) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_FILE_TYPE',
            message: `Allowed formats: ${ALLOWED_EXTENSIONS.join(', ')}`,
          },
        },
        { status: 400 }
      );
    }

    const baseName = path
      .basename(originalName, ext)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    const cleanFileName = `media/${baseName || 'upload'}-${Date.now()}${ext || '.png'}`;

    // Upload to Vercel Blob
    const blob = await put(cleanFileName, file, {
      access: 'public',
      addRandomSuffix: true,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    // Save into database Media table
    const mediaItem = await prisma.media.create({
      data: {
        fileName: originalName,
        publicId: blob.pathname,
        url: blob.url,
        secureUrl: blob.url,
        format: ext.replace('.', '') || 'webp',
        bytes: file.size,
        folder: 'media',
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          media: mediaItem,
          url: blob.url,
        },
        url: blob.url,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to upload file';
    console.error('File upload error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message } },
      { status: 500 }
    );
  }
}
