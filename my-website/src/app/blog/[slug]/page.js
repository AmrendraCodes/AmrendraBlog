import { getPostBySlug, getAllPosts, getRelatedPosts, getPrevNextPosts } from "@/lib/posts";
import { extractTocHeadings } from "@/lib/toc";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, User } from "lucide-react";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import { getBlogPostSchema, getBreadcrumbSchema } from "@/lib/schema";
import { siteMetadata } from "@/config/seo";
import BlogDetailClient from "@/components/blog/BlogDetailClient";
import Breadcrumbs from "@/components/blog/Breadcrumbs";
import ArticleNavigation from "@/components/blog/ArticleNavigation";
import RelatedPosts from "@/components/blog/RelatedPosts";
import AuthorBox from "@/components/blog/AuthorBox";

/**
 * Generate static params for all blog posts at build time.
 */
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

/**
 * Generate metadata for SEO.
 */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title,
    description: post.description || post.excerpt,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description || post.excerpt,
      url: `${siteMetadata.siteUrl}/blog/${slug}`,
      type: "article",
      publishedTime: post.date,
      authors: [post.author || siteMetadata.author],
      tags: post.tags,
      images: [
        {
          url: post.image || siteMetadata.ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description || post.excerpt,
      images: [post.image || siteMetadata.ogImage],
      creator: siteMetadata.social.twitter,
    },
  };
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Extract TOC headings from content
  const headings = extractTocHeadings(post.content);

  // Get related posts and prev/next navigation
  const relatedPosts = getRelatedPosts(slug, 3);
  const { prev, next } = getPrevNextPosts(slug);

  // Schema data
  const postSchema = getBlogPostSchema({
    title: post.title,
    description: post.description || post.excerpt,
    slug: post.slug,
    image: post.image,
    datePublished: post.date,
    category: post.category,
    wordCount: post.wordCount,
    tags: post.tags,
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: siteMetadata.siteUrl },
    { name: "Blog", url: `${siteMetadata.siteUrl}/blog` },
    {
      name: post.title,
      url: `${siteMetadata.siteUrl}/blog/${post.slug}`,
    },
  ]);

  return (
    <main className="min-h-screen bg-[var(--background)] isolate">
      <JsonLd data={postSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* ─── Hero Section ─── */}
      <div className="relative h-[60vh] min-h-[480px] md:h-[55vh] overflow-hidden">
        <Image
          src={
            post.image ||
            "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1200"
          }
          alt={post.title}
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/60 to-[var(--background)]/20" />

        <div className="relative h-full max-w-4xl mx-auto px-4 sm:px-6 flex flex-col justify-end pb-10 pt-32 md:pt-28">
          {/* Breadcrumbs */}
          <div className="mb-6">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Blog", href: "/blog" },
                { label: post.title },
              ]}
            />
          </div>

          {/* Category Badge */}
          <div className="flex items-center space-x-3 mb-5">
            <Link
              href={`/category/${post.categorySlug}`}
              className="bg-[#6366F1] text-white text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg shadow-indigo-500/20 hover:bg-[#818CF8] transition-colors no-underline"
            >
              {post.category}
            </Link>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-[var(--text-heading)] tracking-tight leading-[1.12] mb-4">
            {post.title}
          </h1>

          {/* Description */}
          {post.description && (
            <p className="text-lg text-[var(--text-body)] max-w-2xl mb-6 leading-relaxed">
              {post.description}
            </p>
          )}

          {/* Meta: Author, Date, Reading Time */}
          <div className="flex flex-wrap items-center gap-5 text-[var(--text-body)] text-sm font-medium border-t border-[var(--card-border)]/50 pt-6">
            <div className="flex items-center gap-2">
              <Image
                src={siteMetadata.profileImage}
                alt={post.author}
                width={28}
                height={28}
                className="w-7 h-7 rounded-full object-cover ring-2 ring-[var(--background)]"
              />
              <span className="font-semibold">{post.author}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar size={15} className="text-[var(--text-muted)]" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={15} className="text-[var(--text-muted)]" />
              <span>{post.readTime}</span>
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="hidden sm:flex items-center gap-2 ml-auto">
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] bg-[var(--background)]/50 backdrop-blur-sm border border-[var(--card-border)]/50 px-2.5 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ─── Blog Detail Client (Content + TOC + Progress + BackToTop) ─── */}
      <BlogDetailClient
        content={post.content}
        headings={headings}
        title={post.title}
        slug={post.slug}
      />

      {/* ─── Bottom Sections (Server Rendered) ─── */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
        {/* Author Box */}
        <AuthorBox author={post.author} />

        {/* Related Posts */}
        <RelatedPosts posts={relatedPosts} />

        {/* Previous / Next Navigation */}
        <ArticleNavigation prev={prev} next={next} />
      </div>
    </main>
  );
}
