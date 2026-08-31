'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import MarkdownPreview from '@/components/MarkdownPreview';
import ImageUploadField from '@/components/media/ImageUploadField';
import StatusBadge from '@/components/ui/StatusBadge';
import TableOfContentsField from './TableOfContentsField';
import FaqSchemaField, { type FaqItem } from './FaqSchemaField';
import {
  Save,
  ArrowLeft,
  Globe,
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  List,
  ListOrdered,
  Quote,
  Heading,
  Heading1,
  Heading2,
  Heading3,
  Sparkles,
  Eye,
  CheckCircle2,
  Link2,
  Calendar,
  RotateCw,
  Maximize2,
  Minimize2,
  MoreVertical,
  ChevronDown,
  FileText,
  Send,
  Archive,
  Image as ImageIcon,
  UploadCloud,
  Loader2,
  Minus,
} from 'lucide-react';
import { slugify, safeJson, calculateReadingTime, countWords, formatDate } from '@/lib/utils';
import { compressImage } from '@/lib/image-compressor';
import type { Category } from '@prisma/client';

export type TagItem = string | { tag?: { name: string; slug?: string }; name?: string; slug?: string };

export interface BlogPostFormData {
  id?: string;
  title?: string;
  slug?: string;
  excerpt?: string;
  description?: string;
  content?: string;
  featuredImage?: string;
  imageUrl?: string;
  status?: 'DRAFT' | 'PUBLISHED' | 'SCHEDULED';
  publishedAt?: string | Date;
  scheduledAt?: string | Date;
  categoryId?: string;
  authorName?: string;
  tags?: TagItem[];
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  faqs?: FaqItem[];
  createdAt?: string | Date;
  updatedAt?: string | Date;
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
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);
  const contentImageInputRef = useRef<HTMLInputElement>(null);

  // Form Fields
  const [title, setTitle] = useState<string>(initialData?.title || '');
  const [slug, setSlug] = useState<string>(initialData?.slug || '');
  const [autoSlug, setAutoSlug] = useState<boolean>(mode === 'create');
  const [excerpt, setExcerpt] = useState<string>(initialData?.excerpt || initialData?.description || '');
  const [content, setContent] = useState<string>(initialData?.content || '');
  const [featuredImage, setFeaturedImage] = useState<string>(
    initialData?.featuredImage || initialData?.imageUrl || ''
  );
  const [status, setStatus] = useState<'DRAFT' | 'PUBLISHED' | 'SCHEDULED'>(
    initialData?.status || 'DRAFT'
  );
  const [publishedDate, setPublishedDate] = useState<string>(() => {
    if (initialData?.publishedAt) {
      return new Date(initialData.publishedAt).toISOString().split('T')[0];
    }
    return new Date().toISOString().split('T')[0];
  });
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
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showHeadingsMenu, setShowHeadingsMenu] = useState<boolean>(false);
  const [showImageMenu, setShowImageMenu] = useState<boolean>(false);
  const [isUploadingContentImage, setIsUploadingContentImage] = useState<boolean>(false);
  const [showMoreMenu, setShowMoreMenu] = useState<boolean>(false);
  const [showSeoSection, setShowSeoSection] = useState<boolean>(false);

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
  const [faqs, setFaqs] = useState<FaqItem[]>(initialData?.faqs || []);

  const [categories, setCategories] = useState<Category[]>([]);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [saveSuccessNotice, setSaveSuccessNotice] = useState<string>('');

  // Synchronize when initialData updates (e.g. edit mode async fetch)
  useEffect(() => {
    if (initialData) {
      if (initialData.title !== undefined) setTitle(initialData.title || '');
      if (initialData.slug !== undefined) setSlug(initialData.slug || '');
      if (initialData.excerpt !== undefined || initialData.description !== undefined) {
        setExcerpt(initialData.excerpt || initialData.description || '');
      }
      if (initialData.content !== undefined) setContent(initialData.content || '');
      if (initialData.featuredImage !== undefined || initialData.imageUrl !== undefined) {
        setFeaturedImage(initialData.featuredImage || initialData.imageUrl || '');
      }
      if (initialData.status) setStatus(initialData.status);
      if (initialData.publishedAt) {
        setPublishedDate(new Date(initialData.publishedAt).toISOString().split('T')[0]);
      }
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
      if (initialData.faqs && Array.isArray(initialData.faqs)) setFaqs(initialData.faqs);
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

  // Keyboard shortcut to exit fullscreen on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (autoSlug) {
      setSlug(slugify(val));
    }
    if (!metaTitle) setMetaTitle(val);
  };

  const handleRegenerateSlug = () => {
    if (title.trim()) {
      setSlug(slugify(title));
    }
  };

  // Syntax insertion helper
  const handleInsertSyntax = (prefix: string, suffix: string = '', ensureNewLine: boolean = false) => {
    const textarea = textareaRef.current;
    if (!textarea) {
      setContent((prev) => `${prev}\n${prefix}${suffix}`);
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const previousText = textarea.value;
    const selectedText = previousText.substring(start, end);

    const needsPrecedingNewline = ensureNewLine && start > 0 && previousText[start - 1] !== '\n';
    const actualPrefix = needsPrecedingNewline ? `\n${prefix}` : prefix;

    const replacement = selectedText
      ? `${actualPrefix}${selectedText}${suffix}`
      : `${actualPrefix}${suffix}`;

    const newContent =
      previousText.substring(0, start) + replacement + previousText.substring(end);

    setContent(newContent);

    setTimeout(() => {
      textarea.focus();
      const cursorPosition = selectedText
        ? start + replacement.length
        : start + actualPrefix.length;
      textarea.setSelectionRange(cursorPosition, cursorPosition);
    }, 0);
  };

  const handleInsertHeading = (level: number) => {
    handleInsertSyntax('#'.repeat(level) + ' ', '', true);
    setShowHeadingsMenu(false);
  };

  const handleInsertDivider = () => {
    handleInsertSyntax('\n---\n\n', '', true);
  };

  const handleInsertLink = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = textarea.value.substring(start, end).trim();
    const isUrl = /^https?:\/\//i.test(selected);

    const targetUrl = window.prompt('Enter link destination URL:', isUrl ? selected : 'https://');
    if (!targetUrl || targetUrl === 'https://') return;

    const anchorText = isUrl
      ? window.prompt('Enter link text:', 'Link') || 'Link'
      : selected || 'Link text';

    const markdownLink = `[${anchorText}](${targetUrl.trim()})`;
    const before = textarea.value.substring(0, start);
    const after = textarea.value.substring(end);
    setContent(`${before}${markdownLink}${after}`);

    setTimeout(() => {
      textarea.focus();
      const cursor = start + markdownLink.length;
      textarea.setSelectionRange(cursor, cursor);
    }, 0);
  };

  const handleContentImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingContentImage(true);
    setError('');

    try {
      // 1. Auto-compress on client
      const compression = await compressImage(file, { maxWidth: 1920, quality: 0.82 });
      const fileToUpload = compression.file;

      // 2. Upload to Vercel Blob
      const formData = new FormData();
      formData.append('file', fileToUpload);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const json = await safeJson<{ url?: string; data?: { url?: string } }>(res);
      if (!res.ok || !json.success) {
        throw new Error(json.error?.message || 'Failed to upload image to Vercel Blob');
      }

      const resObj = json as unknown as { url?: string; data?: { url?: string } };
      const uploadedUrl = json.data?.url || resObj.url || resObj.data?.url;
      if (!uploadedUrl) {
        throw new Error('Upload succeeded but no image URL was returned');
      }

      // 3. Insert markdown image at cursor
      const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
      handleInsertSyntax(`\n![${cleanName}](`, `${uploadedUrl})\n`);
    } catch (err: unknown) {
      console.error('Content image upload error:', err);
      setError(err instanceof Error ? err.message : 'Failed to upload image into content');
    } finally {
      setIsUploadingContentImage(false);
      setShowImageMenu(false);
      if (contentImageInputRef.current) {
        contentImageInputRef.current.value = '';
      }
    }
  };

  const handlePromptImageUrl = () => {
    const url = window.prompt('Enter direct Image URL (https://...):', 'https://');
    if (!url || !url.trim() || url === 'https://') return;
    const alt = window.prompt('Enter Image description / alt text:', 'Image illustration') || 'Image illustration';
    handleInsertSyntax(`\n![${alt.trim()}](`, `${url.trim()})\n`);
    setShowImageMenu(false);
  };

  const handleTextareaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
      e.preventDefault();
      handleInsertSyntax('**', '**');
    } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'i') {
      e.preventDefault();
      handleInsertSyntax('*', '*');
    } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      handleInsertLink();
    } else if (e.key === 'Tab') {
      e.preventDefault();
      handleInsertSyntax('  ');
    }
  };

  const handleInsertTocToContent = (tocMarkdown: string) => {
    const textarea = textareaRef.current;
    if (!textarea) {
      setContent((prev) => `${tocMarkdown}\n\n${prev}`);
      return;
    }
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const prev = textarea.value;
    const next = prev.substring(0, start) + tocMarkdown + prev.substring(end);
    setContent(next);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + tocMarkdown.length, start + tocMarkdown.length);
    }, 0);
  };

  const handleInsertFaqMarkdown = (faqMarkdown: string) => {
    const textarea = textareaRef.current;
    if (!textarea) {
      setContent((prev) => `${prev}\n\n${faqMarkdown}`);
      return;
    }
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const prev = textarea.value;
    const next = prev.substring(0, start) + faqMarkdown + prev.substring(end);
    setContent(next);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + faqMarkdown.length, start + faqMarkdown.length);
    }, 0);
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

        if (!title.trim()) {
          const h1Match = json.data.formattedContent.match(/^#\s+(.+)$/m);
          if (h1Match && h1Match[1]) {
            const extractedTitle = h1Match[1].replace(/[*`_]/g, '').trim();
            setTitle(extractedTitle);
            if (autoSlug) setSlug(slugify(extractedTitle));
            if (!metaTitle) setMetaTitle(extractedTitle);
          }
        }

        if (!excerpt.trim()) {
          const paragraphs = json.data.formattedContent
            .split('\n')
            .map((l: string) => l.trim())
            .filter(
              (l: string) =>
                l.length > 20 &&
                !l.startsWith('#') &&
                !l.startsWith('>') &&
                !l.startsWith('```')
            );
          if (paragraphs.length > 0) {
            const cleanExcerpt = paragraphs[0]
              .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
              .replace(/[`*_]/g, '');
            setExcerpt(
              cleanExcerpt.substring(0, 160) + (cleanExcerpt.length > 160 ? '...' : '')
            );
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

  // Main Submit & Save Handler
  const handleSave = async (
    e?: React.FormEvent,
    overrideStatus?: 'DRAFT' | 'PUBLISHED' | 'SCHEDULED'
  ) => {
    if (e) e.preventDefault();
    setSaving(true);
    setError('');
    setSaveSuccessNotice('');

    const targetStatus = overrideStatus || status;
    const tagsArray = tagsInput
      .split(',')
      .map((t: string) => t.trim())
      .filter(Boolean);

    try {
      const endpoint = mode === 'create' ? '/api/blogs' : `/api/blogs/${postId}`;
      const method = mode === 'create' ? 'POST' : 'PUT';

      // Automatically normalize dividers so they never become Setext headings
      let normalizedContent = content.replace(/\n+[ \t]*[-=_*]{1,3}[ \t]*$/, '\n');
      normalizedContent = normalizedContent.replace(
        /([^\n\r])[ \t]*\r?\n[ \t]*((?:-[ \t]*){1,}|(?:=[ \t]*){1,}|(?:\*[ \t]*){3,}|(?:_[ \t]*){3,})[ \t]*(\r?\n|$)/g,
        (match, textBefore, divider) => {
          const trimmedDivider = divider.replace(/\s+/g, '');
          if (/^(?:-{3,}|={3,}|\*{3,}|_{3,})$/.test(trimmedDivider)) {
            return `${textBefore}\n\n${divider}\n\n`;
          }
          return `${textBefore}\n\n`;
        }
      );

      const payload = {
        title,
        slug: slug.trim(),
        excerpt: excerpt.trim(),
        description: excerpt.trim(),
        content: normalizedContent,
        featuredImage,
        imageUrl: featuredImage,
        status: targetStatus,
        publishedAt: publishedDate ? new Date(publishedDate).toISOString() : undefined,
        categoryId: categoryId || undefined,
        authorName,
        tags: tagsArray,
        metaTitle: metaTitle || title,
        metaDescription: metaDescription || excerpt,
        canonicalUrl,
        ogTitle: ogTitle || metaTitle || title,
        ogDescription: ogDescription || metaDescription || excerpt,
        ogImage: ogImage || featuredImage,
        faqs: faqs.filter((f) => f.question.trim() && f.answer.trim()),
      };

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await safeJson(res);
      if (!res.ok || !json.success) {
        setError(
          json.error?.message || `Failed to ${mode === 'create' ? 'save' : 'update'} blog post`
        );
        setSaving(false);
        return;
      }

      setStatus(targetStatus);
      setSaveSuccessNotice(
        targetStatus === 'PUBLISHED'
          ? 'Entry successfully published to public site!'
          : 'Entry draft successfully saved.'
      );

      if (onSuccess) {
        onSuccess();
      } else {
        setTimeout(() => {
          router.push('/content/blog');
        }, 1200);
      }
    } catch {
      setError('Network connection error while saving.');
      setSaving(false);
    }
  };

  const words = countWords(content);
  const readingTime = calculateReadingTime(content);

  return (
    <form onSubmit={(e) => handleSave(e)} className="space-y-6">
      {/* ─── TOP SECTION (STRAPI-INSPIRED HEADER & STATUS TABS) ─── */}
      <div className="space-y-3 pb-2 border-b border-[var(--border-color)]">
        {/* Back Link */}
        <div>
          <button
            type="button"
            onClick={() => router.push('/content/blog')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors cursor-pointer group"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
            <span>Back</span>
          </button>
        </div>

        {/* Title, Status Pill & Actions Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-black text-[var(--text-main)] tracking-tight">
              {mode === 'create' ? 'Create an entry' : 'Edit entry'}
            </h1>
            <StatusBadge status={status} />
          </div>

          {/* More Actions Menu Button */}
          <div className="relative flex items-center gap-2">
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowMoreMenu(!showMoreMenu)}
                className="p-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card-hover)] transition cursor-pointer"
                aria-label="More actions"
              >
                <MoreVertical size={16} />
              </button>

              {showMoreMenu && (
                <div className="absolute right-0 mt-1.5 w-48 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] shadow-xl z-50 py-1.5 animate-in fade-in zoom-in-95 duration-150">
                  <button
                    type="button"
                    onClick={() => {
                      handleMagicFormat();
                      setShowMoreMenu(false);
                    }}
                    disabled={isFormatting || !content.trim()}
                    className="w-full text-left px-3 py-2 text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--text-main)] transition cursor-pointer flex items-center gap-2 disabled:opacity-50"
                  >
                    <Sparkles size={14} className={isFormatting ? 'animate-spin' : 'text-amber-500'} />
                    <span>Auto-Format Content</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(content);
                      setShowMoreMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--text-main)] transition cursor-pointer flex items-center gap-2"
                  >
                    <FileText size={14} />
                    <span>Copy Markdown</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowSeoSection(!showSeoSection);
                      setShowMoreMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--text-main)] transition cursor-pointer flex items-center gap-2"
                  >
                    <Globe size={14} />
                    <span>{showSeoSection ? 'Hide SEO Panel' : 'Edit SEO Settings'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => router.push('/content/blog')}
                    className="w-full text-left px-3 py-2 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition cursor-pointer flex items-center gap-2"
                  >
                    <ArrowLeft size={14} />
                    <span>Discard Changes</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Strapi-style DRAFT / PUBLISHED state selector tabs */}
        <div className="flex items-center gap-1 pt-1">
          <button
            type="button"
            onClick={() => setStatus('DRAFT')}
            className={`px-3 py-1 text-[11px] font-extrabold tracking-wider uppercase transition cursor-pointer border-b-2 ${
              status === 'DRAFT'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-black'
                : 'border-transparent text-[var(--text-dim)] hover:text-[var(--text-secondary)]'
            }`}
          >
            DRAFT
          </button>
          <button
            type="button"
            onClick={() => setStatus('PUBLISHED')}
            className={`px-3 py-1 text-[11px] font-extrabold tracking-wider uppercase transition cursor-pointer border-b-2 ${
              status === 'PUBLISHED'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-black'
                : 'border-transparent text-[var(--text-dim)] hover:text-[var(--text-secondary)]'
            }`}
          >
            PUBLISHED
          </button>
        </div>
      </div>

      {/* Alert Notices */}
      {error && (
        <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-300 text-xs font-semibold shadow-xs flex items-center gap-2.5">
          <span>{error}</span>
        </div>
      )}

      {saveSuccessNotice && (
        <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-semibold shadow-xs flex items-center gap-2.5">
          <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>{saveSuccessNotice}</span>
        </div>
      )}

      {/* Format Success Notification Banner */}
      {formatStats && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-indigo-50 dark:from-emerald-950/30 dark:via-teal-950/20 dark:to-indigo-950/30 border border-emerald-200/80 dark:border-emerald-800/40 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-extrabold text-xs">
              <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-400" />
              <span>Article Successfully Formatted & Interlinked!</span>
            </div>
            <button
              type="button"
              onClick={() => setFormatStats(null)}
              className="text-[11px] text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 font-bold cursor-pointer"
            >
              Dismiss
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
            <div className="bg-white/80 dark:bg-[#1e2032] rounded-xl p-2 border border-emerald-100 dark:border-emerald-900/40 text-center">
              <div className="text-[10px] text-[var(--text-dim)] font-bold uppercase tracking-wider">
                H2 Sections
              </div>
              <div className="text-sm font-black text-[var(--text-main)]">
                {formatStats.h2Count}
              </div>
            </div>
            <div className="bg-white/80 dark:bg-[#1e2032] rounded-xl p-2 border border-emerald-100 dark:border-emerald-900/40 text-center">
              <div className="text-[10px] text-[var(--text-dim)] font-bold uppercase tracking-wider">
                H3 Subsections
              </div>
              <div className="text-sm font-black text-[var(--text-main)]">
                {formatStats.h3Count}
              </div>
            </div>
            <div className="bg-white/80 dark:bg-[#1e2032] rounded-xl p-2 border border-emerald-100 dark:border-emerald-900/40 text-center">
              <div className="text-[10px] text-[var(--text-dim)] font-bold uppercase tracking-wider">
                Code Wrapped
              </div>
              <div className="text-sm font-black text-indigo-600 dark:text-indigo-400">
                {formatStats.codeElementsWrapped}
              </div>
            </div>
            <div className="bg-white/80 dark:bg-[#1e2032] rounded-xl p-2 border border-emerald-100 dark:border-emerald-900/40 text-center">
              <div className="text-[10px] text-[var(--text-dim)] font-bold uppercase tracking-wider">
                Internal Links
              </div>
              <div className="text-sm font-black text-emerald-600 dark:text-emerald-400">
                {formatStats.internalLinksAdded}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── TWO-COLUMN FIELD LAYOUT (STRAPI-INSPIRED ARCHITECTURE) ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ─── MAIN / LEFT CONTENT COLUMN (9 of 12 cols on desktop) ─── */}
        <div className="lg:col-span-9 space-y-6">
          {/* Main Card Container */}
          <div className="admin-card p-5 sm:p-7 space-y-6">
            {/* ROW 1: Title & Description */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Title Field */}
              <div>
                <label
                  htmlFor="post-title"
                  className="block text-xs font-bold text-[var(--text-secondary)] mb-1.5 uppercase tracking-wide"
                >
                  Title<span className="text-rose-500 ml-0.5">*</span>
                </label>
                <input
                  id="post-title"
                  type="text"
                  required
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Enter entry title..."
                  className="admin-input font-bold text-sm sm:text-base py-2.5"
                />
              </div>

              {/* Description / Excerpt Field */}
              <div>
                <label
                  htmlFor="post-excerpt"
                  className="block text-xs font-bold text-[var(--text-secondary)] mb-1.5 uppercase tracking-wide"
                >
                  Description
                </label>
                <textarea
                  id="post-excerpt"
                  rows={2}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Short description summary for search engines and post cards..."
                  className="admin-input text-xs resize-none"
                />
              </div>
            </div>

            {/* ROW 2: Cover Image & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Featured Image Field */}
              <div>
                <label className="block text-xs font-bold text-[var(--text-secondary)] mb-1.5 uppercase tracking-wide">
                  Cover Image
                </label>
                <ImageUploadField
                  label=""
                  value={featuredImage}
                  onChange={setFeaturedImage}
                  helpText="Upload cover image to Vercel Blob or paste direct image URL"
                  aspectRatio="video"
                  endpoint="/api/upload"
                />
              </div>

              {/* Category Dropdown Field */}
              <div>
                <label
                  htmlFor="post-category"
                  className="block text-xs font-bold text-[var(--text-secondary)] mb-1.5 uppercase tracking-wide"
                >
                  Category
                </label>
                <select
                  id="post-category"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="admin-input text-xs font-semibold py-2.5 cursor-pointer"
                >
                  <option value="">Select a category</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-[var(--text-dim)] mt-1.5">
                  Organize content into specific technical domains
                </p>
              </div>
            </div>

            {/* ROW 3: Publish Date & Slug */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Publish Date Field */}
              <div>
                <label
                  htmlFor="post-publish-date"
                  className="block text-xs font-bold text-[var(--text-secondary)] mb-1.5 uppercase tracking-wide"
                >
                  Publish Date
                </label>
                <div
                  onClick={() => {
                    try {
                      dateInputRef.current?.showPicker?.();
                    } catch {
                      dateInputRef.current?.focus();
                    }
                  }}
                  className="flex items-center gap-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-input)] px-3 py-1.5 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/15 shadow-2xs transition cursor-pointer hover:border-slate-300 dark:hover:border-slate-600 group"
                >
                  <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 shrink-0 group-hover:scale-105 transition-transform">
                    <Calendar size={15} />
                  </div>
                  <input
                    ref={dateInputRef}
                    id="post-publish-date"
                    type="date"
                    value={publishedDate}
                    onChange={(e) => setPublishedDate(e.target.value)}
                    className="w-full bg-transparent border-0 outline-none text-xs sm:text-sm font-semibold text-[var(--text-main)] cursor-pointer py-1"
                  />
                </div>
              </div>

              {/* Slug Field */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="post-slug"
                    className="block text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wide"
                  >
                    Slug<span className="text-rose-500 ml-0.5">*</span>
                  </label>
                  <label className="flex items-center gap-1.5 text-[11px] font-semibold text-[var(--text-dim)] cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={autoSlug}
                      onChange={(e) => setAutoSlug(e.target.checked)}
                      className="rounded border-slate-300 dark:border-slate-700 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>Auto</span>
                  </label>
                </div>
                <div className="flex items-center rounded-xl border border-[var(--border-color)] bg-[var(--bg-input)] overflow-hidden focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-500/15 transition shadow-2xs">
                  <span className="bg-[var(--bg-canvas)] border-r border-[var(--border-color)] px-3 py-2 text-[var(--text-dim)] text-xs font-mono select-none shrink-0 font-medium">
                    /resources/blog/
                  </span>
                  <input
                    id="post-slug"
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="post-slug-url"
                    className="w-full px-3 py-2 text-xs font-mono text-indigo-600 dark:text-indigo-400 font-bold bg-transparent outline-none border-0 placeholder:text-[var(--text-dim)]"
                  />
                  <button
                    type="button"
                    onClick={handleRegenerateSlug}
                    className="p-2 text-[var(--text-dim)] hover:text-indigo-600 dark:hover:text-indigo-400 transition cursor-pointer"
                    title="Regenerate slug from title"
                    aria-label="Regenerate slug"
                  >
                    <RotateCw size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* ROW 4: content (RICH TEXT / MARKDOWN EDITOR) */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wide">
                Content<span className="text-rose-500 ml-0.5">*</span>
              </label>

              {/* Inline Editor Container with Strapi-style Toolbar */}
              <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] overflow-hidden shadow-xs focus-within:border-indigo-500 transition">
                {/* Editor Toolbar */}
                <div className="p-2 bg-[var(--bg-canvas)] border-b border-[var(--border-color)] flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center flex-wrap gap-1">
                    {/* Headings Dropdown */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setShowHeadingsMenu(!showHeadingsMenu)}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-[var(--text-secondary)] hover:bg-[var(--bg-card)] hover:text-[var(--text-main)] transition cursor-pointer border border-transparent hover:border-[var(--border-color)]"
                      >
                        <Heading size={14} />
                        <span>Headings</span>
                        <ChevronDown size={12} />
                      </button>

                      {showHeadingsMenu && (
                        <div className="absolute left-0 mt-1 w-36 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] shadow-xl z-50 py-1 animate-in fade-in zoom-in-95 duration-150">
                          <button
                            type="button"
                            onClick={() => handleInsertHeading(1)}
                            className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--text-main)]"
                          >
                            <Heading1 size={14} />
                            <span>Heading 1</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleInsertHeading(2)}
                            className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--text-main)]"
                          >
                            <Heading2 size={14} />
                            <span>Heading 2</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleInsertHeading(3)}
                            className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--text-main)]"
                          >
                            <Heading3 size={14} />
                            <span>Heading 3</span>
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="h-4 w-px bg-[var(--border-color)] mx-1" />

                    {/* Standard Text Formatting Icons */}
                    <button
                      type="button"
                      onClick={() => handleInsertSyntax('**', '**')}
                      className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card)] transition cursor-pointer"
                      title="Bold (Ctrl+B)"
                    >
                      <Bold size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInsertSyntax('*', '*')}
                      className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card)] transition cursor-pointer"
                      title="Italic (Ctrl+I)"
                    >
                      <Italic size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInsertSyntax('<u>', '</u>')}
                      className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card)] transition cursor-pointer"
                      title="Underline"
                    >
                      <UnderlineIcon size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInsertSyntax('~~', '~~')}
                      className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card)] transition cursor-pointer"
                      title="Strikethrough"
                    >
                      <Strikethrough size={15} />
                    </button>

                    <div className="h-4 w-px bg-[var(--border-color)] mx-1" />

                    {/* Lists */}
                    <button
                      type="button"
                      onClick={() => handleInsertSyntax('- ', '', true)}
                      className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card)] transition cursor-pointer"
                      title="Bullet List"
                    >
                      <List size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInsertSyntax('1. ', '', true)}
                      className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card)] transition cursor-pointer"
                      title="Numbered List"
                    >
                      <ListOrdered size={15} />
                    </button>

                    <div className="h-4 w-px bg-[var(--border-color)] mx-1" />

                    {/* Code, Link, Image, Quote */}
                    <button
                      type="button"
                      onClick={() => handleInsertSyntax('```ts\n', '\n```', true)}
                      className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card)] transition cursor-pointer"
                      title="Code Block"
                    >
                      <Code size={15} />
                    </button>

                    {/* Hidden input for content image uploads */}
                    <input
                      ref={contentImageInputRef}
                      type="file"
                      accept="image/png, image/jpeg, image/webp, image/gif, image/svg+xml"
                      onChange={handleContentImageUpload}
                      className="hidden"
                    />

                    {/* Image Dropdown / Button */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setShowImageMenu(!showImageMenu)}
                        disabled={isUploadingContentImage}
                        className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card)] transition cursor-pointer flex items-center gap-1 disabled:opacity-50"
                        title="Insert Image (Upload or URL)"
                      >
                        {isUploadingContentImage ? (
                          <Loader2 size={15} className="animate-spin text-indigo-500" />
                        ) : (
                          <ImageIcon size={15} />
                        )}
                      </button>

                      {showImageMenu && (
                        <div className="absolute left-0 mt-1 w-48 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] shadow-xl z-50 py-1 animate-in fade-in zoom-in-95 duration-150">
                          <button
                            type="button"
                            onClick={() => {
                              contentImageInputRef.current?.click();
                              setShowImageMenu(false);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-xs text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--text-main)] text-left cursor-pointer"
                          >
                            <UploadCloud size={14} className="text-indigo-500" />
                            <span>Upload Image</span>
                          </button>
                          <button
                            type="button"
                            onClick={handlePromptImageUrl}
                            className="w-full flex items-center gap-2 px-3 py-2 text-xs text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--text-main)] text-left cursor-pointer"
                          >
                            <Link2 size={14} className="text-slate-400" />
                            <span>Insert Image URL</span>
                          </button>
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={handleInsertLink}
                      className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card)] transition cursor-pointer"
                      title="Insert Link (Ctrl+K)"
                    >
                      <Link2 size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInsertSyntax('> [!NOTE]\n> ', '', true)}
                      className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card)] transition cursor-pointer"
                      title="Alert / Blockquote"
                    >
                      <Quote size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={handleInsertDivider}
                      className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card)] transition cursor-pointer"
                      title="Horizontal Divider (---)"
                    >
                      <Minus size={15} />
                    </button>
                  </div>

                  {/* Right Side: Preview Mode Toggle */}
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() =>
                        setEditorTab(editorTab === 'write' ? 'preview' : 'write')
                      }
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border ${
                        editorTab === 'preview'
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                          : 'bg-[var(--bg-card)] text-[var(--text-secondary)] border-[var(--border-color)] hover:border-slate-300'
                      }`}
                    >
                      <Eye size={13} />
                      <span>{editorTab === 'preview' ? 'Exit Preview' : 'Preview mode'}</span>
                    </button>
                  </div>
                </div>

                {/* Inline Content Area */}
                <div className="relative">
                  {editorTab === 'write' ? (
                    <textarea
                      ref={textareaRef}
                      rows={18}
                      required
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      onKeyDown={handleTextareaKeyDown}
                      placeholder="Write your article markdown here..."
                      className="w-full p-4 bg-[var(--bg-card)] text-[var(--text-main)] font-mono text-xs sm:text-sm leading-relaxed border-0 outline-none resize-y min-h-[380px]"
                    />
                  ) : (
                    <div className="p-5 min-h-[380px] bg-[var(--bg-card)] overflow-y-auto">
                      <MarkdownPreview content={content} />
                    </div>
                  )}
                </div>

                {/* Inline Bottom Bar: Word Count & Expand Button */}
                <div className="px-4 py-2.5 bg-[var(--bg-canvas)] border-t border-[var(--border-color)] flex items-center justify-between text-xs text-[var(--text-muted)]">
                  <div className="flex items-center gap-4">
                    <span className="font-mono">{words} words</span>
                    <span>•</span>
                    <span className="font-mono">{readingTime}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsFullscreen(true)}
                    className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition cursor-pointer"
                  >
                    <span>Expand Split View</span>
                    <Maximize2 size={14} />
                  </button>
                </div>
              </div>

              {/* ─── FULLSCREEN SPLIT-VIEW LIVE EDITOR (STRAPI-INSPIRED EXPANDED MODAL) ─── */}
              {isFullscreen && (
                <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex flex-col p-2 sm:p-4 md:p-6 animate-in fade-in zoom-in-95 duration-150">
                  <div className="w-full h-full max-w-[1750px] mx-auto bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)] shadow-2xl flex flex-col overflow-hidden">
                    {/* Modal Top Bar */}
                    <div className="p-3 bg-[var(--bg-canvas)] border-b border-[var(--border-color)] flex items-center justify-between flex-wrap gap-2 shrink-0">
                      {/* Left: Toolbar */}
                      <div className="flex items-center flex-wrap gap-1">
                        {/* Headings Dropdown */}
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() => setShowHeadingsMenu(!showHeadingsMenu)}
                            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-[var(--text-secondary)] hover:bg-[var(--bg-card)] hover:text-[var(--text-main)] transition cursor-pointer border border-transparent hover:border-[var(--border-color)]"
                          >
                            <Heading size={14} />
                            <span>Headings</span>
                            <ChevronDown size={12} />
                          </button>

                          {showHeadingsMenu && (
                            <div className="absolute left-0 mt-1 w-36 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] shadow-xl z-50 py-1 animate-in fade-in zoom-in-95 duration-150">
                              <button
                                type="button"
                                onClick={() => {
                                  handleInsertSyntax('# ');
                                  setShowHeadingsMenu(false);
                                }}
                                className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--text-main)]"
                              >
                                <Heading1 size={14} />
                                <span>Heading 1</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  handleInsertSyntax('## ');
                                  setShowHeadingsMenu(false);
                                }}
                                className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--text-main)]"
                              >
                                <Heading2 size={14} />
                                <span>Heading 2</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  handleInsertSyntax('### ');
                                  setShowHeadingsMenu(false);
                                }}
                                className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--text-main)]"
                              >
                                <Heading3 size={14} />
                                <span>Heading 3</span>
                              </button>
                            </div>
                          )}
                        </div>

                        <div className="h-4 w-px bg-[var(--border-color)] mx-1" />

                        {/* Text formatting */}
                        <button
                          type="button"
                          onClick={() => handleInsertSyntax('**', '**')}
                          className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card)] transition cursor-pointer"
                          title="Bold"
                        >
                          <Bold size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleInsertSyntax('*', '*')}
                          className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card)] transition cursor-pointer"
                          title="Italic"
                        >
                          <Italic size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleInsertSyntax('<u>', '</u>')}
                          className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card)] transition cursor-pointer"
                          title="Underline"
                        >
                          <UnderlineIcon size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleInsertSyntax('~~', '~~')}
                          className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card)] transition cursor-pointer"
                          title="Strikethrough"
                        >
                          <Strikethrough size={15} />
                        </button>

                        <div className="h-4 w-px bg-[var(--border-color)] mx-1" />

                        {/* Lists */}
                        <button
                          type="button"
                          onClick={() => handleInsertSyntax('- ', '', true)}
                          className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card)] transition cursor-pointer"
                          title="Bullet List"
                        >
                          <List size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleInsertSyntax('1. ', '', true)}
                          className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card)] transition cursor-pointer"
                          title="Numbered List"
                        >
                          <ListOrdered size={15} />
                        </button>

                        <div className="h-4 w-px bg-[var(--border-color)] mx-1" />

                        {/* Code, Link, Image, Quote */}
                        <button
                          type="button"
                          onClick={() => handleInsertSyntax('```ts\n', '\n```', true)}
                          className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card)] transition cursor-pointer"
                          title="Code Block"
                        >
                          <Code size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() => contentImageInputRef.current?.click()}
                          disabled={isUploadingContentImage}
                          className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card)] transition cursor-pointer flex items-center gap-1 disabled:opacity-50"
                          title="Upload & Insert Image"
                        >
                          {isUploadingContentImage ? (
                            <Loader2 size={15} className="animate-spin text-indigo-500" />
                          ) : (
                            <ImageIcon size={15} />
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={handleInsertLink}
                          className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card)] transition cursor-pointer"
                          title="Insert Link"
                        >
                          <Link2 size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleInsertSyntax('> [!NOTE]\n> ', '', true)}
                          className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card)] transition cursor-pointer"
                          title="Alert / Blockquote"
                        >
                          <Quote size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={handleInsertDivider}
                          className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card)] transition cursor-pointer"
                          title="Horizontal Divider (---)"
                        >
                          <Minus size={15} />
                        </button>
                      </div>

                      {/* Right: Stats & Collapse button */}
                      <div className="flex items-center gap-3">
                        <div className="hidden sm:flex items-center text-xs font-mono text-[var(--text-muted)]">
                          <span>{words} words</span>
                          <span className="mx-2">•</span>
                          <span>{readingTime}</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => setIsFullscreen(false)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] text-xs font-bold text-[var(--text-secondary)] hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-300 transition cursor-pointer shadow-xs"
                          title="Collapse (Esc)"
                        >
                          <span>Collapse</span>
                          <Minimize2 size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Split View Content Area: 50% Markdown Editor + 50% Live Formatted Preview */}
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--border-color)] overflow-hidden min-h-0 bg-[var(--bg-card)]">
                      {/* Left: Markdown Editor */}
                      <div className="flex flex-col h-full overflow-hidden bg-[var(--bg-card)]">
                        <div className="px-4 py-2 bg-[var(--bg-canvas)] border-b border-[var(--border-subtle)] flex items-center justify-between text-[11px] font-bold text-[var(--text-dim)] uppercase tracking-wider select-none">
                          <span>Markdown Editor</span>
                          <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[var(--bg-card)] border border-[var(--border-color)]">
                            RAW
                          </span>
                        </div>
                        <textarea
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                          placeholder="Write markdown content here..."
                          className="flex-1 w-full p-6 bg-transparent text-[var(--text-main)] font-mono text-xs sm:text-sm leading-relaxed border-0 outline-none resize-none overflow-y-auto"
                        />
                      </div>

                      {/* Right: Live Formatted Preview */}
                      <div className="flex flex-col h-full overflow-hidden bg-[var(--bg-card)]">
                        <div className="px-4 py-2 bg-[var(--bg-canvas)] border-b border-[var(--border-subtle)] flex items-center justify-between text-[11px] font-bold text-[var(--text-dim)] uppercase tracking-wider select-none">
                          <span>Live Formatted Preview</span>
                          <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-600 border border-emerald-200/80 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/40">
                            LIVE PREVIEW
                          </span>
                        </div>
                        <div className="flex-1 w-full p-6 overflow-y-auto bg-[var(--bg-card)]">
                          <MarkdownPreview content={content} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ROW 5: COLLAPSIBLE SEO & SEARCH PREVIEW */}
            <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] overflow-hidden">
              <button
                type="button"
                onClick={() => setShowSeoSection(!showSeoSection)}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-[var(--bg-card-hover)] transition cursor-pointer"
              >
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                  <Globe size={18} />
                  <span className="text-sm font-extrabold text-[var(--text-main)]">
                    SEO & Social Metadata Configuration
                  </span>
                </div>
                <ChevronDown
                  size={16}
                  className={`text-[var(--text-dim)] transition-transform duration-200 ${
                    showSeoSection ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {showSeoSection && (
                <div className="p-5 pt-1 space-y-4 border-t border-[var(--border-subtle)] animate-in fade-in duration-150">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[var(--text-secondary)] mb-1">
                        SEO Meta Title
                      </label>
                      <input
                        type="text"
                        value={metaTitle}
                        onChange={(e) => setMetaTitle(e.target.value)}
                        placeholder="SEO Title for search rankings"
                        className="admin-input text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[var(--text-secondary)] mb-1">
                        Canonical URL
                      </label>
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
                    <label className="block text-xs font-bold text-[var(--text-secondary)] mb-1">
                      SEO Meta Description
                    </label>
                    <textarea
                      rows={2}
                      value={metaDescription}
                      onChange={(e) => setMetaDescription(e.target.value)}
                      placeholder="Meta description for search engine result pages (SERPs)"
                      className="admin-input text-xs resize-none"
                    />
                  </div>

                  {/* Social Share Image */}
                  <div className="pt-2">
                    <ImageUploadField
                      label="Social Share Image (og:image)"
                      value={ogImage}
                      onChange={setOgImage}
                      helpText="Image for Twitter & LinkedIn social cards. If empty, Featured Image is used automatically."
                      endpoint="/api/upload"
                    />
                  </div>

                  {/* Google SERP Preview */}
                  <div className="p-4 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-color)]">
                    <div className="text-[10px] font-extrabold uppercase tracking-wider text-[var(--text-dim)] mb-2">
                      Google SERP Live Preview
                    </div>
                    <div className="text-indigo-600 dark:text-indigo-400 text-sm font-bold hover:underline truncate">
                      {metaTitle || title || 'Article Title Preview'}
                    </div>
                    <div className="text-emerald-700 dark:text-emerald-400 text-[11px] font-mono mt-0.5 truncate">
                      https://codewithamrendra.in/resources/blog/{slug || 'post-slug'}
                    </div>
                    <div className="text-[var(--text-muted)] text-xs mt-1 line-clamp-2">
                      {metaDescription || excerpt || 'Search description preview will appear here...'}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ROW 6: TABLE OF CONTENTS (Strapi-styled) */}
            <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-5 shadow-xs">
              <TableOfContentsField
                content={content}
                onInsertToc={handleInsertTocToContent}
              />
            </div>

            {/* ROW 7: FAQ SCHEMA & FAQ_BLOG (Strapi-styled) */}
            <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-5 shadow-xs">
              <FaqSchemaField
                content={content}
                initialFaqs={faqs}
                onFaqsChange={setFaqs}
                onInsertFaqMarkdown={handleInsertFaqMarkdown}
              />
            </div>
          </div>
        </div>

        {/* ─── SECONDARY / RIGHT ACTION PANEL (3 of 12 cols on desktop) ─── */}
        <div className="lg:col-span-3 space-y-5 sticky top-20">
          {/* ─── 1. STRAPI-INSPIRED "ENTRY" ACTION PANEL ─── */}
          <div className="admin-card p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
              <span className="text-xs font-black uppercase tracking-wider text-[var(--text-muted)] font-mono">
                ENTRY
              </span>
              <span className="flex items-center gap-1.5 text-[11px] font-bold text-[var(--text-dim)]">
                <span
                  className={`w-2 h-2 rounded-full ${
                    status === 'PUBLISHED' ? 'bg-emerald-500' : 'bg-amber-500'
                  }`}
                />
                <span>{status === 'PUBLISHED' ? 'Live' : 'Draft'}</span>
              </span>
            </div>

            {/* Dynamic Actions based on Status */}
            <div className="space-y-2.5">
              {status === 'PUBLISHED' ? (
                <>
                  {/* Save Changes Button */}
                  <button
                    type="button"
                    disabled={saving}
                    onClick={() => handleSave(undefined, 'PUBLISHED')}
                    className="w-full admin-btn-primary text-xs py-2.5 font-bold shadow-md"
                  >
                    <Save size={14} />
                    <span>{saving ? 'Updating...' : 'Save Changes'}</span>
                  </button>

                  {/* Unpublish Button */}
                  <button
                    type="button"
                    disabled={saving}
                    onClick={() => handleSave(undefined, 'DRAFT')}
                    className="w-full admin-btn-secondary text-xs py-2.5 text-amber-600 dark:text-amber-400 hover:text-amber-700"
                  >
                    <Archive size={14} />
                    <span>Unpublish (Move to Draft)</span>
                  </button>
                </>
              ) : (
                <>
                  {/* Publish Button */}
                  <button
                    type="button"
                    disabled={saving}
                    onClick={() => handleSave(undefined, 'PUBLISHED')}
                    className="w-full admin-btn-primary text-xs py-2.5 font-bold shadow-md bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800"
                  >
                    <Send size={14} />
                    <span>{saving ? 'Publishing...' : 'Publish Entry'}</span>
                  </button>

                  {/* Save Draft Button */}
                  <button
                    type="button"
                    disabled={saving}
                    onClick={() => handleSave(undefined, 'DRAFT')}
                    className="w-full admin-btn-secondary text-xs py-2.5 font-semibold"
                  >
                    <Save size={14} />
                    <span>{saving ? 'Saving...' : 'Save Draft'}</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* ─── 2. INFORMATION & METADATA CARD ─── */}
          <div className="admin-card p-5 space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-[var(--text-muted)] font-mono pb-2 border-b border-[var(--border-subtle)]">
              Information
            </h3>

            {/* Author Field */}
            <div>
              <label
                htmlFor="author-name"
                className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1 uppercase tracking-wide"
              >
                Author Name
              </label>
              <input
                id="author-name"
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="admin-input text-xs"
              />
            </div>

            {/* Tags Field */}
            <div>
              <label
                htmlFor="post-tags"
                className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1 uppercase tracking-wide"
              >
                Tags (Comma-separated)
              </label>
              <input
                id="post-tags"
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="React, Next.js, Architecture"
                className="admin-input text-xs"
              />
              <div className="flex flex-wrap gap-1 mt-2">
                {tagsInput
                  .split(',')
                  .map((t) => t.trim())
                  .filter(Boolean)
                  .map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-[var(--bg-canvas)] border border-[var(--border-color)] text-[10px] font-mono font-bold text-[var(--text-secondary)]"
                    >
                      #{tag}
                    </span>
                  ))}
              </div>
            </div>

            {/* Auto-format on save checkbox */}
            <div className="pt-2 border-t border-[var(--border-subtle)]">
              <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-[var(--text-secondary)]">
                <input
                  type="checkbox"
                  checked={autoFormatOnSave}
                  onChange={(e) => setAutoFormatOnSave(e.target.checked)}
                  className="rounded border-slate-300 dark:border-slate-700 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-[11px] font-medium leading-tight">
                  Auto-format headings & internal links on save
                </span>
              </label>
            </div>

            {/* Entry Audit Timestamps (Edit Mode) */}
            {mode === 'edit' && initialData?.updatedAt && (
              <div className="pt-2 border-t border-[var(--border-subtle)] text-[10px] text-[var(--text-dim)] font-mono space-y-1">
                <div>Updated: {formatDate(initialData.updatedAt)}</div>
                {initialData.createdAt && (
                  <div>Created: {formatDate(initialData.createdAt)}</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
