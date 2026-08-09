import { useState, type ReactNode } from 'react'
import { BareLayout } from '../../components/BareLayout'
import {
  AlertTriangleIcon,
  BellIcon,
  CheckIcon,
  ChevronDownIcon,
  ClockIcon,
  CloseIcon,
  CopyIcon,
  EditIcon,
  FormField,
  InfoIcon,
  StatusPill,
  CONTROL_CLASSES,
  type StatusTone,
} from '../../components/ui'
import {
  AUDIENCE_OPTIONS,
  BEHAVIOUR_SUMMARY,
  DEFAULT_FORM_VALUES,
  EXISTING_ACTIONS,
  PRIORITY_KICKERS,
  PRIORITY_OPTIONS,
  type ActionRowStatus,
  type PriorityKey,
  type RowAction,
} from '../../mocks/adminActions'

const PRIORITY_ICONS: Record<PriorityKey, ReactNode> = {
  info: <InfoIcon size={13} strokeWidth={1.8} />,
  reminder: <ClockIcon size={13} strokeWidth={1.8} />,
  urgent: <BellIcon size={15} strokeWidth={1.8} />,
  overdue: <AlertTriangleIcon size={16} strokeWidth={2} />,
}

const PRIORITY_TONE: Record<PriorityKey, StatusTone> = {
  info: 'navy',
  reminder: 'green',
  urgent: 'pink',
  overdue: 'red',
}

const PRIORITY_CARD_CLASSES: Record<PriorityKey, { selected: string; icon: string; name: string }> = {
  info: {
    selected: 'border-navy-mid bg-[linear-gradient(135deg,#F8FAFC,#F4F7FB)] shadow-[0_0_0_3px_rgba(42,74,120,0.18)]',
    icon: 'bg-navy-mid/10 text-navy-mid',
    name: 'text-navy-mid',
  },
  reminder: {
    selected: 'border-green bg-[linear-gradient(135deg,#F8FCF4,#F2FAEC)] shadow-[0_0_0_3px_rgba(76,187,23,0.20)]',
    icon: 'bg-green/[0.12] text-green-dark',
    name: 'text-green-dark',
  },
  urgent: {
    selected: 'border-pink bg-[linear-gradient(135deg,#FFFBF9,#FFF6F0)] shadow-[0_0_0_3px_rgba(233,30,140,0.18)]',
    icon: 'bg-pink/10 text-pink',
    name: 'text-pink',
  },
  overdue: {
    selected: 'border-[#dc2626] bg-[linear-gradient(135deg,#FFF6F4,#FFEBE6)] shadow-[0_0_0_3px_rgba(220,38,38,0.20)]',
    icon: 'bg-[#dc2626]/10 text-[#dc2626]',
    name: 'text-[#dc2626]',
  },
}

const PREVIEW_BANNER_CLASSES: Record<PriorityKey, { wrap: string; strip: string; iconCell: string; icon: string; kicker: string; due: string; cta: string }> = {
  info: {
    wrap: 'bg-[linear-gradient(135deg,#F8FAFC_0%,#F4F7FB_100%)] border border-navy-mid/[0.12]',
    strip: 'bg-navy-mid',
    iconCell: 'border-navy-mid/10',
    icon: 'bg-navy-mid/10 text-navy-mid',
    kicker: 'text-navy-mid',
    due: 'bg-navy-mid/[0.06] text-navy-mid',
    cta: 'bg-navy',
  },
  reminder: {
    wrap: 'bg-[linear-gradient(135deg,#F8FCF4_0%,#F2FAEC_100%)] border border-green/20',
    strip: 'bg-green',
    iconCell: 'border-green/[0.14]',
    icon: 'bg-green/[0.12] text-green-dark',
    kicker: 'text-green-dark',
    due: 'bg-green/[0.08] text-green-dark',
    cta: 'bg-green',
  },
  urgent: {
    wrap: 'bg-[linear-gradient(135deg,#FFFBF9_0%,#FFF6F0_50%,#FFF2EC_100%)] border border-pink/[0.18] shadow-[0_1px_4px_rgba(233,30,140,0.06)]',
    strip: 'bg-pink',
    iconCell: 'border-pink/[0.14]',
    icon: 'bg-pink/10 text-pink',
    kicker: 'text-pink',
    due: 'bg-pink/[0.08] text-pink font-semibold',
    cta: 'bg-navy',
  },
  overdue: {
    wrap: 'bg-[linear-gradient(135deg,#FFF6F4_0%,#FFEBE6_100%)] border border-[#dc2626]/[0.32]',
    strip: 'bg-[#dc2626]',
    iconCell: 'border-[#dc2626]/[0.14]',
    icon: 'bg-[#dc2626]/10 text-[#dc2626]',
    kicker: 'text-[#dc2626] font-extrabold',
    due: 'bg-[#dc2626] text-white font-bold',
    cta: 'bg-navy',
  },
}

const ROW_STATUS_TONE: Record<ActionRowStatus, StatusTone> = { active: 'green', scheduled: 'amber', expired: 'muted' }

const ROW_ACTION_META: Record<RowAction, { label: string; icon: ReactNode; danger?: boolean }> = {
  edit: { label: 'Edit', icon: <EditIcon size={13} strokeWidth={1.8} /> },
  duplicate: { label: 'Duplicate', icon: <CopyIcon size={13} strokeWidth={1.8} /> },
  end: { label: 'End now', icon: <CloseIcon size={13} strokeWidth={1.8} />, danger: true },
  cancel: { label: 'Cancel', icon: <CloseIcon size={13} strokeWidth={1.8} />, danger: true },
  audit: { label: 'View audit', icon: <ClockIcon size={13} strokeWidth={1.8} /> },
}

function formatDue(iso: string) {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  return `Due ${d.toLocaleString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' })}`
}

export function AdminActionsPage() {
  const [priority, setPriority] = useState<PriorityKey>('reminder')
  const [values, setValues] = useState(DEFAULT_FORM_VALUES)

  const dismissibleLocked = priority === 'urgent' || priority === 'overdue'
  const dismissible = dismissibleLocked ? 'false' : values.dismissible

  const preview = PREVIEW_BANNER_CLASSES[priority]

  return (
    <BareLayout section="Hub Actions" user={{ name: 'Jenna Williams', initials: 'JW' }} backHref="/">
      <div className="mb-10 flex items-end justify-between max-md:flex-col max-md:items-start max-md:gap-4">
        <div>
          <div className="font-mono text-[10px] font-medium tracking-[2.5px] uppercase text-text-muted mb-2.5 flex items-center gap-3">
            <span className="w-5 h-px bg-green" aria-hidden="true" />
            Admin · Communications
          </div>
          <h1 className="font-display text-[2.4rem] font-bold text-navy tracking-[-0.025em] leading-[1.05]">Hub Actions</h1>
          <p className="text-[14px] text-text-secondary mt-3 max-w-[640px] leading-[1.65]">
            Create, schedule, and edit the priority action banners that appear at the top of the JJR Hub. Every
            published banner is logged and reversible.
          </p>
        </div>
        <div className="font-mono text-[10px] tracking-[1px] uppercase text-text-muted">Stub · Frontend mock</div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-7 max-lg:col-span-12 space-y-6">
          <div className="bg-white border border-rule rounded-[12px] p-7">
            <div className="font-display text-[1.15rem] font-bold text-navy mb-1 tracking-tight">New Action</div>
            <div className="text-[12.5px] text-text-secondary mb-6">All fields support markdown-safe text only. URLs are validated server-side.</div>

            <label className="block font-mono text-[9.5px] font-semibold tracking-[1.6px] uppercase text-text-secondary mb-2">Priority</label>
            <div className="grid grid-cols-4 max-md:grid-cols-2 gap-2.5 mb-6">
              {PRIORITY_OPTIONS.map((option) => {
                const isSelected = priority === option.key
                const classes = PRIORITY_CARD_CLASSES[option.key]
                return (
                  <button
                    key={option.key}
                    type="button"
                    onClick={() => setPriority(option.key)}
                    aria-pressed={isSelected}
                    className={`text-left cursor-pointer p-3.5 rounded-[8px] border-[1.5px] bg-white transition-all duration-200 ease-smooth hover:border-navy-mid ${
                      isSelected ? classes.selected : 'border-rule'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <span className={`w-[26px] h-[26px] rounded-[6px] flex items-center justify-center ${classes.icon}`}>{PRIORITY_ICONS[option.key]}</span>
                      <span className={`font-mono text-[10px] font-bold tracking-[1.5px] uppercase ${classes.name}`}>{option.label}</span>
                    </div>
                    <div className="text-[11.5px] text-text-secondary leading-[1.5]">{option.description}</div>
                  </button>
                )
              })}
            </div>

            <div className="grid grid-cols-1 gap-5">
              <FormField label="Title" htmlFor="fTitle" hint={<>Bold lead-in. Max 10 words. Example: <em>&ldquo;Month-end hours due March 31.&rdquo;</em></>}>
                <input
                  id="fTitle"
                  type="text"
                  maxLength={80}
                  value={values.title}
                  onChange={(e) => setValues((v) => ({ ...v, title: e.target.value }))}
                  placeholder="Bold lead-in (max 10 words)"
                  className={CONTROL_CLASSES}
                />
              </FormField>

              <FormField label="Body" htmlFor="fBody" hint="One sentence. Max 220 chars. The body explains the action; the title states it.">
                <textarea
                  id="fBody"
                  maxLength={220}
                  value={values.body}
                  onChange={(e) => setValues((v) => ({ ...v, body: e.target.value }))}
                  placeholder="One sentence of context (max 140 chars)"
                  className={`${CONTROL_CLASSES} resize-y min-h-[88px] leading-[1.55]`}
                />
              </FormField>

              <div className="grid grid-cols-2 gap-5">
                <FormField label="CTA Label" htmlFor="fCtaLabel">
                  <input
                    id="fCtaLabel"
                    type="text"
                    maxLength={32}
                    value={values.ctaLabel}
                    onChange={(e) => setValues((v) => ({ ...v, ctaLabel: e.target.value }))}
                    className={CONTROL_CLASSES}
                  />
                </FormField>
                <FormField label="CTA URL" htmlFor="fCtaUrl">
                  <input
                    id="fCtaUrl"
                    type="url"
                    placeholder="https://..."
                    value={values.ctaUrl}
                    onChange={(e) => setValues((v) => ({ ...v, ctaUrl: e.target.value }))}
                    className={CONTROL_CLASSES}
                  />
                </FormField>
              </div>

              <div className="grid grid-cols-3 max-md:grid-cols-1 gap-5">
                <FormField label="Due Date" htmlFor="fDue">
                  <input
                    id="fDue"
                    type="date"
                    value={values.dueDate}
                    onChange={(e) => setValues((v) => ({ ...v, dueDate: e.target.value }))}
                    className={CONTROL_CLASSES}
                  />
                </FormField>
                <FormField label="Start Date" htmlFor="fStart">
                  <input
                    id="fStart"
                    type="date"
                    value={values.startDate}
                    onChange={(e) => setValues((v) => ({ ...v, startDate: e.target.value }))}
                    className={CONTROL_CLASSES}
                  />
                </FormField>
                <FormField label="End Date" htmlFor="fEnd">
                  <input
                    id="fEnd"
                    type="date"
                    value={values.endDate}
                    onChange={(e) => setValues((v) => ({ ...v, endDate: e.target.value }))}
                    className={CONTROL_CLASSES}
                  />
                </FormField>
              </div>

              <div className="grid grid-cols-2 max-md:grid-cols-1 gap-5">
                <FormField label="Audience" htmlFor="fAudience">
                  <select
                    id="fAudience"
                    value={values.audience}
                    onChange={(e) => setValues((v) => ({ ...v, audience: e.target.value }))}
                    className={CONTROL_CLASSES}
                  >
                    {AUDIENCE_OPTIONS.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </FormField>
                <FormField label="Dismissible" htmlFor="fDismissible" hint={dismissibleLocked ? 'Auto-set to "No" for Urgent & Overdue.' : undefined}>
                  <select
                    id="fDismissible"
                    value={dismissible}
                    disabled={dismissibleLocked}
                    onChange={(e) => setValues((v) => ({ ...v, dismissible: e.target.value as 'true' | 'false' }))}
                    className={`${CONTROL_CLASSES} disabled:opacity-60 disabled:cursor-not-allowed`}
                  >
                    <option value="true">Yes — users can hide it</option>
                    <option value="false">No — must be acted on</option>
                  </select>
                </FormField>
              </div>
            </div>
          </div>

          <div className="bg-white border border-rule rounded-[12px] p-5 flex items-center justify-between max-md:flex-col max-md:items-start max-md:gap-3">
            <div className="text-[12px] text-text-secondary">
              <strong className="text-navy">Editing as Jenna Williams.</strong> Every change is logged with timestamp and author.
            </div>
            <div className="flex items-center gap-2.5">
              <button type="button" className="inline-flex items-center gap-2 h-[42px] px-[22px] text-[13.5px] font-semibold rounded-[8px] border border-rule bg-white text-navy transition-all duration-[240ms] ease-smooth hover:border-navy-mid hover:bg-off-white hover:-translate-y-px">
                Save draft
              </button>
              <div className="relative inline-flex">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 h-[42px] pl-[22px] pr-3.5 text-[13.5px] font-semibold rounded-l-[8px] bg-green text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_1px_2px_rgba(76,187,23,0.18)] transition-all duration-[240ms] ease-smooth hover:bg-green-dark hover:-translate-y-px hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_6px_18px_rgba(76,187,23,0.36)]"
                >
                  Publish now
                  <CheckIcon size={13} strokeWidth={2} />
                </button>
                <button
                  type="button"
                  aria-label="More publish options"
                  className="inline-flex items-center justify-center h-[42px] px-3 rounded-r-[8px] bg-green text-white border-l border-white/[0.18] transition-all duration-[240ms] ease-smooth hover:bg-green-dark"
                >
                  <ChevronDownIcon size={11} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-5 max-lg:col-span-12">
          <div className="sticky top-[88px] space-y-5">
            <div className="bg-white border border-rule rounded-[12px] p-8">
              <div className="font-mono text-[9.5px] font-semibold tracking-[2px] uppercase text-text-muted mb-4 flex items-center gap-2.5">
                <span className="flex-1 h-px bg-rule-light" aria-hidden="true" />
                Live Preview · As users will see it
                <span className="flex-1 h-px bg-rule-light" aria-hidden="true" />
              </div>

              <div className={`relative flex overflow-hidden rounded-[10px] ${preview.wrap}`}>
                <div className={`w-1 shrink-0 self-stretch ${preview.strip}`} aria-hidden="true" />
                <div className={`flex items-center gap-2.5 px-[18px] shrink-0 border-r ${preview.iconCell}`}>
                  <span className={`w-[30px] h-[30px] shrink-0 flex items-center justify-center rounded-[8px] ${preview.icon}`}>
                    {PRIORITY_ICONS[priority]}
                  </span>
                  <span className={`font-mono text-[9.5px] font-bold tracking-[1.6px] uppercase whitespace-nowrap ${preview.kicker}`}>
                    {PRIORITY_KICKERS[priority]}
                  </span>
                </div>
                <div className="flex-1 py-3.5 px-[22px] flex items-center gap-[18px] min-w-0 flex-wrap">
                  <div className="flex-1 text-[13px] text-text-secondary leading-[1.55] min-w-0">
                    <strong className="text-navy font-bold">{values.title || 'Title placeholder'}</strong>{' '}
                    {values.body || 'Body context placeholder.'}
                  </div>
                  {formatDue(values.dueDate) && (
                    <span className={`font-mono text-[10px] tracking-[0.5px] whitespace-nowrap px-2.5 py-[5px] rounded-[6px] ${preview.due}`}>
                      {formatDue(values.dueDate)}
                    </span>
                  )}
                  <span className={`h-9 px-4 rounded-[8px] text-[12.5px] font-semibold text-white inline-flex items-center gap-2 whitespace-nowrap shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_1px_2px_rgba(15,35,64,0.18)] ${preview.cta}`}>
                    {values.ctaLabel || 'Take action'} →
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-rule rounded-[12px] p-6">
              <div className="font-mono text-[9.5px] font-bold tracking-[2px] uppercase text-text-muted mb-3">Behaviour summary</div>
              <ul className="text-[12.5px] text-text-secondary space-y-2 leading-[1.65]">
                {BEHAVIOUR_SUMMARY.map((line) => (
                  <li key={line}>· {line}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <div className="flex items-end justify-between mb-4 max-md:flex-col max-md:items-start max-md:gap-3">
          <div>
            <h2 className="font-display text-[1.4rem] font-bold text-navy tracking-tight">Active &amp; Scheduled</h2>
            <p className="text-[12.5px] text-text-secondary mt-1">All actions ever created, with status and audit trail.</p>
          </div>
          <div className="flex items-center gap-2">
            {['All', 'Active', 'Scheduled', 'Expired'].map((label) => (
              <button
                key={label}
                type="button"
                className="h-9 px-3.5 text-[12px] font-semibold rounded-[8px] border border-rule bg-white text-navy transition-all duration-[240ms] ease-smooth hover:border-navy-mid hover:bg-off-white"
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white border border-rule rounded-[12px] overflow-hidden overflow-x-auto">
          <div className="grid grid-cols-[120px_1fr_110px_110px_130px_120px] gap-4 items-center px-4 py-[11px] bg-warm-gray border-b border-rule font-mono text-[9.5px] font-semibold tracking-[1.4px] uppercase text-text-secondary min-w-[760px]">
            <div>Priority</div>
            <div>Title</div>
            <div>Due</div>
            <div>Audience</div>
            <div>Status</div>
            <div className="text-right">Actions</div>
          </div>
          {EXISTING_ACTIONS.map((action, i) => (
            <div
              key={action.title}
              className={`grid grid-cols-[120px_1fr_110px_110px_130px_120px] gap-4 items-center px-4 py-3.5 min-w-[760px] text-[12.5px] transition-colors duration-[180ms] hover:bg-off-white ${
                i < EXISTING_ACTIONS.length - 1 ? 'border-b border-rule-light' : ''
              }`}
            >
              <div>
                <StatusPill tone={PRIORITY_TONE[action.priority]}>{PRIORITY_KICKERS[action.priority]}</StatusPill>
              </div>
              <div className="font-medium text-navy">{action.title}</div>
              <div className={`font-mono text-[11px] ${action.dueLabel === '—' ? 'text-text-muted' : 'text-text-secondary'}`}>{action.dueLabel}</div>
              <div className="text-text-secondary">{action.audience}</div>
              <div>
                <StatusPill tone={ROW_STATUS_TONE[action.status]}>{action.statusLabel}</StatusPill>
              </div>
              <div className="flex items-center gap-1.5 justify-end">
                {action.rowActions.map((rowAction) => {
                  const meta = ROW_ACTION_META[rowAction]
                  return (
                    <button
                      key={rowAction}
                      type="button"
                      title={meta.label}
                      aria-label={meta.label}
                      className={`w-[30px] h-[30px] rounded-[6px] inline-flex items-center justify-center border border-rule bg-white text-text-secondary transition-all duration-200 ease-smooth hover:border-navy-mid hover:text-navy ${
                        meta.danger ? 'hover:!border-[#dc2626] hover:!text-[#dc2626] hover:bg-[#dc2626]/[0.04]' : ''
                      }`}
                    >
                      {meta.icon}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </BareLayout>
  )
}
