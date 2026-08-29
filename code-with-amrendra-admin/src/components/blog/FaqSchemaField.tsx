'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Copy, Check, Sparkles, HelpCircle, ArrowDownToLine, ChevronDown, ChevronUp } from 'lucide-react';

export interface FaqItem {
  id?: string;
  question: string;
  answer: string;
}

interface FaqSchemaFieldProps {
  content: string;
  initialFaqs?: FaqItem[];
  onFaqsChange?: (faqs: FaqItem[]) => void;
  onInsertFaqMarkdown?: (faqMarkdown: string) => void;
  onInsertFaqSchemaScript?: (scriptTag: string) => void;
}

export function extractFaqs(content: string): FaqItem[] {
  if (!content) return [];
  const faqs: FaqItem[] = [];

  // 1. Look for dedicated FAQ section: ## FAQ or ## Frequently Asked Questions
  const faqSectionRegex = /##\s*(?:FAQ|Frequently Asked Questions)[\s\S]*?(?=(?:##\s+|$))/i;
  const faqSectionMatch = content.match(faqSectionRegex);
  const targetText = faqSectionMatch ? faqSectionMatch[0] : content;

  // 2. Match questions with ### Question? or **Question?**
  const qaRegex = /(?:###|\*\*)\s*([^\n\?]+\?)\s*(?:\*\*)?\s*\n+([\s\S]*?)(?=(?:###|\*\*|\n##|\n---|$))/gi;
  let match;
  while ((match = qaRegex.exec(targetText)) !== null) {
    const question = match[1].replace(/\*\*/g, '').trim();
    const answer = match[2]
      .replace(/\*\*/g, '')
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
      .trim();

    if (question && answer && question.includes('?')) {
      faqs.push({
        id: `faq_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        question,
        answer,
      });
    }
  }

  return faqs;
}

export function generateFaqSchemaJson(faqs: FaqItem[]): string {
  const validFaqs = faqs.filter((f) => f.question.trim() && f.answer.trim());
  if (validFaqs.length === 0) {
    return JSON.stringify(
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [],
      },
      null,
      2
    );
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: validFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question.trim(),
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer.trim(),
      },
    })),
  };

  return JSON.stringify(schema, null, 2);
}

export default function FaqSchemaField({
  content,
  initialFaqs = [],
  onFaqsChange,
  onInsertFaqMarkdown,
  onInsertFaqSchemaScript,
}: FaqSchemaFieldProps) {
  const [faqs, setFaqs] = useState<FaqItem[]>(() => {
    if (initialFaqs && initialFaqs.length > 0) return initialFaqs;
    return extractFaqs(content);
  });

  const [schemaJson, setSchemaJson] = useState<string>(() => generateFaqSchemaJson(faqs));
  const [copied, setCopied] = useState<boolean>(false);
  const [insertedMarkdown, setInsertedMarkdown] = useState<boolean>(false);
  const [isManualJsonEditing, setIsManualJsonEditing] = useState<boolean>(false);

  // Sync schema when FAQs update
  useEffect(() => {
    if (!isManualJsonEditing) {
      const generated = generateFaqSchemaJson(faqs);
      setSchemaJson(generated);
    }
    if (onFaqsChange) {
      onFaqsChange(faqs);
    }
  }, [faqs, isManualJsonEditing]);

  const handleAddFaq = () => {
    const newItem: FaqItem = {
      id: `faq_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      question: '',
      answer: '',
    };
    setFaqs((prev) => [...prev, newItem]);
    setIsManualJsonEditing(false);
  };

  const handleUpdateFaq = (index: number, field: 'question' | 'answer', value: string) => {
    setFaqs((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
    setIsManualJsonEditing(false);
  };

  const handleRemoveFaq = (index: number) => {
    setFaqs((prev) => prev.filter((_, i) => i !== index));
    setIsManualJsonEditing(false);
  };

  const handleAutoDetect = () => {
    const detected = extractFaqs(content);
    if (detected.length > 0) {
      setFaqs(detected);
      setIsManualJsonEditing(false);
    }
  };

  const handleCopySchema = () => {
    navigator.clipboard.writeText(schemaJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInsertFaqMarkdownToArticle = () => {
    const valid = faqs.filter((f) => f.question.trim() && f.answer.trim());
    if (valid.length === 0) return;

    const markdownBlocks = valid.map(
      (f, idx) => `### ${idx + 1}. ${f.question.trim()}\n\n${f.answer.trim()}`
    );

    const fullMarkdown = `\n\n## Frequently Asked Questions\n\n${markdownBlocks.join('\n\n')}\n\n`;

    if (onInsertFaqMarkdown) {
      onInsertFaqMarkdown(fullMarkdown);
      setInsertedMarkdown(true);
      setTimeout(() => setInsertedMarkdown(false), 2500);
    }
  };

  const lineCount = Math.max(schemaJson.split('\n').length, 5);
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1);

  return (
    <div className="space-y-6">
      {/* ─── PART 1: Faq Schema (Code Editor with Line Numbers) ─── */}
      <div className="space-y-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <label className="block text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wide">
              Faq Schema
            </label>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60">
              schema.org/FAQPage
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleCopySchema}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-[var(--bg-card)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:text-[var(--text-main)] transition cursor-pointer"
              title="Copy FAQ Schema JSON-LD"
            >
              {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
              <span>{copied ? 'Copied' : 'Copy Schema'}</span>
            </button>

            {onInsertFaqMarkdown && (
              <button
                type="button"
                onClick={handleInsertFaqMarkdownToArticle}
                disabled={faqs.length === 0}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-xs"
                title="Append FAQs directly to Markdown Article"
              >
                {insertedMarkdown ? <Check size={12} /> : <ArrowDownToLine size={12} />}
                <span>{insertedMarkdown ? 'Appended!' : 'Append FAQs to Post'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Strapi-style Code Editor Box */}
        <div className="rounded-2xl border border-[var(--border-color)] bg-[#1e1e2f] dark:bg-[#151522] overflow-hidden shadow-xs focus-within:border-indigo-500 transition">
          <div className="flex min-h-[160px] max-h-[300px] overflow-y-auto">
            {/* Gutter Line Numbers */}
            <div className="select-none py-3 px-3 text-right text-[11px] font-mono text-slate-500 dark:text-slate-600 bg-[#191928] dark:bg-[#10101b] border-r border-slate-800/80 min-w-[38px]">
              {lineNumbers.map((num) => (
                <div key={num} className="leading-relaxed">
                  {num}
                </div>
              ))}
            </div>

            {/* Editable JSON Area */}
            <textarea
              rows={lineCount}
              value={schemaJson}
              onChange={(e) => {
                setIsManualJsonEditing(true);
                setSchemaJson(e.target.value);
              }}
              className="flex-1 p-3 bg-transparent text-emerald-400 font-mono text-xs leading-relaxed border-0 outline-none resize-none overflow-x-auto whitespace-pre"
            />
          </div>
        </div>
      </div>

      {/* ─── PART 2: FAQ_Blog (Repeatable Component matching Strapi) ─── */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <label className="block text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wide">
              FAQ_Blog ({faqs.length})
            </label>
            <span className="text-[10px] text-[var(--text-muted)]">Repeatable Q&amp;A Items</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleAutoDetect}
              className="flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold cursor-pointer"
              title="Detect Questions and Answers from current content"
            >
              <Sparkles size={12} />
              <span>Auto-detect from Content</span>
            </button>

            <button
              type="button"
              onClick={handleAddFaq}
              className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition cursor-pointer"
            >
              <Plus size={13} />
              <span>Add FAQ</span>
            </button>
          </div>
        </div>

        {/* If No Entries Yet: Strapi-styled Empty State */}
        {faqs.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-[var(--border-color)] bg-[#1e1e2f]/50 dark:bg-[#151522]/50 p-10 flex flex-col items-center justify-center text-center space-y-3">
            <div
              onClick={handleAddFaq}
              className="w-10 h-10 rounded-full bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600 hover:text-white flex items-center justify-center cursor-pointer transition shadow-xs"
            >
              <Plus size={20} />
            </div>
            <p className="text-xs text-[var(--text-muted)] font-medium">
              No entry yet. Click on the button above or plus icon to add one.
            </p>
          </div>
        ) : (
          /* List of FAQ Cards */
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={faq.id || idx}
                className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-4 space-y-3 shadow-xs"
              >
                <div className="flex items-center justify-between gap-2 pb-2 border-b border-[var(--border-subtle)]">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 font-mono text-[10px] font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-bold text-[var(--text-main)]">
                      {faq.question.trim() ? faq.question : `FAQ #${idx + 1}`}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveFaq(idx)}
                    className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition cursor-pointer"
                    title="Remove this FAQ item"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                <div className="space-y-2">
                  <div>
                    <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">
                      Question
                    </label>
                    <input
                      type="text"
                      value={faq.question}
                      onChange={(e) => handleUpdateFaq(idx, 'question', e.target.value)}
                      placeholder="e.g., How does Vercel Blob compare to AWS S3?"
                      className="admin-input text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">
                      Answer
                    </label>
                    <textarea
                      rows={3}
                      value={faq.answer}
                      onChange={(e) => handleUpdateFaq(idx, 'answer', e.target.value)}
                      placeholder="e.g., Vercel Blob provides native edge deployment, automatic public CDN URLs, and zero infrastructure configuration..."
                      className="admin-input text-xs resize-y"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
