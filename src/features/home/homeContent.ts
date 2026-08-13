/**
 * Home's own local, feature-owned static content — plain constants only, no functions
 * simulating a fetch, no Promises. Kept out of `HomePage.tsx` per CLAUDE.md §5, the same
 * discipline already applied to every other converted page's mock data.
 *
 * All placeholder destinations use the existing `/under-development?from=...` convention
 * already established across the app (see e.g. `src/mocks/toolGuides.ts`, `src/mocks/pmo.ts`).
 */

export interface HomeQuickLink {
  label: string
  href: string
}

/**
 * My Stuff — Log Hours / My Tasks / My Calendar only. Reporting is deliberately omitted:
 * per docs/specs/home.md its owner/reviewer is an OPEN decision (v0.3 doc's own open-items
 * log), so it's deferred entirely rather than rendered as a placeholder link.
 */
export const MY_STUFF_LINKS: HomeQuickLink[] = [
  { label: 'Log Hours', href: '/under-development?from=quickbooks-time' },
  { label: 'My Tasks', href: '/under-development?from=microsoft-planner' },
  { label: 'My Calendar', href: '/under-development?from=outlook-calendar-event' },
]

export const CONSULTANT_DIRECTORY_LINK: HomeQuickLink = {
  label: 'Consultant Directory',
  href: '/consultant-directory',
}

export interface HomeContentCard {
  title: string
  description: string
  href: string
}

export const JJR_MATERIAL: HomeContentCard[] = [
  { title: 'Firm Overview Deck', description: 'The current firm-wide capabilities deck, kept current by Marketing.', href: '/under-development?from=jjr-material-firm-overview' },
  { title: 'Brand Guidelines', description: 'Logo usage, color palette, and template standards.', href: '/under-development?from=brand-guidelines' },
  { title: 'Proposal Boilerplate', description: 'Standard proposal language and past-performance blurbs.', href: '/under-development?from=jjr-material-proposal-boilerplate' },
]

export interface HomeSpotlightCard extends HomeContentCard {
  /** Static editorial content-type label shown in the card body (legacy `.k-card__type`), e.g. "Template". */
  category: string
  /** Static badge — legitimate first-class content, not a computed "days since" value. */
  badge?: 'Updated' | 'New'
  meta: string
}

/**
 * Mirrors `legacy/jjr-hub-tw.html`'s three Knowledge Spotlight `.k-card` entries exactly
 * (Project Kickoff Deck / Onboarding — New Consultant Orientation / How to Use Planner):
 * a template, a guide, and a video-type card, each with its own accent and badge.
 */
export const KNOWLEDGE_SPOTLIGHT: HomeSpotlightCard[] = [
  {
    title: 'Project Kickoff Deck — 2026 Edition',
    description: 'Standard deck for all new client onboardings. Brand guidelines applied.',
    href: '/under-development?from=project-kickoff-deck-2026',
    category: 'Template',
    badge: 'Updated',
    meta: 'J. Williams · 142 downloads',
  },
  {
    title: 'Onboarding — New Consultant Orientation',
    description: 'Video walkthroughs, setup guides, and first-week checklists for new members.',
    href: '/under-development?from=onboarding-orientation',
    category: 'Guide',
    meta: 'R. Thompson · 89 views',
  },
  {
    title: 'How to Use Planner — Step by Step',
    description: 'Walkthrough on managing tasks, deadlines, and boards in Microsoft Planner.',
    href: '/under-development?from=planner-walkthrough',
    category: 'Video',
    badge: 'New',
    meta: 'S. Ahmed · 57 plays',
  },
]

export interface HomeThoughtLeadershipEntry extends HomeContentCard {
  kicker: string
}

export const THOUGHT_LEADERSHIP: HomeThoughtLeadershipEntry[] = [
  {
    kicker: 'From JJR Leadership',
    title: 'Where Equity Meets Infrastructure',
    description: "Jenna's latest piece on embedding EJ screening into capital planning, and why it can't be a bolt-on step.",
    href: '/under-development?from=thought-leadership-equity-infrastructure',
  },
  {
    kicker: 'From JJR Leadership',
    title: 'AI, Responsibly',
    description: "Jenna's framework for evaluating AI vendors against JJR's ethics standards, built from this year's procurement reviews.",
    href: '/under-development?from=thought-leadership-ai-responsibly',
  },
  {
    kicker: 'From JJR Leadership',
    title: 'Advancing the Work of JJR',
    description: 'Strategic direction, firm-wide updates, and thought leadership — straight from Jenna.',
    href: '/under-development?from=thought-leadership-advancing-the-work',
  },
  {
    kicker: 'From JJR Leadership',
    title: 'Government Consulting, Reframed',
    description: "Jenna's comprehensive look at where government consulting is heading and how JJR is positioning for leadership.",
    href: '/under-development?from=thought-leadership-government-consulting-reframed',
  },
]

export const KNOWLEDGE_LINKS: HomeContentCard[] = [
  { title: 'Templates Library', description: 'Proposal, SOW, and deliverable templates.', href: '/templates' },
  { title: 'How We Work', description: 'Firm-wide tools, SOPs, and working norms.', href: '/how-we-work' },
  { title: 'Tool Guides', description: 'Walkthroughs for QuickBooks, Planner, Teams, and more.', href: '/tool-guides' },
]

export interface HomeTopicLink {
  label: string
  href: string
  /** Static curated tag shown above the title, e.g. "Jedi Cab". */
  tag: string
  description: string
}

export const TOPICS: HomeTopicLink[] = [
  {
    label: 'Leadership Cabinet',
    tag: 'Jedi Cab',
    href: '/jedi-cab',
    description: "Active topics, cohort applications, development tracks, and alumni resources for JJR's leadership pipeline.",
  },
  {
    label: 'EJ Practice Area',
    tag: 'Environmental Justice',
    href: '/environmental-justice',
    description: 'Toolkits, community frameworks, and impact measurement for environmental justice work.',
  },
  {
    label: 'Responsible AI',
    tag: 'AI for Good',
    href: '/ai-for-good',
    description: 'Guidelines, use-case library, and ethical frameworks for responsible client engagements.',
  },
  {
    label: 'Vision, Values & Roadmap',
    tag: 'JJR Values',
    href: '/vision-values',
    description: 'Strategic direction, core values in action, and the firm-wide roadmap for 2026.',
  },
]

/**
 * Client Hub — STUB, not STUB/LOCKED (docs/specs/home.md "Client Hub classification").
 * No backing source exists yet (no SharePoint library or App DB client-record adapter),
 * so this is an integration gap, not an access gap — CLAUDE.md §6 forbids the inverse framing
 * (presenting an integration gap as an authorization gap) just as much as the usual one.
 */
export const CLIENT_HUB_LABEL = 'Client Hub'
export const CLIENT_HUB_STATUS_COPY = 'Not yet connected — this integration is still being built.'
