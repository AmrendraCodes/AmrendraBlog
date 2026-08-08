'use client';

import React from 'react';
import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import VisitorTracker from './VisitorTracker';

export default function ConditionalLayout({ children }) {
  return (
    <>
      <VisitorTracker />
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

