import { AvatarStack } from '../../components/ui'
import type { HomeProjectTileData } from './home.types'

const STATUS_META: Record<HomeProjectTileData['status'], { label: string; stripClass: string }> = {
  active: { label: 'Active', stripClass: 'bg-green shadow-[0_0_10px_rgba(76,187,23,0.45)]' },
  review: { label: 'In Review', stripClass: 'bg-amber shadow-[0_0_10px_rgba(232,168,56,0.40)]' },
  wrap: { label: 'Wrapping Up', stripClass: 'bg-navy-mid shadow-[0_0_10px_rgba(42,74,120,0.35)]' },
}

interface HomeProjectTileProps {
  project: HomeProjectTileData
  className?: string
}

/**
 * Home's compact project summary — deliberately not `ProjectCard`. No progress display (the
 * Home doc-vs-AP2 progress conflict is OPEN, see home.types.ts), no stretched link to a
 * project-detail route (none exists in the router), no quick-link buttons. Purely presentational.
 */
export function HomeProjectTile({ project, className = '' }: HomeProjectTileProps) {
  const meta = STATUS_META[project.status]

  return (
    <article className={`project ${className}`}>
      <span aria-hidden="true" className={`project__topbar pointer-events-none ${meta.stripClass}`} />
      <div className="project__client truncate">{project.clientLine}</div>
      <div className="project__name truncate">{project.name}</div>
      <p className="project__service line-clamp-2">{project.description}</p>
      <div className="project__team">
        <AvatarStack members={project.team} />
      </div>
      <div className="project__meta">
        <span className={`project__status s--${project.status}`}>{meta.label}</span>
        <span className="font-mono text-[10px] text-text-muted shrink-0">{project.dueLabel}</span>
      </div>
    </article>
  )
}
