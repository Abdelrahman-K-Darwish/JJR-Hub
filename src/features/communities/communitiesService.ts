import type { CommunityDetail } from '../community-detail/communityDetail.types'
import { communitiesMockAdapter } from './communitiesMockAdapter'
import type { CommunitiesDirectory } from './communities.types'

/**
 * Backend-agnostic contract for Communities data. No HTTP concepts here (no URLs,
 * response objects, or status codes) — an adapter decides how these are actually
 * fulfilled. Read-only: this service does not model joining, submitting resources, or
 * creating events.
 */
export interface CommunitiesService {
  getDirectory(): Promise<CommunitiesDirectory>
  getCommunityDetail(slug: string): Promise<CommunityDetail | null>
}

/**
 * The active implementation for this feature. Swapping to a real backend later means
 * adding `communitiesApiAdapter.ts` and changing this one binding — `useCommunities.ts`,
 * `useCommunityDetail.ts`, `CommunitiesPage.tsx`, and `CommunityDetailPage.tsx` do not change
 * either way. This is the whole seam; no registry, DI container, or context provider is
 * needed for one binding.
 */
export const communitiesService: CommunitiesService = communitiesMockAdapter
