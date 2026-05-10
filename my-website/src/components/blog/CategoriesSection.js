export default function CategoriesSection() {
  const categories = [
    { name: "Product", description: "Strategy, roadmaps, and the decisions behind great products." },
    { name: "Engineering", description: "Code, architecture, and the art of building things that last." },
    { name: "Marketing", description: "Growth, SEO, content, and campaigns that actually convert." },
    { name: "Design", description: "UX, systems, and how beautiful interfaces get made." },
    { name: "Startup", description: "Founder stories, fundraising, and surviving the early days." },
    { name: "AI & Tools", description: "The new wave of tools reshaping how we think and work." },
  ];

  return (
    <section className="py-20 px-6 lg:px-16 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-4">Find what clicks with you</h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Browse by topic. Every category is built for a different kind of curious.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categories.map((category, index) => (
            <div key={index} className="p-8 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-blue-100 dark:hover:border-blue-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors group cursor-pointer">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{category.name}</h3>
                <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold rounded-full">
                  12 articles
                </span>
              </div>
              <p className="text-slate-500 dark:text-slate-400">{category.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button className="px-8 py-3 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 border border-slate-200 dark:border-slate-700 rounded-full font-semibold hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
            Explore all categories
          </button>
        </div>
      </div>
    </section>
  );
}
