'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  ArrowLeft,
  Save,
  Globe,
  Image as ImageIcon,
  FolderTree,
  Trash2,
} from 'lucide-react';

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [status, setStatus] = useState('DRAFT');
  const [categoryId, setCategoryId] = useState('');
  const [tagsInput, setTagsInput] = useState('');

  const [categories, setCategories] = useState<any[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/admin/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data.categories || []))
      .catch((err) => console.error(err));

    if (id) {
      fetch(`/api/admin/blogs/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.blog) {
            const b = data.blog;
            setTitle(b.title || '');
            setSlug(b.slug || '');
            setExcerpt(b.excerpt || '');
            setContent(b.content || '');
            setFeaturedImage(b.featuredImage || '');
            setMetaTitle(b.metaTitle || '');
            setMetaDescription(b.metaDescription || '');
            setStatus(b.status || 'DRAFT');
            setCategoryId(b.categoryId || '');
            if (b.tags) {
              setTagsInput(b.tags.map((t: any) => t.tag.name).join(', '));
            }
          }
        })
        .catch((err) => setError('Failed to load blog post details'))
        .finally(() => setInitialLoading(false));
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const tags = tagsInput
        ? tagsInput.split(',').map((t) => t.trim()).filter(Boolean)
        : [];

      const res = await fetch(`/api/admin/blogs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          slug,
          excerpt,
          content,
          featuredImage,
          metaTitle,
          metaDescription,
          status,
          categoryId,
          tags,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to update blog post');
      }

      router.push('/admin/blogs');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (initialLoading) {
    return <div className="p-8 text-center text-xs text-[#9CA3AF]">Loading blog editor...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-xl bg-[#0A0F0C] border border-[#1E2E25] text-[#9CA3AF] hover:text-white"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">Edit Blog Article</h1>
            <p className="text-xs text-[#9CA3AF]">Update title, content, SEO fields, and status.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setStatus(status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider border transition-colors ${
              status === 'PUBLISHED'
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
            }`}
          >
            Status: {status}
          </button>

          <button
            onClick={handleSubmit}
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#10B981] to-[#059669] text-white font-bold text-xs shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all disabled:opacity-50"
          >
            <Save size={16} /> {saving ? 'Saving...' : 'Update Article'}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium">
          {error}
        </div>
      )}

      {/* Editor Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-3xl bg-[#0A0F0C] border border-[#1E2E25] p-6 space-y-4">
            <div>
              <label className="block text-xs font-mono font-bold uppercase text-[#9CA3AF] mb-2">
                Article Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 bg-[#111C16] border border-[#1E2E25] rounded-xl text-base text-white font-bold focus:outline-none focus:border-[#10B981]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase text-[#9CA3AF] mb-2">
                URL Slug *
              </label>
              <div className="flex items-center gap-2 px-4 py-2.5 bg-[#111C16] border border-[#1E2E25] rounded-xl text-xs font-mono text-[#9CA3AF]">
                <span>/resources/blog/</span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="bg-transparent text-white focus:outline-none w-full font-mono"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase text-[#9CA3AF] mb-2">
                Short Excerpt
              </label>
              <textarea
                rows={2}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="w-full px-4 py-3 bg-[#111C16] border border-[#1E2E25] rounded-xl text-xs text-white focus:outline-none focus:border-[#10B981]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase text-[#9CA3AF] mb-2">
                Article Body Content (Markdown Supported) *
              </label>
              <textarea
                rows={16}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-3 bg-[#111C16] border border-[#1E2E25] rounded-xl text-xs font-mono text-white focus:outline-none focus:border-[#10B981] leading-relaxed"
                required
              />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Metadata & Taxonomy */}
          <div className="rounded-3xl bg-[#0A0F0C] border border-[#1E2E25] p-6 space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#10B981] flex items-center gap-2">
              <FolderTree size={16} /> Taxonomy
            </h3>

            <div>
              <label className="block text-xs font-bold text-white mb-2">Category</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#111C16] border border-[#1E2E25] rounded-xl text-xs text-white focus:outline-none focus:border-[#10B981]"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-white mb-2">Tags (Comma-separated)</label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#111C16] border border-[#1E2E25] rounded-xl text-xs text-white focus:outline-none focus:border-[#10B981]"
              />
            </div>
          </div>

          {/* Featured Image */}
          <div className="rounded-3xl bg-[#0A0F0C] border border-[#1E2E25] p-6 space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#10B981] flex items-center gap-2">
              <ImageIcon size={16} /> Featured Image
            </h3>

            <div>
              <label className="block text-xs font-bold text-white mb-2">Image URL</label>
              <input
                type="text"
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#111C16] border border-[#1E2E25] rounded-xl text-xs text-white focus:outline-none focus:border-[#10B981]"
              />
            </div>

            {featuredImage && (
              <div className="rounded-xl overflow-hidden border border-[#1E2E25]">
                <img src={featuredImage} alt="Preview" className="w-full h-32 object-cover" />
              </div>
            )}
          </div>

          {/* SEO Meta Fields */}
          <div className="rounded-3xl bg-[#0A0F0C] border border-[#1E2E25] p-6 space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#10B981] flex items-center gap-2">
              <Globe size={16} /> SEO Meta
            </h3>

            <div>
              <label className="block text-xs font-bold text-white mb-2">Meta Title</label>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#111C16] border border-[#1E2E25] rounded-xl text-xs text-white focus:outline-none focus:border-[#10B981]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-white mb-2">Meta Description</label>
              <textarea
                rows={3}
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#111C16] border border-[#1E2E25] rounded-xl text-xs text-white focus:outline-none focus:border-[#10B981]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
