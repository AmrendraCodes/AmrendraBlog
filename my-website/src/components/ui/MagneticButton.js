'use client';

import React, { useState, useRef, useEffect } from 'react';

/**
 * MagneticButton Component
 * Gives buttons a subtle, high-end magnetic pull effect towards mouse cursor on desktop.
 * Bypasses on mobile/touch screens or when reduced motion is preferred.
 */
export default function MagneticButton({
  children,
  className = '',
  strength = 0.35,
  onClick,
  ...props
}) {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const hasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!hasHover || prefersReducedMotion) {
      setIsTouchDevice(true);
    }
  }, []);

  const handleMouseMove = (e) => {
    if (isTouchDevice || !buttonRef.current) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();

    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);

    requestAnimationFrame(() => {
      setPosition({ x: middleX * strength, y: middleY * strength });
    });
  };

  const handleMouseLeave = () => {
    if (!isTouchDevice) {
      setPosition({ x: 0, y: 0 });
    }
  };

  return (
    <div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: isTouchDevice ? 'none' : `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: position.x === 0 && position.y === 0 ? 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)' : 'transform 0.1s ease-out',
      }}
      className={`inline-block transform-gpu ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
