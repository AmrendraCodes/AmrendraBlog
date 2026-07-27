'use client';

import React, { useRef, useEffect } from 'react';

/**
 * TiltCard Component
 * Provides a lightweight, GPU-accelerated 3D tilt effect on mouse move for desktop.
 * Automatically disables 3D tilt on mobile/touch screens or when reduced motion is preferred.
 * Uses direct DOM manipulation (ref) instead of React state to avoid re-renders on mouse move.
 */
export default function TiltCard({
  children,
  className = '',
  maxTilt = 10,
  scale = 1.02,
  glow = true,
  onClick,
}) {
  const cardRef = useRef(null);
  const isTouchRef = useRef(true);

  useEffect(() => {
    const hasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    isTouchRef.current = !hasHover || prefersReducedMotion;
  }, []);

  const handleMouseMove = (e) => {
    if (isTouchRef.current || !cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`;
    card.style.transition = 'transform 0.1s ease-out';
    card.style.willChange = 'transform';
  };

  const handleMouseEnter = () => {
    if (!isTouchRef.current && cardRef.current) {
      cardRef.current.classList.add('shadow-[0_15px_40px_rgba(16,185,129,0.2)]', 'border-[#10B981]/40');
    }
  };

  const handleMouseLeave = () => {
    if (!isTouchRef.current && cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      cardRef.current.style.transition = 'transform 0.5s ease-out, box-shadow 0.3s ease-out, border-color 0.3s ease-out';
      cardRef.current.style.willChange = 'auto';
      cardRef.current.classList.remove('shadow-[0_15px_40px_rgba(16,185,129,0.2)]', 'border-[#10B981]/40');
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative rounded-3xl transition-all duration-300 transform-gpu ${className}`}
    >
      {children}
    </div>
  );
}
