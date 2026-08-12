'use client';

import React, { useState, useEffect, use } from 'react';
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

export default function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [status, setStatus] = useState<'DRAFT' | 'PUBLISHED' | 'SCHEDULED'>('DRAFT');
  const [categoryId, setCategoryId] = useState('');
  const [authorName, setAuthorName] = useState('Amrendra Kumar');
  const [tagsInput, setTagsInput] = useState('');

  // SEO Fields
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [canonicalUrl, setCanonicalUrl] = useState('');
  const [ogTitle, setOgTitle] = useState('');
  const [ogDescription, setOgDescription] = useState('');
  const [ogImage, setOgImage] = useState('');

  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadData() {
      try {
        const [catRes, postRes] = await Promise.all([
          fetch('/api/categories'),
          fetch(`/api/blogs/${id}`),
        ]);

        const catJson = await catRes.json();
        if (active && catJson.success) setCategories(catJson.data.categories);

        const postJson = await postRes.json();
        if (active && postJson.success) {
          const p = postJson.data.post;
          setTitle(p.title || '');
          setSlug(p.slug || '');
          setExcerpt(p.excerpt || '');
          setContent(p.content || '');
          setFeaturedImage(p.featuredImage || '');
          setStatus(p.status || 'DRAFT');
          setCategoryId(p.categoryId || '');
          setAuthorName(p.authorName || 'Amrendra Kumar');
          setMetaTitle(p.metaTitle || p.title || '');
          setMetaDescription(p.metaDescription || p.excerpt || '');
          setCanonicalUrl(p.canonicalUrl || '');
          setOgTitle(p.ogTitle || p.metaTitle || p.title || '');
          setOgDescription(p.ogDescription || p.metaDescription || '');
          setOgImage(p.ogImage || p.featuredImage || '');
          if (p.tags) {
            setTagsInput(p.tags.map((t: any) => t.tag?.name || t).join(', '));
          }
        }
      } catch (err) {
        console.error('Failed to load post data:', err);
        setError('Failed to load post');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id]);

  const handleInsertSyntax = (prefix: string, suffix = '') => {
    setContent((prev) => `${prev}\n${prefix}${suffix}`);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const tagsArray = tagsInput.split(',').map((t) => t.trim()).filter(Boolean);

    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: 'PUT',
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
          metaTitle,
          metaDescription,
          canonicalUrl,
          ogTitle,
          ogDescription,
          ogImage,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        setError(json.error?.message || 'Failed to update blog post');
        setSaving(false);
        return;
      }

      router.push('/content/blog');
    } catch {
      setError('Connection error');
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout title="Edit Blog Post" subtitle="Loading post data...">
        <div className="py-20 text-center text-slate-400 font-medium">Loading editor...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Edit Blog Post" subtitle={`Editing: ${title}`}>
      <form onSubmit={handleSave} className="space-y-8">
        <div className="flex items-center justify-between">
          <button type="button" onClick={() => router.back()} className="admin-btn-secondary text-xs">
            <ArrowLeft size={14} /> Back to Posts
          </button>

          <div className="flex items-center gap-3">
            <select
              value={status}
              onChange={(e: any) => setStatus(e.target.value)}
              className="admin-input py-2 text-xs font-bold w-36 cursor-pointer"
            >
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
              <option value="SCHEDULED">Scheduled</option>
            </select>

            <button type="submit" disabled={saving} className="admin-btn-primary text-xs">
              <Save size={15} />
              <span>{saving ? 'Saving...' : 'Update Post'}</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold shadow-xs">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="admin-card p-6 space-y-4">
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2">
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="admin-input text-lg font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">URL Slug</label>
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
                <label className="block text-xs font-bold text-slate-600 mb-1">Excerpt</label>
                <textarea
                  rows={2}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  className="admin-input text-xs"
                />
              </div>
            </div>

            <div className="admin-card p-6 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500">
                  Article Content (Markdown)
                </label>
                <div className="flex items-center gap-1">
                  <button type="button" onClick={() => handleInsertSyntax('# ')} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition"><Heading1 size={15} /></button>
                  <button type="button" onClick={() => handleInsertSyntax('## ')} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition"><Heading2 size={15} /></button>
                  <button type="button" onClick={() => handleInsertSyntax('**Bold**')} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition"><Bold size={15} /></button>
                  <button type="button" onClick={() => handleInsertSyntax('*Italic*')} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition"><Italic size={15} /></button>
                  <button type="button" onClick={() => handleInsertSyntax('```js\n// code\n```')} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition"><Code size={15} /></button>
                </div>
              </div>
              <textarea
                rows={16}
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="admin-input font-mono text-xs leading-relaxed"
              />
            </div>

            <div className="admin-card p-6 space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3 text-indigo-600">
                <Globe size={18} />
                <h3 className="text-sm font-extrabold text-slate-900">SEO Meta Settings</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">SEO Title</label>
                  <input type="text" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} className="admin-input text-xs" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Canonical URL</label>
                  <input type="text" value={canonicalUrl} onChange={(e) => setCanonicalUrl(e.target.value)} className="admin-input text-xs font-mono" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">SEO Meta Description</label>
                <textarea rows={2} value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} className="admin-input text-xs" />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="admin-card p-5 space-y-4">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Taxonomy & Author</h3>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Category</label>
                <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="admin-input text-xs cursor-pointer font-medium">
                  <option value="">Select Category</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Author</label>
                <input type="text" value={authorName} onChange={(e) => setAuthorName(e.target.value)} className="admin-input text-xs" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Tags</label>
                <input type="text" value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} className="admin-input text-xs" />
              </div>
            </div>

            <div className="admin-card p-5 space-y-3">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Featured Image</h3>
              <input type="text" value={featuredImage} onChange={(e) => setFeaturedImage(e.target.value)} className="admin-input text-xs font-mono" />
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
