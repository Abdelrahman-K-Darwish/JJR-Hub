import { activeProjectsMockAdapter } from './activeProjectsMockAdapter'
import type { ProjectsPortfolio, UpcomingMilestone } from './activeProjects.types'

/**
 * Backend-agnostic contract for Active Projects data. No HTTP concepts here (no URLs,
 * response objects, or status codes) — an adapter decides how these are actually
 * fulfilled. Mirrors the two real endpoints in docs/specs/active-projects.md §5:
 * `GET /api/projects` and `GET /api/milestones?window=30d`.
 */
export interface ActiveProjectsService {
  getPortfolio(): Promise<ProjectsPortfolio>
  getMilestones(): Promise<UpcomingMilestone[]>
}

/**
 * The active implementation for this feature. Swapping to a real backend later means
 * adding `activeProjectsApiAdapter.ts` and changing this one binding — `useActiveProjects.ts`
 * and `ActiveProjectsPage.tsx` do not change either way. This is the whole seam; no registry,
 * DI container, or context provider is needed for one binding.
 */
export const activeProjectsService: ActiveProjectsService = activeProjectsMockAdapter
