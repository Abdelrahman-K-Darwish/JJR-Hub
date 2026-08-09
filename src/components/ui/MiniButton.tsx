import type { AnchorHTMLAttributes } from 'react'

interface MiniButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {}

/** The small quick-link control (Files, Planner, SOW, ...). Always a real anchor. */
export function MiniButton({ className = '', children, ...rest }: MiniButtonProps) {
  return (
    <a
      className={`relative font-mono text-[10px] font-medium text-text-secondary px-[9px] py-1 border border-rule-light bg-white transition-all duration-200 ease-smooth hover:text-green-dark hover:border-green/40 hover:bg-green/[0.04] hover:shadow-[0_0_8px_rgba(76,187,23,0.12)] ${className}`}
      {...rest}
    >
      {children}
    </a>
  )
}
