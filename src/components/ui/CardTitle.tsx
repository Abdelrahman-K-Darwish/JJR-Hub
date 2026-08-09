import type { ElementType, ReactNode } from 'react'

interface CardTitleProps {
  children: ReactNode
  className?: string
  /** Defaults to h3 — cards sit under a section h2, per CLAUDE.md §5 semantic HTML rule. */
  as?: ElementType
}

/** Playfair navy card heading. */
export function CardTitle({ children, className = '', as: Tag = 'h3' }: CardTitleProps) {
  return <Tag className={`font-display text-[1.2rem] font-bold text-navy leading-snug tracking-tight ${className}`}>{children}</Tag>
}
