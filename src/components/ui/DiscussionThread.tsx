interface DiscussionThreadProps {
  href: string
  title: string
  meta: string
  /** Compact spacing matches the community list card; the detail page uses the larger default. */
  compact?: boolean
  className?: string
}

/** Discussion preview row — title + author/reply/age meta. Class C: omit for non-members (D14). */
export function DiscussionThread({ href, title, meta, compact = false, className = '' }: DiscussionThreadProps) {
  if (compact) {
    return (
      <a href={href} className={`block py-2 -mx-2 px-2 transition-[background,padding-left] duration-[250ms] hover:bg-off-white hover:pl-2.5 ${className}`}>
        <div className="text-[12px] font-semibold text-navy leading-snug">{title}</div>
        <div className="text-[10px] text-text-muted mt-1 font-mono">{meta}</div>
      </a>
    )
  }

  return (
    <a
      href={href}
      className={`block py-4 border-b border-rule-light last:border-b-0 transition-[padding-left,background] duration-[250ms] ease-smooth hover:pl-2.5 hover:bg-off-white ${className}`}
    >
      <div className="text-[13.5px] font-semibold text-navy leading-[1.45] mb-[5px]">{title}</div>
      <div className="font-mono text-[10px] text-text-muted tracking-[0.3px]">{meta}</div>
    </a>
  )
}
