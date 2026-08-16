import type { ReactNode } from 'react'

interface SectionHeadingProps {
  /** Mono, uppercase, tracked label — e.g. "Your Hub", "Active Projects". */
  eyebrow: string
  /** Optional supporting phrase shown after the rule, hidden on small screens. */
  sub?: string
  /** Optional right-aligned action, e.g. a "View all →" link. Takes the place of `sub` when present. */
  action?: ReactNode
}

/**
 * Editorial section header: LABEL — thin rule filling the remaining width — optional supporting
 * phrase or action. Matches the eyebrow treatment used throughout legacy/jjr-hub-tw.html
 * (`font-mono`, `10px`, `2px` tracking, uppercase, `--navy`) paired with a `1px` `--rule` divider,
 * previously duplicated ad hoc across Home's section headers with three slightly different
 * markup shapes. This is the one shared shape; content/data of the sections themselves is
 * untouched.
 */
export function SectionHeading({ eyebrow, sub, action }: SectionHeadingProps) {
  return (
    <div className="flex items-baseline gap-3 mb-5 mt-2">
      <span className="font-mono text-[10px] font-medium tracking-[2px] uppercase text-navy shrink-0">{eyebrow}</span>
      <span className="flex-1 h-px bg-rule" aria-hidden="true" />
      {action ? (
        <span className="font-mono text-[10px] tracking-wide shrink-0">{action}</span>
      ) : sub ? (
        <span className="font-mono text-[9.5px] tracking-[0.6px] text-text-muted max-md:hidden shrink-0">{sub}</span>
      ) : null}
    </div>
  )
}
