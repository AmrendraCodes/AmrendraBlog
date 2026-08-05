'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Save,
  Globe,
  Sparkles,
  Image as ImageIcon,
  Tag as TagIcon,
  FolderTree,
} from 'lucide-react';

export default function CreateBlogPage() {
  const router = useRouter();

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/admin/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data.categories || []))
      .catch((err) => console.error(err));
  }, []);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!slug) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const tags = tagsInput
        ? tagsInput.split(',').map((t) => t.trim()).filter(Boolean)
        : [];

      const res = await fetch('/api/admin/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          slug,
          excerpt,
          content,
          featuredImage,
          metaTitle: metaTitle || title,
          metaDescription: metaDescription || excerpt,
          status,
          categoryId,
          tags,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to create blog post');
      }

      router.push('/admin/blogs');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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
            <h1 className="text-2xl font-extrabold text-white tracking-tight">Create Blog Article</h1>
            <p className="text-xs text-[#9CA3AF]">Draft and publish high-converting articles to your site.</p>
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
            disabled={loading}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#10B981] to-[#059669] text-white font-bold text-xs shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all disabled:opacity-50"
          >
            <Save size={16} /> {loading ? 'Saving...' : 'Save Article'}
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
        {/* Left Column: Title & Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-3xl bg-[#0A0F0C] border border-[#1E2E25] p-6 space-y-4">
            <div>
              <label className="block text-xs font-mono font-bold uppercase text-[#9CA3AF] mb-2">
                Article Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. Building Scalable Web Apps with Next.js 16"
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
                placeholder="A brief summary for post cards and search engine preview..."
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
                placeholder="Write your article content here in Markdown format..."
                className="w-full px-4 py-3 bg-[#111C16] border border-[#1E2E25] rounded-xl text-xs font-mono text-white focus:outline-none focus:border-[#10B981] leading-relaxed"
                required
              />
            </div>
          </div>
        </div>

        {/* Right Column: Taxonomy, SEO & Images */}
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
                placeholder="React, Next.js, SEO"
                className="w-full px-3 py-2.5 bg-[#111C16] border border-[#1E2E25] rounded-xl text-xs text-white focus:outline-none focus:border-[#10B981]"
              />
            </div>
          </div>

          {/* Featured Image URL */}
          <div className="rounded-3xl bg-[#0A0F0C] border border-[#1E2E25] p-6 space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#10B981] flex items-center gap-2">
              <ImageIcon size={16} /> Featured Image
            </h3>

            <div>
              <label className="block text-xs font-bold text-white mb-2">Image URL / Cloudinary URL</label>
              <input
                type="text"
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
                placeholder="https://res.cloudinary.com/..."
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
              <Globe size={16} /> Search Engine Optimization (SEO)
            </h3>

            <div>
              <label className="block text-xs font-bold text-white mb-2">Meta Title</label>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder="SEO Meta Title"
                className="w-full px-3 py-2.5 bg-[#111C16] border border-[#1E2E25] rounded-xl text-xs text-white focus:outline-none focus:border-[#10B981]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-white mb-2">Meta Description</label>
              <textarea
                rows={3}
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="SEO Meta Description (under 160 chars)"
                className="w-full px-3 py-2.5 bg-[#111C16] border border-[#1E2E25] rounded-xl text-xs text-white focus:outline-none focus:border-[#10B981]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
