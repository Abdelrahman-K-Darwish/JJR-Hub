import type { ReactNode } from 'react'

interface RiseInProps {
  children: ReactNode
  delay?: number
  className?: string
}

/** Staggered entry animation. Replaces the mockups' six hardcoded rise-delay variants. */
export function RiseIn({ children, delay = 0, className = '' }: RiseInProps) {
  return (
    <div
      className={`animate-[rise_0.6s_cubic-bezier(0.25,0.46,0.45,0.94)_both] ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  )
}
