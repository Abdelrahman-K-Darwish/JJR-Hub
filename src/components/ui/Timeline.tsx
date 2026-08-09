import type { ReactNode } from 'react'

interface TimelineProps {
  children: ReactNode
  className?: string
}

export function Timeline({ children, className = '' }: TimelineProps) {
  return (
    <ol className={`relative flex flex-col ${className}`} role="list">
      {children}
    </ol>
  )
}

interface TimelineItemProps {
  title: ReactNode
  meta?: ReactNode
  children?: ReactNode
  isLast?: boolean
  className?: string
}

export function TimelineItem({ title, meta, children, isLast = false, className = '' }: TimelineItemProps) {
  return (
    <li className={`relative flex gap-3 pb-6 pl-1 ${className}`}>
      <div className="flex flex-col items-center shrink-0">
        <span className="w-2 h-2 rounded-full bg-green shadow-[0_0_6px_rgba(76,187,23,0.5)] mt-1.5" aria-hidden="true" />
        {!isLast && <span className="w-px flex-1 bg-rule mt-1" aria-hidden="true" />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[12.5px] font-semibold text-navy leading-snug">{title}</div>
        {meta && <div className="text-[10px] text-text-muted mt-0.5 font-mono">{meta}</div>}
        {children}
      </div>
    </li>
  )
}
