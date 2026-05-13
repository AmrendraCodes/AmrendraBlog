'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const HeroSection = ({ profileImage = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop' }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={`py-20 px-6 lg:px-16 overflow-hidden transition-all duration-1000 transform ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Content Column */}
        <div className="flex flex-col items-start text-left">
          {/* Role Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-6 border border-blue-100 dark:border-blue-800/50">
            <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
            Frontend Developer + Technical Writer
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight mb-6">
            Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Fast, Modern</span>{' '}
            & Scalable Web Experiences.
          </h1>

          {/* Bio */}
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl leading-relaxed">
            I write in-depth articles on React, performance, and modern tooling —
            and build projects that put those ideas to work.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href="/blog" className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-semibold transition-all shadow-sm hover:shadow-md">
              📖 Read Blogs
            </Link>
            <Link href="/projects" className="flex items-center justify-center gap-2 bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 px-8 py-3.5 rounded-xl font-semibold transition-all shadow-sm hover:shadow-md">
              🚀 View Projects
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-5 mt-10">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              title="GitHub"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="text-slate-400 hover:text-blue-500 transition-colors"
              title="Twitter"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 0a10.66 10.66 0 001-5.5V4a4.48 4.48 0 00.78-2.94c.09-.33.15-.67.21-1"></path>
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-slate-400 hover:text-blue-700 dark:hover:text-blue-500 transition-colors"
              title="LinkedIn"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
          </div>
        </div>

        {/* Image Column */}
        <div className="relative w-full max-w-lg mx-auto lg:max-w-none">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-indigo-500/20 blur-3xl rounded-full transform scale-110" />
          <div className="relative aspect-square md:aspect-[4/3] lg:aspect-square overflow-hidden rounded-3xl border border-slate-200/50 dark:border-slate-800/50 shadow-2xl">
            <img
              src={profileImage}
              alt="Profile"
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
