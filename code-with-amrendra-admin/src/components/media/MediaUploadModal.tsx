'use client';

import React, { useState } from 'react';
import { UploadCloud, AlertCircle, Loader2 } from 'lucide-react';
import { safeJson } from '@/lib/utils';
import { useImageUpload } from '@/hooks/useImageUpload';

interface MediaUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function MediaUploadModal({
  isOpen,
  onClose,
  onSuccess,
}: MediaUploadModalProps) {
  const [uploadTab, setUploadTab] = useState<'file' | 'url'>('file');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');
  const [url, setUrl] = useState('');
  const [savingUrl, setSavingUrl] = useState(false);
  const [urlError, setUrlError] = useState('');

  const {
    isUploading,
    error: uploadError,
    setError: setUploadError,
    clearError: clearUploadError,
    uploadFile,
    isDragging,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  } = useImageUpload({
    onSuccess: () => {
      setSelectedFile(null);
      onSuccess();
      onClose();
    },
  });

  if (!isOpen) return null;

  const activeError = uploadTab === 'file' ? uploadError : urlError;
  const isBusy = isUploading || savingUrl;

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (uploadTab === 'file') {
      if (!selectedFile) {
        setUploadError('Please select an image file to upload.');
        return;
      }
      await uploadFile(selectedFile);
    } else {
      setUrlError('');
      if (!fileName.trim() || !url.trim()) {
        setUrlError('Please enter asset name and URL.');
        return;
      }

      setSavingUrl(true);
      try {
        const res = await fetch('/api/media', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fileName,
            url,
            format: 'jpg',
            width: 1200,
            height: 800,
            bytes: 145000,
          }),
        });

        const json = await safeJson(res);
        if (!res.ok || !json.success) {
          setUrlError(json.error?.message || 'Failed to bookmark media URL');
          setSavingUrl(false);
          return;
        }

        setFileName('');
        setUrl('');
        setUrlError('');
        onSuccess();
        onClose();
      } catch {
        setUrlError('Connection error');
      } finally {
        setSavingUrl(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="admin-card p-6 max-w-md w-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Add Media Asset</h3>
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5 text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                setUploadTab('file');
                clearUploadError();
                setUrlError('');
              }}
              className={`px-2.5 py-1 rounded-md transition ${
                uploadTab === 'file'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Upload File
            </button>
            <button
              type="button"
              onClick={() => {
                setUploadTab('url');
                clearUploadError();
                setUrlError('');
              }}
              className={`px-2.5 py-1 rounded-md transition ${
                uploadTab === 'url'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Link URL
            </button>
          </div>
        </div>

        {activeError && (
          <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-xs rounded-xl flex items-center gap-2">
            <AlertCircle size={14} className="shrink-0" />
            <span>{activeError}</span>
          </div>
        )}

        <form onSubmit={handleUpload} className="space-y-4">
          {uploadTab === 'file' ? (
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400">
                Select Image File
              </label>
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={async (e) => {
                  const result = await handleDrop(e);
                  if (result?.success) {
                    onSuccess();
                    onClose();
                  }
                }}
                className={`border-2 border-dashed rounded-2xl p-6 text-center transition cursor-pointer relative ${
                  isDragging
                    ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/20'
                    : 'border-slate-200 dark:border-slate-800 hover:border-indigo-400 bg-slate-50/50 dark:bg-slate-900/50'
                }`}
              >
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/webp, image/gif, image/svg+xml"
                  onChange={(e) => {
                    setSelectedFile(e.target.files?.[0] || null);
                    clearUploadError();
                  }}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <UploadCloud size={28} className="mx-auto text-indigo-600 dark:text-indigo-400 mb-2" />
                <div className="text-xs font-bold text-slate-700 dark:text-slate-200">
                  {selectedFile ? selectedFile.name : 'Click or drag image file here'}
                </div>
                <div className="text-[10px] text-slate-400 mt-1">PNG, JPG, WEBP, GIF, SVG up to 5MB</div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                  Asset Name
                </label>
                <input
                  type="text"
                  required
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  placeholder="e.g. hero-banner.jpg"
                  className="admin-input text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                  Public Image URL
                </label>
                <input
                  type="url"
                  required
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="admin-input text-xs font-mono"
                />
              </div>
            </div>
          )}

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              disabled={isBusy}
              className="admin-btn-secondary text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isBusy}
              className="admin-btn-primary text-xs flex items-center gap-1.5"
            >
              {isBusy && <Loader2 size={13} className="animate-spin" />}
              {isBusy
                ? 'Processing...'
                : uploadTab === 'file'
                ? 'Upload Image'
                : 'Save Link'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
