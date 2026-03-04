"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function AboutPage() {
  const [displayText, setDisplayText] = useState("");
  const fullText = "Hey, I'm Amrendra Kumar";

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
    <main className="min-h-screen bg-white text-slate-900 selection:bg-blue-100 font-sans">
      {/* Hero Section */}
      <section className="pt-20 pb-10 px-6 max-w-4xl mx-auto text-center border-b border-slate-50">
        <div className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-widest text-blue-600 uppercase bg-blue-50 rounded-full">
          About the Author
        </div>
        <h1 className="text-4xl md:text-7xl font-black tracking-tighter mb-8 leading-tight min-h-[1.5em] md:min-h-[1.2em]">
          <span className="text-slate-900">{displayText.substring(0, 9)}</span>
          <span className="text-blue-600">{displayText.substring(9)}</span>
          <span className="inline-block w-1.5 h-[0.9em] bg-blue-600 ml-1.5 align-middle animate-[blink_1s_infinite]"></span>
        </h1>
        <p className="text-xl md:text-2xl text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
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
      <section className="py-12 px-6 max-w-3xl mx-auto">
        <h2 className="text-3xl font-black text-slate-900 mb-10 flex items-center gap-4">
          <span className="w-12 h-1.5 bg-blue-600 rounded-full"></span>
          My Journey
        </h2>
        <div className="space-y-8 text-lg md:text-xl text-slate-600 leading-relaxed font-normal">
          <p>
            For more than <strong>3 years</strong>, I've lived at the intersection of technology and storytelling.
            I've spent thousands of hours breaking down complex technical concepts into clear, actionable content
            for developers and businesses globally.
          </p>
          <p>
            While I love the power of words, I found myself wanting to do more than just write about software—I wanted
            to <em className="text-slate-900 font-semibold not-italic">build</em> it. This curiosity led me to pick up React, Next.js, and the modern web stack.
          </p>
          <p>
            Today, I'm leveraging my experience in developer communication to build applications that are not
            only functional but also intuitive, accessible, and fast. This is just the beginning of my engineering chapter.
          </p>
        </div>
      </section>

      {/* Professional Timeline */}
      <section className="py-12 px-6 bg-white border-t border-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-10 text-center">Work Experience</h2>
          <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-blue-200 before:to-transparent">

            {/* Timeline Item 1 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-blue-600 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[45%] p-6 rounded-3xl bg-slate-50 border border-slate-100 shadow-sm group-hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between space-x-2 mb-2">
                  <div className="font-black text-slate-900">SEO Executive</div>
                  <time className="text-xs font-bold bg-blue-100 text-blue-600 px-3 py-1 rounded-full uppercase tracking-tighter">2022 - 2024</time>
                </div>
                <div className="text-blue-600 font-bold text-sm mb-3">Tech Mahindra</div>
                <p className="text-slate-500 text-sm leading-relaxed">Driven results through data-backed SEO strategies and technical optimizations for enterprise clients.</p>
              </div>
            </div>

            {/* Timeline Item 2 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-blue-600 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[45%] p-6 rounded-3xl bg-slate-50 border border-slate-100 shadow-sm group-hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between space-x-2 mb-2">
                  <div className="font-black text-slate-900">Technical Content Writer</div>
                  <time className="text-xs font-bold bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full uppercase tracking-tighter">2024 - 2025</time>
                </div>
                <div className="text-indigo-600 font-bold text-sm mb-3">Astha Technology</div>
                <p className="text-slate-500 text-sm leading-relaxed">Articulated complex software functionalities and technical guides for diverse industry sectors.</p>
              </div>
            </div>

            {/* Timeline Item 3 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-blue-600 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[45%] p-6 rounded-3xl bg-blue-50/50 border border-blue-100 shadow-sm group-hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between space-x-2 mb-2">
                  <div className="font-black text-slate-900">Technical Content Writer</div>
                  <time className="text-xs font-bold bg-green-100 text-green-600 px-3 py-1 rounded-full uppercase tracking-tighter">2025 - Present</time>
                </div>
                <div className="text-blue-600 font-bold text-sm mb-3">Rejoicehub LLP</div>
                <p className="text-slate-600 text-sm leading-relaxed font-medium italic">Current Focus: Bridging the gap between engineering documentation and user-friendly technical content.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Why I started this blog Section */}
      <section className="py-12 px-6 bg-slate-50 border-y border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Why I started this blog</h2>
            <p className="text-slate-500 text-lg">My personal mission for this digital space.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-black text-xl mb-6">01</div>
              <h3 className="font-bold text-xl mb-4 text-slate-900">Learn in Public</h3>
              <p className="text-slate-600 text-base leading-relaxed">
                Documenting my progress in Linux, DevOps, and Frontend helps me solidify concepts and stay accountable to my growth.
              </p>
            </div>
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-black text-xl mb-6">02</div>
              <h3 className="font-bold text-xl mb-4 text-slate-900">Live Portfolio</h3>
              <p className="text-slate-600 text-base leading-relaxed">
                This site is my sandbox. Every feature here is a product of what I'm currently learning and experimenting with in real-time.
              </p>
            </div>
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-black text-xl mb-6">03</div>
              <h3 className="font-bold text-xl mb-4 text-slate-900">Pay It Forward</h3>
              <p className="text-slate-600 text-base leading-relaxed">
                If my journey or technical guides can help someone else cross a bridge faster, then this blog has served its ultimate purpose.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What to expect Section */}
      <section className="py-12 px-6 max-w-3xl mx-auto">
        <h2 className="text-3xl font-black text-slate-900 mb-10 text-center">What to expect here</h2>
        <div className="space-y-6">
          {[
            { title: "Honest Progress", desc: "No fluff, no shortcuts. Just real updates on my projects, struggles, and breakthroughs." },
            { title: "Learning Strategies", desc: "Insights on how I tackle complex tech topics effectively and build mental models." },
            { title: "Business Ideas & Logic", desc: "Documentation of my journey turning digital ideas into reality and business experiments." }
          ].map((item, i) => (
            <div key={i} className="group flex items-start gap-6 p-6 rounded-3xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
              <div className="mt-1.5 w-3 h-3 rounded-full bg-blue-600 shrink-0 group-hover:scale-125 transition-transform"></div>
              <div>
                <h4 className="font-bold text-xl text-slate-900 mb-1">{item.title}</h4>
                <p className="text-slate-600 leading-relaxed text-lg">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Goal & CTA Section */}
      <section className="py-12 px-6 max-w-6xl mx-auto">
        <div className="bg-slate-900 rounded-[3rem] p-10 md:p-16 text-center relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px]"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-600/20 rounded-full blur-[100px]"></div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">Building the Future</h2>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light">
              My ultimate goal is to build my own digital products and scalable business ideas.
              Want to follow my journey or collaborate on something new?
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/contact"
                className="w-full sm:w-auto px-12 py-5 bg-white text-slate-900 rounded-full font-black text-lg hover:bg-blue-50 transition-all shadow-[0_20px_50px_rgba(255,255,255,0.1)] hover:scale-105"
              >
                Get in Touch
              </Link>
              <Link
                href="/blog"
                className="w-full sm:w-auto px-12 py-5 bg-slate-800 text-white rounded-full font-black text-lg hover:bg-slate-700 transition-all border border-slate-700 hover:scale-105"
              >
                Read My Blog
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Space */}
      <div className="py-6"></div>
    </main>
  );
}
