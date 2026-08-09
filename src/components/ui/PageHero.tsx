import type { ReactNode } from 'react'
import { HeroGrain } from './HeroGrain'
import { HeroKicker } from './HeroKicker'

interface PageHeroProps {
  kicker: string
  title: ReactNode
  description?: ReactNode
  className?: string
}

/** Dark gradient hero band used on content/policy pages (Accessibility, Site Owners, ...). */
export function PageHero({ kicker, title, description, className = '' }: PageHeroProps) {
  return (
    <div
      className={`relative overflow-hidden min-h-[320px] flex items-center bg-[linear-gradient(135deg,#0F2340_0%,#1B365D_55%,#2A4A78_100%)] ${className}`}
    >
      <HeroGrain />
      <div
        aria-hidden="true"
        className="absolute w-[1600px] h-[400px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(76,187,23,0.10),rgba(76,187,23,0)_60%)] pointer-events-none z-0 blur-[30px] animate-breathe"
      />
      <div className="absolute top-10 right-12 w-[90px] h-[90px] border border-green/20 pointer-events-none" aria-hidden="true" />
      <div className="absolute top-[50px] right-[58px] w-[90px] h-[90px] border border-green/[0.08] pointer-events-none" aria-hidden="true" />
      <div className="relative z-[1] p-14 max-md:p-6 max-w-[680px]">
        <HeroKicker leadRule className="mb-[18px]">
          {kicker}
        </HeroKicker>
        <h1 className="font-display text-[clamp(2.15rem,4vw,3rem)] font-bold text-white leading-[1.05] tracking-[-0.025em] mb-[22px]">
          {title}
        </h1>
        {description && <p className="text-[14.5px] leading-[1.75] text-white/50 max-w-[560px]">{description}</p>}
      </div>
    </div>
  )
}
