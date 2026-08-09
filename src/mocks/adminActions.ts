export type PriorityKey = 'info' | 'reminder' | 'urgent' | 'overdue'

export interface PriorityOption {
  key: PriorityKey
  label: string
  description: string
}

export const PRIORITY_OPTIONS: PriorityOption[] = [
  { key: 'info', label: 'Info', description: 'FYI. Soft, dismissible. Slim height.' },
  { key: 'reminder', label: 'Reminder', description: 'Gentle nudge with countdown. Dismissible.' },
  { key: 'urgent', label: 'Urgent', description: 'Animated strip. Taller. Not dismissible.' },
  { key: 'overdue', label: 'Overdue', description: 'Pulsing border. Most prominent. Auto-promotes.' },
]

export const PRIORITY_KICKERS: Record<PriorityKey, string> = {
  info: 'Heads up',
  reminder: 'Reminder',
  urgent: 'Action Needed',
  overdue: 'Overdue',
}

export interface ActionFormValues {
  title: string
  body: string
  ctaLabel: string
  ctaUrl: string
  dueDate: string
  startDate: string
  endDate: string
  audience: string
  dismissible: 'true' | 'false'
}

export const DEFAULT_FORM_VALUES: ActionFormValues = {
  title: 'Q1 review submissions due April 5.',
  body: 'Submit your Q1 self-review and project recap in Workday before EOD Friday.',
  ctaLabel: 'Open Workday',
  ctaUrl: '/under-development?from=workday',
  dueDate: '2026-04-05',
  startDate: '2026-03-29',
  endDate: '2026-04-06',
  audience: 'All consultants',
  dismissible: 'true',
}

export const AUDIENCE_OPTIONS = ['All consultants', 'Consultants only', 'Leadership team', 'Specific people…']

export type ActionRowStatus = 'active' | 'scheduled' | 'expired'
export type RowAction = 'edit' | 'duplicate' | 'end' | 'cancel' | 'audit'

export interface ExistingAction {
  priority: PriorityKey
  title: string
  dueLabel: string
  audience: string
  status: ActionRowStatus
  statusLabel: string
  rowActions: RowAction[]
}

export const EXISTING_ACTIONS: ExistingAction[] = [
  {
    priority: 'urgent',
    title: 'Month-end hours due March 31.',
    dueLabel: 'Mar 31',
    audience: 'All',
    status: 'active',
    statusLabel: 'Active',
    rowActions: ['edit', 'duplicate', 'end'],
  },
  {
    priority: 'reminder',
    title: 'Q1 review submissions due April 5.',
    dueLabel: 'Apr 5',
    audience: 'Consultants',
    status: 'scheduled',
    statusLabel: 'Scheduled',
    rowActions: ['edit', 'duplicate', 'cancel'],
  },
  {
    priority: 'info',
    title: 'New brand guidelines published.',
    dueLabel: '—',
    audience: 'All',
    status: 'expired',
    statusLabel: 'Expired Mar 14',
    rowActions: ['audit', 'duplicate'],
  },
]

export const BEHAVIOUR_SUMMARY = [
  'Single-bar v1 — only the highest-priority active action shows.',
  'Dismissed actions reappear if priority is escalated to Urgent or Overdue.',
  'Icons are auto-derived from priority (no per-action icon picker).',
  'CTA destinations validated server-side (allow-list of internal & whitelisted external).',
  'Caret menu adds Snooze 1 hour / Mark as done / Not relevant to me.',
]
