'use client';

import React, { useState } from 'react';
import { Columns, Sparkles, X, Bot } from 'lucide-react';

export default function MultiModelArena({ isOpen, onClose, defaultPrompt = '' }) {
  const [prompt, setPrompt] = useState(defaultPrompt || 'Explain React 19 Server Actions vs API Routes');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  if (!isOpen) return null;

  const handleCompare = async () => {
    if (!prompt.trim() || loading) return;
    setLoading(true);
    setResults([]);

    try {
      const res = await fetch('/api/ai/compare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, providers: ['openai', 'claude', 'gemini', 'deepseek'] }),
      });

      const data = await res.json();
      if (res.ok && data.results) {
        setResults(data.results);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-[#0A0F0C] border border-[#1E2E25] rounded-3xl p-6 max-w-6xl w-full h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#1E2E25] pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#10B981]/20 border border-[#10B981]/40 text-[#10B981] flex items-center justify-center font-bold">
              <Columns size={20} />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white flex items-center gap-2">
                Multi-Model AI Comparison Arena
              </h2>
              <p className="text-xs text-[#9CA3AF]">Compare GPT-4o, Claude 3.5, Gemini 2.0, and DeepSeek R1 responses side-by-side.</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 rounded-xl bg-[#111C16] text-[#9CA3AF] hover:text-white border border-[#1E2E25]">
            <X size={18} />
          </button>
        </div>

        {/* Prompt Bar */}
        <div className="flex items-center gap-3 mb-6">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type a technical prompt to evaluate across all models..."
            className="flex-1 px-4 py-3 bg-[#111C16] border border-[#1E2E25] rounded-xl text-xs text-white placeholder-[#6B7280] focus:outline-none focus:border-[#10B981]"
          />
          <button
            onClick={handleCompare}
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#10B981] to-[#059669] text-white font-bold text-xs shadow-lg hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all disabled:opacity-50 flex items-center gap-2"
          >
            <Sparkles size={16} /> {loading ? 'Running Models...' : 'Compare Responses'}
          </button>
        </div>

        {/* 4-Grid Responses */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {loading ? (
            <div className="col-span-full flex items-center justify-center py-20 text-[#10B981] font-mono animate-pulse gap-3">
              <Bot size={24} /> Generating outputs across GPT-4o, Claude 3.5, Gemini 2.0, &amp; DeepSeek R1...
            </div>
          ) : results.length === 0 ? (
            <div className="col-span-full text-center py-20 text-xs text-[#9CA3AF]">
              Click &quot;Compare Responses&quot; to execute your prompt across all 4 frontier AI models.
            </div>
          ) : (
            results.map((res, idx) => (
              <div key={idx} className="rounded-2xl bg-[#111C16] border border-[#1E2E25] p-4 flex flex-col justify-between shadow-md">
                <div>
                  <div className="flex items-center justify-between border-b border-[#1E2E25] pb-2.5 mb-3">
                    <span className="text-xs font-extrabold text-[#10B981] font-mono">{res.provider}</span>
                    <span className="text-[10px] font-mono bg-[#10B981]/15 text-[#34D399] px-2 py-0.5 rounded-full border border-[#10B981]/30">
                      {res.model}
                    </span>
                  </div>
                  <div className="text-xs text-[#F3F4F6] font-mono leading-relaxed whitespace-pre-wrap">
                    {res.text}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
