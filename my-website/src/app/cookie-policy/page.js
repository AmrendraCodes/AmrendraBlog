import Link from "next/link";
import { 
  Cookie, 
  ShieldCheck, 
  Sliders, 
  Layers, 
  CheckCircle2, 
  Globe, 
  RefreshCw, 
  Mail, 
  ArrowRight, 
  Clock, 
  ChevronRight,
  FileText
} from "lucide-react";
import JsonLd from "@/components/JsonLd";
import { getBreadcrumbSchema } from "@/lib/schema";
import { siteMetadata } from "@/config/seo";
import ManageCookiesButton from "./ManageCookiesButton";

export const metadata = {
  title: "Cookie Policy",
  description: "Learn how Code with Amrendra uses cookies and similar technologies on our website, how we protect your privacy, and how you can manage your preferences.",
  alternates: {
    canonical: "/cookie-policy",
  },
  openGraph: {
    title: "Cookie Policy | Code with Amrendra",
    description: "This Cookie Policy explains how Code with Amrendra uses cookies and similar technologies on our website.",
    url: `${siteMetadata.siteUrl}/cookie-policy`,
    type: "website",
  },
};

export default function CookiePolicyPage() {
  const pageUrl = `${siteMetadata.siteUrl}/cookie-policy`;

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Cookie Policy | Code with Amrendra",
    description: "This Cookie Policy explains how Code with Amrendra uses cookies and similar technologies on our website.",
    url: pageUrl,
    publisher: {
      "@type": "Organization",
      name: "Code with Amrendra",
      url: siteMetadata.siteUrl,
    },
  };

  return (
    <div className="min-h-screen bg-[#060a12] text-slate-100 selection:bg-emerald-500/25 selection:text-emerald-200">
      <JsonLd data={getBreadcrumbSchema([
        { name: "Home", url: siteMetadata.siteUrl },
        { name: "Cookie Policy", url: pageUrl },
      ])} />
      <JsonLd data={webPageSchema} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-20">
        
        {/* ─── 1. TOP HEADER ─── */}
        <header className="mb-10 sm:mb-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <Link 
              href="/"
              className="inline-flex items-center gap-2.5 text-sm font-semibold text-white hover:text-emerald-400 transition-colors group no-underline"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                <Cookie size={16} />
              </div>
              <span className="tracking-tight font-bold">Code with Amrendra</span>
            </Link>
          </div>

          <nav aria-label="Quick Navigation" className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm font-medium text-slate-400">
            <Link href="/" className="hover:text-emerald-400 transition-colors no-underline">
              Home
            </Link>
            <span className="text-slate-700">•</span>
            <Link href="/privacy" className="hover:text-emerald-400 transition-colors no-underline">
              Privacy Policy
            </Link>
            <span className="text-slate-700">•</span>
            <Link href="/terms" className="hover:text-emerald-400 transition-colors no-underline">
              Terms of Service
            </Link>
            <span className="text-slate-700">•</span>
            <Link href="/contact" className="hover:text-emerald-400 transition-colors no-underline">
              Contact
            </Link>
          </nav>
        </header>

        {/* ─── 2. MAIN TITLE SECTION ─── */}
        <section className="mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-emerald-400 uppercase bg-emerald-500/10 rounded-full border border-emerald-500/20">
            <ShieldCheck size={14} className="text-emerald-400" />
            Legal &amp; Privacy
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-3">
            Cookie Policy
          </h1>

          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 mb-5">
            <Clock size={15} className="text-emerald-400/80" />
            <span>Last updated: <strong className="text-slate-300 font-medium">November 2025</strong></span>
          </div>

          <p className="text-sm sm:text-base leading-relaxed text-slate-300 max-w-3xl">
            This Cookie Policy explains how Code with Amrendra uses cookies and similar technologies on our website.
          </p>
        </section>

        {/* ─── 3. CONTENT SECTIONS (CLEAN CARDS) ─── */}
        <div className="space-y-6 sm:space-y-8">

          {/* Section: What Are Cookies? */}
          <article className="rounded-2xl sm:rounded-3xl border border-slate-800/90 bg-[#0b121e] p-6 sm:p-8 transition-colors hover:border-slate-700/80 shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
            <div className="flex items-center gap-3 mb-4 text-emerald-400">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <FileText size={18} />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">What Are Cookies?</h2>
            </div>
            <div className="text-sm sm:text-base leading-relaxed text-slate-300 space-y-3">
              <p>
                Cookies are small text files placed on your device (computer, tablet, or smartphone) when you browse websites. They are universally used across modern web applications to help websites recognize your device, preserve preferences, maintain secure sessions, and offer a streamlined experience.
              </p>
              <p>
                Cookies can be &ldquo;Session Cookies&rdquo; (which automatically delete when you close your web browser) or &ldquo;Persistent Cookies&rdquo; (which remain stored until they reach an expiration date or you manually clear them). Cookies cannot execute malware, deliver viruses, or access personal files stored on your hard drive.
              </p>
            </div>
          </article>

          {/* Section: Types of Cookies We Use */}
          <article className="rounded-2xl sm:rounded-3xl border border-slate-800/90 bg-[#0b121e] p-6 sm:p-8 transition-colors hover:border-slate-700/80 shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
            <div className="flex items-center gap-3 mb-4 text-emerald-400">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Layers size={18} />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Types of Cookies We Use</h2>
            </div>
            <p className="text-sm sm:text-base leading-relaxed text-slate-300 mb-6">
              We group the cookies and local storage items used on our site into two distinct categories:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* Essential Cookies */}
              <div className="rounded-xl border border-slate-800 bg-[#070e1a] p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-white text-base">Essential Cookies</h3>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                      Strictly Necessary
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Essential cookies are necessary for the website to function properly. They handle system security, CSRF protection, color theme persistence (Dark / Light mode), and saving your cookie consent preferences. Because the website cannot operate securely without them, these cannot be disabled.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400">
                  Examples: <code className="text-cyan-300 bg-slate-900 px-1.5 py-0.5 rounded">theme</code>, <code className="text-cyan-300 bg-slate-900 px-1.5 py-0.5 rounded">cwa_cookie_consent</code>
                </div>
              </div>

              {/* Optional / Analytics Cookies */}
              <div className="rounded-xl border border-slate-800 bg-[#070e1a] p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-white text-base">Optional / Analytics Cookies</h3>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                      User Controlled
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Optional cookies help us understand website usage and improve performance. They collect anonymized telemetry such as page navigation speeds, popular tutorial topics, and broken link diagnostics. We do not use advertising or profiling cookies, nor do we sell your data.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400">
                  Telemetry: Aggregated page visits, speed metrics
                </div>
              </div>

            </div>
          </article>

          {/* Section: How We Use Cookies */}
          <article className="rounded-2xl sm:rounded-3xl border border-slate-800/90 bg-[#0b121e] p-6 sm:p-8 transition-colors hover:border-slate-700/80 shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
            <div className="flex items-center gap-3 mb-4 text-emerald-400">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <CheckCircle2 size={18} />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">How We Use Cookies</h2>
            </div>
            <p className="text-sm sm:text-base leading-relaxed text-slate-300 mb-5">
              We use cookies and browser storage strictly to support the following purposes:
            </p>
            <ul className="space-y-3.5 text-sm sm:text-base text-slate-300">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0"></span>
                <span>
                  <strong className="text-white">Remembering Preferences:</strong> Preserving your preferred UI appearance (Dark or Light theme) across page navigation and return visits.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0"></span>
                <span>
                  <strong className="text-white">Preserving Consent Choices:</strong> Storing whether you accepted or rejected optional analytics so you are not repeatedly prompted on each visit.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0"></span>
                <span>
                  <strong className="text-white">Developer Tool Session Caching:</strong> Keeping code validator sessions and test snippets securely in your local browser storage without sending private payloads to any server.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0"></span>
                <span>
                  <strong className="text-white">Performance &amp; Reliability:</strong> Monitoring page load times and edge cache hits to ensure swift, uninterrupted performance across global locations.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0"></span>
                <span>
                  <strong className="text-white">Security &amp; Bot Prevention:</strong> Protecting inquiry forms and API endpoints against automated spam, CSRF exploits, and malicious rate limits.
                </span>
              </li>
            </ul>
          </article>

          {/* Section: How You Can Manage Your Cookie Preferences */}
          <article className="rounded-2xl sm:rounded-3xl border border-slate-800/90 bg-[#0b121e] p-6 sm:p-8 transition-colors hover:border-slate-700/80 shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
            <div className="flex items-center gap-3 mb-4 text-emerald-400">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Sliders size={18} />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">How You Can Manage Your Cookie Preferences</h2>
            </div>
            
            <div className="text-sm sm:text-base leading-relaxed text-slate-300 space-y-4 mb-6">
              <p>
                You have the complete freedom to decide whether optional cookies are enabled. Users can accept, reject, or manage their preferences anytime using the interactive controls on our website.
              </p>
              <p>
                To modify your consent choice right now, click the button below:
              </p>
            </div>

            {/* Interactive Preference Action */}
            <div className="mb-6 p-4 sm:p-5 rounded-xl border border-emerald-500/25 bg-emerald-500/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-white text-sm sm:text-base">Cookie Settings Modal</p>
                <p className="text-xs sm:text-sm text-slate-400">Open your active cookie preferences to toggle analytics on or off.</p>
              </div>
              <ManageCookiesButton />
            </div>

            {/* Browser-Level Controls */}
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 mb-3">
              Browser-Level Cookie Controls
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
              You can also instruct your web browser to delete or refuse cookies. If you block all cookies, please be aware that certain site features (such as theme remembering and tool states) may not function as intended.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
              <div className="rounded-lg border border-slate-800 bg-[#070e1a] p-3">
                <strong className="text-white block mb-1">Google Chrome</strong>
                <span>Settings &rarr; Privacy and security &rarr; Third-party cookies</span>
              </div>
              <div className="rounded-lg border border-slate-800 bg-[#070e1a] p-3">
                <strong className="text-white block mb-1">Mozilla Firefox</strong>
                <span>Settings &rarr; Privacy &amp; Security &rarr; Cookies and Site Data</span>
              </div>
              <div className="rounded-lg border border-slate-800 bg-[#070e1a] p-3">
                <strong className="text-white block mb-1">Apple Safari</strong>
                <span>Settings / Preferences &rarr; Privacy &rarr; Manage Website Data</span>
              </div>
              <div className="rounded-lg border border-slate-800 bg-[#070e1a] p-3">
                <strong className="text-white block mb-1">Microsoft Edge</strong>
                <span>Settings &rarr; Cookies and site permissions &rarr; Manage and delete cookies</span>
              </div>
            </div>
          </article>

          {/* Section: Third-Party Cookies */}
          <article className="rounded-2xl sm:rounded-3xl border border-slate-800/90 bg-[#0b121e] p-6 sm:p-8 transition-colors hover:border-slate-700/80 shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
            <div className="flex items-center gap-3 mb-4 text-emerald-400">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Globe size={18} />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Third-Party Cookies</h2>
            </div>
            <div className="text-sm sm:text-base leading-relaxed text-slate-300 space-y-3">
              <p>
                Our website is hosted on high-availability infrastructure (such as Vercel) which may process anonymous network request headers for routing, DDoS prevention, and edge caching.
              </p>
              <p>
                We do <strong className="text-white">not</strong> allow third-party behavioral advertising platforms, remarketing pixels, or data brokers to track your activity across other websites. External resources or links to third-party services (such as GitHub, Twitter/X, and LinkedIn) operate under their own independent privacy and cookie policies.
              </p>
            </div>
          </article>

          {/* Section: Changes to This Cookie Policy */}
          <article className="rounded-2xl sm:rounded-3xl border border-slate-800/90 bg-[#0b121e] p-6 sm:p-8 transition-colors hover:border-slate-700/80 shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
            <div className="flex items-center gap-3 mb-4 text-emerald-400">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <RefreshCw size={18} />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Changes to This Cookie Policy</h2>
            </div>
            <p className="text-sm sm:text-base leading-relaxed text-slate-300">
              We may update this Cookie Policy from time to time to accommodate legal updates, privacy standards, or changes in how our tools operate. Any modifications will be posted directly to this page with the updated revision date. We encourage you to review this page periodically to stay informed about our cookie practices.
            </p>
          </article>

          {/* Section: Contact Us */}
          <article className="rounded-2xl sm:rounded-3xl border border-slate-800/90 bg-[#0b121e] p-6 sm:p-8 transition-colors hover:border-slate-700/80 shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
            <div className="flex items-center gap-3 mb-4 text-emerald-400">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Mail size={18} />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Contact Us</h2>
            </div>
            <p className="text-sm sm:text-base leading-relaxed text-slate-300 mb-5">
              If you have any questions, suggestions, or concerns regarding our Cookie Policy or how your preferences are maintained, please feel free to reach out to us:
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a 
                href="mailto:codewithamrendra@gmail.com" 
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#070e1a] border border-slate-800 text-sm font-semibold text-white hover:border-emerald-500/50 hover:text-emerald-400 transition-colors no-underline"
              >
                <Mail size={16} className="text-emerald-400" />
                <span>codewithamrendra@gmail.com</span>
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 text-sm font-bold text-slate-950 hover:bg-emerald-400 transition-colors no-underline"
              >
                <span>Contact Page</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </article>

        </div>

        {/* ─── 4. BOTTOM SECTION (PRIVACY POLICY & NOTE) ─── */}
        <section className="mt-10 sm:mt-12 rounded-2xl sm:rounded-3xl border border-slate-800/80 bg-gradient-to-r from-[#0b121e] to-[#070e1a] p-6 sm:p-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
          <div className="space-y-1">
            <h3 className="font-bold text-white text-base sm:text-lg">
              Data Privacy &amp; Protection
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              If you have any questions about our use of cookies, please contact us at{" "}
              <a href="mailto:codewithamrendra@gmail.com" className="text-emerald-400 underline decoration-emerald-500/40 hover:text-emerald-300">
                codewithamrendra@gmail.com
              </a>
              . You can also read our full Privacy Policy for detailed information on data security.
            </p>
          </div>
          <Link
            href="/privacy"
            className="inline-flex items-center gap-2 shrink-0 px-5 py-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-sm font-semibold text-emerald-300 hover:text-white hover:border-emerald-400/60 hover:bg-emerald-500/20 transition-all duration-200 no-underline"
          >
            <span>Privacy Policy</span>
            <ChevronRight size={16} className="text-emerald-400" />
          </Link>
        </section>

      </main>
    </div>
  );
}
