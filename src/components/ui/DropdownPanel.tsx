import { useEffect, useRef, useState, type ReactNode } from 'react'

interface DropdownPanelProps {
  trigger: (props: { onClick: () => void; ref: React.RefObject<HTMLButtonElement> }) => ReactNode
  children: ReactNode
  align?: 'left' | 'right'
  label: string
  className?: string
}

/**
 * The profile/notification dropdown pattern shared across every page.
 * Owns its own open state, outside-click, and Escape handling — the mockups
 * rewired this by hand with getElementById on each page.
 */
export function DropdownPanel({ trigger, children, align = 'right', label, className = '' }: DropdownPanelProps) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    function onDocClick(event: MouseEvent) {
      const target = event.target as Node
      if (panelRef.current?.contains(target) || triggerRef.current?.contains(target)) return
      setOpen(false)
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('click', onDocClick)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('click', onDocClick)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div className={`relative ${className}`}>
      {trigger({ onClick: () => setOpen((v) => !v), ref: triggerRef })}
      <div
        ref={panelRef}
        role="menu"
        aria-label={label}
        className={`absolute top-[calc(100%+12px)] ${align === 'right' ? 'right-0' : 'left-0'} w-60 bg-white border border-rule shadow-[0_1px_2px_rgba(15,35,64,0.06),0_16px_40px_rgba(15,35,64,0.18),0_4px_12px_rgba(15,35,64,0.10)] z-[300] transition-[opacity,transform] duration-[250ms] ease-smooth ${
          open ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' : 'opacity-0 -translate-y-2 scale-[0.98] pointer-events-none'
        }`}
      >
        {children}
      </div>
    </div>
  )
}
