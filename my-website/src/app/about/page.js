"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function AboutPage() {
  const [displayText, setDisplayText] = useState("");
  const fullText = "Hi, I'm Amrendra";

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i <= fullText.length) {
        setDisplayText(fullText.substring(0, i));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 60);
    return () => clearInterval(typingInterval);
  }, []);

  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-blue-100 font-sans overflow-x-hidden">
      {/* Hero Section */}
      <section className="pt-16 pb-10 md:pt-24 md:pb-16 px-4 sm:px-6 max-w-5xl mx-auto text-center border-b border-slate-50">
        <div className="inline-block px-4 py-1.5 mb-6 text-[10px] sm:text-xs font-bold tracking-[0.2em] text-blue-600 uppercase bg-blue-50 rounded-full">
          About me
        </div>
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-6 md:mb-8 leading-[1.1] min-h-[3em] sm:min-h-[2em] md:min-h-[1.2em] flex flex-wrap justify-center items-center">
          <span className="text-slate-900 inline-block mr-3">{displayText.substring(0, 8)}</span>
          <span className="text-blue-600 inline-block">{displayText.substring(8)}</span>
          <span className="inline-block w-1 md:w-1.5 h-[0.8em] bg-blue-600 ml-1 sm:ml-2 md:ml-3 align-middle animate-[blink_1s_infinite]"></span>
        </h1>
        <p className="text-base sm:text-xl md:text-2xl text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed px-2">
          A Technical Content Writer currently building my path as a <span className="text-blue-600 font-bold">Frontend Developer</span>
        </p>

        <style jsx global>{`
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
        `}</style>
      </section>

      {/* My Journey Section */}
      <section className="py-12 md:py-20 px-4 sm:px-6 max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-6 md:mb-10 flex items-center gap-3 sm:gap-4">
          <span className="w-8 sm:w-12 h-1 md:h-1.5 bg-blue-600 rounded-full"></span>
          My Journey
        </h2>
        <div className="space-y-6 md:space-y-8 text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed font-normal">
          <p>
            I've spent <strong>2.5+ years</strong> turning complex tech into clear, human-friendly content. But writing about software wasn't enough — I wanted to build it. So I did.
          </p>
          <p>
            Now I'm combining my writing background with <em className="text-slate-900 font-semibold not-italic">React and Next.js</em> to create things that are fast, intuitive, and actually make sense to real people.
          </p>
        </div>
      </section>

      {/* Professional Timeline */}
      <section className="py-12 md:py-20 px-4 sm:px-6 bg-white border-t border-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-10 md:mb-16 text-center">Work Experience</h2>

          <div className="relative space-y-8 md:space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-blue-200 before:to-transparent">

            {/* Timeline Item 1 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-blue-600 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div className="w-[calc(100%-3.5rem)] md:w-[45%] p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-slate-50 border border-slate-100 shadow-sm group-hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <div className="font-black text-slate-900 text-base sm:text-lg leading-tight uppercase tracking-tight">SEO Executive</div>
                  <time className="inline-block self-start text-[10px] font-black bg-blue-100 text-blue-600 px-2.5 py-1 rounded-full uppercase tracking-tighter">2022 - 2024</time>
                </div>
                <div className="text-blue-600 font-bold text-xs sm:text-sm mb-3">Tech Mahindra</div>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">Driven results through data-backed SEO strategies and technical optimizations for enterprise clients.</p>
              </div>
            </div>

            {/* Timeline Item 2 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-blue-600 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div className="w-[calc(100%-3.5rem)] md:w-[45%] p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-slate-50 border border-slate-100 shadow-sm group-hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <div className="font-black text-slate-900 text-base sm:text-lg leading-tight uppercase tracking-tight">Technical Content Writer</div>
                  <time className="inline-block self-start text-[10px] font-black bg-indigo-100 text-indigo-600 px-2.5 py-1 rounded-full uppercase tracking-tighter">2024 - 2025</time>
                </div>
                <div className="text-indigo-600 font-bold text-xs sm:text-sm mb-3">Astha Technology</div>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">Articulated complex software functionalities and technical guides for diverse industry sectors.</p>
              </div>
            </div>

            {/* Timeline Item 3 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-blue-600 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </div>
              <div className="w-[calc(100%-3.5rem)] md:w-[45%] p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-blue-50/50 border border-blue-100 shadow-sm group-hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <div className="font-black text-slate-900 text-base sm:text-lg leading-tight uppercase tracking-tight">Technical Content Writer</div>
                  <time className="inline-block self-start text-[10px] font-black bg-green-100 text-green-600 px-2.5 py-1 rounded-full uppercase tracking-tighter">2025 - Present</time>
                </div>
                <div className="text-blue-600 font-bold text-xs sm:text-sm mb-3">Rejoicehub LLP</div>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium italic">Current Focus: Bridging the gap between engineering documentation and user-friendly technical content.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Why I started this blog Section */}
      <section className="py-12 md:py-20 px-4 sm:px-6 bg-slate-50 border-y border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-3 md:mb-4 px-2">Why I started this blog</h2>
            <p className="text-slate-500 text-base sm:text-lg px-4">My personal mission for this digital space.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-white p-8 md:p-10 rounded-3xl md:rounded-[2.5rem] shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-50 text-blue-600 rounded-xl md:rounded-2xl flex items-center justify-center font-black text-lg md:text-xl mb-6">01</div>
              <h3 className="font-bold text-lg md:text-xl mb-3 md:mb-4 text-slate-900">Learn in Public</h3>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                Documenting my progress in Linux, DevOps, and Frontend helps me solidify concepts and stay accountable to my growth.
              </p>
            </div>
            <div className="bg-white p-8 md:p-10 rounded-3xl md:rounded-[2.5rem] shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-50 text-blue-600 rounded-xl md:rounded-2xl flex items-center justify-center font-black text-lg md:text-xl mb-6">02</div>
              <h3 className="font-bold text-lg md:text-xl mb-3 md:mb-4 text-slate-900">Live Portfolio</h3>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                This site is my sandbox. Every feature here is a product of what I'm currently learning and experimenting with in real-time.
              </p>
            </div>
            <div className="bg-white p-8 md:p-10 rounded-3xl md:rounded-[2.5rem] shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 sm:col-span-2 lg:col-span-1">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-50 text-blue-600 rounded-xl md:rounded-2xl flex items-center justify-center font-black text-lg md:text-xl mb-6">03</div>
              <h3 className="font-bold text-lg md:text-xl mb-3 md:mb-4 text-slate-900">Pay It Forward</h3>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                If my journey or technical guides can help someone else cross a bridge faster, then this blog has served its ultimate purpose.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What to expect Section */}
      <section className="py-12 md:py-20 px-4 sm:px-6 max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-10 text-center">What to expect here</h2>
        <div className="space-y-4 md:space-y-6">
          {[
            { title: "Honest Progress", desc: "No fluff, no shortcuts. Just real updates on my projects, struggles, and breakthroughs." },
            { title: "Learning Strategies", desc: "Insights on how I tackle complex tech topics effectively and build mental models." },
            { title: "Business Ideas & Logic", desc: "Documentation of my journey turning digital ideas into reality and business experiments." }
          ].map((item, i) => (
            <div key={i} className="group flex items-start gap-4 sm:gap-6 p-5 md:p-6 rounded-2xl md:rounded-3xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
              <div className="mt-2 w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0 group-hover:scale-125 transition-transform"></div>
              <div>
                <h4 className="font-bold text-lg md:text-xl text-slate-900 mb-1 leading-tight">{item.title}</h4>
                <p className="text-slate-600 leading-relaxed text-sm md:text-lg">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Goal & CTA Section */}
      <section className="py-12 px-4 sm:px-6 max-w-6xl mx-auto mb-10">
        <div className="bg-slate-900 rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-12 md:p-20 text-center relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute -top-24 -left-24 w-64 md:w-96 h-64 md:h-96 bg-blue-600/20 rounded-full blur-[60px] md:blur-[100px]"></div>
          <div className="absolute -bottom-24 -right-24 w-64 md:w-96 h-64 md:h-96 bg-indigo-600/20 rounded-full blur-[60px] md:blur-[100px]"></div>

          <div className="relative z-10">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white mb-6 md:mb-8 tracking-tight">Building the Future</h2>
            <p className="text-slate-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 md:mb-12 leading-relaxed font-light px-4">
              My ultimate goal is to build my own digital products and scalable business ideas.
              Want to follow my journey or collaborate on something new?
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <Link
                href="/contact"
                className="w-full sm:w-auto px-10 md:px-12 py-4 md:py-5 bg-white text-slate-900 rounded-full font-black text-base md:text-lg hover:bg-blue-50 transition-all shadow-xl hover:scale-105"
              >
                Get in Touch
              </Link>
              <Link
                href="/blog"
                className="w-full sm:w-auto px-10 md:px-12 py-4 md:py-5 bg-slate-800 text-white rounded-full font-black text-base md:text-lg hover:bg-slate-700 transition-all border border-slate-700 hover:scale-105"
              >
                Read My Blog
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Space - Minimal for Mobile */}
      <div className="py-4 md:py-10"></div>
    </main>
  );
}
