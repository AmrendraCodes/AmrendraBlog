import React from 'react';
import MotionPreferences from './ui/MotionPreferences';
import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import BackToTop from './blog/BackToTop';
import VisitorTracker from './VisitorTracker';

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

