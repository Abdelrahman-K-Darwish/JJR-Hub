import type { ReactNode } from 'react'

interface HeroBreathProps {
  children: ReactNode
  className?: string
}

/** Wraps content in a slow breathing-opacity animation, used for ambient hero glows. */
export function HeroBreath({ children, className = '' }: HeroBreathProps) {
  return <div className={`animate-breathe ${className}`}>{children}</div>
}
