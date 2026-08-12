import { AppShell } from '../../components/AppShell'
import {
  DateTile,
  FilterBar,
  HealthBar,
  HeroGrain,
  ProjectCard,
  RequestAccessPanel,
  SectionKicker,
  StatBlock,
  type FilterOption,
} from '../../components/ui'
import { CURRENT_USER, PROFILE_MENU_ITEMS } from '../../mocks/currentUser'
import type { TeamColor } from './activeProjects.types'
import { useActiveProjects, type ProjectFilterKey } from './useActiveProjects'

const FILTER_OPTIONS: FilterOption[] = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'review', label: 'In Review' },
  { key: 'wrap', label: 'Wrapping Up' },
  { key: 'mine', label: 'My Projects', dividerBefore: true },
]

// Literal Tailwind class strings so the JIT scanner can find them (no template interpolation).
const LEAD_COLOR_CLASSES: Record<TeamColor, string> = {
  green: 'bg-green',
  navy: 'bg-navy',
  'navy-mid': 'bg-navy-mid',
  amber: 'bg-amber',
  pink: 'bg-pink',
}

export function ActiveProjectsPage() {
  const { isLoading, error, counts, health, milestones, filter, setFilter, visibleProjects } = useActiveProjects()

  return (
    <AppShell
      user={CURRENT_USER}
      profileMenuItems={PROFILE_MENU_ITEMS}
      activeNav="projects"
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Active Projects' }]}
      contextBarRight={
        <>
          <span className="font-mono text-[9px] text-text-inverse-muted tracking-wide">
            {visibleProjects.length} project{visibleProjects.length === 1 ? '' : 's'}
          </span>
          <span className="text-text-inverse-muted text-[10px]" aria-hidden="true">
            /
          </span>
          <a href="/start-here" className="font-mono text-[10px] text-green/60 tracking-wide hover:text-green transition-colors">
            Start Here →
          </a>
        </>
      }
    >
      <div className="mb-10 animate-rise">
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
                Active Projects
              </div>
              <h1 className="font-display text-[2.65rem] max-md:text-[1.7rem] font-bold text-white leading-[1.02] tracking-[-0.022em] mb-4">
                Project Portfolio.
              </h1>
              <p className="text-[14px] leading-[1.7] text-text-inverse-secondary max-w-[480px]">
                Every active engagement at JJR — track progress, access files, and stay connected to your team.
                Filter by client, status, or service line.
              </p>
            </div>
            <div className="flex gap-5 shrink-0">
              <StatBlock value={counts?.active ?? 0} label="Active" tone="green" />
              <div className="w-px h-14 bg-white/[0.08] self-center" aria-hidden="true" />
              <StatBlock value={counts?.inReview ?? 0} label="In Review" tone="amber" />
              <div className="w-px h-14 bg-white/[0.08] self-center" aria-hidden="true" />
              <StatBlock value={counts?.wrapping ?? 0} label="Wrapping" tone="muted" />
            </div>
          </div>
        </div>
      </div>

      <FilterBar
        label="Filter"
        options={FILTER_OPTIONS}
        activeKey={filter}
        onChange={(key) => setFilter(key as ProjectFilterKey)}
        className="mb-10"
      />

      <div className="grid grid-cols-[1fr_340px] gap-8 max-lg:grid-cols-1">
        <div>
          <h2 className="flex items-center gap-3 mb-5 font-mono text-[10px] font-medium tracking-[2px] uppercase text-text-muted">
            All Projects
            <span className="flex-1 h-px bg-rule" aria-hidden="true" />
          </h2>

          {isLoading ? (
            <p className="text-[13px] text-text-secondary bg-white border border-rule p-6">Loading projects…</p>
          ) : error ? (
            <p className="text-[13px] text-text-secondary bg-white border border-rule p-6">{error}</p>
          ) : visibleProjects.length === 0 ? (
            <p className="text-[13px] text-text-secondary bg-white border border-rule p-6">
              No projects match this filter.
            </p>
          ) : (
            <div className="flex flex-col gap-4">
              {visibleProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  href={project.href}
                  clientLine={project.clientLine}
                  name={project.name}
                  description={project.description}
                  status={project.status}
                  progress={project.progress}
                  dueLabel={project.dueLabel}
                  team={project.team}
                  teamOverflow={project.teamOverflow}
                  links={project.links}
                />
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <section className="bg-white border border-rule" aria-labelledby="milestones-heading">
            <div className="px-6 py-5 border-b border-rule-light">
              <h2 id="milestones-heading" className="font-display text-[0.95rem] font-bold text-navy tracking-tight">
                Upcoming Milestones
              </h2>
              <SectionKicker className="mt-0.5">Next 30 Days</SectionKicker>
            </div>
            <div className="px-5 py-2 flex flex-col">
              {milestones.map((milestone, i) => (
                <a
                  key={milestone.id}
                  href={milestone.projectHref}
                  className={`flex items-start gap-3 py-3.5 group ${i < milestones.length - 1 ? 'border-b border-rule-light' : ''}`}
                >
                  <DateTile day={milestone.day} month={milestone.month} />
                  <div className="flex-1 min-w-0">
                    <div className="text-[12.5px] font-semibold text-navy leading-snug group-hover:text-green transition-colors">
                      {milestone.title}
                    </div>
                    <div className="text-[10px] text-text-muted mt-0.5 font-mono">{milestone.note}</div>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <div
                        className={`w-4 h-4 text-[7px] font-bold text-white flex items-center justify-center ${LEAD_COLOR_CLASSES[milestone.leadColor]}`}
                        aria-hidden="true"
                      >
                        {milestone.leadInitials}
                      </div>
                      <span className="text-[9px] text-text-muted font-mono">Lead: {milestone.leadName}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>

          <HealthBar buckets={health?.buckets ?? []} avgCompletion={health?.avgCompletion ?? 0} />

          <RequestAccessPanel
            description="If you've been assigned to a project but can't see it here, request access and we'll sort it within one business day."
            ctaLabel="Request project access →"
            ctaHref="/under-development?from=request-project-access"
          />
        </div>
      </div>
    </AppShell>
  )
}
