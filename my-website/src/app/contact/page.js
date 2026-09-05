"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [status, setStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
        setErrorMessage(data?.error?.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (status === "error") {
      setStatus(null);
      setErrorMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] font-sans overflow-x-hidden">

      {/* ═══════════ HERO ═══════════ */}
      <section className="pt-24 pb-12 md:pt-28 md:pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#0B1F3A] dark:text-[#F59E0B] mb-6">
          Get In Touch
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] mb-8 text-[var(--text-heading)]">
          Let&apos;s{" "}
          <span
            className="bg-gradient-to-r from-[#0B1F3A] via-[#1E3A8A] to-[#F59E0B] dark:from-white dark:via-[#F8FAFC] dark:to-[#F59E0B] text-transparent bg-clip-text italic pr-3"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Connect
          </span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-[var(--text-body)] font-normal max-w-xl mx-auto leading-relaxed">
          Whether you have a question about my work, a project idea, or just
          want to say hi — I&apos;d love to hear from you.
        </p>
      </section>

      {/* ═══════════ MAIN CONTENT ═══════════ */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12 md:pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-28 items-start">

            {/* ─── Left Side: Contact Info ─── */}
            <div className="space-y-12 lg:sticky lg:top-32">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-heading)] mb-4 flex items-center gap-3">
                  <span className="w-8 h-[2px] bg-gradient-to-r from-[#0B1F3A] to-[#F59E0B] rounded-full"></span>
                  Contact Info
                </h2>
                <p className="text-[var(--text-body)] text-base leading-relaxed">
                  I&apos;m currently based in India and open to freelance opportunities,
                  collaborations, or full-time roles in Frontend Development &amp; Tech Content.
                </p>
              </div>

              <div className="space-y-0">
                {[
                  { label: "Phone", value: "062054 82614", link: "tel:+916205482614" },
                  { label: "Location / Address", value: "Moh- Guphaper, South of Devi Asthan, Kalyanpur, Bihar Sharif, Bihar 803101", link: "https://maps.google.com/?q=Code+With+Amrendra+Bihar+Sharif" },
                  { label: "Email Me", value: "amrendra1999official@gmail.com", link: "mailto:amrendra1999official@gmail.com" },
                  { label: "Follow on X", value: "@codewithamrendr", link: "https://x.com/codewithamrendr" },
                  { label: "Connect on LinkedIn", value: "Amrendra Kumar", link: "https://www.linkedin.com/in/amrendra1998/" },
                  { label: "GitHub Projects", value: "AmrendraCodes", link: "https://github.com/AmrendraCodes" },
                ].map((item, i) => (
                  <a
                    key={i}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between py-5 border-b border-[var(--card-border)] hover:border-[#F59E0B]/40 transition-colors duration-200 no-underline"
                  >
                    <div>
                      <div className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-[0.18em] mb-1">
                        {item.label}
                      </div>
                      <div className="text-base font-semibold text-[var(--text-heading)] group-hover:text-[#F59E0B] transition-colors">
                        {item.value}
                      </div>
                    </div>
                    <svg className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[#F59E0B] transition-colors duration-200 " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </a>
                ))}
              </div>

              {/* Response Time — flatter style */}
              <div className="pl-5 border-l-2 border-[#F59E0B]/40">
                <h3 className="text-sm font-bold text-[var(--text-heading)] mb-2">Current Response Time</h3>
                <p className="text-sm text-[var(--text-body)] leading-relaxed">
                  I usually respond within 24–48 business hours.
                  For urgent queries, DM me on X (Twitter).
                </p>
              </div>
            </div>

            {/* ─── Right Side: Contact Form ─── */}
            <div className="w-full">
              <div className="bg-[var(--card-bg)] p-8 md:p-12 rounded-2xl border border-[var(--card-border)]">
                <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-heading)] mb-10">
                  Send a Message
                </h2>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {/* Name */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-[0.18em]">
                        Your Name
                      </label>
                      <input
                        required
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full py-3 bg-transparent border-b border-[var(--card-border)] focus:border-[#F59E0B] focus:outline-none transition-colors duration-200 text-[var(--foreground)] font-medium placeholder:text-[var(--text-muted)]/50 text-base"
                      />
                    </div>
                    {/* Email */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-[0.18em]">
                        Email Address
                      </label>
                      <input
                        required
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@example.com"
                        className="w-full py-3 bg-transparent border-b border-[var(--card-border)] focus:border-[#F59E0B] focus:outline-none transition-colors duration-200 text-[var(--foreground)] font-medium placeholder:text-[var(--text-muted)]/50 text-base"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="subject" className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-[0.18em]">
                      Subject
                    </label>
                    <input
                      required
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Project Inquiry"
                      className="w-full py-3 bg-transparent border-b border-[var(--card-border)] focus:border-[#F59E0B] focus:outline-none transition-colors duration-200 text-[var(--foreground)] font-medium placeholder:text-[var(--text-muted)]/50 text-base"
                    />
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-[0.18em]">
                      Your Message
                    </label>
                    <textarea
                      required
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project..."
                      className="w-full py-3 bg-transparent border-b border-[var(--card-border)] focus:border-[#F59E0B] focus:outline-none transition-colors duration-200 text-[var(--foreground)] font-medium placeholder:text-[var(--text-muted)]/50 min-h-[140px] resize-none text-base"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className={`w-full py-4 rounded-xl font-bold transition-colors duration-200 flex items-center justify-center gap-3 cursor-pointer ${status === "success"
                      ? "bg-[#F59E0B] text-[#0B1F3A]"
                      : "bg-[#F59E0B] hover:bg-[#D97706] text-[#0B1F3A]   shadow-md"
                      }`}
                  >
                    {status === "sending" ? "Sending..." : status === "success" ? "Message Sent!" : "Send Message"}
                    <svg className={`w-4 h-4 ${status === "sending" ? "animate-spin" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      {status === "success" ? (
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      )}
                    </svg>
                  </button>

                  {status === "success" && (
                    <p className="text-center text-sm font-semibold text-[#F59E0B]">
                      Thank you! I&apos;ll get back to you soon.
                    </p>
                  )}
                  {status === "error" && (
                    <p className="text-center text-sm font-semibold text-rose-500">
                      {errorMessage || "Failed to send message. Please try again."}
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ STATS / TRUST BAR ═══════════ */}
      <section className="border-t border-[var(--card-border)] py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-8 text-center">
            {[
              { number: "50+", label: "Articles Published" },
              { number: "10K+", label: "Monthly Readers" },
              { number: "8", label: "Categories Covered" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <span className="text-5xl sm:text-6xl font-extrabold gradient-text tracking-tight leading-none">
                  {stat.number}
                </span>
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--text-muted)] mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ TRUST BADGES ═══════════ */}
      <section className="border-t border-[var(--card-border)] py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] mb-10">
            Recognized On
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {[
              { name: "Dev.to", href: "https://dev.to/codewithamrendra" },
              { name: "Hashnode", href: "https://hashnode.com/@codewithamrendra" },
              { name: "Medium", href: "https://medium.com/@CodewithAmrendra" },
              { name: "Substack", href: "https://substack.com/@codewithamrendra" },
              { name: "GitHub", href: "https://github.com/AmrendraCodes" }
            ].map((platform) => (
              <a
                key={platform.name}
                href={platform.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center px-6 py-3.5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] opacity-70 hover:opacity-100 hover:border-[#F59E0B]   transition-colors duration-200 min-w-[120px] no-underline"
              >
                <span className="text-sm font-bold text-[var(--text-heading)] group-hover:text-[#F59E0B] tracking-wide transition-colors">
                  {platform.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Space */}
      <div className="py-8"></div>
    </div>
  );
}
