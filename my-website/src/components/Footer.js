import Link from "next/link";
import { Github, Twitter, Linkedin, Instagram, Sparkles, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-900/5 relative z-10 bg-transparent pt-20 pb-10">
      <div className="max-w-[80rem] mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-3 no-underline group">
              <div className="bg-gradient-to-br from-[#00b7ff] to-[#7c3aed] text-white rounded-full flex justify-center items-center w-10 h-10 transition-transform duration-300 shadow-[0_0_15px_rgba(168,85,247,0.5)] group-hover:rotate-12 group-hover:scale-110">
                <Sparkles size={18} />
              </div>
              <span className="text-slate-900 tracking-tight text-2xl font-extrabold">
                Amrendra<span className="bg-gradient-to-r from-[#00b7ff] to-[#7c3aed] text-transparent bg-clip-text">Blog</span>
              </span>
            </Link>
            <p className="text-slate-500 max-w-xs text-sm leading-relaxed">
              Empowering developers and creators with the latest insights into modern technology and creative design.
            </p>
            <div className="flex items-center gap-4">
              <Link href="https://x.com/AmrendraCodes" target="_blank" className="text-slate-600 bg-slate-900/5 border border-slate-900/5 rounded-full flex justify-center items-center w-10 h-10 transition-all duration-300 hover:bg-[#00b7ff] hover:text-slate-900 hover:border-[#00b7ff] hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(6,182,212,0.3)]">
                <Twitter size={16} />
              </Link>
              <Link href="https://github.com/amrendra-dev" target="_blank" className="text-slate-600 bg-slate-900/5 border border-slate-900/5 rounded-full flex justify-center items-center w-10 h-10 transition-all duration-300 hover:bg-[#00b7ff] hover:text-slate-900 hover:border-[#00b7ff] hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(6,182,212,0.3)]">
                <Github size={16} />
              </Link>
              <Link href="https://linkedin.com" target="_blank" className="text-slate-600 bg-slate-900/5 border border-slate-900/5 rounded-full flex justify-center items-center w-10 h-10 transition-all duration-300 hover:bg-[#00b7ff] hover:text-slate-900 hover:border-[#00b7ff] hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(6,182,212,0.3)]">
                <Linkedin size={16} />
              </Link>
              <Link href="https://instagram.com" target="_blank" className="text-slate-600 bg-slate-900/5 border border-slate-900/5 rounded-full flex justify-center items-center w-10 h-10 transition-all duration-300 hover:bg-[#00b7ff] hover:text-slate-900 hover:border-[#00b7ff] hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(6,182,212,0.3)]">
                <Instagram size={16} />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-slate-900 mb-6 text-lg font-bold">Quick Links</h4>
            <ul className="flex flex-col gap-4 m-0 p-0 list-none">
              {[
                { name: "Home", href: "/" },
                { name: "Blog", href: "/blog" },
                { name: "About", href: "/about" },
                { name: "Contact", href: "/contact" }
              ].map((link) => (
                <li key={link.name} className="flex">
                  <Link href={link.href} className="text-slate-600 text-sm font-medium no-underline transition-colors duration-300 hover:text-[#00b7ff]">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 mb-6 text-lg font-bold">Newsletter</h4>
            <p className="text-slate-500 mb-6 text-sm">Join 5,000+ others and never miss a new post.</p>
            <form className="flex relative">
              <input
                type="email"
                placeholder="Your email"
                className="text-slate-900 bg-slate-50 border border-slate-200 rounded-xl outline-none w-full py-3 pr-12 pl-4 text-sm transition-colors duration-300 focus:border-[#00b7ff]"
              />
              <button 
                type="submit"
                className="bg-gradient-to-br from-[#00b7ff] to-[#7c3aed] text-white cursor-pointer border-none rounded-lg flex justify-center items-center w-8 h-8 transition-all duration-300 absolute top-1/2 right-2 -translate-y-1/2 hover:opacity-90 hover:scale-105"
                aria-label="Subscribe"
              >
                <Send size={14} />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-slate-900/5 flex flex-col md:flex-row justify-between items-center gap-4 pt-10">
          <p className="text-slate-500 text-[13px] font-medium">
            &copy; {new Date().getFullYear()} AmrendraBlog. All rights reserved. Built with ❤️ for the community.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-slate-500 text-[13px] font-medium no-underline transition-colors duration-300 hover:text-slate-900">Privacy</Link>
            <Link href="/terms" className="text-slate-500 text-[13px] font-medium no-underline transition-colors duration-300 hover:text-slate-900">Terms</Link>
            <Link href="/sitemap" className="text-slate-500 text-[13px] font-medium no-underline transition-colors duration-300 hover:text-slate-900">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
