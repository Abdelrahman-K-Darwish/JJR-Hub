import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { Link } from 'react-router'
import { RevealOnScroll } from '../../components/ui'
import type { HomeSpotlightCard, HomeTopicLink } from './homeContent'

/**
 * Home's own presentational building blocks for the "Your Hub" quadrant grid and the Priority
 * Topics / Knowledge Spotlight card rows. Pure presentation over the same already-approved
 * `homeContent.ts` data — no new data, no service calls, no routes beyond what already exists
 * in `src/App.tsx`.
 */

interface QuadrantLinkItem {
  label: string
  to?: string
  href?: string
  icon: ReactNode
  /** Non-link status row (Client Hub STUB) instead of a navigable link. */
  statusCopy?: string
}

interface QuadrantCardProps {
  index: string
  icon: ReactNode
  title: string
  description: string
  links: QuadrantLinkItem[]
  className?: string
}

/** One "Your Hub" quadrant tile — icon header, dividing rule, animated green top rule on hover. */
export function QuadrantCard({ index, icon, title, description, links, className = '' }: QuadrantCardProps) {
  return (
    <RevealOnScroll as="section" aria-label={title} className={`quadrant ${className}`} data-quadrant={index}>
      <div className="flex items-start gap-[18px] mb-5">
        <div className="quadrant-icon" aria-hidden="true">
          {icon}
        </div>
        <div className="min-w-0">
          <h3 className="font-display text-[1.15rem] font-bold text-navy mb-1 tracking-tight">{title}</h3>
          <p className="text-[12.5px] text-text-secondary leading-[1.65] max-w-[88%]">{description}</p>
        </div>
      </div>
      <div className="flex flex-col">
        {links.map((link) =>
          link.statusCopy ? (
            <div key={link.label} className="q-link q-link--inert !cursor-default">
              <span className="w-[16px] flex justify-center text-text-muted shrink-0" aria-hidden="true">
                {link.icon}
              </span>
              <span className="flex-1">{link.label}</span>
              <span className="font-mono text-[9px] tracking-[1px] uppercase text-text-muted">{link.statusCopy}</span>
            </div>
          ) : (
            <QuadrantLink key={link.label} {...link} />
          ),
        )}
      </div>
    </RevealOnScroll>
  )
}

function QuadrantLink({ label, to, href, icon }: QuadrantLinkItem) {
  const content = (
    <>
      <span className="w-[16px] flex justify-center text-text-muted shrink-0" aria-hidden="true">
        {icon}
      </span>
      <span className="flex-1">{label}</span>
      <span aria-hidden="true" className="q-arrow">
        →
      </span>
    </>
  )
  return to ? (
    <Link to={to} className="q-link">
      {content}
    </Link>
  ) : (
    <a href={href} className="q-link">
      {content}
    </a>
  )
}

export type { QuadrantLinkItem }

function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
}

/**
 * Real horizontal slider mechanics matching `legacy/jjr-hub-tw.html`'s `.section-slider` —
 * a native `overflow-x:auto` track (`section-slider__track`) plus two arrow buttons that scroll
 * the track by one card-width and disable at each edge (`.section-slider__arrow:disabled`).
 * Reused by Priority Topics, Active Projects, Knowledge Spotlight, and Communities of Practice
 * so all four rows share one real implementation, sized to however many items they're given —
 * nothing here assumes a fixed item count.
 *
 * Extensibility: arrow controls only render when the track's content actually overflows its
 * visible width (`hasOverflow`, driven by a `ResizeObserver` on the track plus a same-render
 * recheck so added/removed items are picked up without a page reload). When everything fits —
 * today's 3-4 items, or fewer — no arrows render at all and the row reads as the legacy static
 * grid. Add a 5th/6th/Nth item later and the row becomes scrollable/navigable automatically,
 * no layout change required.
 */
export function SectionSlider({
  children,
  ariaLabel,
  className = '',
}: {
  children: ReactNode
  ariaLabel: string
  className?: string
}) {
  const trackRef = useRef<HTMLUListElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(true)
  const [hasOverflow, setHasOverflow] = useState(false)

  const updateEdges = () => {
    const el = trackRef.current
    if (!el) return
    setAtStart(el.scrollLeft <= 4)
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4)
    setHasOverflow(el.scrollWidth > el.clientWidth + 4)
  }

  // Recompute on every render (cheap: a few layout reads) so a change in the number of children
  // — e.g. a 5th topic added to homeContent.ts — is picked up without any extra wiring, plus a
  // ResizeObserver for viewport/container resizes that don't themselves trigger a re-render.
  useEffect(() => {
    updateEdges()
  })

  useEffect(() => {
    const el = trackRef.current
    if (!el || typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(() => updateEdges())
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const scrollByAmount = (direction: 1 | -1) => {
    const el = trackRef.current
    if (!el) return
    const cardWidth = el.querySelector('[data-slide]')?.clientWidth ?? el.clientWidth * 0.8
    el.scrollBy({ left: direction * (cardWidth + 20), behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  }

  const onTrackKeyDown = (e: KeyboardEvent<HTMLUListElement>) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      scrollByAmount(1)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      scrollByAmount(-1)
    }
  }

  return (
    <div className={`section-slider ${className}`}>
      {hasOverflow && (
        <button
          type="button"
          onClick={() => scrollByAmount(-1)}
          disabled={atStart}
          aria-label={`Scroll ${ariaLabel} left`}
          className="section-slider__arrow section-slider__arrow--left max-md:hidden"
        >
          ‹
        </button>
      )}
      <ul
        ref={trackRef}
        onScroll={updateEdges}
        onKeyDown={onTrackKeyDown}
        tabIndex={hasOverflow ? 0 : -1}
        role="list"
        aria-label={ariaLabel}
        className="section-slider__track flex gap-5 snap-x snap-mandatory pb-2 max-md:flex-col max-md:overflow-visible max-md:snap-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-green focus-visible:outline-offset-2"
      >
        {children}
      </ul>
      {hasOverflow && (
        <button
          type="button"
          onClick={() => scrollByAmount(1)}
          disabled={atEnd}
          aria-label={`Scroll ${ariaLabel} right`}
          className="section-slider__arrow section-slider__arrow--right max-md:hidden"
        >
          ›
        </button>
      )}
    </div>
  )
}

const TOPIC_VISUALS: Record<string, string> = {
  '/jedi-cab': 'linear-gradient(135deg,#3D2B00,#8B6914)',
  '/environmental-justice': 'linear-gradient(135deg,#1a3a1a,#2D7D00)',
  '/ai-for-good': 'linear-gradient(135deg,#0F2340,#2A4A78)',
}

/** Priority Topics card — rich gradient visual, tag, hover elevation. Internal routes only. */
export function TopicCard({ label, tag, description, href }: HomeTopicLink) {
  const gradient = TOPIC_VISUALS[href] ?? 'linear-gradient(135deg,#0F2340,#2A4A78)'
  return (
    <RevealOnScroll as="li" data-slide className="list-none flex-1 min-w-[240px] max-w-[300px] max-md:max-w-none max-md:w-full snap-start">
      <Link to={href} className="topic focus-visible:outline focus-visible:outline-2 focus-visible:outline-green focus-visible:outline-offset-2">
        <div className="topic__visual" style={{ background: gradient }} aria-hidden="true">
          <span className="topic__tag">{tag}</span>
        </div>
        <div className="topic__body">
          <div className="topic__name">{label}</div>
          <p className="topic__desc">{description}</p>
          <div className="topic__foot">
            <span className="topic__cta">Explore →</span>
          </div>
        </div>
      </Link>
    </RevealOnScroll>
  )
}

const CARD_ACCENTS = ['#2D7D00', 'var(--navy-mid)', '#8B1A6A']

const CATEGORY_ICON: Record<string, ReactNode> = {
  Template: (
    <svg width="30" height="30" fill="none" stroke="white" strokeWidth="1.4" viewBox="0 0 24 24">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  ),
  Guide: (
    <svg width="30" height="30" fill="none" stroke="white" strokeWidth="1.4" viewBox="0 0 24 24">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
  Video: (
    <svg width="30" height="30" fill="none" stroke="white" strokeWidth="1.4" viewBox="0 0 24 24">
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" />
    </svg>
  ),
}

/** Knowledge Spotlight / editorial `.k-card` — icon thumbnail, Updated/New badge, colored content-type
 * label + title + description + metadata footer in the body, matching legacy's k-card body order. */
export function KnowledgeCard({ item, accentIndex = 0 }: { item: HomeSpotlightCard; accentIndex?: number }) {
  const accent = CARD_ACCENTS[accentIndex % CARD_ACCENTS.length]
  return (
    <RevealOnScroll as="li" data-slide className="list-none flex-1 min-w-[260px] max-w-[320px] max-md:max-w-none max-md:w-full snap-start">
      <a
        href={item.href}
        className="k-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-green focus-visible:outline-offset-2"
      >
        <div
          className="k-card__thumb"
          style={{ background: `linear-gradient(135deg, ${accent}, var(--navy-deep))` }}
          aria-hidden="true"
        >
          {CATEGORY_ICON[item.category] ?? null}
          {item.badge ? <span className={`k-card__badge ${item.badge === 'New' ? '' : 'k-card__badge--green'}`}>{item.badge}</span> : null}
        </div>
        <div className="k-card__body">
          <div className="k-card__type" style={{ color: accent }}>
            {item.category}
          </div>
          <div className="k-card__title line-clamp-1">{item.title}</div>
          <p className="k-card__desc line-clamp-2">{item.description}</p>
          <div className="k-card__foot">
            <span>{item.meta}</span>
          </div>
        </div>
      </a>
    </RevealOnScroll>
  )
}
