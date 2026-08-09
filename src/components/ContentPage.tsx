import type { ReactNode } from 'react'
import { AppShell, type AppShellUser, type ProfileMenuItem } from './AppShell'
import { PageHero, QuickLinkList, RevealOnScroll, Timeline, TimelineItem, type QuickLink } from './ui'

export interface ContentPageCta {
  label: string
  href: string
}

export interface ContentPagePillar {
  icon: ReactNode
  title: string
  description: string
  linkLabel: string
}

export interface ContentPageRoadmapItem {
  /** Short label inside the marker badge, e.g. "'21", "Q1", "01". */
  badgeLabel: string
  /** Marker colour — 'current' is green with a glow (the next milestone/step), 'done' is plain green, 'planned' is navy. */
  badgeTone: 'current' | 'done' | 'planned'
  title: string
  description: string
  meta: string
}

export interface ContentPageSidebar {
  title: string
  eyebrow: string
  links: QuickLink[]
}

interface ContentPageProps {
  user: AppShellUser
  profileMenuItems: ProfileMenuItem[]
  breadcrumbLabel: string
  contextBarLabel: string

  heroKicker: string
  heroTitle: ReactNode
  heroDescription: string
  heroGradient: string
  primaryCta: ContentPageCta
  secondaryCta: ContentPageCta

  pillarsLabel: string
  pillars: ContentPagePillar[]

  roadmapLabel: string
  roadmapItems: ContentPageRoadmapItem[]
  calloutText: ReactNode

  sidebar: ContentPageSidebar
}

const BADGE_TONE_CLASSES: Record<ContentPageRoadmapItem['badgeTone'], string> = {
  current: 'bg-green shadow-[0_0_10px_rgba(76,187,23,0.25)]',
  done: 'bg-green',
  planned: 'bg-navy-mid',
}

/**
 * The shared template behind Vision & Values, AI for Good, and Environmental Justice —
 * conversion-plan.md §4 flags these three as structurally identical (same 31KB/92-div/14-svg
 * shape, different content). Hero + a 3-up pillar grid + a roadmap timeline with a sidebar.
 * Purely presentational: every page passes its own content as props, nothing is fetched here.
 */
export function ContentPage({
  user,
  profileMenuItems,
  breadcrumbLabel,
  contextBarLabel,
  heroKicker,
  heroTitle,
  heroDescription,
  heroGradient,
  primaryCta,
  secondaryCta,
  pillarsLabel,
  pillars,
  roadmapLabel,
  roadmapItems,
  calloutText,
  sidebar,
}: ContentPageProps) {
  return (
    <AppShell
      user={user}
      profileMenuItems={profileMenuItems}
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: breadcrumbLabel }]}
      contextBarRight={
        <span className="font-mono text-[9px] text-text-inverse-muted tracking-[1px]">{contextBarLabel}</span>
      }
    >
      <RevealOnScroll className="mb-[72px]">
        <PageHero
          kicker={heroKicker}
          title={heroTitle}
          description={heroDescription}
          gradient={heroGradient}
          contentMaxWidth="620px"
          actions={
            <>
              <a
                href={primaryCta.href}
                className="font-body text-xs font-bold tracking-[0.04em] bg-green text-white px-6 py-[11px] inline-flex items-center gap-2 shadow-[0_0_24px_rgba(76,187,23,0.25),0_2px_8px_rgba(0,0,0,0.2)] transition-all duration-300 ease-smooth hover:bg-green-dark hover:-translate-y-px hover:shadow-[0_0_32px_rgba(76,187,23,0.45)]"
              >
                {primaryCta.label}
              </a>
              <a
                href={secondaryCta.href}
                className="font-body text-xs font-bold tracking-[0.04em] bg-transparent border border-text-inverse-muted text-text-inverse-secondary px-6 py-[11px] inline-flex items-center gap-2 transition-all duration-300 ease-smooth hover:border-green hover:text-green"
              >
                {secondaryCta.label}
              </a>
            </>
          }
        />
      </RevealOnScroll>

      <div className="font-mono text-[10px] font-medium tracking-[2.5px] uppercase text-text-muted mb-[22px] flex items-center gap-3.5">
        {pillarsLabel}
        <span className="flex-1 h-px bg-rule" aria-hidden="true" />
      </div>

      <div className="grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-5 mb-[72px]">
        {pillars.map((pillar, i) => (
          <RevealOnScroll
            key={pillar.title}
            className={`group bg-white border border-rule p-8 relative overflow-hidden transition-all duration-[400ms] ease-smooth hover:border-navy-mid hover:shadow-[0_8px_24px_rgba(27,54,93,0.1)] ${
              i === 1 ? 'md:translate-y-[18px] md:hover:translate-y-[10px]' : 'hover:-translate-y-2'
            }`}
          >
            <div className="w-11 h-11 border-[1.5px] border-rule flex items-center justify-center text-text-muted mb-5 transition-all duration-[400ms] ease-smooth group-hover:border-green group-hover:text-green group-hover:bg-green/[0.12]">
              {pillar.icon}
            </div>
            <div className="font-display text-[1.1rem] font-bold text-navy mb-2 tracking-[-0.01em]">{pillar.title}</div>
            <div className="text-[12.5px] text-text-secondary leading-[1.65] mb-[18px]">{pillar.description}</div>
            <span className="text-xs font-bold text-green inline-flex items-center gap-1.5 transition-[gap] duration-300 group-hover:gap-2.5">
              {pillar.linkLabel}
            </span>
          </RevealOnScroll>
        ))}
      </div>

      <div className="grid grid-cols-[1fr_360px] gap-9 mb-[72px] max-lg:grid-cols-1">
        <div>
          <div className="font-mono text-[10px] font-medium tracking-[2.5px] uppercase text-text-muted mb-[22px] flex items-center gap-3.5">
            {roadmapLabel}
            <span className="flex-1 h-px bg-rule" aria-hidden="true" />
          </div>

          <RevealOnScroll as="div" className="bg-white border border-rule p-[32px_36px] mb-5">
            <Timeline>
              {roadmapItems.map((item, i) => (
                <TimelineItem
                  key={item.title}
                  isLast={i === roadmapItems.length - 1}
                  meta={item.meta}
                  title={item.title}
                  marker={
                    <span
                      className={`w-9 h-9 shrink-0 flex items-center justify-center font-mono text-[10px] font-bold text-white relative z-[1] ${BADGE_TONE_CLASSES[item.badgeTone]}`}
                    >
                      {item.badgeLabel}
                    </span>
                  }
                >
                  {item.description}
                </TimelineItem>
              ))}
            </Timeline>
          </RevealOnScroll>

          <RevealOnScroll className="px-[22px] py-3.5 border-l-2 border-green bg-white text-xs text-text-secondary mb-[72px] [&_a]:text-green [&_a]:font-bold [&_a:hover]:underline">
            {calloutText}
          </RevealOnScroll>
        </div>

        <RevealOnScroll as="div">
          <QuickLinkList title={sidebar.title} eyebrow={sidebar.eyebrow} links={sidebar.links} />
        </RevealOnScroll>
      </div>
    </AppShell>
  )
}
