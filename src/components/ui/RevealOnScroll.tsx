import { useEffect, useRef, useState, type ReactNode } from 'react'

interface RevealOnScrollProps {
  children: ReactNode
  className?: string
  /** Fraction of the element visible before it reveals. */
  threshold?: number
}

/** Fades an element in the first time it enters the viewport. One shared observer per instance. */
export function RevealOnScroll({ children, className = '', threshold = 0.15 }: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
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
  }, [threshold])

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-smooth ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${className}`}
    >
      {children}
    </div>
  )
}
