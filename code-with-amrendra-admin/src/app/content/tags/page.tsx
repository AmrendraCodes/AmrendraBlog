'use client';

import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Plus, Search, Tags as TagIcon, Trash2, AlertCircle } from 'lucide-react';
import { slugify } from '@/lib/utils';

export default function TagsPage() {
  const [tags, setTags] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // Modal
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchTags = async () => {
    try {
      const res = await fetch('/api/tags');
      const json = await res.json();
      if (json.success) setTags(json.data.tags);
    } catch (err) {
      console.error('Fetch tags error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const handleNameChange = (val: string) => {
    setName(val);
    setSlug(slugify(val));
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/tags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, slug }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        setError(json.error?.message || 'Failed to create tag');
        setSubmitting(false);
        return;
      }

      setShowModal(false);
      setName('');
      setSlug('');
      fetchTags();
    } catch {
      setError('Connection error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/tags?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setTags((prev) => prev.filter((t) => t.id !== id));
      }
    } catch (err) {
      console.error('Delete tag error:', err);
    }
  };

  const filtered = tags.filter((t) => t.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardLayout title="Tag Management" subtitle="Manage article tags and metadata keywords">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tags..."
            className="admin-input pl-10"
          />
        </div>

        <button onClick={() => setShowModal(true)} className="admin-btn-primary text-xs">
          <Plus size={16} /> Create Tag
        </button>
      </div>

      <div className="admin-card overflow-hidden">
        <div className="p-4 flex flex-wrap gap-2.5">
          {loading ? (
            <div className="py-8 text-center text-gray-500 w-full">Loading tags...</div>
          ) : filtered.length === 0 ? (
            <div className="py-8 text-center text-gray-500 w-full">No tags found.</div>
          ) : (
            filtered.map((tag) => (
              <div
                key={tag.id}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#111726] border border-[#1f2a40] text-xs text-white"
              >
                <TagIcon size={13} className="text-emerald-400" />
                <span className="font-medium">{tag.name}</span>
                <span className="text-[10px] text-gray-500 font-mono">#{tag.slug}</span>
                <button
                  onClick={() => handleDelete(tag.id)}
                  className="ml-1 text-gray-400 hover:text-red-400"
                  title="Remove Tag"
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="admin-card p-6 max-w-sm w-full bg-[#151c2e] border-[#1f2a40] space-y-4">
            <h3 className="text-base font-bold text-white">Create New Tag</h3>

            {error && (
              <div className="p-3 rounded bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                <AlertCircle size={15} /> {error}
              </div>
            )}

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Tag Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g. Next.js"
                  className="admin-input text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Slug *</label>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="nextjs"
                  className="admin-input text-xs font-mono text-emerald-400"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="admin-btn-secondary text-xs">
                  Cancel
                </button>
                <button type="submit" disabled={submitting} className="admin-btn-primary text-xs">
                  {submitting ? 'Saving...' : 'Create Tag'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
