import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { AppShell } from '../../components/AppShell'
import {
  BarChartIcon,
  BookOpenIcon,
  CommunityCard,
  DateTile,
  FileIcon,
  GlobeIcon,
  HeroGrain,
  InfoIcon,
  ListPanel,
  PlayIcon,
  RequestAccessPanel,
  RevealOnScroll,
} from '../../components/ui'
import { CURRENT_USER, PROFILE_MENU_ITEMS } from '../../mocks/currentUser'
import {
  COMMUNITIES,
  TOTAL_MEMBER_COUNT,
  UPCOMING_EVENTS,
  YOUR_COMMUNITIES,
  type CommunityIconKey,
  type ResourceIconKey,
} from '../../mocks/communities'

const COMMUNITY_ICONS: Record<CommunityIconKey, ReactNode> = {
  info: <InfoIcon size={24} strokeWidth={1.5} />,
  globe: <GlobeIcon size={24} strokeWidth={1.5} />,
  'bar-chart': <BarChartIcon size={24} strokeWidth={1.5} />,
}

const RESOURCE_ICONS: Record<ResourceIconKey, ReactNode> = {
  file: <FileIcon size={11} strokeWidth={1.8} />,
  play: <PlayIcon size={11} strokeWidth={1.8} fill="currentColor" />,
  'book-open': <BookOpenIcon size={11} strokeWidth={1.8} />,
}

export function CommunitiesPage() {
  const activeCount = COMMUNITIES.length

  return (
    <AppShell
      user={CURRENT_USER}
      profileMenuItems={PROFILE_MENU_ITEMS}
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Communities of Practice' }]}
      contextBarRight={
        <>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse shadow-[0_0_6px_rgba(76,187,23,0.6)]" aria-hidden="true" />
            <span className="font-mono text-[9px] text-text-inverse-muted tracking-wide">{activeCount} active communities</span>
          </span>
          <span className="text-text-inverse-muted text-[10px]" aria-hidden="true">
            /
          </span>
          <Link to="/start-here" className="font-mono text-[10px] text-green/60 hover:text-green transition-colors">
            Start Here →
          </Link>
        </>
      }
    >
      <RevealOnScroll className="mb-12">
        <div className="relative overflow-hidden bg-[linear-gradient(180deg,#17304f_0%,#0F2340_40%,#0b1c35_100%)] border-t border-t-white/[0.06] border-b border-b-black/30 shadow-[0_4px_16px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.04)]">
          <div
            aria-hidden="true"
            className="absolute w-[1600px] h-[400px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(76,187,23,0.10)_0%,rgba(76,187,23,0)_60%)] pointer-events-none z-0 blur-[30px] animate-breathe"
          />
          <HeroGrain />
          <div className="absolute top-6 right-8 w-16 h-16 border-r border-t border-white/[0.06] pointer-events-none" aria-hidden="true" />
          <div className="absolute top-8 right-10 w-16 h-16 border-r border-t border-white/[0.04] pointer-events-none" aria-hidden="true" />
          <div className="relative z-10 pl-11 pr-10 pt-9 pb-10 max-md:p-7">
            <div className="font-mono text-[10px] font-medium tracking-[2px] uppercase text-green mb-3 [text-shadow:0_0_8px_rgba(76,187,23,0.3)]">
              Communities of Practice
            </div>
            <h1 className="font-display text-[2.65rem] max-md:text-[1.7rem] font-bold text-white leading-[1.02] tracking-[-0.022em] mb-5">
              Where Knowledge
              <br />
              Becomes Shared.
            </h1>
            <p className="text-[14px] leading-[1.7] text-text-inverse-secondary max-w-[560px] mb-7">
              Communities of Practice are where JJR consultants connect across projects. Share expertise, surface
              reusable knowledge, and build the collective intelligence of the firm. Every community has a named
              steward and a clear purpose.
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              <a
                href="#communities"
                className="font-body text-xs font-bold bg-green text-white px-5 py-2.5 inline-flex items-center gap-1.5 shadow-[0_0_24px_rgba(76,187,23,0.25),0_2px_8px_rgba(0,0,0,0.12)] transition-all duration-300 ease-smooth hover:bg-green-dark hover:-translate-y-px hover:shadow-[0_0_32px_rgba(76,187,23,0.45),0_2px_12px_rgba(0,0,0,0.2)]"
              >
                Explore Communities →
              </a>
              <a
                href="/under-development?from=request-a-new-community"
                className="font-body text-xs font-semibold border border-text-inverse-muted text-text-inverse-secondary px-5 py-2.5 inline-flex items-center transition-all duration-200 hover:border-green hover:text-green"
              >
                Request a New Community
              </a>
              <div className="flex items-center gap-2 ml-2">
                <div className="flex -space-x-2" aria-hidden="true">
                  <div className="w-7 h-7 bg-green text-[9px] font-bold text-white flex items-center justify-center border-2 border-navy-deep shadow-[0_0_10px_rgba(76,187,23,0.4)]">SF</div>
                  <div className="w-7 h-7 bg-navy text-[9px] font-bold text-white flex items-center justify-center border-2 border-navy-deep">MK</div>
                  <div className="w-7 h-7 bg-navy-mid text-[9px] font-bold text-white flex items-center justify-center border-2 border-navy-deep">LR</div>
                  <div className="w-7 h-7 bg-pink text-[9px] font-bold text-white flex items-center justify-center border-2 border-navy-deep">JP</div>
                </div>
                <span className="text-[11px] text-text-inverse-muted">{TOTAL_MEMBER_COUNT} members across all communities</span>
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>

      <div id="communities" className="grid grid-cols-[1fr_340px] gap-8 max-lg:grid-cols-1">
        <div>
          {COMMUNITIES.map((community) => (
            <CommunityCard
              key={community.slug}
              href={`/communities/${community.slug}`}
              icon={COMMUNITY_ICONS[community.icon]}
              name={community.name}
              description={community.description}
              memberCountLabel={`${community.memberCount} members`}
              postsLabel={`${community.postsThisWeek} posts this week`}
              resourcesLabel={`${community.resourceCount} resources`}
              steward={community.steward}
              joinHref="/under-development?from=join-community"
              topResources={community.topResources.map((r) => ({ label: r.label, href: r.href, icon: RESOURCE_ICONS[r.icon] }))}
              recentDiscussions={community.isMember ? community.recentDiscussions : undefined}
              keyExperts={community.keyExperts}
              className="mb-6"
            />
          ))}
        </div>

        <div className="flex flex-col gap-6">
          <ListPanel title="Upcoming Events" eyebrow="Webinars & Sessions">
            {UPCOMING_EVENTS.map((event) => (
              <a key={event.title} href={event.href} className="group">
                <div className="flex items-start gap-3">
                  <DateTile day={event.day} month={event.month} className="group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_2px_8px_rgba(15,35,64,0.2),0_0_12px_rgba(76,187,23,0.15)] transition-shadow duration-300" />
                  <div className="flex-1 min-w-0">
                    <div className="text-[12.5px] font-semibold text-navy group-hover:text-green transition-colors leading-snug">{event.title}</div>
                    <div className="text-[10px] text-text-muted mt-1 font-mono">{event.meta}</div>
                  </div>
                </div>
              </a>
            ))}
          </ListPanel>

          <ListPanel title="Your Communities" eyebrow="Membership" tone="dark">
            {YOUR_COMMUNITIES.map((row) => (
              <div key={row.slug} className="flex items-center gap-3">
                <span
                  className={`w-2 h-2 rounded-full shrink-0 ${row.joined ? 'bg-green shadow-[0_0_8px_rgba(76,187,23,0.6)]' : 'bg-white/15'}`}
                  aria-hidden="true"
                />
                <a
                  href={`/communities/${row.slug}`}
                  className={`text-[12.5px] flex-1 hover:text-green transition-colors ${row.joined ? 'font-semibold text-white' : 'text-text-inverse-secondary'}`}
                >
                  {row.name}
                </a>
                {row.joined ? (
                  <span className="font-mono text-[9px] text-text-inverse-muted tracking-wide uppercase">Joined</span>
                ) : (
                  <a href="/under-development?from=join-community" className="font-mono text-[9px] text-green hover:text-green-bright tracking-wide uppercase transition-colors">
                    Join
                  </a>
                )}
              </div>
            ))}
          </ListPanel>

          <RequestAccessPanel
            title="Share what you've learned"
            description="Wrapping up a project? Deposit reusable templates, lessons learned, or methodology improvements into your CoP."
            ctaLabel="Submit a knowledge artifact →"
            ctaHref="/under-development?from=submit-knowledge-artifact"
          />
        </div>
      </div>
    </AppShell>
  )
}
