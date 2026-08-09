export type TemplateIconKey = 'file' | 'file-text' | 'users' | 'table' | 'activity' | 'clock' | 'book-open' | 'clipboard-check' | 'shield'
export type IconTone = 'green' | 'navy' | 'amber' | 'pink' | 'muted'

export interface DocMeta {
  title: string
  description: string
  category: string
  version: string
  updatedLabel: string
}

export interface FeaturedTemplate extends DocMeta {
  id: string
  gradient: string
  icon: TemplateIconKey
  badge: { label: string; tone: 'pink' | 'green' }
  downloadsLabel: string
}

export const FEATURED_TEMPLATES: FeaturedTemplate[] = [
  {
    id: 'kickoff-deck',
    title: 'Project Kickoff Deck',
    description:
      'Standard deck for all new client onboardings. Brand guidelines applied, pre-built slides for scope, team, and timeline.',
    category: 'Proposal',
    version: 'v3.2',
    updatedLabel: 'Updated Mar 12',
    gradient: 'linear-gradient(135deg,#2D7D00,#4CBB17)',
    icon: 'file-text',
    badge: { label: 'Most Used', tone: 'pink' },
    downloadsLabel: '142 downloads',
  },
  {
    id: 'capability-statement',
    title: 'Capability Statement',
    description: 'One-page firm capability overview for RFP responses and new client introductions. Fully branded.',
    category: 'Report',
    version: 'v2.1',
    updatedLabel: 'Updated Mar 18',
    gradient: 'linear-gradient(135deg,#0F2340,#2A4A78)',
    icon: 'file',
    badge: { label: 'Updated', tone: 'green' },
    downloadsLabel: '98 downloads',
  },
  {
    id: 'ej-kit',
    title: 'EJ Impact Assessment Kit',
    description:
      'Full toolkit for community-based environmental justice assessments. Includes scorecards, survey templates, and report format.',
    category: 'Methodology',
    version: 'v1.0',
    updatedLabel: 'Added Mar 20',
    gradient: 'linear-gradient(135deg,#8B1A6A,#E91E8C)',
    icon: 'table',
    badge: { label: 'New', tone: 'pink' },
    downloadsLabel: '34 downloads',
  },
]

export interface TemplateRow extends DocMeta {
  id: string
  summary: string
  categoryFilterKey: string
  roles: string[]
  icon: TemplateIconKey
  iconTone: IconTone
}

export const TEMPLATE_ROWS: TemplateRow[] = [
  {
    id: 'kickoff-deck-row',
    title: 'Project Kickoff Deck',
    summary: 'Client onboarding starter deck',
    description: 'Client onboarding starter deck',
    category: 'Proposal',
    categoryFilterKey: 'proposal',
    roles: ['consultant', 'pm'],
    version: 'v3.2',
    updatedLabel: 'Mar 12',
    icon: 'file',
    iconTone: 'green',
  },
  {
    id: 'capability-statement-row',
    title: 'Capability Statement',
    summary: 'One-page firm overview for RFPs',
    description: 'One-page firm overview for RFPs',
    category: 'Report',
    categoryFilterKey: 'report',
    roles: ['consultant', 'pm', 'leadership'],
    version: 'v2.1',
    updatedLabel: 'Mar 18',
    icon: 'file',
    iconTone: 'navy',
  },
  {
    id: 'sow-template',
    title: 'Scope of Work Template',
    summary: 'Standard SOW for new engagements',
    description: 'Standard SOW for new engagements',
    category: 'Proposal',
    categoryFilterKey: 'proposal',
    roles: ['pm'],
    version: 'v4.0',
    updatedLabel: 'Mar 5',
    icon: 'file',
    iconTone: 'green',
  },
  {
    id: 'welcome-pack',
    title: 'New Consultant Welcome Pack',
    summary: 'First-week setup and orientation',
    description: 'First-week setup and orientation',
    category: 'Onboarding',
    categoryFilterKey: 'onboarding',
    roles: ['consultant', 'analyst'],
    version: 'v2.0',
    updatedLabel: 'Feb 28',
    icon: 'users',
    iconTone: 'amber',
  },
  {
    id: 'ej-kit-row',
    title: 'EJ Impact Assessment Kit',
    summary: 'Community-based EJ toolkit',
    description: 'Community-based EJ toolkit',
    category: 'Methodology',
    categoryFilterKey: 'methodology',
    roles: ['consultant', 'pm', 'analyst'],
    version: 'v1.0',
    updatedLabel: 'Mar 20',
    icon: 'table',
    iconTone: 'pink',
  },
  {
    id: 'status-report',
    title: 'Monthly Status Report',
    summary: 'Client-facing project status update',
    description: 'Client-facing project status update',
    category: 'Report',
    categoryFilterKey: 'report',
    roles: ['pm', 'leadership'],
    version: 'v5.0',
    updatedLabel: 'Mar 1',
    icon: 'activity',
    iconTone: 'navy',
  },
  {
    id: 'timesheet-guide',
    title: 'Timesheet Submission Guide',
    summary: 'QuickBooks Time step-by-step',
    description: 'QuickBooks Time step-by-step',
    category: 'Admin',
    categoryFilterKey: 'admin',
    roles: ['consultant', 'pm', 'analyst'],
    version: 'v1.3',
    updatedLabel: 'Feb 15',
    icon: 'clock',
    iconTone: 'muted',
  },
  {
    id: 'budget-scope',
    title: 'Budget & Scope Template',
    summary: 'Financial planning for engagements',
    description: 'Financial planning for engagements',
    category: 'Proposal',
    categoryFilterKey: 'proposal',
    roles: ['consultant', 'pm'],
    version: 'v3.1',
    updatedLabel: 'Mar 8',
    icon: 'file',
    iconTone: 'green',
  },
  {
    id: 'research-brief',
    title: 'Research Brief Template',
    summary: 'Standard format for internal briefs',
    description: 'Standard format for internal briefs',
    category: 'Report',
    categoryFilterKey: 'report',
    roles: ['analyst'],
    version: 'v2.0',
    updatedLabel: 'Feb 22',
    icon: 'book-open',
    iconTone: 'navy',
  },
  {
    id: 'closeout-checklist',
    title: 'Project Closeout Checklist',
    summary: 'Knowledge transfer and wrap-up steps',
    description: 'Knowledge transfer and wrap-up steps',
    category: 'Methodology',
    categoryFilterKey: 'methodology',
    roles: ['pm'],
    version: 'v2.4',
    updatedLabel: 'Mar 14',
    icon: 'clipboard-check',
    iconTone: 'pink',
  },
  {
    id: 'scope-change',
    title: 'Scope Change Request',
    summary: 'Formal change order documentation',
    description: 'Formal change order documentation',
    category: 'Admin',
    categoryFilterKey: 'admin',
    roles: ['pm', 'leadership'],
    version: 'v1.5',
    updatedLabel: 'Jan 30',
    icon: 'shield',
    iconTone: 'muted',
  },
  {
    id: 'onboarding-playbook',
    title: 'Client Onboarding Playbook',
    summary: 'End-to-end client setup workflow',
    description: 'End-to-end client setup workflow',
    category: 'Onboarding',
    categoryFilterKey: 'onboarding',
    roles: ['pm'],
    version: 'v1.2',
    updatedLabel: 'Mar 2',
    icon: 'users',
    iconTone: 'amber',
  },
]

export const CATEGORY_FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'proposal', label: 'Proposals' },
  { key: 'report', label: 'Reports' },
  { key: 'onboarding', label: 'Onboarding' },
  { key: 'methodology', label: 'Methodology' },
  { key: 'admin', label: 'Admin & SOPs' },
]

export const TEMPLATE_ROLE_FILTERS = [
  { key: 'consultant', label: 'Consultant' },
  { key: 'pm', label: 'Project Manager' },
  { key: 'analyst', label: 'Analyst' },
  { key: 'leadership', label: 'Leadership' },
]

export interface RecentlyUpdatedItem {
  title: string
  meta: string
  tone: 'green' | 'amber'
}

export const RECENTLY_UPDATED: RecentlyUpdatedItem[] = [
  { title: 'EJ Impact Assessment Kit', meta: 'Mar 20 · v1.0 · New', tone: 'green' },
  { title: 'Capability Statement', meta: 'Mar 18 · v2.1 · Updated', tone: 'green' },
  { title: 'Project Closeout Checklist', meta: 'Mar 14 · v2.4 · Updated', tone: 'amber' },
  { title: 'Project Kickoff Deck', meta: 'Mar 12 · v3.2 · Updated', tone: 'amber' },
]

export interface MostDownloadedItem {
  rank: number
  title: string
  downloadsLabel: string
}

export const MOST_DOWNLOADED: MostDownloadedItem[] = [
  { rank: 1, title: 'Project Kickoff Deck', downloadsLabel: '142 downloads' },
  { rank: 2, title: 'Monthly Status Report', downloadsLabel: '118 downloads' },
  { rank: 3, title: 'Capability Statement', downloadsLabel: '98 downloads' },
  { rank: 4, title: 'Scope of Work Template', downloadsLabel: '87 downloads' },
  { rank: 5, title: 'Budget & Scope Template', downloadsLabel: '76 downloads' },
]
