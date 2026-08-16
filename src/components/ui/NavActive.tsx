import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router'

interface NavActiveProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: string
  active?: boolean
  children: ReactNode
}

/**
 * Nav link matching legacy's `.nav__link` — editorial minimal, no container.
 * Hover draws a 1px underline from the left (560ms expo-out); active state is a
 * confident 2px green hairline, not a bold-weight-only state.
 */
export function NavActive({ href, active = false, children, className = '', ...anchorProps }: NavActiveProps) {
  return (
    <Link
      to={href}
      className={`group relative inline-flex items-center py-2 font-body text-[13.5px] font-medium tracking-[-0.005em] whitespace-nowrap transition-colors duration-[280ms] ease-smooth focus-visible:outline focus-visible:outline-2 focus-visible:outline-green focus-visible:outline-offset-2 ${
        active ? 'text-white' : 'text-[rgba(255,255,255,0.72)] hover:text-white'
      } ${className}`}
      {...anchorProps}
    >
      {children}
      {/* Hover underline (transparent when inactive) + active green hairline, matching legacy's
          .nav__link::after / .nav__link--active::after pair. */}
      <span
        aria-hidden="true"
        className={`absolute left-0 right-0 bottom-0 origin-left transition-transform duration-[560ms] ease-smooth ${
          active
            ? 'h-[2px] scale-x-100 bg-green'
            : 'h-px scale-x-0 bg-[rgba(255,255,255,0.32)] group-hover:scale-x-100'
        }`}
      />
    </Link>
  )
}
