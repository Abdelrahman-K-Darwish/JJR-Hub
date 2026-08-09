import type { ReactNode } from 'react'

export interface QuickLink {
  label: string
  href: string
  icon: ReactNode
}

interface QuickLinkListProps {
  title: string
  eyebrow: string
  links: QuickLink[]
  className?: string
}

/** The "Quick Links" sidebar card pattern — icon, label, and a hover-reveal arrow per row. */
export function QuickLinkList({ title, eyebrow, links, className = '' }: QuickLinkListProps) {
  return (
    <div className={`bg-white border border-rule shadow-[0_1px_2px_rgba(15,35,64,0.04),0_10px_28px_rgba(15,35,64,0.05)] ${className}`}>
      <div className="px-6 py-[22px] border-b border-rule-light">
        <div className="font-display text-base font-bold text-navy tracking-[-0.01em]">{title}</div>
        <div className="font-mono text-[9px] tracking-[1.5px] uppercase text-text-muted mt-1">{eyebrow}</div>
      </div>
      {links.map((link, i) => (
        <a
          key={link.label}
          href={link.href}
          className={`group flex items-center gap-3 px-6 py-[13px] text-[13px] font-medium text-navy transition-[background,color,padding-left] duration-300 hover:bg-off-white hover:text-green-dark hover:pl-[30px] ${
            i < links.length - 1 ? 'border-b border-rule-light' : ''
          }`}
        >
          <span className="w-[18px] text-text-muted shrink-0 transition-colors duration-200 group-hover:text-green">{link.icon}</span>
          {link.label}
          <span aria-hidden="true" className="ml-auto text-rule transition-[color,transform] duration-300 group-hover:text-green group-hover:translate-x-1">
            →
          </span>
        </a>
      ))}
    </div>
  )
}
