'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  X,
  Send,
  Bot,
  Copy,
  Check,
  Zap,
  HelpCircle,
  FileText,
} from 'lucide-react';

export default function AIChatWidget({ articleContext = {} }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hello! I am your AI Engineering Co-Pilot for **"${articleContext.title || 'Code with Amrendra'}"**. Ask me anything about this article, code examples, architecture, or concepts!`,
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [provider, setProvider] = useState('openai');
  const [copiedIndex, setCopiedIndex] = useState(null);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (customPrompt, action) => {
    const textToSend = customPrompt || input;
    if (!textToSend.trim() || loading) return;

    const newMessages = [...messages, { role: 'user', content: textToSend }];
    setMessages(newMessages);
    if (!customPrompt) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          articleContext,
          provider,
          action,
        }),
      });

      const data = await res.json();
      if (res.ok && data.message) {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: data.message, provider: data.provider, model: data.model },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: '⚠️ Sorry, I encountered an issue connecting to the AI provider.' },
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: '⚠️ Network error. Please try again.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-[#10B981] to-[#059669] text-white font-bold text-xs shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:scale-105 transition-all duration-300 group"
      >
        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
          <Sparkles size={14} />
        </div>
        <span className="hidden sm:inline">Ask AI Co-Pilot</span>
      </button>

      {/* Floating Modal Window */}
      {isOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 w-full sm:w-[420px] h-full sm:h-[600px] bg-[#0A0F0C] sm:border sm:border-[#1E2E25] sm:rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden backdrop-blur-2xl">
          {/* Header */}
          <div className="p-4 border-b border-[#1E2E25] bg-[#111C16] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#10B981]/20 border border-[#10B981]/40 text-[#10B981] flex items-center justify-center">
                <Sparkles size={18} />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white flex items-center gap-2">
                  <span>AI Co-Pilot</span>
                  <span className="text-[10px] font-mono text-[#34D399] bg-[#10B981]/15 px-2 py-0.5 rounded-full border border-[#10B981]/30">LIVE</span>
                </h3>
                <p className="text-[10px] text-[#9CA3AF] truncate max-w-[200px]">{articleContext.title || 'Technical Article'}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={provider}
                onChange={(e) => setProvider(e.target.value)}
                className="bg-[#0A0F0C] border border-[#1E2E25] text-[10px] font-mono text-[#34D399] rounded-lg px-2 py-1 focus:outline-none focus:border-[#10B981]"
              >
                <option value="openai">OpenAI GPT-4o</option>
                <option value="claude">Claude 3.5</option>
                <option value="gemini">Gemini 2.0</option>
                <option value="deepseek">DeepSeek R1</option>
                <option value="grok">Grok-2</option>
                <option value="ollama">Ollama Local</option>
              </select>
              <button onClick={() => setIsOpen(false)} className="p-1.5 rounded-lg text-[#9CA3AF] hover:text-white hover:bg-[#1E2E25]">
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Quick Action Chips */}
          <div className="px-4 py-2 bg-[#060907] border-b border-[#1E2E25] flex items-center gap-2 overflow-x-auto text-[11px] no-scrollbar">
            <button
              onClick={() => handleSend('Summarize key takeaways of this article', 'summarize')}
              className="px-2.5 py-1 rounded-full bg-[#111C16] border border-[#1E2E25] text-[#9CA3AF] hover:text-[#10B981] hover:border-[#10B981]/40 shrink-0 flex items-center gap-1 font-semibold"
            >
              <FileText size={12} /> Summarize
            </button>
            <button
              onClick={() => handleSend('Explain this like I am a beginner', 'beginner')}
              className="px-2.5 py-1 rounded-full bg-[#111C16] border border-[#1E2E25] text-[#9CA3AF] hover:text-[#10B981] hover:border-[#10B981]/40 shrink-0 flex items-center gap-1 font-semibold"
            >
              <HelpCircle size={12} /> Explain Simply
            </button>
            <button
              onClick={() => handleSend('Generate 3 quiz questions with answers for this article', 'quiz')}
              className="px-2.5 py-1 rounded-full bg-[#111C16] border border-[#1E2E25] text-[#9CA3AF] hover:text-[#10B981] hover:border-[#10B981]/40 shrink-0 flex items-center gap-1 font-semibold"
            >
              <Zap size={12} /> Quiz
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-lg bg-[#111C16] border border-[#10B981]/40 text-[#10B981] flex items-center justify-center shrink-0 mt-0.5">
                    <Bot size={14} />
                  </div>
                )}
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed relative group ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-[#10B981] to-[#059669] text-white rounded-br-none font-medium'
                      : 'bg-[#111C16] border border-[#1E2E25] text-[#F3F4F6] rounded-bl-none'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>

                  {msg.role === 'assistant' && (
                    <div className="mt-2 pt-2 border-t border-[#1E2E25] flex items-center justify-between text-[10px] text-[#9CA3AF]">
                      <span className="font-mono text-[#34D399]">{msg.provider || 'AI Engine'}</span>
                      <button
                        onClick={() => handleCopy(msg.content, idx)}
                        className="flex items-center gap-1 hover:text-white"
                      >
                        {copiedIndex === idx ? <Check size={12} className="text-[#10B981]" /> : <Copy size={12} />}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 text-xs text-[#10B981] font-mono animate-pulse">
                <Bot size={16} />
                <span>AI Co-Pilot is thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <div className="p-3 border-t border-[#1E2E25] bg-[#111C16]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask AI about this article..."
                className="flex-1 px-3.5 py-2.5 bg-[#0A0F0C] border border-[#1E2E25] rounded-xl text-xs text-white placeholder-[#6B7280] focus:outline-none focus:border-[#10B981]"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="p-2.5 rounded-xl bg-[#10B981] text-white font-bold hover:bg-[#059669] transition-all disabled:opacity-50"
              >
                <Send size={14} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
