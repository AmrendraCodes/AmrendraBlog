"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    // Simulate form submission
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-blue-100 font-sans overflow-x-hidden">
      {/* Hero Section */}
      <section className="pt-12 pb-8 md:pt-16 md:pb-12 px-4 sm:px-6 max-w-5xl mx-auto text-center border-b border-slate-50">
        <div className="inline-block px-4 py-1.5 mb-6 text-[10px] sm:text-xs font-bold tracking-[0.2em] text-blue-600 uppercase bg-blue-50 rounded-full">
          Get in touch
        </div>
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-6 md:mb-8 leading-[1.1]">
          Let's <span className="text-blue-600">Connect</span>
        </h2>
        <p className="text-base sm:text-xl md:text-2xl text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed px-2">
          Whether you have a question about my work, a project idea, or just want to say hi, I'd love to hear from you.
        </p>
      </section>

      {/* Main Content */}
      <section className="py-8 md:py-12 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* Left Side: Contact Info */}
          <div className="space-y-10 md:space-y-12">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-6 flex items-center gap-4">
                <span className="w-10 h-1.5 bg-blue-600 rounded-full"></span>
                Contact Info
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                I'm currently based in India and open to freelance opportunities,
                collaborations, or full-time roles in Frontend Development & Tech Content.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { label: "Email Me", value: "amrendrakumar@example.com", link: "mailto:amrendrakumar@example.com" },
                { label: "Follow on X", value: "@AmrendraCodes", link: "https://x.com" },
                { label: "Connect on LinkedIn", value: "Amrendra Kumar", link: "https://linkedin.com" },
                { label: "GitHub Projects", value: "amrendra-dev", link: "https://github.com" }
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-300"
                >
                  <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">{item.label}</div>
                  <div className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{item.value}</div>
                </a>
              ))}
            </div>

            <div className="p-8 rounded-[2.5rem] bg-blue-50 border border-blue-100 text-slate-900 relative overflow-hidden shadow-sm">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-3xl"></div>
              <h3 className="text-xl font-bold mb-4 relative z-10 text-slate-900">Current Response Time</h3>
              <p className="text-slate-600 relative z-10 leading-relaxed font-medium">
                I usually respond to all emails within 24-48 business hours.
                For urgent technical queries, DM me on X (Twitter).
              </p>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="bg-white p-6 sm:p-10 rounded-[2.5rem] border border-slate-100 shadow-sm shadow-slate-200/50">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-8">Send a Message</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-black text-slate-900 uppercase tracking-tight ml-2">Your Name</label>
                  <input
                    required
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all text-slate-900 font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-black text-slate-900 uppercase tracking-tight ml-2">Email Address</label>
                  <input
                    required
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all text-slate-900 font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-black text-slate-900 uppercase tracking-tight ml-2">Subject</label>
                <input
                  required
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all text-slate-900 font-medium"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-black text-slate-900 uppercase tracking-tight ml-2">Your Message</label>
                <textarea
                  required
                  rows="5"
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all text-slate-900 font-medium resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className={`w-full py-5 rounded-full font-black text-lg transition-all shadow-xl hover:scale-[1.02] flex items-center justify-center gap-3 ${status === "success"
                  ? "bg-green-600 text-white"
                  : "bg-slate-900 text-white hover:bg-blue-600"
                  }`}
              >
                {status === "sending" ? "Sending..." : status === "success" ? "Message Sent!" : "Send Message"}
                <svg className={`w-5 h-5 ${status === "sending" ? "animate-spin" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {status === "success" ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  )}
                </svg>
              </button>

              {status === "success" && (
                <p className="text-center text-sm font-bold text-green-600">
                  Thank you! I'll get back to you soon.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Footer-like Space */}
      <div className="py-6 md:py-10"></div>
    </main>
  );
}
