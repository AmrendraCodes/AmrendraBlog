'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  FileText,
  Volume2,
  HelpCircle,
  Columns,
  Zap,
} from 'lucide-react';
import MultiModelArena from './MultiModelArena';

export default function AIArticleToolbar({ article = {} }) {
  const [activeModal, setActiveModal] = useState(null);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [arenaOpen, setArenaOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleAIAction = async (action, title) => {
    setActiveModal(action);
    setModalTitle(title);
    setLoading(true);
    setModalContent('');

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: title }],
          articleContext: { title: article.title, content: article.content, category: article.category },
          action,
        }),
      });

      const data = await res.json();
      setModalContent(data.message || 'Analysis complete.');
    } catch (err) {
      setModalContent('Failed to load AI content.');
    } finally {
      setLoading(false);
    }
  };

  const handleTextToSpeech = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const textToRead = `${article.title}. ${article.excerpt || article.content?.slice(0, 500)}`;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.onend = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <>
      {/* Action Toolbar Row */}
      <div className="rounded-2xl bg-[#0A0F0C] border border-[#1E2E25] p-3 mb-8 flex items-center justify-between gap-3 flex-wrap shadow-xl">
        <div className="flex items-center gap-2 font-mono text-xs text-[#10B981]">
          <Sparkles size={16} />
          <span className="font-bold uppercase tracking-wider">AI Studio Actions</span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => handleAIAction('summarize', 'Key Takeaways & Summary')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#111C16] border border-[#1E2E25] text-xs font-semibold text-[#F3F4F6] hover:text-[#10B981] hover:border-[#10B981]/40 transition-colors"
          >
            <FileText size={14} /> Summarize
          </button>

          <button
            onClick={() => handleAIAction('beginner', 'Explain Core Concepts Simply')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#111C16] border border-[#1E2E25] text-xs font-semibold text-[#F3F4F6] hover:text-[#10B981] hover:border-[#10B981]/40 transition-colors"
          >
            <HelpCircle size={14} /> Explain Simply
          </button>

          <button
            onClick={() => handleAIAction('quiz', 'Generate Technical Quiz & Interview Questions')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#111C16] border border-[#1E2E25] text-xs font-semibold text-[#F3F4F6] hover:text-[#10B981] hover:border-[#10B981]/40 transition-colors"
          >
            <Zap size={14} /> Quiz &amp; Qs
          </button>

          <button
            onClick={handleTextToSpeech}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors ${
              isSpeaking
                ? 'bg-red-500/10 border-red-500/30 text-red-400 animate-pulse'
                : 'bg-[#111C16] border-[#1E2E25] text-[#F3F4F6] hover:text-[#10B981]'
            }`}
          >
            <Volume2 size={14} /> {isSpeaking ? 'Stop Audio' : 'Listen'}
          </button>

          <button
            onClick={() => setArenaOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#10B981]/15 border border-[#10B981]/40 text-xs font-bold text-[#34D399] hover:bg-[#10B981]/25 transition-all shadow-[0_0_15px_rgba(16,185,129,0.15)]"
          >
            <Columns size={14} /> Compare AI Models
          </button>
        </div>
      </div>

      {/* AI Content Result Modal */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#0A0F0C] border border-[#1E2E25] rounded-3xl p-6 max-w-2xl w-full space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-[#1E2E25] pb-4">
              <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                <Sparkles size={18} className="text-[#10B981]" /> {modalTitle}
              </h3>
              <button
                onClick={() => setActiveModal(null)}
                className="px-3 py-1 bg-[#111C16] rounded-xl text-xs text-[#9CA3AF] hover:text-white"
              >
                Close
              </button>
            </div>

            <div className="py-4 text-xs leading-relaxed text-[#F3F4F6] max-h-[60vh] overflow-y-auto whitespace-pre-wrap font-mono bg-[#111C16] p-4 rounded-2xl border border-[#1E2E25]">
              {loading ? (
                <div className="flex items-center justify-center gap-2 py-8 text-[#10B981] animate-pulse">
                  <Sparkles size={20} /> Generating AI Analysis...
                </div>
              ) : (
                modalContent
              )}
            </div>
          </div>
        </div>
      )}

      {/* Multi-Model Comparison Arena Modal */}
      {arenaOpen && <MultiModelArena isOpen={arenaOpen} onClose={() => setArenaOpen(false)} defaultPrompt={`Analyze the key technical architecture of: "${article.title}"`} />}
    </>
  );
}
