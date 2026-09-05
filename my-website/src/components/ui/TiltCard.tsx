import type { ReactNode, MouseEvent } from 'react';

export interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
  glow?: boolean;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
}

/** Stable card surface; interactive links own their subtle hover feedback. */
export default function TiltCard({ children, className = '', onClick }: TiltCardProps) {
  return <div onClick={onClick} className={`relative rounded-3xl ${className}`}>{children}</div>;
}
