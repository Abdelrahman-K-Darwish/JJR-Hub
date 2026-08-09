import type { ReactNode } from 'react'

export type StatBlockTone = 'green' | 'amber' | 'muted'

interface StatBlockProps {
  value: ReactNode
  label: string
  tone?: StatBlockTone
  className?: string
}

const VALUE_CLASSES: Record<StatBlockTone, string> = {
  green: 'text-white [text-shadow:0_0_16px_rgba(76,187,23,0.35)]',
  amber: 'text-amber [text-shadow:0_0_16px_rgba(232,168,56,0.35)]',
  muted: 'text-[#8FA9D1]',
}

const LABEL_CLASSES: Record<StatBlockTone, string> = {
  green: 'text-green/70',
  amber: 'text-text-inverse-secondary',
  muted: 'text-text-inverse-secondary',
}

/** Hero stat — a big number over a small mono label, used for portfolio counts. */
export function StatBlock({ value, label, tone = 'muted', className = '' }: StatBlockProps) {
  return (
    <div className={`text-center ${className}`}>
      <div className={`font-display text-[2.2rem] font-bold leading-none ${VALUE_CLASSES[tone]}`}>{value}</div>
      <div className={`font-mono text-[9px] tracking-[1.5px] uppercase mt-1.5 ${LABEL_CLASSES[tone]}`}>{label}</div>
    </div>
  )
}
