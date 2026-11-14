'use client';

import React, {
  useRef,
  useState,
  useCallback,
  type ReactNode,
  type MouseEvent,
  type FocusEvent,
} from 'react';

export interface TiltCardProps {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  /** Max tilt angle in degrees. Defaults to 8deg (use 5-6deg for large cards like Blog / Case Studies) */
  maxTilt?: number;
  /** Subtle lift / scale on hover. Default: 1.01 */
  scale?: number;
  /** Whether to render the dynamic cursor-following spotlight glare overlay. Default: true */
  glare?: boolean;
  /** Custom click handler if card acts as a button */
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
}

/**
 * TiltCard: High-performance 3D tilt-on-hover wrapper component.
 * - Driven purely via requestAnimationFrame and CSS variables (--rx, --ry, --mx, --my).
 * - will-change: transform is applied ONLY during active hover or focus.
 * - Gated on hover-capable pointer devices and strictly respects prefers-reduced-motion.
 * - Does not delay, block, or hide any server-rendered content (100% SEO & SSR safe).
 */
export default function TiltCard({
  children,
  className = '',
  innerClassName = '',
  maxTilt = 8,
  scale = 1.01,
  glare = true,
  onClick,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);
  const boundsRef = useRef<DOMRect | null>(null);

  const [isInteracting, setIsInteracting] = useState(false);

  const handleMouseEnter = useCallback(() => {
    if (!cardRef.current) return;
    boundsRef.current = cardRef.current.getBoundingClientRect();
    setIsInteracting(true);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;

      const bounds = boundsRef.current || cardRef.current.getBoundingClientRect();
      const width = bounds.width;
      const height = bounds.height;

      if (width === 0 || height === 0) return;

      // Mouse position relative to card (0 to 1)
      const mouseX = Math.max(0, Math.min(1, (e.clientX - bounds.left) / width));
      const mouseY = Math.max(0, Math.min(1, (e.clientY - bounds.top) / height));

      // Calculate tilt angles:
      // X rotation is driven by vertical offset (cursor top tilts card back, bottom tilts forward)
      // Y rotation is driven by horizontal offset (cursor right tilts card right, left tilts left)
      const tiltX = ((0.5 - mouseY) * (maxTilt * 2)).toFixed(2);
      const tiltY = ((mouseX - 0.5) * (maxTilt * 2)).toFixed(2);

      const glareX = (mouseX * 100).toFixed(1) + '%';
      const glareY = (mouseY * 100).toFixed(1) + '%';

      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }

      rafId.current = requestAnimationFrame(() => {
        if (!cardRef.current) return;
        cardRef.current.style.setProperty('--rx', `${tiltX}deg`);
        cardRef.current.style.setProperty('--ry', `${tiltY}deg`);
        cardRef.current.style.setProperty('--mx', glareX);
        cardRef.current.style.setProperty('--my', glareY);
      });
    },
    [maxTilt]
  );

  const handleMouseLeave = useCallback(() => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }

    if (cardRef.current) {
      cardRef.current.style.setProperty('--rx', '0deg');
      cardRef.current.style.setProperty('--ry', '0deg');
    }

    boundsRef.current = null;
    setIsInteracting(false);
  }, []);

  const handleFocus = useCallback(() => {
    setIsInteracting(true);
  }, []);

  const handleBlur = useCallback((e: FocusEvent<HTMLDivElement>) => {
    // Only reset if focus has completely left the card
    if (!cardRef.current?.contains(e.relatedTarget as Node)) {
      if (cardRef.current) {
        cardRef.current.style.setProperty('--rx', '0deg');
        cardRef.current.style.setProperty('--ry', '0deg');
      }
      setIsInteracting(false);
    }
  }, []);

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      style={
        {
          '--rx': '0deg',
          '--ry': '0deg',
          '--mx': '50%',
          '--my': '50%',
          '--tilt-scale': scale,
        } as React.CSSProperties
      }
      className={`cwa-tilt-card-wrapper group relative outline-none focus-visible:ring-2 focus-visible:ring-[#F5A00B] focus-visible:ring-offset-2 rounded-3xl ${
        isInteracting ? 'is-active' : ''
      } ${className}`}
    >
      {/* 3D Tilt Surface */}
      <div className={`cwa-tilt-card-inner relative w-full h-full ${innerClassName}`}>
        {children}

        {/* Dynamic Spotlight Glare Overlay */}
        {glare && (
          <div
            className="cwa-tilt-card-glare absolute inset-0 pointer-events-none rounded-3xl overflow-hidden transition-opacity duration-300"
            aria-hidden="true"
          />
        )}
      </div>
    </div>
  );
}