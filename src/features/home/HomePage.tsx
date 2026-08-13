import { useState } from 'react'
import { Link } from 'react-router'
import { AppShell } from '../../components/AppShell'
import { HeroGrain, RevealOnScroll, ShimmerText, Spotlight } from '../../components/ui'
import './HomePage.css'
import { CURRENT_USER, PROFILE_MENU_ITEMS } from '../../mocks/currentUser'
import {
  CLIENT_HUB_LABEL,
  CLIENT_HUB_STATUS_COPY,
  CONSULTANT_DIRECTORY_LINK,
  JJR_MATERIAL,
  KNOWLEDGE_LINKS,
  KNOWLEDGE_SPOTLIGHT,
  MY_STUFF_LINKS,
  THOUGHT_LEADERSHIP,
  TOPICS,
} from './homeContent'
import { HomeCommunityTile } from './HomeCommunityTile'
import { KnowledgeCard, QuadrantCard, SectionSlider, TopicCard } from './HomeSections'
import { HomeProjectTile } from './HomeProjectTile'
import { useHomeCommunities } from './useHomeCommunities'
import { useHomeProjects } from './useHomeProjects'

function greetingForHour(hour: number): string {
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

const TODAY_LABEL = new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })

const UserIcon = (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)
const TaskIcon = (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <polyline points="9 11 12 14 22 4" />
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
  </svg>
)
const CalendarIcon = (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
)
const PeopleIcon = (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)
const BuildingIcon = (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
)
const FileIcon = (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
)
const KitIcon = (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18M9 21V9" />
  </svg>
)
const SpotlightIcon = (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
)

/**
 * Home — the firm's front door. Composition surface only: no `HomeService`, no direct
 * `src/mocks/*` reads from this page's own logic. Each async section (Projects, Communities)
 * owns its own loading/error/empty/loaded state via `useHomeProjects()`/`useHomeCommunities()`
 * independently — there is no single top-level `if (isLoading) return <Spinner />` gate, so
 * static sections and the other async section stay usable even if one feed fails.
 *
 * Compliance Hub, Past Deliverables, and My Stuff — Reporting are intentionally absent (DEFER/
 * OPEN per docs/specs/home.md) — not rendered, not commented out, no DOM output at all.
 *
 * Visual pass (parity with legacy/jjr-hub-tw.html): compact context bar, "Your Hub" quadrant
 * grid, Priority Topics + Active Projects + Communities as card rows, a dedicated Knowledge
 * Spotlight row, a lightweight Thought Leadership panel, and the existing AppShell footer's
 * Access & Equity band. Data/access architecture is unchanged from the prior implementation pass.
 */
export function HomePage() {
  const { isLoading: projectsLoading, error: projectsError, projects, milestonesThisWeekCount } = useHomeProjects()
  const { isLoading: communitiesLoading, error: communitiesError, communities } = useHomeCommunities()
  const [leadershipIndex, setLeadershipIndex] = useState(0)
  const [descriptionExpanded, setDescriptionExpanded] = useState(false)

  const greeting = greetingForHour(new Date().getHours())
  const firstName = CURRENT_USER.name.split(' ')[0]
  const activeStory = THOUGHT_LEADERSHIP[leadershipIndex]
  const storyCount = THOUGHT_LEADERSHIP.length

  const goToStory = (index: number) => {
    setLeadershipIndex(((index % storyCount) + storyCount) % storyCount)
    setDescriptionExpanded(false)
  }

  return (
    <AppShell user={CURRENT_USER} profileMenuItems={PROFILE_MENU_ITEMS} activeNav="home">
     <div className="home-page">
      {/* Compact context bar — greeting, date, milestone pulse. Deliberately not an oversized hero. */}
      <div className="mb-8 -mt-2 animate-rise">
        <div className="relative overflow-hidden bg-[linear-gradient(180deg,#17304f_0%,#0F2340_40%,#0b1c35_100%)] border-t border-t-white/[0.06] border-b border-b-black/30 shadow-[0_4px_16px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.04)]">
          <div
            aria-hidden="true"
            className="absolute w-[1200px] h-[260px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(76,187,23,0.10)_0%,rgba(76,187,23,0)_60%)] pointer-events-none z-0 blur-[30px] animate-breathe"
          />
          <HeroGrain />
          <div className="relative z-10 px-8 py-4 max-md:px-5 max-md:py-4 flex items-center justify-between gap-6 max-md:flex-col max-md:items-start max-md:gap-3">
            <div className="flex items-center gap-4 min-w-0 max-md:flex-col max-md:items-start max-md:gap-1.5">
              <h1 className="font-display text-[1.05rem] font-bold text-white leading-tight tracking-tight truncate">
                {greeting}, {firstName}.
              </h1>
              <span className="w-px h-3.5 bg-white/10 max-md:hidden" aria-hidden="true" />
              <span className="font-mono text-[10px] text-white/40 tracking-[0.8px] uppercase">{TODAY_LABEL}</span>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <div className="flex items-center gap-2 font-mono text-[10px] text-white/45 tracking-[0.8px]">
                <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" aria-hidden="true" />
                <span>{milestonesThisWeekCount} milestones this week</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* YOUR HUB — 2x2 quadrant grid */}
      <SectionLabel eyebrow="Your Hub" sub="Everything you need — organised by purpose" />
      <Spotlight
        color="rgba(76,187,23,0.06)"
        className="grid grid-cols-2 border border-rule divide-x divide-y divide-rule bg-white mb-12 max-md:grid-cols-1 max-md:divide-x-0"
      >
        <QuadrantCard
          index="01"
          icon={UserIcon}
          title="My Stuff"
          description="Your day-to-day tools — hours, tasks, and calendar."
          links={MY_STUFF_LINKS.map((link, i) => ({
            label: link.label,
            href: link.href,
            icon: [TaskIcon, TaskIcon, CalendarIcon][i] ?? TaskIcon,
          }))}
        />
        <QuadrantCard
          index="02"
          icon={PeopleIcon}
          title="JJR Resources"
          description="People and clients — consultant directory and client hub."
          links={[
            { label: CONSULTANT_DIRECTORY_LINK.label, to: CONSULTANT_DIRECTORY_LINK.href, icon: PeopleIcon },
            { label: CLIENT_HUB_LABEL, icon: BuildingIcon, statusCopy: CLIENT_HUB_STATUS_COPY },
          ]}
        />
        <QuadrantCard
          index="03"
          icon={FileIcon}
          title="JJR Material"
          description="Brand assets, templates, and methodology kits."
          links={JJR_MATERIAL.map((item, i) => ({ label: item.title, href: item.href, icon: [FileIcon, FileIcon, KitIcon][i] ?? FileIcon }))}
        />
        <QuadrantCard
          index="04"
          icon={SpotlightIcon}
          title="Knowledge Spotlight"
          description="AI news, lessons learned, and curated intelligence across the firm."
          links={KNOWLEDGE_SPOTLIGHT.map((item) => ({ label: item.title, href: item.href, icon: SpotlightIcon }))}
        />
      </Spotlight>

      {/* JENNA'S THOUGHT LEADERSHIP — real two-column layout: featured panel (left) + related-story
          rail (right), matching legacy's `.leadership__grid` (`.leadership__feature` +
          `.leadership__sidebar`). Prev/next arrows, dot nav, and rail-click all update the same
          local `leadershipIndex` state; content stays static from `THOUGHT_LEADERSHIP`. */}
      <SectionLabel eyebrow="Jenna's Thought Leadership" sub="From the top of the house" />
      <RevealOnScroll
        as="section"
        aria-labelledby="leadership-heading"
        className="leadership"
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') goToStory(leadershipIndex + 1)
          if (e.key === 'ArrowLeft') goToStory(leadershipIndex - 1)
        }}
      >
        <h2 id="leadership-heading" className="sr-only">
          Jenna&rsquo;s Thought Leadership
        </h2>
        <div className="leadership__outer">
          <button
            type="button"
            onClick={() => goToStory(leadershipIndex - 1)}
            aria-label="Previous story"
            className="leadership__arrow leadership__arrow--left max-md:hidden"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => goToStory(leadershipIndex + 1)}
            aria-label="Next story"
            className="leadership__arrow leadership__arrow--right max-md:hidden"
          >
            ›
          </button>

          <div className="leadership__grid">
            {/* Featured panel */}
            <div className="leadership__feature">
              <div
                aria-hidden="true"
                className="leadership__feature-img"
                style={{ background: 'linear-gradient(135deg,#0F2340 0%,#1B365D 60%,#2A4A78 100%)' }}
              />
              <div aria-hidden="true" className="ambient-breath" />
              <HeroGrain />
              <div className="leadership__feature-overlay" aria-hidden="true" />
              <div className="leadership__feature-content">
                <div className="leadership__kicker">{activeStory.kicker}</div>
                <h3 className="group/headline leadership__headline">
                  <a href={activeStory.href} className="transition-opacity">
                    <span className="group-hover/headline:hidden">{activeStory.title}</span>
                    <ShimmerText as="span" className="hidden group-hover/headline:inline">
                      {activeStory.title}
                    </ShimmerText>
                  </a>
                </h3>
                <p className={`leadership__lede transition-all duration-300 ${descriptionExpanded ? '' : 'line-clamp-2'}`}>
                  {activeStory.description}
                </p>
                <button
                  type="button"
                  onClick={() => setDescriptionExpanded((v) => !v)}
                  className="mb-6 font-mono text-[10px] tracking-[0.6px] uppercase text-white/40 hover:text-green transition-colors relative z-[2]"
                >
                  {descriptionExpanded ? 'Show less' : 'More'}
                </button>
                <div className="leadership__actions">
                  <a href={activeStory.href} className="btn btn--green">
                    Read Article →
                  </a>
                </div>
                <div className="leadership__bottom-row">
                  <div className="leadership__dots" role="tablist" aria-label="More thought-leadership stories">
                    {THOUGHT_LEADERSHIP.map((story, i) => (
                      <button
                        key={story.title}
                        type="button"
                        role="tab"
                        aria-selected={i === leadershipIndex}
                        aria-label={story.title}
                        onClick={() => goToStory(i)}
                        className={`leadership__dot ${i === leadershipIndex ? 'leadership__dot--active' : ''}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Related-story rail */}
            <div className="leadership__sidebar">
              <ul aria-label="Related thought-leadership stories" className="flex flex-col">
                {THOUGHT_LEADERSHIP.map((story, i) => (
                  <li key={story.title}>
                    <button
                      type="button"
                      onClick={() => goToStory(i)}
                      aria-current={i === leadershipIndex ? 'true' : undefined}
                      className={`leadership__item ${i === leadershipIndex ? 'leadership__item--active' : ''}`}
                    >
                      <div className="leadership__item-kicker">{story.kicker}</div>
                      <div className="leadership__item-title">{story.title}</div>
                      <p className="leadership__item-desc">{story.description}</p>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </RevealOnScroll>

      {/* PRIORITY TOPICS */}
      <SectionLabel eyebrow="Priority Topics" sub="Where the firm is placing its energy" />
      <div className="mb-16">
        <SectionSlider ariaLabel="priority topics">
          {TOPICS.map((topic) => (
            <TopicCard key={topic.label} {...topic} />
          ))}
        </SectionSlider>
      </div>

      {/* ACTIVE PROJECTS */}
      <section className="mb-16" aria-labelledby="home-projects-heading">
        <div className="flex items-center justify-between mb-5">
          <h2 id="home-projects-heading" className="font-mono text-[10px] font-medium tracking-[2px] uppercase text-text-muted">
            Your Projects
          </h2>
          <Link to="/active-projects" className="font-mono text-[10px] text-green hover:text-green-dark tracking-wide transition-colors">
            View all projects →
          </Link>
        </div>

        {projectsLoading ? (
          <p className="text-[13px] text-text-secondary bg-white border border-rule p-6">Loading projects…</p>
        ) : projectsError ? (
          <p className="text-[13px] text-text-secondary bg-white border border-rule p-6">{projectsError}</p>
        ) : projects.length === 0 ? (
          <p className="text-[13px] text-text-secondary bg-white border border-rule p-6">No projects to show right now.</p>
        ) : (
          <SectionSlider ariaLabel="your projects">
            {projects.map((project) => (
              <li key={project.id} data-slide className="list-none shrink-0 snap-start w-[320px] max-md:w-full">
                <RevealOnScroll>
                  <HomeProjectTile project={project} />
                </RevealOnScroll>
              </li>
            ))}
          </SectionSlider>
        )}
      </section>

      {/* KNOWLEDGE SPOTLIGHT — dedicated rich row (distinct from the Your Hub quadrant tile, same
          underlying KNOWLEDGE_SPOTLIGHT content, richer card treatment) */}
      <SectionLabel eyebrow="Knowledge Spotlight" sub="Freshly curated for the team" />
      <div className="mb-10">
        <SectionSlider ariaLabel="knowledge spotlight">
          {KNOWLEDGE_SPOTLIGHT.map((item, i) => (
            <KnowledgeCard key={item.title} item={item} accentIndex={i} />
          ))}
        </SectionSlider>
      </div>

      {/* KNOWLEDGE — Templates / How We Work / Tool Guides. Compact list row, real routes. */}
      <section className="bg-white border border-rule mb-16" aria-labelledby="home-knowledge-heading">
        <div className="px-6 py-4 border-b border-rule-light">
          <h2 id="home-knowledge-heading" className="font-display text-[0.95rem] font-bold text-navy">
            Knowledge
          </h2>
        </div>
        <div className="grid grid-cols-3 max-md:grid-cols-1 divide-x divide-rule-light max-md:divide-x-0 max-md:divide-y">
          {KNOWLEDGE_LINKS.map((item) => (
            <Link key={item.title} to={item.href} className="group block p-5 hover:bg-off-white transition-colors">
              <div className="text-[12.5px] font-semibold text-navy group-hover:text-green-dark transition-colors">{item.title}</div>
              <div className="text-[11px] text-text-secondary mt-1 leading-snug">{item.description}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* COMMUNITIES OF PRACTICE */}
      <section className="mb-4" aria-labelledby="home-communities-heading">
        <div className="flex items-center justify-between mb-5">
          <h2 id="home-communities-heading" className="font-mono text-[10px] font-medium tracking-[2px] uppercase text-text-muted">
            Communities
          </h2>
          <Link to="/communities" className="font-mono text-[10px] text-green hover:text-green-dark tracking-wide transition-colors">
            View all communities →
          </Link>
        </div>

        {communitiesLoading ? (
          <p className="text-[13px] text-text-secondary bg-white border border-rule p-6">Loading communities…</p>
        ) : communitiesError ? (
          <p className="text-[13px] text-text-secondary bg-white border border-rule p-6">{communitiesError}</p>
        ) : communities.length === 0 ? (
          <p className="text-[13px] text-text-secondary bg-white border border-rule p-6">No communities to show right now.</p>
        ) : (
          <SectionSlider ariaLabel="communities of practice">
            {communities.map((community) => (
              <li key={community.slug} data-slide className="list-none shrink-0 snap-start w-[320px] max-md:w-full">
                <RevealOnScroll>
                  <HomeCommunityTile community={community} />
                </RevealOnScroll>
              </li>
            ))}
          </SectionSlider>
        )}
      </section>
     </div>
    </AppShell>
  )
}

function SectionLabel({ eyebrow, sub }: { eyebrow: string; sub: string }) {
  return (
    <div className="flex items-baseline gap-3 mb-5 mt-2">
      <span className="font-mono text-[10px] font-medium tracking-[2px] uppercase text-navy">{eyebrow}</span>
      <span className="flex-1 h-px bg-rule" aria-hidden="true" />
      <span className="font-mono text-[9.5px] tracking-[0.6px] text-text-muted max-md:hidden">{sub}</span>
    </div>
  )
}
