'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Tag, Check } from 'lucide-react';

export default function BlogSidebar({
  popularPosts,
  allTags,
  selectedTag,
  setSelectedTag,
  setCurrentPage,
  sidebarEmail,
  setSidebarEmail,
  isSidebarSubmitting,
  sidebarSubmitted,
  handleSidebarNewsletterSubmit,
}) {
  return (
    <aside className="w-full lg:w-80 shrink-0 flex flex-col gap-8">
      {/* Popular Posts Widget */}
      <div className="bg-[var(--card-bg)] rounded-3xl p-6 border border-[rgba(255,255,255,0.05)] shadow-[var(--shadow-card)]">
        <h3 className="text-lg font-extrabold text-[var(--text-heading)] mb-6 flex items-center">
          <span className="w-2 h-6 bg-[#F59E0B] rounded-full mr-3"></span>
          Popular Posts
        </h3>
        <div className="flex flex-col gap-5">
          {popularPosts.map((post, i) => (
            <Link key={i} href={post.link} className="group flex gap-4 items-center no-underline">
              <span className="text-3xl font-black text-[var(--card-border)] group-hover:text-[#F59E0B]/30 transition-colors">
                0{i + 1}
              </span>
              <div>
                <h4 className="text-sm font-bold text-[var(--text-heading)] leading-tight group-hover:text-[#F59E0B] transition-colors line-clamp-2">
                  {post.title}
                </h4>
                <span className="text-[11px] text-[var(--text-muted)] mt-1 block font-medium">
                  {post.date}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Tags Cloud Widget */}
      <div className="bg-[var(--card-bg)] rounded-3xl p-6 border border-[rgba(255,255,255,0.05)] shadow-[var(--shadow-card)]">
        <h3 className="text-lg font-extrabold text-[var(--text-heading)] mb-6 flex items-center">
          <span className="w-2 h-6 bg-[#F59E0B] rounded-full mr-3"></span>
          Explore Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                setSelectedTag(selectedTag === tag ? '' : tag);
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer border flex items-center gap-1.5 ${
                selectedTag === tag
                  ? 'bg-[#F59E0B] text-[#0B1F3A] border-[#F59E0B]'
                  : 'bg-[var(--section-alt-bg)] text-[var(--text-body)] border-[var(--card-border)] hover:border-[#F59E0B]/40 hover:text-[#F59E0B]'
              }`}
            >
              <Tag size={10} />
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Newsletter Widget */}
      <div className="bg-gradient-to-br from-[#0B1F3A] to-[#112240] rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl border border-[rgba(255,255,255,0.08)]">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#F59E0B]/10 rounded-full blur-2xl"></div>
        <div className="relative z-10">
          <span className="text-[10px] font-mono tracking-widest text-[#F59E0B] uppercase font-bold px-2 py-0.5 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/20 inline-block mb-3">
            WEEKLY DIGEST
          </span>
          <h3 className="text-xl font-black mb-2 text-white">Engineering Insights</h3>
          <p className="text-xs text-slate-300 mb-6 leading-relaxed">
            Get practical guides on frontend performance, AI workflows, and system architecture delivered to your inbox.
          </p>

          {sidebarSubmitted ? (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs font-bold flex items-center justify-center gap-2">
              <Check size={16} /> Subscribed! Check your inbox.
            </div>
          ) : (
            <form onSubmit={handleSidebarNewsletterSubmit} className="flex flex-col gap-3">
              <input
                type="email"
                required
                value={sidebarEmail}
                onChange={(e) => setSidebarEmail(e.target.value)}
                placeholder="developer@company.com"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#F59E0B] transition-colors"
              />
              <button
                type="submit"
                disabled={isSidebarSubmitting}
                className="w-full bg-[#F59E0B] hover:bg-[#D97706] text-[#0B1F3A] font-extrabold text-xs py-2.5 rounded-xl transition-all shadow-md shadow-amber-500/20 disabled:opacity-50 cursor-pointer border-none"
              >
                {isSidebarSubmitting ? 'Subscribing...' : 'Subscribe Free'}
              </button>
            </form>
          )}

          <div className="mt-6 flex items-center gap-3 pt-6 border-t border-white/10">
            <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 border border-[#F59E0B]/30">
              <Image src="/profile-photo.jpeg" alt="Author" fill className="object-cover" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-white block">Curated by Amrendra</span>
              <span className="text-[10px] text-slate-400">Zero spam, unsubscribe anytime</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
