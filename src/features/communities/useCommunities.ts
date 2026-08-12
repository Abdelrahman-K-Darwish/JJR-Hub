import { useEffect, useState } from 'react'
import { communitiesService } from './communitiesService'
import type { CommunitySummary, UpcomingEvent, YourCommunityRow } from './communities.types'
import type { CommunitiesService } from './communitiesService'

interface CommunitiesData {
  isLoading: boolean
  error: string | null
  communities: CommunitySummary[]
  totalMemberCount: number
  upcomingEvents: UpcomingEvent[]
  yourCommunities: YourCommunityRow[]
}

const INITIAL_DATA: CommunitiesData = {
  isLoading: true,
  error: null,
  communities: [],
  totalMemberCount: 0,
  upcomingEvents: [],
  yourCommunities: [],
}

/**
 * Feature controller for the Communities directory. Requests the directory through
 * `communitiesService` and returns it as-is. This hook does not perform authorization or
 * scoping — the returned `communities` are whatever the service already returned (CLAUDE.md
 * §6: client-side filtering is never authorization; the returned set is scoped upstream,
 * mock or real).
 */
export function useCommunities(service: Pick<CommunitiesService, 'getDirectory'> = communitiesService) {
  const [data, setData] = useState<CommunitiesData>(INITIAL_DATA)

  useEffect(() => {
    let cancelled = false

    setData((prev) => ({ ...prev, isLoading: true, error: null }))

    service
      .getDirectory()
      .then((directory) => {
        if (cancelled) return
        setData({
          isLoading: false,
          error: null,
          communities: directory.communities,
          totalMemberCount: directory.totalMemberCount,
          upcomingEvents: directory.upcomingEvents,
          yourCommunities: directory.yourCommunities,
        })
      })
      .catch((err: unknown) => {
        if (cancelled) return
        setData({
          isLoading: false,
          error: err instanceof Error ? err.message : 'Failed to load communities.',
          communities: [],
          totalMemberCount: 0,
          upcomingEvents: [],
          yourCommunities: [],
        })
      })

    return () => {
      cancelled = true
    }
  }, [service])

  return {
    isLoading: data.isLoading,
    error: data.error,
    communities: data.communities,
    totalMemberCount: data.totalMemberCount,
    upcomingEvents: data.upcomingEvents,
    yourCommunities: data.yourCommunities,
  }
}
