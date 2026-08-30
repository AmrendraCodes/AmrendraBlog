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

  // Prioritize explicit FAQs from Admin CMS, fallback to markdown extraction
  const faqs = (post.faqs && Array.isArray(post.faqs) && post.faqs.length > 0)
    ? post.faqs
    : extractFaqsFromContent(post.content);
  const faqSchema = faqs.length > 0 ? getFAQSchema(faqs) : null;

  return (
    <div className="min-h-screen bg-[var(--background)] isolate">
      <JsonLd data={postSchema} />
      <JsonLd data={breadcrumbSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}

      {/* Hero Section */}
      <div className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] bg-[#F59E0B]/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-[900px] mx-auto text-center flex flex-col items-center">
            
            {/* Back to Blog Link */}
            <Link
              href="/resources/blog"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-muted)] hover:text-[#F59E0B] transition-colors mb-6 no-underline"
            >
              <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
              Back to all articles
            </Link>

            {/* Category Badge */}
            <div className="mb-6">
              <Link
                href={`/category/${post.categorySlug}`}
                className="bg-[#F59E0B]/10 backdrop-blur-md border border-[#F59E0B]/30 text-[#0B1F3A] dark:text-[#F59E0B] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm hover:bg-[#F59E0B]/20 hover:border-[#F59E0B]/50 transition-all no-underline"
              >
                {post.category}
              </Link>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-extrabold text-[var(--text-heading)] tracking-tight leading-[1.1] mb-6 drop-shadow-sm">
              {post.title}
            </h1>

            {/* Description */}
            {post.description && (
              <p className="text-lg sm:text-xl text-[var(--text-body)] max-w-2xl mb-10 leading-relaxed">
                {post.description}
              </p>
            )}

            {/* Meta */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-[var(--text-body)] text-sm font-medium mb-12">
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full">
                <Image
                  src={siteMetadata.profileImage}
                  alt={post.author}
                  width={24}
                  height={24}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="font-semibold text-[var(--text-heading)]">{post.author}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full">
                <Calendar size={16} className="text-[#F59E0B]" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full">
                <Clock size={16} className="text-[#F59E0B]" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="max-w-[900px] mx-auto relative aspect-video rounded-3xl overflow-hidden shadow-2xl shadow-[#0B1F3A]/20 border border-white/10 group mt-4">
            <Image
              src={
                post.image ||
                "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1200"
              }
              alt={post.title}
              fill
              priority
              sizes="(max-width: 1400px) 100vw, 1400px"
              className="absolute inset-0 object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>
        </div>
      </div>


      {/* Blog Detail Client */}
      <BlogDetailClient
        content={post.content}
        headings={headings}
        title={post.title}
        slug={post.slug}
      />

      {/* FAQ Accordion Section */}
      {faqs && faqs.length > 0 && (
        <div className="max-w-[900px] mx-auto px-4 sm:px-6">
          <BlogFaqAccordion faqs={faqs} />
        </div>
      )}

      {/* Bottom Sections */}
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 pb-16">
        <AuthorBox author={post.author} />
        <ArticleNavigation prev={prev} next={next} />
        <div className="mt-20">
          <RelatedPosts posts={relatedPosts} />
        </div>
      </div>

    </div>
  );
}
