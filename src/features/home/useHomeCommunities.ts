import { useEffect, useState } from 'react'
import { communitiesService } from '../communities/communitiesService'
import type { CommunitiesService } from '../communities/communitiesService'
import type { HomeCommunityTileData } from './home.types'

/** How many communities the Home summary shows — a display-ordering choice, not a business rule. */
const HOME_COMMUNITY_TILE_COUNT = 3

interface HomeCommunitiesData {
  isLoading: boolean
  error: string | null
  communities: HomeCommunityTileData[]
}

const INITIAL_DATA: HomeCommunitiesData = {
  isLoading: true,
  error: null,
  communities: [],
}

/**
 * Home's composition hook over Communities. Calls `communitiesService.getDirectory()`
 * directly — no `HomeService`, no `src/mocks/communities.ts` import, no duplicated
 * scoping/join logic. Owns its own isLoading/error state, independent of `useHomeProjects()`.
 *
 * Data-minimization note (not an authorization boundary): `communitiesService.getDirectory()`
 * still returns the full `CommunitySummary` for each community — including `isMember`,
 * `topResources`, `recentDiscussions`, and `keyExperts` — and this hook receives all of it
 * before mapping it down. What this hook guarantees is narrower: its own *returned* view-model
 * (`communities: HomeCommunityTileData[]`) never carries those fields back out to `HomePage`.
 * Backend/service authorization remains authoritative and is untouched by this hook; per
 * CLAUDE.md §6 and docs/DATA-AND-BEHAVIOR-MAP.md's P-05 Communities entry, any unauthorized
 * Class C data must eventually be omitted by the backend before it reaches the client at all —
 * that gap pre-exists (already flagged when Communities' own seam was built) and is not solved
 * here, only kept from being re-exposed in Home's own output shape.
 */
export function useHomeCommunities(
  service: Pick<CommunitiesService, 'getDirectory'> = communitiesService,
): HomeCommunitiesData {
  const [data, setData] = useState<HomeCommunitiesData>(INITIAL_DATA)

  useEffect(() => {
    let cancelled = false

    setData((prev) => ({ ...prev, isLoading: true, error: null }))

    service
      .getDirectory()
      .then((directory) => {
        if (cancelled) return

        const communities: HomeCommunityTileData[] = directory.communities.slice(0, HOME_COMMUNITY_TILE_COUNT).map((community) => ({
          slug: community.slug,
          name: community.name,
          icon: community.icon,
          description: community.description,
          memberCount: community.memberCount,
        }))

        setData({ isLoading: false, error: null, communities })
      })
      .catch((err: unknown) => {
        if (cancelled) return
        setData({
          isLoading: false,
          error: err instanceof Error ? err.message : 'Failed to load communities.',
          communities: [],
        })
      })

    return () => {
      cancelled = true
    }
  }, [service])

  return data
}
