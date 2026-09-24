import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostSummariesAsync } from '@/lib/posts';
import BlogCard from '@/components/BlogCard';
import JsonLd from '@/components/JsonLd';
import { getCollectionPageSchema, getBreadcrumbSchema } from '@/lib/schema';

// Pre-render the known categories and refresh them periodically. New
// categories can still be generated on their first request.
export const revalidate = 300;

const categoryMetadata = {
  'ai-agents': {
    title: 'AI Agents Articles | Code with Amrendra',
    description: 'Articles on AI agents: how they work, their cost, and how they are changing software and business workflows.',
  },
  'aws-infrastructure': {
    title: 'AWS Infrastructure Articles | Code with Amrendra',
    description: 'AWS infrastructure articles covering cloud setup, scalability, cost optimization, and DevOps best practices.',
  },
  development: {
    title: 'Development Articles | Code with Amrendra',
    description: 'Development articles covering web development, architecture, and practical coding guides for 2026.',
  },
  devops: {
    title: 'DevOps Articles | Code with Amrendra',
    description: 'DevOps articles on CI/CD, cloud infrastructure, Docker, Kubernetes, and scalable deployment practices.',
  },
  'frontend-development': {
    title: 'Frontend Development Articles | Code with Amrendra',
    description: 'Frontend development articles on React, JavaScript, performance, and building fast, modern web interfaces.',
  },
  react: {
    title: 'React Articles | Code with Amrendra',
    description: 'React articles covering hooks, performance, architecture, and real-world tips for building better apps.',
  },
  'saas-architecture': {
    title: 'SaaS Architecture Articles | Code with Amrendra',
    description: 'SaaS architecture articles on scalability, multi-tenancy, and building software products that grow.',
  },
};

export async function generateStaticParams() {
  const posts = await getPostSummariesAsync();
  const categorySlugs = [...new Set(posts.map((post) => post.categorySlug).filter(Boolean))];

  return categorySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const formattedName = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const allPosts = await getPostSummariesAsync();
  const posts = allPosts.filter(
    (p) => (p.categorySlug || '').toLowerCase() === slug.toLowerCase()
  );

  // Use the first post's image as the category OG image, fallback to default
  const ogImage = (posts.length > 0 && posts[0]?.image) ? posts[0].image : '/images/og-default.png';
  const customMetadata = categoryMetadata[slug.toLowerCase()];
  const title = customMetadata?.title || `${formattedName} Articles | Code with Amrendra`;
  const description = customMetadata?.description || `Browse all articles and resources about ${formattedName} on Code with Amrendra.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/category/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `/category/${slug}`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${formattedName} — Code with Amrendra`,
        },
      ],
    },
    twitter: {
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const allPosts = await getPostSummariesAsync();
  const posts = allPosts.filter(
    (p) => (p.categorySlug || '').toLowerCase() === slug.toLowerCase()
  );

  if (posts.length === 0) {
    notFound();
  }

  const formattedName = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  const categorySchema = getCollectionPageSchema({
    name: `${formattedName} Articles`,
    description: `Articles related to ${formattedName}`,
    url: `https://www.codewithamrendra.in/category/${slug}`,
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "https://www.codewithamrendra.in" },
    { name: "Categories", url: "https://www.codewithamrendra.in/categories" },
    {
      name: formattedName,
      url: `https://www.codewithamrendra.in/category/${slug}`,
    },
  ]);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <JsonLd data={categorySchema} />
      <JsonLd data={breadcrumbSchema} />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 md:pt-28 md:pb-16">
        <div className="mb-12">
          <Link href="/categories" className="text-[#0B1F3A] hover:text-[#F59E0B] dark:text-[#F59E0B] text-sm font-semibold mb-4 inline-flex items-center gap-2 transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            All Categories
          </Link>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-slate-50 tracking-tight mt-4">
            {formattedName}
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 mt-3">
            {posts.length} {posts.length === 1 ? 'article' : 'articles'} found
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-slate-500 dark:text-slate-400 mb-6">No articles found in this category yet.</p>
            <Link href="/resources/blog" className="px-8 py-3.5 bg-[#F59E0B] text-[#0B1F3A] font-bold rounded-full hover:bg-[#D97706] transition-colors inline-flex items-center shadow-md">
              Browse All Articles
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
