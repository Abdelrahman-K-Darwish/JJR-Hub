import { COMMUNITIES, TOTAL_MEMBER_COUNT, UPCOMING_EVENTS, YOUR_COMMUNITIES } from '../../mocks/communities'
import { COMMUNITY_DETAILS } from '../../mocks/communityDetail'
import type { CommunitiesService } from './communitiesService'
import type { CommunitiesDirectory } from './communities.types'

/**
 * Implements `CommunitiesService` over the static datasets in `src/mocks/communities.ts` and
 * `src/mocks/communityDetail.ts`. That data is already scoped (the class C `recentDiscussions`
 * omission for non-members is modeled at the data-shape level) — this adapter does not filter
 * by role or capability, simulate latency, or inject random failures. It only packages existing
 * mock records into the contract shape.
 *
 * Never treat this as production authorization (CLAUDE.md §6) — a real backend must do the
 * actual scoping; this file exists so the pages don't need to change when that backend arrives.
 */
export const communitiesMockAdapter: CommunitiesService = {
  getDirectory(): Promise<CommunitiesDirectory> {
    return Promise.resolve({
      communities: COMMUNITIES,
      totalMemberCount: TOTAL_MEMBER_COUNT,
      upcomingEvents: UPCOMING_EVENTS,
      yourCommunities: YOUR_COMMUNITIES,
    })
  },

  getCommunityDetail(slug) {
    return Promise.resolve(COMMUNITY_DETAILS[slug] ?? null)
  },
}
