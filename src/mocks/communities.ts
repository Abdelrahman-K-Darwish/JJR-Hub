import type { CommunitySummary, UpcomingEvent, YourCommunityRow } from '../features/communities/communities.types'

/**
 * Stand-in for `GET /api/communities` — a real response omits `recentDiscussions` entirely
 * for communities the viewer hasn't joined (class C, D14). Here that's modelled by `isMember`;
 * the page only reads `recentDiscussions` when `isMember` is true, same as the API contract.
 */
export const COMMUNITIES: CommunitySummary[] = [
  {
    slug: 'innovation-ai',
    name: 'Innovation & AI',
    icon: 'info',
    description:
      "Emerging tech, responsible AI, and how JJR applies innovation in client work. This is where we explore what's next and test new approaches before they hit projects.",
    memberCount: 24,
    postsThisWeek: 8,
    resourceCount: 12,
    steward: 'D. Laurent',
    isMember: true,
    topResources: [
      { label: 'AI Ethics Framework', href: '/under-development?from=community-resource', icon: 'file' },
      { label: 'Copilot for Consultants (Video)', href: '/under-development?from=community-resource', icon: 'play' },
      { label: 'Responsible AI Toolkit', href: '/under-development?from=community-resource', icon: 'book-open' },
    ],
    recentDiscussions: [
      { title: 'Has anyone tested Copilot agents for client discovery?', meta: 'S. Ahmed · 3 replies · 2h ago', href: '/communities/innovation-ai' },
      { title: 'Prompt library for procurement analysis', meta: 'M. Kim · 7 replies · 1d ago', href: '/communities/innovation-ai' },
      { title: 'AI governance checklist for proposals', meta: 'D. Laurent · 5 replies · 3d ago', href: '/communities/innovation-ai' },
    ],
    keyExperts: [
      { href: '/my-profile?viewer=colleague&user=d-laurent', initials: 'DL', background: '#2A4A78', name: 'D. Laurent', role: 'AI Strategy · Steward' },
      { href: '/my-profile?viewer=colleague&user=s-ahmed', initials: 'SA', background: '#4CBB17', name: 'S. Ahmed', role: 'Data Science · Lead' },
      { href: '/my-profile?viewer=colleague&user=m-kim', initials: 'MK', background: '#1B365D', name: 'M. Kim', role: 'Machine Learning' },
    ],
  },
  {
    slug: 'equity-impact',
    name: 'Equity & Impact',
    icon: 'globe',
    description:
      "Environmental justice, accessibility, and equity-centered consulting. We develop toolkits, share frameworks, and hold each other accountable to JJR's values in every engagement.",
    memberCount: 31,
    postsThisWeek: 5,
    resourceCount: 18,
    steward: 'R. Thompson',
    isMember: false,
    topResources: [
      { label: 'EJ Community Assessment Guide', href: '/under-development?from=community-resource', icon: 'file' },
      { label: 'Equity Impact Scorecard', href: '/under-development?from=community-resource', icon: 'file' },
      { label: 'Inclusive Procurement (Video)', href: '/under-development?from=community-resource', icon: 'play' },
    ],
    recentDiscussions: [],
    keyExperts: [
      { href: '/my-profile?viewer=colleague&user=r-thompson', initials: 'RT', background: '#E91E8C', name: 'R. Thompson', role: 'EJ Policy · Steward' },
      { href: '/my-profile?viewer=colleague&user=j-williams', initials: 'JW', background: '#1B365D', name: 'J. Williams', role: 'Accessibility' },
      { href: '/my-profile?viewer=colleague&user=l-rivera', initials: 'LR', background: '#E8A838', name: 'L. Rivera', role: 'Community Engagement' },
    ],
  },
  {
    slug: 'project-craft',
    name: 'Project Craft',
    icon: 'bar-chart',
    description: 'Best practices in project management, delivery frameworks, and client engagement. Where PMs and leads sharpen their craft together.',
    memberCount: 19,
    postsThisWeek: 3,
    resourceCount: 9,
    steward: 'F. Nakamura',
    isMember: true,
    topResources: [
      { label: 'Project Closeout Checklist', href: '/under-development?from=community-resource', icon: 'file' },
      { label: 'Scope Change Request Template', href: '/under-development?from=community-resource', icon: 'file' },
      { label: 'Agile at JJR — Walkthrough', href: '/under-development?from=community-resource', icon: 'play' },
    ],
    recentDiscussions: [
      { title: 'Lessons from the NovaTech delivery sprint', meta: 'F. Nakamura · 4 replies · 8h ago', href: '/communities/project-craft' },
      { title: 'When to escalate vs. absorb scope creep', meta: 'J. Park · 9 replies · 2d ago', href: '/communities/project-craft' },
      { title: 'Stakeholder mapping for gov clients', meta: 'S. Foster · 2 replies · 5d ago', href: '/communities/project-craft' },
    ],
    keyExperts: [
      { href: '/my-profile?viewer=colleague&user=f-nakamura', initials: 'FN', background: '#E91E8C', name: 'F. Nakamura', role: 'Agile PM · Steward' },
      { href: '/my-profile?viewer=colleague&user=j-park', initials: 'JP', background: '#4CBB17', name: 'J. Park', role: 'Delivery Operations' },
      { href: '/my-profile', initials: 'SF', background: '#1B365D', name: 'S. Foster', role: 'Gov Engagement' },
    ],
  },
]

export const UPCOMING_EVENTS: UpcomingEvent[] = [
  { day: '28', month: 'Mar', title: 'AI in Procurement — Live Demo', meta: 'Innovation & AI · 11:00 · Zoom', href: '/under-development?from=community-event' },
  { day: '02', month: 'Apr', title: 'EJ Screening Tools Workshop', meta: 'Equity & Impact · 14:00 · Room 3A', href: '/under-development?from=community-event' },
  { day: '09', month: 'Apr', title: 'PM Retrospective — Q1 Projects', meta: 'Project Craft · 10:00 · Teams', href: '/under-development?from=community-event' },
  { day: '15', month: 'Apr', title: 'Inclusive Design for Federal RFPs', meta: 'Equity & Impact · 13:00 · Zoom', href: '/under-development?from=community-event' },
]

export const YOUR_COMMUNITIES: YourCommunityRow[] = [
  { slug: 'innovation-ai', name: 'Innovation & AI', joined: true },
  { slug: 'project-craft', name: 'Project Craft', joined: true },
  { slug: 'equity-impact', name: 'Equity & Impact', joined: false },
]

export const TOTAL_MEMBER_COUNT = 74
