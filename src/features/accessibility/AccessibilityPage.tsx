import type { ReactNode } from 'react'
import { AppShell } from '../../components/AppShell'
import {
  FileIcon,
  InfoIcon,
  PageHero,
  QuickLinkList,
  RevealOnScroll,
  ShieldIcon,
  UsersIcon,
  type QuickLink,
} from '../../components/ui'
import { CURRENT_USER, PROFILE_MENU_ITEMS } from '../../mocks/currentUser'
import {
  ACCESSIBILITY_PRACTICES,
  ACCESSIBILITY_QUICK_LINKS,
  ISSUE_REPORT_FIELDS,
  STANDARDS_SUMMARY,
  type QuickLinkIcon,
} from '../../mocks/accessibility'

const QUICK_LINK_ICONS: Record<QuickLinkIcon, ReactNode> = {
  file: <FileIcon size={14} strokeWidth={1.8} />,
  accommodation: <UsersIcon size={14} strokeWidth={1.8} />,
  shield: <ShieldIcon size={14} strokeWidth={1.8} />,
  info: <InfoIcon size={14} strokeWidth={1.8} />,
}

interface AccessibilityPageProps {
  auditTrailHref?: string
  reportIssueHref?: string
}

export function AccessibilityPage({
  auditTrailHref = '/under-development?from=accessibility-audit-trail',
  reportIssueHref = '/under-development?from=report-an-issue',
}: AccessibilityPageProps) {
  const quickLinks: QuickLink[] = ACCESSIBILITY_QUICK_LINKS.map((link) => ({
    label: link.label,
    href: link.href,
    icon: QUICK_LINK_ICONS[link.icon],
  }))

  return (
    <AppShell
      user={CURRENT_USER}
      profileMenuItems={PROFILE_MENU_ITEMS}
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Accessibility' }]}
      contextBarRight={
        <a href="/start-here" className="font-mono text-[10px] tracking-[0.5px] text-green/60 hover:text-green transition-colors">
          Start Here →
        </a>
      }
    >
      <RevealOnScroll className="mb-[72px]">
        <PageHero
          kicker="Accessibility"
          title={
            <>
              Accessibility
              <br />
              at JJR Hub
            </>
          }
          description="This Hub is built to work for every JJR consultant — regardless of ability, device, or assistive technology. Accessibility isn't a feature we bolt on; it's the baseline every page is measured against."
        />
      </RevealOnScroll>

      <div className="grid grid-cols-[1fr_320px] gap-12 max-lg:grid-cols-1">
        <RevealOnScroll
          as="article"
          className="bg-white border border-rule p-[44px_48px] max-md:p-[32px_24px] shadow-[0_1px_2px_rgba(15,35,64,0.04),0_10px_28px_rgba(15,35,64,0.06)]"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-2.5 bg-green/[0.08] border border-green/25 text-green-dark font-mono text-[10.5px] font-medium tracking-[1.5px] uppercase shadow-[0_0_12px_rgba(76,187,23,0.1)] mb-6">
            <div className="w-2 h-2 rounded-full bg-green shadow-[0_0_6px_rgba(76,187,23,0.25)]" aria-hidden="true" />
            WCAG 2.1 AA · Ongoing
          </div>

          <h2 className="font-display text-[1.35rem] font-bold text-navy tracking-[-0.015em] leading-[1.25] mb-3">
            Our commitment
          </h2>
          <p className="text-[14.5px] leading-[1.75] text-text-secondary mb-4">
            JJR is committed to making this Hub usable by everyone. We target{' '}
            <strong className="text-navy font-semibold">WCAG 2.1 AA compliance</strong> as the minimum standard, and
            we review every page against it before it ships. Equity isn&rsquo;t just something we write about in our
            frameworks — it&rsquo;s how we design the tools we work with every day.
          </p>

          <h2 className="font-display text-[1.35rem] font-bold text-navy tracking-[-0.015em] leading-[1.25] mt-8 mb-3">
            What this means in practice
          </h2>
          <ul className="my-3 mb-5 list-none pl-0">
            {ACCESSIBILITY_PRACTICES.map((practice) => (
              <li key={practice.title} className="relative pl-[26px] text-[14px] leading-[1.75] text-text-secondary mb-2">
                <span aria-hidden="true" className="absolute left-0 top-[10px] w-2.5 h-0.5 bg-green shadow-[0_0_4px_rgba(76,187,23,0.25)]" />
                <strong className="text-navy font-semibold">{practice.title}</strong> {practice.description}
              </li>
            ))}
          </ul>

          <div className="h-px bg-rule-light my-8" />

          <h2 className="font-display text-[1.35rem] font-bold text-navy tracking-[-0.015em] leading-[1.25] mb-3">
            Requesting accommodations
          </h2>
          <p className="text-[14.5px] leading-[1.75] text-text-secondary mb-4">
            If you need the Hub in an alternative format, a different input method, a longer session timeout, or any
            other adjustment — tell us. Accommodation requests go to IT and are handled confidentially.
          </p>
          <p className="text-[14.5px] leading-[1.75] text-text-secondary mb-4">
            Typical turnaround is one to three business days depending on the request. Urgent needs are escalated
            immediately.
          </p>

          <h2 className="font-display text-[1.35rem] font-bold text-navy tracking-[-0.015em] leading-[1.25] mt-8 mb-3">
            Reporting an issue
          </h2>
          <p className="text-[14.5px] leading-[1.75] text-text-secondary mb-4">
            Found something that doesn&rsquo;t work for you? The problem is ours to fix, not yours to work around. Let
            us know through the{' '}
            <a href={reportIssueHref} className="text-green-dark font-semibold hover:text-green transition-colors">
              Report an Issue form
            </a>{' '}
            at the footer of any page. Include:
          </p>
          <ul className="my-3 mb-5 list-none pl-0">
            {ISSUE_REPORT_FIELDS.map((field) => (
              <li key={field.label} className="relative pl-[26px] text-[14px] leading-[1.75] text-text-secondary mb-2">
                <span aria-hidden="true" className="absolute left-0 top-[10px] w-2.5 h-0.5 bg-green shadow-[0_0_4px_rgba(76,187,23,0.25)]" />
                {field.label}
              </li>
            ))}
          </ul>
          <p className="text-[14.5px] leading-[1.75] text-text-secondary mb-4">
            Every report is logged, acknowledged within 24 hours, and tracked through to resolution.
          </p>

          <div className="h-px bg-rule-light my-8" />

          <h2 className="font-display text-[1.35rem] font-bold text-navy tracking-[-0.015em] leading-[1.25] mb-3">
            Ongoing review
          </h2>
          <p className="text-[14.5px] leading-[1.75] text-text-secondary mb-4">
            Accessibility isn&rsquo;t a one-off audit. The Hub is re-tested every quarter against WCAG 2.1 AA, and the
            results feed into the{' '}
            <a href="/how-we-work" className="text-green-dark font-semibold hover:text-green transition-colors">
              How We Work
            </a>{' '}
            review cycle. If standards advance — and they do — we advance with them.
          </p>
          <p className="text-[14.5px] leading-[1.75] text-text-secondary mb-4">
            For questions about accessibility policy, contact the{' '}
            <a href="/site-owners" className="text-green-dark font-semibold hover:text-green transition-colors">
              Site Owners
            </a>
            .
          </p>
        </RevealOnScroll>

        <aside>
          <RevealOnScroll className="mb-5">
            <QuickLinkList title="Quick Links" eyebrow="Support & Tools" links={quickLinks} />
          </RevealOnScroll>

          <RevealOnScroll className="bg-[linear-gradient(180deg,#17304f,#0F2340,#0b1c35)] border border-white/[0.06] px-[26px] py-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_8px_24px_rgba(0,0,0,0.20)]">
            <div className="font-display text-base font-bold text-white mb-1.5 tracking-[-0.01em]">Standards We Follow</div>
            <p className="text-xs text-white/55 leading-[1.7] mb-3.5">{STANDARDS_SUMMARY}</p>
            <a href={auditTrailHref} className="text-xs font-bold text-green hover:text-green-bright transition-colors">
              Read the audit trail →
            </a>
          </RevealOnScroll>
        </aside>
      </div>
    </AppShell>
  )
}
