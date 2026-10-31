'use client';

import { useMemo, useState } from 'react';
import { Check, Copy, Download, RotateCcw, WandSparkles } from 'lucide-react';

const INITIAL_JSON = '{\n  "name": "Code with Amrendra",\n  "tools": ["validator", "formatter"]\n}';

function getErrorLocation(source, error) {
  const match = String(error.message).match(/position\s+(\d+)/i);
  if (!match) return null;
  const position = Number(match[1]);
  const beforeError = source.slice(0, position);
  const lines = beforeError.split('\n');
  return { line: lines.length, column: lines.at(-1).length + 1 };
}

export default function JsonValidatorClient() {
  const [input, setInput] = useState(INITIAL_JSON);
  const [compact, setCompact] = useState(false);
  const [copied, setCopied] = useState(false);
  const result = useMemo(() => {
    if (!input.trim()) return { state: 'empty', output: '', error: '' };
    try {
      return { state: 'valid', output: JSON.stringify(JSON.parse(input), null, compact ? 0 : 2), error: '' };
    } catch (error) {
      const location = getErrorLocation(input, error);
      return {
        state: 'invalid',
        output: '',
        error: `${error.message}${location ? ` (line ${location.line}, column ${location.column})` : ''}`,
      };
    }
  }, [input, compact]);

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
    link.download = 'formatted.json';
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
  };

  return (
    <section aria-label="JSON validation workspace" className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
      <div className="rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5 shadow-[var(--shadow-card)] sm:p-7">
        <div className="mb-4 flex items-center justify-between gap-3">
          <label htmlFor="json-input" className="font-bold text-[var(--text-heading)]">Your JSON</label>
          <button type="button" onClick={() => setInput('')} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[var(--card-border)] px-3 text-sm text-[var(--text-body)] hover:border-amber-500" aria-label="Clear JSON input">
            <RotateCcw size={15} /> Clear
          </button>
        </div>
        <textarea id="json-input" spellCheck="false" value={input} onChange={(event) => setInput(event.target.value)} placeholder={'Paste JSON here, for example: {"ok": true}'} className="min-h-[340px] w-full resize-y rounded-2xl border border-[var(--card-border)] bg-[var(--background)] p-4 font-mono text-sm leading-6 text-[var(--foreground)] outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20" />
        <p className="mt-3 text-xs text-[var(--text-muted)]">Your input is processed locally in this browser and is never uploaded.</p>
      </div>

      <div className="rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5 shadow-[var(--shadow-card)] sm:p-7">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-bold text-[var(--text-heading)]">Formatted output</h2>
            <p className={`mt-1 text-sm ${result.state === 'valid' ? 'text-emerald-600 dark:text-emerald-400' : result.state === 'invalid' ? 'text-rose-600 dark:text-rose-400' : 'text-[var(--text-muted)]'}`} role="status">
              {result.state === 'valid' ? 'Valid JSON' : result.state === 'invalid' ? 'Invalid JSON' : 'Enter JSON to validate'}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => setCompact((value) => !value)} disabled={!result.output} aria-pressed={compact} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[var(--card-border)] px-3 text-sm font-semibold text-[var(--text-body)] disabled:cursor-not-allowed disabled:opacity-50">
              {compact ? 'Pretty print' : 'Compact'}
            </button>
            <button type="button" onClick={copyOutput} disabled={!result.output} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-amber-500 px-3 text-sm font-bold text-slate-950 disabled:cursor-not-allowed disabled:opacity-50" aria-label="Copy formatted JSON">
              {copied ? <Check size={15} /> : <Copy size={15} />}{copied ? 'Copied' : 'Copy'}
            </button>
            <button type="button" onClick={downloadOutput} disabled={!result.output} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[var(--card-border)] px-3 text-sm font-semibold text-[var(--text-body)] disabled:cursor-not-allowed disabled:opacity-50">
              <Download size={15} /> Download
            </button>
          </div>
        </div>
        {result.state === 'invalid' ? (
          <div role="alert" className="rounded-2xl border border-rose-500/30 bg-rose-500/5 p-4 font-mono text-sm text-rose-700 dark:text-rose-300">{result.error}</div>
        ) : result.output ? (
          <pre className="min-h-[340px] overflow-auto rounded-2xl border border-[var(--card-border)] bg-[var(--background)] p-4 font-mono text-sm leading-6 text-[var(--foreground)]"><code>{result.output}</code></pre>
        ) : (
          <div className="flex min-h-[340px] flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--card-border)] p-6 text-center text-[var(--text-muted)]">
            <WandSparkles size={24} className="mb-3 text-amber-500" />
            <p>Formatted JSON will appear here.</p>
          </div>
        )}
      </div>
    </section>
  );
}
