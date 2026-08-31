import { getPostBySlugAsync, getAllPostsAsync, getRelatedPostsAsync, getPrevNextPostsAsync } from "@/lib/posts";
import { extractTocHeadings } from "@/lib/toc";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import { getBlogPostSchema, getBreadcrumbSchema, getFAQSchema, extractFaqsFromContent } from "@/lib/schema";
import { siteMetadata } from "@/config/seo";
import BlogDetailClient from "@/components/blog/BlogDetailClient";
import ArticleNavigation from "@/components/blog/ArticleNavigation";
import RelatedPosts from "@/components/blog/RelatedPosts";
import AuthorBox from "@/components/blog/AuthorBox";
import BlogFaqAccordion from "@/components/blog/BlogFaqAccordion";
import Breadcrumbs from "@/components/blog/Breadcrumbs";

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;

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
  const postImage = post.image || post.featuredImage || siteMetadata.ogImage;
  const ogAlt = post.ogImageAlt || post.imageAlt || metaTitle;

  return {
    title: metaTitle,
    description: metaDesc,
    alternates: {
      canonical: `/resources/blog/${slug}`,
    },
    openGraph: {
      title: metaTitle,
      description: metaDesc,
      url: `${siteMetadata.siteUrl}/resources/blog/${slug}`,
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
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlugAsync(slug);

  if (!post) {
    notFound();
  }

  const headings = extractTocHeadings(post.content);
  const relatedPosts = await getRelatedPostsAsync(slug, 3);
  const { prev, next } = await getPrevNextPostsAsync(slug);

  const postSchema = getBlogPostSchema({
    title: post.title,
    description: post.description || post.excerpt,
    slug: `resources/blog/${post.slug}`,
    image: post.image,
    datePublished: post.date,
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

  // Prioritize explicit FAQs from Admin CMS (parsed array or JSON string), fallback to markdown extraction
  let parsedDbFaqs = post.faqs;
  if (typeof parsedDbFaqs === 'string') {
    try {
      parsedDbFaqs = JSON.parse(parsedDbFaqs);
    } catch {
      parsedDbFaqs = null;
    }
  }
  const faqs = (Array.isArray(parsedDbFaqs) && parsedDbFaqs.length > 0)
    ? parsedDbFaqs
    : extractFaqsFromContent(post.content);
  const faqSchema = faqs.length > 0 ? getFAQSchema(faqs) : null;

  return (
    <div className="min-h-screen bg-[var(--background)] isolate">
      <JsonLd data={postSchema} />
      <JsonLd data={breadcrumbSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}

      {/* Hero Section */}
      <div className="relative pt-24 pb-4 sm:pt-28 sm:pb-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[350px] bg-[#F59E0B]/8 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8">
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
          <div className="max-w-[860px] mx-auto text-center flex flex-col items-center">
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
            <div className="flex flex-wrap items-center justify-center gap-3 text-[var(--text-body)] text-xs sm:text-sm font-medium mb-5">
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

          {/* Featured Image */}
          <div className="max-w-[860px] mx-auto relative aspect-video rounded-2xl overflow-hidden shadow-xl border border-[var(--card-border)] group bg-slate-900">
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
              sizes="(max-width: 1200px) 100vw, 860px"
              className="absolute inset-0 object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
            />
          </div>
        </div>
      </div>


      {/* Blog Detail Client (TOC Sidebar + Content) */}
      <BlogDetailClient
        content={post.content}
        headings={headings}
        title={post.title}
        slug={post.slug}
      />

      {/* Bottom Sections */}
      <div className="max-w-[860px] mx-auto px-4 sm:px-6 pb-12 space-y-6 sm:space-y-7">
        {/* FAQ Accordion Section */}
        {faqs && faqs.length > 0 && (
          <BlogFaqAccordion faqs={faqs} />
        )}

        <AuthorBox author={post.author} />
        <ArticleNavigation prev={prev} next={next} />
        <RelatedPosts posts={relatedPosts} />
      </div>

    </div>
  );
}
