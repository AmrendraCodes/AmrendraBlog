"use client";

import { Mail, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function CTABanner() {
  return (
    <div className="max-w-4xl mx-auto my-20 px-4 sm:px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#4338ca] border border-white/10 p-8 sm:p-12 shadow-2xl"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-[#6366F1] blur-[80px] opacity-40 pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full bg-[#818CF8] blur-[80px] opacity-30 pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 shadow-inner border border-white/20">
            <Mail className="text-white" size={28} />
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">
            Subscribe to our Newsletter
          </h2>
          <p className="text-lg text-indigo-200 mb-8 max-w-xl">
            Get the latest articles, tutorials, and insights delivered straight to your inbox. No spam, unsubscribe at any time.
          </p>

          <form className="w-full max-w-md flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-indigo-200/70 rounded-xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all shadow-inner"
            />
            <button
              type="submit"
              className="bg-white text-indigo-900 font-bold px-6 py-3.5 rounded-xl hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2 shadow-lg"
            >
              Subscribe
              <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
