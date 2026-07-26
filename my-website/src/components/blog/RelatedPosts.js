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
    <section className="mt-16 pt-10 border-t border-[var(--card-border)]/50">
      <h2 className="text-3xl font-extrabold text-[var(--text-heading)] mb-10 flex items-center tracking-tight">
        <span className="w-2.5 h-8 bg-gradient-to-b from-[#10B981] to-[#34D399] rounded-full mr-4 shadow-sm" />
        Read Next
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group bg-[var(--section-alt-bg)]/40 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden hover:border-[#10B981]/40 hover:shadow-2xl hover:shadow-[#10B981]/5 transition-all duration-300 no-underline flex flex-col relative"
          >
            {/* Image */}
            <div className="relative aspect-[16/10] overflow-hidden rounded-t-2xl">
              <Image
                src={
                  post.image ||
                  "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=800"
                }
                alt={post.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-3 left-3 z-10">
                <span className="inline-block px-3 py-1.5 bg-[#10B981]/90 backdrop-blur-sm text-white text-[10px] font-extrabold uppercase tracking-widest rounded-full shadow-lg">
                  {post.category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col grow">
              <h3 className="text-base font-bold text-[var(--text-heading)] line-clamp-2 group-hover:text-[#34D399] transition-colors mb-3 leading-snug">
                {post.title}
              </h3>
              {post.readTime && (
                <span className="text-[12px] text-[var(--text-muted)] font-semibold mt-auto flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
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
