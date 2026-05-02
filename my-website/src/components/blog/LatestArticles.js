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
    <section className="py-20 px-6 lg:px-16 bg-slate-50 border-t border-slate-100">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Fresh off the press</h2>
          <p className="text-lg text-slate-500">
            The newest additions — explore what we've been writing about.
          </p>
        </div>

        {articles.length > 0 ? (
          <div className="space-y-6 mb-12">
            {articles.map((article, index) => (
              <article key={index} className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{article.title}</h3>
                  <p className="text-sm text-slate-500">{article.meta}</p>
                </div>
                <Link href={article.link} className="text-blue-600 font-semibold hover:text-blue-700 whitespace-nowrap">
                  Read →
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-100 mb-12">
            <p className="text-slate-500">More articles coming soon — bookmark this page.</p>
          </div>
        )}

        <div className="text-center">
          <button className="px-8 py-3 bg-white text-slate-900 border border-slate-200 rounded-full font-semibold hover:bg-slate-50 transition-colors">
            Load more articles
          </button>
        </div>
      </div>
    </section>
  );
}
