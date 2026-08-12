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
  iconKey: 'file' | 'play' | 'book-open'
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

/** Only "Innovation & AI" is fully authored in the mockup — the other two communities never got a detail page. */
export const COMMUNITY_DETAILS: Record<string, CommunityDetail> = {
  'innovation-ai': {
    slug: 'innovation-ai',
    name: 'Innovation & AI',
    iconKey: 'info',
    activityLabel: 'Active · 8 posts this week',
    description:
      "Emerging tech, responsible AI, and how JJR applies innovation in client work. This is where we explore what's next and test new approaches before they hit projects. If you work with AI tools — evaluating them, using them, governing them — this is your space.",
    memberCount: 24,
    postsPerWeek: 8,
    resourceCount: 12,
    steward: { initials: 'DL', background: 'linear-gradient(135deg,#0F2340,#2A4A78)', name: 'D. Laurent' },
    about: [
      {
        heading: 'Purpose',
        body: "Innovation & AI exists to make responsible AI practical at JJR. We review new tools before firm-wide adoption, curate a shared prompt library for procurement work, and maintain the AI Ethics Framework that governs every client-facing deliverable that uses AI.",
      },
      {
        heading: 'What this community does',
        body: "Monthly tool reviews (currently tracking Copilot, Claude Enterprise, and agentic workflows). Weekly async threads on prompt patterns. Quarterly Demo Day where members share what's working on live client work. Ethics reviews for AI-assisted deliverables that touch federal or regulated clients.",
      },
      {
        heading: 'Who this is for',
        body: "Any consultant who's using AI on client work — or curious about it. No technical background required. D. Laurent steward, S. Ahmed co-steward, M. Kim on governance, plus 21 active members across all four roles.",
      },
    ],
    members: [
      { href: '/my-profile?viewer=colleague&user=d-laurent', initials: 'DL', background: 'linear-gradient(135deg,#0F2340,#2A4A78)', name: 'D. Laurent', subtitle: 'AI Strategy', badge: { label: 'Steward', tone: 'pink' } },
      { href: '/my-profile?viewer=colleague&user=s-ahmed', initials: 'SA', background: 'linear-gradient(135deg,#3da312,#4CBB17)', name: 'S. Ahmed', subtitle: 'Data Science', badge: { label: 'Expert', tone: 'green' } },
      { href: '/my-profile?viewer=colleague&user=m-kim', initials: 'MK', background: 'linear-gradient(135deg,#1B365D,#2A4A78)', name: 'M. Kim', subtitle: 'AI Governance', badge: { label: 'Expert', tone: 'green' } },
      { href: '/my-profile', initials: 'SF', background: 'linear-gradient(135deg,#3da312,#4CBB17,#7de852)', name: 'Sarah Foster', subtitle: 'Consultant' },
      { href: '/my-profile?viewer=colleague&user=j-williams', initials: 'JW', background: 'linear-gradient(135deg,#8B1A6A,#E91E8C)', name: 'J. Williams', subtitle: 'Accessibility Lead' },
      { href: '/my-profile?viewer=colleague&user=f-nakamura', initials: 'FN', background: 'linear-gradient(135deg,#8B1A6A,#E91E8C)', name: 'F. Nakamura', subtitle: 'PMO Lead' },
    ],
    moreMembersCount: 18,
    resources: [
      {
        href: '/under-development?from=community-resource-ai-ethics-framework',
        title: 'AI Ethics Framework v2',
        meta: 'Updated 18 Mar · 22 pages · D. Laurent',
        badge: 'Document',
        iconKey: 'file',
        iconTone: 'muted',
      },
      {
        href: '/under-development?from=community-resource-copilot-demo',
        title: 'Copilot for Consultants — Live Demo',
        meta: 'Recorded 04 Mar · 28 min · S. Ahmed',
        badge: 'Video',
        iconKey: 'play',
        iconTone: 'pink',
      },
      {
        href: '/under-development?from=community-resource-responsible-ai-toolkit',
        title: 'Responsible AI Toolkit',
        meta: '28 prompts · 6 templates · S. Ahmed + M. Kim',
        badge: 'Toolkit',
        iconKey: 'book-open',
        iconTone: 'muted',
      },
      {
        href: '/under-development?from=community-resource-ai-governance-checklist',
        title: 'AI Governance Checklist — Client Deliverables',
        meta: 'Updated 12 Feb · Required for all AI-assisted work',
        badge: 'Checklist',
        iconKey: 'file',
        iconTone: 'muted',
      },
    ],
    discussions: [
      { title: 'Has anyone tested Copilot agents for client discovery?', meta: 'S. Ahmed · 3 replies · 2h ago · Viva Engage', href: '/under-development?from=community-discussion-copilot-agents' },
      { title: 'Prompt library for procurement analysis', meta: 'M. Kim · 7 replies · 1d ago · Viva Engage', href: '/under-development?from=community-discussion-prompt-library' },
      {
        title: 'AI governance checklist for proposals — draft for comment',
        meta: 'D. Laurent · 5 replies · 3d ago · Viva Engage',
        href: '/under-development?from=community-discussion-governance-checklist-draft',
      },
      { title: 'Claude Enterprise evaluation — who wants to pilot?', meta: 'D. Laurent · 11 replies · 5d ago · Viva Engage', href: '/under-development?from=community-discussion-claude-pilot' },
    ],
    events: [
      { day: '28', month: 'Apr', title: 'AI in Procurement — Live Demo', meta: '11:00 · Zoom · Hosted by S. Ahmed', href: '/under-development?from=community-event-ai-procurement-demo' },
      { day: '02', month: 'May', title: 'Copilot Agents — Quarterly Review', meta: '14:00 · Teams · Hosted by D. Laurent', href: '/under-development?from=community-event-copilot-quarterly' },
      { day: '15', month: 'May', title: 'Ethics Framework v3 — Open Comment', meta: 'Async · Viva Engage thread · All members', href: '/under-development?from=community-event-ethics-v3-open-comment' },
    ],
    keyFacts: [
      { label: 'Status', value: 'Active' },
      { label: 'Founded', value: 'Jan 2025' },
      { label: 'Steward', value: 'D. Laurent' },
      { label: 'Co-Steward', value: 'S. Ahmed' },
      { label: 'Cadence', value: 'Monthly' },
      { label: 'Channel', value: 'Viva Engage' },
    ],
    related: [
      { label: 'AI for Good →', href: '/ai-for-good' },
      { label: 'Copilot Guide →', href: '/tool-guides#copilot' },
      { label: 'AI News & Updates →', href: '/under-development?from=ai-news' },
    ],
  },
}
