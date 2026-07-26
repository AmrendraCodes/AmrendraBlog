'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Code2, Server, Database, Cloud, Sparkles, Layers, Box, Terminal, Globe } from 'lucide-react';

export default function TechEcosystem3D() {
  const [hoveredTech, setHoveredTech] = useState(null);

  const technologies = [
    { id: 'ai', name: 'AI & LLM Agents', category: 'Intelligence', icon: Sparkles, x: 0, y: -36, desc: 'Autonomous AI pipelines, RAG systems, and OpenAI integration' },
    { id: 'react', name: 'React 19', category: 'Frontend', icon: Code2, x: -32, y: -22, desc: 'Component-driven UI engineering with Server Components & Hooks' },
    { id: 'nextjs', name: 'Next.js 16', category: 'Framework', icon: Globe, x: 32, y: -22, desc: 'Full-stack App Router, SSR, SSG, and edge rendering' },
    { id: 'typescript', name: 'TypeScript', category: 'Language', icon: Terminal, x: -35, y: 12, desc: 'Type-safe architecture ensuring zero runtime type errors' },
    { id: 'aws', name: 'AWS Cloud', category: 'Infrastructure', icon: Cloud, x: 35, y: 12, desc: 'Serverless ECS, Lambda, CloudFront, & S3 cloud deployments' },
    { id: 'postgres', name: 'PostgreSQL', category: 'Database', icon: Database, x: -20, y: 34, desc: 'Relational data modeling, Prisma ORM, and high-concurrency SQL' },
    { id: 'docker', name: 'Docker & DevOps', category: 'Automation', icon: Box, x: 20, y: 34, desc: 'Containerized CI/CD deployment pipelines' },
  ];

  return (
    <div className="w-full relative py-12 flex flex-col items-center justify-center">
      {/* Network Graph Container */}
      <div className="relative w-full max-w-4xl h-[460px] sm:h-[520px] rounded-3xl bg-[#0A0F0C]/90 border border-[#1E2E25] p-6 shadow-2xl flex items-center justify-center overflow-hidden backdrop-blur-xl">
        
        {/* Ambient Grid Effect Background */}
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

        {/* SVG Connection Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          {technologies.map((tech) => {
            const isHovered = hoveredTech === tech.id;
            return (
              <line
                key={tech.id}
                x1="50%"
                y1="50%"
                x2={`calc(50% + ${tech.x}%)`}
                y2={`calc(50% + ${tech.y}%)`}
                stroke={isHovered ? '#10B981' : 'rgba(16, 185, 129, 0.25)'}
                strokeWidth={isHovered ? 2.5 : 1.5}
                strokeDasharray={isHovered ? 'none' : '4 4'}
                className="transition-all duration-300"
              />
            );
          })}
        </svg>

        {/* Central Core Node */}
        <div className="relative z-20 flex flex-col items-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#10B981] to-[#059669] text-white flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.5)] border-2 border-white/20 animate-[pulse_3s_ease-in-out_infinite]">
            <Cpu size={36} className="text-white" />
          </div>
          <span className="mt-3 text-xs sm:text-sm font-extrabold uppercase tracking-widest text-white bg-[#060907] px-4 py-1.5 rounded-full border border-[#10B981]/50 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
            Code with Amrendra Core
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
              style={{
                left: `calc(50% + ${tech.x}% - 45px)`,
                top: `calc(50% + ${tech.y}% - 40px)`,
              }}
              whileHover={{ scale: 1.12 }}
              className="absolute z-20 cursor-pointer flex flex-col items-center transition-all duration-300 group min-w-[90px]"
            >
              <div
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center border transition-all duration-300 backdrop-blur-md ${
                  isHovered
                    ? 'bg-[#10B981] text-white border-[#34D399] shadow-[0_0_30px_rgba(16,185,129,0.6)] scale-110'
                    : 'bg-[#060907]/95 text-[#34D399] border-[#1E2E25] hover:border-[#10B981]'
                }`}
              >
                <Icon size={22} />
              </div>
              <span className={`mt-2 text-xs sm:text-sm font-bold text-white whitespace-nowrap px-3 py-1 rounded-lg border transition-all duration-300 shadow-md ${
                isHovered
                  ? 'bg-[#10B981] text-white border-[#34D399] shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                  : 'bg-[#060907]/95 border-[#1E2E25] text-[#F3F4F6] group-hover:border-[#10B981]/60'
              }`}>
                {tech.name}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Tooltip Description Bar */}
      <div className="mt-6 w-full max-w-2xl text-center min-h-[55px]">
        {hoveredTech ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-2xl bg-[#0A0F0C] border border-[#10B981]/50 text-xs sm:text-sm text-[#F3F4F6] font-medium shadow-xl backdrop-blur-md"
          >
            <span className="text-[#34D399] font-bold">
              {technologies.find((t) => t.id === hoveredTech)?.name}:
            </span>{' '}
            {technologies.find((t) => t.id === hoveredTech)?.desc}
          </motion.div>
        ) : (
          <span className="text-xs sm:text-sm text-[#9CA3AF] italic">
            Hover over any technology node to explore our engineering architecture.
          </span>
        )}
      </div>
    </div>
  );
}
