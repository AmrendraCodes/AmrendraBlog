'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Sparkles, Cloud, Globe, Layers, Server, Cpu, Database } from 'lucide-react';

export default function ServiceVisualOverlay({ activeCard }) {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        {activeCard === 'react' && (
          <motion.div
            key="react-visual"
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
            transition={{ duration: 0.5 }}
            className="relative w-80 h-80 rounded-full border border-emerald-500/30 bg-emerald-500/5 flex items-center justify-center backdrop-blur-3xl shadow-[0_0_80px_rgba(16,185,129,0.2)]"
          >
            {/* Atomic Orbital Rings */}
            <div className="absolute inset-2 rounded-full border border-dashed border-emerald-400/40 animate-[spin_20s_linear_infinite]" />
            <div className="absolute inset-10 rounded-full border border-emerald-300/30 animate-[spin_15s_linear_infinite_reverse]" />
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.5)]">
              <Code2 size={40} />
            </div>
            <span className="absolute bottom-4 text-[10px] font-mono font-bold text-emerald-400 tracking-widest uppercase bg-[#060907]/90 px-3 py-1 rounded-full border border-emerald-500/30">
              React 19 • Next.js 16
            </span>
          </motion.div>
        )}

        {activeCard === 'ai' && (
          <motion.div
            key="ai-visual"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ duration: 0.5 }}
            className="relative w-80 h-80 rounded-full border border-emerald-500/30 bg-emerald-500/5 flex items-center justify-center backdrop-blur-3xl shadow-[0_0_80px_rgba(16,185,129,0.3)]"
          >
            {/* Neural Synapse Nodes */}
            <div className="absolute top-6 left-12 w-4 h-4 rounded-full bg-emerald-400 animate-ping" />
            <div className="absolute bottom-10 right-14 w-3 h-3 rounded-full bg-emerald-300 animate-ping" />
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.6)]">
              <Sparkles size={40} />
            </div>
            <span className="absolute bottom-4 text-[10px] font-mono font-bold text-emerald-400 tracking-widest uppercase bg-[#060907]/90 px-3 py-1 rounded-full border border-emerald-500/30">
              Autonomous AI Agents
            </span>
          </motion.div>
        )}

        {activeCard === 'cloud' && (
          <motion.div
            key="cloud-visual"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="relative w-80 h-80 rounded-full border border-emerald-500/30 bg-emerald-500/5 flex items-center justify-center backdrop-blur-3xl shadow-[0_0_80px_rgba(16,185,129,0.25)]"
          >
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.5)]">
              <Cloud size={40} />
            </div>
            <span className="absolute bottom-4 text-[10px] font-mono font-bold text-emerald-400 tracking-widest uppercase bg-[#060907]/90 px-3 py-1 rounded-full border border-emerald-500/30">
              AWS Serverless Cloud
            </span>
          </motion.div>
        )}

        {activeCard === 'saas' && (
          <motion.div
            key="saas-visual"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="relative w-80 h-80 rounded-full border border-mint-500/30 bg-[#34D399]/5 flex items-center justify-center backdrop-blur-3xl shadow-[0_0_80px_rgba(52,211,153,0.25)]"
          >
            <div className="w-20 h-20 rounded-full bg-[#34D399]/20 text-[#34D399] flex items-center justify-center shadow-[0_0_30px_rgba(52,211,153,0.5)]">
              <Globe size={40} />
            </div>
            <span className="absolute bottom-4 text-[10px] font-mono font-bold text-[#34D399] tracking-widest uppercase bg-[#060907]/90 px-3 py-1 rounded-full border border-[#34D399]/30">
              SaaS Multi-Tenant Architecture
            </span>
          </motion.div>
        )}

        {activeCard === 'web' && (
          <motion.div
            key="web-visual"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="relative w-80 h-80 rounded-full border border-emerald-500/30 bg-emerald-500/5 flex items-center justify-center backdrop-blur-3xl shadow-[0_0_80px_rgba(16,185,129,0.25)]"
          >
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.5)]">
              <Cpu size={40} />
            </div>
            <span className="absolute bottom-4 text-[10px] font-mono font-bold text-emerald-400 tracking-widest uppercase bg-[#060907]/90 px-3 py-1 rounded-full border border-emerald-500/30">
              Web &amp; Frontend Engineering
            </span>
          </motion.div>
        )}

        {activeCard === 'api' && (
          <motion.div
            key="api-visual"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="relative w-80 h-80 rounded-full border border-teal-500/30 bg-teal-500/5 flex items-center justify-center backdrop-blur-3xl shadow-[0_0_80px_rgba(20,184,166,0.25)]"
          >
            <div className="w-20 h-20 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center shadow-[0_0_30px_rgba(20,184,166,0.5)]">
              <Layers size={40} />
            </div>
            <span className="absolute bottom-4 text-[10px] font-mono font-bold text-teal-400 tracking-widest uppercase bg-[#060907]/90 px-3 py-1 rounded-full border border-teal-500/30">
              High-Throughput APIs
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
