import type { AvatarColor, AvatarStackMember, HealthBucket, ProjectCardLink, ProjectStatus } from '../components/ui'

/**
 * Stand-in for `GET /api/projects` (spec §5/§12) — already scoped, already computed. A real
 * response only ever contains the caller's in-scope projects; this mock represents what one
 * signed-in consultant's response would look like, not the firm's full portfolio.
 */
export interface Project {
  id: string
  href: string
  clientLine: string
  name: string
  description: string
  status: ProjectStatus
  /** Milestone-derived, computed server-side (AP2–AP5). Null with zero milestones. */
  progress: number | null
  /** Derived from overdue milestone count (AP6) — independent of `status` (AP7). */
  health: 'on_track' | 'needs_attention' | 'at_risk'
  dueLabel: string
  team: AvatarStackMember[]
  teamOverflow: number
  links: ProjectCardLink[]
  /** Whether the current user is a member (vs. reaching it via practice/firm-wide scope). */
  mine: boolean
}

export const PROJECTS: Project[] = [
  {
    id: 'digital-transformation',
    href: '/projects/digital-transformation',
    clientLine: 'Acme Corp · Strategic Planning',
    name: 'Digital Transformation Roadmap',
    description:
      'Strategy & Systems Design — reimagining operations through digital-first frameworks and stakeholder alignment.',
    status: 'active',
    progress: 68,
    health: 'on_track',
    dueLabel: 'Due: 15 Apr 2026',
    team: [
      { id: 'sf', initials: 'SF', color: 'green' },
      { id: 'mk', initials: 'MK', color: 'navy' },
      { id: 'lr', initials: 'LR', color: 'navy-mid' },
    ],
    teamOverflow: 2,
    links: [
      { label: 'Files', href: '/under-development?from=project-files' },
      { label: 'Planner', href: '/under-development?from=planner-board' },
      { label: 'Dashboard', href: '/under-development?from=power-bi-dashboard' },
    ],
    mine: true,
  },
  {
    id: 'supply-chain-optimization',
    href: '/projects/supply-chain-optimization',
    clientLine: 'NovaTech · Operations',
    name: 'Supply Chain Optimization',
    description: 'Agile Project Management — streamlining procurement processes and vendor relationships.',
    status: 'review',
    progress: 41,
    health: 'needs_attention',
    dueLabel: 'Due: 30 May 2026',
    team: [
      { id: 'jp', initials: 'JP', color: 'amber' },
      { id: 'fn', initials: 'FN', color: 'pink' },
    ],
    teamOverflow: 1,
    links: [
      { label: 'Files', href: '/under-development?from=project-files' },
      { label: 'Planner', href: '/under-development?from=planner-board' },
      { label: 'SOW', href: '/under-development?from=sow-document' },
    ],
    mine: true,
  },
  {
    id: 'workforce-planning',
    href: '/projects/workforce-planning',
    clientLine: 'GovServices · HR',
    name: 'Workforce Planning Initiative',
    description: 'Talent Acquisition & Succession — building a sustainable pipeline for federal workforce needs.',
    status: 'wrap',
    progress: 85,
    health: 'on_track',
    dueLabel: 'Due: 31 Mar 2026',
    team: [
      { id: 'dl', initials: 'DL', color: 'navy-mid' },
      { id: 'sa', initials: 'SA', color: 'navy' },
      { id: 'rt', initials: 'RT', color: 'green' },
    ],
    teamOverflow: 3,
    links: [
      { label: 'Files', href: '/under-development?from=project-files' },
      { label: 'Dashboard', href: '/under-development?from=power-bi-dashboard' },
      { label: 'KT Checklist', href: '/under-development?from=kt-checklist' },
    ],
    mine: false,
  },
  {
    id: 'equity-transit',
    href: '/projects/equity-transit',
    clientLine: 'Metro Transit Authority · Planning',
    name: 'Equity-Centered Transit Study',
    description: 'Environmental Justice — assessing route equity across underserved communities using EJ40 methodology.',
    status: 'active',
    progress: 22,
    health: 'needs_attention',
    dueLabel: 'Due: 31 Jul 2026',
    team: [
      { id: 'rt2', initials: 'RT', color: 'pink' },
      { id: 'sf2', initials: 'SF', color: 'green' },
    ],
    teamOverflow: 4,
    links: [
      { label: 'Files', href: '/under-development?from=project-files' },
      { label: 'Planner', href: '/under-development?from=planner-board' },
      { label: 'EJ Data', href: '/under-development?from=ej-data' },
    ],
    mine: true,
  },
  {
    id: 'ehr-procurement',
    href: '/projects/ehr-procurement',
    clientLine: 'Beacon Health · IT',
    name: 'EHR System Procurement',
    description: 'Procurement Advisory — vendor evaluation and RFP development for electronic health records.',
    status: 'active',
    progress: 55,
    health: 'on_track',
    dueLabel: 'Due: 15 May 2026',
    team: [
      { id: 'mk2', initials: 'MK', color: 'navy' },
      { id: 'jp2', initials: 'JP', color: 'amber' },
    ],
    teamOverflow: 2,
    links: [
      { label: 'Files', href: '/under-development?from=project-files' },
      { label: 'RFP Draft', href: '/under-development?from=rfp-draft' },
      { label: 'Scorecard', href: '/under-development?from=scorecard' },
    ],
    mine: false,
  },
  {
    id: 'clean-energy-audit',
    href: '/projects/clean-energy-audit',
    clientLine: 'Dept of Energy · Compliance',
    name: 'Clean Energy Compliance Audit',
    description: 'Regulatory Advisory — IRA compliance review and reporting framework for clean energy grants.',
    status: 'review',
    progress: 78,
    health: 'on_track',
    dueLabel: 'Due: 8 Apr 2026',
    team: [
      { id: 'dl2', initials: 'DL', color: 'green' },
      { id: 'sa2', initials: 'SA', color: 'navy-mid' },
    ],
    teamOverflow: 1,
    links: [
      { label: 'Files', href: '/under-development?from=project-files' },
      { label: 'Audit Log', href: '/under-development?from=audit-log' },
      { label: 'Report', href: '/under-development?from=audit-report' },
    ],
    mine: false,
  },
]

/**
 * Hero counts. The mockup showed 6 Active / 2 In Review / 1 Wrapping against 6 cards total
 * (spec §13 finding) — corrected here so the three buckets actually sum to the portfolio size.
 */
export const PROJECT_COUNTS = {
  active: PROJECTS.filter((p) => p.status === 'active').length,
  inReview: PROJECTS.filter((p) => p.status === 'review').length,
  wrapping: PROJECTS.filter((p) => p.status === 'wrap').length,
}

export interface UpcomingMilestone {
  id: string
  projectHref: string
  day: string
  month: string
  title: string
  note: string
  leadInitials: string
  leadName: string
  leadColor: AvatarColor
}

/** Stand-in for `GET /api/milestones?window=30d` — scoped to the same visible project set. */
export const UPCOMING_MILESTONES: UpcomingMilestone[] = [
  {
    id: 'ms-1',
    projectHref: '/projects/digital-transformation',
    day: '28',
    month: 'Mar',
    title: 'Acme — Phase 2 Deliverable',
    note: 'Strategy deck due to client',
    leadInitials: 'SF',
    leadName: 'S. Foster',
    leadColor: 'green',
  },
  {
    id: 'ms-2',
    projectHref: '/projects/workforce-planning',
    day: '31',
    month: 'Mar',
    title: 'GovServices — Knowledge Transfer',
    note: 'Final handoff & closeout docs',
    leadInitials: 'DL',
    leadName: 'D. Laurent',
    leadColor: 'navy-mid',
  },
  {
    id: 'ms-3',
    projectHref: '/projects/clean-energy-audit',
    day: '08',
    month: 'Apr',
    title: 'DoE — Draft Audit Report',
    note: 'Internal review before client submission',
    leadInitials: 'DL',
    leadName: 'D. Laurent',
    leadColor: 'green',
  },
  {
    id: 'ms-4',
    projectHref: '/projects/digital-transformation',
    day: '15',
    month: 'Apr',
    title: 'Acme — Final Presentation',
    note: 'Board-level strategy presentation',
    leadInitials: 'MK',
    leadName: 'M. Kim',
    leadColor: 'navy',
  },
  {
    id: 'ms-5',
    projectHref: '/projects/supply-chain-optimization',
    day: '22',
    month: 'Apr',
    title: 'NovaTech — Vendor Shortlist',
    note: 'Final vendor recommendations to client',
    leadInitials: 'JP',
    leadName: 'J. Park',
    leadColor: 'amber',
  },
]

/**
 * Portfolio health roll-up (AP6/AP7) — bucketed by overdue-milestone count over the visible
 * set, and avgCompletion (AP10) — mean progress across the scoped set, excluding null.
 */
export const PORTFOLIO_HEALTH: { buckets: HealthBucket[]; avgCompletion: number } = {
  buckets: [
    { label: 'On Track', count: PROJECTS.filter((p) => p.health === 'on_track').length, tone: 'green' },
    { label: 'Needs Attention', count: PROJECTS.filter((p) => p.health === 'needs_attention').length, tone: 'amber' },
    { label: 'At Risk', count: PROJECTS.filter((p) => p.health === 'at_risk').length, tone: 'pink' },
  ],
  avgCompletion: Math.round(
    PROJECTS.filter((p) => p.progress != null).reduce((sum, p) => sum + (p.progress ?? 0), 0) /
      PROJECTS.filter((p) => p.progress != null).length,
  ),
}
