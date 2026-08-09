import type { ElementType, ReactNode } from 'react'

interface ShimmerTextProps {
  children: ReactNode
  as?: ElementType
  speed?: '6s' | '9s'
  delay?: string
  className?: string
}

/** Animated gradient-text shimmer used for the JJR/Hub wordmark and section accents. */
export function ShimmerText({
  children,
  as: Tag = 'span',
  speed = '6s',
  delay,
  className = '',
}: ShimmerTextProps) {
  return (
    <Tag
      className={`bg-[linear-gradient(135deg,#3da312_0%,#4CBB17_20%,#7de852_35%,#b8f5a0_42%,#4CBB17_50%,#3da312_65%,#5cd42a_80%,#a4f08a_88%,#4CBB17_100%)] bg-[length:200%_100%] bg-clip-text text-transparent animate-[shimmer_var(--shimmer-speed)_ease-in-out_infinite] ${className}`}
      style={{ '--shimmer-speed': speed, animationDelay: delay } as React.CSSProperties}
    >
      {children}
    </Tag>
  )
}
