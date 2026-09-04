import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import path from 'path';
import { prisma } from '@/lib/prisma';
import { getAuthSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

const ALLOWED_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB limit

export async function POST(request: Request) {
  try {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Not authenticated' } },
        { status: 401 }
      );
    }

    // 1. Verify BLOB_READ_WRITE_TOKEN is configured
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.error('❌ BLOB_READ_WRITE_TOKEN is missing in environment variables.');
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'CONFIG_ERROR',
            message:
              'BLOB_READ_WRITE_TOKEN is not configured in .env. Please generate your token in Vercel Dashboard -> Storage -> Blob and add it to your .env file.',
          },
        },
        { status: 500 }
      );
    }

    // 2. Parse FormData
    const formData = await request.formData();
    const file = (formData.get('file') || formData.get('image')) as File | null;

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'No image file found in the request. Please provide a file or image form field.',
          },
        },
        { status: 400 }
      );
    }

    // 3. Validate File Size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'FILE_TOO_LARGE',
            message: `File size exceeds the 10MB limit (Current: ${(file.size / (1024 * 1024)).toFixed(1)}MB).`,
          },
        },
        { status: 400 }
      );
    }

    // 4. Validate File Extension / Type
    const originalName = file.name || 'image.png';
    const ext = path.extname(originalName).toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext) && !file.type.startsWith('image/')) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_FILE_TYPE',
            message: `Invalid file format. Allowed extensions: ${ALLOWED_EXTENSIONS.join(', ')}`,
          },
        },
        { status: 400 }
      );
    }

    // 5. Generate Safe, Unique Pathname in Blob Store
    const baseName = path
      .basename(originalName, ext)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    const cleanFileName = `blogs/${baseName || 'upload'}-${Date.now()}${ext || '.png'}`;

    // 6. Upload to Vercel Blob (public access)
    const blob = await put(cleanFileName, file, {
      access: 'public',
      addRandomSuffix: true,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    // 7. Record in Media Library database for reusability
    let mediaItem = null;
    try {
      mediaItem = await prisma.media.create({
        data: {
          fileName: originalName,
          publicId: blob.pathname,
          url: blob.url,
          secureUrl: blob.url,
          format: ext.replace('.', '') || 'webp',
          bytes: file.size,
          folder: 'blogs',
        },
      });
    } catch (dbErr) {
      console.warn('Could not record uploaded media to database:', dbErr);
    }

    // 8. Return Uploaded Blob URL
    return NextResponse.json(
      {
        success: true,
        url: blob.url,
        imageUrl: blob.url,
        media: mediaItem,
        data: {
          url: blob.url,
          pathname: blob.pathname,
          contentType: blob.contentType,
          media: mediaItem,
        },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to upload image to Vercel Blob';
    console.error('Vercel Blob Upload Error:', error);

    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'UPLOAD_ERROR',
          message,
        },
      },
      { status: 500 }
    );
  }
}
