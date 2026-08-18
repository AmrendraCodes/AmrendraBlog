'use client';

import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Plus, Tag as TagIcon, Edit, Trash2, AlertCircle, Search } from 'lucide-react';
import { slugify, safeJson } from '@/lib/utils';

export default function TagsPage() {
  const [tags, setTags] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // Create Modal
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [autoSlug, setAutoSlug] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Edit Modal
  const [editingTag, setEditingTag] = useState<any | null>(null);
  const [editName, setEditName] = useState('');
  const [editSlug, setEditSlug] = useState('');
  const [editError, setEditError] = useState('');
  const [updating, setUpdating] = useState(false);

  const fetchTags = async () => {
    try {
      const res = await fetch('/api/tags');
      const json = await safeJson(res);
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
    if (autoSlug) setSlug(slugify(val));
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

      const json = await safeJson(res);
      if (!res.ok || !json.success) {
        setError(json.error?.message || 'Failed to create tag');
        setSubmitting(false);
        return;
      }

      setShowCreateModal(false);
      setName('');
      setSlug('');
      fetchTags();
    } catch {
      setError('Connection error');
    } finally {
      setSubmitting(false);
    }
  };

  const openEditModal = (t: any) => {
    setEditingTag(t);
    setEditName(t.name || '');
    setEditSlug(t.slug || '');
    setEditError('');
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTag) return;
    setUpdating(true);
    setEditError('');

    try {
      const res = await fetch('/api/tags', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingTag.id,
          name: editName,
          slug: editSlug,
        }),
      });

      const json = await safeJson(res);
      if (!res.ok || !json.success) {
        setEditError(json.error?.message || 'Failed to update tag');
        setUpdating(false);
        return;
      }

      setEditingTag(null);
      fetchTags();
    } catch {
      setEditError('Connection error');
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (id: string, tagName: string) => {
    if (!confirm(`Are you sure you want to delete tag "${tagName}"?`)) return;

    try {
      const res = await fetch(`/api/tags?id=${id}`, { method: 'DELETE' });
      const json = await safeJson(res);
      if (res.ok && json.success) {
        setTags((prev) => prev.filter((t) => t.id !== id));
      } else {
        alert(json.error?.message || 'Failed to delete tag');
      }
    } catch (err) {
      console.error('Delete tag error:', err);
    }
  };

  const filteredTags = tags.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.slug.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout title="Tag Management" subtitle="Manage article tags and metadata keywords">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tags..."
            className="admin-input pl-10 text-xs"
          />
        </div>

        <button onClick={() => setShowCreateModal(true)} className="admin-btn-primary text-xs">
          <Plus size={16} /> Create Tag
        </button>
      </div>

      <div className="admin-card p-6 bg-white">
        {loading ? (
          <div className="py-12 text-center text-slate-400 font-medium">Loading tags...</div>
        ) : filteredTags.length === 0 ? (
          <div className="py-12 text-center text-slate-400 font-medium">No tags found.</div>
        ) : (
          <div className="flex flex-wrap gap-2.5">
            {filteredTags.map((tag) => (
              <div
                key={tag.id}
                className="group inline-flex items-center gap-2 pl-3.5 pr-2 py-2 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-indigo-200 hover:bg-indigo-50/30 transition text-xs font-semibold text-slate-700 shadow-2xs"
              >
                <TagIcon size={13} className="text-indigo-600" />
                <span className="text-slate-900 font-bold">{tag.name}</span>
                <span className="font-mono text-[10px] text-slate-400 font-normal">#{tag.slug}</span>
                <div className="flex items-center gap-1 ml-1 pl-1 border-l border-slate-200">
                  <button
                    onClick={() => openEditModal(tag)}
                    className="p-1 rounded-md hover:bg-slate-200 text-slate-400 hover:text-indigo-600 transition"
                    title="Edit Tag"
                  >
                    <Edit size={12} />
                  </button>
                  <button
                    onClick={() => handleDelete(tag.id, tag.name)}
                    className="p-1 rounded-md hover:bg-red-100 text-slate-400 hover:text-red-600 transition"
                    title="Delete Tag"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Tag Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="admin-card p-6 max-w-md w-full bg-white border-slate-200 shadow-2xl space-y-4">
            <h3 className="text-base font-extrabold text-slate-900">Create New Tag</h3>

            {error && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs flex items-center gap-2 font-medium">
                <AlertCircle size={15} /> {error}
              </div>
            )}

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Tag Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g. Next.js"
                  className="admin-input text-xs font-bold"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-600">Tag Slug *</label>
                  <label className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={autoSlug}
                      onChange={(e) => setAutoSlug(e.target.checked)}
                      className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>Auto-generate</span>
                  </label>
                </div>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="admin-input text-xs font-mono font-bold text-indigo-700"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowCreateModal(false)} className="admin-btn-secondary text-xs">
                  Cancel
                </button>
                <button type="submit" disabled={submitting} className="admin-btn-primary text-xs">
                  {submitting ? 'Creating...' : 'Create Tag'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Tag Modal */}
      {editingTag && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="admin-card p-6 max-w-md w-full bg-white border-slate-200 shadow-2xl space-y-4">
            <h3 className="text-base font-extrabold text-slate-900">Edit Tag</h3>

            {editError && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs flex items-center gap-2 font-medium">
                <AlertCircle size={15} /> {editError}
              </div>
            )}

            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Tag Name *</label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="admin-input text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Tag Slug *</label>
                <input
                  type="text"
                  required
                  value={editSlug}
                  onChange={(e) => setEditSlug(e.target.value)}
                  className="admin-input text-xs font-mono font-bold text-indigo-700"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button type="button" onClick={() => setEditingTag(null)} className="admin-btn-secondary text-xs">
                  Cancel
                </button>
                <button type="submit" disabled={updating} className="admin-btn-primary text-xs">
                  {updating ? 'Saving Changes...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
