import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { AppShell } from '../../components/AppShell'
import {
  Accordion,
  ActivityIcon,
  BookOpenIcon,
  CalendarIcon,
  FileIcon,
  FileTextIcon,
  HeroGrain,
  InfoIcon,
  ListPanel,
  MailIcon,
  RequestAccessPanel,
  RevealOnScroll,
  ShieldIcon,
  Timeline,
  TimelineItem,
  UserIcon,
  UsersIcon,
  ClockIcon,
  type AccordionEntry,
} from '../../components/ui'
import { CURRENT_USER, PROFILE_MENU_ITEMS } from '../../mocks/currentUser'
import {
  DELIVERY_STEPS,
  FAQS,
  PRINCIPLES,
  ROLE_MATRIX,
  SOPS,
  TOOLS,
  type PrincipleIcon,
  type StepOwnerTone,
  type ToolIcon,
} from '../../mocks/howWeWork'

const PRINCIPLE_ICONS: Record<PrincipleIcon, ReactNode> = {
  shield: <ShieldIcon size={18} strokeWidth={1.5} />,
  info: <InfoIcon size={18} strokeWidth={1.5} />,
  file: <FileIcon size={18} strokeWidth={1.5} />,
  users: <UsersIcon size={18} strokeWidth={1.5} />,
  activity: <ActivityIcon size={18} strokeWidth={1.5} />,
  'book-open': <BookOpenIcon size={18} strokeWidth={1.5} />,
}

const STEP_BADGE_CLASSES: Record<StepOwnerTone, string> = {
  green: 'bg-green shadow-[0_0_12px_rgba(76,187,23,0.5),inset_0_1px_0_rgba(255,255,255,0.2)]',
  navy: 'bg-navy shadow-[0_0_10px_rgba(27,54,93,0.35),inset_0_1px_0_rgba(255,255,255,0.12)]',
  amber: 'bg-amber shadow-[0_0_12px_rgba(232,168,56,0.5),inset_0_1px_0_rgba(255,255,255,0.2)]',
  'navy-mid': 'bg-navy-mid shadow-[0_0_10px_rgba(42,74,120,0.35),inset_0_1px_0_rgba(255,255,255,0.12)]',
}

const STEP_OWNER_CHIP_CLASSES: Record<StepOwnerTone, string> = {
  green: 'bg-green/[0.08] border-green/15 text-green',
  navy: 'bg-navy/[0.06] border-navy/10 text-navy',
  amber: 'bg-amber/[0.08] border-amber/15 text-amber',
  'navy-mid': 'bg-navy-mid/10 border-navy-mid/15 text-navy-mid',
}

const TOOL_ICONS: Record<ToolIcon, ReactNode> = {
  clock: <ClockIcon size={14} strokeWidth={1.8} />,
  calendar: <CalendarIcon size={14} strokeWidth={1.8} />,
  mail: <MailIcon size={14} strokeWidth={1.8} />,
  'file-text': <FileTextIcon size={14} strokeWidth={1.8} />,
  activity: <ActivityIcon size={14} strokeWidth={1.8} />,
}

const TOOL_TONE_CLASSES: Record<'green' | 'navy' | 'pink', string> = {
  green: 'bg-green/[0.08] border-green/15 text-green',
  navy: 'bg-navy/[0.06] border-navy/10 text-navy',
  pink: 'bg-pink/[0.06] border-pink/15 text-pink',
}

const faqEntries: AccordionEntry[] = FAQS.map((faq) => ({ id: faq.id, question: faq.question, answer: faq.answer }))

export function HowWeWorkPage() {
  return (
    <AppShell
      user={CURRENT_USER}
      profileMenuItems={PROFILE_MENU_ITEMS}
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'How We Work' }]}
      contextBarRight={
        <>
          <span className="font-mono text-[9px] text-text-inverse-muted tracking-wide">Last updated Q1 2026</span>
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
          <div className="relative z-10 pl-11 pr-10 pt-9 pb-10 max-md:p-7">
            <div className="font-mono text-[10px] font-medium tracking-[2px] uppercase text-green mb-3 [text-shadow:0_0_8px_rgba(76,187,23,0.3)]">
              How We Work
            </div>
            <h1 className="font-display text-[2.65rem] max-md:text-[1.7rem] font-bold text-white leading-[1.02] tracking-[-0.022em] mb-5">
              This Is How JJR
              <br />
              Gets Things Done.
            </h1>
            <p className="text-[14px] leading-[1.7] text-text-inverse-secondary max-w-[540px] mb-7">
              Not abstract principles on a poster. This is the real operating system — how we make decisions,
              deliver work, treat each other, and hold ourselves accountable. Updated quarterly. If it doesn&rsquo;t
              match reality, that&rsquo;s worth raising.
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              <a
                href="#principles"
                className="font-body text-xs font-bold bg-green text-white px-5 py-2.5 inline-flex items-center gap-1.5 shadow-[0_0_24px_rgba(76,187,23,0.25),0_2px_8px_rgba(0,0,0,0.12)] transition-all duration-300 ease-smooth hover:bg-green-dark hover:-translate-y-px hover:shadow-[0_0_32px_rgba(76,187,23,0.45),0_2px_12px_rgba(0,0,0,0.2)]"
              >
                Our Principles →
              </a>
              <a
                href="#faqs"
                className="font-body text-xs font-semibold border border-text-inverse-muted text-text-inverse-secondary px-5 py-2.5 inline-flex items-center transition-all duration-200 hover:border-green hover:text-green"
              >
                FAQs
              </a>
            </div>
          </div>
        </div>
      </RevealOnScroll>

      <div id="principles" className="flex items-center gap-3 mb-5 font-mono text-[10px] font-medium tracking-[2px] uppercase text-text-muted scroll-mt-20">
        Operating Principles
        <span className="flex-1 h-px bg-rule" aria-hidden="true" />
        <span className="font-body text-[11px] font-normal tracking-normal normal-case whitespace-nowrap text-text-muted">
          What good looks like at JJR
        </span>
      </div>

      <div className="grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-4 mb-14">
        {PRINCIPLES.map((p) => (
          <div
            key={p.number}
            className="bg-white border border-rule p-7 group relative overflow-hidden transition-all duration-[350ms] ease-smooth hover:border-navy-mid hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(27,54,93,0.10)]"
          >
            <div
              className={`absolute top-0 left-0 right-0 h-[2px] ${p.accent === 'green' ? 'bg-green shadow-[0_0_10px_rgba(76,187,23,0.45)]' : 'bg-navy-mid shadow-[0_0_10px_rgba(42,74,120,0.35)]'}`}
              aria-hidden="true"
            />
            <div
              className={`font-mono text-[48px] font-bold absolute top-3 right-5 leading-none select-none pointer-events-none transition-all duration-300 ${
                p.accent === 'green' ? 'text-green/[0.06] group-hover:text-green/[0.12]' : 'text-navy/[0.04] group-hover:text-navy/[0.08]'
              }`}
              aria-hidden="true"
            >
              {p.number}
            </div>
            <div className="relative z-10">
              <div className="w-10 h-10 border border-rule flex items-center justify-center text-navy mb-4 transition-all duration-300 group-hover:border-green group-hover:text-green">
                {PRINCIPLE_ICONS[p.icon]}
              </div>
              <div className="font-display text-[1.05rem] font-bold text-navy mb-2">{p.title}</div>
              <div className="text-[12.5px] text-text-secondary leading-relaxed">{p.description}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-[1fr_340px] gap-8 max-lg:grid-cols-1">
        <div>
          <div className="flex items-center gap-3 mb-5 font-mono text-[10px] font-medium tracking-[2px] uppercase text-text-muted">
            Delivery Process
            <span className="flex-1 h-px bg-rule" aria-hidden="true" />
          </div>

          <div className="bg-white border border-rule p-8 mb-14">
            <Timeline>
              {DELIVERY_STEPS.map((step, i) => (
                <TimelineItem
                  key={step.number}
                  isLast={i === DELIVERY_STEPS.length - 1}
                  title={step.title}
                  marker={
                    <span
                      className={`w-10 h-10 text-white font-mono text-[11px] font-bold flex items-center justify-center shrink-0 ${STEP_BADGE_CLASSES[step.badgeTone]}`}
                    >
                      {step.number}
                    </span>
                  }
                >
                  <p className="mb-3">{step.description}</p>
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-2">
                      <div className={`w-5 h-5 border flex items-center justify-center ${STEP_OWNER_CHIP_CLASSES[step.badgeTone]}`}>
                        {step.ownerIcon === 'user' ? <UserIcon size={10} strokeWidth={2} /> : <UsersIcon size={10} strokeWidth={2} />}
                      </div>
                      <span className="text-[10px] text-text-muted">{step.ownerLabel}</span>
                    </div>
                    {step.links.map((link) => (
                      <a key={link.label} href={link.href} className="font-mono text-[10px] font-medium text-green-dark hover:text-green transition-colors">
                        {link.label}
                      </a>
                    ))}
                  </div>
                </TimelineItem>
              ))}
            </Timeline>
          </div>

          <div className="flex items-center gap-3 mb-5 font-mono text-[10px] font-medium tracking-[2px] uppercase text-text-muted">
            Who Does What
            <span className="flex-1 h-px bg-rule" aria-hidden="true" />
          </div>

          <div className="bg-white border border-rule overflow-hidden mb-14 overflow-x-auto">
            <table className="w-full text-[12px] border-collapse min-w-[640px]">
              <thead>
                <tr className="bg-warm-gray/50">
                  <th className="p-4 text-left font-mono text-[9px] tracking-[1.5px] uppercase text-text-muted font-medium border-b border-rule-light" />
                  <th className="p-4 text-left font-mono text-[9px] tracking-[1.5px] uppercase text-text-muted font-medium border-b border-l border-rule-light">
                    Consultant
                  </th>
                  <th className="p-4 text-left font-mono text-[9px] tracking-[1.5px] uppercase text-text-muted font-medium border-b border-l border-rule-light">
                    Project Manager
                  </th>
                  <th className="p-4 text-left font-mono text-[9px] tracking-[1.5px] uppercase text-text-muted font-medium border-b border-l border-rule-light">
                    Leadership
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROLE_MATRIX.map((row, i) => {
                  const borderB = i < ROLE_MATRIX.length - 1 ? 'border-b border-rule-light' : ''
                  return (
                    <tr key={row.category}>
                      <th scope="row" className={`p-4 text-left font-semibold text-navy bg-off-white ${borderB}`}>
                        {row.category}
                      </th>
                      <td className={`p-4 text-text-secondary border-l border-rule-light ${borderB}`}>{row.consultant}</td>
                      <td className={`p-4 text-text-secondary border-l border-rule-light ${borderB}`}>{row.pm}</td>
                      <td className={`p-4 text-text-secondary border-l border-rule-light ${borderB}`}>{row.leadership}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <div id="faqs" className="flex items-center gap-3 mb-5 font-mono text-[10px] font-medium tracking-[2px] uppercase text-text-muted scroll-mt-20">
            Frequently Asked Questions
            <span className="flex-1 h-px bg-rule" aria-hidden="true" />
          </div>

          <Accordion items={faqEntries} defaultOpenId="assignment" className="mb-10" />
        </div>

        <div className="flex flex-col gap-6">
          <ListPanel title="Our Tools" eyebrow="Standard Stack">
            {TOOLS.map((tool) => (
              <a key={tool.name} href={tool.href} className="flex items-center gap-3 px-3 py-3 hover:bg-off-white transition-colors">
                <div className={`w-9 h-9 border flex items-center justify-center shrink-0 ${TOOL_TONE_CLASSES[tool.tone]}`}>{TOOL_ICONS[tool.icon]}</div>
                <div>
                  <div className="text-[12.5px] font-semibold text-navy">{tool.name}</div>
                  <div className="text-[10px] text-text-muted">{tool.description}</div>
                </div>
              </a>
            ))}
          </ListPanel>

          <ListPanel title="SOPs & Policies" eyebrow="Standard Procedures" tone="dark">
            {SOPS.map((sop) => (
              <a
                key={sop.label}
                href={sop.href}
                className="pl-2 flex items-center gap-2.5 py-2 text-[12px] font-medium text-text-inverse-secondary hover:text-green transition-all duration-200 hover:pl-3"
              >
                <FileIcon size={11} strokeWidth={1.8} className="text-text-inverse-muted shrink-0" />
                {sop.label}
              </a>
            ))}
          </ListPanel>

          <RequestAccessPanel
            title="This page is alive"
            description="If something here doesn't match how things actually work, say so. This page is updated quarterly and your input shapes it."
            ctaLabel="Suggest an update →"
            ctaHref="/under-development?from=suggest-an-update"
          />
        </div>
      </div>
    </AppShell>
  )
}
