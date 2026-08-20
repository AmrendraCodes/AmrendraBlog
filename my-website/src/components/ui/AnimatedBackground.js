'use client';

import React, { useState, useEffect } from 'react';

/**
 * AnimatedBackground Component
 * Provides a lightweight, high-performance ambient glowing background.
 * Uses cursor parallax on desktop and static CSS gradients on mobile.
 */
export default function AnimatedBackground({ interactive = true }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const hasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!hasHover || prefersReducedMotion || !interactive) {
      setIsTouchDevice(true);
      return;
    }

    let ticking = false;

    const handleMouseMove = (e) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const { innerWidth, innerHeight } = window;
          const x = (e.clientX / innerWidth - 0.5) * 30;
          const y = (e.clientY / innerHeight - 0.5) * 30;
          setMousePos({ x, y });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [interactive]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10" aria-hidden="true">
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Primary Saffron Glowing Orb */}
      <div
        style={{
          transform: isTouchDevice ? 'none' : `translate3d(${mousePos.x * 0.8}px, ${mousePos.y * 0.8}px, 0)`,
          transition: 'transform 0.4s ease-out',
        }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.12)_0%,transparent_70%)] blur-3xl transform-gpu"
      />

      {/* Secondary Dark Blue / Navy Glowing Orb */}
      <div
        style={{
          transform: isTouchDevice ? 'none' : `translate3d(${-mousePos.x * 0.6}px, ${-mousePos.y * 0.6}px, 0)`,
          transition: 'transform 0.4s ease-out',
        }}
        className="absolute bottom-1/4 right-10 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(11,31,58,0.25)_0%,transparent_70%)] blur-3xl transform-gpu"
      />
    </div>
  );
}
