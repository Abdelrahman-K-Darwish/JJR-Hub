import type { ReactNode } from 'react'
import { BellIcon, DropdownPanel, MailIcon, NavActive, SearchBar, ShimmerText } from './ui'

export interface NavLink {
  label: string
  href: string
  key: string
}

export interface ProfileMenuItem {
  label: string
  href: string
  icon?: ReactNode
  tone?: 'default' | 'danger'
}

export interface AppShellUser {
  name: string
  initials: string
  title: string
}

export interface BreadcrumbItem {
  label: string
  href?: string
}

const PRIMARY_LINKS: NavLink[] = [
  { key: 'home', label: 'Home', href: '/' },
  { key: 'projects', label: 'Projects', href: '/projects' },
  { key: 'knowledge', label: 'Knowledge', href: '/knowledge' },
  { key: 'communities', label: 'Communities', href: '/communities' },
]

const SECONDARY_LINKS: NavLink[] = [
  { key: 'help', label: 'Help', href: '/tool-guides' },
  { key: 'training', label: 'Training', href: '/start-here' },
]

interface AppShellProps {
  /** Key of the primary nav link to mark active. Never derived from role — purely current route. */
  activeNav?: string
  user: AppShellUser
  profileMenuItems: ProfileMenuItem[]
  breadcrumbs?: BreadcrumbItem[]
  /** Right-aligned slot in the context bar, e.g. a live count or a page-specific link. */
  contextBarRight?: ReactNode
  children: ReactNode
}

/**
 * The shared chrome present on every standard page: nav, context bar, main landmark, footer.
 * Purely presentational — takes the signed-in user's display data as props, never resolves
 * identity or permissions itself. See CLAUDE.md §1 and conversion-plan.md §7.
 */
export function AppShell({
  activeNav,
  user,
  profileMenuItems,
  breadcrumbs,
  contextBarRight,
  children,
}: AppShellProps) {
  return (
    <div className="min-h-screen flex flex-col bg-off-white">
      <header className="fixed top-0 left-0 right-0 z-[200] h-14 flex items-center bg-[linear-gradient(180deg,#17304f_0%,#0F2340_40%,#0b1c35_100%)] border-t border-t-white/[0.06] border-b border-b-black/30 shadow-[0_2px_8px_rgba(0,0,0,0.25),0_1px_2px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.04)]">
        <div className="w-full max-w-[1400px] mx-auto px-12 flex items-center justify-between h-full">
          <a href="/" className="flex flex-col">
            <div className="flex items-baseline gap-1">
              <ShimmerText as="span" className="font-display text-xl font-extrabold tracking-tight">
                JJR
              </ShimmerText>
              <ShimmerText as="span" className="font-display text-xl font-extrabold tracking-tight" delay="0.4s">
                Hub
              </ShimmerText>
            </div>
            <div className="font-body text-[9px] font-medium tracking-[1.8px] uppercase text-text-inverse-secondary -mt-px">
              Your front door
            </div>
          </a>

          <nav aria-label="Primary" className="flex items-center h-full gap-0.5">
            {PRIMARY_LINKS.map((link) => (
              <NavActive key={link.key} href={link.href} active={activeNav === link.key}>
                {link.label}
              </NavActive>
            ))}
            <span className="text-[11px] text-text-inverse-muted mx-2 select-none" aria-hidden="true">
              /
            </span>
            {SECONDARY_LINKS.map((link) => (
              <a
                key={link.key}
                href={link.href}
                className="font-body text-[13px] font-medium text-text-inverse-secondary px-4 h-full flex items-center transition-colors duration-200 hover:text-green"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <SearchBar placeholder="Search..." aria-label="Search" />

            <button
              type="button"
              className="w-8 h-8 border-none bg-transparent flex items-center justify-center text-text-inverse-muted cursor-pointer transition-colors duration-200 hover:text-white relative"
              aria-label="Notifications"
            >
              <BellIcon size={15} strokeWidth={1.6} />
              <span className="absolute top-[5px] right-[5px] w-[5px] h-[5px] bg-green rounded-full border border-navy-deep" aria-hidden="true" />
            </button>

            <button
              type="button"
              className="w-8 h-8 border-none bg-transparent flex items-center justify-center text-text-inverse-muted cursor-pointer transition-colors duration-200 hover:text-white"
              aria-label="Messages"
            >
              <MailIcon size={15} strokeWidth={1.6} />
            </button>

            <DropdownPanel
              label="Profile menu"
              className="ml-2.5"
              trigger={({ onClick, ref }) => (
                <button
                  ref={ref}
                  type="button"
                  onClick={onClick}
                  aria-haspopup="true"
                  className="w-8 h-8 bg-[linear-gradient(135deg,#3da312_0%,#4CBB17_50%,#7de852_100%)] border-[1.5px] border-white/15 rounded-full flex items-center justify-center font-body text-[11px] font-bold text-white cursor-pointer p-0 shadow-[0_0_0_2px_rgba(76,187,23,0.2),0_2px_6px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.25)] transition-transform duration-300 ease-smooth tracking-[0.3px] hover:scale-[1.06] relative"
                >
                  {user.initials}
                  <span className="absolute top-[-1px] right-[-1px] w-2 h-2 rounded-full bg-white border-[1.5px] border-navy-deep pointer-events-none" />
                </button>
              )}
            >
              <div className="p-[18px] border-b border-rule-light flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[linear-gradient(135deg,#3da312_0%,#4CBB17_50%,#7de852_100%)] flex items-center justify-center font-body text-sm font-bold text-white shrink-0">
                  {user.initials}
                </div>
                <div>
                  <div className="font-display text-[15px] font-bold text-navy tracking-[-0.01em]">{user.name}</div>
                  <div className="font-mono text-[9.5px] font-medium text-text-muted tracking-[1.2px] uppercase mt-[3px]">
                    {user.title}
                  </div>
                </div>
              </div>
              <div className="py-1.5">
                {profileMenuItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    role="menuitem"
                    className={`flex items-center gap-[11px] py-2.5 px-[18px] font-body text-[12.5px] font-medium cursor-pointer transition-[background,color,padding-left] duration-200 ease-smooth hover:pl-[22px] ${
                      item.tone === 'danger' ? 'text-pink hover:bg-pink/[0.05]' : 'text-navy hover:bg-off-white hover:text-green-dark'
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </a>
                ))}
              </div>
            </DropdownPanel>
          </div>
        </div>
      </header>

      {breadcrumbs && breadcrumbs.length > 0 && (
        <div className="mt-14 bg-[linear-gradient(180deg,#152a48_0%,#1B365D_50%,#1e3a63_100%)] border-b border-black/[0.12] shadow-[inset_0_2px_6px_rgba(0,0,0,0.2),0_1px_0_rgba(255,255,255,0.02)]">
          <div className="max-w-[1400px] mx-auto px-12 py-2.5 flex items-center justify-between">
            <nav aria-label="Breadcrumb" className="flex items-center gap-3">
              {breadcrumbs.map((crumb, i) => (
                <span key={crumb.label} className="flex items-center gap-3">
                  {i > 0 && (
                    <span className="text-text-inverse-muted text-[10px]" aria-hidden="true">
                      /
                    </span>
                  )}
                  {crumb.href ? (
                    <a
                      href={crumb.href}
                      className="font-mono text-[10px] text-text-inverse-secondary tracking-wide hover:text-white transition-colors"
                    >
                      {crumb.label}
                    </a>
                  ) : (
                    <span className="font-mono text-[10px] text-text-inverse-secondary tracking-wide" aria-current="page">
                      {crumb.label}
                    </span>
                  )}
                </span>
              ))}
            </nav>
            {contextBarRight && <div className="flex items-center gap-4">{contextBarRight}</div>}
          </div>
        </div>
      )}

      <main className={`flex-1 w-full max-w-[1400px] mx-auto px-12 pt-10 pb-24 max-md:px-6 max-md:pt-6 max-md:pb-16 ${breadcrumbs?.length ? '' : 'mt-14'}`}>
        {children}
      </main>

      <footer className="bg-[linear-gradient(180deg,#17304f_0%,#0F2340_30%,#0b1c35_100%)] border-t border-t-white/[0.06] shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_-2px_12px_rgba(0,0,0,0.1)]">
        <div className="max-w-[1400px] mx-auto px-12 py-7 flex items-center gap-6 border-b border-white/[0.04] max-md:flex-wrap max-md:px-6">
          <div
            aria-hidden="true"
            className="w-[3px] h-9 shrink-0 bg-[linear-gradient(180deg,#4CBB17,#7de852,#4CBB17)] bg-[length:100%_200%] animate-shimmer"
          />
          <div>
            <div className="font-mono text-[10px] font-medium tracking-[2px] uppercase text-green mb-1">Access &amp; Equity</div>
            <p className="text-[13px] text-text-inverse-secondary leading-relaxed">
              Every access decision in this hub is intentional, documented, and reviewed quarterly. If
              something&rsquo;s blocked that shouldn&rsquo;t be, that&rsquo;s worth raising.
            </p>
          </div>
          <a
            href="/report-access-concern"
            className="text-xs font-bold text-green whitespace-nowrap ml-auto transition-colors duration-200 hover:text-green-bright"
          >
            Report an access concern →
          </a>
        </div>
        <div className="max-w-[1400px] mx-auto px-12 py-4 flex items-center justify-between max-md:flex-col max-md:gap-2 max-md:text-center max-md:px-6">
          <span className="text-[11px] text-text-inverse-secondary">JJR Hub — permission-aware, always current</span>
          <div className="flex gap-5">
            <a href="/accessibility" className="text-[11px] text-text-inverse-secondary transition-colors duration-150 hover:text-green">
              Accessibility
            </a>
            <a href="/report-an-issue" className="text-[11px] text-text-inverse-secondary transition-colors duration-150 hover:text-green">
              Report an Issue
            </a>
            <a href="/site-owners" className="text-[11px] text-text-inverse-secondary transition-colors duration-150 hover:text-green">
              Site Owners
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
