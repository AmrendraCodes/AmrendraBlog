'use client';

import React, { useRef, useEffect } from 'react';

/**
 * MagneticButton Component
 * Gives buttons a subtle, high-end magnetic pull effect towards mouse cursor on desktop.
 * Bypasses on mobile/touch screens or when reduced motion is preferred.
 * Uses direct DOM manipulation (ref) instead of React state to avoid re-renders on mouse move.
 */
export default function MagneticButton({
  children,
  className = '',
  strength = 0.35,
  onClick,
  ...props
}) {
  const buttonRef = useRef(null);
  const isTouchRef = useRef(true);

  useEffect(() => {
    const hasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    isTouchRef.current = !hasHover || prefersReducedMotion;
  }, []);

  const handleMouseMove = (e) => {
    if (isTouchRef.current || !buttonRef.current) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();

    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);

    const x = middleX * strength;
    const y = middleY * strength;

    buttonRef.current.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
    buttonRef.current.style.transition = 'transform 0.1s ease-out';
  };

  const handleMouseLeave = () => {
    if (!isTouchRef.current && buttonRef.current) {
      buttonRef.current.style.transform = 'translate3d(0px, 0px, 0px)';
      buttonRef.current.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
    }
  };

  return (
    <div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`inline-block transform-gpu ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
