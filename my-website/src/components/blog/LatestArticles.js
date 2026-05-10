import Link from 'next/link';

export default function LatestArticles() {
  const articles = [
    {
      title: "Why your onboarding is quietly killing retention",
      meta: "Design · 5 min · April 14, 2025",
      link: "#"
    },
    {
      title: "Monorepos: the case for and the case against",
      meta: "Engineering · 9 min · April 10, 2025",
      link: "#"
    },
    {
      title: "The founder's guide to saying no gracefully",
      meta: "Startup · 4 min · April 7, 2025",
      link: "#"
    }
  ];

  return (
    <section className="py-20 px-6 lg:px-16 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-4">Fresh off the press</h2>
          <p className="text-lg text-slate-500 dark:text-slate-400">
            The newest additions — explore what we've been writing about.
          </p>
        </div>

        {articles.length > 0 ? (
          <div className="space-y-6 mb-12">
            {articles.map((article, index) => (
              <article key={index} className="p-6 bg-white dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-2">{article.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{article.meta}</p>
                </div>
                <Link href={article.link} className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 whitespace-nowrap">
                  Read →
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800 mb-12">
            <p className="text-slate-500 dark:text-slate-400">More articles coming soon — bookmark this page.</p>
          </div>
        )}

        <div className="text-center">
          <button className="px-8 py-3 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 border border-slate-200 dark:border-slate-800 rounded-full font-semibold hover:bg-slate-50 dark:bg-slate-900 transition-colors">
            Load more articles
          </button>
        </div>
      </div>
    </section>
  );
}
