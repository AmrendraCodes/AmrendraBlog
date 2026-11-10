'use client';

import { useMemo, useState, useRef } from 'react';
import {
  Check,
  Copy,
  Download,
  RotateCcw,
  Upload,
  Sparkles,
  WandSparkles,
  AlertCircle,
  FileCheck2,
} from 'lucide-react';

const INITIAL_JSON = `{
  "name": "Code with Amrendra",
  "version": "2.0.0",
  "tools": [
    "JSON Validator",
    "JSON Formatter",
    "Linter"
  ],
  "settings": {
    "clientSide": true,
    "tabSize": 2,
    "privacy": "100% in-browser"
  }
}`;

/**
 * Cross-browser error location extractor supporting:
 * - Chrome / V8 ("at position X")
 * - Firefox ("at line X column Y")
 * - Safari / WebKit ("JSON Parse error: ...")
 */
function getErrorLocation(source, error) {
  const message = String(error?.message || '');

  // 1. Firefox / Safari direct line & column pattern
  const ffMatch = message.match(/line\s+(\d+)\s+column\s+(\d+)/i);
  if (ffMatch) {
    return {
      line: parseInt(ffMatch[1], 10),
      column: parseInt(ffMatch[2], 10),
    };
  }

  // 2. Chrome / Edge / Node V8 position byte-offset pattern
  const v8Match = message.match(/position\s+(\d+)/i);
  if (v8Match) {
    const position = Number(v8Match[1]);
    const beforeError = source.slice(0, position);
    const lines = beforeError.split(/\r\n|\r|\n/);
    const lastLine = lines[lines.length - 1] || '';
    return {
      line: lines.length,
      column: lastLine.length + 1,
    };
  }

  return null;
}

export default function JsonValidatorClient() {
  const [input, setInput] = useState(INITIAL_JSON);
  const [compact, setCompact] = useState(false);
  const [copied, setCopied] = useState(false);
  const [cursorPos, setCursorPos] = useState({ line: 1, col: 1 });
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  // Real-time cursor position tracking
  const updateCursorPosition = (e) => {
    const target = e?.target || textareaRef.current;
    if (!target) return;
    const value = target.value || '';
    const selStart = target.selectionStart || 0;
    const textUpToCursor = value.slice(0, selStart);
    const lines = textUpToCursor.split(/\r\n|\r|\n/);
    const line = lines.length;
    const col = (lines[lines.length - 1] || '').length + 1;
    setCursorPos({ line, col });
  };

  // Validation & Formatting engine
  const result = useMemo(() => {
    if (!input.trim()) return { state: 'empty', output: '', error: '' };
    try {
      const parsed = JSON.parse(input);
      return {
        state: 'valid',
        output: JSON.stringify(parsed, null, compact ? 0 : 2),
        error: '',
      };
    } catch (error) {
      const location = getErrorLocation(input, error);
      return {
        state: 'invalid',
        output: '',
        error: `${error.message}${
          location ? ` (Line ${location.line}, Column ${location.column})` : ''
        }`,
        location,
      };
    }
  }, [input, compact]);

  // Tab key indentation handler (2 spaces without losing focus)
  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const value = textarea.value;
      const indent = '  '; // 2 spaces

      // Multiline indenting vs single caret insertion
      if (start !== end && value.slice(start, end).includes('\n')) {
        const startLineIndex = value.lastIndexOf('\n', start - 1) + 1;
        const endLineIndex = value.indexOf('\n', end);
        const actualEnd = endLineIndex === -1 ? value.length : endLineIndex;
        const targetBlock = value.slice(startLineIndex, actualEnd);

        if (e.shiftKey) {
          // Unindent (Shift + Tab)
          const modified = targetBlock.replace(/^  /gm, '');
          const nextValue = value.slice(0, startLineIndex) + modified + value.slice(actualEnd);
          setInput(nextValue);
          window.requestAnimationFrame(() => {
            textarea.setSelectionRange(startLineIndex, startLineIndex + modified.length);
            updateCursorPosition({ target: textarea });
          });
        } else {
          // Indent (Tab)
          const modified = targetBlock.replace(/^/gm, indent);
          const nextValue = value.slice(0, startLineIndex) + modified + value.slice(actualEnd);
          setInput(nextValue);
          window.requestAnimationFrame(() => {
            textarea.setSelectionRange(startLineIndex, startLineIndex + modified.length);
            updateCursorPosition({ target: textarea });
          });
        }
      } else {
        // Single cursor insert
        const nextValue = value.substring(0, start) + indent + value.substring(end);
        setInput(nextValue);
        window.requestAnimationFrame(() => {
          textarea.selectionStart = textarea.selectionEnd = start + indent.length;
          updateCursorPosition({ target: textarea });
        });
      }
    }
  };

  // Upload File Handler via FileReader API
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result;
      if (typeof text === 'string') {
        setInput(text);
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    };
    reader.onerror = () => {
      alert('Failed to read the file. Please check file permissions.');
      if (fileInputRef.current) fileInputRef.current.value = '';
    };
    reader.readAsText(file);
  };

  const copyOutput = async () => {
    if (!result.output) return;
    try {
      await navigator.clipboard.writeText(result.output);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const downloadOutput = () => {
    if (!result.output) return;
    const blob = new Blob([result.output], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = compact ? 'minified.json' : 'formatted.json';
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 100);
  };

  return (
    <section aria-label="JSON validation workspace" className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
      {/* ── Left Pane: Input Editor ── */}
      <div className="flex flex-col justify-between rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5 shadow-[var(--shadow-card)] sm:p-7">
        <div>
          {/* Header & Action Controls */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2.5">
            <div className="flex items-center gap-2">
              <label htmlFor="json-input" className="font-bold text-[var(--text-heading)] text-base">
                Your JSON
              </label>
              <span className="text-[11px] font-mono text-[var(--text-muted)] bg-[var(--background)] px-2 py-0.5 rounded-md border border-[var(--card-border)]">
                UTF-8
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".json,.txt,.js,.html,.css"
                onChange={handleFileUpload}
                className="hidden"
                aria-label="Upload source file"
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex min-h-9 items-center gap-1.5 rounded-xl border border-[var(--card-border)] bg-[var(--background)] px-2.5 sm:px-3 text-xs sm:text-sm font-semibold text-[var(--text-body)] hover:border-amber-500 hover:text-amber-500 transition-colors"
                title="Upload .json, .txt, or .js file from your device"
              >
                <Upload size={13} />
                <span>Upload</span>
              </button>

              <button
                type="button"
                onClick={() => setInput(INITIAL_JSON)}
                className="inline-flex min-h-9 items-center gap-1.5 rounded-xl border border-[var(--card-border)] bg-[var(--background)] px-2.5 sm:px-3 text-xs sm:text-sm font-semibold text-[var(--text-body)] hover:border-amber-500 hover:text-amber-500 transition-colors"
                title="Load sample JSON dataset"
              >
                <Sparkles size={13} />
                <span>Sample</span>
              </button>

              <button
                type="button"
                onClick={() => setInput('')}
                className="inline-flex min-h-9 items-center gap-1.5 rounded-xl border border-[var(--card-border)] bg-[var(--background)] px-2.5 sm:px-3 text-xs sm:text-sm font-semibold text-[var(--text-body)] hover:border-rose-500 hover:text-rose-500 transition-colors"
                aria-label="Clear JSON input"
                title="Clear editor"
              >
                <RotateCcw size={13} />
                <span>Clear</span>
              </button>
            </div>
          </div>

          {/* Code Textarea with Tab Key Support */}
          <textarea
            id="json-input"
            ref={textareaRef}
            spellCheck="false"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              updateCursorPosition(e);
            }}
            onKeyDown={handleKeyDown}
            onKeyUp={updateCursorPosition}
            onClick={updateCursorPosition}
            onSelect={updateCursorPosition}
            placeholder={'Paste or type JSON here, for example: {"status": "ok"}'}
            className="min-h-[360px] w-full resize-y rounded-2xl border border-[var(--card-border)] bg-[var(--background)] p-4 font-mono text-sm leading-6 text-[var(--foreground)] outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
          />
        </div>

        {/* Footer Meta & Cursor Tracking */}
        <div className="mt-3 flex items-center justify-between text-xs text-[var(--text-muted)] font-mono border-t border-[var(--card-border)]/60 pt-3">
          <span>
            Line {cursorPos.line}, Col {cursorPos.col}
          </span>
          <span className="truncate max-w-[180px] sm:max-w-none text-right">
            {input.length} chars · Tab = 2 spaces
          </span>
        </div>
      </div>

      {/* ── Right Pane: Formatted Output ── */}
      <div className="flex flex-col justify-between rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5 shadow-[var(--shadow-card)] sm:p-7">
        <div>
          {/* Header & Status Indicator */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-bold text-[var(--text-heading)] text-base">
                Formatted Output
              </h2>
              <div
                className={`mt-1 inline-flex items-center gap-1.5 text-xs font-semibold ${
                  result.state === 'valid'
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : result.state === 'invalid'
                    ? 'text-rose-600 dark:text-rose-400'
                    : 'text-[var(--text-muted)]'
                }`}
                role="status"
              >
                {result.state === 'valid' ? (
                  <>
                    <FileCheck2 size={14} /> Valid JSON
                  </>
                ) : result.state === 'invalid' ? (
                  <>
                    <AlertCircle size={14} /> Invalid JSON
                  </>
                ) : (
                  'Enter JSON to validate'
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() => setCompact((value) => !value)}
                disabled={!result.output}
                aria-pressed={compact}
                className="inline-flex min-h-9 items-center gap-1.5 rounded-xl border border-[var(--card-border)] bg-[var(--background)] px-2.5 sm:px-3 text-xs sm:text-sm font-semibold text-[var(--text-body)] disabled:cursor-not-allowed disabled:opacity-50 hover:border-amber-500 transition-colors"
              >
                {compact ? 'Pretty Print' : 'Compact'}
              </button>

              <button
                type="button"
                onClick={copyOutput}
                disabled={!result.output}
                className="inline-flex min-h-9 items-center gap-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 px-3 text-xs sm:text-sm font-bold text-slate-950 disabled:cursor-not-allowed disabled:opacity-50 transition-colors shadow-xs"
                aria-label="Copy formatted JSON"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>

              <button
                type="button"
                onClick={downloadOutput}
                disabled={!result.output}
                className="inline-flex min-h-9 items-center gap-1.5 rounded-xl border border-[var(--card-border)] bg-[var(--background)] px-2.5 sm:px-3 text-xs sm:text-sm font-semibold text-[var(--text-body)] disabled:cursor-not-allowed disabled:opacity-50 hover:border-amber-500 transition-colors"
              >
                <Download size={14} />
                <span>Download</span>
              </button>
            </div>
          </div>

          {/* Output Display / Error Callout */}
          {result.state === 'invalid' ? (
            <div
              role="alert"
              className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-5 font-mono text-sm text-rose-700 dark:text-rose-300 leading-relaxed shadow-xs"
            >
              <div className="flex items-center gap-2 font-bold mb-2 text-rose-600 dark:text-rose-400">
                <AlertCircle size={16} />
                <span>Syntax Error Detected:</span>
              </div>
              <p className="break-words">{result.error}</p>
              {result.location && (
                <div className="mt-3 text-xs text-rose-600/80 dark:text-rose-400/80 bg-rose-500/5 p-2.5 rounded-xl border border-rose-500/20">
                  Tip: Check Line {result.location.line}, Column {result.location.column} for missing commas, trailing commas, or unquoted keys.
                </div>
              )}
            </div>
          ) : result.output ? (
            <pre className="min-h-[360px] overflow-auto rounded-2xl border border-[var(--card-border)] bg-[var(--background)] p-4 font-mono text-sm leading-6 text-[var(--foreground)]">
              <code>{result.output}</code>
            </pre>
          ) : (
            <div className="flex min-h-[360px] flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--card-border)] p-6 text-center text-[var(--text-muted)]">
              <WandSparkles size={26} className="mb-3 text-amber-500 opacity-80" />
              <p className="font-medium text-sm">Formatted JSON will appear here.</p>
              <p className="text-xs text-[var(--text-muted)] mt-1">Paste JSON or click &quot;Sample&quot; to test.</p>
            </div>
          )}
        </div>

        {/* Footer Output Status */}
        <div className="mt-3 flex items-center justify-between text-xs text-[var(--text-muted)] font-mono border-t border-[var(--card-border)]/60 pt-3">
          <span>{compact ? 'Minified JSON' : '2-Space Indentation'}</span>
          <span>100% Client-Side</span>
        </div>
      </div>
    </section>
  );
}
