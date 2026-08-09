import type { AvatarColor } from '../components/ui'

export interface LifecycleStep {
  number: number
  title: string
  description: string
  active: boolean
  links: { label: string; href: string }[]
}

export const LIFECYCLE_STEPS: LifecycleStep[] = [
  {
    number: 1,
    title: 'Initiation',
    description: 'SOW signed, project workspace created, team assigned, kickoff scheduled.',
    active: true,
    links: [
      { label: 'SOW Template →', href: '/templates' },
      { label: 'Kickoff Deck →', href: '/templates' },
    ],
  },
  {
    number: 2,
    title: 'Planning',
    description: 'Work plan built, milestones set, budget baseline locked, risk register created.',
    active: false,
    links: [
      { label: 'Budget Template →', href: '/templates' },
      { label: 'Risk Register →', href: '/under-development?from=risk-register' },
    ],
  },
  {
    number: 3,
    title: 'Execution',
    description: 'Deliverables produced, weekly status reports, hours logged, scope managed.',
    active: false,
    links: [
      { label: 'Status Report →', href: '/templates' },
      { label: 'Change Request →', href: '/templates' },
    ],
  },
  {
    number: 4,
    title: 'Review',
    description: 'Client sign-off, QA check, PMO review of financials and deliverables.',
    active: false,
    links: [
      { label: 'QA Checklist →', href: '/under-development?from=qa-checklist' },
      { label: 'Sign-off Form →', href: '/under-development?from=sign-off-form' },
    ],
  },
  {
    number: 5,
    title: 'Closeout',
    description: 'Knowledge transfer, lessons learned deposit, final invoice, archive workspace.',
    active: false,
    links: [
      { label: 'Closeout Checklist →', href: '/templates' },
      { label: 'Lessons Form →', href: '/pmo#lessons' },
    ],
  },
]

export type GovernanceIcon = 'shield' | 'activity' | 'info' | 'users'

export interface GovernanceDoc {
  title: string
  description: string
  href: string
  icon: GovernanceIcon
}

export const GOVERNANCE_DOCS: GovernanceDoc[] = [
  {
    title: 'Project Governance Framework',
    description: 'Decision rights, escalation paths, approval gates, and accountability structure for all JJR engagements.',
    href: '/under-development?from=project-governance-framework',
    icon: 'shield',
  },
  {
    title: 'Budget & Financial Controls',
    description: 'Budget tracking standards, variance thresholds, and Power BI dashboard integration for real-time financials.',
    href: '/under-development?from=budget-financial-controls',
    icon: 'activity',
  },
  {
    title: 'Risk Management Playbook',
    description: 'How to identify, assess, escalate, and mitigate project risks. Includes the standard risk register format.',
    href: '/under-development?from=risk-management',
    icon: 'info',
  },
  {
    title: 'Stakeholder Management',
    description: 'Mapping, engagement plans, and communication cadences for client and internal stakeholders.',
    href: '/under-development?from=stakeholder-management',
    icon: 'users',
  },
]

export interface PmoAnnouncement {
  kicker: string
  dateLabel: string
  headline: string
  body: string
  ctaLabel: string
  ctaHref: string
}

export const PMO_ANNOUNCEMENT: PmoAnnouncement = {
  kicker: 'PMO Update',
  dateLabel: '21 Apr 2026',
  headline: 'Q1 project reviews start next week.',
  body: 'All project leads — please ensure your status dashboards are current and closeout docs are staged for any wrapping projects. Review schedule is in the sidebar calendar.',
  ctaLabel: 'View Details →',
  ctaHref: '/under-development?from=pmo-update',
}

export type LessonTag = 'worked' | 'challenge' | 'recommendation'

export interface Lesson {
  title: string
  tag: LessonTag
  description: string
  author: string
  dateLabel: string
  tagsLabel: string
}

export const LESSONS: Lesson[] = [
  {
    title: 'Client discovery phase needs more structure',
    tag: 'worked',
    description:
      'Adding a structured discovery questionnaire to the Acme engagement cut the scoping phase by 2 weeks. Recommend standardising this for all strategy projects.',
    author: 'S. Foster · Acme Corp',
    dateLabel: '18 Mar 2026',
    tagsLabel: 'Strategy · Active Projects',
  },
  {
    title: 'Scope creep signals missed in early sprints',
    tag: 'challenge',
    description: "NovaTech engagement had informal scope additions in sprint 2 that weren't caught until sprint 4. Need a scope change trigger in sprint reviews.",
    author: 'F. Nakamura · NovaTech',
    dateLabel: '10 Mar 2026',
    tagsLabel: 'Operations · PM Process',
  },
  {
    title: 'EJ screening data should be centralised',
    tag: 'recommendation',
    description:
      'The GovServices team recreated EJ screening datasets that Equity & Impact CoP already had. Recommend linking CoP resource libraries to project workspaces.',
    author: 'D. Laurent · GovServices',
    dateLabel: '5 Mar 2026',
    tagsLabel: 'EJ · Knowledge Management',
  },
]

export interface ReviewCalendarEvent {
  day: string
  month: string
  title: string
  meta: string
  href: string
}

export const REVIEW_CALENDAR: ReviewCalendarEvent[] = [
  { day: '27', month: 'Apr', title: 'Q1 Portfolio Review', meta: 'All PMs · 10:00 · Room 1A', href: '/under-development?from=outlook-calendar-event' },
  { day: '30', month: 'Apr', title: 'GovServices Closeout Review', meta: 'D. Laurent + PMO · 14:00', href: '/under-development?from=outlook-calendar-event' },
  { day: '08', month: 'May', title: 'DoE Audit — Internal Gate', meta: 'PMO + Leadership · 9:00', href: '/under-development?from=outlook-calendar-event' },
  { day: '15', month: 'May', title: 'Monthly PM Roundtable', meta: 'All PMs · 11:00 · Teams', href: '/under-development?from=outlook-calendar-event' },
]

export interface PmoContact {
  href: string
  initials: string
  color: AvatarColor
  name: string
  title: string
}

export const PMO_CONTACTS: PmoContact[] = [
  { href: '/my-profile?viewer=colleague&user=f-nakamura', initials: 'FN', color: 'pink', name: 'F. Nakamura', title: 'PMO Lead · Delivery Ops' },
  { href: '/my-profile?viewer=colleague&user=j-park', initials: 'JP', color: 'green', name: 'J. Park', title: 'Senior PM · Process Owner' },
  { href: '/my-profile', initials: 'SF', color: 'navy-mid', name: 'S. Foster', title: 'PM · Gov Engagements' },
  { href: '/my-profile?viewer=colleague&user=m-kim', initials: 'MK', color: 'navy', name: 'M. Kim', title: 'PM · Strategy & Tech' },
]

export type TemplateIcon = 'file' | 'activity' | 'clipboard-check' | 'shield'

export const PM_TEMPLATES: { label: string; href: string; icon: TemplateIcon }[] = [
  { label: 'Scope of Work', href: '/templates', icon: 'file' },
  { label: 'Budget & Scope', href: '/templates', icon: 'activity' },
  { label: 'Project Closeout', href: '/templates', icon: 'clipboard-check' },
  { label: 'Monthly Status Report', href: '/templates', icon: 'file' },
  { label: 'Scope Change Request', href: '/templates', icon: 'shield' },
]

export const PMO_STATS = {
  liveProjects: 6,
  onTimeRate: '94%',
  lessonsLogged: 23,
}
