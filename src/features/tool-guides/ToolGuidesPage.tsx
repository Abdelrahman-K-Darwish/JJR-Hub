import { useMemo, useState, type ReactNode } from 'react'
import { AppShell } from '../../components/AppShell'
import {
  ActivityIcon,
  CalendarIcon,
  FileTextIcon,
  FrameIcon,
  HeroGrain,
  ListPanel,
  MailIcon,
  PlayIcon,
  RequestAccessPanel,
  RevealOnScroll,
  UserIcon,
  ClockIcon,
} from '../../components/ui'
import { CURRENT_USER, PROFILE_MENU_ITEMS } from '../../mocks/currentUser'
import { GUIDE_ROWS, MOST_USED_GUIDES, QUICK_ANSWERS, VIDEO_LIBRARY, type GuideIconKey } from '../../mocks/toolGuides'

const ICONS: Record<GuideIconKey, ReactNode> = {
  clock: <ClockIcon size={22} strokeWidth={1.3} className="text-white" />,
  calendar: <CalendarIcon size={22} strokeWidth={1.3} className="text-white" />,
  mail: <MailIcon size={22} strokeWidth={1.3} className="text-white" />,
  'file-text': <FileTextIcon size={22} strokeWidth={1.3} className="text-white" />,
  activity: <ActivityIcon size={22} strokeWidth={1.3} className="text-white" />,
  user: <UserIcon size={22} strokeWidth={1.3} className="text-white" />,
  frame: <FrameIcon size={22} strokeWidth={1.3} className="text-white" />,
}

const BADGE_CLASSES: Record<'green' | 'pink', string> = {
  green: 'bg-green/[0.1] text-green-dark shadow-[0_0_8px_rgba(76,187,23,0.22)]',
  pink: 'bg-pink/[0.1] text-pink shadow-[0_0_8px_rgba(233,30,140,0.22)]',
}

const QUICK_TERMS = ['log hours', 'planner', 'sharepoint', 'teams']

export function ToolGuidesPage() {
  const [query, setQuery] = useState('')

  const filteredGuides = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return GUIDE_ROWS
    return GUIDE_ROWS.filter(
      (guide) => guide.keywords.includes(q) || guide.title.toLowerCase().includes(q) || guide.description.toLowerCase().includes(q),
    )
  }, [query])

  return (
    <AppShell
      user={CURRENT_USER}
      profileMenuItems={PROFILE_MENU_ITEMS}
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Tool Guides' }]}
      contextBarRight={
        <>
          <span className="font-mono text-[9px] text-text-inverse-muted tracking-wide">{GUIDE_ROWS.length} guides available</span>
          <span className="text-text-inverse-muted text-[10px]" aria-hidden="true">
            /
          </span>
          <a href="/start-here" className="font-mono text-[10px] text-green/60 hover:text-green transition-colors">
            Start Here →
          </a>
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
          <div className="relative z-10 pl-11 pr-10 pt-9 pb-10 max-md:p-7 flex items-center justify-between gap-10 max-md:flex-col max-md:gap-6">
            <div>
              <div className="font-mono text-[10px] font-medium tracking-[2px] uppercase text-green mb-3 [text-shadow:0_0_8px_rgba(76,187,23,0.3)]">
                Tool Guides
              </div>
              <h1 className="font-display text-[2.65rem] max-md:text-[1.7rem] font-bold text-white leading-[1.02] tracking-[-0.022em] mb-5">
                How Do I…?
              </h1>
              <p className="text-[14px] leading-[1.7] text-text-inverse-secondary max-w-[460px]">
                Plain-language guides for every tool JJR uses. No jargon, no assumptions. Search for what you need
                or browse by tool — written so AI search can find them too.
              </p>
            </div>
            <div className="w-[340px] max-md:w-full shrink-0">
              <div className="bg-white/[0.06] border border-white/[0.1] focus-within:border-green/60 focus-within:bg-green/[0.06] focus-within:shadow-[0_0_18px_rgba(76,187,23,0.2)] p-1 flex items-center gap-2 transition-all duration-300">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" className="ml-3 shrink-0 text-text-inverse-muted" viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  id="guideSearch"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g. 'how do I log hours'"
                  aria-label="Search tool guides"
                  className="bg-transparent border-none outline-none flex-1 font-body text-[13px] text-white py-2.5 min-w-0 placeholder:text-text-inverse-muted"
                />
              </div>
              <div className="mt-2.5 flex gap-1.5 flex-wrap">
                {QUICK_TERMS.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setQuery(term)}
                    className="font-mono text-[9px] text-text-inverse-muted border border-white/[0.1] px-2 py-1 hover:text-green hover:border-green/40 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>

      <div className="flex items-center gap-3 mb-5 font-mono text-[10px] font-medium tracking-[2px] uppercase text-text-muted">
        Most Used
        <span className="flex-1 h-px bg-rule" aria-hidden="true" />
      </div>

      <div className="grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-4 mb-14">
        {MOST_USED_GUIDES.map((guide) => (
          <div
            key={guide.id}
            className="bg-white border border-rule overflow-hidden group transition-all duration-[350ms] ease-smooth hover:border-navy-mid hover:shadow-[0_8px_24px_rgba(27,54,93,0.10)] hover:-translate-y-0.5"
          >
            <a
              href={guide.fullGuideHref}
              className="h-[110px] flex items-center justify-center relative"
              style={{ background: guide.gradient }}
              aria-label={`${guide.title} — full guide`}
            >
              <span className="w-12 h-12 bg-white/20 flex items-center justify-center transition-all duration-[250ms] ease-smooth group-hover:bg-green/35 group-hover:shadow-[0_0_14px_rgba(76,187,23,0.4)]">
                <PlayIcon size={18} fill="currentColor" className="text-white" />
              </span>
              <span className="absolute top-3 left-3 font-mono text-[8px] font-bold tracking-wider uppercase text-text-inverse-secondary bg-white/10 px-2 py-0.5">
                {guide.durationLabel}
              </span>
              {guide.badge && (
                <span
                  className={`absolute top-3 right-3 font-mono text-[8px] font-bold tracking-wider uppercase px-2 py-0.5 ${
                    guide.badge.tone === 'pink' ? 'bg-pink text-white shadow-[0_0_10px_rgba(233,30,140,0.45)]' : 'bg-green text-white shadow-[0_0_10px_rgba(76,187,23,0.5)]'
                  }`}
                >
                  {guide.badge.label}
                </span>
              )}
            </a>
            <div className="p-6">
              <div className={`font-mono text-[9px] font-medium tracking-[1.5px] uppercase mb-2 ${guide.serviceColorClass}`}>{guide.service}</div>
              <div className="font-display text-[1.05rem] font-bold text-navy leading-snug mb-2">{guide.title}</div>
              <div className="text-[12.5px] text-text-secondary leading-relaxed mb-4">{guide.description}</div>
              <div className="flex items-center gap-3 pt-3 border-t border-rule-light">
                <a href={guide.fullGuideHref} className="text-[11px] font-bold text-green hover:underline">
                  Full Guide →
                </a>
                <span className="text-rule">·</span>
                <a href={guide.secondaryHref} className="text-[11px] text-text-muted hover:text-navy transition-colors">
                  {guide.secondaryLabel}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 mb-5 font-mono text-[10px] font-medium tracking-[2px] uppercase text-text-muted">
        All Guides
        <span className="flex-1 h-px bg-rule" aria-hidden="true" />
      </div>

      <div className="grid grid-cols-[1fr_340px] gap-8 max-lg:grid-cols-1">
        <div>
          {filteredGuides.length === 0 ? (
            <div className="bg-white border border-rule p-8 text-center mb-6">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto mb-3 text-rule" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <div className="font-display text-[1rem] font-bold text-navy mb-1">No guides found</div>
              <p className="text-[12.5px] text-text-secondary">
                Try a different search term or{' '}
                <a href="/under-development?from=request-a-new-guide" className="text-green font-semibold hover:underline">
                  request a new guide
                </a>
                .
              </p>
            </div>
          ) : (
            <div>
              {filteredGuides.map((guide) => (
                <div
                  key={guide.id}
                  className="relative overflow-hidden bg-white border border-rule p-6 mb-4 flex items-start gap-5 transition-[transform,box-shadow,border-color] duration-300 ease-smooth hover:border-navy-mid hover:shadow-[0_8px_24px_rgba(27,54,93,0.08)] hover:-translate-y-px"
                >
                  <div className="w-16 h-16 shrink-0 flex items-center justify-center" style={{ background: guide.gradient }} aria-hidden="true">
                    {ICONS[guide.icon]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <div className="font-display text-[1rem] font-bold text-navy">{guide.title}</div>
                      {guide.badge && (
                        <span className={`font-mono text-[8px] px-2 py-0.5 tracking-wider uppercase ${BADGE_CLASSES[guide.badge.tone]}`}>
                          {guide.badge.label}
                        </span>
                      )}
                    </div>
                    <p className="text-[12.5px] text-text-secondary leading-relaxed mb-3">{guide.description}</p>
                    <div className="flex items-center gap-4 flex-wrap">
                      <a href={guide.readHref} className="text-[11px] font-bold text-green hover:underline">
                        Read Guide →
                      </a>
                      {guide.videoHref && (
                        <a href={guide.videoHref} className="text-[11px] text-text-muted hover:text-navy transition-colors flex items-center gap-1">
                          <PlayIcon size={10} strokeWidth={2} fill="currentColor" />
                          {guide.videoDurationLabel}
                        </a>
                      )}
                      <a href={guide.tertiaryHref} className="text-[11px] text-text-muted hover:text-navy transition-colors">
                        {guide.tertiaryLabel}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="bg-white border border-rule py-3 px-5 relative overflow-hidden text-xs text-text-secondary leading-[1.6]">
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-green shadow-[0_0_10px_rgba(76,187,23,0.5)]" aria-hidden="true" />
            Need a guide that doesn&rsquo;t exist yet?{' '}
            <a href="/under-development?from=request-a-guide" className="text-green font-bold hover:text-green-dark transition-colors">
              Request one here
            </a>{' '}
            — we write them in plain language so everyone can follow.
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <ListPanel title="Quick Answers" eyebrow="Top Questions">
            {QUICK_ANSWERS.map((qa) => (
              <a key={qa.question} href={qa.href} className="flex items-start gap-3 px-2 py-3 border-b border-rule-light last:border-b-0 hover:bg-off-white transition-colors">
                <span className="font-mono text-[10px] text-green font-bold shrink-0 mt-0.5 [text-shadow:0_0_6px_rgba(76,187,23,0.35)]" aria-hidden="true">
                  Q
                </span>
                <div>
                  <div className="text-[12px] font-semibold text-navy leading-snug">{qa.question}</div>
                  <div className="text-[10px] text-text-muted mt-0.5">{qa.answer}</div>
                </div>
              </a>
            ))}
          </ListPanel>

          <ListPanel title="Video Library" eyebrow="Walkthroughs" tone="dark">
            {VIDEO_LIBRARY.map((video) => (
              <a key={video.title} href={video.href} className="flex items-center gap-3 group">
                <span
                  className={`w-8 h-8 flex items-center justify-center shrink-0 transition-all duration-[250ms] ${
                    video.featured
                      ? 'bg-green shadow-[0_0_10px_rgba(76,187,23,0.5),inset_0_1px_0_rgba(255,255,255,0.15)]'
                      : 'bg-white/[0.08] border border-white/10 group-hover:bg-green/[0.15] group-hover:border-green/[0.35]'
                  }`}
                >
                  <PlayIcon size={10} fill="currentColor" className={video.featured ? 'text-white' : 'text-text-inverse-secondary group-hover:text-green transition-colors'} />
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] font-semibold text-white group-hover:text-green transition-colors">{video.title}</div>
                  <div className="text-[9px] text-text-inverse-secondary mt-0.5 font-mono">{video.meta}</div>
                </div>
              </a>
            ))}
          </ListPanel>

          <RequestAccessPanel
            title="Still stuck?"
            description="These guides cover the basics. If you're hitting something specific or unusual, a real person is always better than a document."
            ctaLabel="Ask the Help Desk →"
            ctaHref="/under-development?from=help-desk"
          />
        </div>
      </div>
    </AppShell>
  )
}
