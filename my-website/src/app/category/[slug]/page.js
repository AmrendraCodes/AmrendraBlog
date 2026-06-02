import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import BlogCard from '@/components/BlogCard';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const formattedName = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const posts = getAllPosts().filter(
    (p) => (p.categorySlug || '').toLowerCase() === slug.toLowerCase()
  );

  // Use the first post's image as the category OG image, fallback to default
  const ogImage = posts.length > 0 ? posts[0].image : '/images/og-default.png';
  const title = `${formattedName} Articles | AmrendraBlog`;
  const description = `Browse all articles about ${formattedName} on AmrendraBlog.`;

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
          alt: `${formattedName} — AmrendraBlog`,
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
  const posts = getAllPosts().filter(
    (p) => (p.categorySlug || '').toLowerCase() === slug.toLowerCase()
  );

  const formattedName = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-12">
          <Link href="/categories" className="text-blue-600 hover:text-blue-700 text-sm font-semibold mb-4 inline-flex items-center gap-2 transition-colors">
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
            <Link href="/blog" className="px-8 py-3.5 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition-colors inline-flex items-center">
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
    </main>
  );
}
