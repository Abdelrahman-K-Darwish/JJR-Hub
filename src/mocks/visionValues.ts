export type PillarIcon = 'shield' | 'info' | 'file'

export interface VisionValuesPillar {
  icon: PillarIcon
  title: string
  description: string
  linkLabel: string
}

export const VISION_VALUES_PILLARS: VisionValuesPillar[] = [
  {
    icon: 'shield',
    title: 'Equity Is the Standard',
    description:
      "Not a programme. Not a checkbox. Equity is embedded in how we scope work, select vendors, engage communities, and measure success. It's the filter every decision passes through.",
    linkLabel: 'Equity Framework →',
  },
  {
    icon: 'info',
    title: 'Transparency by Default',
    description:
      "Information is shared unless there's a documented reason not to. Access is open. Decisions have owners. If you can't find something, the system failed — not you.",
    linkLabel: 'Access Policy →',
  },
  {
    icon: 'file',
    title: 'One Source of Truth',
    description:
      "Every document lives in one place. Every template has one version. Knowledge hoarding is the one thing we don't tolerate. The Hub is the nerve centre.",
    linkLabel: 'Hub Architecture →',
  },
]

export type RoadmapBadgeTone = 'current' | 'done' | 'planned'

export interface VisionValuesMilestone {
  badgeLabel: string
  badgeTone: RoadmapBadgeTone
  title: string
  description: string
  meta: string
}

export const FIRM_MILESTONES: VisionValuesMilestone[] = [
  {
    badgeLabel: "'21",
    badgeTone: 'current',
    title: 'Founded',
    description:
      'JJR Consulting established by Jenna Robinson. First DPH contract secured. Equity-centred consulting model defined.',
    meta: 'Founding Year',
  },
  {
    badgeLabel: "'23",
    badgeTone: 'done',
    title: 'Growth',
    description: 'Team expanded to 15+ consultants. Jedi Cab leadership programme launched. WBE and MBE certifications secured.',
    meta: 'Scaling Phase',
  },
  {
    badgeLabel: "'25",
    badgeTone: 'done',
    title: 'Infrastructure',
    description: 'Hub v1 launched. PMO formalised. AI tools evaluation begun. Revenue crosses $5M. 20+ active consultants.',
    meta: 'Current Era',
  },
  {
    badgeLabel: "'26",
    badgeTone: 'planned',
    title: 'Scale',
    description:
      '$7.2M revenue target. 30+ consultants. Full AI integration. Hub v2 with intelligence layer. Annual equity audit published.',
    meta: 'The Goal',
  },
]

export type SidebarIcon = 'activity' | 'shield' | 'users' | 'file'

export interface VisionValuesResource {
  label: string
  href: string
  icon: SidebarIcon
}

export const FIRM_DOCUMENTS: VisionValuesResource[] = [
  { label: 'Firm Strategy 2026', href: '/exec-strategy', icon: 'activity' },
  { label: 'How We Work', href: '/how-we-work', icon: 'shield' },
  { label: 'Communities of Practice', href: '/communities', icon: 'users' },
  { label: 'PMO Governance', href: '/pmo', icon: 'file' },
]
