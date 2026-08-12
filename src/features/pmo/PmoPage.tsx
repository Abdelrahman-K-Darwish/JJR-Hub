import { useState, type ReactNode } from 'react'
import { Link } from 'react-router'
import { AppShell } from '../../components/AppShell'
import {
  ActivityIcon,
  BellIcon,
  ChevronUpIcon,
  ClipboardCheckIcon,
  DateTile,
  FileIcon,
  HeroGrain,
  InfoIcon,
  ListPanel,
  RequestAccessPanel,
  RevealOnScroll,
  ShieldIcon,
  StatBlock,
  UsersIcon,
} from '../../components/ui'
import { CURRENT_USER, PROFILE_MENU_ITEMS } from '../../mocks/currentUser'
import type { AvatarColor } from '../../components/ui'
import {
  GOVERNANCE_DOCS,
  LESSONS,
  LIFECYCLE_STEPS,
  PMO_ANNOUNCEMENT,
  PMO_CONTACTS,
  PMO_STATS,
  PM_TEMPLATES,
  REVIEW_CALENDAR,
  type GovernanceIcon,
  type LessonTag,
  type TemplateIcon,
} from '../../mocks/pmo'

const GOVERNANCE_ICONS: Record<GovernanceIcon, ReactNode> = {
  shield: <ShieldIcon size={20} strokeWidth={1.4} />,
  activity: <ActivityIcon size={20} strokeWidth={1.4} />,
  info: <InfoIcon size={20} strokeWidth={1.4} />,
  users: <UsersIcon size={20} strokeWidth={1.4} />,
}

const TEMPLATE_ICONS: Record<TemplateIcon, ReactNode> = {
  file: <FileIcon size={11} strokeWidth={1.8} />,
  activity: <ActivityIcon size={11} strokeWidth={1.8} />,
  'clipboard-check': <ClipboardCheckIcon size={11} strokeWidth={1.8} />,
  shield: <ShieldIcon size={11} strokeWidth={1.8} />,
}

// Literal Tailwind class strings so the JIT scanner can find them (no template interpolation).
const CONTACT_COLOR_CLASSES: Record<AvatarColor, string> = {
  green: 'bg-green',
  navy: 'bg-navy',
  'navy-mid': 'bg-navy-mid',
  amber: 'bg-amber',
  pink: 'bg-pink',
}

const LESSON_TAG_META: Record<LessonTag, { label: string; icon: ReactNode; iconClass: string; badgeClass: string }> = {
  worked: {
    label: 'What Worked',
    icon: <ClipboardCheckIcon size={15} strokeWidth={1.8} />,
    iconClass: 'bg-green/[0.08] border-green/15 text-green',
    badgeClass: 'bg-green/[0.1] text-green-dark shadow-[0_0_8px_rgba(76,187,23,0.18)]',
  },
  challenge: {
    label: 'Challenge',
    icon: <InfoIcon size={15} strokeWidth={1.8} />,
    iconClass: 'bg-amber/[0.08] border-amber/15 text-amber',
    badgeClass: 'bg-amber/[0.1] text-[#A06B1A] shadow-[0_0_8px_rgba(232,168,56,0.18)]',
  },
  recommendation: {
    label: 'Recommendation',
    icon: <FileIcon size={15} strokeWidth={1.8} />,
    iconClass: 'bg-navy/[0.08] border-navy/10 text-navy',
    badgeClass: 'bg-navy/[0.08] text-navy shadow-[0_0_8px_rgba(27,54,93,0.12)]',
  },
}

export function PmoPage() {
  const [calendarOpen, setCalendarOpen] = useState(true)

  return (
    <AppShell
      user={CURRENT_USER}
      profileMenuItems={PROFILE_MENU_ITEMS}
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Project Management Office' }]}
      contextBarRight={
        <>
          <span className="font-mono text-[9px] text-text-inverse-muted tracking-wide">PMO Lead: F. Nakamura</span>
          <span className="text-text-inverse-muted text-[10px]" aria-hidden="true">
            /
          </span>
          <Link to="/start-here" className="font-mono text-[10px] text-green/60 hover:text-green transition-colors">
            Start Here →
          </Link>
        </>
      }
    >
      <RevealOnScroll className="mb-12">
        <div className="relative overflow-hidden bg-[linear-gradient(180deg,#17304f_0%,#0F2340_40%,#0b1c35_100%)] border-t border-t-white/[0.06] border-b border-b-black/30 shadow-[0_4px_16px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.04)]">
          <div
            aria-hidden="true"
            className="absolute w-[1600px] h-[400px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(76,187,23,0.10)_0%,rgba(76,187,23,0)_60%)] pointer-events-none z-0 blur-[30px] animate-breathe"
          />
          <HeroGrain />
          <div className="absolute top-6 right-8 w-16 h-16 border-r border-t border-white/[0.06] pointer-events-none" aria-hidden="true" />
          <div className="absolute top-8 right-10 w-16 h-16 border-r border-t border-white/[0.04] pointer-events-none" aria-hidden="true" />
          <div className="relative z-10 pl-11 pr-10 pt-9 pb-10 max-md:p-7 flex items-center justify-between max-md:flex-col max-md:items-start max-md:gap-6">
            <div>
              <div className="font-mono text-[10px] font-medium tracking-[2px] uppercase text-green mb-3 [text-shadow:0_0_8px_rgba(76,187,23,0.3)]">
                Project Management Office
              </div>
              <h1 className="font-display text-[2.65rem] max-md:text-[1.7rem] font-bold text-white leading-[1.02] tracking-[-0.022em] mb-5">
                How We Deliver.
              </h1>
              <p className="text-[14px] leading-[1.7] text-text-inverse-secondary max-w-[480px] mb-7">
                The PMO is JJR&rsquo;s delivery backbone — standardised processes, governance frameworks, and the
                tools that keep every engagement on track, on budget, and aligned to our values.
              </p>
              <div className="flex items-center gap-3 flex-wrap">
                <a
                  href="#governance"
                  className="font-body text-xs font-bold bg-green text-white px-5 py-2.5 inline-flex items-center gap-1.5 shadow-[0_0_24px_rgba(76,187,23,0.25),0_2px_8px_rgba(0,0,0,0.12)] transition-all duration-300 ease-smooth hover:bg-green-dark hover:-translate-y-px hover:shadow-[0_0_32px_rgba(76,187,23,0.45),0_2px_12px_rgba(0,0,0,0.2)]"
                >
                  View Process Flow →
                </a>
                <a
                  href="#lessons"
                  className="font-body text-xs font-semibold border border-text-inverse-muted text-text-inverse-secondary px-5 py-2.5 inline-flex items-center transition-all duration-200 hover:border-green hover:text-green"
                >
                  Submit Lessons Learned
                </a>
                <a
                  href="/how-we-work"
                  className="font-body text-xs font-semibold border border-text-inverse-muted text-text-inverse-secondary px-5 py-2.5 inline-flex items-center transition-all duration-200 hover:border-green hover:text-green"
                >
                  How We Work
                </a>
              </div>
            </div>
            <div className="flex gap-5 shrink-0">
              <StatBlock value={PMO_STATS.liveProjects} label="Live Projects" tone="muted" />
              <div className="w-px h-14 bg-white/[0.08] self-center" aria-hidden="true" />
              <StatBlock value={PMO_STATS.onTimeRate} label="On-Time Rate" tone="green" />
              <div className="w-px h-14 bg-white/[0.08] self-center" aria-hidden="true" />
              <StatBlock value={PMO_STATS.lessonsLogged} label="Lessons Logged" tone="muted" />
            </div>
          </div>
        </div>
      </RevealOnScroll>

      <div className="border border-pink/20 p-6 mb-12 flex items-start gap-4 relative overflow-hidden bg-[linear-gradient(135deg,#FFFBF9_0%,#FFF8F4_50%,#FFF5F0_100%)] shadow-[0_4px_16px_rgba(233,30,140,0.06)]">
        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-pink shadow-[0_0_10px_rgba(233,30,140,0.5)]" aria-hidden="true" />
        <div className="w-10 h-10 bg-pink/10 border border-pink/20 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(233,30,140,0.15)] text-pink">
          <BellIcon size={16} strokeWidth={1.8} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <div className="font-mono text-[9px] tracking-[1.5px] uppercase text-pink font-bold [text-shadow:0_0_8px_rgba(233,30,140,0.3)]">
              {PMO_ANNOUNCEMENT.kicker}
            </div>
            <div className="font-mono text-[9px] text-text-muted">{PMO_ANNOUNCEMENT.dateLabel}</div>
          </div>
          <div className="text-[13px] text-navy leading-[1.65]">
            <strong className="font-semibold">{PMO_ANNOUNCEMENT.headline}</strong> {PMO_ANNOUNCEMENT.body}
          </div>
        </div>
        <a
          href={PMO_ANNOUNCEMENT.ctaHref}
          className="font-body text-[11px] font-bold text-pink border border-pink/25 px-3 py-1.5 shrink-0 transition-all duration-200 hover:bg-pink hover:text-white hover:border-pink hover:shadow-[0_0_14px_rgba(233,30,140,0.35)] whitespace-nowrap"
        >
          {PMO_ANNOUNCEMENT.ctaLabel}
        </a>
      </div>

      <div id="governance" className="flex items-center gap-3 mb-5 font-mono text-[10px] font-medium tracking-[2px] uppercase text-text-muted scroll-mt-20">
        Project Lifecycle
        <span className="flex-1 h-px bg-rule" aria-hidden="true" />
        <span className="font-body text-[11px] font-normal tracking-normal normal-case whitespace-nowrap text-text-muted">
          JJR&rsquo;s standard delivery process
        </span>
      </div>

      <div className="bg-white border border-rule p-8 mb-14 overflow-x-auto">
        <div className="flex items-stretch gap-6 min-w-[900px]">
          {LIFECYCLE_STEPS.map((step) => (
            <div
              key={step.number}
              className={`relative bg-white flex-1 border p-5 text-center transition-all duration-300 ease-smooth hover:-translate-y-0.5 ${
                step.active
                  ? 'border-green shadow-[0_0_16px_rgba(76,187,23,0.15),0_4px_12px_rgba(27,54,93,0.06)]'
                  : 'border-rule hover:border-navy-mid hover:shadow-[0_8px_24px_rgba(27,54,93,0.08)]'
              }`}
            >
              <div
                className={`w-9 h-9 font-mono text-[11px] font-bold flex items-center justify-center mx-auto mb-3 ${
                  step.active ? 'bg-green text-white shadow-[0_0_12px_rgba(76,187,23,0.5),inset_0_1px_0_rgba(255,255,255,0.25)]' : 'bg-warm-gray text-text-muted'
                }`}
              >
                {step.number}
              </div>
              <div className="font-display text-[0.95rem] font-bold text-navy mb-1 tracking-tight">{step.title}</div>
              <div className="text-[11px] text-text-secondary leading-[1.6]">{step.description}</div>
              <div className="mt-3 pt-3 border-t border-rule-light flex flex-col gap-1">
                {step.links.map((link) => (
                  <a key={link.label} href={link.href} className="font-mono text-[10px] font-medium text-green-dark hover:text-green transition-colors">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-[1fr_340px] gap-8 max-lg:grid-cols-1">
        <div>
          <div className="flex items-center gap-3 mb-5 font-mono text-[10px] font-medium tracking-[2px] uppercase text-text-muted">
            Governance &amp; Best Practices
            <span className="flex-1 h-px bg-rule" aria-hidden="true" />
          </div>

          <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4 mb-14">
            {GOVERNANCE_DOCS.map((doc) => (
              <a
                key={doc.title}
                href={doc.href}
                className="bg-white border border-rule p-6 flex items-start gap-4 group transition-all duration-300 ease-smooth hover:border-navy-mid hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(27,54,93,0.10)]"
              >
                <div className="w-12 h-12 border border-rule flex items-center justify-center text-navy shrink-0 bg-off-white transition-all duration-300 group-hover:border-green group-hover:text-green">
                  {GOVERNANCE_ICONS[doc.icon]}
                </div>
                <div>
                  <div className="font-display text-[0.95rem] font-bold text-navy mb-1">{doc.title}</div>
                  <div className="text-[12px] text-text-secondary leading-relaxed">{doc.description}</div>
                </div>
              </a>
            ))}
          </div>

          <div id="lessons" className="flex items-center gap-3 mb-5 font-mono text-[10px] font-medium tracking-[2px] uppercase text-text-muted scroll-mt-20">
            Lessons Learned
            <span className="flex-1 h-px bg-rule" aria-hidden="true" />
            <span className="font-body text-[11px] font-normal tracking-normal normal-case whitespace-nowrap text-text-muted">
              From closed projects — feeding back into the hub
            </span>
          </div>

          <div className="mb-10">
            <div className="relative p-6 mb-5 flex items-center justify-between max-md:flex-col max-md:items-start max-md:gap-4 bg-[linear-gradient(180deg,#17304f_0%,#0F2340_45%,#0b1c35_100%)] border border-white/[0.04] border-t-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_8px_24px_rgba(0,0,0,0.20),0_2px_6px_rgba(0,0,0,0.12)]">
              <div>
                <div className="font-display text-[1.05rem] font-bold text-white mb-1 tracking-tight">Wrapping up a project?</div>
                <div className="text-[12.5px] text-text-inverse-secondary leading-[1.65]">
                  Every project closeout should deposit at least one reusable insight. What worked, what was hard,
                  what should the next team know?
                </div>
              </div>
              <a
                href="/under-development?from=submit-lessons-learned"
                className="font-body text-xs font-bold bg-green text-white px-5 py-2.5 inline-flex items-center gap-1.5 shrink-0 shadow-[0_0_24px_rgba(76,187,23,0.25),0_2px_8px_rgba(0,0,0,0.12)] transition-all duration-300 ease-smooth hover:bg-green-dark hover:-translate-y-px hover:shadow-[0_0_32px_rgba(76,187,23,0.45),0_2px_12px_rgba(0,0,0,0.2)]"
              >
                Submit Lessons Learned →
              </a>
            </div>

            <div className="flex flex-col gap-3">
              {LESSONS.map((lesson) => {
                const meta = LESSON_TAG_META[lesson.tag]
                return (
                  <div
                    key={lesson.title}
                    className="bg-white border border-rule p-5 transition-all duration-300 ease-smooth hover:border-navy-mid hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(27,54,93,0.10)]"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-9 h-9 border flex items-center justify-center shrink-0 mt-0.5 ${meta.iconClass}`}>{meta.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1 flex-wrap">
                          <div className="font-display text-[0.9rem] font-bold text-navy">{lesson.title}</div>
                          <span className={`font-mono text-[9px] px-2 py-0.5 tracking-wider uppercase ${meta.badgeClass}`}>{meta.label}</span>
                        </div>
                        <div className="text-[12.5px] text-text-secondary leading-relaxed mb-2">{lesson.description}</div>
                        <div className="flex items-center gap-4 text-[10px] text-text-muted font-mono flex-wrap">
                          <span>{lesson.author}</span>
                          <span>{lesson.dateLabel}</span>
                          <span>{lesson.tagsLabel}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <a href="/under-development?from=all-lessons-archive" className="mt-4 inline-flex items-center gap-2 text-[12px] font-bold text-green hover:underline">
              View all {PMO_STATS.lessonsLogged} lessons →
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-white border border-rule">
            <button
              type="button"
              onClick={() => setCalendarOpen((v) => !v)}
              aria-expanded={calendarOpen}
              className="w-full flex items-center justify-between px-5 py-4 border-b border-rule-light text-left"
            >
              <div>
                <div className="font-display text-[0.95rem] font-bold text-navy">Review Calendar</div>
                <div className="font-mono text-[9px] tracking-[1.5px] uppercase text-text-muted font-medium mt-0.5">Upcoming Reviews</div>
              </div>
              <ChevronUpIcon size={14} strokeWidth={1.8} className={`text-text-muted transition-transform duration-300 ${calendarOpen ? '' : 'rotate-180'}`} />
            </button>
            {calendarOpen && (
              <div className="p-5 flex flex-col gap-4">
                {REVIEW_CALENDAR.map((event) => (
                  <a key={event.title} href={event.href} className="flex items-start gap-3 group">
                    <DateTile day={event.day} month={event.month} />
                    <div className="flex-1 min-w-0">
                      <div className="text-[12px] font-semibold text-navy leading-snug group-hover:text-green transition-colors">{event.title}</div>
                      <div className="text-[10px] text-text-muted mt-0.5 font-mono">{event.meta}</div>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>

          <ListPanel title="PMO Team" eyebrow="Key Contacts" tone="dark">
            {PMO_CONTACTS.map((contact) => (
              <a key={contact.name} href={contact.href} className="flex items-center gap-3 group">
                <div
                  className={`w-9 h-9 text-[9px] font-bold text-white flex items-center justify-center shrink-0 ${CONTACT_COLOR_CLASSES[contact.color]}`}
                  aria-hidden="true"
                >
                  {contact.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] font-semibold text-white group-hover:text-green transition-colors">{contact.name}</div>
                  <div className="text-[10px] text-text-inverse-secondary font-mono mt-0.5">{contact.title}</div>
                </div>
              </a>
            ))}
          </ListPanel>

          <ListPanel title="PM Templates" eyebrow="Quick Access">
            {PM_TEMPLATES.map((tpl) => (
              <a key={tpl.label} href={tpl.href} className="flex items-center gap-2.5 px-2 py-2 hover:bg-off-white transition-all duration-200 text-[12px] font-medium text-navy hover:text-green">
                <span className="text-text-muted shrink-0">{TEMPLATE_ICONS[tpl.icon]}</span>
                {tpl.label}
              </a>
            ))}
          </ListPanel>

          <RequestAccessPanel
            title="Improve the PMO"
            description="See something that should be standardised, automated, or simplified? The PMO process is only as good as the feedback it gets."
            ctaLabel="Submit PMO feedback →"
            ctaHref="/under-development?from=pmo-feedback"
          />
        </div>
      </div>
    </AppShell>
  )
}
