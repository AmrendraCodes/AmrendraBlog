export default function CTABanner() {
  return (
    <section className="py-20 px-6 lg:px-16 bg-blue-600 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-4">Still exploring? We've got more.</h2>
        <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
          Use our search to find articles on exactly what you need — or let a category surprise you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-white text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition-colors">
            Search articles
          </button>
          <button className="px-8 py-4 bg-blue-700 text-white border border-blue-500 rounded-full font-semibold hover:bg-blue-800 transition-colors">
            Surprise me →
          </button>
        </div>
      </div>
    </section>
  );
}
