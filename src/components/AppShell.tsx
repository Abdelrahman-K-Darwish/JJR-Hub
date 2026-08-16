import { useState, type ReactNode } from 'react'
import { Link } from 'react-router'
import { BellIcon, ChevronDownIcon, DropdownPanel, MailIcon, NavActive, SearchBar, SearchIcon, ShimmerText } from './ui'

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
  // Canonical path is /active-projects (matches the feature folder and PAGE-INVENTORY P-04);
  // this previously pointed at /projects, which has no route.
  { key: 'projects', label: 'Projects', href: '/active-projects' },
  // Templates is the "Knowledge library" page (PAGE-INVENTORY P-07); this previously pointed
  // at /knowledge, which has no route.
  { key: 'knowledge', label: 'Knowledge', href: '/templates' },
  { key: 'communities', label: 'Communities', href: '/communities' },
]

/** Training dropdown items — all three targets are existing, already-registered routes (the
    same `/under-development?from=...` deep-link pattern used elsewhere in the codebase), so
    nothing here invents a route. Per CLAUDE.md §7, this is presentation only, not a new
    workflow. */
const TRAINING_MENU_ITEMS = [
  {
    key: 'start-here',
    href: '/start-here',
    kicker: 'Begin Here',
    title: 'Start Here →',
    desc: 'Your guided tour of the JJR Hub — built for first-time and returning consultants.',
    featured: true,
  },
  {
    key: 'all-training',
    href: '/under-development?from=all-training',
    title: 'All Training Modules',
    desc: 'Browse every course, video walkthrough, and policy module.',
    featured: false,
  },
  {
    key: 'my-progress',
    href: '/under-development?from=my-progress',
    title: 'My Progress',
    desc: 'Track completed modules, certifications, and required reading.',
    featured: false,
  },
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

/** Naked circular icon well matching legacy's `.nav__icon` — no container, a soft radial
    backdrop fades in on hover instead of a filled button. */
function NavIconButton({
  children,
  label,
  showDot,
  onClick,
  ariaHaspopup,
  ariaExpanded,
  buttonRef,
  className = '',
}: {
  children: ReactNode
  label: string
  showDot?: boolean
  onClick?: () => void
  ariaHaspopup?: boolean
  ariaExpanded?: boolean
  buttonRef?: React.RefObject<HTMLButtonElement>
  className?: string
}) {
  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-haspopup={ariaHaspopup}
      aria-expanded={ariaExpanded}
      className={`group relative w-9 h-9 rounded-full inline-flex items-center justify-center bg-transparent border-none text-[rgba(255,255,255,0.55)] cursor-pointer transition-colors duration-[320ms] ease-smooth hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-green focus-visible:outline-offset-2 ${className}`}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-[rgba(255,255,255,0.04)] scale-[0.6] opacity-0 transition-[transform,opacity] duration-[360ms] ease-smooth group-hover:scale-100 group-hover:opacity-100"
      />
      <span className="relative z-[1] inline-flex items-center justify-center">{children}</span>
      {showDot && (
        <span
          aria-hidden="true"
          className="absolute top-[7px] right-[7px] w-[7px] h-[7px] rounded-full bg-green border-[1.5px] border-navy-deep shadow-[0_0_6px_rgba(76,187,23,0.55)] z-[1]"
        />
      )}
    </button>
  )
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
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col bg-off-white">
      <header className="fixed top-0 left-0 right-0 z-[200] h-[68px] flex items-center bg-navy-deep border-b border-[rgba(255,255,255,0.06)]">
        <div className="w-full max-w-[1400px] mx-auto px-10 max-lg:px-6 flex items-center justify-between gap-10 h-full">
          {/* Brand — shimmering JJR wordmark, restored to the original animated treatment. */}
          <Link to="/" className="flex flex-col shrink-0 transition-opacity duration-[360ms] ease-smooth hover:opacity-90">
            <span className="flex items-baseline gap-1.5">
              <ShimmerText as="span" className="font-display text-2xl font-black tracking-tight leading-none">
                JJR
              </ShimmerText>
              <ShimmerText as="span" className="font-display text-2xl font-black tracking-tight leading-none" delay="0.4s">
                Hub
              </ShimmerText>
            </span>
            <span className="font-body text-[9px] font-medium tracking-[1.8px] uppercase text-[rgba(255,255,255,0.65)] -mt-px max-md:hidden">
              Your front door
            </span>
          </Link>

          <nav aria-label="Primary" className="items-center h-full gap-9 hidden lg:flex">
            {PRIMARY_LINKS.map((link) => (
              <NavActive key={link.key} href={link.href} active={activeNav === link.key}>
                {link.label}
              </NavActive>
            ))}
            <span className="inline-block w-px h-3.5 bg-[rgba(255,255,255,0.12)]" aria-hidden="true" />
            <NavActive href="/tool-guides" active={activeNav === 'help'}>
              Help
            </NavActive>

            <DropdownPanel
              label="Training menu"
              align="center"
              panelClassName="absolute top-[calc(100%+10px)] left-1/2 -translate-x-1/2 min-w-[280px] bg-white border border-rule rounded-xl shadow-[0_1px_2px_rgba(15,35,64,0.06),0_22px_60px_rgba(15,35,64,0.20),0_4px_14px_rgba(15,35,64,0.10)] p-2"
              trigger={({ onClick, ref, open }) => (
                <button
                  ref={ref}
                  type="button"
                  onClick={onClick}
                  aria-haspopup="true"
                  aria-expanded={open}
                  className="group relative inline-flex items-center gap-[7px] py-2 font-body text-[13.5px] font-medium text-[rgba(255,255,255,0.72)] tracking-[-0.005em] transition-colors duration-[280ms] ease-smooth hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-green focus-visible:outline-offset-2"
                >
                  Training
                  <ChevronDownIcon
                    size={9}
                    strokeWidth={2.4}
                    className={`opacity-50 transition-[transform,opacity] duration-[360ms] ease-smooth group-hover:opacity-90 ${open ? 'opacity-90 rotate-180' : ''}`}
                  />
                </button>
              )}
            >
              {TRAINING_MENU_ITEMS.map((item, i) => (
                <div key={item.key}>
                  {i === 1 && <div className="h-px bg-rule-light my-1.5 mx-1" aria-hidden="true" />}
                  <Link
                    to={item.href}
                    role="menuitem"
                    className={`flex items-start gap-[11px] p-3 rounded-lg transition-colors duration-[180ms] ease-smooth ${
                      item.featured
                        ? 'bg-gradient-to-br from-green/[0.06] to-green/[0.02] border border-green/[0.18] hover:from-green/[0.12] hover:to-green/[0.04] hover:border-green/[0.32]'
                        : 'hover:bg-off-white'
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      {item.kicker && (
                        <div className="font-mono text-[9px] font-semibold tracking-[1.4px] uppercase text-green-dark mb-0.5">
                          {item.kicker}
                        </div>
                      )}
                      <div className="font-body text-[13px] font-bold text-navy tracking-[-0.005em] leading-tight">{item.title}</div>
                      <div className="font-body text-[11.5px] text-text-secondary leading-[1.5] mt-0.5">{item.desc}</div>
                    </div>
                  </Link>
                </div>
              ))}
            </DropdownPanel>
          </nav>

          <div className="flex items-center gap-1.5">
            {/* Full field only once there's room to spare (xl+, ≥1280px) — at 1024–1279 the
                centre nav's gap-9 rhythm takes priority per spec, so the field collapses to the
                icon-only trigger below instead of squeezing the nav. */}
            <div className="hidden xl:block w-[220px]">
              <SearchBar placeholder="Search..." aria-label="Search the hub" />
            </div>
            {/* Icon-only trigger for narrower widths where the full field would crowd the nav —
                presentational only, opens nothing yet since it shares the same deferred (D-010)
                search surface as the full field. */}
            <button
              type="button"
              aria-label="Search the hub"
              className="hidden lg:inline-flex xl:hidden w-9 h-9 rounded-full items-center justify-center bg-transparent border-none text-[rgba(255,255,255,0.55)] hover:text-white transition-colors duration-[320ms] ease-smooth focus-visible:outline focus-visible:outline-2 focus-visible:outline-green focus-visible:outline-offset-2"
            >
              <SearchIcon size={14} strokeWidth={1.8} aria-hidden="true" />
            </button>

            <NavIconButton label="Messages">
              <MailIcon size={15} strokeWidth={1.6} />
            </NavIconButton>

            <NavIconButton label="Notifications" showDot ariaHaspopup ariaExpanded={false}>
              <BellIcon size={15} strokeWidth={1.6} />
            </NavIconButton>

            <DropdownPanel
              label="Profile menu"
              className="ml-1"
              trigger={({ onClick, ref }) => (
                <button
                  ref={ref}
                  type="button"
                  onClick={onClick}
                  aria-haspopup="true"
                  className="w-8 h-8 bg-green border-[1.5px] border-[rgba(255,255,255,0.18)] rounded-full flex items-center justify-center font-body text-[11px] font-bold text-white cursor-pointer p-0 transition-[transform,box-shadow] duration-200 ease-smooth tracking-[0.3px] hover:scale-[1.04] hover:shadow-[0_0_0_3px_rgba(76,187,23,0.22)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-green focus-visible:outline-offset-2 relative"
                >
                  {user.initials}
                  <span className="absolute top-[-1px] right-[-1px] w-2 h-2 rounded-full bg-white border-[1.5px] border-navy-deep pointer-events-none" />
                </button>
              )}
            >
              <div className="p-[18px] border-b border-rule-light flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-green flex items-center justify-center font-body text-sm font-bold text-white shrink-0">
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
                  <Link
                    key={item.label}
                    to={item.href}
                    role="menuitem"
                    className={`flex items-center gap-[11px] py-2.5 px-[18px] font-body text-[12.5px] font-medium cursor-pointer transition-[background,color,padding-left] duration-200 ease-smooth hover:pl-[22px] ${
                      item.tone === 'danger' ? 'text-pink hover:bg-pink/[0.05]' : 'text-navy hover:bg-off-white hover:text-green-dark'
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                ))}
              </div>
            </DropdownPanel>

            {/* Deliberate mobile nav pattern — not the desktop nav squeezed into place. Below the
                lg breakpoint the primary/secondary nav and search collapse behind a single toggle
                that opens a full-width drawer of stacked links. */}
            <button
              type="button"
              onClick={() => setMobileNavOpen((v) => !v)}
              aria-label={mobileNavOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileNavOpen}
              aria-controls="mobile-nav-drawer"
              className="lg:hidden w-9 h-9 rounded-full border-none bg-transparent flex items-center justify-center text-[rgba(255,255,255,0.72)] hover:text-white transition-colors duration-200 ease-smooth ml-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-green focus-visible:outline-offset-2"
            >
              <span className="relative w-4 h-[13px] flex flex-col justify-between">
                <span
                  aria-hidden="true"
                  className={`block h-px bg-current transition-transform duration-200 ${mobileNavOpen ? 'translate-y-[6px] rotate-45' : ''}`}
                />
                <span
                  aria-hidden="true"
                  className={`block h-px bg-current transition-opacity duration-150 ${mobileNavOpen ? 'opacity-0' : 'opacity-100'}`}
                />
                <span
                  aria-hidden="true"
                  className={`block h-px bg-current transition-transform duration-200 ${mobileNavOpen ? '-translate-y-[6px] -rotate-45' : ''}`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {mobileNavOpen && (
        <div
          id="mobile-nav-drawer"
          className="lg:hidden fixed top-[68px] left-0 right-0 z-[190] bg-[linear-gradient(180deg,#0F2340_0%,#0b1c35_100%)] border-b border-b-black/30 shadow-[0_8px_20px_rgba(0,0,0,0.3)]"
        >
          <div className="px-6 pt-3 pb-2">
            <SearchBar placeholder="Search..." aria-label="Search the hub" className="w-full" />
          </div>
          <nav aria-label="Primary" className="flex flex-col px-2 pb-3">
            {PRIMARY_LINKS.map((link) => (
              <Link
                key={link.key}
                to={link.href}
                onClick={() => setMobileNavOpen(false)}
                className={`relative font-body text-[14px] px-4 py-3 transition-colors duration-150 ${
                  activeNav === link.key ? 'font-semibold text-white' : 'font-medium text-text-inverse-secondary hover:text-white'
                }`}
              >
                {activeNav === link.key && (
                  <span aria-hidden="true" className="absolute left-0 top-2 bottom-2 w-[2px] bg-green shadow-[0_0_8px_rgba(76,187,23,0.6)]" />
                )}
                {link.label}
              </Link>
            ))}
            <span className="h-px bg-[rgba(255,255,255,0.06)] my-2 mx-4" aria-hidden="true" />
            <Link
              to="/tool-guides"
              onClick={() => setMobileNavOpen(false)}
              className="font-body text-[14px] font-medium text-text-inverse-secondary px-4 py-3 transition-colors duration-150 hover:text-white"
            >
              Help
            </Link>
            {TRAINING_MENU_ITEMS.slice(0, 1).map((item) => (
              <Link
                key={item.key}
                to={item.href}
                onClick={() => setMobileNavOpen(false)}
                className="font-body text-[14px] font-medium text-text-inverse-secondary px-4 py-3 transition-colors duration-150 hover:text-white"
              >
                Training
              </Link>
            ))}
          </nav>
        </div>
      )}

      {breadcrumbs && breadcrumbs.length > 0 && (
        <div className="mt-[68px] bg-[linear-gradient(180deg,#152a48_0%,#1B365D_50%,#1e3a63_100%)] border-b border-black/[0.12] shadow-[inset_0_2px_6px_rgba(0,0,0,0.2),0_1px_0_rgba(255,255,255,0.02)]">
          <div className="max-w-[1400px] mx-auto px-10 py-3 flex items-center justify-between">
            <nav aria-label="Breadcrumb" className="flex items-center gap-3">
              {breadcrumbs.map((crumb, i) => (
                <span key={crumb.label} className="flex items-center gap-3">
                  {i > 0 && (
                    <span className="text-text-inverse-muted text-[10px]" aria-hidden="true">
                      /
                    </span>
                  )}
                  {crumb.href ? (
                    <Link
                      to={crumb.href}
                      className="font-mono text-[10px] text-text-inverse-secondary tracking-wide hover:text-white transition-colors"
                    >
                      {crumb.label}
                    </Link>
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

      <main className={`flex-1 w-full max-w-[1400px] mx-auto px-12 pt-10 pb-24 max-md:px-6 max-md:pt-6 max-md:pb-16 ${breadcrumbs?.length ? '' : 'mt-[68px]'}`}>
        {children}
      </main>

      <footer className="bg-[linear-gradient(180deg,#17304f_0%,#0F2340_30%,#0b1c35_100%)] border-t border-t-[rgba(255,255,255,0.06)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_-2px_12px_rgba(0,0,0,0.1)]">
        <div className="max-w-[1400px] mx-auto px-12 py-[30px] flex items-center gap-6 border-b border-[rgba(255,255,255,0.04)] max-md:flex-wrap max-md:px-6 max-md:py-7">
          <div
            aria-hidden="true"
            className="w-[2px] h-[46px] shrink-0 bg-[linear-gradient(180deg,#3da312,#7de852,#3da312)] bg-[length:100%_200%] animate-shimmer shadow-[0_0_10px_rgba(76,187,23,0.25)] max-md:hidden"
          />
          <div className="max-w-[640px]">
            <div className="font-mono text-[10px] font-medium tracking-[2.5px] uppercase text-green mb-[5px]">Access &amp; Equity</div>
            <p className="text-[13px] text-[rgba(255,255,255,0.4)] leading-[1.65]">
              Every access decision in this hub is intentional, documented, and reviewed quarterly. If
              something&rsquo;s blocked that shouldn&rsquo;t be, that&rsquo;s worth raising.
            </p>
          </div>
          <Link
            to="/report-access-concern"
            className="text-xs font-bold text-green whitespace-nowrap ml-auto transition-colors duration-200 hover:text-green-bright max-md:ml-0"
          >
            Report an access concern →
          </Link>
        </div>
        <div className="max-w-[1400px] mx-auto px-12 py-[18px] flex items-center justify-between max-md:flex-col max-md:gap-3 max-md:text-center max-md:px-6">
          <span className="font-mono text-[11px] tracking-[0.5px] text-[rgba(255,255,255,0.2)]">JJR Hub — permission-aware, always current</span>
          <div className="flex items-center gap-6 font-body text-[11px] text-[rgba(255,255,255,0.3)]">
            <Link to="/accessibility" className="transition-colors duration-150 hover:text-green">
              Accessibility
            </Link>
            <Link to="/report-an-issue" className="transition-colors duration-150 hover:text-green">
              Report an Issue
            </Link>
            <Link to="/site-owners" className="transition-colors duration-150 hover:text-green">
              Site Owners
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
