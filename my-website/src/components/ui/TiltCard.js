'use client';

import React, { useState, useRef, useEffect } from 'react';

/**
 * TiltCard Component
 * Provides a lightweight, GPU-accelerated 3D tilt effect on mouse move for desktop.
 * Automatically disables 3D tilt on mobile/touch screens or when reduced motion is preferred.
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
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect mobile touch or prefers-reduced-motion
    const hasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!hasHover || prefersReducedMotion) {
      setIsTouchDevice(true);
    }
  }, []);

  const handleMouseMove = (e) => {
    if (isTouchDevice || !cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    requestAnimationFrame(() => {
      setTransform(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`);
    });
  };

  const handleMouseEnter = () => {
    if (!isTouchDevice) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isTouchDevice) {
      setIsHovered(false);
      setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: isTouchDevice ? 'none' : transform,
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out, box-shadow 0.3s ease-out, border-color 0.3s ease-out',
        willChange: isHovered ? 'transform' : 'auto',
      }}
      className={`relative rounded-3xl transition-all duration-300 transform-gpu ${
        glow && isHovered ? 'shadow-[0_15px_40px_rgba(16,185,129,0.2)] border-[#10B981]/40' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
