import Link from 'next/link';

export default function BlogFooter() {
  const links = [
    { label: "Home", href: "/" },
    { label: "Articles", href: "#" },
    { label: "Categories", href: "#" },
    { label: "Newsletter", href: "#" },
    { label: "About", href: "#" },
    { label: "RSS", href: "#" }
  ];

  return (
    <footer className="py-12 px-6 lg:px-16 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <p className="text-xl font-bold text-slate-900 tracking-tight">
            Built for builders. <span className="text-slate-500">Written for humans.</span>
          </p>
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {links.map((link, index) => (
              <Link key={index} href={link.href} className="text-slate-500 hover:text-slate-900 font-medium transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-slate-100 text-sm text-slate-400">
          <p>© 2025 Your Brand. All rights reserved. · Privacy · Terms</p>
          <p>Made with curiosity. Updated weekly. Opinions are our own.</p>
        </div>
      </div>
    </footer>
  );
}
