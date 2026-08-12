import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { AppShell } from '../../components/AppShell'
import {
  AvatarChip,
  BookOpenIcon,
  ChevronLeftIcon,
  DateTile,
  DiscussionThread,
  FileIcon,
  HeroGrain,
  InfoIcon,
  ListPanel,
  PlayIcon,
  RequestAccessPanel,
  ResourceLink,
  RevealOnScroll,
} from '../../components/ui'
import { CURRENT_USER, PROFILE_MENU_ITEMS } from '../../mocks/currentUser'
import { COMMUNITY_DETAILS } from '../../mocks/communityDetail'

const RESOURCE_ICONS: Record<'file' | 'play' | 'book-open', ReactNode> = {
  file: <FileIcon size={16} strokeWidth={1.8} />,
  play: <PlayIcon size={16} fill="currentColor" />,
  'book-open': <BookOpenIcon size={16} strokeWidth={1.8} />,
}

interface CommunityDetailPageProps {
  slug?: string
}

export function CommunityDetailPage({ slug = 'innovation-ai' }: CommunityDetailPageProps) {
  const community = COMMUNITY_DETAILS[slug]

  if (!community) {
    return (
      <AppShell user={CURRENT_USER} profileMenuItems={PROFILE_MENU_ITEMS} breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Communities', href: '/communities' }, { label: 'Not found' }]}>
        <div className="bg-white border border-rule p-14 text-center text-text-muted">
          <h1 className="font-display text-xl font-bold text-navy mb-2">Community not found</h1>
          <p className="text-sm">
            <a href="/communities" className="text-green font-semibold hover:underline">
              Back to all communities →
            </a>
          </p>
        </div>
      </AppShell>
    )
  }

  return (
    <AppShell
      user={CURRENT_USER}
      profileMenuItems={PROFILE_MENU_ITEMS}
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Communities', href: '/communities' }, { label: community.name }]}
      contextBarRight={
        <Link to="/start-here" className="font-mono text-[10px] tracking-[0.5px] text-green/60 hover:text-green transition-colors">
          Start Here →
        </Link>
      }
    >
      <RevealOnScroll className="mb-10">
        <div className="relative overflow-hidden bg-[linear-gradient(135deg,#0F2340_0%,#1B365D_55%,#2A4A78_100%)] p-12 max-md:p-6">
          <HeroGrain />
          <div
            aria-hidden="true"
            className="absolute w-[1600px] h-[400px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(76,187,23,0.10),rgba(76,187,23,0)_60%)] pointer-events-none z-0 blur-[30px] animate-breathe"
          />

          <a
            href="/communities"
            className="relative z-[1] inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[1.5px] uppercase text-green/70 mb-6 transition-colors duration-200 hover:text-green-bright"
          >
            <ChevronLeftIcon size={11} strokeWidth={2} />
            Back to all communities
          </a>

          <div className="relative z-[1] grid grid-cols-[auto_1fr_auto] gap-7 items-center mb-6 max-lg:grid-cols-[1fr_auto] max-lg:gap-5 max-md:grid-cols-1 max-md:text-left">
            <div className="w-[88px] h-[88px] flex items-center justify-center bg-green/[0.12] border border-green/30 text-green-bright shadow-[0_0_22px_rgba(76,187,23,0.25),inset_0_1px_0_rgba(255,255,255,0.06)] shrink-0 max-lg:col-span-full">
              <InfoIcon size={38} strokeWidth={1.5} />
            </div>
            <div className="min-w-0">
              <div className="font-mono text-[10px] font-medium tracking-[2px] uppercase text-green mb-2.5 [text-shadow:0_0_8px_rgba(76,187,23,0.3)]">
                Community of Practice
              </div>
              <h1 className="font-display text-[clamp(2rem,3.5vw,2.6rem)] font-bold text-white leading-[1.08] tracking-[-0.025em] mb-3">{community.name}</h1>
              <div className="font-mono text-[10px] tracking-[1.5px] uppercase text-green-bright inline-flex items-center gap-2">
                <span className="w-[7px] h-[7px] rounded-full bg-green shadow-[0_0_6px_rgba(76,187,23,0.25)] animate-pulse" aria-hidden="true" />
                {community.activityLabel}
              </div>
            </div>
            <button
              type="button"
              className="font-body text-xs font-bold tracking-[0.04em] whitespace-nowrap bg-green text-white px-[26px] py-3 shadow-[0_0_24px_rgba(76,187,23,0.25),0_2px_8px_rgba(0,0,0,0.2)] transition-all duration-300 ease-smooth hover:bg-green-dark hover:-translate-y-px hover:shadow-[0_0_32px_rgba(76,187,23,0.45)] inline-flex items-center gap-2 max-md:justify-self-start"
            >
              Join this community
            </button>
          </div>

          <p className="relative z-[1] text-[14.5px] leading-[1.75] text-text-inverse-secondary max-w-[760px] mb-7">{community.description}</p>

          <div className="relative z-[1] flex flex-wrap items-center gap-7 pt-[22px] border-t border-white/[0.08]">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[9px] tracking-[1.5px] uppercase text-text-inverse-muted">Members</span>
              <span className="font-display text-[1.4rem] font-bold text-white tracking-[-0.01em] leading-none">{community.memberCount}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[9px] tracking-[1.5px] uppercase text-text-inverse-muted">Posts / Week</span>
              <span className="font-display text-[1.4rem] font-bold text-white tracking-[-0.01em] leading-none">{community.postsPerWeek}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[9px] tracking-[1.5px] uppercase text-text-inverse-muted">Resources</span>
              <span className="font-display text-[1.4rem] font-bold text-white tracking-[-0.01em] leading-none">{community.resourceCount}</span>
            </div>
            <a href="/my-profile?viewer=colleague&user=d-laurent" className="ml-auto flex items-center gap-2.5 text-xs text-text-inverse-secondary">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center font-mono text-[10px] font-bold text-white shadow-[0_0_0_2px_rgba(76,187,23,0.12)]"
                style={{ background: community.steward.background }}
              >
                {community.steward.initials}
              </div>
              <div>
                Steward
                <br />
                <strong className="text-white font-semibold">{community.steward.name}</strong>
              </div>
            </a>
          </div>
        </div>
      </RevealOnScroll>

      <div className="grid grid-cols-[1fr_340px] gap-8 max-lg:grid-cols-1">
        <div>
          <div className="font-mono text-[10px] font-medium tracking-[2.5px] uppercase text-text-muted mb-5 flex items-center gap-3.5">
            About
            <span className="flex-1 h-px bg-rule" aria-hidden="true" />
          </div>
          <div className="bg-white border border-rule p-[30px_34px] mb-7 shadow-[0_1px_2px_rgba(15,35,64,0.04)]">
            {community.about.map((section) => (
              <div key={section.heading}>
                <h2 className="font-display text-[1.05rem] font-bold text-navy tracking-[-0.01em] mb-2.5 mt-4 first:mt-0">{section.heading}</h2>
                <p className="text-sm text-text-secondary leading-[1.75] mb-3">{section.body}</p>
              </div>
            ))}
          </div>

          <div id="members" className="font-mono text-[10px] font-medium tracking-[2.5px] uppercase text-text-muted mb-5 flex items-center gap-3.5">
            Members
            <span className="flex-1 h-px bg-rule" aria-hidden="true" />
          </div>
          <div className="bg-white border border-rule p-[30px_34px] mb-7 shadow-[0_1px_2px_rgba(15,35,64,0.04)]">
            <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-3.5">
              {community.members.map((member) => (
                <AvatarChip
                  key={member.name}
                  href={member.href}
                  initials={member.initials}
                  background={member.background}
                  name={member.name}
                  subtitle={member.subtitle}
                  badge={member.badge}
                  shape="circle"
                  className="px-4 py-3.5 bg-off-white border border-rule-light transition-all duration-300 ease-smooth hover:border-green/35 hover:bg-white hover:shadow-[0_4px_12px_rgba(15,35,64,0.06)]"
                />
              ))}
            </div>
            <p className="mt-[18px] text-[12.5px] text-text-muted">
              + {community.moreMembersCount} more members.{' '}
              <a href="/under-development?from=community-members-all" className="text-green-dark font-semibold">
                View all →
              </a>
            </p>
          </div>

          <div id="resources" className="font-mono text-[10px] font-medium tracking-[2.5px] uppercase text-text-muted mb-5 flex items-center gap-3.5">
            Resources
            <span className="flex-1 h-px bg-rule" aria-hidden="true" />
          </div>
          <div className="bg-white border border-rule p-[30px_34px] mb-7 shadow-[0_1px_2px_rgba(15,35,64,0.04)]">
            <div className="flex flex-col gap-2">
              {community.resources.map((resource) => (
                <ResourceLink
                  key={resource.title}
                  href={resource.href}
                  icon={RESOURCE_ICONS[resource.iconKey]}
                  title={resource.title}
                  meta={resource.meta}
                  badge={resource.badge}
                  iconTone={resource.iconTone}
                />
              ))}
            </div>
          </div>

          <div id="discussions" className="font-mono text-[10px] font-medium tracking-[2.5px] uppercase text-text-muted mb-5 flex items-center gap-3.5">
            Recent Discussions
            <span className="flex-1 h-px bg-rule" aria-hidden="true" />
          </div>
          <div className="bg-white border border-rule p-[30px_34px] mb-7 shadow-[0_1px_2px_rgba(15,35,64,0.04)]">
            <div className="flex flex-col">
              {community.discussions.map((thread) => (
                <DiscussionThread key={thread.title} href={thread.href} title={thread.title} meta={thread.meta} />
              ))}
            </div>
          </div>

          <div className="font-mono text-[10px] font-medium tracking-[2.5px] uppercase text-text-muted mb-5 flex items-center gap-3.5">
            Upcoming Events
            <span className="flex-1 h-px bg-rule" aria-hidden="true" />
          </div>
          <div className="bg-white border border-rule p-[30px_34px] mb-7 shadow-[0_1px_2px_rgba(15,35,64,0.04)]">
            <div className="flex flex-col gap-3">
              {community.events.map((event) => (
                <a
                  key={event.title}
                  href={event.href}
                  className="flex gap-3.5 px-4 py-3.5 border border-rule-light bg-off-white transition-all duration-300 ease-smooth hover:border-green/35 hover:bg-white hover:shadow-[0_4px_12px_rgba(15,35,64,0.06)]"
                >
                  <DateTile day={event.day} month={event.month} />
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-semibold text-navy leading-[1.35] mb-1">{event.title}</div>
                    <div className="font-mono text-[10.5px] text-text-muted tracking-[0.3px]">{event.meta}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        <aside className="flex flex-col gap-5">
          <ListPanel title="Community Info" eyebrow="Key Facts" tone="dark">
            <div>
              {community.keyFacts.map((fact) => (
                <div key={fact.label} className="flex items-baseline justify-between py-2.5 border-b border-white/[0.06] last:border-b-0">
                  <span className="font-mono text-[10px] tracking-[1.5px] uppercase text-text-inverse-muted">{fact.label}</span>
                  <span className="text-[13px] text-white font-medium">{fact.value}</span>
                </div>
              ))}
            </div>
          </ListPanel>

          <div className="bg-white border border-rule shadow-[0_1px_2px_rgba(15,35,64,0.04)]">
            <div className="px-6 py-[22px] border-b border-rule-light">
              <div className="font-display text-base font-bold text-navy tracking-[-0.01em]">Related</div>
              <div className="font-mono text-[9px] tracking-[1.5px] uppercase text-text-muted mt-1">Cross-Links</div>
            </div>
            <div className="py-1">
              {community.related.map((link, i) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`block px-6 py-3 text-[13px] font-medium text-navy transition-[padding-left,background] duration-[250ms] hover:pl-[30px] hover:bg-off-white ${
                    i < community.related.length - 1 ? 'border-b border-rule-light' : ''
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <RequestAccessPanel
            title="Share what you've learned"
            description="Wrapping up a project that used AI? Deposit your reusable prompts, frameworks, or lessons into the community toolkit."
            ctaLabel="Submit a knowledge artifact →"
            ctaHref="/under-development?from=knowledge-artifact"
          />
        </aside>
      </div>
    </AppShell>
  )
}
