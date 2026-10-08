import React from 'react';
import { testimonialsData } from '@/data/testimonialsData';
import { Quote } from 'lucide-react';

export default function TestimonialsSection() {
  if (!testimonialsData || testimonialsData.length === 0) {
    return null;
  }

  return (
    <section
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50/70 dark:bg-[#071324] border-b border-slate-200 dark:border-[#1E293B] transition-colors"
      aria-label="What Clients Say"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0B1F3A] dark:text-[#F59E0B] bg-[#F59E0B]/10 px-3.5 py-1.5 rounded-full border border-[#F59E0B]/30 inline-block mb-3">
            TESTIMONIALS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1F3A] dark:text-white tracking-tight">
            What Clients Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsData.map((item, index) => (
            <div
              key={index}
              className="rounded-3xl bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-[#1E293B] p-7 sm:p-8 flex flex-col justify-between shadow-sm"
            >
              <div>
                <Quote className="text-[#F59E0B] mb-4" size={28} />
                <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed italic mb-6">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200 dark:border-[#1E293B]">
                <div className="font-bold text-sm text-[#0B1F3A] dark:text-white">
                  {item.name}
                </div>
                <div className="text-xs text-slate-500 dark:text-[#94A3B8]">
                  {item.role}{item.company ? ` at ${item.company}` : ''}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
