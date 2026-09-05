/** Preserve section layout without hiding content until an observer fires. */
export default function ScrollReveal({ children, className = '' }) {
  return <div className={className}>{children}</div>;
}
