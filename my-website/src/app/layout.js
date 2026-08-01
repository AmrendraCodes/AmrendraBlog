import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from 'next-themes'
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import dynamic from 'next/dynamic';

const WhatsAppButton = dynamic(() => import('../components/WhatsAppButton'));

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

export const metadata = {
  metadataBase: new URL('https://codewithamrendra.vercel.app'),
  title: {
    default: "Code with Amrendra — Enterprise Software & AI Engineering",
    template: "%s | Code with Amrendra"
  },
  description: "Next-gen software engineering agency specializing in React 19, Next.js 16, autonomous AI agent solutions, SaaS architecture, and AWS cloud infrastructure.",
  keywords: ["Software Development", "React Development", "Next.js", "AI Agents", "SaaS Development", "AWS Cloud", "Frontend Engineering", "API Integration", "Code with Amrendra"],
  authors: [{ name: "Amrendra Kumar", url: "https://codewithamrendra.vercel.app" }],
  creator: "Amrendra Kumar",
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
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/icon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-48x48.png', sizes: '48x48', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
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

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#060907' },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300 overflow-x-hidden`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Amrendra Kumar",
              "url": "https://codewithamrendra.vercel.app",
              "image": "https://codewithamrendra.vercel.app/Profile%20photo.jpeg",
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
                "https://www.linkedin.com/in/amrendra1998/",
                "https://www.youtube.com/@codewithamrendra",
                "https://www.instagram.com/codewithamrendra"
              ]
            })
          }}
        />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <a href="#main-content" className="skip-to-main">
            Skip to main content
          </a>
          <Header />
          <main id="main-content">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
        </ThemeProvider>
      </body>
    </html>
  );
}

