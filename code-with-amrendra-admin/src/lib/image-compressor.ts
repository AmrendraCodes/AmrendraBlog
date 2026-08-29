/**
 * Client-Side High Performance Image Compression & Resizing Utility
 * Drastically speeds up uploads by resizing large images (e.g. 5-10MB camera/stock photos)
 * down to crisp web-optimized images (~150-300KB) in milliseconds before uploading.
 */

export interface CompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  targetFormat?: 'image/webp' | 'image/jpeg';
}

export interface CompressionResult {
  file: File;
  originalSize: number;
  compressedSize: number;
  ratio: number;
  durationMs: number;
}

export async function compressImage(
  file: File,
  options: CompressionOptions = {}
): Promise<CompressionResult> {
  const {
    maxWidth = 1920,
    maxHeight = 1080,
    quality = 0.82,
    targetFormat = 'image/webp',
  } = options;

  const startTime = Date.now();
  const originalSize = file.size;

  // Do not compress SVGs or animated GIFs
  if (file.type === 'image/svg+xml' || file.type === 'image/gif') {
    return {
      file,
      originalSize,
      compressedSize: originalSize,
      ratio: 1,
      durationMs: Date.now() - startTime,
    };
  }

  // If file is already tiny (< 250KB) and not oversized, skip compression
  if (originalSize < 250 * 1024) {
    return {
      file,
      originalSize,
      compressedSize: originalSize,
      ratio: 1,
      durationMs: Date.now() - startTime,
    };
  }

  return new Promise((resolve) => {
    // Graceful fallback to original file if anything fails
    const fallback = () => {
      resolve({
        file,
        originalSize,
        compressedSize: originalSize,
        ratio: 1,
        durationMs: Date.now() - startTime,
      });
    };

    try {
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);

      img.onload = () => {
        URL.revokeObjectURL(objectUrl);

        try {
          let { width, height } = img;

          // Compute new dimensions keeping aspect ratio
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (!ctx) return fallback();

          // High quality image smoothing
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';

          // Draw image
          ctx.drawImage(img, 0, 0, width, height);

          // Export to WebP (or JPEG fallback)
          canvas.toBlob(
            (blob) => {
              if (!blob) return fallback();

              // Only use compressed if it actually reduced file size
              if (blob.size >= originalSize && width === img.width && height === img.height) {
                return fallback();
              }

              const ext = targetFormat === 'image/webp' ? '.webp' : '.jpg';
              const cleanBase = file.name.replace(/\.[^/.]+$/, '');
              const compressedFile = new File([blob], `${cleanBase}${ext}`, {
                type: targetFormat,
                lastModified: Date.now(),
              });

              resolve({
                file: compressedFile,
                originalSize,
                compressedSize: compressedFile.size,
                ratio: Math.round((1 - compressedFile.size / originalSize) * 100),
                durationMs: Date.now() - startTime,
              });
            },
            targetFormat,
            quality
          );
        } catch {
          fallback();
        }
      };

      img.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        fallback();
      };

      img.src = objectUrl;
    } catch {
      fallback();
    }
  });
}
