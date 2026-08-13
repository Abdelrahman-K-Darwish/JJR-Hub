import type { CommunityResourceIconKey } from '../communities/communities.types'

/**
 * Community Detail domain types — feature-owned and presentation-independent.
 *
 * These shapes must never import from `components/ui`. The service contract describes
 * what the backend will eventually return, not how a component chooses to render it.
 */

export interface AboutSection {
  heading: string
  body: string
}

export interface DetailMember {
  href: string
  initials: string
  background: string
  name: string
  subtitle: string
  badge?: { label: string; tone: 'pink' | 'green' }
}

export interface DetailResource {
  href: string
  title: string
  meta: string
  badge: string
  iconKey: CommunityResourceIconKey
  iconTone: 'muted' | 'pink'
}

export interface DetailDiscussion {
  title: string
  meta: string
  href: string
}

export interface DetailEvent {
  day: string
  month: string
  title: string
  meta: string
  href: string
}

export interface KeyFact {
  label: string
  value: string
}

export interface RelatedLink {
  label: string
  href: string
}

export interface CommunityDetail {
  slug: string
  name: string
  iconKey: 'info'
  activityLabel: string
  description: string
  memberCount: number
  postsPerWeek: number
  resourceCount: number
  steward: { initials: string; background: string; name: string }
  about: AboutSection[]
  members: DetailMember[]
  moreMembersCount: number
  resources: DetailResource[]
  discussions: DetailDiscussion[]
  events: DetailEvent[]
  keyFacts: KeyFact[]
  related: RelatedLink[]
}
