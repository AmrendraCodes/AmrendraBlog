'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import {
  Save,
  ArrowLeft,
  Globe,
  Bold,
  Italic,
  Code,
  List,
  Quote,
  Heading1,
  Heading2,
} from 'lucide-react';
import { slugify } from '@/lib/utils';

export default function NewBlogPostPage() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [autoSlug, setAutoSlug] = useState(true);
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [status, setStatus] = useState<'DRAFT' | 'PUBLISHED' | 'SCHEDULED'>('DRAFT');
  const [categoryId, setCategoryId] = useState('');
  const [authorName, setAuthorName] = useState('Amrendra Kumar');
  const [tagsInput, setTagsInput] = useState('Next.js, React, Architecture');

  // SEO Fields
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [canonicalUrl, setCanonicalUrl] = useState('');
  const [ogTitle, setOgTitle] = useState('');
  const [ogDescription, setOgDescription] = useState('');
  const [ogImage, setOgImage] = useState('');

  const [categories, setCategories] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadCategories() {
      try {
        const res = await fetch('/api/categories');
        const json = await res.json();
        if (active && json.success) {
          setCategories(json.data.categories);
        }
      } catch (err) {
        console.error('Failed to load categories:', err);
      }
    }

    loadCategories();

    return () => {
      active = false;
    };
  }, []);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (autoSlug) {
      setSlug(slugify(val));
    }
    if (!metaTitle) setMetaTitle(val);
  };

  const handleInsertSyntax = (prefix: string, suffix = '') => {
    setContent((prev) => `${prev}\n${prefix}${suffix}`);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const tagsArray = tagsInput.split(',').map((t) => t.trim()).filter(Boolean);

    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          slug,
          excerpt,
          content,
          featuredImage,
          status,
          categoryId: categoryId || undefined,
          authorName,
          tags: tagsArray,
          metaTitle: metaTitle || title,
          metaDescription: metaDescription || excerpt,
          canonicalUrl,
          ogTitle: ogTitle || metaTitle || title,
          ogDescription: ogDescription || metaDescription || excerpt,
          ogImage: ogImage || featuredImage,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        setError(json.error?.message || 'Failed to save blog post');
        setSaving(false);
        return;
      }

      router.push('/content/blog');
    } catch {
      setError('Connection error');
      setSaving(false);
    }
  };

  return (
    <DashboardLayout title="Create Blog Post" subtitle="Write and configure your technical article">
      <form onSubmit={handleSave} className="space-y-8">
        {/* Header Action Row */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => router.back()}
            className="admin-btn-secondary text-xs"
          >
            <ArrowLeft size={14} /> Back to Posts
          </button>

          <div className="flex items-center gap-3">
            <select
              value={status}
              onChange={(e: any) => setStatus(e.target.value)}
              className="admin-input py-2 text-xs font-bold w-36 cursor-pointer"
            >
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Publish Now</option>
              <option value="SCHEDULED">Schedule</option>
            </select>

            <button type="submit" disabled={saving} className="admin-btn-primary text-xs">
              <Save size={15} />
              <span>{saving ? 'Saving...' : 'Save Post'}</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold shadow-xs">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Article Editor (Left 2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title & Slug */}
            <div className="admin-card p-6 space-y-4">
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2">
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g. Architecting Distributed Systems with Next.js 16"
                  className="admin-input text-lg font-bold"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-600">
                    URL Slug
                  </label>
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
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-mono select-none">
                    /resources/blog/
                  </span>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="admin-input pl-32 font-mono text-xs text-indigo-700 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">
                  Excerpt / Summary
                </label>
                <textarea
                  rows={2}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Short article summary for post cards and search result snippets..."
                  className="admin-input text-xs"
                />
              </div>
            </div>

            {/* Content Editor with Formatting Toolbar */}
            <div className="admin-card p-6 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500">
                  Article Content (Markdown) *
                </label>
                {/* Toolbar */}
                <div className="flex items-center gap-1">
                  <button type="button" onClick={() => handleInsertSyntax('# ')} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition" title="H1 Heading">
                    <Heading1 size={15} />
                  </button>
                  <button type="button" onClick={() => handleInsertSyntax('## ')} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition" title="H2 Heading">
                    <Heading2 size={15} />
                  </button>
                  <button type="button" onClick={() => handleInsertSyntax('**Bold Text**')} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition" title="Bold">
                    <Bold size={15} />
                  </button>
                  <button type="button" onClick={() => handleInsertSyntax('*Italic Text*')} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition" title="Italic">
                    <Italic size={15} />
                  </button>
                  <button type="button" onClick={() => handleInsertSyntax('```js\n// code here\n```')} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition" title="Code Block">
                    <Code size={15} />
                  </button>
                  <button type="button" onClick={() => handleInsertSyntax('- Bullet point')} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition" title="List">
                    <List size={15} />
                  </button>
                  <button type="button" onClick={() => handleInsertSyntax('> Blockquote')} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition" title="Quote">
                    <Quote size={15} />
                  </button>
                </div>
              </div>

              <textarea
                rows={16}
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your article content using markdown formatting..."
                className="admin-input font-mono text-xs leading-relaxed"
              />
            </div>

            {/* SEO Configuration Block */}
            <div className="admin-card p-6 space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3 text-indigo-600">
                <Globe size={18} />
                <h3 className="text-sm font-extrabold text-slate-900">SEO & Social Meta Configuration</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">SEO Meta Title</label>
                  <input
                    type="text"
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    placeholder="SEO Title"
                    className="admin-input text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Canonical URL</label>
                  <input
                    type="text"
                    value={canonicalUrl}
                    onChange={(e) => setCanonicalUrl(e.target.value)}
                    placeholder="https://codewithamrendra.in/resources/blog/..."
                    className="admin-input text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">SEO Meta Description</label>
                <textarea
                  rows={2}
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  placeholder="Meta description for search engine result pages (SERPs)"
                  className="admin-input text-xs"
                />
              </div>

              {/* Google Search Live Preview */}
              <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-100 shadow-xs">
                <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">Google SERP Live Preview</div>
                <div className="text-indigo-600 text-sm font-bold hover:underline truncate">
                  {metaTitle || title || 'Article Title Preview'}
                </div>
                <div className="text-emerald-700 text-[11px] font-mono mt-0.5 truncate">
                  https://codewithamrendra.in/resources/blog/{slug || 'url-slug'}
                </div>
                <div className="text-slate-600 text-xs mt-1 line-clamp-2">
                  {metaDescription || excerpt || 'Search description preview snippet will appear here...'}
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar Options (1 col) */}
          <div className="space-y-6">
            {/* Category & Taxonomy */}
            <div className="admin-card p-5 space-y-4">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Taxonomy & Author</h3>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Category</label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="admin-input text-xs cursor-pointer font-medium"
                >
                  <option value="">Select Category</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Author Name</label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="admin-input text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Tags (Comma-separated)</label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="React, Next.js, Architecture"
                  className="admin-input text-xs"
                />
              </div>
            </div>

            {/* Featured Image */}
            <div className="admin-card p-5 space-y-3">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Featured Image</h3>
              <input
                type="text"
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="admin-input text-xs font-mono"
              />
              {featuredImage && (
                <div className="rounded-xl overflow-hidden border border-slate-200 aspect-video relative shadow-xs">
                  <img src={featuredImage} alt="Featured Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </DashboardLayout>
  );
}
