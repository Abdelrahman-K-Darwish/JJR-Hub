import { renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import type { CommunitiesDirectory } from './communities.types'
import { useCommunities } from './useCommunities'

describe('useCommunities', () => {
  it('transitions from loading to loaded with the directory the service returns', async () => {
    const directory: CommunitiesDirectory = {
      communities: [],
      totalMemberCount: 0,
      upcomingEvents: [],
      yourCommunities: [],
    }
    const fakeService = { getDirectory: vi.fn().mockResolvedValue(directory) }

    const { result } = renderHook(() => useCommunities(fakeService))

    expect(result.current.isLoading).toBe(true)

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    expect(result.current.error).toBeNull()
    expect(result.current.communities).toEqual([])
  })

  it('a service rejection reaches the hook error state, not a thrown exception', async () => {
    const fakeService = { getDirectory: vi.fn().mockRejectedValue(new Error('boom')) }

    const { result } = renderHook(() => useCommunities(fakeService))

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    expect(result.current.error).toBe('boom')
    expect(result.current.communities).toEqual([])
  })

  it('returns exactly the synthetic data the injected service resolves, never reaching into the real mock module', async () => {
    // Deliberately fabricated data the hook has never seen — passing this test proves the
    // hook's returned data comes only from the injected service, not from `src/mocks/communities.ts`.
    const syntheticDirectory: CommunitiesDirectory = {
      communities: [
        {
          slug: 'synthetic-community',
          name: 'Synthetic Community',
          icon: 'info',
          description: 'Exists only in this test.',
          memberCount: 1,
          postsThisWeek: 0,
          resourceCount: 0,
          steward: 'Test Steward',
          isMember: true,
          topResources: [],
          recentDiscussions: [],
          keyExperts: [],
        },
      ],
      totalMemberCount: 1,
      upcomingEvents: [{ day: '01', month: 'Jan', title: 'Synthetic Event', meta: 'Test', href: '/synthetic' }],
      yourCommunities: [{ slug: 'synthetic-community', name: 'Synthetic Community', joined: true }],
    }
    const fakeService = { getDirectory: vi.fn().mockResolvedValue(syntheticDirectory) }

    const { result } = renderHook(() => useCommunities(fakeService))

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    expect(result.current.communities).toEqual(syntheticDirectory.communities)
    expect(result.current.totalMemberCount).toBe(syntheticDirectory.totalMemberCount)
    expect(result.current.upcomingEvents).toEqual(syntheticDirectory.upcomingEvents)
    expect(result.current.yourCommunities).toEqual(syntheticDirectory.yourCommunities)
  })
})
