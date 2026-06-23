'use client';

import { motion } from 'framer-motion';

/**
 * Reusable scroll-reveal animation wrapper.
 * Fades in and slides up when the element enters the viewport.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {string} [props.className]
 * @param {number} [props.delay=0] - Delay in seconds
 * @param {'up'|'down'|'left'|'right'|'none'} [props.direction='up']
 * @param {string} [props.as='div'] - HTML element to render
 */
const directionMap = {
  up: { y: 32 },
  down: { y: -32 },
  left: { x: 32 },
  right: { x: -32 },
  none: {},
};

export default function AnimatedSection({
  children,
  className,
  delay = 0,
  direction = 'up',
  as = 'div',
  ...props
}) {
  const Component = motion.create(as);
  const directionOffset = directionMap[direction] || directionMap.up;

  return (
    <Component
      initial={{ opacity: 0, ...directionOffset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
}

/**
 * Stagger container — wrap children with stagger delay.
 * Each direct child will animate with increasing delay.
 */
export function StaggerContainer({ children, className, staggerDelay = 0.1, ...props }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * Stagger item — use inside StaggerContainer.
 */
export function StaggerItem({ children, className, ...props }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
