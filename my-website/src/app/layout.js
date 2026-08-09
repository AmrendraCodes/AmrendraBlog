import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from 'next-themes';
import { GoogleAnalytics } from '@next/third-parties/google';
import Script from 'next/script';
import "./globals.css";
import ConditionalLayout from "../components/ConditionalLayout";

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
  metadataBase: new URL('https://www.codewithamrendra.in'),
  title: {
    default: "Code with Amrendra — Enterprise Software & AI Engineering",
    template: "%s | Code with Amrendra"
  },
  description: "Next-gen software engineering agency specializing in React 19, Next.js 16, autonomous AI agent solutions, SaaS architecture, and AWS cloud infrastructure.",
  keywords: ["Software Development", "React Development", "Next.js", "AI Agents", "SaaS Development", "AWS Cloud", "Frontend Engineering", "API Integration", "Code with Amrendra"],
  authors: [{ name: "Amrendra Kumar", url: "https://www.codewithamrendra.in" }],
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
    google: "J27HQQttUl1hn0c0s5prPIzO6Evg9Vd0t8p7vtE6KTU",
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
              "url": "https://www.codewithamrendra.in",
              "image": "https://www.codewithamrendra.in/Profile%20photo.jpeg",
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
          <ConditionalLayout>{children}</ConditionalLayout>
        </ThemeProvider>
        <GoogleAnalytics gaId="G-F1RG71SZFQ" />
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1771913473946323');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1771913473946323&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </body>
    </html>
  );
}
