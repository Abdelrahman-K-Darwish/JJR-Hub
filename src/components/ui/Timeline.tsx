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
  /** Body copy for this entry, rendered between the title and the meta caption. */
  children?: ReactNode
  /** Small caption below the body — a date, owner, or status label. */
  meta?: ReactNode
  isLast?: boolean
  className?: string
  /** Replaces the default dot marker, e.g. a dated/numbered badge. */
  marker?: ReactNode
}

export function TimelineItem({ title, children, meta, isLast = false, className = '', marker }: TimelineItemProps) {
  return (
    <li className={`relative flex gap-3 pb-6 last:pb-0 ${className}`}>
      <div className="flex flex-col items-center shrink-0">
        {marker ?? <span className="w-2 h-2 rounded-full bg-green shadow-[0_0_6px_rgba(76,187,23,0.5)] mt-1.5" aria-hidden="true" />}
        {!isLast && <span className="w-px flex-1 bg-rule-light mt-1" aria-hidden="true" />}
      </div>
      <div className="flex-1 min-w-0 pt-1">
        <div className="font-display text-[0.95rem] font-bold text-navy leading-snug mb-1">{title}</div>
        {children && <div className="text-xs text-text-secondary leading-[1.6]">{children}</div>}
        {meta && <div className="font-mono text-[10px] text-text-muted mt-1.5">{meta}</div>}
      </div>
    </li>
  )
}
