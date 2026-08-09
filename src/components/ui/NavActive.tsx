import type { AnchorHTMLAttributes, ReactNode } from 'react'

interface NavActiveProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean
  children: ReactNode
}

/** Nav link with the active-state underline indicator used in the primary nav. */
export function NavActive({ active = false, children, className = '', ...anchorProps }: NavActiveProps) {
  return (
    <a
      className={`relative font-body text-[13px] px-4 h-full flex items-center transition-colors duration-200 ${
        active ? 'font-semibold text-white' : 'font-medium text-text-inverse-secondary hover:text-white'
      } ${className}`}
      {...anchorProps}
    >
      {children}
      {active && (
        <span
          aria-hidden="true"
          className="absolute bottom-0 left-4 right-4 h-px bg-white/30"
        />
      )}
    </a>
  )
}
