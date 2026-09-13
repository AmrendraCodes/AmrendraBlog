import Link from "next/link";
import { 
  SERVICES_DATA, 
  SERVICES_CATEGORIES 
} from "@/data/servicesData";
import ServiceCard from "@/components/services/ServiceCard";
import ServiceProcess from "@/components/services/ServiceProcess";
import ServiceWhyChooseUs from "@/components/services/ServiceWhyChooseUs";
import ServiceCta from "@/components/services/ServiceCta";
import AnimatedSection from "@/components/AnimatedSection";
import JsonLd from "@/components/JsonLd";
import { 
  ArrowRight, 
  Sparkles, 
  Code2, 
  TrendingUp, 
  Scaling,
  Rocket,
  Compass,
  CheckCircle2
} from "lucide-react";

export const metadata = {
  title: "Services — Web Development, AI Automation & SEO Content Writing | Code with Amrendra",
  description: "Custom web development, AI agent integrations, and technical content writing by Amrendra Kumar. Three focused services — each delivered personally, not through an agency.",
  keywords: [
    "Web Development Services", 
    "Next.js Development", 
    "React Web Apps", 
    "AI Automation Services", 
    "AI Chatbot Development",
    "SEO Content Writing",
    "Technical Content Writing",
    "Code with Amrendra",
  ],
  openGraph: {
    title: "Services — Code with Amrendra",
    description: "Custom web development, AI integrations, and technical content writing — three focused services delivered personally.",
    url: "https://codewithamrendra.in/services",
    type: "website",
  },
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesPage() {
  // Common 6-step framework for landing page
  const defaultProcess = [
    { step: "01", title: "Discover & Scope", description: "Understanding your business goals, target audience, technical constraints, and what success looks like." },
    { step: "02", title: "Plan & Design", description: "Wireframes, architecture decisions, keyword research, or workflow mapping — depending on the service." },
    { step: "03", title: "Build & Execute", description: "Writing code, creating content, or configuring AI integrations. You'll see progress weekly, not just at the end." },
    { step: "04", title: "Test & Refine", description: "Cross-browser testing, content accuracy checks, AI guardrail validation — whatever quality assurance the project needs." },
    { step: "05", title: "Launch & Deploy", description: "Going live with production deployment, published content, or activated automations. Handover documentation included." },
    { step: "06", title: "Monitor & Iterate", description: "Tracking performance metrics, search rankings, or automation logs — and making adjustments based on real data." },
  ];

  const servicesCollectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Services — Code with Amrendra",
    "description": "Custom web development, AI agent integrations, and technical content writing.",
    "url": "https://codewithamrendra.in/services",
    "provider": {
      "@type": "Organization",
      "name": "Code with Amrendra",
      "url": "https://codewithamrendra.in"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Digital & Engineering Services",
      "itemListElement": SERVICES_DATA.map((service, index) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": service.title,
          "description": service.subtitle,
          "url": `https://codewithamrendra.in/services/${service.slug}`
        },
        "position": index + 1
      }))
    }
  };

  return (
    <>
      <JsonLd data={servicesCollectionSchema} />

      {/* ─── Hero Section ─── */}
      <section className="relative pt-24 pb-12 md:pt-28 md:pb-16 border-b border-[var(--card-border)] overflow-hidden bg-gradient-to-b from-[var(--background)] via-[var(--card-bg)] to-[var(--background)]">
        {/* Glow Spheres */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-[#F59E0B]/20 via-[#0B1F3A]/25 to-transparent rounded-full blur-[120px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection direction="up" delay={0.05}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-[#0B1F3A] dark:text-[#F59E0B] text-xs font-extrabold uppercase tracking-wider mb-6">
              <Sparkles size={14} />
              <span>THREE FOCUSED SERVICES</span>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="up" delay={0.1}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[var(--text-heading)] tracking-tight leading-[1.1] mb-6 max-w-4xl mx-auto">
              I <span className="bg-gradient-to-r from-[#0B1F3A] via-[#1E3A8A] to-[#F59E0B] dark:from-white dark:via-[#F8FAFC] dark:to-[#F59E0B] text-transparent bg-clip-text">Build, Write & Automate</span> for Your Business
            </h1>
          </AnimatedSection>

          <AnimatedSection direction="up" delay={0.15}>
            <p className="text-lg sm:text-xl text-[var(--text-body)] leading-relaxed mb-10 max-w-3xl mx-auto">
              Web development, AI integrations, and technical content writing — three things I do well, delivered personally. No agency overhead, no handoffs to junior developers.
            </p>
          </AnimatedSection>

          <AnimatedSection direction="up" delay={0.2} className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2.5 bg-[#F59E0B] hover:bg-[#D97706] text-[#0B1F3A] font-bold text-base py-4 px-9 rounded-full shadow-[0_0_25px_rgba(245,158,11,0.3)] transition-colors duration-200   w-full sm:w-auto"
            >
              <span>Start a Conversation</span>
              <ArrowRight size={18} />
            </Link>
            <a
              href="#all-services"
              className="inline-flex items-center justify-center gap-2 bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--text-heading)] font-semibold text-base py-4 px-8 rounded-full hover:border-[#F59E0B] hover:text-[#F59E0B] transition-colors duration-200 w-full sm:w-auto"
            >
              <Compass size={18} />
              <span>Explore Services</span>
            </a>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── Framework Overview: Build → Write → Automate ─── */}
      <section className="py-12 md:py-16 bg-[var(--section-alt-bg)] border-b border-[var(--card-border)] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection direction="up" className="text-center max-w-3xl mx-auto mb-8 md:mb-10">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#0B1F3A] dark:text-[#F59E0B] bg-[#F59E0B]/10 px-3.5 py-1.5 rounded-full border border-[#F59E0B]/30 mb-4 inline-block">
              WHAT I DO
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[var(--text-heading)] tracking-tight mt-3 mb-4">
              Build → Write → Automate
            </h2>
            <p className="text-[var(--text-body)] text-base sm:text-lg leading-relaxed">
              Three interconnected services — each one strengthens the others. A well-built site ranks better. Good content drives traffic to it. And automation keeps it all running efficiently.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* BUILD Card */}
            <AnimatedSection direction="up" delay={0.1} className="bg-[var(--card-bg)] border border-[#F59E0B]/30 rounded-3xl p-8 shadow-[var(--shadow-card)] relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#F59E0B]/10 rounded-full blur-xl pointer-events-none" />
              <div>
                <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-[#112240] text-[#0B1F3A] dark:text-[#F59E0B] border border-slate-200 dark:border-[#1E293B] flex items-center justify-center mb-6">
                  <Code2 size={24} />
                </div>
                <div className="inline-block px-3 py-1 rounded-full bg-[#F59E0B]/10 text-[#0B1F3A] dark:text-[#F59E0B] font-bold text-xs uppercase tracking-wider mb-4 border border-[#F59E0B]/20">
                  BUILD
                </div>
                <h3 className="text-2xl font-black text-[var(--text-heading)] mb-3">
                  Web Development
                </h3>
                <p className="text-sm text-[var(--text-body)] leading-relaxed mb-6">
                  {SERVICES_CATEGORIES.BUILD.description}
                </p>
              </div>

              <div className="pt-6 border-t border-[var(--card-border)] space-y-2">
                <Link href="/services/web-development" className="flex items-center justify-between text-xs font-bold text-[var(--text-heading)] hover:text-[#F59E0B] transition-colors py-1.5">
                  <span>• Web Development</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </AnimatedSection>

            {/* GROW Card */}
            <AnimatedSection direction="up" delay={0.2} className="bg-[var(--card-bg)] border border-[#F59E0B]/30 rounded-3xl p-8 shadow-[var(--shadow-card)] relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#F59E0B]/10 rounded-full blur-xl pointer-events-none" />
              <div>
                <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-[#112240] text-[#0B1F3A] dark:text-[#F59E0B] border border-slate-200 dark:border-[#1E293B] flex items-center justify-center mb-6">
                  <TrendingUp size={24} />
                </div>
                <div className="inline-block px-3 py-1 rounded-full bg-[#F59E0B]/10 text-[#0B1F3A] dark:text-[#F59E0B] font-bold text-xs uppercase tracking-wider mb-4 border border-[#F59E0B]/20">
                  GROW
                </div>
                <h3 className="text-2xl font-black text-[var(--text-heading)] mb-3">
                  SEO & Content Writing
                </h3>
                <p className="text-sm text-[var(--text-body)] leading-relaxed mb-6">
                  {SERVICES_CATEGORIES.GROW.description}
                </p>
              </div>

              <div className="pt-6 border-t border-[var(--card-border)] space-y-2">
                <Link href="/services/seo-content-strategy" className="flex items-center justify-between text-xs font-bold text-[var(--text-heading)] hover:text-[#F59E0B] transition-colors py-1.5">
                  <span>• SEO & Technical Content Writing</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </AnimatedSection>

            {/* SCALE Card */}
            <AnimatedSection direction="up" delay={0.3} className="bg-[var(--card-bg)] border border-[#F59E0B]/30 rounded-3xl p-8 shadow-[var(--shadow-card)] relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#F59E0B]/10 rounded-full blur-xl pointer-events-none" />
              <div>
                <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-[#112240] text-[#0B1F3A] dark:text-[#F59E0B] border border-slate-200 dark:border-[#1E293B] flex items-center justify-center mb-6">
                  <Scaling size={24} />
                </div>
                <div className="inline-block px-3 py-1 rounded-full bg-[#F59E0B]/10 text-[#0B1F3A] dark:text-[#F59E0B] font-bold text-xs uppercase tracking-wider mb-4 border border-[#F59E0B]/20">
                  SCALE
                </div>
                <h3 className="text-2xl font-black text-[var(--text-heading)] mb-3">
                  AI & Automation
                </h3>
                <p className="text-sm text-[var(--text-body)] leading-relaxed mb-6">
                  {SERVICES_CATEGORIES.SCALE.description}
                </p>
              </div>

              <div className="pt-6 border-t border-[var(--card-border)] space-y-2">
                <Link href="/services/ai-automation" className="flex items-center justify-between text-xs font-bold text-[var(--text-heading)] hover:text-[#F59E0B] transition-colors py-1.5">
                  <span>• AI & Automation</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ─── All Services Grid ─── */}
      <section id="all-services" className="py-12 md:py-16 bg-[var(--background)] border-b border-[var(--card-border)] scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection direction="up" className="text-center max-w-3xl mx-auto mb-8 md:mb-10">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#0B1F3A] dark:text-[#F59E0B] bg-[#F59E0B]/10 px-3.5 py-1.5 rounded-full border border-[#F59E0B]/30 mb-4 inline-block">
              SERVICE DETAILS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[var(--text-heading)] tracking-tight mt-3 mb-4">
              Explore Each Service
            </h2>
            <p className="text-[var(--text-body)] text-base sm:text-lg leading-relaxed">
              Click through to see detailed offerings, real case studies, delivery process, and FAQs for each service.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES_DATA.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Shared Framework & Why Choose Us ─── */}
      <ServiceProcess processSteps={defaultProcess} />
      <ServiceWhyChooseUs />

      {/* ─── Final Call To Action ─── */}
      <ServiceCta />
    </>
  );
}
