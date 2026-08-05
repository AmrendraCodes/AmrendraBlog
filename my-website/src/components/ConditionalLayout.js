'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return <main id="main-content" className="min-h-screen">{children}</main>;
  }

  return (
    <>
      <a href="#main-content" className="skip-to-main">
        Skip to main content
      </a>
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
