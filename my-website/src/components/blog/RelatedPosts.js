import Link from "next/link";
import Image from "next/image";

/**
 * RelatedPosts — Grid of related posts based on matching category and tags.
 *
 * @param {{ posts: Array<{title,slug,image,category,readTime,excerpt}> }} props
 */
export default function RelatedPosts({ posts }) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="mt-16 pt-10 border-t border-[var(--card-border)]">
      <h2 className="text-2xl font-extrabold text-[var(--text-heading)] mb-8 flex items-center">
        <span className="w-2 h-7 bg-[#6366F1] rounded-full mr-3" />
        Related Articles
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group bg-[var(--section-alt-bg)] border border-[var(--card-border)] rounded-xl overflow-hidden hover:border-[#6366F1]/30 hover:shadow-lg transition-all duration-300 no-underline flex flex-col"
          >
            {/* Image */}
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={
                  post.image ||
                  "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=800"
                }
                alt={post.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3">
                <span className="inline-block px-2.5 py-1 bg-[#6366F1] text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
                  {post.category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col grow">
              <h3 className="text-sm font-bold text-[var(--text-heading)] line-clamp-2 group-hover:text-[#6366F1] dark:group-hover:text-[#818CF8] transition-colors mb-2 leading-snug">
                {post.title}
              </h3>
              {post.readTime && (
                <span className="text-[11px] text-[var(--text-muted)] font-medium mt-auto">
                  {post.readTime}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
