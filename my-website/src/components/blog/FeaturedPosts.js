import Link from 'next/link';

export default function FeaturedPosts() {
  const featured = [
    {
      tag: "Product",
      title: "The quiet shift in how products get built",
      description: "Why the best teams are rethinking roadmaps from the ground up — and what that means for how you ship in 2025.",
      meta: "8 min read · Product Strategy",
      link: "#"
    },
    {
      tag: "Growth",
      title: "SEO is not dead. You're just doing it wrong.",
      description: "A practical breakdown of what actually drives organic traffic in a post-algorithm world.",
      meta: "6 min read · Marketing",
      link: "#"
    },
    {
      tag: "Dev",
      title: "Building fast UIs without the complexity tax",
      description: "Lessons from shipping five production apps in React — with zero regrets about the stack.",
      meta: "10 min read · Engineering",
      link: "#"
    }
  ];

  return (
    <section className="py-20 px-6 lg:px-16 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-4">Hand-picked reads</h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl">
              Our most-loved articles — chosen for depth, clarity, and impact.
            </p>
          </div>
          <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 whitespace-nowrap">
            See all featured →
          </button>
        </div>

        {featured.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featured.map((post, index) => (
              <div key={index} className="bg-white dark:bg-slate-950 rounded-2xl p-8 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
                <span className="inline-block px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-bold rounded-full mb-4 self-start">
                  {post.tag}
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">{post.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-6 flex-grow">{post.description}</p>
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-sm text-slate-400 dark:text-slate-500">{post.meta}</span>
                  <Link href={post.link} className="text-sm font-semibold text-slate-900 dark:text-slate-50 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Read article →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800">
            <p className="text-slate-500 dark:text-slate-400">No featured posts yet — check back soon.</p>
          </div>
        )}
      </div>
    </section>
  );
}
