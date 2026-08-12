import { useEffect, useState } from 'react'
import { communitiesService } from '../communities/communitiesService'
import type { CommunitiesService } from '../communities/communitiesService'
import type { CommunityDetail } from './communityDetail.types'

interface CommunityDetailData {
  isLoading: boolean
  error: string | null
  community: CommunityDetail | null
}

const INITIAL_DATA: CommunityDetailData = {
  isLoading: true,
  error: null,
  community: null,
}

/**
 * Feature controller for a single Community Detail page, keyed by `slug`. Requests the detail
 * through `communitiesService` and owns the loading/error/not-found tri-state.
 *
 * On `slug` change, loading state is reset immediately and `community` is cleared so the
 * previous slug's detail never remains visible while the new slug is loading (no stale-data
 * flash). A resolved `null` (slug not found) is a legitimate not-found state, not an error.
 */
export function useCommunityDetail(
  slug: string,
  service: Pick<CommunitiesService, 'getCommunityDetail'> = communitiesService,
) {
  const [data, setData] = useState<CommunityDetailData>(INITIAL_DATA)

  useEffect(() => {
    let cancelled = false

    setData({ isLoading: true, error: null, community: null })

    service
      .getCommunityDetail(slug)
      .then((community) => {
        if (cancelled) return
        setData({ isLoading: false, error: null, community })
      })
      .catch((err: unknown) => {
        if (cancelled) return
        setData({
          isLoading: false,
          error: err instanceof Error ? err.message : 'Failed to load community.',
          community: null,
        })
      })

    return () => {
      cancelled = true
    }
  }, [slug, service])

  return {
    isLoading: data.isLoading,
    error: data.error,
    community: data.community,
  }
}
