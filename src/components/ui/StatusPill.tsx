import type { ReactNode } from 'react'

export type StatusTone = 'green' | 'amber' | 'navy'

interface StatusPillProps {
  tone: StatusTone
  children: ReactNode
  className?: string
}

const TONE_CLASSES: Record<StatusTone, string> = {
  green: 'text-green-dark bg-green/[0.12] shadow-[0_0_10px_rgba(76,187,23,0.20)]',
  amber: 'text-[#A06B1A] bg-amber/[0.14] shadow-[0_0_10px_rgba(232,168,56,0.18)]',
  navy: 'text-navy-mid bg-navy-mid/10 shadow-[0_0_8px_rgba(42,74,120,0.15)]',
}

/** Status pill — Active / In Review / Wrapping Up. */
export function StatusPill({ tone, children, className = '' }: StatusPillProps) {
  return (
    <span
      className={`font-mono text-[10px] font-medium tracking-[1.5px] uppercase px-2.5 py-[3px] inline-flex items-center ${TONE_CLASSES[tone]} ${className}`}
    >
      {children}
    </span>
  )
}
