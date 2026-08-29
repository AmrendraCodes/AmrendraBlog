import { useState, useCallback } from 'react';
import { safeJson } from '@/lib/utils';

export interface UseImageUploadOptions {
  maxSizeBytes?: number;
  allowedTypes?: string[];
  endpoint?: string;
  onSuccess?: (url: string, data?: unknown) => void;
  onError?: (errorMessage: string) => void;
}

export interface UploadResult {
  success: boolean;
  url?: string;
  media?: unknown;
  error?: string;
}

const DEFAULT_MAX_SIZE = 5 * 1024 * 1024; // 5MB limit
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
    onSuccess,
    onError,
  } = options;

  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

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

      // Generate instant local preview
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      setIsUploading(true);

      try {
        const formData = new FormData();
        formData.append('file', file);

        const res = await fetch(endpoint, {
          method: 'POST',
          body: formData,
        });

        const json = await safeJson<{
          url?: string;
          imageUrl?: string;
          data?: { url?: string; media?: { url?: string; secureUrl?: string } };
          media?: { url?: string; secureUrl?: string };
          error?: string | { message?: string };
        }>(res);

        if (!res.ok || json.success === false) {
          const errorMsg = json.error?.message || 'Failed to upload image file';
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
          const errorMsg = 'Upload succeeded but no image URL was returned';
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
        onSuccess?.(uploadedUrl, resObj.data?.media || resObj.media);
        return { success: true, url: uploadedUrl, media: resObj.data?.media || resObj.media };
      } catch (err: unknown) {
        if (objectUrl.startsWith('blob:')) {
          URL.revokeObjectURL(objectUrl);
        }
        const errorMsg = err instanceof Error ? err.message : 'Network error during image upload';
        setError(errorMsg);
        onError?.(errorMsg);
        setIsUploading(false);
        return { success: false, error: errorMsg };
      }
    },
    [validateFile, onSuccess, onError]
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
  const clearPreview = useCallback(() => {
    setPreviewUrl((prev) => {
      if (prev && prev.startsWith('blob:')) {
        URL.revokeObjectURL(prev);
      }
      return null;
    });
  }, []);

  return {
    isUploading,
    error,
    setError,
    clearError,
    previewUrl,
    setPreviewUrl,
    clearPreview,
    isDragging,
    uploadFile,
    validateFile,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  };
}
