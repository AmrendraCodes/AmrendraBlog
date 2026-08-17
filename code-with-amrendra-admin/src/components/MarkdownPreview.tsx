'use client';

import React from 'react';
import { ExternalLink, Info, Lightbulb, AlertTriangle, AlertCircle } from 'lucide-react';

interface MarkdownPreviewProps {
  content: string;
}

export default function MarkdownPreview({ content }: MarkdownPreviewProps) {
  if (!content) {
    return (
      <div className="py-12 text-center text-slate-400 text-xs italic">
        No content to preview yet. Start typing or click &ldquo;Magic Format&rdquo; to structure your content.
      </div>
    );
  }

  // Parse markdown into structured blocks
  const lines = content.split('\n');
  const renderedElements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeLanguage = '';
  let codeBuffer: string[] = [];
  let alertType: string | null = null;
  let alertBuffer: string[] = [];

  const renderInlineFormatted = (text: string): React.ReactNode => {
    // Process markdown links [text](url), inline code `code`, bold **bold**, italic *italic*
    const parts: React.ReactNode[] = [];
    let remaining = text;
    let keyIdx = 0;

    while (remaining.length > 0) {
      // 1. Check for markdown link [text](url)
      const linkMatch = remaining.match(/^(.*?)\[([^\]]+)\]\(([^)]+)\)([\s\S]*)$/);
      // 2. Check for inline code `code`
      const codeMatch = remaining.match(/^(.*?)`([^`]+)`([\s\S]*)$/);
      // 3. Check for bold **text**
      const boldMatch = remaining.match(/^(.*?)\*\*([^*]+)\*\*([\s\S]*)$/);
      // 4. Check for italic *text*
      const italicMatch = remaining.match(/^(.*?)\*([^*]+)\*([\s\S]*)$/);

      // Find which pattern occurs first
      const matches = [
        { type: 'link', match: linkMatch, index: linkMatch ? linkMatch[1].length : Infinity },
        { type: 'code', match: codeMatch, index: codeMatch ? codeMatch[1].length : Infinity },
        { type: 'bold', match: boldMatch, index: boldMatch ? boldMatch[1].length : Infinity },
        { type: 'italic', match: italicMatch, index: italicMatch ? italicMatch[1].length : Infinity },
      ].sort((a, b) => a.index - b.index);

      const first = matches[0];
      if (!first.match || first.index === Infinity) {
        parts.push(<span key={keyIdx++}>{remaining}</span>);
        break;
      }

      const [, before, captured1, captured2, after] = first.match as RegExpMatchArray;
      if (before) {
        parts.push(<span key={keyIdx++}>{before}</span>);
      }

      if (first.type === 'link') {
        const isExternal = captured2.startsWith('http');
        parts.push(
          <a
            key={keyIdx++}
            href={captured2}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            className="inline-flex items-center gap-0.5 text-indigo-600 dark:text-indigo-400 font-semibold underline underline-offset-2 hover:text-indigo-800 transition"
          >
            <span>{captured1}</span>
            {isExternal && <ExternalLink size={10} className="inline opacity-70" />}
          </a>
        );
        remaining = after || '';
      } else if (first.type === 'code') {
        parts.push(
          <code
            key={keyIdx++}
            className="px-1.5 py-0.5 mx-0.5 text-[11px] font-mono font-bold rounded bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60"
          >
            {captured1}
          </code>
        );
        remaining = captured2 || ''; // with 3 capturing groups, captured2 is the rest
      } else if (first.type === 'bold') {
        parts.push(
          <strong key={keyIdx++} className="font-bold text-slate-900 dark:text-white">
            {captured1}
          </strong>
        );
        remaining = captured2 || '';
      } else if (first.type === 'italic') {
        parts.push(
          <em key={keyIdx++} className="italic text-slate-800 dark:text-slate-200">
            {captured1}
          </em>
        );
        remaining = captured2 || '';
      }
    }

    return parts;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Code block boundaries
    if (trimmed.startsWith('```')) {
      if (inCodeBlock) {
        // Close code block
        inCodeBlock = false;
        renderedElements.push(
          <div key={`code-${i}`} className="my-4 rounded-xl overflow-hidden bg-slate-900 border border-slate-800 shadow-md">
            {codeLanguage && (
              <div className="px-4 py-1.5 bg-slate-800/80 text-[10px] font-mono uppercase font-bold text-slate-400 border-b border-slate-700/50 flex justify-between items-center">
                <span>{codeLanguage}</span>
                <span className="text-slate-500">Preview</span>
              </div>
            )}
            <pre className="p-4 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed">
              <code>{codeBuffer.join('\n')}</code>
            </pre>
          </div>
        );
        codeBuffer = [];
        codeLanguage = '';
      } else {
        // Open code block
        inCodeBlock = true;
        codeLanguage = trimmed.replace(/^```/, '').trim();
        codeBuffer = [];
      }
      continue;
    }

    if (inCodeBlock) {
      codeBuffer.push(line);
      continue;
    }

    // Alert Callouts (e.g. > [!NOTE], > [!TIP], > [!WARNING])
    if (trimmed.startsWith('> [!NOTE]') || trimmed.startsWith('> [!TIP]') || trimmed.startsWith('> [!WARNING]') || trimmed.startsWith('> [!IMPORTANT]')) {
      alertType = trimmed.replace(/^>\s*\[!([A-Z]+)\]/i, '$1').toUpperCase();
      alertBuffer = [];
      continue;
    }

    if (alertType && trimmed.startsWith('>')) {
      alertBuffer.push(trimmed.replace(/^>\s?/, ''));
      continue;
    } else if (alertType) {
      // Flush alert
      const currentAlertType = alertType;
      const alertText = alertBuffer.join(' ');
      alertType = null;
      alertBuffer = [];

      let alertStyles = 'bg-blue-50 border-blue-200 text-blue-900';
      let AlertIcon = Info;

      if (currentAlertType === 'TIP') {
        alertStyles = 'bg-emerald-50 border-emerald-200 text-emerald-900';
        AlertIcon = Lightbulb;
      } else if (currentAlertType === 'WARNING') {
        alertStyles = 'bg-amber-50 border-amber-200 text-amber-900';
        AlertIcon = AlertTriangle;
      } else if (currentAlertType === 'IMPORTANT' || currentAlertType === 'CAUTION') {
        alertStyles = 'bg-purple-50 border-purple-200 text-purple-900';
        AlertIcon = AlertCircle;
      }

      renderedElements.push(
        <div key={`alert-${i}`} className={`my-4 p-4 rounded-xl border flex gap-3 text-xs leading-relaxed ${alertStyles}`}>
          <AlertIcon size={18} className="shrink-0 mt-0.5" />
          <div>
            <span className="font-extrabold uppercase tracking-wider text-[10px] block mb-1">
              {currentAlertType}
            </span>
            <span>{renderInlineFormatted(alertText)}</span>
          </div>
        </div>
      );
    }

    // Headings
    if (trimmed.startsWith('# ')) {
      renderedElements.push(
        <h1 key={`h1-${i}`} className="text-2xl font-black tracking-tight text-slate-900 dark:text-white mt-6 mb-3 border-b pb-2">
          {renderInlineFormatted(trimmed.replace(/^#\s+/, ''))}
        </h1>
      );
      continue;
    }

    if (trimmed.startsWith('## ')) {
      renderedElements.push(
        <h2 key={`h2-${i}`} className="text-lg font-extrabold text-slate-900 dark:text-white mt-6 mb-2 flex items-center gap-2">
          <span className="text-indigo-600 dark:text-indigo-400 font-mono text-sm">##</span>
          <span>{renderInlineFormatted(trimmed.replace(/^##\s+/, ''))}</span>
        </h2>
      );
      continue;
    }

    if (trimmed.startsWith('### ')) {
      renderedElements.push(
        <h3 key={`h3-${i}`} className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-4 mb-1 flex items-center gap-1.5">
          <span className="text-slate-400 font-mono text-xs">###</span>
          <span>{renderInlineFormatted(trimmed.replace(/^###\s+/, ''))}</span>
        </h3>
      );
      continue;
    }

    // Horizontal Rule
    if (trimmed === '---' || trimmed === '***') {
      renderedElements.push(<hr key={`hr-${i}`} className="my-6 border-slate-200 dark:border-slate-800" />);
      continue;
    }

    // Bullet points / numbered lists
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ') || /^\d+\.\s+/.test(trimmed)) {
      const listContent = trimmed.replace(/^(?:[-*]|\d+\.)\s+/, '');
      renderedElements.push(
        <li key={`li-${i}`} className="ml-5 list-disc text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-1">
          {renderInlineFormatted(listContent)}
        </li>
      );
      continue;
    }

    // Standard paragraph
    if (trimmed.length > 0) {
      renderedElements.push(
        <p key={`p-${i}`} className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
          {renderInlineFormatted(trimmed)}
        </p>
      );
    }
  }

  return (
    <div className="p-6 bg-slate-50/70 dark:bg-slate-900/50 rounded-xl border border-slate-200/80 dark:border-slate-800/80 min-h-[400px]">
      <div className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-4 flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
        <span>Article Content Live Preview</span>
        <span className="text-slate-400 font-normal">Formatted & Interlinked View</span>
      </div>
      <div className="space-y-1">{renderedElements}</div>
    </div>
  );
}
