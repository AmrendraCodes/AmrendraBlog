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

  // Normalize dividers to prevent setext heading interpretation and match live site
  const normalizedContent = content.replace(
    /([^\n\r])[ \t]*\r?\n[ \t]*((?:-[ \t]*){3,}|(?:=[ \t]*){3,}|(?:\*[ \t]*){3,}|(?:_[ \t]*){3,})[ \t]*(\r?\n|$)/g,
    '$1\n\n$2\n\n'
  );

  // Parse markdown into structured blocks
  const lines = normalizedContent.split('\n');
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
      // 0. Check for markdown image ![alt](url)
      const imgMatch = remaining.match(/^(.*?)!\[([^\]]*)\]\(([^)]+)\)([\s\S]*)$/);
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
        { type: 'image', match: imgMatch, index: imgMatch ? imgMatch[1].length : Infinity },
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

      if (first.type === 'image') {
        parts.push(
          <img
            key={keyIdx++}
            src={captured2}
            alt={captured1 || 'Illustration'}
            className="my-3 rounded-xl max-h-[400px] object-cover shadow-xs border border-slate-200 dark:border-slate-800"
          />
        );
        remaining = after || '';
      } else if (first.type === 'link') {
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
        <h2 key={`h2-${i}`} className="text-xl font-extrabold text-slate-900 dark:text-white mt-6 mb-2 tracking-tight">
          {renderInlineFormatted(trimmed.replace(/^##\s+/, ''))}
        </h2>
      );
      continue;
    }

    if (trimmed.startsWith('### ')) {
      renderedElements.push(
        <h3 key={`h3-${i}`} className="text-base font-bold text-slate-800 dark:text-slate-200 mt-4 mb-2">
          {renderInlineFormatted(trimmed.replace(/^###\s+/, ''))}
        </h3>
      );
      continue;
    }

    if (trimmed.startsWith('#### ')) {
      renderedElements.push(
        <h4 key={`h4-${i}`} className="text-sm font-semibold text-slate-700 dark:text-slate-300 mt-3 mb-1">
          {renderInlineFormatted(trimmed.replace(/^####\s+/, ''))}
        </h4>
      );
      continue;
    }

    // Horizontal Rule
    if (trimmed === '---' || trimmed === '***') {
      renderedElements.push(<hr key={`hr-${i}`} className="my-6 border-slate-200 dark:border-slate-800" />);
      continue;
    }

    // Standard Blockquote (> quote text)
    if (trimmed.startsWith('> ') && !trimmed.startsWith('> [!')) {
      renderedElements.push(
        <blockquote key={`quote-${i}`} className="my-4 pl-4 border-l-4 border-indigo-500 italic text-slate-700 dark:text-slate-300 text-xs sm:text-sm bg-slate-100/60 dark:bg-slate-800/40 py-2.5 px-3 rounded-r-xl">
          {renderInlineFormatted(trimmed.replace(/^>\s+/, ''))}
        </blockquote>
      );
      continue;
    }

    // Markdown Table
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|') && lines[i].trim().endsWith('|')) {
        tableLines.push(lines[i].trim());
        i++;
      }
      i--; // adjust loop counter

      if (tableLines.length >= 2) {
        const parseRow = (rowStr: string) =>
          rowStr
            .split('|')
            .slice(1, -1)
            .map((c) => c.trim());

        const headerRow = parseRow(tableLines[0]);
        // Table line 1 is usually separator like | --- | --- |
        const bodyLines = tableLines[1]?.includes('---') ? tableLines.slice(2) : tableLines.slice(1);
        const bodyRows = bodyLines.map(parseRow);

        renderedElements.push(
          <div key={`table-${i}`} className="my-5 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800 text-xs">
              <thead className="bg-slate-100 dark:bg-slate-800/80">
                <tr>
                  {headerRow.map((h, hIdx) => (
                    <th key={hIdx} className="px-3.5 py-2.5 text-left font-bold text-slate-900 dark:text-white">
                      {renderInlineFormatted(h)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/70 dark:divide-slate-800/70 bg-white dark:bg-slate-900/40">
                {bodyRows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="px-3.5 py-2 text-slate-700 dark:text-slate-300">
                        {renderInlineFormatted(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        continue;
      }
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

    // Standalone image block: ![alt](url)
    const imgBlockMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imgBlockMatch) {
      const [, alt, url] = imgBlockMatch;
      renderedElements.push(
        <figure key={`img-block-${i}`} className="my-5 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900/5 shadow-xs">
          <img
            src={url}
            alt={alt || 'Content image'}
            className="w-full max-h-[500px] object-cover"
            loading="lazy"
          />
          {alt && (
            <figcaption className="py-2 px-4 text-center text-xs text-slate-500 dark:text-slate-400 italic bg-slate-50 dark:bg-slate-900/40 border-t border-slate-200/60 dark:border-slate-800/60">
              {alt}
            </figcaption>
          )}
        </figure>
      );
      continue;
    }

    // Standard paragraph
    if (trimmed.length > 0) {
      renderedElements.push(
        <p key={`p-${i}`} className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
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
      <div className="space-y-2">{renderedElements}</div>
    </div>
  );
}
