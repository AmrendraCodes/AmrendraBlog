'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import MarkdownPreview from '@/components/MarkdownPreview';
import ImageUploadField from '@/components/media/ImageUploadField';
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
  Heading3,
  Wand2,
  Sparkles,
  Eye,
  Edit3,
  CheckCircle2,
  Link2,
} from 'lucide-react';
import { slugify, safeJson } from '@/lib/utils';
import type { Category } from '@prisma/client';

export type TagItem = string | { tag?: { name: string; slug?: string }; name?: string; slug?: string };

export interface BlogPostFormData {
  id?: string;
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  featuredImage?: string;
  status?: 'DRAFT' | 'PUBLISHED' | 'SCHEDULED';
  categoryId?: string;
  authorName?: string;
  tags?: TagItem[];
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

interface BlogFormProps {
  mode: 'create' | 'edit';
  postId?: string;
  initialData?: BlogPostFormData;
  onSuccess?: () => void;
}

export default function BlogForm({
  mode,
  postId,
  initialData,
  onSuccess,
}: BlogFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState<string>(initialData?.title || '');
  const [slug, setSlug] = useState<string>(initialData?.slug || '');
  const [autoSlug, setAutoSlug] = useState<boolean>(mode === 'create');
  const [excerpt, setExcerpt] = useState<string>(initialData?.excerpt || '');
  const [content, setContent] = useState<string>(initialData?.content || '');
  const [featuredImage, setFeaturedImage] = useState<string>(initialData?.featuredImage || '');
  const [status, setStatus] = useState<'DRAFT' | 'PUBLISHED' | 'SCHEDULED'>(
    initialData?.status || 'DRAFT'
  );
  const [categoryId, setCategoryId] = useState<string>(initialData?.categoryId || '');
  const [authorName, setAuthorName] = useState<string>(
    initialData?.authorName || 'Amrendra Kumar'
  );
  const [tagsInput, setTagsInput] = useState<string>(() => {
    if (!initialData?.tags) return mode === 'create' ? 'Next.js, React, Architecture' : '';
    return initialData.tags
      .map((t: TagItem) => (typeof t === 'string' ? t : t.tag?.name || t.name || ''))
      .filter(Boolean)
      .join(', ');
  });
  const [autoFormatOnSave, setAutoFormatOnSave] = useState<boolean>(true);

  // Editor View Mode: 'write' | 'preview'
  const [editorTab, setEditorTab] = useState<'write' | 'preview'>('write');

  // Format status & stats
  const [isFormatting, setIsFormatting] = useState<boolean>(false);
  const [formatStats, setFormatStats] = useState<{
    h1Count: number;
    h2Count: number;
    h3Count: number;
    codeElementsWrapped: number;
    internalLinksAdded: number;
    linksList: Array<{ keyword: string; url: string; title: string }>;
  } | null>(null);

  // SEO Fields
  const [metaTitle, setMetaTitle] = useState<string>(initialData?.metaTitle || '');
  const [metaDescription, setMetaDescription] = useState<string>(
    initialData?.metaDescription || ''
  );
  const [canonicalUrl, setCanonicalUrl] = useState<string>(
    initialData?.canonicalUrl || ''
  );
  const [ogTitle, setOgTitle] = useState<string>(initialData?.ogTitle || '');
  const [ogDescription, setOgDescription] = useState<string>(
    initialData?.ogDescription || ''
  );
  const [ogImage, setOgImage] = useState<string>(initialData?.ogImage || '');

  const [categories, setCategories] = useState<Category[]>([]);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // Synchronize when initialData updates (e.g. edit mode async post fetch)
  useEffect(() => {
    if (initialData) {
      if (initialData.title !== undefined) setTitle(initialData.title || '');
      if (initialData.slug !== undefined) setSlug(initialData.slug || '');
      if (initialData.excerpt !== undefined) setExcerpt(initialData.excerpt || '');
      if (initialData.content !== undefined) setContent(initialData.content || '');
      if (initialData.featuredImage !== undefined) setFeaturedImage(initialData.featuredImage || '');
      if (initialData.status) setStatus(initialData.status);
      if (initialData.categoryId !== undefined) setCategoryId(initialData.categoryId || '');
      if (initialData.authorName !== undefined) setAuthorName(initialData.authorName || 'Amrendra Kumar');
      if (initialData.tags) {
        setTagsInput(
          initialData.tags
            .map((t: TagItem) => (typeof t === 'string' ? t : t.tag?.name || t.name || ''))
            .filter(Boolean)
            .join(', ')
        );
      }
      if (initialData.metaTitle !== undefined) setMetaTitle(initialData.metaTitle || '');
      if (initialData.metaDescription !== undefined) setMetaDescription(initialData.metaDescription || '');
      if (initialData.canonicalUrl !== undefined) setCanonicalUrl(initialData.canonicalUrl || '');
      if (initialData.ogTitle !== undefined) setOgTitle(initialData.ogTitle || '');
      if (initialData.ogDescription !== undefined) setOgDescription(initialData.ogDescription || '');
      if (initialData.ogImage !== undefined) setOgImage(initialData.ogImage || '');
    }
  }, [initialData]);

  // Load Categories
  useEffect(() => {
    let active = true;

    async function loadCategories() {
      try {
        const res = await fetch('/api/categories');
        const json = await safeJson<{ categories: Category[] }>(res);
        if (active && json.success && json.data?.categories) {
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

  const handleInsertSyntax = (prefix: string, suffix: string = '') => {
    setContent((prev: string) => `${prev}\n${prefix}${suffix}`);
  };

  // Magic Format & Interlink Function
  const handleMagicFormat = async () => {
    if (!content.trim()) return;
    setIsFormatting(true);
    setError('');

    try {
      const res = await fetch('/api/blogs/format', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          slug,
          title,
        }),
      });

      const json = await safeJson<{
        formattedContent: string;
        stats: {
          h1Count: number;
          h2Count: number;
          h3Count: number;
          codeElementsWrapped: number;
          internalLinksAdded: number;
          linksList: Array<{ keyword: string; url: string; title: string }>;
        };
      }>(res);
      if (res.ok && json.success && json.data) {
        setContent(json.data.formattedContent);
        setFormatStats(json.data.stats);

        // If title is empty, check if H1 exists in markdown to auto-fill
        if (!title.trim()) {
          const h1Match = json.data.formattedContent.match(/^#\s+(.+)$/m);
          if (h1Match && h1Match[1]) {
            const extractedTitle = h1Match[1].replace(/[*`_]/g, '').trim();
            setTitle(extractedTitle);
            if (autoSlug) setSlug(slugify(extractedTitle));
            if (!metaTitle) setMetaTitle(extractedTitle);
          }
        }

        // If excerpt is empty, extract first non-heading paragraph
        if (!excerpt.trim()) {
          const paragraphs = json.data.formattedContent
            .split('\n')
            .map((l: string) => l.trim())
            .filter((l: string) => l.length > 20 && !l.startsWith('#') && !l.startsWith('>') && !l.startsWith('```'));
          if (paragraphs.length > 0) {
            const cleanExcerpt = paragraphs[0].replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[`*_]/g, '');
            setExcerpt(cleanExcerpt.substring(0, 160) + (cleanExcerpt.length > 160 ? '...' : ''));
          }
        }
      } else {
        setError(json.error?.message || 'Failed to format content');
      }
    } catch {
      setError('Error communicating with formatting service');
    } finally {
      setIsFormatting(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const tagsArray = tagsInput.split(',').map((t: string) => t.trim()).filter(Boolean);

    try {
      const endpoint = mode === 'create' ? '/api/blogs' : `/api/blogs/${postId}`;
      const method = mode === 'create' ? 'POST' : 'PUT';

      const payload = {
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
      };

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await safeJson(res);
      if (!res.ok || !json.success) {
        setError(json.error?.message || `Failed to ${mode === 'create' ? 'save' : 'update'} blog post`);
        setSaving(false);
        return;
      }

      if (onSuccess) {
        onSuccess();
      } else {
        router.push('/content/blog');
      }
    } catch {
      setError('Connection error');
      setSaving(false);
    }
  };

  return (
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
          <button
            type="button"
            onClick={handleMagicFormat}
            disabled={isFormatting || !content.trim()}
            className="px-3.5 py-2 rounded-xl text-xs font-extrabold bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-sm hover:from-indigo-700 hover:to-violet-700 transition flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Fix headings, wrap code tags in backticks, and add internal links automatically"
          >
            <Sparkles size={14} className={isFormatting ? 'animate-spin' : 'animate-pulse'} />
            <span>{isFormatting ? 'Formatting...' : 'Magic Format & Interlink'}</span>
          </button>

          <select
            value={status}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setStatus(e.target.value as 'DRAFT' | 'PUBLISHED' | 'SCHEDULED')
            }
            className="admin-input py-2 text-xs font-bold w-36 cursor-pointer"
          >
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Publish Now</option>
            <option value="SCHEDULED">Schedule</option>
          </select>

          <button type="submit" disabled={saving} className="admin-btn-primary text-xs">
            <Save size={15} />
            <span>
              {saving
                ? mode === 'create'
                  ? 'Saving...'
                  : 'Updating...'
                : mode === 'create'
                ? 'Save Post'
                : 'Update Post'}
            </span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold shadow-xs">
          {error}
        </div>
      )}

      {/* Format Success Notification Banner */}
      {formatStats && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-indigo-50 border border-emerald-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-xs">
              <CheckCircle2 size={16} className="text-emerald-600" />
              <span>Article Successfully Formatted & Interlinked!</span>
            </div>
            <button
              type="button"
              onClick={() => setFormatStats(null)}
              className="text-[11px] text-slate-400 hover:text-slate-700 font-bold"
            >
              Dismiss
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
            <div className="bg-white/80 rounded-xl p-2 border border-emerald-100 text-center">
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">H2 Sections</div>
              <div className="text-sm font-black text-slate-900">{formatStats.h2Count}</div>
            </div>
            <div className="bg-white/80 rounded-xl p-2 border border-emerald-100 text-center">
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">H3 Subsections</div>
              <div className="text-sm font-black text-slate-900">{formatStats.h3Count}</div>
            </div>
            <div className="bg-white/80 rounded-xl p-2 border border-emerald-100 text-center">
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Code Elements</div>
              <div className="text-sm font-black text-indigo-600">{formatStats.codeElementsWrapped}</div>
            </div>
            <div className="bg-white/80 rounded-xl p-2 border border-emerald-100 text-center">
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Internal Links</div>
              <div className="text-sm font-black text-emerald-700">{formatStats.internalLinksAdded}</div>
            </div>
          </div>
          {formatStats.linksList && formatStats.linksList.length > 0 && (
            <div className="pt-1 text-[11px] text-slate-600 flex flex-wrap items-center gap-1.5">
              <span className="font-bold text-slate-700 flex items-center gap-1">
                <Link2 size={12} className="text-indigo-600" /> Linked Topics:
              </span>
              {formatStats.linksList.map((l: { keyword: string; url: string; title: string }, i: number) => (
                <span
                  key={i}
                  className="inline-flex items-center px-2 py-0.5 rounded-md bg-white border border-indigo-100 text-indigo-700 font-medium text-[10px]"
                >
                  {l.keyword} &rarr; <span className="text-slate-500 ml-1">{l.title}</span>
                </span>
              ))}
            </div>
          )}
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleTitleChange(e.target.value)}
                placeholder="e.g. How to Build a Light & Dark Theme Toggle Using JavaScript"
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
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAutoSlug(e.target.checked)}
                    className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>Auto-generate</span>
                </label>
              </div>
              <div className="flex items-center rounded-xl border border-slate-200 bg-white overflow-hidden focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-100 transition shadow-2xs">
                <span className="bg-slate-50 border-r border-slate-200 px-3.5 py-2.5 text-slate-400 text-xs font-mono select-none flex-shrink-0 font-medium">
                  /resources/blog/
                </span>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSlug(e.target.value)}
                  placeholder="post-slug-url"
                  className="w-full px-3 py-2 text-xs font-mono text-indigo-700 font-bold bg-transparent outline-none border-0 placeholder:text-slate-300 placeholder:font-normal"
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
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setExcerpt(e.target.value)}
                placeholder="Short article summary for post cards and search result snippets..."
                className="admin-input text-xs"
              />
            </div>
          </div>

          {/* Content Editor with Formatting Toolbar & Live Preview Tabs */}
          <div className="admin-card p-6 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500">
                  Article Content (Markdown) *
                </label>

                {/* Mode Tabs */}
                <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setEditorTab('write')}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition ${
                      editorTab === 'write'
                        ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-xs'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    <Edit3 size={13} /> Write
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditorTab('preview')}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition ${
                      editorTab === 'preview'
                        ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-xs'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    <Eye size={13} /> Preview
                  </button>
                </div>
              </div>

              {/* Toolbar */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleMagicFormat}
                  disabled={isFormatting || !content.trim()}
                  className="p-1.5 px-2 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center gap-1 transition"
                  title="Magic Format & Interlink"
                >
                  <Wand2 size={13} className={isFormatting ? 'animate-spin' : ''} />
                  <span>Auto-Format</span>
                </button>

                <div className="h-4 w-px bg-slate-200 mx-1" />

                <button type="button" onClick={() => handleInsertSyntax('# ')} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition" title="H1 Heading">
                  <Heading1 size={15} />
                </button>
                <button type="button" onClick={() => handleInsertSyntax('## ')} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition" title="H2 Heading">
                  <Heading2 size={15} />
                </button>
                <button type="button" onClick={() => handleInsertSyntax('### ')} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition" title="H3 Subheading">
                  <Heading3 size={15} />
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
                <button type="button" onClick={() => handleInsertSyntax('> [!NOTE]\n> Note content here')} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition" title="Quote / Alert">
                  <Quote size={15} />
                </button>
              </div>
            </div>

            {editorTab === 'write' ? (
              <textarea
                rows={18}
                required
                value={content}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
                placeholder="Paste your raw article content here, then click 'Magic Format & Interlink' to automatically format headings, code backticks, and internal links..."
                className="admin-input font-mono text-xs leading-relaxed"
              />
            ) : (
              <MarkdownPreview content={content} />
            )}

            <div className="flex items-center justify-between pt-2 text-[11px] text-slate-500">
              <label className="flex items-center gap-1.5 font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoFormatOnSave}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAutoFormatOnSave(e.target.checked)}
                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span>Auto-format & smart interlink on publish / save</span>
              </label>

              <span className="font-mono text-slate-400">
                {content.trim() ? `${content.trim().split(/\s+/).length} words` : '0 words'}
              </span>
            </div>
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
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMetaTitle(e.target.value)}
                  placeholder="SEO Title"
                  className="admin-input text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Canonical URL</label>
                <input
                  type="text"
                  value={canonicalUrl}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCanonicalUrl(e.target.value)}
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
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMetaDescription(e.target.value)}
                placeholder="Meta description for search engine result pages (SERPs)"
                className="admin-input text-xs"
              />
            </div>

            {/* Social Share Image (OG Image) */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <ImageUploadField
                label="Social Share Image (og:image)"
                value={ogImage}
                onChange={setOgImage}
                helpText="Custom image for social cards. If left empty, the Featured Image will be used automatically."
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
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCategoryId(e.target.value)}
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAuthorName(e.target.value)}
                className="admin-input text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Tags (Comma-separated)</label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTagsInput(e.target.value)}
                placeholder="React, Next.js, Architecture"
                className="admin-input text-xs"
              />
            </div>
          </div>

          {/* Featured Image */}
          <div className="admin-card p-5">
            <ImageUploadField
              label="Featured Image"
              value={featuredImage}
              onChange={setFeaturedImage}
              helpText="Primary banner for the blog article and card listings."
            />
          </div>
        </div>
      </div>
    </form>
  );
}
