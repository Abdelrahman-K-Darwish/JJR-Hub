import type { ReactNode } from 'react'
import { ChevronLeftIcon, ShieldIcon } from './ui'

export interface BareLayoutUser {
  name: string
  initials: string
}

interface BareLayoutProps {
  /** Label next to the shield glyph in the admin bar, e.g. "Hub Actions". */
  section: string
  user: BareLayoutUser
  backHref?: string
  children: ReactNode
}

/**
 * Chrome-less layout for standalone/modal surfaces — `admin-actions.html` in the mockups has
 * no nav, no footer, no Access & Equity panel by design (conversion-plan.md §1). It gets its
 * own minimal admin bar instead of AppShell's full nav, never AppShell forced onto it.
 */
export function BareLayout({ section, user, backHref = '/', children }: BareLayoutProps) {
  return (
    <div className="min-h-screen relative bg-off-white">
      <header className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center bg-[linear-gradient(180deg,#17304f_0%,#0F2340_40%,#0b1c35_100%)] shadow-[0_2px_8px_rgba(0,0,0,0.25)]">
        <div className="w-full max-w-[1280px] mx-auto px-10 flex items-center justify-between h-full">
          <div className="flex items-center gap-6">
            <a href="/" className="flex items-baseline gap-1">
              <span className="font-display text-[20px] font-black tracking-tight text-white leading-none">JJR</span>
              <span className="font-display text-[20px] font-black tracking-tight text-green leading-none">Admin</span>
            </a>
            <div className="w-px h-5 bg-white/10" aria-hidden="true" />
            <div className="flex items-center gap-2 font-mono text-[10px] tracking-[1.5px] uppercase text-white/55">
              <ShieldIcon size={11} strokeWidth={1.8} />
              {section}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href={backHref} className="font-body text-[12px] text-white/55 hover:text-green transition-colors flex items-center gap-1.5">
              <ChevronLeftIcon size={11} strokeWidth={2} />
              Back to Hub
            </a>
            <div className="w-px h-5 bg-white/10" aria-hidden="true" />
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-[10.5px] text-white bg-[linear-gradient(135deg,#3da312,#4CBB17,#7de852)]">
                {user.initials}
              </div>
              <span className="font-body text-[12px] text-white/70">{user.name}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1280px] mx-auto px-10 pt-[88px] pb-24 relative z-[2] max-md:px-6">
        {children}
      </main>
    </div>
  )
}
