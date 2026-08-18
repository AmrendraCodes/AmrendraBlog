import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthSession } from '@/lib/auth';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';

export const dynamic = 'force-dynamic';

const ALLOWED_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

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
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'No file uploaded' } },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, error: { code: 'FILE_TOO_LARGE', message: 'File exceeds 10MB limit' } },
        { status: 400 }
      );
    }

    const originalName = file.name;
    const ext = path.extname(originalName).toLowerCase();

    if (!ALLOWED_EXTENSIONS.includes(ext)) {
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

    const baseName = path.basename(originalName, ext).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const uniqueFileName = `${baseName || 'image'}-${Date.now()}${ext}`;
    const publicUrl = `/images/${uniqueFileName}`;

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save to admin app public/images directory
    const adminUploadsDir = path.join(process.cwd(), 'public', 'images');
    if (!existsSync(adminUploadsDir)) {
      await mkdir(adminUploadsDir, { recursive: true });
    }
    await writeFile(path.join(adminUploadsDir, uniqueFileName), buffer);

    // Also copy to main website public/images directory if present
    const mainWebsiteDir = path.resolve(process.cwd(), '..', 'my-website', 'public', 'images');
    if (existsSync(mainWebsiteDir)) {
      try {
        await writeFile(path.join(mainWebsiteDir, uniqueFileName), buffer);
      } catch (copyErr) {
        console.warn('Failed to mirror upload to main website:', copyErr);
      }
    }

    const publicId = `local_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    const mediaItem = await prisma.media.create({
      data: {
        fileName: originalName,
        publicId,
        url: publicUrl,
        secureUrl: publicUrl,
        format: ext.replace('.', ''),
        width: 1200,
        height: 800,
        bytes: file.size,
        folder: 'uploads',
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        media: mediaItem,
        url: publicUrl,
      },
    }, { status: 201 });
  } catch (error: any) {
    console.error('File upload error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: error?.message || 'Failed to upload file' } },
      { status: 500 }
    );
  }
}
