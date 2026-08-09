import type { ReactNode } from 'react'

interface HeroKickerProps {
  children: ReactNode
  className?: string
  /** Renders the short green lead-rule used on dark hero surfaces. */
  leadRule?: boolean
}

/** Mono uppercase eyebrow label used above hero headings. */
export function HeroKicker({ children, className = '', leadRule = false }: HeroKickerProps) {
  return (
    <div
      className={`font-mono text-[10px] font-medium tracking-[2.5px] uppercase text-green [text-shadow:0_0_8px_rgba(76,187,23,0.3)] ${
        leadRule ? 'inline-flex items-center gap-2.5' : ''
      } ${className}`}
    >
      {leadRule && <span aria-hidden="true" className="w-6 h-px bg-green shadow-[0_0_6px_rgba(76,187,23,0.25)]" />}
      {children}
    </div>
  )
}
