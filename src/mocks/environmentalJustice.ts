export type PillarIcon = 'globe' | 'users' | 'activity'

export interface EnvironmentalJusticePillar {
  icon: PillarIcon
  title: string
  description: string
  linkLabel: string
}

export const EJ_APPROACH: EnvironmentalJusticePillar[] = [
  {
    icon: 'globe',
    title: 'EJ40 Screening',
    description:
      'Federal screening methodology for identifying communities disproportionately affected by environmental and climate burdens. JJR applies this to every relevant engagement.',
    linkLabel: 'View Methodology →',
  },
  {
    icon: 'users',
    title: 'Community Engagement',
    description:
      'Structured frameworks for meaningful community input — not checkbox consultation. Includes survey design, focus group protocols, and accessible reporting formats.',
    linkLabel: 'Engagement Guide →',
  },
  {
    icon: 'activity',
    title: 'Impact Scorecards',
    description:
      "Quantitative equity scoring for procurement, transit, housing, and infrastructure decisions. Developed by JJR's Equity & Impact community of practice.",
    linkLabel: 'View Scorecards →',
  },
]

export type RoadmapBadgeTone = 'current' | 'done' | 'planned'

export interface EjProcessStep {
  badgeLabel: string
  badgeTone: RoadmapBadgeTone
  title: string
  description: string
  meta: string
}

export const EJ_PROCESS: EjProcessStep[] = [
  {
    badgeLabel: '01',
    badgeTone: 'current',
    title: 'Screen',
    description: 'Run EJ40 screening on the affected geography. Identify burden indicators and vulnerable populations.',
    meta: 'Before scoping · PM + EJ Lead',
  },
  {
    badgeLabel: '02',
    badgeTone: 'done',
    title: 'Engage',
    description: "Design and conduct community engagement using JJR's structured protocols. Document input in accessible formats.",
    meta: 'During planning · Full team',
  },
  {
    badgeLabel: '03',
    badgeTone: 'planned',
    title: 'Score',
    description: 'Apply equity scorecards to proposed actions. Quantify impact across affected groups.',
    meta: 'During analysis · Analyst + EJ Lead',
  },
  {
    badgeLabel: '04',
    badgeTone: 'planned',
    title: 'Report',
    description: 'Produce accessible findings for both client and community stakeholders. Plain language, multiple formats.',
    meta: 'Delivery · PM owns',
  },
]

export type SidebarIcon = 'file' | 'users' | 'activity'

export interface EjResource {
  label: string
  href: string
  icon: SidebarIcon
}

export const EJ_RESOURCES: EjResource[] = [
  { label: 'EJ Assessment Kit', href: '/templates', icon: 'file' },
  { label: 'Community Survey Template', href: '/templates', icon: 'file' },
  { label: 'Equity & Impact CoP', href: '/communities', icon: 'users' },
  { label: 'Active EJ Projects', href: '/active-projects', icon: 'activity' },
]
