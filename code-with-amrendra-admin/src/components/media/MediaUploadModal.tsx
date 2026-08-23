'use client';

import React, { useState } from 'react';
import { UploadCloud, AlertCircle } from 'lucide-react';
import { safeJson } from '@/lib/utils';

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
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setError('');

    try {
      if (uploadTab === 'file') {
        if (!selectedFile) {
          setError('Please select an image file to upload.');
          setUploading(false);
          return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        const res = await fetch('/api/media/upload', {
          method: 'POST',
          body: formData,
        });

        const json = await safeJson(res);
        if (!res.ok || !json.success) {
          setError(json.error?.message || 'Failed to upload image file');
          setUploading(false);
          return;
        }
      } else {
        if (!fileName.trim() || !url.trim()) {
          setError('Please enter asset name and URL.');
          setUploading(false);
          return;
        }

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
          setError(json.error?.message || 'Failed to bookmark media URL');
          setUploading(false);
          return;
        }
      }

      setSelectedFile(null);
      setFileName('');
      setUrl('');
      setError('');
      onSuccess();
      onClose();
    } catch {
      setError('Connection error');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="admin-card p-6 max-w-md w-full bg-white border-slate-200 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-base font-extrabold text-slate-900">Add Media Asset</h3>
          <div className="flex items-center bg-slate-100 rounded-lg p-0.5 text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                setUploadTab('file');
                setError('');
              }}
              className={`px-2.5 py-1 rounded-md transition ${
                uploadTab === 'file' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-500'
              }`}
            >
              Upload File
            </button>
            <button
              type="button"
              onClick={() => {
                setUploadTab('url');
                setError('');
              }}
              className={`px-2.5 py-1 rounded-md transition ${
                uploadTab === 'url' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-500'
              }`}
            >
              Link URL
            </button>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-600 text-xs rounded-xl flex items-center gap-2">
            <AlertCircle size={14} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleUpload} className="space-y-4">
          {uploadTab === 'file' ? (
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-600">Select Image File</label>
              <div className="border-2 border-dashed border-slate-200 hover:border-indigo-400 rounded-2xl p-6 text-center transition cursor-pointer relative bg-slate-50/50">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <UploadCloud size={28} className="mx-auto text-indigo-600 mb-2" />
                <div className="text-xs font-bold text-slate-700">
                  {selectedFile ? selectedFile.name : 'Click or drag image file here'}
                </div>
                <div className="text-[10px] text-slate-400 mt-1">PNG, JPG, WEBP, SVG up to 10MB</div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Asset Name</label>
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
                <label className="block text-xs font-bold text-slate-600 mb-1">Public Image URL</label>
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

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              disabled={uploading}
              className="admin-btn-secondary text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading}
              className="admin-btn-primary text-xs"
            >
              {uploading ? 'Processing...' : uploadTab === 'file' ? 'Upload Image' : 'Save Link'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
