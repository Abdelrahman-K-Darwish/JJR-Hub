import { Link } from 'react-router'
import { AppShell } from '../../components/AppShell'
import { ChevronLeftIcon, HeroGrain, HeroKicker } from '../../components/ui'
import { CURRENT_USER, PROFILE_MENU_ITEMS } from '../../mocks/currentUser'
import { DEFAULT_FEATURE_NAME } from '../../mocks/underDevelopment'

interface UnderDevelopmentPageProps {
  /** Already-formatted section name — the mockup derived this from `?from=`, the caller does now. */
  featureName?: string
  notifyHref?: string
  homeHref?: string
}

export function UnderDevelopmentPage({
  featureName = DEFAULT_FEATURE_NAME,
  notifyHref = '/under-development?from=notify-me-when-ready',
  homeHref = '/',
}: UnderDevelopmentPageProps) {
  return (
    <AppShell
      user={CURRENT_USER}
      profileMenuItems={PROFILE_MENU_ITEMS}
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Under Development' }]}
      contextBarRight={
        <Link to="/start-here" className="font-mono text-[10px] tracking-[0.5px] text-green/60 hover:text-green transition-colors">
          Start Here →
        </Link>
      }
    >
      <div className="flex-1 max-w-[840px] mx-auto flex flex-col items-center text-center">
        <div className="relative overflow-hidden bg-[linear-gradient(135deg,#0F2340_0%,#1B365D_55%,#2A4A78_100%)] p-[80px_72px] max-lg:p-[56px_36px] w-full shadow-[0_24px_80px_rgba(15,35,64,0.25),0_4px_16px_rgba(15,35,64,0.15)] border-t border-t-white/[0.08]">
          <HeroGrain />
          <div
            aria-hidden="true"
            className="absolute w-[1200px] h-[360px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(76,187,23,0.12),rgba(76,187,23,0)_60%)] pointer-events-none z-0 blur-[30px] animate-breathe"
          />
          <div className="absolute top-7 right-8 w-[70px] h-[70px] border border-green/25 pointer-events-none" aria-hidden="true" />
          <div className="absolute top-9 right-10 w-[70px] h-[70px] border border-green/10 pointer-events-none" aria-hidden="true" />

          <div className="relative z-[1] text-center">
            <div className="w-16 h-16 mx-auto mb-7 flex items-center justify-center bg-green/10 border border-green/30 text-green-bright shadow-[0_0_20px_rgba(76,187,23,0.25),inset_0_1px_0_rgba(255,255,255,0.06)]">
              <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
            </div>

            <HeroKicker className="mb-[18px]">In Progress</HeroKicker>

            <h1 className="font-display text-[clamp(2.2rem,4.5vw,3rem)] font-bold text-white leading-[1.05] tracking-[-0.025em] mb-5">
              <span className="text-green-bright italic">{featureName}</span>
              <br />
              is being built
            </h1>

            <p className="text-[15px] leading-[1.75] text-text-inverse-secondary max-w-[520px] mx-auto mb-9">
              Thanks for your patience. This part of the Hub is actively under development — we&rsquo;ll notify you
              when it&rsquo;s ready. If this is blocking you, let us know so we can prioritise.
            </p>

            <div className="flex items-center justify-center gap-3.5 flex-wrap">
              <button
                type="button"
                onClick={() => (window.history.length > 1 ? window.history.back() : (window.location.href = homeHref))}
                className="font-body text-xs font-bold tracking-[0.04em] bg-green text-white px-[26px] py-3 inline-flex items-center gap-2 cursor-pointer shadow-[0_0_24px_rgba(76,187,23,0.25),0_2px_8px_rgba(0,0,0,0.2)] transition-all duration-300 ease-smooth hover:bg-green-dark hover:-translate-y-px hover:shadow-[0_0_32px_rgba(76,187,23,0.45)]"
              >
                <ChevronLeftIcon size={12} strokeWidth={2.4} />
                Go Back
              </button>
              <a
                href={notifyHref}
                className="font-body text-xs font-bold tracking-[0.04em] bg-transparent border border-text-inverse-muted text-text-inverse-secondary px-[26px] py-3 inline-flex items-center gap-2 transition-all duration-300 ease-smooth hover:border-green hover:text-green"
              >
                Notify me when it&rsquo;s ready →
              </a>
              <a
                href={homeHref}
                className="font-body text-xs font-bold tracking-[0.04em] bg-transparent border border-text-inverse-muted text-text-inverse-secondary px-[26px] py-3 inline-flex items-center gap-2 transition-all duration-300 ease-smooth hover:border-green hover:text-green"
              >
                Return Home
              </a>
            </div>

            <div className="mt-12 font-mono text-[10px] text-text-inverse-secondary tracking-[1.5px] uppercase flex items-center gap-2.5 justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-green shadow-[0_0_6px_rgba(76,187,23,0.25)] animate-pulse" aria-hidden="true" />
              <span>Active development · Updates via Power Automate</span>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
