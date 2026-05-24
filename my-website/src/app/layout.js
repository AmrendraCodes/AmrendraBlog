import { Geist, Geist_Mono, Outfit, Syne, DM_Sans } from "next/font/google";
import { ThemeProvider } from 'next-themes'
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  metadataBase: new URL('https://amrendra-blog.vercel.app'),
  title: {
    default: "AmrendraBlog",
    template: "%s | AmrendraBlog"
  },
  description: "A personal blog by Amrendra — insights on React, AI Agents, SaaS architecture, AWS infrastructure, DevOps automation, and modern software engineering.",
  keywords: ["React", "Next.js", "AI Agents", "SaaS Architecture", "AWS", "DevOps", "Frontend Development", "Web Development", "JavaScript", "Blog"],
  authors: [{ name: "Amrendra Kumar", url: "https://amrendra-blog.vercel.app" }],
  creator: "Amrendra Kumar",
  publisher: "AmrendraBlog",
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
    siteName: 'AmrendraBlog',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@AmrendraCodes',
  },
  verification: {
    google: "3v-o-lc_-Ym9wck1txXt3ZODb6whlC089kLg_fBK578",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} ${syne.variable} ${dmSans.variable} bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-300`}
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
