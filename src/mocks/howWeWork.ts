export type PrincipleIcon = 'shield' | 'info' | 'file' | 'users' | 'activity' | 'book-open'
export type AccentTone = 'green' | 'navy'

export interface Principle {
  number: string
  icon: PrincipleIcon
  title: string
  description: string
  accent: AccentTone
}

export const PRINCIPLES: Principle[] = [
  {
    number: '01',
    icon: 'shield',
    title: 'Equity First, Always',
    description:
      'Every decision — from who gets access to how we scope work — passes through an equity lens. No exceptions, no shortcuts. We document the reasoning and revisit quarterly.',
    accent: 'green',
  },
  {
    number: '02',
    icon: 'info',
    title: 'Transparent by Default',
    description: "Information is shared unless there's a documented reason not to. No hidden rules about access. If you can't find something, the system failed — not you.",
    accent: 'green',
  },
  {
    number: '03',
    icon: 'file',
    title: 'One Source of Truth',
    description: "Every document lives in one place. Every template has one version. If you find a duplicate, flag it. Trust in the system depends on this discipline.",
    accent: 'green',
  },
  {
    number: '04',
    icon: 'users',
    title: 'Decisions Have Owners',
    description: 'Every project, page, and process has a named person accountable. Not a committee, not a role — a person. You always know who to ask.',
    accent: 'navy',
  },
  {
    number: '05',
    icon: 'activity',
    title: 'Measure What Matters',
    description: "We track utilisation, on-time delivery, and consultant satisfaction — not vanity metrics. Dashboards are open to everyone. Numbers don't hide.",
    accent: 'navy',
  },
  {
    number: '06',
    icon: 'book-open',
    title: 'Learn and Deposit',
    description: "Every project closeout deposits at least one reusable insight back into the hub. Knowledge hoarding is the only thing we don't tolerate.",
    accent: 'navy',
  },
]

export type StepOwnerTone = 'green' | 'navy' | 'amber' | 'navy-mid'

export interface DeliveryStep {
  number: number
  badgeTone: StepOwnerTone
  title: string
  description: string
  ownerIcon: 'user' | 'users'
  ownerLabel: string
  links: { label: string; href: string }[]
}

export const DELIVERY_STEPS: DeliveryStep[] = [
  {
    number: 1,
    badgeTone: 'green',
    title: 'Project Initiation',
    description:
      'SOW signed, workspace created in SharePoint, team assigned via Planner, kickoff meeting scheduled. PM creates the project charter and risk register.',
    ownerIcon: 'user',
    ownerLabel: 'PM owns',
    links: [
      { label: 'SOW Template →', href: '/templates' },
      { label: 'Kickoff Deck →', href: '/templates' },
    ],
  },
  {
    number: 2,
    badgeTone: 'navy',
    title: 'Planning & Scoping',
    description:
      'Work plan built with milestones, budget baseline locked, deliverables defined. Team roles confirmed. Stakeholder map and communication cadence established.',
    ownerIcon: 'user',
    ownerLabel: 'PM + Lead',
    links: [
      { label: 'Budget Template →', href: '/templates' },
      { label: 'Risk Playbook →', href: '/pmo' },
    ],
  },
  {
    number: 3,
    badgeTone: 'navy',
    title: 'Execution & Delivery',
    description:
      'Deliverables produced against the work plan. Weekly status reports to the client. Hours logged in QuickBooks Time. Scope changes go through the formal change request process.',
    ownerIcon: 'users',
    ownerLabel: 'Full team',
    links: [
      { label: 'Status Report →', href: '/templates' },
      { label: 'Change Request →', href: '/templates' },
    ],
  },
  {
    number: 4,
    badgeTone: 'amber',
    title: 'Quality Check & Review',
    description: 'PMO reviews financials against budget. Deliverables go through QA. Client sign-off secured. Any scope deviations documented and reconciled.',
    ownerIcon: 'user',
    ownerLabel: 'PMO + PM',
    links: [
      { label: 'QA Checklist →', href: '/pmo' },
      { label: 'Governance →', href: '/pmo' },
    ],
  },
  {
    number: 5,
    badgeTone: 'navy-mid',
    title: 'Closeout & Knowledge Deposit',
    description: 'Knowledge transfer completed. Lessons learned deposited to relevant CoP. Final invoice sent. Workspace archived. Team expertise profiles updated.',
    ownerIcon: 'user',
    ownerLabel: 'PM owns',
    links: [
      { label: 'Closeout Checklist →', href: '/templates' },
      { label: 'Submit Lessons →', href: '/pmo#lessons' },
    ],
  },
]

export interface RoleMatrixRow {
  category: string
  consultant: string
  pm: string
  leadership: string
}

export const ROLE_MATRIX: RoleMatrixRow[] = [
  {
    category: 'Hours',
    consultant: 'Log daily in QuickBooks Time',
    pm: 'Review team hours weekly',
    leadership: 'Monitor utilisation rates',
  },
  {
    category: 'Deliverables',
    consultant: 'Produce assigned work products',
    pm: 'QA review, manage scope, client delivery',
    leadership: 'Final sign-off on key outputs',
  },
  {
    category: 'Budget',
    consultant: 'Stay within allocated hours',
    pm: 'Track budget vs. actual, flag variances',
    leadership: 'Approve budget changes over threshold',
  },
  {
    category: 'Knowledge',
    consultant: 'Deposit artifacts to CoP at closeout',
    pm: 'Submit lessons learned form',
    leadership: 'Curate strategy-level insights',
  },
  {
    category: 'Escalation',
    consultant: 'Flag blockers to PM immediately',
    pm: 'Escalate to PMO within 24h if unresolved',
    leadership: 'Final decision authority on scope/budget',
  },
]

export const FAQS = [
  {
    id: 'assignment',
    question: 'How do I get assigned to a project?',
    answer:
      'Project assignments are managed by the PMO in coordination with service line leads. When a new engagement starts, the PM identifies required roles and the PMO matches available consultants based on skills, capacity, and development goals. If you want to be considered for a specific type of work, update your consultant profile with your expertise areas and let your service line steward know.',
  },
  {
    id: 'over-budget',
    question: 'What happens if a project goes over budget?',
    answer:
      "The PM flags the variance to the PMO as soon as it's identified — not after it's happened. Variances under 10% are managed at the PM level with documentation. Anything over 10% requires PMO review and leadership approval. The Budget & Scope template includes a built-in variance tracker.",
  },
  {
    id: 'hours-frequency',
    question: 'How often should I log hours?',
    answer:
      "Daily. Log your hours in QuickBooks Time at the end of each working day. This isn't bureaucracy — it's how we track project health, invoice clients accurately, and ensure no one is overloaded. Monthly submissions are due on the last business day of each month.",
  },
  {
    id: 'find-resource',
    question: "Who do I ask if I can't find a template or resource?",
    answer:
      "First, use the Hub search bar — it searches across all pages and document libraries. If you still can't find it, check the Templates page or your service line's Community of Practice. Still stuck? Ask the PMO team directly — they'll either point you to it or create it.",
  },
  {
    id: 'equity-centered',
    question: 'What does "equity-centered consulting" mean in practice?',
    answer:
      "It means we ask \"who benefits and who's left out?\" at every stage of an engagement. From how we structure RFP responses to how we collect community data to how we present findings — equity isn't a separate workstream, it's embedded in the process. The Equity & Impact CoP maintains the toolkits and frameworks.",
  },
  {
    id: 'escalate',
    question: 'How do I escalate a problem on a project?',
    answer:
      "Tell your PM first — always. If it's not resolved within 24 hours, the PM escalates to the PMO. If it involves client relationship issues or budget overruns exceeding 10%, leadership gets involved. The Governance Framework document has the full escalation matrix with timelines.",
  },
]

export type ToolIcon = 'clock' | 'calendar' | 'mail' | 'file-text' | 'activity'
export type ToolTone = 'green' | 'navy' | 'pink'

export interface ToolLink {
  name: string
  description: string
  href: string
  icon: ToolIcon
  tone: ToolTone
}

export const TOOLS: ToolLink[] = [
  { name: 'QuickBooks Time', description: 'Hour logging & timesheets', href: '/under-development?from=quickbooks-time', icon: 'clock', tone: 'green' },
  { name: 'Microsoft Planner', description: 'Tasks & project boards', href: '/under-development?from=microsoft-planner', icon: 'calendar', tone: 'navy' },
  { name: 'Microsoft Teams', description: 'Chat, meetings, channels', href: '/under-development?from=microsoft-teams', icon: 'mail', tone: 'navy' },
  { name: 'SharePoint', description: 'Document libraries & sites', href: '/under-development?from=sharepoint', icon: 'file-text', tone: 'navy' },
  { name: 'Power BI', description: 'Dashboards & analytics', href: '/under-development?from=power-bi', icon: 'activity', tone: 'pink' },
]

export const SOPS = [
  { label: 'Project Setup SOP', href: '/under-development?from=project-setup-sop' },
  { label: 'Client Communication SOP', href: '/under-development?from=client-communication-sop' },
  { label: 'Data Handling Policy', href: '/under-development?from=data-handling-policy' },
  { label: 'Expense Reimbursement SOP', href: '/under-development?from=expense-reimbursement-sop' },
  { label: 'Conflict of Interest Policy', href: '/under-development?from=conflict-of-interest-policy' },
  { label: 'Quality Assurance SOP', href: '/under-development?from=quality-assurance-sop' },
]
