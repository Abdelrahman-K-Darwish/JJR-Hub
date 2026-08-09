export type PillarIcon = 'frame' | 'shield' | 'book-open'

export interface AiForGoodPillar {
  icon: PillarIcon
  title: string
  description: string
  linkLabel: string
}

export const AI_PRINCIPLES: AiForGoodPillar[] = [
  {
    icon: 'frame',
    title: 'Responsible AI Framework',
    description:
      "JJR's internal guidelines for evaluating, deploying, and governing AI tools. Covers bias assessment, data privacy, and transparency requirements for every AI-assisted deliverable.",
    linkLabel: 'Read Framework →',
  },
  {
    icon: 'shield',
    title: 'AI Governance',
    description:
      'How JJR evaluates new AI tools before adoption. Includes the Copilot evaluation, Claude Enterprise assessment, and the decision framework for client-facing AI use.',
    linkLabel: 'Governance Model →',
  },
  {
    icon: 'book-open',
    title: 'Prompt Library',
    description:
      'Curated, tested prompts for procurement analysis, report drafting, data synthesis, and client communication. Shared across the Innovation & AI community of practice.',
    linkLabel: 'Browse Prompts →',
  },
]

export type RoadmapBadgeTone = 'current' | 'done' | 'planned'

export interface AiAdoptionStep {
  badgeLabel: string
  badgeTone: RoadmapBadgeTone
  title: string
  description: string
  meta: string
}

export const AI_ADOPTION_ROADMAP: AiAdoptionStep[] = [
  {
    badgeLabel: 'Q1',
    badgeTone: 'current',
    title: 'Evaluate',
    description: 'Copilot and Claude Enterprise assessments complete. Internal prompt library launched. Ethics framework published.',
    meta: 'Complete',
  },
  {
    badgeLabel: 'Q2',
    badgeTone: 'done',
    title: 'Pilot',
    description: 'Copilot pilot with project leads. AI-assisted procurement analysis tested on two live engagements.',
    meta: 'In Progress',
  },
  {
    badgeLabel: 'Q3',
    badgeTone: 'planned',
    title: 'Scale',
    description: 'Full Copilot rollout. AI search in the Hub. Governance review of all AI-assisted deliverables.',
    meta: 'Planned',
  },
  {
    badgeLabel: 'Q4',
    badgeTone: 'planned',
    title: 'Embed',
    description: 'AI tools integrated into standard workflows. Annual responsible AI audit. Community of Practice publishes best practices.',
    meta: 'Planned',
  },
]

export type SidebarIcon = 'frame' | 'file' | 'users' | 'shield'

export interface AiForGoodResource {
  label: string
  href: string
  icon: SidebarIcon
}

export const AI_RESOURCES: AiForGoodResource[] = [
  { label: 'Copilot Guide', href: '/tool-guides', icon: 'frame' },
  { label: 'AI Ethics Checklist', href: '/templates', icon: 'file' },
  { label: 'Innovation & AI CoP', href: '/communities', icon: 'users' },
  { label: 'Data Handling Policy', href: '/how-we-work', icon: 'shield' },
]
