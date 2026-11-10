import {
  FileCode2,
  ShieldCheck,
  Zap,
  Code2,
  HelpCircle,
  FileCheck2,
} from 'lucide-react';
import JsonLd from '@/components/JsonLd';
import JsonValidatorClient from '@/components/tools/JsonValidatorClient';
import ToolPageHeader from '@/components/tools/ToolPageHeader';
import RelatedTools from '@/components/tools/RelatedTools';
import ToolsFaqAccordion from '@/components/tools/ToolsFaqAccordion';
import { getToolBySlug } from '@/data/toolsData';
import { createToolMetadata } from '@/lib/toolMetadata';
import { getBreadcrumbSchema, getWebApplicationSchema } from '@/lib/schema';
import { siteMetadata } from '@/config/seo';

const tool = getToolBySlug('free-json-validator') || {
  title: 'Free JSON Validator',
  description: 'Validate, format, and compact JSON data in your browser with clear syntax errors. Your data stays on your device.',
  slug: 'free-json-validator',
  route: '/tools/free-json-validator',
  category: 'Developer Tools',
};

export const metadata = createToolMetadata(tool);

export default function JsonValidatorPage() {
  const pageUrl = `${siteMetadata.siteUrl}${tool.route}`;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is my JSON data secure when using this validator?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, 100%. All JSON parsing, validation, and formatting execute entirely client-side inside your web browser. No data, files, or API payloads are ever transmitted or saved on any remote server.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does line and column error tracking work across different browsers?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The validator utilizes a cross-browser error detection engine that parses position offsets from Chrome/Edge (V8) and line/column metrics from Firefox and Safari, accurately identifying syntax errors across all major desktop and mobile browsers.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I upload large JSON files directly from my computer?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Use the Upload button to select any .json, .txt, or text-based file from your device. The browser FileReader API loads and parses the content locally without any network transfer.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does the editor support Tab key indentation?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Pressing the Tab key inside the editor inserts 2 spaces at the caret position without shifting focus away from the input, making code editing and manual fixing effortless.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the most common JSON syntax errors?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Common JSON errors include trailing commas after the last item in an array or object, single quotes instead of double quotes around keys and strings, unquoted property names, and missing brackets.',
        },
      },
    ],
  };

  const faqs = [
    {
      question: 'Is my JSON data secure when using this validator?',
      answer: 'Yes, 100%. All JSON parsing, validation, and formatting execute entirely client-side inside your web browser. No data, files, or API payloads are ever transmitted or saved on any remote server.',
    },
    {
      question: 'How does line and column error tracking work across different browsers?',
      answer: 'The validator utilizes a cross-browser error detection engine that parses position offsets from Chrome/Edge (V8) and line/column metrics from Firefox and Safari, accurately identifying syntax errors across all major desktop and mobile browsers.',
    },
    {
      question: 'Can I upload large JSON files directly from my computer?',
      answer: 'Yes. Use the Upload button to select any .json, .txt, or text-based file from your device. The browser FileReader API loads and parses the content locally without any network transfer.',
    },
    {
      question: 'Does the editor support Tab key indentation?',
      answer: 'Yes. Pressing the Tab key inside the editor inserts 2 spaces at the caret position without shifting focus away from the input, making code editing and manual fixing effortless.',
    },
    {
      question: 'What are the most common JSON syntax errors?',
      answer: 'Common JSON errors include trailing commas after the last item in an array or object, single quotes instead of double quotes around keys and strings, unquoted property names, and missing brackets.',
    },
  ];

  return (
    <main className="min-h-screen overflow-x-hidden bg-[var(--background)] text-[var(--foreground)]">
      {/* Schema Injection */}
      <JsonLd
        data={getBreadcrumbSchema([
          { name: 'Home', url: siteMetadata.siteUrl },
          { name: 'Tools', url: `${siteMetadata.siteUrl}/tools` },
          { name: tool.title, url: pageUrl },
        ])}
      />
      <JsonLd
        data={getWebApplicationSchema({
          name: tool.title,
          description: tool.description,
          url: pageUrl,
          applicationCategory: 'DeveloperApplication',
          operatingSystem: 'All',
          price: '0',
          priceCurrency: 'USD',
        })}
      />
      <JsonLd data={faqSchema} />

      {/* Header */}
      <ToolPageHeader tool={tool} />

      {/* Workspace Section */}
      <section className="px-4 pb-12 sm:px-6 sm:pb-16">
        <JsonValidatorClient />

        {/* Feature Benefits Grid */}
        <div className="mx-auto mt-14 max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 sm:p-7 shadow-[var(--shadow-card)]">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold mb-4 border border-amber-500/20">
              <ShieldCheck size={20} />
            </div>
            <h3 className="text-base font-bold text-[var(--text-heading)] mb-2">
              100% Client-Side Privacy
            </h3>
            <p className="text-sm leading-relaxed text-[var(--text-body)]">
              Your JSON is parsed locally in your browser memory. No data is stored, cached, or transmitted to any server. Safe for API tokens and production configurations.
            </p>
          </div>

          <div className="rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 sm:p-7 shadow-[var(--shadow-card)]">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold mb-4 border border-blue-500/20">
              <Zap size={20} />
            </div>
            <h3 className="text-base font-bold text-[var(--text-heading)] mb-2">
              Cross-Browser Line Error Detection
            </h3>
            <p className="text-sm leading-relaxed text-[var(--text-body)]">
              Pinpoints the exact line number and column of syntax errors across Chrome, Firefox, Safari, and Edge, saving time on deeply nested structures.
            </p>
          </div>

          <div className="rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 sm:p-7 shadow-[var(--shadow-card)]">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold mb-4 border border-emerald-500/20">
              <Code2 size={20} />
            </div>
            <h3 className="text-base font-bold text-[var(--text-heading)] mb-2">
              Pretty Print &amp; Minification
            </h3>
            <p className="text-sm leading-relaxed text-[var(--text-body)]">
              Toggle between human-readable 2-space indented formatting and compact minified JSON for optimized payload delivery and database storage.
            </p>
          </div>
        </div>

        {/* Detailed Guide & Overview */}
        <div className="mx-auto mt-10 max-w-6xl rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 sm:p-9 shadow-[var(--shadow-card)]">
          <div className="mb-4 flex items-center gap-2.5 text-amber-600 dark:text-amber-400">
            <FileCode2 size={22} />
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-heading)]">
              How to Validate, Format, and Fix JSON Online
            </h2>
          </div>
          <div className="space-y-4 text-sm sm:text-base leading-relaxed text-[var(--text-body)]">
            <p>
              JSON (JavaScript Object Notation) is the global standard for modern web APIs, serverless functions, database documents, and configuration files. Even a single syntax error—such as a misplaced comma, an unquoted key, or an unclosed bracket—can break your API build, crash your backend parser, or prevent database ingestion.
            </p>
            <p>
              This free tool lets you paste raw JSON or upload files up to browser limits, instantly validating syntax against the official RFC 8259 specification. If an error is detected, the validator reports the precise line and column coordinate so you can pinpoint the defect without scrolling through thousands of lines.
            </p>
          </div>
        </div>

        {/* Frequently Asked Questions (Centered Dropdown Accordion) */}
        <div className="mx-auto mt-20 max-w-4xl">
          {/* Centered Title with Yellow Question Mark Badge */}
          <div className="mb-10 text-center flex flex-col items-center justify-center">
            <div className="mb-3.5 inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-amber-400/10 px-4 py-1.5 text-xs font-mono font-bold tracking-wider text-amber-400 uppercase shadow-xs">
              <HelpCircle size={15} className="text-amber-400" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-3">
              Common Questions &amp; Answers
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-lg text-center leading-relaxed">
              Click any question below to expand the answer and learn more about client-side validation.
            </p>
          </div>

          {/* Interactive Dropdown Accordion */}
          <ToolsFaqAccordion items={faqs} defaultOpen={null} />
        </div>
      </section>

      {/* Related Tools */}
      <RelatedTools currentSlug={tool.slug} />
      <div className="h-16" />
    </main>
  );
}
