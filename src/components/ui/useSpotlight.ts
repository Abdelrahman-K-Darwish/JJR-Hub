import { useRef, useCallback, type MouseEvent } from 'react'

/**
 * Cursor-following ambient glow. Attach the returned handler + ref to any
 * `relative`-positioned container; renders a radial-gradient that tracks the pointer
 * via CSS custom properties instead of per-frame React state.
 */
export function useSpotlight<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)

  const onMouseMove = useCallback((event: MouseEvent<T>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--spotlight-x', `${event.clientX - rect.left}px`)
    el.style.setProperty('--spotlight-y', `${event.clientY - rect.top}px`)
  }, [])

  return { ref, onMouseMove }
}
