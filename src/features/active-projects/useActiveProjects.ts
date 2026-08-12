import { useEffect, useState } from 'react'
import { activeProjectsService } from './activeProjectsService'
import type { PortfolioCounts, PortfolioHealth, Project, UpcomingMilestone } from './activeProjects.types'

export type ProjectFilterKey = 'all' | 'active' | 'review' | 'wrap' | 'mine'

interface ActiveProjectsData {
  isLoading: boolean
  error: string | null
  projects: Project[]
  counts: PortfolioCounts | null
  health: PortfolioHealth | null
  milestones: UpcomingMilestone[]
}

const INITIAL_DATA: ActiveProjectsData = {
  isLoading: true,
  error: null,
  projects: [],
  counts: null,
  health: null,
  milestones: [],
}

/**
 * Feature controller for Active Projects. Requests the portfolio and upcoming milestones
 * through `activeProjectsService` and owns the My/All filter over the returned project set.
 *
 * This hook does not perform authorization or scoping — `visibleProjects` is derived only
 * from whatever `projects` the service already returned (CLAUDE.md §6: client-side filtering
 * is never authorization; the returned set is scoped upstream, mock or real).
 */
export function useActiveProjects() {
  const [data, setData] = useState<ActiveProjectsData>(INITIAL_DATA)
  const [filter, setFilter] = useState<ProjectFilterKey>('all')

  useEffect(() => {
    let cancelled = false

    setData((prev) => ({ ...prev, isLoading: true, error: null }))

    Promise.all([activeProjectsService.getPortfolio(), activeProjectsService.getMilestones()])
      .then(([portfolio, milestones]) => {
        if (cancelled) return
        setData({
          isLoading: false,
          error: null,
          projects: portfolio.projects,
          counts: portfolio.counts,
          health: portfolio.health,
          milestones,
        })
      })
      .catch((err: unknown) => {
        if (cancelled) return
        setData({
          isLoading: false,
          error: err instanceof Error ? err.message : 'Failed to load active projects.',
          projects: [],
          counts: null,
          health: null,
          milestones: [],
        })
      })

    return () => {
      cancelled = true
    }
  }, [])

  const visibleProjects = data.projects.filter((project) => {
    if (filter === 'all') return true
    if (filter === 'mine') return project.mine
    return project.status === filter
  })

  return {
    isLoading: data.isLoading,
    error: data.error,
    counts: data.counts,
    health: data.health,
    milestones: data.milestones,
    filter,
    setFilter,
    visibleProjects,
  }
}
