import { useEffect, useState } from 'react'
import { activeProjectsService } from '../active-projects/activeProjectsService'
import type { ActiveProjectsService } from '../active-projects/activeProjectsService'
import type { UpcomingMilestone } from '../active-projects/activeProjects.types'
import type { HomeProjectTileData } from './home.types'

/** How many projects the Home slider shows — a display-ordering choice, not a business rule. */
const HOME_PROJECT_TILE_COUNT = 3

const MS_PER_DAY = 24 * 60 * 60 * 1000
const MILESTONE_WINDOW_DAYS = 7

interface HomeProjectsData {
  isLoading: boolean
  error: string | null
  projects: HomeProjectTileData[]
  milestonesThisWeekCount: number
}

const INITIAL_DATA: HomeProjectsData = {
  isLoading: true,
  error: null,
  projects: [],
  milestonesThisWeekCount: 0,
}

/**
 * Home's composition hook over Active Projects. Calls `activeProjectsService` directly —
 * no `HomeService`, no `src/mocks/activeProjects.ts` import, no duplicated scoping logic.
 * Owns its own isLoading/error state, independent of `useHomeCommunities()` (docs/specs/home.md
 * "Independent loading/error behavior").
 *
 * `progress` is never read off `Project` here — this is not because the field doesn't exist
 * upstream (it does, per `Project.progress`), but because docs/specs/home.md's
 * "Project-progress conflict" is OPEN (Home architecture doc says Planner-derived, AP2 says
 * milestone-derived). Home v1 does not pick a side; it simply never surfaces progress.
 */
export function useHomeProjects(
  service: Pick<ActiveProjectsService, 'getPortfolio' | 'getMilestones'> = activeProjectsService,
): HomeProjectsData {
  const [data, setData] = useState<HomeProjectsData>(INITIAL_DATA)

  useEffect(() => {
    let cancelled = false

    setData((prev) => ({ ...prev, isLoading: true, error: null }))

    Promise.all([service.getPortfolio(), service.getMilestones()])
      .then(([portfolio, milestones]) => {
        if (cancelled) return

        const projects: HomeProjectTileData[] = portfolio.projects.slice(0, HOME_PROJECT_TILE_COUNT).map((project) => ({
          id: project.id,
          name: project.name,
          clientLine: project.clientLine,
          description: project.description,
          status: project.status,
          dueLabel: project.dueLabel,
          team: project.team,
        }))

        setData({
          isLoading: false,
          error: null,
          projects,
          milestonesThisWeekCount: countMilestonesThisWeek(milestones),
        })
      })
      .catch((err: unknown) => {
        if (cancelled) return
        setData({
          isLoading: false,
          error: err instanceof Error ? err.message : 'Failed to load projects.',
          projects: [],
          milestonesThisWeekCount: 0,
        })
      })

    return () => {
      cancelled = true
    }
  }, [service])

  return data
}

/**
 * Counts milestones falling within a 7-day window from "now." `UpcomingMilestone` only
 * carries display strings (`day`/`month`, no parseable ISO date) — there is no other
 * repo-wide convention for a Home-only "this week" computation, so this derives a
 * best-effort date from `day`/`month` against the current year, matching the same
 * app-local "current time" assumption `new Date()` already carries throughout this codebase.
 */
function countMilestonesThisWeek(milestones: UpcomingMilestone[]): number {
  const now = new Date()
  const windowEnd = new Date(now.getTime() + MILESTONE_WINDOW_DAYS * MS_PER_DAY)

  return milestones.filter((milestone) => {
    const date = parseMilestoneDate(milestone, now.getFullYear())
    if (!date) return false
    return date.getTime() >= now.getTime() && date.getTime() <= windowEnd.getTime()
  }).length
}

const MONTH_INDEX: Record<string, number> = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
}

function parseMilestoneDate(milestone: UpcomingMilestone, year: number): Date | null {
  const day = Number.parseInt(milestone.day, 10)
  const monthIndex = MONTH_INDEX[milestone.month.trim().toLowerCase().slice(0, 3)]
  if (Number.isNaN(day) || monthIndex === undefined) return null
  return new Date(year, monthIndex, day)
}
