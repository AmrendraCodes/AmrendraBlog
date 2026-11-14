'use client';

import { useState, useEffect } from 'react';
import {
  Globe,
  FileText,
  Copy,
  Check,
  AlertTriangle,
  XCircle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Loader2,
  RefreshCw,
  Search,
  Info,
  Sliders,
  Type,
  FileCode,
  RotateCcw,
} from 'lucide-react';
import { runAllChecks } from '@/lib/seo-checks/index.js';

export default function MainSeoReviewer() {
  const [activeTab, setActiveTab] = useState('paste'); // 'paste' | 'url'
  const [urlInput, setUrlInput] = useState('');
  const [keyword, setKeyword] = useState('');
  const [h1Input, setH1Input] = useState('');
  const [titleInput, setTitleInput] = useState('');
  const [metaDescInput, setMetaDescInput] = useState('');
  const [contentInput, setContentInput] = useState('');

  const [isLoadingUrl, setIsLoadingUrl] = useState(false);
  const [urlError, setUrlError] = useState('');
  const [copied, setCopied] = useState(false);
  const [expandedCheckId, setExpandedCheckId] = useState(null);

  // Live evaluation state
  const [report, setReport] = useState(() =>
    runAllChecks({
      title: '',
      metaDescription: '',
      h1Input: '',
      content: '',
      keyword: '',
    })
  );

  // Load a realistic, clean sample draft for testing
  const loadSample = () => {
    setTitleInput('Beginner Guide to Next.js SEO: Practical Best Practices (2026)');
    setMetaDescInput(
      'Master Next.js SEO fundamentals: configure meta titles, logical heading hierarchy, and clean page structure for higher Google visibility and faster indexing.'
    );
    setH1Input('Beginner Guide to Next.js SEO');
    setKeyword('next.js seo');
    setContentInput(
      `# Beginner Guide to Next.js SEO\n\nOptimizing your next.js seo is essential if you want search engines to crawl, index, and rank your web application efficiently. While modern React frameworks offer unmatched user experience and client-side transitions, search engines require clean HTML documents, fast response times, and structured metadata to understand page intent.\n\nIn this practical guide, we cover the core on-page optimization steps every developer and content team should implement before publishing.\n\n## 1. Why Search Optimization Matters for Web Apps\n\nTraditional single-page applications often rendered empty body shells on the initial request, forcing crawlers to execute JavaScript before reading content. With Next.js server components and static generation, your page markup arrives pre-rendered, giving search bots immediate access to headings, paragraphs, and internal links.\n\nTo maximize this advantage, ensure your primary keyword appears naturally in the opening paragraph and that your document preserves a single, unambiguous topic focus.\n\n## 2. Structuring Headings and Document Hierarchy\n\nSearch crawlers read headings like a table of contents. Maintain a strict logical hierarchy across your article:\n\n### Use Exactly One H1 Headline\nYour page should feature one primary H1 tag that encapsulates the main subject. Avoid using multiple H1 tags across navigation headers or promotional banners.\n\n### Group Supporting Subtopics with H2 and H3\nBreak up long explanations into focused sub-sections. Never jump directly from an H1 to an H3 tag without establishing the broader H2 context first.\n\n## 3. Writing Readable Paragraphs for Mobile Readers\n\nOver 60% of search traffic now originates on mobile screens. Dense walls of text without paragraph breaks look overwhelming on narrow viewports, elevating bounce rates and harming user engagement signals.\n\nKeep individual paragraphs under 4 to 5 sentences. Use bulleted lists, code snippets, or bold lead-ins to provide visual breathing room.\n\n## Summary and Next Steps\n\nSolid on-page SEO is not about tricking search engines—it is about presenting high-quality information clearly. Review your title tags, verify your introductory keyword placement, and confirm your readability score before shipping your next release.`
    );
    setUrlError('');
  };

  const handleClear = () => {
    setTitleInput('');
    setMetaDescInput('');
    setH1Input('');
    setKeyword('');
    setContentInput('');
    setUrlInput('');
    setUrlError('');
  };

  // Re-evaluate whenever inputs change with debouncing (200ms)
  useEffect(() => {
    const handler = setTimeout(() => {
      const nextReport = runAllChecks({
        title: titleInput,
        metaDescription: metaDescInput,
        h1Input,
        content: contentInput,
        keyword,
      });
      setReport(nextReport);
    }, 200);

    return () => clearTimeout(handler);
  }, [titleInput, metaDescInput, h1Input, contentInput, keyword]);

  // Handle URL fetch
  const handleFetchUrl = async (e) => {
    e?.preventDefault();
    if (!urlInput.trim()) return;

    setIsLoadingUrl(true);
    setUrlError('');

    try {
      const res = await fetch('/api/tools/seo-fetch-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: urlInput.trim() }),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Failed to fetch webpage.');
      }

      setTitleInput(json.data.title || '');
      setMetaDescInput(json.data.metaDescription || '');
      setContentInput(json.data.content || '');

      const primaryH1 = (json.data.headings || []).find((h) => h.level === 1);
      if (primaryH1) {
        setH1Input(primaryH1.text);
      }

      setActiveTab('paste');
    } catch (err) {
      setUrlError(err.message || 'Error loading URL.');
    } finally {
      setIsLoadingUrl(false);
    }
  };

  // Handle Copy
  const handleCopy = () => {
    if (!contentInput) return;
    navigator.clipboard.writeText(contentInput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Status icon helper
  const getStatusIcon = (status) => {
    switch (status) {
      case 'pass':
        return <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />;
      case 'warn':
        return <AlertTriangle size={16} className="seo-semantic-warning shrink-0" />;
      case 'fail':
        return <XCircle size={16} className="text-rose-500 shrink-0" />;
      default:
        return <Info size={16} className="text-slate-400 shrink-0" />;
    }
  };

  const getScoreTheme = (score) => {
    if (score >= 80) {
      return {
        badgeBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
        ringColor: 'stroke-emerald-500',
        label: 'Optimal On-Page SEO',
      };
    }
    if (score >= 60) {
      return {
        badgeBg: 'seo-warning-badge bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
        ringColor: 'stroke-amber-500',
        label: 'Good, Needs Minor Polish',
      };
    }
    return {
      badgeBg: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30',
      ringColor: 'stroke-rose-500',
      label: 'Needs Improvement',
    };
  };

  const theme = getScoreTheme(report.overallScore);
  const wordCount = report.metadata?.wordCount || 0;
  const readingTimeMin = Math.max(1, Math.ceil(wordCount / 200));
  const hasAnalysisInput = Boolean(
    titleInput.trim() ||
    metaDescInput.trim() ||
    h1Input.trim() ||
    keyword.trim() ||
    contentInput.trim()
  );

  return (
    <div id="seo-audit-workspace" className="mx-auto max-w-7xl scroll-mt-28">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-amber-600 dark:text-amber-400">
            Live SEO workspace
          </p>
          <h2 className="text-xl font-extrabold tracking-tight text-[var(--text-heading)] sm:text-2xl">
            Review and refine your content
          </h2>
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-[var(--text-muted)]">
            Add your draft on the left. Your score and next steps update as you edit.
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
          Updates as you type
        </span>
      </div>

      {/* ─── WORKBENCH TOOLBAR ─── */}
      <div className="card-tilt mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-3.5 shadow-sm">
        {/* Mode Switcher with High-Contrast Active Highlighter */}
        <div className="flex items-center gap-1.5 rounded-xl bg-slate-100 dark:bg-[#070e1a] p-1 border border-slate-200 dark:border-slate-800 shadow-inner">
          <button
            type="button"
            onClick={() => setActiveTab('paste')}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer border-none ${
              activeTab === 'paste'
                ? 'seo-primary-button font-bold shadow-md shadow-amber-500/20 ring-1 ring-amber-400'
                : 'bg-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/50'
            }`}
          >
            <FileText size={15} className={activeTab === 'paste' ? 'text-slate-950' : 'text-slate-400'} />
            <span>Editor &amp; Paste</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('url')}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer border-none ${
              activeTab === 'url'
                ? 'seo-primary-button font-bold shadow-md shadow-amber-500/20 ring-1 ring-amber-400'
                : 'bg-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/50'
            }`}
          >
            <Globe size={15} className={activeTab === 'url' ? 'text-slate-950' : 'text-slate-400'} />
            <span>Analyze Live URL</span>
          </button>
        </div>

        {/* Quick Actions: Sample draft & Reset */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={loadSample}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:border-amber-500/50 hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer"
            title="Load sample article with optimal title and structure"
          >
            <RefreshCw size={13} />
            <span>Load Sample Draft</span>
          </button>
          {(contentInput || titleInput || keyword) && (
            <button
              type="button"
              onClick={handleClear}
              className="inline-flex items-center gap-1.5 rounded-lg border border-transparent px-2.5 py-1.5 text-xs text-slate-500 hover:text-rose-500 transition-colors cursor-pointer bg-transparent"
              title="Clear all fields"
            >
              <RotateCcw size={13} />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* ─── URL FETCH DRAWER (WHEN URL MODE ACTIVE) ─── */}
      {activeTab === 'url' && (
        <form
          onSubmit={handleFetchUrl}
          className="card-tilt mb-6 rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5 shadow-sm"
        >
          <label htmlFor="url-input" className="block text-xs font-semibold text-[var(--text-heading)] mb-2">
            Target Article Webpage URL (HTTP / HTTPS)
          </label>
          <div className="flex flex-col sm:flex-row gap-2.5">
            <input
              id="url-input"
              type="url"
              placeholder="https://example.com/blog/my-post"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              required
              className="flex-1 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#070e1a] px-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
            <button
              type="submit"
              disabled={isLoadingUrl}
              className="seo-primary-button inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-xs sm:text-sm font-bold disabled:opacity-50 transition-colors cursor-pointer border-none shadow-xs"
            >
              {isLoadingUrl ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  <span>Fetching Article...</span>
                </>
              ) : (
                <>
                  <Search size={15} />
                  <span>Fetch &amp; Review</span>
                </>
              )}
            </button>
          </div>
          <p className="mt-2 text-[11px] text-slate-500 dark:text-slate-400">
            Safe stateless fetcher: extracts clean article body, title, and metadata without storing or logging your data.
          </p>
          {urlError && (
            <div className="mt-3 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-600 dark:text-rose-300">
              {urlError}
            </div>
          )}
        </form>
      )}

      {/* ─── TWO-COLUMN WORKSPACE: LEFT EDITOR | RIGHT INSPECTOR ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* ─── LEFT COLUMN: WRITING DESK (7 COLS ON DESKTOP) ─── */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-5">
          {/* Metadata Controls Card */}
          <div className="card-tilt rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5 sm:p-6 shadow-sm space-y-4">
            {/* Focus Keyword & H1 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="keyword-input" className="block text-xs font-semibold text-[var(--text-heading)] mb-1.5">
                  Focus Keyword <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <input
                  id="keyword-input"
                  type="text"
                  placeholder="e.g. next.js seo"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#070e1a] px-3.5 py-2 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label htmlFor="h1-input" className="block text-xs font-semibold text-[var(--text-heading)] mb-1.5">
                  H1 / Headline <span className="text-slate-400 font-normal">(Optional for plain text)</span>
                </label>
                <input
                  id="h1-input"
                  type="text"
                  placeholder="e.g. Beginner Guide to Next.js SEO"
                  value={h1Input}
                  onChange={(e) => setH1Input(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#070e1a] px-3.5 py-2 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
            </div>

            {/* Title Tag Input */}
            <div>
              <div className="flex items-center justify-between mb-1.5 text-xs">
                <label htmlFor="title-input" className="font-semibold text-[var(--text-heading)]">
                  Title Tag (SERP Snippet Title)
                </label>
                <span
                  className={`font-mono font-medium ${
                    titleInput.length >= 50 && titleInput.length <= 60
                      ? 'text-emerald-600 dark:text-emerald-400 font-bold'
                      : titleInput.length > 60
                      ? 'seo-semantic-warning font-bold'
                      : 'text-slate-500'
                  }`}
                >
                  {titleInput.length} / 60 chars {titleInput.length > 60 && '(Truncation warning)'}
                </span>
              </div>
              <input
                id="title-input"
                type="text"
                placeholder="e.g. Beginner Guide to Next.js SEO: Best Practices for 2026 (50–60 chars)"
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#070e1a] px-3.5 py-2 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            {/* Meta Description Input */}
            <div>
              <div className="flex items-center justify-between mb-1.5 text-xs">
                <label htmlFor="meta-desc-input" className="font-semibold text-[var(--text-heading)]">
                  Meta Description
                </label>
                <span
                  className={`font-mono font-medium ${
                    metaDescInput.length >= 120 && metaDescInput.length <= 160
                      ? 'text-emerald-600 dark:text-emerald-400 font-bold'
                      : metaDescInput.length > 160
                      ? 'seo-semantic-warning'
                      : 'text-slate-500'
                  }`}
                >
                  {metaDescInput.length} / 160 chars
                </span>
              </div>
              <input
                id="meta-desc-input"
                type="text"
                placeholder="e.g. Master Next.js SEO fundamentals: configure meta titles, logical heading hierarchy, and clean structure... (120–160 chars)"
                value={metaDescInput}
                onChange={(e) => setMetaDescInput(e.target.value)}
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#070e1a] px-3.5 py-2 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Main Article Editor */}
          <div className="card-tilt rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] shadow-sm overflow-hidden flex flex-col">
            {/* Editor Toolbar Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800/80 px-5 py-3 bg-slate-50/60 dark:bg-[#070e1a]/60">
              <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400 font-medium">
                <span className="seo-cyan-accent">Article Body / Markdown</span>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <span className="font-mono text-slate-700 dark:text-slate-300 font-semibold">
                  {wordCount} words
                </span>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <span>~{readingTimeMin} min read</span>
              </div>

              <button
                type="button"
                onClick={handleCopy}
                disabled={!contentInput}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400 disabled:opacity-40 transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check size={13} className="text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    <span>Copy Improved Text</span>
                  </>
                )}
              </button>
            </div>

            {/* Textarea */}
            <div className="p-4 sm:p-5">
              <textarea
                rows={16}
                value={contentInput}
                onChange={(e) => setContentInput(e.target.value)}
                placeholder="Paste your raw text, article draft, or markdown here. Watch the score and priority fixes update in real time on the right..."
                className="w-full min-h-[420px] rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#070e1a] p-4 text-xs sm:text-sm text-slate-900 dark:text-slate-200 font-mono leading-relaxed placeholder-slate-400 dark:placeholder-slate-600 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 resize-y"
              />
            </div>

            {/* Editor Footer */}
            <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-800/80 px-5 py-2.5 text-[11px] text-slate-500">
              <span>Supports Markdown headings (#, ##, ###) and HTML tags</span>
              <span>200ms debounced live evaluation</span>
            </div>
          </div>
        </div>

        {/* ─── RIGHT COLUMN: AUDIT INSPECTOR (5 COLS ON DESKTOP, STICKY) ─── */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-5 lg:sticky lg:top-24">
          {/* Overall Score Card */}
          <div className="card-tilt rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800/80 pb-3 mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                SEO Audit Overview
              </span>
              <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${
                hasAnalysisInput
                  ? theme.badgeBg
                  : 'border-[var(--card-border)] bg-[var(--background)] text-[var(--text-muted)]'
              }`}>
                {hasAnalysisInput ? theme.label : 'Ready when you are'}
              </span>
            </div>

            {/* Score Metric Ring */}
            <div className="flex items-center gap-5 py-2">
              <div className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-slate-100 dark:bg-[#070e1a] border border-slate-200 dark:border-slate-800 shadow-inner">
                <div className="text-center">
                  <span className="text-3xl font-extrabold tracking-tight text-[var(--text-heading)]">
                    {hasAnalysisInput ? report.overallScore : '—'}
                  </span>
                  <span className="block text-[10px] font-mono font-bold text-slate-400">
                    {hasAnalysisInput ? '/ 100' : 'OUT OF 100'}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 flex-1">
                {!hasAnalysisInput && (
                  <p className="mb-3 text-xs leading-relaxed text-[var(--text-muted)]">
                    Add a title, focus keyword, or draft to start your review.
                  </p>
                )}
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Passing Checks</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                    {hasAnalysisInput ? report.summary.passCount : '—'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Warnings</span>
                  <span className="seo-semantic-warning font-bold font-mono">
                    {hasAnalysisInput ? report.summary.warnCount : '—'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Failures</span>
                  <span className="font-bold text-rose-600 dark:text-rose-400 font-mono">
                    {hasAnalysisInput ? report.summary.failCount : '—'}
                  </span>
                </div>
              </div>
            </div>

            {/* Provisional Score Callout */}
            {hasAnalysisInput && report.isProvisional && (
              <div className="seo-warning-callout mt-4 flex items-start gap-2 rounded-xl border border-amber-500/25 bg-amber-500/5 p-3 text-[11px] leading-relaxed">
                <Info size={14} className="seo-semantic-warning mt-0.5 shrink-0" />
                <span>
                  <strong>Provisional score:</strong> Missing focus keyword or heading tags are excluded from weights rather than penalized. Add a keyword for full accuracy.
                </span>
              </div>
            )}
          </div>

          {/* Top Priority Fixes Card */}
          <div className="card-tilt rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5 sm:p-6 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800/80 pb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-heading)]">
                Priority Action Items
              </h3>
              <span className="text-xs font-mono text-slate-500">
                {hasAnalysisInput
                  ? `${report.topFixes.length} issue${report.topFixes.length !== 1 ? 's' : ''}`
                  : 'Waiting for content'}
              </span>
            </div>

            {!hasAnalysisInput ? (
              <div className="py-6 text-center">
                <FileText size={28} className="mx-auto mb-2 text-slate-400" aria-hidden="true" />
                <p className="text-xs font-bold text-[var(--text-heading)]">Your priority fixes will appear here</p>
                <p className="mt-1 text-[11px] leading-relaxed text-[var(--text-muted)]">
                  Add content to get clear, actionable recommendations.
                </p>
              </div>
            ) : report.topFixes.length === 0 ? (
              <div className="py-6 text-center text-slate-500">
                <CheckCircle2 size={32} className="mx-auto text-emerald-500 mb-2" />
                <p className="text-xs font-bold text-[var(--text-heading)]">All evaluated checks pass!</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Your content meets core on-page search recommendations.</p>
              </div>
            ) : (
              <ul className="space-y-2.5 max-h-[340px] overflow-y-auto pr-1">
                {report.topFixes.map((fix) => (
                  <li
                    key={fix.id}
                    className="card-tilt flex items-start gap-2.5 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-slate-50/70 dark:bg-[#070e1a] p-3 text-xs"
                  >
                    <span className="mt-0.5">{getStatusIcon(fix.status)}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className="font-bold text-[var(--text-heading)] truncate">{fix.label}</span>
                        <span
                          className={`text-[9px] uppercase font-bold px-1.5 py-0.5 rounded ${
                            fix.status === 'fail'
                              ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                              : 'seo-warning-badge bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                          }`}
                        >
                          {fix.status}
                        </span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                        {fix.suggestion}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* 5 Core Checks Breakdown (Accordion) */}
          <div className="card-tilt rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5 sm:p-6 shadow-sm space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-heading)] border-b border-slate-200 dark:border-slate-800/80 pb-3">
              5 Core Diagnostic Signals
            </h3>

            <div className="space-y-2">
              {!hasAnalysisInput ? (
                <div className="rounded-xl border border-dashed border-[var(--card-border)] bg-[var(--background)] px-4 py-6 text-center">
                  <p className="text-xs font-semibold text-[var(--text-heading)]">
                    Your five checks are ready
                  </p>
                  <p className="mt-1 text-[11px] leading-relaxed text-[var(--text-muted)]">
                    Start with a title or paste a draft to see each signal and its recommendation.
                  </p>
                </div>
              ) : report.checks.map((check) => {
                const isExpanded = expandedCheckId === check.id;
                return (
                  <div
                    key={check.id}
                    className="card-tilt rounded-xl border border-slate-200 dark:border-slate-800/80 bg-slate-50/60 dark:bg-[#070e1a] overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedCheckId(isExpanded ? null : check.id)}
                      className="w-full p-3 flex items-center justify-between text-left hover:bg-slate-100/70 dark:hover:bg-slate-900/60 transition-colors cursor-pointer border-none bg-transparent"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {getStatusIcon(check.status)}
                        <span className="text-xs font-semibold text-[var(--text-heading)] truncate">
                          {check.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[11px] font-mono text-slate-500">
                          {check.score !== null ? `${check.score}/100` : 'Excluded'}
                        </span>
                        {isExpanded ? (
                          <ChevronUp size={14} className="text-slate-400" />
                        ) : (
                          <ChevronDown size={14} className="text-slate-400" />
                        )}
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="p-3.5 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-300 space-y-1.5 bg-white dark:bg-[#050b14]">
                        <p className="font-medium text-[var(--text-heading)]">{check.message}</p>
                        <p className="text-amber-600 dark:text-amber-400">
                          <strong>Fix:</strong> {check.fixSuggestion}
                        </p>
                        {check.id === 'readability' && check.details?.fleschValue !== undefined && (
                          <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-500">
                            <div>Flesch Score: <strong className="text-[var(--text-heading)]">{check.details.fleschValue}</strong></div>
                            <div>Avg Sentence: <strong className="text-[var(--text-heading)]">{check.details.avgSentenceLength} words</strong></div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
