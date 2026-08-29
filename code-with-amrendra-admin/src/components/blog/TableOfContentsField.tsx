'use client';

import React, { useState, useEffect } from 'react';
import { ListTree, Sparkles, Copy, Check, Plus, ArrowDownToLine, Eye, Code2 } from 'lucide-react';

interface TocHeading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsFieldProps {
  content: string;
  onInsertToc?: (tocMarkdown: string) => void;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function extractHeadings(markdown: string): TocHeading[] {
  if (!markdown) return [];
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: TocHeading[] = [];
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length; // 2 (h2) or 3 (h3)
    const rawText = match[2].trim();

    // Clean inline markdown
    const text = rawText
      .replace(/\*\*(.+?)\*\*/g, '$1')
      .replace(/\*(.+?)\*/g, '$1')
      .replace(/`(.+?)`/g, '$1')
      .replace(/\[(.+?)\]\(.+?\)/g, '$1');

    headings.push({
      id: slugify(text),
      text,
      level,
    });
  }

  return headings;
}

export default function TableOfContentsField({ content, onInsertToc }: TableOfContentsFieldProps) {
  const [headings, setHeadings] = useState<TocHeading[]>([]);
  const [tocText, setTocText] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [inserted, setInserted] = useState<boolean>(false);
  const [viewFormat, setViewFormat] = useState<'markdown' | 'json'>('markdown');

  // Auto-sync when content changes or initial load
  const generateToc = () => {
    const extracted = extractHeadings(content);
    setHeadings(extracted);

    if (extracted.length === 0) {
      setTocText('');
      return;
    }

    if (viewFormat === 'markdown') {
      const lines = extracted.map((h) => {
        const indent = h.level === 3 ? '  ' : '';
        return `${indent}- [${h.text}](#${h.id})`;
      });
      setTocText(lines.join('\n'));
    } else {
      setTocText(JSON.stringify(extracted, null, 2));
    }
  };

  useEffect(() => {
    generateToc();
  }, [content, viewFormat]);

  const handleCopy = () => {
    if (!tocText) return;
    navigator.clipboard.writeText(tocText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInsert = () => {
    if (!tocText) return;
    const tocMarkdown = `## Table of Contents\n\n${tocText}\n\n`;
    if (onInsertToc) {
      onInsertToc(tocMarkdown);
      setInserted(true);
      setTimeout(() => setInserted(false), 2500);
    }
  };

  const lineCount = Math.max(tocText.split('\n').length, 3);
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <label className="block text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wide">
            Table Of Contents
          </label>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60">
            {headings.length} {headings.length === 1 ? 'heading' : 'headings'}
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Format Switcher */}
          <div className="flex items-center rounded-lg border border-[var(--border-color)] bg-[var(--bg-canvas)] p-0.5 text-[11px]">
            <button
              type="button"
              onClick={() => setViewFormat('markdown')}
              className={`px-2 py-0.5 rounded-md font-semibold transition cursor-pointer ${
                viewFormat === 'markdown'
                  ? 'bg-[var(--bg-card)] text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
              }`}
            >
              Markdown
            </button>
            <button
              type="button"
              onClick={() => setViewFormat('json')}
              className={`px-2 py-0.5 rounded-md font-semibold transition cursor-pointer ${
                viewFormat === 'json'
                  ? 'bg-[var(--bg-card)] text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
              }`}
            >
              JSON
            </button>
          </div>

          <button
            type="button"
            onClick={generateToc}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-[var(--bg-card)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:text-indigo-600 hover:border-indigo-300 transition cursor-pointer"
            title="Re-scan Headings from Markdown Content"
          >
            <Sparkles size={12} className="text-indigo-500" />
            <span>Re-scan</span>
          </button>

          {onInsertToc && (
            <button
              type="button"
              onClick={handleInsert}
              disabled={!tocText}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-xs"
              title="Insert Table of Contents into Article Content"
            >
              {inserted ? <Check size={12} /> : <ArrowDownToLine size={12} />}
              <span>{inserted ? 'Inserted!' : 'Insert to Post'}</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleCopy}
            disabled={!tocText}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-[var(--bg-card)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:text-[var(--text-main)] transition cursor-pointer disabled:opacity-50"
            title="Copy Table of Contents to clipboard"
          >
            {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Strapi-Inspired Code Editor Box with Line Numbers */}
      <div className="rounded-2xl border border-[var(--border-color)] bg-[#1e1e2f] dark:bg-[#151522] overflow-hidden shadow-xs focus-within:border-indigo-500 transition">
        <div className="flex min-h-[140px] max-h-[260px] overflow-y-auto">
          {/* Gutter Line Numbers */}
          <div className="select-none py-3 px-3 text-right text-[11px] font-mono text-slate-500 dark:text-slate-600 bg-[#191928] dark:bg-[#10101b] border-r border-slate-800/80 min-w-[38px]">
            {lineNumbers.map((num) => (
              <div key={num} className="leading-relaxed">
                {num}
              </div>
            ))}
          </div>

          {/* Editable Text Area */}
          <textarea
            rows={lineCount}
            value={tocText}
            onChange={(e) => setTocText(e.target.value)}
            placeholder={
              headings.length === 0
                ? 'No headings (## or ###) detected in article content yet. Add headings to auto-populate Table of Contents.'
                : ''
            }
            className="flex-1 p-3 bg-transparent text-emerald-400 font-mono text-xs leading-relaxed border-0 outline-none resize-none overflow-x-auto whitespace-pre placeholder:text-slate-500 placeholder:italic"
          />
        </div>
      </div>
      <p className="text-[11px] text-[var(--text-muted)]">
        Headings with <code className="text-indigo-500">##</code> and <code className="text-indigo-500">###</code> are automatically indexed. Click <strong>Insert to Post</strong> to place it in the blog body.
      </p>
    </div>
  );
}
