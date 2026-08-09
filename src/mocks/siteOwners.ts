export interface SiteOwner {
  initials: string
  name: string
  title: string
  manages: string
  email: string
  avatarGradient: string
  contactLabel: string
  contactHref: string
  contactIcon?: 'mail'
}

/**
 * Stand-in for a future `GET /api/site-owners` — this is firm-wide directory content
 * (class A, no scoping), so the shape here is exactly what the page renders.
 */
export const SITE_OWNERS: SiteOwner[] = [
  {
    initials: 'AD',
    name: 'Abdel Darwish',
    title: 'Hub Design & Development',
    manages:
      'Hub architecture, design system, OLED luxury aesthetic, all page templates, accessibility standards, and cross-page links. First point of contact for anything broken visually or structurally.',
    email: 'abdel@jjrconsulting.com',
    avatarGradient: 'linear-gradient(135deg,#3da312,#4CBB17,#7de852)',
    contactLabel: 'Teams',
    contactHref: '/under-development?from=teams-connect',
    contactIcon: 'mail',
  },
  {
    initials: 'JR',
    name: 'Jenna Robinson',
    title: 'CEO & Strategic Content',
    manages:
      'Thought leadership library, Leadership Archive, firm vision & values, Exec & Strategy page, and all CEO-level content decisions. Approves new topic areas and priority shifts.',
    email: 'jenna@jjrconsulting.com',
    avatarGradient: 'linear-gradient(135deg,#8B1A6A,#E91E8C)',
    contactLabel: 'Teams',
    contactHref: '/under-development?from=teams-connect',
    contactIcon: 'mail',
  },
  {
    initials: 'PM',
    name: 'PMO Lead',
    title: 'Projects, Templates & PMO',
    manages:
      'Active Projects list, Templates library, PMO page, Lessons Learned archive, and delivery governance standards. Owns the project lifecycle across Scope → Plan → Execute → Monitor → Close.',
    email: 'pmo@jjrconsulting.com',
    avatarGradient: 'linear-gradient(135deg,#0F2340,#2A4A78)',
    contactLabel: 'Teams',
    contactHref: '/under-development?from=teams-connect',
    contactIcon: 'mail',
  },
  {
    initials: 'IT',
    name: 'IT Administration',
    title: 'SharePoint & Integrations',
    manages:
      'SharePoint permissions, SPFx web parts, Microsoft Form creation, Power Automate flows, Stream video URLs, and every external tool URL (QuickBooks Time, Planner, Teams, Power BI).',
    email: 'it@jjrconsulting.com',
    avatarGradient: 'linear-gradient(135deg,#2A4A78,#1e3a63)',
    contactLabel: 'Teams',
    contactHref: '/under-development?from=teams-connect',
    contactIcon: 'mail',
  },
  {
    initials: 'HR',
    name: 'HR & People Ops',
    title: 'Onboarding & Compliance',
    manages:
      'Start Here onboarding checklist, Consultant Directory, Compliance Hub (certifications, renewals), consultant profile data (W9, resume, expertise), and onboarding buddy assignments.',
    email: 'hr@jjrconsulting.com',
    avatarGradient: 'linear-gradient(135deg,#8B6914,#E8A838)',
    contactLabel: 'Teams',
    contactHref: '/under-development?from=teams-connect',
    contactIcon: 'mail',
  },
  {
    initials: 'CP',
    name: 'Community Stewards',
    title: 'Communities of Practice',
    manages:
      'Each Community of Practice has a named steward (D. Laurent for Innovation & AI, R. Thompson for Equity & Impact, F. Nakamura for Project Craft). Stewards curate resources, moderate discussions, and host events.',
    email: 'communities@jjrconsulting.com',
    avatarGradient: 'linear-gradient(135deg,#1a3a1a,#2D7D00)',
    contactLabel: 'View CoPs →',
    contactHref: '/communities',
  },
]
