'use client';

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import MarkdownPreview from '@/components/MarkdownPreview';
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

export default function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  const [title, setTitle] = useState<string>('');
  const [slug, setSlug] = useState<string>('');
  const [excerpt, setExcerpt] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [featuredImage, setFeaturedImage] = useState<string>('');
  const [status, setStatus] = useState<'DRAFT' | 'PUBLISHED' | 'SCHEDULED'>('DRAFT');
  const [categoryId, setCategoryId] = useState<string>('');
  const [authorName, setAuthorName] = useState<string>('Amrendra Kumar');
  const [tagsInput, setTagsInput] = useState<string>('');

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
  const [metaTitle, setMetaTitle] = useState<string>('');
  const [metaDescription, setMetaDescription] = useState<string>('');
  const [canonicalUrl, setCanonicalUrl] = useState<string>('');
  const [ogTitle, setOgTitle] = useState<string>('');
  const [ogDescription, setOgDescription] = useState<string>('');
  const [ogImage, setOgImage] = useState<string>('');

  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

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

      const json = await res.json();
      if (res.ok && json.success) {
        setContent(json.data.formattedContent);
        setFormatStats(json.data.stats);
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
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStatus(e.target.value as any)}
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
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
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
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSlug(e.target.value)}
                    className="admin-input pl-32 font-mono text-xs text-indigo-700 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Excerpt</label>
                <textarea
                  rows={2}
                  value={excerpt}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setExcerpt(e.target.value)}
                  className="admin-input text-xs"
                />
              </div>
            </div>

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

                  <button type="button" onClick={() => handleInsertSyntax('# ')} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition"><Heading1 size={15} /></button>
                  <button type="button" onClick={() => handleInsertSyntax('## ')} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition"><Heading2 size={15} /></button>
                  <button type="button" onClick={() => handleInsertSyntax('### ')} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition"><Heading3 size={15} /></button>
                  <button type="button" onClick={() => handleInsertSyntax('**Bold**')} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition"><Bold size={15} /></button>
                  <button type="button" onClick={() => handleInsertSyntax('*Italic*')} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition"><Italic size={15} /></button>
                  <button type="button" onClick={() => handleInsertSyntax('```js\n// code\n```')} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition"><Code size={15} /></button>
                  <button type="button" onClick={() => handleInsertSyntax('- Bullet point')} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition" title="List"><List size={15} /></button>
                  <button type="button" onClick={() => handleInsertSyntax('> [!NOTE]\n> Note content here')} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition" title="Alert"><Quote size={15} /></button>
                </div>
              </div>

              {editorTab === 'write' ? (
                <textarea
                  rows={18}
                  required
                  value={content}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
                  className="admin-input font-mono text-xs leading-relaxed"
                />
              ) : (
                <MarkdownPreview content={content} />
              )}

              <div className="flex items-center justify-between pt-2 text-[11px] text-slate-500">
                <span className="font-semibold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 size={12} /> Auto-formats on update
                </span>
                <span className="font-mono text-slate-400">
                  {content.trim() ? `${content.trim().split(/\s+/).length} words` : '0 words'}
                </span>
              </div>
            </div>

            <div className="admin-card p-6 space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3 text-indigo-600">
                <Globe size={18} />
                <h3 className="text-sm font-extrabold text-slate-900">SEO Meta Settings</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">SEO Title</label>
                  <input type="text" value={metaTitle} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMetaTitle(e.target.value)} className="admin-input text-xs" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Canonical URL</label>
                  <input type="text" value={canonicalUrl} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCanonicalUrl(e.target.value)} className="admin-input text-xs font-mono" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">SEO Meta Description</label>
                <textarea rows={2} value={metaDescription} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMetaDescription(e.target.value)} className="admin-input text-xs" />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="admin-card p-5 space-y-4">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Taxonomy & Author</h3>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Category</label>
                <select value={categoryId} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCategoryId(e.target.value)} className="admin-input text-xs cursor-pointer font-medium">
                  <option value="">Select Category</option>
                  {categories.map((c: any) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Author</label>
                <input type="text" value={authorName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAuthorName(e.target.value)} className="admin-input text-xs" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Tags</label>
                <input type="text" value={tagsInput} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTagsInput(e.target.value)} className="admin-input text-xs" />
              </div>
            </div>

            <div className="admin-card p-5 space-y-3">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Featured Image</h3>
              <input type="text" value={featuredImage} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFeaturedImage(e.target.value)} className="admin-input text-xs font-mono" />
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
