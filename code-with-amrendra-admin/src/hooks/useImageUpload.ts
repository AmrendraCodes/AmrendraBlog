import { useState, useCallback, useRef } from 'react';
import { safeJson } from '@/lib/utils';
import { compressImage } from '@/lib/image-compressor';

export interface UseImageUploadOptions {
  maxSizeBytes?: number;
  allowedTypes?: string[];
  endpoint?: string;
  autoCompress?: boolean;
  onSuccess?: (url: string, data?: unknown) => void;
  onError?: (errorMessage: string) => void;
}

export interface UploadResult {
  success: boolean;
  url?: string;
  media?: unknown;
  error?: string;
}

const DEFAULT_MAX_SIZE = 15 * 1024 * 1024; // 15MB limit
const DEFAULT_ALLOWED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml',
];

export function useImageUpload(options: UseImageUploadOptions = {}) {
  const {
    maxSizeBytes = DEFAULT_MAX_SIZE,
    allowedTypes = DEFAULT_ALLOWED_TYPES,
    endpoint = '/api/upload',
    autoCompress = true,
    onSuccess,
    onError,
  } = options;

  const [isUploading, setIsUploading] = useState(false);
  const [statusText, setStatusText] = useState<string>('Uploading...');
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const validateFile = useCallback(
    (file: File): { valid: boolean; error?: string } => {
      if (!allowedTypes.includes(file.type)) {
        const allowedExtensions = allowedTypes
          .map((t) => t.replace('image/', '').replace('+xml', ''))
          .join(', ')
          .toUpperCase();
        return {
          valid: false,
          error: `Invalid file format (${file.type || 'unknown'}). Allowed: ${allowedExtensions}`,
        };
      }

      if (file.size > maxSizeBytes) {
        const sizeMb = (maxSizeBytes / (1024 * 1024)).toFixed(0);
        const actualMb = (file.size / (1024 * 1024)).toFixed(1);
        return {
          valid: false,
          error: `File is too large (${actualMb} MB). Maximum allowed size is ${sizeMb} MB.`,
        };
      }

      return { valid: true };
    },
    [allowedTypes, maxSizeBytes]
  );

  const clearPreview = useCallback(() => {
    setPreviewUrl((prev) => {
      if (prev && prev.startsWith('blob:')) {
        URL.revokeObjectURL(prev);
      }
      return null;
    });
  }, []);

  const cancelUpload = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    clearPreview();
    setIsUploading(false);
    setStatusText('Cancelled');
    setError(null);
  }, [clearPreview]);

  const uploadFile = useCallback(
    async (file: File): Promise<UploadResult> => {
      setError(null);

      // Validate
      const validation = validateFile(file);
      if (!validation.valid) {
        const errorMsg = validation.error || 'Invalid file';
        setError(errorMsg);
        onError?.(errorMsg);
        return { success: false, error: errorMsg };
      }

      // Generate instant local preview for immediate visual feedback
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      setIsUploading(true);

      const controller = new AbortController();
      abortControllerRef.current = controller;

      // Timeout after 45 seconds to avoid infinite spinner
      const timeoutId = setTimeout(() => {
        controller.abort();
      }, 45000);

      try {
        let fileToUpload = file;

        // Auto-compress high-res/heavy images to lightweight WebP in milliseconds
        if (autoCompress) {
          setStatusText('Optimizing image...');
          try {
            const compression = await compressImage(file, {
              maxWidth: 1920,
              maxHeight: 1080,
              quality: 0.82,
            });
            fileToUpload = compression.file;
            if (compression.ratio > 0) {
              setStatusText(`Uploading (${(compression.compressedSize / 1024).toFixed(0)} KB)...`);
            } else {
              setStatusText('Uploading to Vercel Blob...');
            }
          } catch {
            setStatusText('Uploading to Vercel Blob...');
          }
        } else {
          setStatusText('Uploading to Vercel Blob...');
        }

        const formData = new FormData();
        formData.append('file', fileToUpload);

        const res = await fetch(endpoint, {
          method: 'POST',
          body: formData,
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        const json = await safeJson<{
          url?: string;
          imageUrl?: string;
          data?: { url?: string; media?: { url?: string; secureUrl?: string } };
          media?: { url?: string; secureUrl?: string };
          error?: string | { message?: string };
        }>(res);

        if (!res.ok || json.success === false) {
          const errorMsg =
            (typeof json.error === 'object' && json.error?.message) ||
            (typeof json.error === 'string' && json.error) ||
            `Upload failed (${res.status})`;

          if (objectUrl.startsWith('blob:')) URL.revokeObjectURL(objectUrl);
          setPreviewUrl(null);
          setError(errorMsg);
          onError?.(errorMsg);
          setIsUploading(false);
          return { success: false, error: errorMsg };
        }

        const resObj = json as unknown as {
          url?: string;
          imageUrl?: string;
          data?: { url?: string; media?: { url?: string; secureUrl?: string } };
          media?: { url?: string; secureUrl?: string };
        };

        const uploadedUrl =
          resObj.data?.url ||
          resObj.url ||
          resObj.imageUrl ||
          resObj.data?.media?.secureUrl ||
          resObj.data?.media?.url ||
          resObj.media?.secureUrl ||
          resObj.media?.url ||
          '';

        if (!uploadedUrl) {
          const errorMsg = 'Upload succeeded but no image URL was returned by the server.';
          if (objectUrl.startsWith('blob:')) URL.revokeObjectURL(objectUrl);
          setPreviewUrl(null);
          setError(errorMsg);
          onError?.(errorMsg);
          setIsUploading(false);
          return { success: false, error: errorMsg };
        }

        // Revoke temporary object URL
        if (objectUrl.startsWith('blob:')) {
          URL.revokeObjectURL(objectUrl);
        }

        setPreviewUrl(null);
        setIsUploading(false);
        abortControllerRef.current = null;
        onSuccess?.(uploadedUrl, resObj.data?.media || resObj.media);
        return { success: true, url: uploadedUrl, media: resObj.data?.media || resObj.media };
      } catch (err: unknown) {
        clearTimeout(timeoutId);
        if (objectUrl.startsWith('blob:')) {
          URL.revokeObjectURL(objectUrl);
        }
        setPreviewUrl(null);

        const isAbort = (err as Error)?.name === 'AbortError';
        const errorMsg = isAbort
          ? 'Upload timed out or was cancelled. Please try again.'
          : err instanceof Error
          ? err.message
          : 'Network error during image upload';

        setError(errorMsg);
        onError?.(errorMsg);
        setIsUploading(false);
        abortControllerRef.current = null;
        return { success: false, error: errorMsg };
      }
    },
    [validateFile, autoCompress, onSuccess, onError, endpoint]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    async (e: React.DragEvent): Promise<UploadResult | null> => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        return await uploadFile(files[0]);
      }
      return null;
    },
    [uploadFile]
  );

  const clearError = useCallback(() => setError(null), []);

  return {
    isUploading,
    statusText,
    error,
    setError,
    clearError,
    previewUrl,
    setPreviewUrl,
    clearPreview,
    cancelUpload,
    isDragging,
    uploadFile,
    validateFile,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  };
}
