/**
 * Active Projects domain types — feature-owned and presentation-independent.
 *
 * These shapes must never import from `components/ui`. The service contract describes
 * what the backend will eventually return, not how a component chooses to render it.
 * They happen to be structurally compatible with what `ProjectCard`/`AvatarStack`/`HealthBar`
 * expect today, so the page can pass this data straight through — but that's a coincidence
 * of the current UI, not a dependency either direction should rely on.
 */

export type ProjectStatus = 'active' | 'review' | 'wrap'

/** Avatar/lead accent color — duplicated (not imported) from `components/ui`'s `AvatarColor` on purpose. */
export type TeamColor = 'green' | 'navy' | 'navy-mid' | 'amber' | 'pink'

export interface ProjectTeamMember {
  id: string
  initials: string
  color: TeamColor
}

export interface ProjectLink {
  label: string
  href: string
}

export interface Project {
  id: string
  href: string
  clientLine: string
  name: string
  description: string
  status: ProjectStatus
  /** Milestone-derived, computed server-side (spec AP2–AP5). Null with zero milestones. */
  progress: number | null
  /** Derived from overdue milestone count (AP6) — independent of `status` (AP7). */
  health: 'on_track' | 'needs_attention' | 'at_risk'
  dueLabel: string
  team: ProjectTeamMember[]
  teamOverflow: number
  links: ProjectLink[]
  /** Whether the current user is a member (vs. reaching it via practice/firm-wide scope). */
  mine: boolean
}

export interface PortfolioCounts {
  active: number
  inReview: number
  wrapping: number
}

export type PortfolioHealthTone = 'green' | 'amber' | 'pink'

export interface PortfolioHealthBucket {
  label: string
  count: number
  tone: PortfolioHealthTone
}

export interface PortfolioHealth {
  buckets: PortfolioHealthBucket[]
  avgCompletion: number
}

/** What `getPortfolio()` resolves — mirrors `GET /api/projects` in spec §5/§12. */
export interface ProjectsPortfolio {
  projects: Project[]
  counts: PortfolioCounts
  health: PortfolioHealth
}

/** Mirrors `GET /api/milestones?window=30d` in spec §5. */
export interface UpcomingMilestone {
  id: string
  projectHref: string
  day: string
  month: string
  title: string
  note: string
  leadInitials: string
  leadName: string
  leadColor: TeamColor
}
