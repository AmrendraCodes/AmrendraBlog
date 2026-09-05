/** Keep CTA layout stable while its link handles hover and keyboard feedback. */
export default function MagneticButton({ children, className = '', strength, ...props }) {
  return <div className={`inline-block ${className}`} {...props}>{children}</div>;
}
