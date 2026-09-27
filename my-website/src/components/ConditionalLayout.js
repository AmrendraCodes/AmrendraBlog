import React from 'react';
import dynamic from 'next/dynamic';
import MotionPreferences from './ui/MotionPreferences';
import Header from './Header';
import BackToTop from './blog/BackToTop';
import VisitorTracker from './VisitorTracker';

const Footer = dynamic(() => import('./Footer'));
const WhatsAppButton = dynamic(() => import('./WhatsAppButton'));

export default function ConditionalLayout({ children }) {
  return (
    <MotionPreferences>
      <VisitorTracker />
      <a href="#main-content" className="skip-to-main">
        Skip to main content
      </a>
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
      <BackToTop />
      <WhatsAppButton />
    </MotionPreferences>
  );
}

