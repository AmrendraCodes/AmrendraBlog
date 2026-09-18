'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
        setErrorMessage(data?.error?.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (status === 'error') {
      setStatus(null);
      setErrorMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* Name */}
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-[0.18em]">
            Your Name
          </label>
          <input
            required
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full py-3 bg-transparent border-b border-[var(--card-border)] focus:border-[#F59E0B] focus:outline-none transition-colors duration-200 text-[var(--foreground)] font-medium placeholder:text-[var(--text-muted)]/50 text-base"
          />
        </div>
        {/* Email */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-[0.18em]">
            Email Address
          </label>
          <input
            required
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="name@example.com"
            className="w-full py-3 bg-transparent border-b border-[var(--card-border)] focus:border-[#F59E0B] focus:outline-none transition-colors duration-200 text-[var(--foreground)] font-medium placeholder:text-[var(--text-muted)]/50 text-base"
          />
        </div>
      </div>

      {/* Subject */}
      <div className="flex flex-col gap-2">
        <label htmlFor="subject" className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-[0.18em]">
          Subject
        </label>
        <input
          required
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Project Inquiry"
          className="w-full py-3 bg-transparent border-b border-[var(--card-border)] focus:border-[#F59E0B] focus:outline-none transition-colors duration-200 text-[var(--foreground)] font-medium placeholder:text-[var(--text-muted)]/50 text-base"
        />
      </div>

      {/* Message */}
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-[0.18em]">
          Your Message
        </label>
        <textarea
          required
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell me about your project..."
          className="w-full py-3 bg-transparent border-b border-[var(--card-border)] focus:border-[#F59E0B] focus:outline-none transition-colors duration-200 text-[var(--foreground)] font-medium placeholder:text-[var(--text-muted)]/50 min-h-[140px] resize-none text-base"
        ></textarea>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === 'sending'}
        className={`w-full py-4 rounded-xl font-bold transition-colors duration-200 flex items-center justify-center gap-3 cursor-pointer ${
          status === 'success'
            ? 'bg-[#F59E0B] text-[#0B1F3A]'
            : 'bg-[#F59E0B] hover:bg-[#D97706] text-[#0B1F3A] shadow-md'
        }`}
      >
        {status === 'sending' ? 'Sending...' : status === 'success' ? 'Message Sent!' : 'Send Message'}
        <svg
          className={`w-4 h-4 ${status === 'sending' ? 'animate-spin' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          {status === 'success' ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          )}
        </svg>
      </button>

      {status === 'success' && (
        <p className="text-center text-sm font-semibold text-[#F59E0B]">
          Thank you! I&apos;ll get back to you soon.
        </p>
      )}
      {status === 'error' && (
        <p className="text-center text-sm font-semibold text-rose-500">
          {errorMessage || 'Failed to send message. Please try again.'}
        </p>
      )}
    </form>
  );
}
