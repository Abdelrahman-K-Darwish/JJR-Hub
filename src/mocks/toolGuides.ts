export type GuideIconKey = 'clock' | 'calendar' | 'mail' | 'file-text' | 'activity' | 'user' | 'frame'

export interface MostUsedGuide {
  id: string
  service: string
  serviceColorClass: string
  title: string
  description: string
  gradient: string
  durationLabel: string
  badge?: { label: string; tone: 'pink' | 'green' }
  fullGuideHref: string
  secondaryLabel: string
  secondaryHref: string
}

export const MOST_USED_GUIDES: MostUsedGuide[] = [
  {
    id: 'quickbooks',
    service: 'QuickBooks Time',
    serviceColorClass: 'text-green',
    title: 'How to Log Your Hours',
    description:
      'Step-by-step: open the app, select your project, enter billable and non-billable hours, and submit. Takes 2 minutes a day.',
    gradient: 'linear-gradient(135deg,#2D7D00,#4CBB17)',
    durationLabel: 'Video · 3 min',
    badge: { label: 'Most Used', tone: 'pink' },
    fullGuideHref: '/under-development?from=quickbooks-time-full-guide',
    secondaryLabel: 'Advanced Settings',
    secondaryHref: '/under-development?from=quickbooks-advanced-settings',
  },
  {
    id: 'planner',
    service: 'Microsoft Planner',
    serviceColorClass: 'text-navy-mid',
    title: 'Managing Tasks & Boards',
    description: 'Create tasks, set deadlines, assign team members, and track progress using boards, charts, and schedule views.',
    gradient: 'linear-gradient(135deg,#0F2340,#2A4A78)',
    durationLabel: 'Video · 5 min',
    badge: { label: 'Popular', tone: 'green' },
    fullGuideHref: '/under-development?from=microsoft-planner-full-guide',
    secondaryLabel: 'Integrations',
    secondaryHref: '/under-development?from=planner-integrations',
  },
  {
    id: 'teams',
    service: 'Microsoft Teams',
    serviceColorClass: 'text-navy',
    title: 'Channels, Chats & Meetings',
    description: 'How JJR uses Teams: project channels, direct messages, scheduling meetings, and sharing files within conversations.',
    gradient: 'linear-gradient(135deg,#1B365D,#17304f)',
    durationLabel: 'Video · 4 min',
    fullGuideHref: '/under-development?from=microsoft-teams-full-guide',
    secondaryLabel: 'Tips & Shortcuts',
    secondaryHref: '/under-development?from=teams-tips-shortcuts',
  },
]

export interface GuideRow {
  id: string
  title: string
  description: string
  gradient: string
  icon: GuideIconKey
  keywords: string
  badge?: { label: string; tone: 'green' | 'pink' }
  readHref: string
  videoHref?: string
  videoDurationLabel?: string
  tertiaryLabel: string
  tertiaryHref: string
}

export const GUIDE_ROWS: GuideRow[] = [
  {
    id: 'quickbooks-time',
    title: 'QuickBooks Time — Hour Logging',
    description: 'How to log billable and non-billable hours, correct mistakes, submit timesheets, and set up mobile access for on-the-go logging.',
    gradient: 'linear-gradient(135deg,#2D7D00,#4CBB17)',
    icon: 'clock',
    keywords: 'quickbooks time hours log timesheet billable',
    badge: { label: 'Essential', tone: 'green' },
    readHref: '/under-development?from=quickbooks-time-guide',
    videoHref: '/under-development?from=quickbooks-time-video',
    videoDurationLabel: 'Watch Video (3 min)',
    tertiaryLabel: 'Advanced →',
    tertiaryHref: '/under-development?from=quickbooks-time-advanced',
  },
  {
    id: 'planner',
    title: 'Microsoft Planner — Task Management',
    description: 'Creating boards, assigning tasks, setting due dates, using labels, tracking progress with charts, and connecting Planner to Teams channels.',
    gradient: 'linear-gradient(135deg,#0F2340,#2A4A78)',
    icon: 'calendar',
    keywords: 'planner tasks board kanban deadlines assignments project management',
    badge: { label: 'Essential', tone: 'green' },
    readHref: '/under-development?from=microsoft-planner-guide',
    videoHref: '/under-development?from=microsoft-planner-video',
    videoDurationLabel: 'Watch Video (5 min)',
    tertiaryLabel: 'Power Automate →',
    tertiaryHref: '/under-development?from=power-automate',
  },
  {
    id: 'teams',
    title: 'Microsoft Teams — Communication',
    description: 'Project channels vs. direct chat, scheduling meetings, screen sharing, recording sessions, and file sharing within conversations.',
    gradient: 'linear-gradient(135deg,#1B365D,#17304f)',
    icon: 'mail',
    keywords: 'teams chat meetings channels video call schedule',
    readHref: '/under-development?from=microsoft-teams-guide',
    videoHref: '/under-development?from=microsoft-teams-video',
    videoDurationLabel: 'Watch Video (4 min)',
    tertiaryLabel: 'Shortcuts →',
    tertiaryHref: '/under-development?from=teams-shortcuts',
  },
  {
    id: 'sharepoint',
    title: 'SharePoint — Document Management',
    description: 'Navigating the Hub, uploading files, using document libraries, version history, metadata tagging, and sharing permissions.',
    gradient: 'linear-gradient(135deg,#2A4A78,#1B365D)',
    icon: 'file-text',
    keywords: 'sharepoint sites documents libraries files upload hub pages',
    readHref: '/under-development?from=sharepoint-guide',
    videoHref: '/under-development?from=sharepoint-video',
    videoDurationLabel: 'Watch Video (6 min)',
    tertiaryLabel: 'Admin Guide →',
    tertiaryHref: '/under-development?from=sharepoint-admin-guide',
  },
  {
    id: 'power-bi',
    title: 'Power BI — Dashboards & Analytics',
    description: 'Accessing project dashboards, reading KPI charts, filtering data, exporting reports, and understanding the metrics that matter.',
    gradient: 'linear-gradient(135deg,#8B1A6A,#E91E8C)',
    icon: 'activity',
    keywords: 'power bi dashboard analytics reports data visualisation charts',
    readHref: '/under-development?from=power-bi-guide',
    videoHref: '/under-development?from=power-bi-video',
    videoDurationLabel: 'Watch Video (4 min)',
    tertiaryLabel: 'Custom Reports →',
    tertiaryHref: '/under-development?from=power-bi-custom-reports',
  },
  {
    id: 'outlook',
    title: 'Outlook — Email & Calendar',
    description: 'Setting up your JJR email signature, managing calendar invites, shared calendars for project teams, and out-of-office protocols.',
    gradient: 'linear-gradient(135deg,#3D2B00,#8B6914)',
    icon: 'calendar',
    keywords: 'outlook email calendar scheduling invites signature',
    readHref: '/under-development?from=outlook-guide',
    tertiaryLabel: 'Signature Template →',
    tertiaryHref: '/under-development?from=signature-template',
  },
  {
    id: 'onedrive',
    title: 'OneDrive — Personal File Storage',
    description: 'Syncing files to your desktop, organising personal documents, sharing links vs. granting access, and storage limits.',
    gradient: 'linear-gradient(135deg,#1a3a1a,#2D7D00)',
    icon: 'user',
    keywords: 'onedrive files sync backup personal storage cloud',
    readHref: '/under-development?from=onedrive-guide',
    tertiaryLabel: 'Sync Setup →',
    tertiaryHref: '/under-development?from=sync-setup',
  },
  {
    id: 'copilot',
    title: 'Microsoft Copilot — AI Assistant',
    description: "Using Copilot in Teams, Word, and the Hub. How to ask good questions, what it can and can't do, and JJR's responsible AI guidelines.",
    gradient: 'linear-gradient(135deg,#4a1a3a,#8B1A6A)',
    icon: 'frame',
    keywords: 'copilot ai assistant search questions help smart',
    badge: { label: 'New', tone: 'pink' },
    readHref: '/under-development?from=copilot-guide',
    videoHref: '/under-development?from=copilot-video',
    videoDurationLabel: 'Watch Video (5 min)',
    tertiaryLabel: 'AI Ethics →',
    tertiaryHref: '/under-development?from=ai-ethics',
  },
]

export interface QuickAnswer {
  question: string
  answer: string
  href: string
}

export const QUICK_ANSWERS: QuickAnswer[] = [
  { question: 'Where do I log my hours?', answer: 'QuickBooks Time → Log Hours tab', href: '/under-development?from=quick-answer' },
  { question: 'How do I find my project files?', answer: 'SharePoint → Your project site → Documents', href: '/under-development?from=quick-answer' },
  { question: 'How do I schedule a meeting?', answer: 'Teams → Calendar → New Meeting', href: '/under-development?from=quick-answer' },
  { question: 'How do I update my tasks?', answer: 'Planner → My Tasks → Click to update', href: '/under-development?from=quick-answer' },
  { question: 'Where are the templates?', answer: 'Templates page → Browse or search', href: '/templates' },
]

export interface VideoLibraryItem {
  title: string
  meta: string
  href: string
  featured?: boolean
}

export const VIDEO_LIBRARY: VideoLibraryItem[] = [
  { title: 'Hour Logging Walkthrough', meta: '3 min · QuickBooks', href: '/under-development?from=video-hour-logging', featured: true },
  { title: 'Planner Board Setup', meta: '5 min · Planner', href: '/under-development?from=video-planner-setup' },
  { title: 'Teams Channels Explained', meta: '4 min · Teams', href: '/under-development?from=video-teams-channels' },
  { title: 'SharePoint for Beginners', meta: '6 min · SharePoint', href: '/under-development?from=video-sharepoint-basics' },
  { title: 'Copilot — Getting Started', meta: '5 min · AI', href: '/under-development?from=video-copilot-intro' },
]
