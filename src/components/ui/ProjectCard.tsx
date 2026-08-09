import { AvatarStack, type AvatarStackMember } from './AvatarStack'
import { CardTitle } from './CardTitle'
import { MiniButton } from './MiniButton'
import { ProgressTrack } from './ProgressTrack'
import { SectionKicker } from './SectionKicker'
import { StatusPill, type StatusTone } from './StatusPill'

export type ProjectStatus = 'active' | 'review' | 'wrap'

export interface ProjectCardLink {
  label: string
  href: string
}

export interface ProjectCardProps {
  /** Detail route — re-checked server-side on load, never inherited from this list (spec §4.B). */
  href: string
  /** "Client · Practice" line. */
  clientLine: string
  name: string
  description: string
  status: ProjectStatus
  /** Milestone-derived percentage, or null with zero milestones (AP5). */
  progress: number | null
  dueLabel: string
  team: AvatarStackMember[]
  teamOverflow?: number
  links: ProjectCardLink[]
  className?: string
}

const STATUS_META: Record<ProjectStatus, { tone: StatusTone; label: string; stripClass: string }> = {
  active: { tone: 'green', label: 'Active', stripClass: 'bg-green shadow-[0_0_10px_rgba(76,187,23,0.45)]' },
  review: { tone: 'amber', label: 'In Review', stripClass: 'bg-amber shadow-[0_0_10px_rgba(232,168,56,0.40)]' },
  wrap: { tone: 'navy', label: 'Wrapping Up', stripClass: 'bg-navy-mid shadow-[0_0_10px_rgba(42,74,120,0.35)]' },
}

/**
 * Project summary card. The whole card is a stretched link (`href`) to the detail route;
 * quick-link buttons and other controls stay real, independently-clickable elements above it
 * — never `onclick` + `event.target.closest()` like the mockup.
 */
export function ProjectCard({
  href,
  clientLine,
  name,
  description,
  status,
  progress,
  dueLabel,
  team,
  teamOverflow = 0,
  links,
  className = '',
}: ProjectCardProps) {
  const meta = STATUS_META[status]

  return (
    <article
      className={`relative bg-white border border-rule p-6 pt-7 transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:border-navy-mid hover:shadow-[0_8px_24px_rgba(27,54,93,0.10)] ${className}`}
    >
      <span aria-hidden="true" className={`absolute top-0 left-0 right-0 h-[3px] pointer-events-none ${meta.stripClass}`} />
      <a href={href} className="absolute inset-0 z-0" aria-label={name} />

      <div className="relative z-[1] flex items-start gap-5 max-md:flex-col">
        <div className="flex-1 min-w-0">
          <SectionKicker className="mb-1.5">{clientLine}</SectionKicker>
          <CardTitle className="mb-1.5">{name}</CardTitle>
          <p className="text-[12.5px] text-text-secondary mb-4 leading-[1.65] max-w-[560px]">{description}</p>
          <div className="flex items-center gap-4 flex-wrap">
            <AvatarStack members={team} overflowCount={teamOverflow} />
            <div className="flex gap-1.5">
              {links.map((link) => (
                <MiniButton key={link.label} href={link.href}>
                  {link.label}
                </MiniButton>
              ))}
            </div>
          </div>
        </div>

        <div className="w-[180px] shrink-0 max-md:w-full">
          <div className="flex items-center justify-between mb-2.5">
            <StatusPill tone={meta.tone}>{meta.label}</StatusPill>
            {progress != null && <span className="font-mono text-[11px] text-text-secondary font-semibold">{progress}%</span>}
          </div>
          <ProgressTrack value={progress} tone={meta.tone} />
          <div className="text-[10px] text-text-muted mt-2 font-mono">{dueLabel}</div>
        </div>
      </div>
    </article>
  )
}
