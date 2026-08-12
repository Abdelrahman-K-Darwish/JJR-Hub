import { PORTFOLIO_HEALTH, PROJECTS, PROJECT_COUNTS, UPCOMING_MILESTONES } from '../../mocks/activeProjects'
import type { ActiveProjectsService } from './activeProjectsService'
import type { ProjectsPortfolio, UpcomingMilestone } from './activeProjects.types'

/**
 * Implements `ActiveProjectsService` over the static dataset in `src/mocks/activeProjects.ts`.
 * That data is already scoped (spec §5 — "a real response only ever contains the caller's
 * in-scope projects") — this adapter does not filter by role or capability, simulate latency,
 * or inject random failures. It only packages existing mock records into the contract shape.
 *
 * Never treat this as production authorization (CLAUDE.md §6) — a real backend must do the
 * actual scoping; this file exists so the page doesn't need to change when that backend arrives.
 */
export const activeProjectsMockAdapter: ActiveProjectsService = {
  getPortfolio(): Promise<ProjectsPortfolio> {
    return Promise.resolve({
      projects: PROJECTS,
      counts: PROJECT_COUNTS,
      health: PORTFOLIO_HEALTH,
    })
  },

  getMilestones(): Promise<UpcomingMilestone[]> {
    return Promise.resolve(UPCOMING_MILESTONES)
  },
}
