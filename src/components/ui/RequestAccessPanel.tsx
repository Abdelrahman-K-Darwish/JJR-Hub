interface RequestAccessPanelProps {
  title?: string
  description: string
  ctaLabel: string
  ctaHref: string
  className?: string
}

/**
 * Shared "request access" CTA — the discoverable route in for a resource the viewer isn't
 * scoped to (CLAUDE.md class D / §6 shared mechanisms). Reused on Home, Exec & Strategy,
 * and Communities, not just Active Projects.
 */
export function RequestAccessPanel({
  title = 'Need access to a project?',
  description,
  ctaLabel,
  ctaHref,
  className = '',
}: RequestAccessPanelProps) {
  return (
    <div className={`border-l-2 border-green bg-white px-5 py-4 ${className}`}>
      <div className="text-[12.5px] font-semibold text-navy mb-1">{title}</div>
      <p className="text-[11.5px] text-text-secondary leading-relaxed mb-2">{description}</p>
      <a href={ctaHref} className="text-[12px] font-bold text-green hover:text-green-dark transition-colors">
        {ctaLabel}
      </a>
    </div>
  )
}
