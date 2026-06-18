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
    <main className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 selection:bg-blue-100 dark:selection:bg-blue-900 font-sans overflow-x-hidden">
      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 px-4 sm:px-6 max-w-6xl mx-auto text-center border-b border-slate-100 dark:border-slate-800">
        <div className="inline-block px-4 py-1.5 mb-6 text-[10px] sm:text-xs font-bold tracking-[0.2em] text-purple-600 dark:text-purple-400 uppercase bg-purple-50 dark:bg-purple-900/20 rounded-full">
          Let's collaborate
        </div>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter mb-6 leading-[1.1]">
          <span className="text-slate-900 dark:text-slate-50">Hire Me for Your</span>
          <br />
          <span className="bg-gradient-to-r from-[#00b7ff] to-[#7c3aed] text-transparent bg-clip-text">Next Project</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          I'm available for freelance projects, collaborations, and consulting. Let's build something amazing together!
        </p>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-slate-50 mb-10 md:mb-16 text-center">
          <span className="bg-gradient-to-r from-[#00b7ff] to-[#7c3aed] text-transparent bg-clip-text">Services I Offer</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 hover:border-[#7c3aed] dark:hover:border-[#7c3aed] transition-all duration-300 hover:shadow-[0_10px_30px_rgba(124,58,237,0.1)] dark:hover:shadow-[0_10px_30px_rgba(124,58,237,0.2)]"
            >
              <div className="text-5xl mb-4">{service.emoji}</div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-3">
                {service.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs md:text-sm font-semibold px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full"
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
      <section className="py-16 md:py-24 px-4 sm:px-6 max-w-4xl mx-auto border-t border-slate-100 dark:border-slate-800">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-slate-50 mb-10 md:mb-16 text-center">
          Get In Touch
        </h2>

        {isSubmitted ? (
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-700 rounded-2xl p-8 md:p-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-green-500 rounded-full flex items-center justify-center">
                <Check size={32} className="text-white" />
              </div>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-green-700 dark:text-green-400 mb-3">
              Message Received!
            </h3>
            <p className="text-base md:text-lg text-green-600 dark:text-green-300 mb-6">
              Thank you for reaching out! I'll get back to you within 24-48 hours.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-green-700 dark:text-green-400 font-bold hover:opacity-80 transition-opacity"
            >
              Back to Home
              <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6 md:space-y-8">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm md:text-base font-bold text-slate-900 dark:text-slate-50 mb-2">
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
                className="w-full px-4 md:px-6 py-3 md:py-4 text-base md:text-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-50 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:border-[#7c3aed] dark:focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/20 transition-all duration-300"
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm md:text-base font-bold text-slate-900 dark:text-slate-50 mb-2">
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
                className="w-full px-4 md:px-6 py-3 md:py-4 text-base md:text-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-50 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:border-[#7c3aed] dark:focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/20 transition-all duration-300"
              />
            </div>

            {/* Service Selection */}
            <div>
              <label htmlFor="service" className="block text-sm md:text-base font-bold text-slate-900 dark:text-slate-50 mb-2">
                Service Required *
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full px-4 md:px-6 py-3 md:py-4 text-base md:text-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-50 focus:outline-none focus:border-[#7c3aed] dark:focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/20 transition-all duration-300 appearance-none cursor-pointer"
              >
                <option value="web-dev">Web Development</option>
                <option value="app-dev">App Development</option>
                <option value="ui-ux">UI/UX Design</option>
                <option value="digital-marketing">Digital Marketing</option>
              </select>
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-sm md:text-base font-bold text-slate-900 dark:text-slate-50 mb-2">
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
                className="w-full px-4 md:px-6 py-3 md:py-4 text-base md:text-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-50 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:border-[#7c3aed] dark:focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/20 transition-all duration-300 resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-br from-[#00b7ff] to-[#7c3aed] text-white font-bold text-base md:text-lg py-3 md:py-4 px-8 rounded-xl transition-all duration-300 hover:shadow-[0_10px_30px_rgba(124,58,237,0.4)] hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
            >
              {isLoading ? "Sending..." : "Send Project Inquiry"}
            </button>

            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 text-center">
              I'll respond to your inquiry within 24-48 hours. Looking forward to discussing your project!
            </p>
          </form>
        )}
      </section>

      {/* CTA Footer */}
      <section className="py-16 md:py-20 px-4 sm:px-6 max-w-4xl mx-auto border-t border-slate-100 dark:border-slate-800">
        <div className="text-center">
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 mb-6">
            Prefer to reach out directly? Let's connect!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:contact@amrendra.dev"
              className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-50 font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300"
            >
              📧 Email Me
            </a>
            <a
              href="https://x.com/codewithamrendr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-50 font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300"
            >
              𝕏 Twitter/X
            </a>
            <a
              href="https://www.linkedin.com/in/amrendra-reactdev/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-50 font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300"
            >
              💼 LinkedIn
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
