"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export default function HireMePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "web-dev",
    message: ""
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const services = [
    {
      emoji: "🌐",
      title: "Web Development",
      description: "Full-stack web applications with modern technologies like Next.js, React, and Node.js",
      tags: ["React", "Next.js", "Node.js", "MongoDB", "PostgreSQL"]
    },
    {
      emoji: "📱",
      title: "App Development",
      description: "Mobile-first applications using React Native for iOS and Android platforms",
      tags: ["React Native", "Expo", "Firebase", "Redux", "Native APIs"]
    },
    {
      emoji: "🎨",
      title: "UI/UX Design",
      description: "Beautiful, responsive user interfaces and experiences designed with Figma and built with TailwindCSS",
      tags: ["Figma", "Prototyping", "TailwindCSS", "Responsive Design", "Accessibility"]
    },
    {
      emoji: "📈",
      title: "Digital Marketing",
      description: "Growth strategies, SEO optimization, content marketing, and social media management",
      tags: ["SEO", "Content Strategy", "Social Media", "Analytics", "Growth Hacking"]
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate form submission (Formspree integration)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In production, integrate with Formspree:
      // const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      //   method: 'POST',
      //   body: JSON.stringify(formData),
      //   headers: { 'Accept': 'application/json' }
      // });

      setIsSubmitted(true);
      setFormData({ name: "", email: "", service: "web-dev", message: "" });
      
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] font-sans overflow-x-hidden">
      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-32 md:pb-24 px-4 sm:px-6 max-w-6xl mx-auto text-center border-b border-[var(--card-border)]">
        <div className="inline-block px-4 py-1.5 mb-6 text-[10px] sm:text-xs font-bold tracking-[0.2em] text-[#10B981] dark:text-[#34D399] uppercase bg-[#10B981]/10 dark:bg-[#10B981]/15 border border-[#10B981]/20 rounded-full">
          Let's collaborate
        </div>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter mb-6 leading-[1.1]">
          <span className="text-[var(--text-heading)]">Hire Me for Your</span>
          <br />
          <span className="bg-gradient-to-r from-[#10B981] to-[#34D399] text-transparent bg-clip-text">Next Project</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-[var(--text-body)] max-w-2xl mx-auto leading-relaxed">
          I'm available for freelance projects, collaborations, and consulting. Let's build something amazing together!
        </p>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--text-heading)] mb-10 md:mb-16 text-center">
          <span className="bg-gradient-to-r from-[#10B981] to-[#34D399] text-transparent bg-clip-text">Services I Offer</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-[var(--card-bg)] border border-[rgba(255,255,255,0.05)] shadow-[var(--shadow-card)] rounded-3xl p-6 md:p-8 hover:border-[#10B981]/30 transition-all duration-300 hover:shadow-[var(--shadow-3d)] hover:-translate-y-1"
            >
              <div className="text-5xl mb-4">{service.emoji}</div>
              <h3 className="text-2xl font-bold text-[var(--text-heading)] mb-3">
                {service.title}
              </h3>
              <p className="text-[var(--text-body)] mb-6 leading-relaxed">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs md:text-sm font-bold px-3 py-1.5 bg-[var(--section-alt-bg)] text-[var(--text-muted)] border border-[var(--card-border)] rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 max-w-4xl mx-auto border-t border-[var(--card-border)]">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--text-heading)] mb-10 md:mb-16 text-center">
          Get In Touch
        </h2>

        {isSubmitted ? (
          <div className="bg-[#10B981]/5 border border-[#10B981]/20 rounded-3xl p-8 md:p-12 text-center shadow-[var(--shadow-card)]">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-[#10B981] rounded-full flex items-center justify-center shadow-[0_0_25px_rgba(16,185,129,0.3)]">
                <Check size={32} className="text-white" />
              </div>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-[var(--text-heading)] mb-3">
              Message Received!
            </h3>
            <p className="text-base md:text-lg text-[var(--text-body)] mb-6">
              Thank you for reaching out! I'll get back to you within 24-48 hours.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[#6366F1] dark:text-[#818CF8] font-bold hover:underline transition-opacity"
            >
              Back to Home
              <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6 md:space-y-8 bg-[var(--card-bg)] p-8 md:p-10 rounded-3xl border border-[rgba(255,255,255,0.05)] shadow-[var(--shadow-card)]">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm md:text-base font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
                className="w-full px-5 py-4 rounded-2xl bg-[var(--background)] border border-[rgba(255,255,255,0.08)] shadow-[var(--shadow-inner-glow)] focus:outline-none focus:border-[#6366F1] focus:shadow-[var(--shadow-glow)] transition-all text-[var(--foreground)] font-medium placeholder:text-[var(--text-muted)]"
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm md:text-base font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="john@example.com"
                className="w-full px-5 py-4 rounded-2xl bg-[var(--background)] border border-[rgba(255,255,255,0.08)] shadow-[var(--shadow-inner-glow)] focus:outline-none focus:border-[#6366F1] focus:shadow-[var(--shadow-glow)] transition-all text-[var(--foreground)] font-medium placeholder:text-[var(--text-muted)]"
              />
            </div>

            {/* Service Selection */}
            <div>
              <label htmlFor="service" className="block text-sm md:text-base font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2">
                Service Required *
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-2xl bg-[var(--background)] border border-[rgba(255,255,255,0.08)] shadow-[var(--shadow-inner-glow)] focus:outline-none focus:border-[#6366F1] focus:shadow-[var(--shadow-glow)] transition-all text-[var(--foreground)] font-medium appearance-none cursor-pointer"
              >
                <option value="web-dev">Web Development</option>
                <option value="app-dev">App Development</option>
                <option value="ui-ux">UI/UX Design</option>
                <option value="digital-marketing">Digital Marketing</option>
              </select>
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-sm md:text-base font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2">
                Project Details *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Tell me about your project, timeline, budget, and any specific requirements..."
                rows="6"
                className="w-full px-5 py-4 rounded-2xl bg-[var(--background)] border border-[rgba(255,255,255,0.08)] shadow-[var(--shadow-inner-glow)] focus:outline-none focus:border-[#6366F1] focus:shadow-[var(--shadow-glow)] transition-all text-[var(--foreground)] font-medium placeholder:text-[var(--text-muted)] resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-br from-[#6366F1] to-[#a855f7] text-white font-bold text-base md:text-lg py-4 px-8 rounded-2xl transition-all duration-300 shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-float)] hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none hover:scale-105"
            >
              {isLoading ? "Sending..." : "Send Project Inquiry"}
            </button>

            <p className="text-xs md:text-sm text-[var(--text-muted)] text-center">
              I'll respond to your inquiry within 24-48 hours. Looking forward to discussing your project!
            </p>
          </form>
        )}
      </section>

      {/* CTA Footer */}
      <section className="py-16 md:py-20 px-4 sm:px-6 max-w-4xl mx-auto border-t border-[var(--card-border)]">
        <div className="text-center">
          <p className="text-base md:text-lg text-[var(--text-body)] mb-6">
            Prefer to reach out directly? Let's connect!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:amrendra1999official@gmail.com"
              className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-[var(--card-bg)] border border-[rgba(255,255,255,0.05)] shadow-[var(--shadow-card)] text-[var(--text-heading)] font-bold rounded-2xl hover:border-[#6366F1]/30 hover:shadow-[var(--shadow-3d)] hover:-translate-y-1 transition-all duration-300"
            >
              📧 Email Me
            </a>
            <a
              href="https://x.com/codewithamrendr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-[var(--card-bg)] border border-[rgba(255,255,255,0.05)] shadow-[var(--shadow-card)] text-[var(--text-heading)] font-bold rounded-2xl hover:border-[#6366F1]/30 hover:shadow-[var(--shadow-3d)] hover:-translate-y-1 transition-all duration-300"
            >
              𝕏 Twitter/X
            </a>
            <a
              href="https://www.linkedin.com/in/amrendra-reactdev/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-[var(--card-bg)] border border-[rgba(255,255,255,0.05)] shadow-[var(--shadow-card)] text-[var(--text-heading)] font-bold rounded-2xl hover:border-[#6366F1]/30 hover:shadow-[var(--shadow-3d)] hover:-translate-y-1 transition-all duration-300"
            >
              💼 LinkedIn
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
