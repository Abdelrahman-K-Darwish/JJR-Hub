import type { ReactNode } from 'react'

interface SectionKickerProps {
  children: ReactNode
  className?: string
}

/** Small mono uppercase muted label — client/practice lines, list headers, meta eyebrows. */
export function SectionKicker({ children, className = '' }: SectionKickerProps) {
  return <div className={`font-mono text-[10px] font-medium tracking-[1.5px] uppercase text-text-muted ${className}`}>{children}</div>
}
