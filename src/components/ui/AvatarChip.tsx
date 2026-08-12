import type { ReactNode } from 'react'
import { Link } from 'react-router'

export interface AvatarChipBadge {
  label: string
  tone: 'pink' | 'green'
}

interface AvatarChipProps {
  href: string
  initials: string
  /** CSS `background` value — solid hex or gradient. */
  background: string
  name: string
  subtitle: string
  badge?: AvatarChipBadge
  shape?: 'square' | 'circle'
  size?: 'sm' | 'md'
  className?: string
  trailing?: ReactNode
}

const BADGE_CLASSES: Record<'pink' | 'green', string> = {
  pink: 'bg-pink/[0.08] text-pink',
  green: 'bg-green/[0.1] text-green-dark',
}

/** Person row — avatar, name, subtitle, optional role badge. Used for member/expert/contact lists. */
export function AvatarChip({ href, initials, background, name, subtitle, badge, shape = 'square', size = 'md', className = '', trailing }: AvatarChipProps) {
  const dimension = size === 'sm' ? 'w-7 h-7 text-[8px]' : 'w-[38px] h-[38px] text-[10.5px]'

  return (
    <Link to={href} className={`flex items-center gap-3 group/person ${className}`}>
      <div
        className={`${dimension} ${shape === 'circle' ? 'rounded-full' : ''} flex items-center justify-center font-mono font-bold text-white shrink-0`}
        style={{ background }}
        aria-hidden="true"
      >
        {initials}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[12.5px] font-semibold text-navy leading-[1.3] group-hover/person:text-green transition-colors">{name}</div>
        <div className="font-mono text-[9.5px] text-text-muted tracking-[0.5px] mt-0.5">{subtitle}</div>
      </div>
      {badge && (
        <span className={`font-mono text-[9px] px-[7px] py-[3px] tracking-[0.8px] uppercase font-medium shrink-0 ${BADGE_CLASSES[badge.tone]}`}>{badge.label}</span>
      )}
      {trailing}
    </Link>
  )
}
