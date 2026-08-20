'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import TiltCard from '../ui/TiltCard';

export default function InteractiveServiceCard({ service, isActive, onSelect }) {
  const Icon = service.icon;

  return (
    <TiltCard
      onClick={() => onSelect(service.id)}
      glow={isActive}
      className={`relative p-6 cursor-pointer transition-all duration-300 backdrop-blur-xl ${
        isActive
          ? 'bg-[#0B1F3A]/90 border-2 border-[#F59E0B] shadow-[0_10px_30px_rgba(245,158,11,0.25)]'
          : 'bg-[#071324]/70 border border-[#1E293B] hover:border-[#F59E0B]/50'
      }`}
    >
      {/* Glow highlight background */}
      {isActive && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.12),transparent_70%)] rounded-3xl pointer-events-none" />
      )}

      <div className="relative z-10">
        {/* Header: Icon & Category Tag */}
        <div className="flex items-center justify-between mb-4">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
              isActive
                ? 'bg-[#F59E0B] text-[#0B1F3A] shadow-[0_0_20px_rgba(245,158,11,0.4)]'
                : 'bg-[#112240] text-[#F59E0B] border border-[#1E293B]'
            }`}
          >
            <Icon size={22} />
          </div>

          <span
            className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
              isActive
                ? 'bg-[#F59E0B]/20 text-[#F59E0B] border-[#F59E0B]/40'
                : 'bg-white/5 text-[#9CA3AF] border-white/10'
            }`}
          >
            {service.tag}
          </span>
        </div>

        {/* Title & Description */}
        <div>
          <h3
            className={`text-lg font-bold mb-2 transition-colors ${
              isActive ? 'text-[#F59E0B]' : 'text-white'
            }`}
          >
            {service.title}
          </h3>
          <p className="text-xs text-[#9CA3AF] leading-relaxed line-clamp-2">
            {service.description}
          </p>
        </div>

        {/* Footer Badge */}
        <div className="mt-4 pt-3 border-t border-[#1E293B] flex items-center justify-between text-xs font-bold">
          <span className={isActive ? 'text-[#F59E0B]' : 'text-[#9CA3AF]'}>
            {isActive ? 'Active Showcase' : 'Explore Service'}
          </span>
          <ArrowRight
            size={14}
            className={isActive ? 'text-[#F59E0B]' : 'text-[#9CA3AF]'}
          />
        </div>
      </div>
    </TiltCard>
  );
}
