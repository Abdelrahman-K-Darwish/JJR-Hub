import { useState, type ReactNode } from 'react'
import { useSpotlight } from './useSpotlight'

interface SpotlightProps {
  children: ReactNode
  className?: string
  /** CSS color used at the center of the glow, e.g. "rgba(76,187,23,0.12)". */
  color?: string
}

/** Cursor-following ambient glow container. Parent handles its own `relative` sizing. */
export function Spotlight({
  children,
  className = '',
  color = 'rgba(76,187,23,0.12)',
}: SpotlightProps) {
  const { ref, onMouseMove } = useSpotlight<HTMLDivElement>()
  const [active, setActive] = useState(false)

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className={`relative ${className}`}
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${active ? 'opacity-100' : 'opacity-0'}`}
        style={{
          background: `radial-gradient(400px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), ${color}, transparent 70%)`,
        }}
      />
      {children}
    </div>
  )
}
