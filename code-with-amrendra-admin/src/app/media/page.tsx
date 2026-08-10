'use client';

import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import {
  UploadCloud,
  Search,
  Copy,
  Trash2,
  Check,
  Grid,
  List as ListIcon,
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function MediaLibraryPage() {
  const [media, setMedia] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Upload modal
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [fileName, setFileName] = useState('');
  const [url, setUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  const fetchMedia = async () => {
    try {
      const res = await fetch('/api/media');
      const json = await res.json();
      if (json.success) setMedia(json.data.media);
    } catch (err) {
      console.error('Fetch media error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleCopyUrl = (urlStr: string, id: string) => {
    navigator.clipboard.writeText(urlStr);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      const res = await fetch('/api/media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName, url, format: 'jpg', width: 1200, height: 800, bytes: 145000 }),
      });

      const json = await res.json();
      if (json.success) {
        setShowUploadModal(false);
        setFileName('');
        setUrl('');
        fetchMedia();
      }
    } catch (err) {
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/media?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMedia((prev) => prev.filter((m) => m.id !== id));
      }
    } catch (err) {
      console.error('Delete media error:', err);
    }
  };

  const filtered = media.filter((m) => m.fileName.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardLayout title="Media Library" subtitle="Upload, inspect, and manage site media assets">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3 flex-1 max-w-md">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search images by filename..."
              className="admin-input pl-10"
            />
          </div>

          <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 shadow-xs">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition ${viewMode === 'grid' ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-slate-400 hover:text-slate-600'}`}
              title="Grid View"
            >
              <Grid size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition ${viewMode === 'list' ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-slate-400 hover:text-slate-600'}`}
              title="List View"
            >
              <ListIcon size={16} />
            </button>
          </div>
        </div>

        <button onClick={() => setShowUploadModal(true)} className="admin-btn-primary text-xs">
          <UploadCloud size={16} /> Upload Asset
        </button>
      </div>

      {/* Grid or List Display */}
      {loading ? (
        <div className="py-20 text-center text-slate-400 font-medium">Loading media library...</div>
      ) : filtered.length === 0 ? (
        <div className="py-20 text-center text-slate-400 font-medium">No media assets found.</div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map((item) => (
            <div key={item.id} className="admin-card overflow-hidden group flex flex-col justify-between bg-white">
              <div className="aspect-square bg-slate-100 relative overflow-hidden flex items-center justify-center">
                <img
                  src={item.url}
                  alt={item.fileName}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-slate-900/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2 backdrop-blur-xs">
                  <button
                    onClick={() => handleCopyUrl(item.url, item.id)}
                    className="p-2 rounded-lg bg-indigo-600 text-white font-bold hover:scale-105 transition shadow-sm"
                    title="Copy Image URL"
                  >
                    {copiedId === item.id ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 rounded-lg bg-red-600 text-white font-bold hover:scale-105 transition shadow-sm"
                    title="Delete Asset"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="p-3 bg-white border-t border-slate-100">
                <div className="text-xs font-bold text-slate-900 truncate" title={item.fileName}>
                  {item.fileName}
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono mt-1">
                  <span>{item.format?.toUpperCase() || 'JPG'}</span>
                  <span>{item.width && item.height ? `${item.width}x${item.height}` : ''}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="admin-card overflow-hidden">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50/80 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-200/80">
              <tr>
                <th className="py-3.5 px-4">Preview</th>
                <th className="py-3.5 px-4">Filename</th>
                <th className="py-3.5 px-4">Dimensions</th>
                <th className="py-3.5 px-4">Size</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-indigo-50/40 transition">
                  <td className="py-2.5 px-4">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden border border-slate-200">
                      <img src={item.url} alt={item.fileName} className="w-full h-full object-cover" />
                    </div>
                  </td>
                  <td className="py-2.5 px-4 font-bold text-slate-900">{item.fileName}</td>
                  <td className="py-2.5 px-4 font-mono text-slate-500 text-[11px]">
                    {item.width && item.height ? `${item.width}x${item.height}px` : 'N/A'}
                  </td>
                  <td className="py-2.5 px-4 font-mono text-slate-500 text-[11px]">
                    {item.bytes ? `${Math.round(item.bytes / 1024)} KB` : 'N/A'}
                  </td>
                  <td className="py-2.5 px-4 font-mono text-slate-500 text-[11px]">{formatDate(item.createdAt)}</td>
                  <td className="py-2.5 px-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleCopyUrl(item.url, item.id)}
                        className="p-1.5 rounded-lg hover:bg-indigo-50 text-indigo-600 transition"
                        title="Copy URL"
                      >
                        {copiedId === item.id ? <Check size={14} /> : <Copy size={14} />}
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition"
                        title="Delete Asset"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="admin-card p-6 max-w-md w-full bg-white border-slate-200 shadow-2xl space-y-4">
            <h3 className="text-base font-extrabold text-slate-900">Upload Media Asset</h3>
            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Asset Name *</label>
                <input
                  type="text"
                  required
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  placeholder="e.g. system-architecture-banner.jpg"
                  className="admin-input text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Image URL / Asset URL *</label>
                <input
                  type="text"
                  required
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://res.cloudinary.com/... or Unsplash URL"
                  className="admin-input text-xs font-mono text-indigo-700 font-bold"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="admin-btn-secondary text-xs"
                >
                  Cancel
                </button>
                <button type="submit" disabled={uploading} className="admin-btn-primary text-xs">
                  {uploading ? 'Uploading...' : 'Save Asset'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
