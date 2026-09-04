import { getPostBySlugAsync, getAllPostsAsync, getRelatedPostsAsync, getPrevNextPostsAsync } from "@/lib/posts";
import { extractTocHeadings } from "@/lib/toc";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import { cleanMarkdownText, getBlogPostSchema, getBreadcrumbSchema, getFAQSchema, extractFaqsFromContent } from "@/lib/schema";
import { siteMetadata } from "@/config/seo";
import BlogDetailClient from "@/components/blog/BlogDetailClient";
import ArticleNavigation from "@/components/blog/ArticleNavigation";
import RelatedPosts from "@/components/blog/RelatedPosts";
import AuthorBox from "@/components/blog/AuthorBox";
import BlogFaqAccordion from "@/components/blog/BlogFaqAccordion";
import Breadcrumbs from "@/components/blog/Breadcrumbs";

export const dynamicParams = true;
// Published articles are static/ISR pages. This removes the database request
// from the critical path for readers while keeping content fresh within 5 min.
export const revalidate = 300;

export async function generateStaticParams() {
  const posts = await getAllPostsAsync();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlugAsync(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  const metaTitle = post.metaTitle || post.title || 'Blog Article | Code with Amrendra';
  const metaDesc = post.metaDescription || post.description || post.excerpt || siteMetadata.description;
  const canonicalUrl = post.canonicalUrl || `${siteMetadata.siteUrl}/resources/blog/${slug}`;
  const postImage = post.ogImage || post.image || post.featuredImage || siteMetadata.ogImage;
  const ogAlt = post.ogImageAlt || post.imageAlt || metaTitle;

  return {
    title: metaTitle,
    description: metaDesc,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: metaTitle,
      description: metaDesc,
      url: canonicalUrl,
      type: "article",
      publishedTime: post.date,
      authors: [post.author || siteMetadata.author],
      tags: post.tags,
      images: [
        {
          url: postImage,
          width: 1200,
          height: 630,
          alt: ogAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDesc,
      images: [postImage],
      creator: siteMetadata.social.twitter,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlugAsync(slug);

  if (!post) {
    notFound();
  }

  const canonicalUrl = post.canonicalUrl || `${siteMetadata.siteUrl}/resources/blog/${slug}`;
  const headings = extractTocHeadings(post.content);
  const relatedPosts = await getRelatedPostsAsync(slug, 3);
  const { prev, next } = await getPrevNextPostsAsync(slug);

  const postSchema = getBlogPostSchema({
    title: post.title,
    description: post.description || post.excerpt,
    slug: post.slug,
    image: post.image,
    datePublished: post.date,
    dateModified: post.updatedAt || post.publishedAt || post.date,
    canonicalUrl,
    author: post.author,
    category: post.category,
    wordCount: post.wordCount,
    tags: post.tags,
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: siteMetadata.siteUrl },
    { name: "Resources", url: `${siteMetadata.siteUrl}/resources` },
    { name: "Blog", url: `${siteMetadata.siteUrl}/resources/blog` },
    {
      name: post.title,
      url: `${siteMetadata.siteUrl}/resources/blog/${post.slug}`,
    },
  ]);

  // CMS FAQs are authoritative. Markdown extraction only supports older posts
  // and is not rendered again as a duplicate accordion.
  const cmsFaqs = Array.isArray(post.faqs) ? post.faqs : [];
  const markdownFaqs = extractFaqsFromContent(post.content);
  const faqs = cmsFaqs.length > 0 ? cmsFaqs : markdownFaqs;
  const faqKey = (faq) => `${cleanMarkdownText(faq.question).toLowerCase()}|${cleanMarkdownText(faq.answer)}`;
  const markdownFaqKeys = new Set(markdownFaqs.map(faqKey));
  const visibleFaqs = cmsFaqs.filter((faq) => !markdownFaqKeys.has(faqKey(faq)));
  const faqSchema = getFAQSchema(faqs);

  return (
    <div className="min-h-screen bg-[var(--background)] isolate">
      <JsonLd data={postSchema} />
      <JsonLd data={breadcrumbSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}

      {/* Hero Section — max-w-7xl centered container */}
      <div className="relative pt-24 pb-4 sm:pt-28 sm:pb-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[350px] bg-[#F59E0B]/8 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-[760px] mx-auto">
            {/* Breadcrumb Trail & Back Link */}
            <div className="flex items-center justify-between gap-4 mb-5 flex-wrap">
              <Breadcrumbs
                items={[
                  { label: "Home", href: "/" },
                  { label: "Resources", href: "/resources" },
                  { label: "Blog", href: "/resources/blog" },
                  { label: post.category || "Article", href: post.categorySlug ? `/category/${post.categorySlug}` : undefined },
                ]}
              />
              <Link
                href="/resources/blog"
                className="group inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--text-muted)] hover:text-[#F59E0B] transition-colors no-underline"
              >
                <ArrowLeft size={14} className="transition-transform duration-200 group-hover:-translate-x-1" />
                All articles
              </Link>
            </div>

            {/* Article Header Content */}
            <div className="text-center flex flex-col items-center mb-6">
              {/* Category Badge */}
              <div className="mb-3.5">
                <Link
                  href={`/category/${post.categorySlug}`}
                  className="bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-[#0B1F3A] dark:text-[#F59E0B] text-xs font-extrabold px-3.5 py-1 rounded-full uppercase tracking-wider shadow-xs hover:bg-[#F59E0B]/20 transition-all no-underline"
                >
                  {post.category}
                </Link>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[var(--text-heading)] tracking-tight leading-[1.18] mb-3.5">
                {post.title}
              </h1>

              {/* Description */}
              {post.description && (
                <p className="text-base sm:text-lg text-[var(--text-body)] max-w-2xl mx-auto mb-4 leading-relaxed">
                  {post.description}
                </p>
              )}

              {/* Meta Pill Row */}
              <div className="flex flex-wrap items-center justify-center gap-3 text-[var(--text-body)] text-xs sm:text-sm font-medium">
                <div className="flex items-center gap-2 bg-[var(--section-alt-bg)]/80 border border-[var(--card-border)] px-3.5 py-1.5 rounded-full shadow-xs">
                  <Image
                    src={siteMetadata.profileImage}
                    alt={post.author || "Amrendra Kumar"}
                    width={22}
                    height={22}
                    className="w-5 h-5 rounded-full object-cover"
                  />
                  <span className="font-semibold text-[var(--text-heading)]">{post.author || "Amrendra Kumar"}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-[var(--section-alt-bg)]/80 border border-[var(--card-border)] px-3 py-1.5 rounded-full shadow-xs">
                  <Calendar size={14} className="text-[#F59E0B]" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-[var(--section-alt-bg)]/80 border border-[var(--card-border)] px-3 py-1.5 rounded-full shadow-xs">
                  <Clock size={14} className="text-[#F59E0B]" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>

            {/* Featured Image — Exactly aligned with the 760px article width */}
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl border border-[var(--card-border)] group bg-slate-900">
              <Image
                src={
                  post.image ||
                  "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1200"
                }
                alt={post.title}
                fill
                priority
                unoptimized={Boolean(
                  post.image && (post.image.includes('blob.vercel-storage.com') || post.image.includes('vercel-storage.com'))
                )}
                sizes="(max-width: 768px) 100vw, 760px"
                className="absolute inset-0 object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Blog Detail Client (TOC Sidebar + Content + Bottom Sections) */}
      <BlogDetailClient
        content={post.content}
        headings={headings}
        title={post.title}
        slug={post.slug}
      >
        {/* FAQ Accordion Section */}
        {visibleFaqs.length > 0 && (
          <BlogFaqAccordion faqs={visibleFaqs} />
        )}

        <AuthorBox author={post.author} />
        <ArticleNavigation prev={prev} next={next} />
        <RelatedPosts posts={relatedPosts} />
      </BlogDetailClient>

    </div>
  );
}
