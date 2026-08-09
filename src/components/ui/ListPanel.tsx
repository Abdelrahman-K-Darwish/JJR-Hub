import type { ReactNode } from 'react'

interface ListPanelProps {
  title: string
  eyebrow: string
  /** 'light' is the standard white card header; 'dark' matches HealthBar's navy panel. */
  tone?: 'light' | 'dark'
  children: ReactNode
  className?: string
}

/**
 * Header-plus-rows card chrome shared by the sidebar list panels (Recently Updated, Most
 * Downloaded, Quick Answers, Video Library, ...). The caller supplies its own row markup —
 * row shapes (dot marker, rank number, Q badge, video thumb) vary too much to generalise.
 */
export function ListPanel({ title, eyebrow, tone = 'light', children, className = '' }: ListPanelProps) {
  if (tone === 'dark') {
    return (
      <div
        className={`relative bg-[linear-gradient(180deg,#17304f_0%,#0F2340_45%,#0b1c35_100%)] border border-white/[0.04] border-t-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_8px_24px_rgba(0,0,0,0.20),0_2px_6px_rgba(0,0,0,0.12)] ${className}`}
      >
        <div className="px-5 py-4 border-b border-white/[0.06]">
          <div className="font-display text-[0.95rem] font-bold text-white tracking-tight">{title}</div>
          <div className="font-mono text-[9px] tracking-[1.5px] uppercase text-green/80 font-medium mt-1">{eyebrow}</div>
        </div>
        <div className="p-4 flex flex-col gap-3">{children}</div>
      </div>
    )
  }

  return (
    <div className={`bg-white border border-rule ${className}`}>
      <div className="px-5 py-4 border-b border-rule-light">
        <div className="font-display text-[0.95rem] font-bold text-navy">{title}</div>
        <div className="font-mono text-[9px] tracking-[1.5px] uppercase text-text-muted font-medium mt-0.5">{eyebrow}</div>
      </div>
      <div className="p-4 flex flex-col">{children}</div>
    </div>
  )
}
