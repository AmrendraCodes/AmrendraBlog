import { Inter, JetBrains_Mono, Syne } from "next/font/google";
import { ThemeProvider } from 'next-themes'
import "./globals.css";
import Header from "../components/Header";
import SmoothScroll from "../components/SmoothScroll";
import dynamic from 'next/dynamic';

const Footer = dynamic(() => import('../components/Footer'), { ssr: true });

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL('https://amrendra-blog.vercel.app'),
  title: {
    default: "Code with Amrendra",
    template: "%s | Code with Amrendra"
  },
  description: "A personal blog by Amrendra — insights on React, AI Agents, SaaS architecture, AWS infrastructure, DevOps automation, and modern software engineering.",
  keywords: ["React", "Next.js", "AI Agents", "SaaS Architecture", "AWS", "DevOps", "Frontend Development", "Web Development", "JavaScript", "Blog"],
  authors: [{ name: "Amrendra kumar", url: "https://amrendra-blog.vercel.app" }],
  creator: "Amrendra kumar",
  publisher: "Code with Amrendra",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Code with Amrendra',
    images: [
      {
        url: '/images/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Code with Amrendra — React, AI Agents, SaaS & DevOps',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@codewithamrendr',
    images: ['/images/og-default.png'],
  },
  verification: {
    google: "3v-o-lc_-Ym9wck1txXt3ZODb6whlC089kLg_fBK578",
    other: {
      "msvalidate.01": "6AF92BFDAFBC08EC722E3BCC05211B45",
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="msvalidate.01" content="6AF92BFDAFBC08EC722E3BCC05211B45" />
       <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Amrendra Kumar",
      "url": "https://amrendra-blog.vercel.app",
      "image": "https://amrendra-blog.vercel.app/Profile%20photo.jpeg",
      "jobTitle": "Frontend Developer & Technical Content Writer",
      "description": "Personal insights on React, AI Agents, SaaS architecture, AWS infrastructure, DevOps automation, and modern software engineering.",
      "email": "amrendra1999official@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Bihar Sharif",
        "addressRegion": "Bihar",
        "addressCountry": "IN"
      },
      "sameAs": [
        "https://github.com/AmrendraCodes",
        "https://x.com/AmrendraCodes",
        "https://www.linkedin.com/in/amrendra-reactdev/",
        "https://www.youtube.com/@codewithamrendra",
        "https://www.instagram.com/codewithamrendra"
      ]
    })
  }}
/>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var o=new MutationObserver(function(m){for(var i=0;i<m.length;i++){var c=m[i];if(c.type==='attributes'&&c.attributeName==='bis_skin_checked'){c.target.removeAttribute('bis_skin_checked')}if(c.addedNodes){for(var j=0;j<c.addedNodes.length;j++){var n=c.addedNodes[j];if(n.nodeType===1){if(n.hasAttribute('bis_skin_checked')){n.removeAttribute('bis_skin_checked')}var ch=n.querySelectorAll('[bis_skin_checked]');for(var k=0;k<ch.length;k++){ch[k].removeAttribute('bis_skin_checked')}}}}}});o.observe(document.documentElement,{attributes:true,childList:true,subtree:true,attributeFilter:['bis_skin_checked']})();`
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${syne.variable} bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300`}
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <a href="#main-content" className="skip-to-main">
            Skip to main content
          </a>
          <SmoothScroll>
            <Header />
            <main id="main-content">
              {children}
            </main>
            <Footer />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
