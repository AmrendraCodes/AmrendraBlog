export const metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for AmrendraBlog — how we handle your data and protect your privacy.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      <section className="max-w-3xl mx-auto px-6 py-16">
        <div className="inline-block px-4 py-1.5 mb-6 text-[10px] font-bold tracking-[0.2em] text-blue-600 dark:text-blue-400 uppercase bg-blue-50 dark:bg-blue-900/20 rounded-full">
          Legal
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-slate-50 mb-8 tracking-tight">Privacy Policy</h1>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">Information We Collect</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              We collect information you provide directly, such as your email address when you subscribe to our newsletter 
              or fill out the contact form. We also collect anonymous usage data through analytics to improve the site experience.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">How We Use Your Information</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Your information is used solely to send you newsletter updates, respond to your inquiries, 
              and improve our content and user experience. We never sell or share your personal data with third parties.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">Cookies</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              We use essential cookies to remember your theme preferences and basic analytics cookies to understand 
              how visitors interact with our content. No advertising cookies are used.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">Your Rights</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              You have the right to access, correct, or delete your personal data at any time. 
              You can unsubscribe from the newsletter using the link in any email, or contact us directly.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">Contact</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              If you have any questions about this privacy policy, please reach out via our contact page.
            </p>
          </div>

          <p className="text-sm text-slate-400 dark:text-slate-500 pt-4 border-t border-slate-100 dark:border-slate-800">
            Last updated: May 2026
          </p>
        </div>
      </section>
    </main>
  );
}
