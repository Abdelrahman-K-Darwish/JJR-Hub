import { useMemo, useState, type ReactNode } from 'react'
import { Link } from 'react-router'
import { AppShell } from '../../components/AppShell'
import {
  ActivityIcon,
  BookOpenIcon,
  ClipboardCheckIcon,
  ClockIcon,
  FileIcon,
  FileTextIcon,
  FilterBar,
  HeroGrain,
  ListPanel,
  Modal,
  RequestAccessPanel,
  RevealOnScroll,
  ShieldIcon,
  TableIcon,
  UsersIcon,
} from '../../components/ui'
import { CURRENT_USER, PROFILE_MENU_ITEMS } from '../../mocks/currentUser'
import {
  CATEGORY_FILTERS,
  FEATURED_TEMPLATES,
  MOST_DOWNLOADED,
  RECENTLY_UPDATED,
  TEMPLATE_ROLE_FILTERS,
  TEMPLATE_ROWS,
  type DocMeta,
  type IconTone,
  type TemplateIconKey,
} from '../../mocks/templates'

const ICONS: Record<TemplateIconKey, (size: number) => ReactNode> = {
  file: (size) => <FileIcon size={size} strokeWidth={1.6} />,
  'file-text': (size) => <FileTextIcon size={size} strokeWidth={1.3} />,
  users: (size) => <UsersIcon size={size} strokeWidth={1.8} />,
  table: (size) => <TableIcon size={size} strokeWidth={1.6} />,
  activity: (size) => <ActivityIcon size={size} strokeWidth={1.8} />,
  clock: (size) => <ClockIcon size={size} strokeWidth={1.8} />,
  'book-open': (size) => <BookOpenIcon size={size} strokeWidth={1.8} />,
  'clipboard-check': (size) => <ClipboardCheckIcon size={size} strokeWidth={1.8} />,
  shield: (size) => <ShieldIcon size={size} strokeWidth={1.8} />,
}

const ICON_TONE_CLASSES: Record<IconTone, string> = {
  green: 'text-green bg-green/[0.06] border-green/15',
  navy: 'text-navy bg-navy/[0.06] border-navy/10',
  amber: 'text-amber bg-amber/[0.08] border-amber/15',
  pink: 'text-pink bg-pink/[0.06] border-pink/15',
  muted: 'text-text-muted bg-warm-gray border-rule-light',
}

const BADGE_TONE_CLASSES: Record<'pink' | 'green', string> = {
  pink: 'bg-pink text-white shadow-[0_0_10px_rgba(233,30,140,0.45)]',
  green: 'bg-green text-white shadow-[0_0_10px_rgba(76,187,23,0.5)]',
}

export function TemplatesPage() {
  const [category, setCategory] = useState('all')
  const [role, setRole] = useState<string | null>(null)
  const [selectedDoc, setSelectedDoc] = useState<DocMeta | null>(null)

  const rows = useMemo(
    () =>
      TEMPLATE_ROWS.filter((row) => {
        const catOk = category === 'all' || row.categoryFilterKey === category
        const roleOk = !role || row.roles.includes(role)
        return catOk && roleOk
      }),
    [category, role],
  )

  return (
    <AppShell
      user={CURRENT_USER}
      profileMenuItems={PROFILE_MENU_ITEMS}
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Templates' }]}
      contextBarRight={
        <>
          <span className="font-mono text-[9px] text-text-inverse-muted tracking-wide">
            {TEMPLATE_ROWS.length} templates
          </span>
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
              Templates
            </div>
            <h1 className="font-display text-[2.65rem] max-md:text-[1.7rem] font-bold text-white leading-[1.02] tracking-[-0.022em] mb-5">
              One Source of Truth.
            </h1>
            <p className="text-[14px] leading-[1.7] text-text-inverse-secondary max-w-[520px] mb-7">
              Every branded template, methodology kit, and deliverable format in one place. Version-controlled,
              tagged by service line, always current. If it&rsquo;s not here, it doesn&rsquo;t exist yet — and you
              can request it.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#library"
                className="font-body text-xs font-bold bg-green text-white px-5 py-2.5 inline-flex items-center gap-1.5 shadow-[0_0_24px_rgba(76,187,23,0.25),0_2px_8px_rgba(0,0,0,0.12)] transition-all duration-300 ease-smooth hover:bg-green-dark hover:-translate-y-px hover:shadow-[0_0_32px_rgba(76,187,23,0.45),0_2px_12px_rgba(0,0,0,0.2)]"
              >
                Browse Library →
              </a>
              <a
                href="/under-development?from=request-a-template"
                className="font-body text-xs font-semibold border border-text-inverse-muted text-text-inverse-secondary px-5 py-2.5 inline-flex items-center transition-all duration-200 hover:border-green hover:text-green"
              >
                Request a Template
              </a>
            </div>
          </div>
        </div>
      </RevealOnScroll>

      <div className="flex items-center gap-3 mb-5 font-mono text-[10px] font-medium tracking-[2px] uppercase text-text-muted">
        Featured Templates
        <span className="flex-1 h-px bg-rule" aria-hidden="true" />
        <span className="font-body text-[11px] font-normal tracking-normal normal-case whitespace-nowrap text-text-muted">
          Most used &amp; recently updated
        </span>
      </div>

      <div className="grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-4 mb-14">
        {FEATURED_TEMPLATES.map((doc) => (
          <div
            key={doc.id}
            className="bg-white border border-rule overflow-hidden cursor-pointer relative group transition-all duration-[350ms] ease-smooth hover:border-navy-mid hover:shadow-[0_8px_24px_rgba(27,54,93,0.10)] hover:-translate-y-0.5"
            onClick={() => setSelectedDoc(doc)}
          >
            <div className="h-[100px] flex items-center justify-center relative" style={{ background: doc.gradient }}>
              <span className="opacity-40 text-white" aria-hidden="true">
                {ICONS[doc.icon](32)}
              </span>
              <div
                className={`absolute top-2.5 right-2.5 font-mono text-[8px] font-bold tracking-wider uppercase px-2 py-0.5 ${BADGE_TONE_CLASSES[doc.badge.tone]}`}
              >
                {doc.badge.label}
              </div>
              <div className="absolute bottom-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedDoc(doc)
                  }}
                  className="font-mono text-[9px] font-bold text-white bg-white/20 px-2.5 py-1 hover:bg-white/30 transition-colors"
                >
                  Preview
                </button>
                <a
                  href="/under-development?from=template-download"
                  onClick={(e) => e.stopPropagation()}
                  className="font-mono text-[9px] font-bold text-white bg-green px-2.5 py-1 hover:bg-green-dark transition-all shadow-[0_0_10px_rgba(76,187,23,0.4)]"
                >
                  Download
                </a>
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-[9px] font-medium tracking-[1.2px] uppercase text-green">{doc.category}</span>
                <span className="text-rule">·</span>
                <span className="font-mono text-[9px] text-text-muted">{doc.version}</span>
              </div>
              <div className="font-display text-[0.95rem] font-bold text-navy leading-snug mb-1.5">{doc.title}</div>
              <div className="text-[12px] text-text-secondary leading-relaxed mb-3">{doc.description}</div>
              <div className="flex items-center justify-between pt-3 border-t border-rule-light">
                <span className="text-[10px] text-text-muted">{doc.updatedLabel}</span>
                <span className="text-[10px] text-text-muted">{doc.downloadsLabel}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div id="library" className="flex items-center gap-3 mb-5 font-mono text-[10px] font-medium tracking-[2px] uppercase text-text-muted scroll-mt-20">
        Full Library
        <span className="flex-1 h-px bg-rule" aria-hidden="true" />
      </div>

      <div className="flex items-center gap-3 mb-3 flex-wrap">
        <FilterBar label="Category" options={CATEGORY_FILTERS} activeKey={category} onChange={setCategory} />
      </div>
      <div className="flex items-center gap-3 mb-8 flex-wrap">
        <FilterBar
          label="Role"
          options={TEMPLATE_ROLE_FILTERS}
          activeKey={role ?? ''}
          onChange={(key) => setRole(key === role ? null : key)}
        />
      </div>

      <div className="grid grid-cols-[1fr_300px] gap-8 max-lg:grid-cols-1">
        <div>
          <div className="bg-white border border-rule overflow-hidden mb-6">
            <div className="grid grid-cols-[1fr_120px_100px_90px_80px] max-md:hidden px-6 py-3 border-b border-rule bg-warm-gray/50">
              <div className="font-mono text-[9px] tracking-[1.5px] uppercase text-text-muted font-medium">Template</div>
              <div className="font-mono text-[9px] tracking-[1.5px] uppercase text-text-muted font-medium">Category</div>
              <div className="font-mono text-[9px] tracking-[1.5px] uppercase text-text-muted font-medium">Updated</div>
              <div className="font-mono text-[9px] tracking-[1.5px] uppercase text-text-muted font-medium">Version</div>
              <div className="font-mono text-[9px] tracking-[1.5px] uppercase text-text-muted font-medium text-right">Action</div>
            </div>

            {rows.length === 0 ? (
              <p className="p-8 text-center text-[13px] text-text-secondary">No templates match this filter.</p>
            ) : (
              rows.map((row, i) => (
                <div
                  key={row.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedDoc(row)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') setSelectedDoc(row)
                  }}
                  className={`relative grid grid-cols-[1fr_120px_100px_90px_80px] max-md:flex max-md:flex-col max-md:gap-2 items-center px-6 py-4 hover:bg-off-white transition-colors duration-200 cursor-pointer ${
                    i < rows.length - 1 ? 'border-b border-rule-light' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 shrink-0 flex items-center justify-center border ${ICON_TONE_CLASSES[row.iconTone]}`} aria-hidden="true">
                      {ICONS[row.icon](14)}
                    </div>
                    <div>
                      <div className="text-[13px] font-semibold text-navy">{row.title}</div>
                      <div className="text-[10px] text-text-muted">{row.summary}</div>
                    </div>
                  </div>
                  <div className="font-mono text-[10px] text-text-secondary">{row.category}</div>
                  <div className="font-mono text-[10px] text-text-muted">{row.updatedLabel}</div>
                  <div className="font-mono text-[10px] text-text-muted">{row.version}</div>
                  <div className="text-right">
                    <a
                      href="/under-development?from=use-template"
                      onClick={(e) => e.stopPropagation()}
                      className="font-mono text-[10px] font-bold text-green hover:underline"
                    >
                      Use →
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="bg-white border border-rule py-3 px-5 relative overflow-hidden text-xs text-text-secondary leading-[1.6]">
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-green shadow-[0_0_10px_rgba(76,187,23,0.5)]" aria-hidden="true" />
            Can&rsquo;t find what you need?{' '}
            <a href="/under-development?from=request-a-template" className="text-green font-bold hover:text-green-dark transition-colors">
              Request a new template
            </a>{' '}
            — the team reviews requests weekly.
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <ListPanel title="Recently Updated" eyebrow="Last 14 Days">
            {RECENTLY_UPDATED.map((item) => (
              <a key={item.title} href="/under-development?from=template-preview" className="flex items-center gap-3 px-2 py-2.5 hover:bg-off-white transition-colors">
                <div
                  className={`w-2 h-2 rounded-full shrink-0 ${item.tone === 'green' ? 'bg-green shadow-[0_0_6px_rgba(76,187,23,0.5)]' : 'bg-amber shadow-[0_0_6px_rgba(232,168,56,0.45)]'}`}
                  aria-hidden="true"
                />
                <div className="flex-1">
                  <div className="text-[12px] font-semibold text-navy">{item.title}</div>
                  <div className="text-[9px] text-text-muted">{item.meta}</div>
                </div>
              </a>
            ))}
          </ListPanel>

          <ListPanel title="Most Downloaded" eyebrow="All Time" tone="dark">
            {MOST_DOWNLOADED.map((item) => (
              <a key={item.title} href="/under-development?from=template-preview" className="flex items-center gap-3 group">
                <div
                  className={`font-mono w-5 text-center shrink-0 ${
                    item.rank === 1 ? 'text-[12px] font-bold text-green [text-shadow:0_0_8px_rgba(76,187,23,0.55)]' : 'text-[11px] font-bold text-text-inverse-secondary'
                  }`}
                >
                  {item.rank}
                </div>
                <div className="flex-1">
                  <div className="text-[12px] font-semibold text-white group-hover:text-green transition-colors">{item.title}</div>
                  <div className="text-[9px] text-text-inverse-secondary font-mono mt-0.5">{item.downloadsLabel}</div>
                </div>
              </a>
            ))}
          </ListPanel>

          <RequestAccessPanel
            title="Brand compliance"
            description="All templates are reviewed quarterly for brand compliance. Using anything outside this library? Check with the Brand team first."
            ctaLabel="View Brand Guidelines →"
            ctaHref="/under-development?from=brand-guidelines"
          />
        </div>
      </div>

      <Modal open={selectedDoc != null} onClose={() => setSelectedDoc(null)} labelledBy="dmodal-title">
        {selectedDoc && (
          <>
            <div className="px-8 pt-7 pb-5 border-b border-rule-light">
              <div className="flex items-center gap-2 mb-3 font-mono text-[9px] font-medium tracking-[1.5px] uppercase">
                <span className="text-green">{selectedDoc.category}</span>
                <span className="text-rule">·</span>
                <span className="text-text-muted">{selectedDoc.version}</span>
                <span className="text-rule">·</span>
                <span className="text-text-muted">{selectedDoc.updatedLabel}</span>
              </div>
              <h2 id="dmodal-title" className="font-display text-[1.55rem] font-bold text-navy leading-tight tracking-tight mb-2">
                {selectedDoc.title}
              </h2>
              <p className="text-[13px] text-text-secondary leading-relaxed">{selectedDoc.description}</p>
            </div>
            <div className="flex-1 overflow-auto bg-off-white p-8">
              <div className="bg-white border border-rule min-h-[280px] flex items-center justify-center p-10">
                <div className="text-center text-text-muted">
                  <FileTextIcon size={48} strokeWidth={1.2} className="mx-auto mb-4 opacity-60" />
                  <div className="font-mono text-[10px] tracking-[1.5px] uppercase mb-1">Preview placeholder</div>
                  <div className="text-[11px]">SharePoint document viewer will render here</div>
                </div>
              </div>
            </div>
            <div className="px-8 py-5 border-t border-rule-light flex items-center justify-between gap-4 flex-wrap">
              <div className="text-[10.5px] text-text-muted font-mono tracking-[0.5px]">Owner · PMO &nbsp;·&nbsp; Brand-compliant</div>
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setSelectedDoc(null)}
                  className="font-body text-xs font-semibold border border-rule text-text-secondary px-4 py-2 hover:border-navy-mid hover:text-navy transition-all"
                >
                  Close
                </button>
                <a
                  href="/under-development?from=template-download"
                  className="font-body text-xs font-bold bg-green text-white px-4 py-2 inline-flex items-center gap-1.5 hover:bg-green-dark transition-all shadow-[0_0_18px_rgba(76,187,23,0.3)]"
                >
                  Download
                </a>
              </div>
            </div>
          </>
        )}
      </Modal>
    </AppShell>
  )
}
