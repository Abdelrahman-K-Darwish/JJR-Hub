/**
 * Communities domain types — feature-owned and presentation-independent.
 *
 * These shapes must never import from `components/ui`. The service contract describes
 * what the backend will eventually return, not how a component chooses to render it.
 * They happen to be structurally compatible with what `CommunityCard`/`ListPanel` expect
 * today, so the page can pass this data straight through — but that's a coincidence of the
 * current UI, not a dependency either direction should rely on.
 */

export type CommunityIconKey = 'info' | 'globe' | 'bar-chart'

/** Shared resource-icon primitive — also used by `community-detail/communityDetail.types.ts`. */
export type CommunityResourceIconKey = 'file' | 'play' | 'book-open'

export interface CommunitySummaryResource {
  label: string
  href: string
  icon: CommunityResourceIconKey
}

export interface CommunitySummaryDiscussion {
  title: string
  meta: string
  href: string
}

export interface CommunitySummaryExpert {
  href: string
  initials: string
  background: string
  name: string
  role: string
}

export interface CommunitySummary {
  slug: string
  name: string
  icon: CommunityIconKey
  description: string
  memberCount: number
  postsThisWeek: number
  resourceCount: number
  steward: string
  /** Whether the current viewer is a member — drives the class C discussion omission (D14). */
  isMember: boolean
  topResources: CommunitySummaryResource[]
  recentDiscussions: CommunitySummaryDiscussion[]
  keyExperts: CommunitySummaryExpert[]
}

/** Mirrors what `getDirectory()` resolves — the community list plus its surrounding rail data. */
export interface UpcomingEvent {
  day: string
  month: string
  title: string
  meta: string
  href: string
}

export interface YourCommunityRow {
  slug: string
  name: string
  joined: boolean
}

export interface CommunitiesDirectory {
  communities: CommunitySummary[]
  totalMemberCount: number
  upcomingEvents: UpcomingEvent[]
  yourCommunities: YourCommunityRow[]
}
