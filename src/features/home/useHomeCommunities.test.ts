import { renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import type { CommunitiesDirectory } from '../communities/communities.types'
import { useHomeCommunities } from './useHomeCommunities'

describe('useHomeCommunities', () => {
  it('transitions from loading to loaded', async () => {
    const directory: CommunitiesDirectory = { communities: [], totalMemberCount: 0, upcomingEvents: [], yourCommunities: [] }
    const fakeService = { getDirectory: vi.fn().mockResolvedValue(directory) }

    const { result } = renderHook(() => useHomeCommunities(fakeService))

    expect(result.current.isLoading).toBe(true)

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    expect(result.current.error).toBeNull()
    expect(result.current.communities).toEqual([])
  })

  it('a service rejection surfaces the hook error state, not a throw', async () => {
    const fakeService = { getDirectory: vi.fn().mockRejectedValue(new Error('boom')) }

    const { result } = renderHook(() => useHomeCommunities(fakeService))

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    expect(result.current.error).toBe('boom')
    expect(result.current.communities).toEqual([])
  })

  /**
   * Structural assertion, correctly framed: this proves data-minimization in Home's own
   * view-model output, NOT authorization and NOT that sensitive data was never received by
   * this hook. The injected fake service deliberately returns `isMember`/`recentDiscussions`/
   * `topResources`/`keyExperts` populated with real values — exactly like the real
   * `communitiesService.getDirectory()` would — so this hook genuinely receives them before
   * mapping them away. Passing this test shows the hook's *returned* `communities` array
   * never carries those fields back out to callers such as `HomePage`.
   */
  it('excludes isMember/topResources/recentDiscussions/keyExperts from its returned communities', async () => {
    const directory: CommunitiesDirectory = {
      communities: [
        {
          slug: 'synthetic-community',
          name: 'Synthetic Community',
          icon: 'info',
          description: 'Exists only in this test.',
          memberCount: 12,
          postsThisWeek: 4,
          resourceCount: 3,
          steward: 'Test Steward',
          isMember: true,
          topResources: [{ label: 'Resource', href: '/resource', icon: 'file' }],
          recentDiscussions: [{ title: 'Sensitive thread', meta: 'meta', href: '/thread' }],
          keyExperts: [{ href: '/experts/1', initials: 'AB', background: 'Testing', name: 'A. B.', role: 'Expert' }],
        },
      ],
      totalMemberCount: 12,
      upcomingEvents: [],
      yourCommunities: [],
    }
    const fakeService = { getDirectory: vi.fn().mockResolvedValue(directory) }

    const { result } = renderHook(() => useHomeCommunities(fakeService))

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    expect(result.current.communities).toHaveLength(1)
    const community = result.current.communities[0] as unknown as Record<string, unknown>
    expect(community).not.toHaveProperty('isMember')
    expect(community).not.toHaveProperty('topResources')
    expect(community).not.toHaveProperty('recentDiscussions')
    expect(community).not.toHaveProperty('keyExperts')
    expect(community).toEqual({
      slug: 'synthetic-community',
      name: 'Synthetic Community',
      icon: 'info',
      description: 'Exists only in this test.',
      memberCount: 12,
    })
  })

  it('operates only on the injected fake service data, never a broader/real source', async () => {
    const directory: CommunitiesDirectory = {
      communities: Array.from({ length: 2 }, (_, i) => ({
        slug: `synthetic-${i}`,
        name: `Synthetic Community ${i}`,
        icon: 'globe' as const,
        description: 'Exists only in this test.',
        memberCount: 1,
        postsThisWeek: 0,
        resourceCount: 0,
        steward: 'Test Steward',
        isMember: false,
        topResources: [],
        recentDiscussions: [],
        keyExperts: [],
      })),
      totalMemberCount: 2,
      upcomingEvents: [],
      yourCommunities: [],
    }
    const fakeService = { getDirectory: vi.fn().mockResolvedValue(directory) }

    const { result } = renderHook(() => useHomeCommunities(fakeService))

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    expect(result.current.communities.map((c) => c.slug)).toEqual(['synthetic-0', 'synthetic-1'])
  })
})
