import type { ReactNode } from 'react'

interface HeroKickerProps {
  children: ReactNode
  className?: string
}

/** Mono uppercase eyebrow label used above hero headings. */
export function HeroKicker({ children, className = '' }: HeroKickerProps) {
  return (
    <div
      className={`font-mono text-[10px] font-medium tracking-[2px] uppercase text-green ${className}`}
    >
      {children}
    </div>
  )
}
