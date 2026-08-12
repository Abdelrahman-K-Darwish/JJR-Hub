import type { ReactNode } from 'react'

interface ResourceLinkProps {
  href: string
  icon: ReactNode
  title: string
  meta?: string
  badge?: string
  /** 'muted' matches most documents; 'pink' is used for video resources. */
  iconTone?: 'muted' | 'pink'
  className?: string
}

const ICON_TONE_CLASSES: Record<'muted' | 'pink', string> = {
  muted: 'bg-white border-rule text-text-muted',
  pink: 'text-pink border-pink/20 bg-pink/[0.04]',
}

/** Icon + title (+ optional meta/badge) resource row — community Top Resources / Resources lists. */
export function ResourceLink({ href, icon, title, meta, badge, iconTone = 'muted', className = '' }: ResourceLinkProps) {
  if (!meta && !badge) {
    return (
      <a href={href} className={`flex items-center gap-2 py-2 text-[12px] font-medium text-navy transition-[color,padding-left] duration-[250ms] hover:text-green-dark hover:pl-1 ${className}`}>
        <span className="shrink-0 text-text-muted [a:hover_&]:text-green-dark transition-colors" aria-hidden="true">
          {icon}
        </span>
        {title}
      </a>
    )
  }

  return (
    <a
      href={href}
      className={`relative flex items-center gap-3.5 px-[18px] py-3.5 border border-rule-light bg-off-white transition-all duration-[250ms] hover:border-green/35 hover:bg-white hover:shadow-[0_4px_12px_rgba(15,35,64,0.06)] ${className}`}
    >
      <div className={`w-9 h-9 shrink-0 flex items-center justify-center border ${ICON_TONE_CLASSES[iconTone]}`}>{icon}</div>
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-semibold text-navy">{title}</div>
        {meta && <div className="font-mono text-[10px] text-text-muted tracking-[0.3px] mt-0.5">{meta}</div>}
      </div>
      {badge && <span className="font-mono text-[9px] px-2 py-[3px] tracking-[1px] uppercase font-medium bg-navy-mid/[0.08] text-navy-mid shrink-0">{badge}</span>}
    </a>
  )
}
