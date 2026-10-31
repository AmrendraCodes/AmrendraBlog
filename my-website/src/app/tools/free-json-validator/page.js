import { FileCode2 } from 'lucide-react';
import JsonLd from '@/components/JsonLd';
import JsonValidatorClient from '@/components/tools/JsonValidatorClient';
import ToolPageHeader from '@/components/tools/ToolPageHeader';
import RelatedTools from '@/components/tools/RelatedTools';
import { getToolBySlug } from '@/data/toolsData';
import { createToolMetadata } from '@/lib/toolMetadata';
import { getBreadcrumbSchema, getWebApplicationSchema } from '@/lib/schema';
import { siteMetadata } from '@/config/seo';

const tool = getToolBySlug('free-json-validator');
export const metadata = createToolMetadata(tool);

export default function JsonValidatorPage() {
  const pageUrl = `${siteMetadata.siteUrl}${tool.route}`;
  return (
    <main className="min-h-screen overflow-x-hidden bg-[var(--background)] text-[var(--foreground)]">
      <JsonLd data={getBreadcrumbSchema([
        { name: 'Home', url: siteMetadata.siteUrl },
        { name: 'Tools', url: `${siteMetadata.siteUrl}/tools` },
        { name: tool.title, url: pageUrl },
      ])} />
      <JsonLd data={getWebApplicationSchema({
        name: tool.title,
        description: tool.description,
        url: pageUrl,
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'All',
        price: '0',
        priceCurrency: 'USD',
      })} />
      <ToolPageHeader tool={tool} />
      <section className="px-4 pb-16 sm:px-6 sm:pb-24">
        <JsonValidatorClient />
        <div className="mx-auto mt-12 max-w-3xl rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 sm:p-8">
          <div className="mb-3 flex items-center gap-2 text-amber-600 dark:text-amber-400"><FileCode2 size={18} /><h2 className="font-bold text-[var(--text-heading)]">Validate and format JSON privately</h2></div>
          <p className="text-sm leading-relaxed text-[var(--text-body)]">Paste a JSON object or array to check its syntax as you type. The validator uses your browser&apos;s built-in JSON parser, reports the available error position, and lets you copy or download readable output. Your content stays in the current browser tab.</p>
        </div>
      </section>
      <RelatedTools currentSlug={tool.slug} />
      <div className="h-16" />
    </main>
  );
}
