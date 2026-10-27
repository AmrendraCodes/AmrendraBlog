'use client';

import { useId, useState, type ClipboardEvent, type KeyboardEvent } from 'react';
import type { SeoKeywords } from '@/lib/seo-keywords';

interface SeoKeywordsFieldProps {
  value: SeoKeywords;
  onChange: (next: SeoKeywords) => void;
  title?: string;
  metaTitle?: string;
  metaDescription?: string;
  content?: string;
  maxSecondary?: number;
}

export default function SeoKeywordsField({
  value,
  onChange,
  title = '',
  metaTitle = '',
  metaDescription = '',
  content = '',
  maxSecondary = 10,
}: SeoKeywordsFieldProps) {
  const fieldId = useId();
  const [draft, setDraft] = useState('');
  const primary = value.primary || '';
  const secondary = value.secondary || [];
  const isAtLimit = secondary.length >= maxSecondary;

  const addKeywords = (rawKeywords: string[]) => {
    const nextSecondary = [...secondary];
    const seen = new Set(
      [primary, ...nextSecondary]
        .map((keyword) => keyword.trim().toLowerCase())
        .filter(Boolean)
    );

    for (const rawKeyword of rawKeywords) {
      const keyword = rawKeyword.trim();
      const normalizedKeyword = keyword.toLowerCase();

      if (
        !keyword ||
        keyword.length > 60 ||
        seen.has(normalizedKeyword) ||
        nextSecondary.length >= maxSecondary
      ) {
        continue;
      }

      seen.add(normalizedKeyword);
      nextSecondary.push(keyword);
    }

    onChange({ ...value, secondary: nextSecondary });
  };

  const commitDraft = () => {
    if (draft) {
      addKeywords(draft.split(/[,\r\n]+/));
      setDraft('');
    }
  };

  const handleSecondaryKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      commitDraft();
    } else if (event.key === 'Backspace' && !draft && secondary.length > 0) {
      onChange({ ...value, secondary: secondary.slice(0, -1) });
    }
  };

  const handleSecondaryPaste = (event: ClipboardEvent<HTMLInputElement>) => {
    const pastedText = event.clipboardData.getData('text');
    if (!/[\r\n,]/.test(pastedText)) return;

    event.preventDefault();
    const input = event.currentTarget;
    const selectionStart = input.selectionStart ?? draft.length;
    const selectionEnd = input.selectionEnd ?? draft.length;
    const combinedDraft =
      draft.slice(0, selectionStart) + pastedText + draft.slice(selectionEnd);

    addKeywords(combinedDraft.split(/[,\r\n]+/));
    setDraft('');
  };

  const handlePrimaryBlur = () => {
    const trimmedPrimary = primary.trim();
    const primaryKey = trimmedPrimary.toLowerCase();
    onChange({
      primary: trimmedPrimary,
      secondary: secondary.filter(
        (keyword) => keyword.trim().toLowerCase() !== primaryKey
      ),
    });
  };

  const titleToCheck = metaTitle || title;
  const badges = [
    { label: 'Title', text: titleToCheck },
    { label: 'Meta description', text: metaDescription },
    { label: 'Content', text: content },
  ];

  return (
    <div className="space-y-3">
      <div>
        <label
          htmlFor={`${fieldId}-primary`}
          className="block text-xs font-bold text-[var(--text-secondary)] mb-1"
        >
          Focus Keyword
        </label>
        <input
          id={`${fieldId}-primary`}
          type="text"
          value={primary}
          maxLength={60}
          onChange={(event) => onChange({ ...value, primary: event.target.value })}
          onBlur={handlePrimaryBlur}
          placeholder="Main keyword for this blog post"
          className="admin-input text-xs"
        />
        {primary.trim() && (
          <div className="mt-2 flex flex-wrap gap-2" aria-label="Keyword usage checks">
            {badges.map(({ label, text }) => {
              const isIncluded = text
                .toLocaleLowerCase()
                .includes(primary.trim().toLocaleLowerCase());

              return (
                <span
                  key={label}
                  aria-label={`${label}: ${isIncluded ? 'keyword found' : 'keyword not found'}`}
                  className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${
                    isIncluded
                      ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                      : 'border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400'
                  }`}
                >
                  <span aria-hidden="true">{isIncluded ? '✓' : '!'}</span>
                  {label}
                </span>
              );
            })}
          </div>
        )}
      </div>

      <div>
        <div className="mb-1 flex items-center justify-between gap-2">
          <label
            htmlFor={`${fieldId}-secondary`}
            className="block text-xs font-bold text-[var(--text-secondary)]"
          >
            Secondary Keywords
          </label>
          <span
            className="text-[10px] font-medium text-[var(--text-muted)]"
            aria-live="polite"
          >
            {secondary.length}/{maxSecondary}
          </span>
        </div>

        {secondary.length > 0 && (
          <ul
            aria-label="Secondary keywords"
            className="mb-2 flex flex-wrap gap-2"
          >
            {secondary.map((keyword, index) => (
              <li
                key={`${keyword.toLowerCase()}-${index}`}
                className="inline-flex items-center gap-1 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2.5 py-1 text-[11px] font-medium text-indigo-700 dark:text-indigo-300"
              >
                <span>{keyword}</span>
                <button
                  type="button"
                  aria-label={`Remove ${keyword}`}
                  onClick={() =>
                    onChange({
                      ...value,
                      secondary: secondary.filter((_, itemIndex) => itemIndex !== index),
                    })
                  }
                  className="rounded-full text-indigo-500 hover:text-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}

        <input
          id={`${fieldId}-secondary`}
          type="text"
          value={draft}
          disabled={isAtLimit}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={handleSecondaryKeyDown}
          onPaste={handleSecondaryPaste}
          onBlur={commitDraft}
          placeholder={isAtLimit ? 'Keyword limit reached' : 'Type a keyword and press Enter or comma'}
          className="admin-input text-xs disabled:cursor-not-allowed disabled:opacity-50"
          aria-describedby={`${fieldId}-help`}
        />
        <p
          id={`${fieldId}-help`}
          className="mt-1 text-[10px] text-[var(--text-muted)]"
        >
          Enter ya comma se add karein; list paste karne par keywords ek saath add honge.
        </p>
      </div>
    </div>
  );
}
