import { useEffect, useRef, useState, type ComponentPropsWithoutRef, type ElementType, type ReactNode } from 'react'

interface RevealOnScrollOwnProps<T extends ElementType> {
  children: ReactNode
  className?: string
  /** Fraction of the element visible before it reveals. */
  threshold?: number
  as?: T
}

type RevealOnScrollProps<T extends ElementType> = RevealOnScrollOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof RevealOnScrollOwnProps<T> | 'ref'>

/** Fades an element in the first time it enters the viewport. One shared observer per instance. */
export function RevealOnScroll<T extends ElementType = 'div'>({
  children,
  className = '',
  threshold = 0.15,
  as,
  ...rest
}: RevealOnScrollProps<T>) {
  const Tag = (as ?? 'div') as ElementType
  const ref = useRef<HTMLElement>(null)
  // Reduced-motion users get fully-visible content immediately — no scroll-triggered hidden
  // state, no transition. Read the media query once per mount; this component's usages are all
  // static pages, not dynamic-preference toggles mid-session, so a one-time read is sufficient.
  const [reducedMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true,
  )
  const [visible, setVisible] = useState(reducedMotion)

  useEffect(() => {
    if (reducedMotion) return
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, reducedMotion])

  return (
    <Tag
      ref={ref}
      className={
        reducedMotion
          ? `opacity-100 translate-y-0 ${className}`
          : `transition-all duration-700 ease-smooth ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${className}`
      }
      {...rest}
    >
      {children}
    </Tag>
  )
}
