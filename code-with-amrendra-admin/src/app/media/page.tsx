'use client';

import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { UploadCloud, Search, Grid, List as ListIcon } from 'lucide-react';
import { safeJson } from '@/lib/utils';
import MediaUploadModal from '@/components/media/MediaUploadModal';
import MediaGrid from '@/components/media/MediaGrid';
import MediaList from '@/components/media/MediaList';

export default function MediaLibraryPage() {
  const [media, setMedia] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const fetchMedia = async () => {
    try {
      const res = await fetch('/api/media');
      const json = await safeJson(res);
      if (json.success) setMedia(json.data.media);
    } catch (err) {
      console.error('Fetch media error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const res = await fetch('/api/media');
        const json = await safeJson(res);
        if (active && json.success) setMedia(json.data.media);
      } catch (err) {
        console.error('Fetch media error:', err);
      } finally {
        if (active) setLoading(false);
      }
    };

    load();

    return () => {
      active = false;
    };
  }, []);

  const handleCopyUrl = (urlStr: string, id: string) => {
    navigator.clipboard.writeText(urlStr);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/media?id=${id}`, { method: 'DELETE' });
      const json = await safeJson(res);
      if (res.ok && json.success) {
        setMedia((prev) => prev.filter((m) => m.id !== id));
      } else {
        console.error('Delete media failed:', json.error?.message);
      }
    } catch (err) {
      console.error('Delete media error:', err);
    }
  };

  const filtered = media.filter((m) =>
    m.fileName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout
      title="Media Library"
      subtitle="Upload, inspect, and manage site media assets"
    >
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3 flex-1 max-w-md">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
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
              className={`p-1.5 rounded-lg transition cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-indigo-50 text-indigo-600 font-bold'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
              title="Grid View"
            >
              <Grid size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-indigo-50 text-indigo-600 font-bold'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
              title="List View"
            >
              <ListIcon size={16} />
            </button>
          </div>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          className="admin-btn-primary text-xs"
        >
          <UploadCloud size={16} /> Upload Asset
        </button>
      </div>

      {/* Grid or List Display */}
      {loading ? (
        <div className="py-20 text-center text-slate-400 font-medium">
          Loading media library...
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-20 text-center text-slate-400 font-medium">
          No media assets found.
        </div>
      ) : viewMode === 'grid' ? (
        <MediaGrid
          items={filtered}
          copiedId={copiedId}
          onCopyUrl={handleCopyUrl}
          onDelete={handleDelete}
        />
      ) : (
        <MediaList
          items={filtered}
          copiedId={copiedId}
          onCopyUrl={handleCopyUrl}
          onDelete={handleDelete}
        />
      )}

      {/* Upload Modal */}
      <MediaUploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onSuccess={fetchMedia}
      />
    </DashboardLayout>
  );
}
