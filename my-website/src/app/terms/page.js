export const metadata = {
  title: "Terms of Service",
  description: "Terms of service for Code with Amrendra — the rules and guidelines for using our site.",
  alternates: {
    canonical: '/terms',
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 md:pb-16 pt-24 md:pt-28">
        <div className="inline-block px-4 py-1.5 mb-6 text-[10px] font-bold tracking-[0.2em] text-[#0B1F3A] dark:text-[#F59E0B] uppercase bg-[#F59E0B]/10 dark:bg-[#F59E0B]/20 rounded-full border border-[#F59E0B]/30">
          Legal
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-slate-50 mb-8 tracking-tight">Terms of Service</h1>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none legal-prose">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">Acceptance of Terms</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              By accessing and using Code with Amrendra, you agree to be bound by these Terms of Service. 
              If you do not agree with any part of these terms, please do not use this website.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">Content Usage</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              All content published on Code with Amrendra is for informational purposes only. 
              You may share and link to our articles with proper attribution. 
              Reproducing full articles without permission is not allowed.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">Disclaimer</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              The information on this blog is provided &ldquo;as is&rdquo; without any warranties. 
              We do our best to provide accurate and up-to-date information, but we make no guarantees 
              about the completeness or accuracy of the content.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">User Conduct</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              When interacting with our site (such as through the contact form or newsletter), 
              you agree not to submit misleading information, spam, or any content that is harmful or illegal.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">Changes to Terms</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              We reserve the right to update these terms at any time. 
              Continued use of the site after changes constitutes acceptance of the new terms.
            </p>
          </div>

          <p className="text-sm text-slate-400 dark:text-slate-500 pt-4 border-t border-slate-100 dark:border-slate-800">
            Last updated: May 2026
          </p>
        </div>
      </section>
    </div>
  );
}
