'use client';

import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  AlertCircle,
  X,
  RefreshCw,
  Image as ImageIcon,
  Link as LinkIcon,
  Check,
  Copy,
  Loader2,
} from 'lucide-react';
import { useImageUpload } from '@/hooks/useImageUpload';

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  helpText?: string;
  placeholder?: string;
  aspectRatio?: 'video' | 'square' | 'auto';
  allowUrlInput?: boolean;
  endpoint?: string;
}

export default function ImageUploadField({
  label,
  value,
  onChange,
  helpText,
  placeholder = 'https://images.unsplash.com/...',
  aspectRatio = 'video',
  allowUrlInput = true,
  endpoint = '/api/upload',
}: ImageUploadFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [inputMode, setInputMode] = useState<'upload' | 'url'>('upload');
  const [copied, setCopied] = useState(false);

  const {
    isUploading,
    statusText,
    error,
    setError,
    clearError,
    previewUrl,
    clearPreview,
    cancelUpload,
    isDragging,
    uploadFile,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  } = useImageUpload({
    endpoint,
    onSuccess: (uploadedUrl) => {
      onChange(uploadedUrl);
    },
  });

  // Display image is either the uploading preview or the saved form value
  const displayImage = isUploading ? (previewUrl || value) : value;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await uploadFile(file);
    }
    // Reset file input value so the same file can be re-selected if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    clearPreview();
    onChange('');
    clearError();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCopyUrl = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!displayImage) return;
    navigator.clipboard.writeText(displayImage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const aspectClass =
    aspectRatio === 'square'
      ? 'aspect-square'
      : aspectRatio === 'video'
      ? 'aspect-video'
      : 'min-h-[160px]';

  return (
    <div className="space-y-2">
      {/* Header & Mode Switcher */}
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
          {label}
        </label>
        {allowUrlInput && (
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5 text-[11px] font-semibold">
            <button
              type="button"
              onClick={() => {
                setInputMode('upload');
                clearError();
              }}
              className={`px-2 py-0.5 rounded-md transition flex items-center gap-1 ${
                inputMode === 'upload'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-xs font-bold'
                  : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'
              }`}
            >
              <UploadCloud size={12} />
              Upload
            </button>
            <button
              type="button"
              onClick={() => {
                setInputMode('url');
                clearError();
              }}
              className={`px-2 py-0.5 rounded-md transition flex items-center gap-1 ${
                inputMode === 'url'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-xs font-bold'
                  : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'
              }`}
            >
              <LinkIcon size={12} />
              URL
            </button>
          </div>
        )}
      </div>

      {/* Error Banner */}
      {error && (
        <div className="p-2.5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-xs rounded-xl flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <AlertCircle size={14} className="shrink-0" />
            <span className="truncate">{error}</span>
          </div>
          <button
            type="button"
            onClick={clearError}
            className="text-red-400 hover:text-red-600 p-0.5 rounded"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Manual URL Input Mode */}
      {inputMode === 'url' ? (
        <div className="space-y-2">
          <div className="relative">
            <input
              type="url"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="admin-input text-xs font-mono pr-8"
            />
            {value && (
              <button
                type="button"
                onClick={() => onChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X size={13} />
              </button>
            )}
          </div>
          {value && (
            <div
              className={`rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 ${aspectClass} relative shadow-xs bg-slate-900/5 group`}
            >
              <img
                src={value}
                alt={`${label} Preview`}
                className="w-full h-full object-cover"
                onError={() => setError('Failed to load image from given URL')}
              />
            </div>
          )}
        </div>
      ) : (
        /* Direct Drag & Drop / File Upload Mode */
        <div className="space-y-2">
          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png, image/jpeg, image/webp, image/gif, image/svg+xml"
            onChange={handleFileChange}
            className="hidden"
            id={`file-input-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
          />

          {displayImage ? (
            /* Selected / Uploaded Image View with Overlay Actions */
            <div
              className={`rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 ${aspectClass} relative shadow-xs group bg-slate-950`}
            >
              <img
                src={displayImage}
                alt={`${label} Preview`}
                className={`w-full h-full object-cover transition duration-300 ${
                  isUploading ? 'opacity-40 blur-xs scale-105' : 'group-hover:scale-102'
                }`}
              />

              {/* Uploading Overlay */}
              {isUploading && (
                <div className="absolute inset-0 bg-slate-900/75 backdrop-blur-xs flex flex-col items-center justify-center text-white z-10 gap-2.5 p-4 text-center">
                  <Loader2 size={28} className="animate-spin text-indigo-400" />
                  <span className="text-xs font-semibold">{statusText || 'Uploading to Vercel Blob...'}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      cancelUpload();
                    }}
                    className="mt-1 px-3 py-1 bg-white/20 hover:bg-white/30 text-white text-[11px] font-medium rounded-lg transition"
                  >
                    Cancel
                  </button>
                </div>
              )}

              {/* Action Bar (Top Right) */}
              {!isUploading && (
                <div className="absolute top-2 right-2 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition">
                  <button
                    type="button"
                    onClick={handleCopyUrl}
                    title="Copy Image URL"
                    className="p-1.5 rounded-lg bg-slate-900/70 hover:bg-slate-900 text-white backdrop-blur-xs shadow-md transition text-xs"
                  >
                    {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                  </button>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    title="Change / Replace Image"
                    className="px-2 py-1 rounded-lg bg-slate-900/70 hover:bg-slate-900 text-white backdrop-blur-xs shadow-md transition text-xs font-medium flex items-center gap-1"
                  >
                    <RefreshCw size={12} />
                    Change
                  </button>
                  <button
                    type="button"
                    onClick={handleRemove}
                    title="Remove Image"
                    className="p-1.5 rounded-lg bg-red-600/80 hover:bg-red-600 text-white backdrop-blur-xs shadow-md transition"
                  >
                    <X size={13} />
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Empty Dropzone State */
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-6 text-center transition cursor-pointer relative ${
                isDragging
                  ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/20 scale-[1.01]'
                  : 'border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500 bg-slate-50/60 dark:bg-slate-900/40'
              }`}
            >
              {isUploading ? (
                <div className="py-3 flex flex-col items-center justify-center gap-2">
                  <Loader2 size={28} className="animate-spin text-indigo-600" />
                  <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {statusText || 'Uploading image...'}
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      cancelUpload();
                    }}
                    className="mt-1 px-3 py-1 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-[11px] font-medium rounded-lg transition"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shadow-xs">
                    {isDragging ? <ImageIcon size={20} /> : <UploadCloud size={20} />}
                  </div>
                  <div className="text-xs font-bold text-slate-700 dark:text-slate-200">
                    {isDragging ? (
                      <span className="text-indigo-600">Drop image here now</span>
                    ) : (
                      <>
                        Drag & drop image here, or{' '}
                        <span className="text-indigo-600 dark:text-indigo-400 hover:underline">
                          Browse
                        </span>
                      </>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">
                    PNG, JPG, WEBP, GIF or SVG (Max 5MB)
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}

      {/* Help text */}
      {helpText && (
        <p className="text-[11px] text-slate-400 dark:text-slate-500">{helpText}</p>
      )}
    </div>
  );
}
