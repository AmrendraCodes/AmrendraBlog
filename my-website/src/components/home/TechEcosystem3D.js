'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Code2, Database, Cloud, Sparkles, Box, Terminal, Globe, Zap } from 'lucide-react';

export default function TechEcosystem3D() {
  const [hoveredTech, setHoveredTech] = useState(null);

  const technologies = [
    { id: 'ai', name: 'AI & LLM Agents', category: 'Intelligence', icon: Sparkles, x: 50, y: 14, desc: 'Autonomous AI pipelines, RAG systems, and OpenAI/Anthropic integration' },
    { id: 'react', name: 'React 19', category: 'Frontend', icon: Code2, x: 21, y: 26, desc: 'Component-driven UI engineering with Server Components & Hooks' },
    { id: 'nextjs', name: 'Next.js 16', category: 'Framework', icon: Globe, x: 79, y: 26, desc: 'Full-stack App Router, SSR, SSG, and edge rendering' },
    { id: 'typescript', name: 'TypeScript', category: 'Language', icon: Terminal, x: 14, y: 52, desc: 'Type-safe architecture ensuring zero runtime type errors' },
    { id: 'aws', name: 'AWS Cloud', category: 'Infrastructure', icon: Cloud, x: 86, y: 52, desc: 'Serverless ECS, Lambda, CloudFront, & S3 cloud deployments' },
    { id: 'postgres', name: 'PostgreSQL', category: 'Database', icon: Database, x: 26, y: 80, desc: 'Relational data modeling, Prisma ORM, and high-concurrency SQL' },
    { id: 'docker', name: 'Docker & DevOps', category: 'Automation', icon: Box, x: 74, y: 80, desc: 'Containerized deployment pipelines & automated CI/CD testing' },
  ];

  const activeItem = technologies.find((t) => t.id === hoveredTech);

  return (
    <div className="w-full relative py-6 flex flex-col items-center justify-center">
      {/* Network Diagram Container with Locked Aspect Ratio for 100% Pixel-Perfect Responsive Scaling */}
      <div className="relative w-full max-w-4xl aspect-[800/520] min-h-[300px] sm:min-h-[460px] rounded-3xl bg-[#0B1F3A]/95 border border-[#1E293B] p-2 sm:p-6 shadow-2xl flex items-center justify-center overflow-hidden backdrop-blur-xl">
        
        {/* Ambient Grid Background */}
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

        {/* Dynamic Connected Vector SVG Rays */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" xmlns="http://www.w3.org/2000/svg">
          {technologies.map((tech) => {
            const isHovered = hoveredTech === tech.id;
            return (
              <line
                key={tech.id}
                x1="50%"
                y1="44%"
                x2={`${tech.x}%`}
                y2={`${tech.y}%`}
                stroke={isHovered ? '#F59E0B' : 'rgba(245, 158, 11, 0.3)'}
                strokeWidth={isHovered ? 3 : 1.5}
                strokeDasharray={isHovered ? 'none' : '4 4'}
                className="transition-all duration-300"
              />
            );
          })}
        </svg>

        {/* Central Core Engine Node */}
        <div
          className="absolute z-20 flex flex-col items-center -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
          style={{ left: '50%', top: '44%' }}
        >
          <div className="w-12 h-12 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#1E3A8A] to-[#F59E0B] text-white flex items-center justify-center shadow-[0_0_40px_rgba(245,158,11,0.5)] border-2 border-white/20 animate-[pulse_3s_ease-in-out_infinite] group-hover:scale-110 transition-transform">
            <Cpu className="w-6 h-6 sm:w-10 sm:h-10 text-white" />
          </div>
        </div>

        {/* Central Core Engine Label Badge */}
        <div
          className="absolute z-20 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ left: '50%', top: '60%' }}
        >
          <span className="text-[9px] sm:text-xs font-extrabold uppercase tracking-widest text-white bg-[#060E1A]/95 px-2.5 py-1 sm:px-4 sm:py-1.5 rounded-full border border-[#F59E0B]/50 shadow-[0_0_15px_rgba(245,158,11,0.35)] whitespace-nowrap">
            CWA Core Engine
          </span>
        </div>

        {/* Satellite Tech Nodes */}
        {technologies.map((tech) => {
          const Icon = tech.icon;
          const isHovered = hoveredTech === tech.id;

          return (
            <motion.div
              key={tech.id}
              onMouseEnter={() => setHoveredTech(tech.id)}
              onMouseLeave={() => setHoveredTech(null)}
              onClick={() => setHoveredTech(hoveredTech === tech.id ? null : tech.id)}
              style={{
                left: `${tech.x}%`,
                top: `${tech.y}%`,
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="absolute z-20 cursor-pointer flex flex-col items-center -translate-x-1/2 -translate-y-1/2 transition-all duration-300 group"
            >
              {/* Node Icon Box */}
              <div
                className={`w-8 h-8 sm:w-13 sm:h-13 rounded-xl sm:rounded-2xl flex items-center justify-center border transition-all duration-300 backdrop-blur-md ${
                  isHovered
                    ? 'bg-[#F59E0B] text-[#0B1F3A] border-[#D97706] shadow-[0_0_25px_rgba(245,158,11,0.6)] scale-110 font-bold'
                    : 'bg-[#060E1A]/95 text-[#F59E0B] border-[#1E293B] hover:border-[#F59E0B]'
                }`}
              >
                <Icon className="w-4 h-4 sm:w-6 sm:h-6" />
              </div>

              {/* Node Label Badge */}
              <span
                className={`mt-1 sm:mt-2 text-[8px] sm:text-xs font-bold whitespace-nowrap px-1.5 py-0.5 sm:px-3 sm:py-1 rounded-md sm:rounded-lg border transition-all duration-300 shadow-md ${
                  isHovered
                    ? 'bg-[#F59E0B] text-[#0B1F3A] border-[#D97706] shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                    : 'bg-[#060E1A]/95 border-[#1E293B] text-[#F8FAFC] group-hover:border-[#F59E0B]/60'
                }`}
              >
                {tech.name}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Interactive Node Details Card */}
      <div className="mt-4 sm:mt-6 w-full max-w-2xl text-center min-h-[50px]">
        <AnimatePresence mode="wait">
          {activeItem ? (
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="p-3 sm:p-4 rounded-2xl bg-[#071324] border border-[#F59E0B]/50 text-xs sm:text-sm text-[#F8FAFC] font-medium shadow-xl backdrop-blur-md flex items-center justify-center gap-2 text-left"
            >
              <Zap size={16} className="text-[#F59E0B] shrink-0" />
              <div>
                <span className="text-[#F59E0B] font-bold">
                  {activeItem.name} ({activeItem.category}):
                </span>{' '}
                {activeItem.desc}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="default-prompt"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-xs sm:text-sm text-slate-400 italic flex items-center justify-center gap-2 py-2"
            >
              <Sparkles size={14} className="text-[#F59E0B]" />
              <span>Hover or tap any node in the architecture diagram to inspect tech details.</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
