import { Link } from 'react-router'
import { AppShell } from '../../components/AppShell'
import { MailIcon, PageHero, RevealOnScroll } from '../../components/ui'
import { CURRENT_USER, PROFILE_MENU_ITEMS } from '../../mocks/currentUser'
import { SITE_OWNERS } from '../../mocks/siteOwners'

interface SiteOwnersPageProps {
  generalRequestHref?: string
}

export function SiteOwnersPage({ generalRequestHref = '/under-development?from=general-hub-request' }: SiteOwnersPageProps) {
  return (
    <AppShell
      user={CURRENT_USER}
      profileMenuItems={PROFILE_MENU_ITEMS}
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Site Owners' }]}
      contextBarRight={
        <Link to="/start-here" className="font-mono text-[10px] tracking-[0.5px] text-green/60 hover:text-green transition-colors">
          Start Here →
        </Link>
      }
    >
      <RevealOnScroll className="mb-[72px]">
        <PageHero
          kicker="Site Owners"
          title={
            <>
              Who runs
              <br />
              the Hub
            </>
          }
          description="The Hub is a permission-aware, always-current system — and every corner of it has a named owner. If something's broken, missing, or needs a decision, here's who to reach."
        />
      </RevealOnScroll>

      <div className="font-mono text-[10px] font-medium tracking-[2.5px] uppercase text-text-muted mb-[22px] flex items-center gap-3.5">
        Administrators
        <span className="flex-1 h-px bg-rule" aria-hidden="true" />
        <span className="font-body text-[11px] font-normal tracking-normal normal-case whitespace-nowrap text-text-muted italic">
          Hub design, content, and operations
        </span>
      </div>

      <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-5 mb-[72px]">
        {SITE_OWNERS.map((owner) => (
          <RevealOnScroll
            key={owner.name}
            as="a"
            href={`/my-profile?viewer=colleague&user=${encodeURIComponent(owner.name)}`}
            className="group block bg-white border border-rule p-8 max-md:p-6 relative overflow-hidden shadow-[0_1px_2px_rgba(15,35,64,0.04)] transition-all duration-[350ms] ease-smooth hover:border-navy-mid hover:shadow-[0_8px_24px_rgba(27,54,93,0.10)] hover:-translate-y-0.5"
          >
            <span
              aria-hidden="true"
              className="absolute top-0 left-0 right-0 h-[2px] bg-green shadow-[0_0_10px_rgba(76,187,23,0.25)] origin-left scale-x-0 transition-transform duration-[550ms] ease-smooth group-hover:scale-x-100"
            />
            <div className="flex items-start gap-[18px] mb-5">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center font-mono text-sm font-bold text-white shrink-0 shadow-[0_0_0_2px_rgba(76,187,23,0.15),inset_0_1px_0_rgba(255,255,255,0.2)]"
                style={{ background: owner.avatarGradient }}
              >
                {owner.initials}
              </div>
              <div>
                <div className="font-display text-[1.2rem] font-bold text-navy tracking-[-0.015em] leading-[1.25] mb-1">{owner.name}</div>
                <div className="font-mono text-[10px] tracking-[1.5px] uppercase text-green-dark font-medium">{owner.title}</div>
              </div>
            </div>
            <div className="text-[13px] text-text-secondary leading-[1.7] mb-[22px]">
              <strong className="text-navy font-semibold">Manages:</strong> {owner.manages}
            </div>
            <div className="flex items-center gap-2.5 pt-5 border-t border-rule-light">
              <span className="font-mono text-[11px] text-text-secondary tracking-[0.3px]">{owner.email}</span>
              <span className="ml-auto font-body text-[11px] font-bold text-green-dark px-3.5 py-1.5 border border-green/30 bg-green/[0.06] transition-all duration-[250ms] inline-flex items-center gap-1.5 group-hover:bg-green group-hover:text-white group-hover:border-green group-hover:shadow-[0_0_14px_rgba(76,187,23,0.35)]">
                {owner.contactIcon === 'mail' && <MailIcon size={11} strokeWidth={2} />}
                {owner.contactLabel}
              </span>
            </div>
          </RevealOnScroll>
        ))}
      </div>

      <RevealOnScroll className="bg-[linear-gradient(180deg,#17304f,#0F2340,#0b1c35)] border border-white/[0.06] p-[40px_48px] max-md:p-7 mb-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_8px_24px_rgba(0,0,0,0.20)] grid grid-cols-[1fr_auto] gap-8 items-center max-lg:grid-cols-1 max-lg:text-left">
        <div>
          <div className="font-mono text-[10px] tracking-[2px] uppercase text-green mb-2 [text-shadow:0_0_8px_rgba(76,187,23,0.3)]">
            Can&rsquo;t Find The Right Person?
          </div>
          <div className="font-display text-[1.4rem] font-bold text-white mb-2 tracking-[-0.015em]">General Hub questions</div>
          <p className="text-[13.5px] text-text-inverse-secondary leading-[1.7] max-w-[580px]">
            Not sure who to ask? Submit a general request and it&rsquo;ll be routed to the right owner within one
            business day. For urgent issues, use the &ldquo;Report an Issue&rdquo; form at the footer of any page.
          </p>
        </div>
        <a
          href={generalRequestHref}
          className="font-body text-xs font-bold tracking-[0.04em] whitespace-nowrap bg-green text-white px-6 py-3 inline-flex items-center gap-2 shadow-[0_0_24px_rgba(76,187,23,0.25),0_2px_8px_rgba(0,0,0,0.2)] transition-all duration-300 ease-smooth hover:bg-green-dark hover:-translate-y-px hover:shadow-[0_0_32px_rgba(76,187,23,0.45)] max-lg:justify-self-start"
        >
          Submit a Request →
        </a>
      </RevealOnScroll>
    </AppShell>
  )
}
