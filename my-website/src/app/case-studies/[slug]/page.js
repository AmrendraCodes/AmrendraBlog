import { getCaseStudyBySlug, getAllCaseStudies } from "@/lib/case-studies";
import { siteMetadata } from "@/config/seo";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github, Clock, User, Briefcase } from "lucide-react";
import { notFound } from "next/navigation";
import MarkdownRenderer from "@/components/MarkdownRenderer";

/**
 * Generate static params for all case studies at build time.
 */
export async function generateStaticParams() {
  const caseStudies = getAllCaseStudies();
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

/**
 * Generate metadata for SEO.
 */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    return { title: "Case Study Not Found" };
  }

  return {
    title: `${study.title} — Case Study`,
    description: study.description,
    alternates: {
      canonical: `/case-studies/${slug}`,
    },
    openGraph: {
      title: `${study.title} — Case Study`,
      description: study.description,
      url: `${siteMetadata.siteUrl}/case-studies/${slug}`,
      type: "article",
      publishedTime: study.publishedAt,
      authors: [siteMetadata.author],
      images: [
        {
          url: study.coverImage || siteMetadata.ogImage,
          width: 1200,
          height: 630,
          alt: study.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${study.title} — Case Study`,
      description: study.description,
      images: [study.coverImage || siteMetadata.ogImage],
      creator: siteMetadata.social.twitter,
    },
  };
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[var(--background)] isolate">
      {/* ─── Hero Section ─── */}
      <div className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] bg-[#6366F1]/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-[900px] mx-auto text-center flex flex-col items-center">

            {/* Back Link */}
            <Link
              href="/case-studies"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-muted)] hover:text-[#6366F1] dark:hover:text-[#818CF8] transition-colors mb-8 no-underline"
            >
              <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
              Back to all case studies
            </Link>

            {/* Metric Badge */}
            {study.metricHighlight && (
              <div className="mb-6">
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#6366F1] to-[#a855f7] text-white text-xs font-bold tracking-wider shadow-lg shadow-[#6366F1]/25">
                  {study.metricHighlight}
                </span>
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-extrabold text-[var(--text-heading)] tracking-tight leading-[1.1] mb-6 drop-shadow-sm">
              {study.title}
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-[var(--text-body)] max-w-2xl mb-10 leading-relaxed">
              {study.description}
            </p>

            {/* Meta Pills */}
            <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-medium mb-8">
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-[var(--text-body)]">
                <User size={16} className="text-[#818CF8]" />
                <span>{study.role}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-[var(--text-body)]">
                <Briefcase size={16} className="text-[#818CF8]" />
                <span>{study.client}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-[var(--text-body)]">
                <Clock size={16} className="text-[#818CF8]" />
                <span>{study.duration}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
              {study.liveUrl && (
                <a
                  href={study.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-br from-[#6366F1] to-[#a855f7] text-white font-bold text-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(99,102,241,0.4)] no-underline"
                >
                  <ExternalLink size={16} />
                  View Live
                </a>
              )}
              {study.githubUrl && (
                <a
                  href={study.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--foreground)] font-bold text-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#6366F1]/30 hover:shadow-lg no-underline"
                >
                  <Github size={16} />
                  Source Code
                </a>
              )}
            </div>
          </div>

          {/* Cover Image */}
          <div className="max-w-[900px] mx-auto relative aspect-video rounded-3xl overflow-hidden shadow-2xl shadow-[#6366F1]/10 border border-white/10 group mt-4">
            <Image
              src={study.coverImage}
              alt={study.title}
              fill
              priority
              sizes="(max-width: 1400px) 100vw, 1400px"
              className="absolute inset-0 object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/80 via-transparent to-transparent opacity-60" />
          </div>
        </div>
      </div>

      {/* ─── Content + Sidebar ─── */}
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <article className="flex-1 min-w-0">
            <div className="prose prose-lg dark:prose-invert max-w-none
              prose-headings:text-[var(--text-heading)] prose-headings:font-extrabold prose-headings:tracking-tight
              prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:pb-4 prose-h2:border-b prose-h2:border-[var(--card-border)]
              prose-p:text-[var(--text-body)] prose-p:leading-relaxed
              prose-strong:text-[var(--text-heading)]
              prose-a:text-[#6366F1] dark:prose-a:text-[#818CF8] prose-a:font-semibold
              prose-code:text-[#818CF8] prose-code:bg-[#6366F1]/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm prose-code:font-semibold
              prose-pre:bg-[#111214] prose-pre:border prose-pre:border-[var(--card-border)] prose-pre:rounded-2xl
              prose-li:text-[var(--text-body)]
              prose-blockquote:border-l-[#6366F1] prose-blockquote:bg-[#6366F1]/5 prose-blockquote:rounded-r-xl prose-blockquote:py-2 prose-blockquote:px-6
            ">
              <MarkdownRenderer content={study.content} />
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:w-80 shrink-0">
            <div className="lg:sticky lg:top-28 space-y-6">
              {/* Tech Stack */}
              <div className="bg-[var(--card-bg)] rounded-2xl border border-[var(--card-border)] p-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--text-muted)] mb-4">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {study.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-full text-sm font-semibold bg-[#6366F1]/10 dark:bg-[#6366F1]/15 text-[#6366F1] dark:text-[#818CF8] border border-[#6366F1]/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Metric Highlight */}
              {study.metricHighlight && (
                <div className="bg-gradient-to-br from-[#6366F1]/10 to-[#a855f7]/10 rounded-2xl border border-[#6366F1]/20 p-6 text-center">
                  <p className="text-sm font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">
                    Key Result
                  </p>
                  <p className="text-3xl font-extrabold gradient-text">
                    {study.metricHighlight}
                  </p>
                </div>
              )}

              {/* Project Info */}
              <div className="bg-[var(--card-bg)] rounded-2xl border border-[var(--card-border)] p-6 space-y-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">Client</p>
                  <p className="text-sm font-semibold text-[var(--text-heading)]">{study.client}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">Role</p>
                  <p className="text-sm font-semibold text-[var(--text-heading)]">{study.role}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">Duration</p>
                  <p className="text-sm font-semibold text-[var(--text-heading)]">{study.duration}</p>
                </div>
              </div>

              {/* Back Link */}
              <Link
                href="/case-studies"
                className="group flex items-center justify-center gap-2 w-full px-6 py-3 rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--foreground)] font-bold text-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#6366F1]/30 hover:shadow-lg no-underline"
              >
                <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
                All Case Studies
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
