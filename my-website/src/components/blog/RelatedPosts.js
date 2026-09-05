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
    <section className="pt-5 border-t border-[var(--card-border)]/60">
      <h2 className="text-xl sm:text-2xl font-extrabold text-[var(--text-heading)] mb-4 flex items-center tracking-tight">
        <span className="w-1.5 h-6 bg-[#F59E0B] rounded-full mr-2.5 shadow-xs" />
        Read Next
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/resources/blog/${post.slug}`}
            className="group bg-[var(--section-alt-bg)]/40  border border-white/5 rounded-2xl overflow-hidden hover:border-[#F59E0B]/40   transition-colors duration-200 no-underline flex flex-col relative"
          >
            {/* Image */}
            <div className="relative aspect-video overflow-hidden rounded-t-2xl bg-slate-900">
              <Image
                src={
                  post.image ||
                  "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=800"
                }
                alt={post.title}
                fill
                sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 1024px) 360px, 240px"
                className="object-contain"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              <div className="absolute top-3 left-3 z-10">
                <span className="inline-block px-3 py-1.5 bg-[#F59E0B] backdrop-blur-sm text-[#0B1F3A] text-[10px] font-extrabold uppercase tracking-widest rounded-full shadow-lg">
                  {post.category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col grow">
              <h3 className="text-base font-bold text-[var(--text-heading)] line-clamp-2 group-hover:text-[#F59E0B] transition-colors mb-3 leading-snug">
                {post.title}
              </h3>
              {post.readTime && (
                <span className="text-[12px] text-[var(--text-muted)] font-semibold mt-auto flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
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
