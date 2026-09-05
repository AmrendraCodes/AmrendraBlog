/** Compatibility wrapper: content is visible in server HTML without scroll delays. */
export default function AnimatedSection({ children, className, as: Component = 'div', delay, direction, ...props }) {
  return <Component className={className} {...props}>{children}</Component>;
}

export function StaggerContainer({ children, className, staggerDelay, ...props }) {
  return <div className={className} {...props}>{children}</div>;
}

export function StaggerItem({ children, className, ...props }) {
  return <div className={className} {...props}>{children}</div>;
}
