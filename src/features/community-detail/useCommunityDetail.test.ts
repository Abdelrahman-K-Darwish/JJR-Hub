import { renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import type { CommunityDetail } from './communityDetail.types'
import { useCommunityDetail } from './useCommunityDetail'

const communityA: CommunityDetail = {
  slug: 'community-a',
  name: 'Community A',
  iconKey: 'info',
  activityLabel: 'Active',
  description: 'A test community.',
  memberCount: 1,
  postsPerWeek: 1,
  resourceCount: 1,
  steward: { initials: 'AA', background: '#000', name: 'A. A.' },
  about: [],
  members: [],
  moreMembersCount: 0,
  resources: [],
  discussions: [],
  events: [],
  keyFacts: [],
  related: [],
}

const communityB: CommunityDetail = { ...communityA, slug: 'community-b', name: 'Community B' }

describe('useCommunityDetail', () => {
  it('transitions from loading to loaded for a known slug', async () => {
    const fakeService = { getCommunityDetail: vi.fn().mockResolvedValue(communityA) }

    const { result } = renderHook(() => useCommunityDetail('community-a', fakeService))

    expect(result.current.isLoading).toBe(true)

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    expect(result.current.error).toBeNull()
    expect(result.current.community).toEqual(communityA)
  })

  it('an unknown slug resolves to a not-found state, not an error', async () => {
    const fakeService = { getCommunityDetail: vi.fn().mockResolvedValue(null) }

    const { result } = renderHook(() => useCommunityDetail('unknown-slug', fakeService))

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    expect(result.current.community).toBeNull()
    expect(result.current.error).toBeNull()
  })

  it('a service rejection sets error and keeps community null', async () => {
    const fakeService = { getCommunityDetail: vi.fn().mockRejectedValue(new Error('boom')) }

    const { result } = renderHook(() => useCommunityDetail('community-a', fakeService))

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    expect(result.current.error).toBe('boom')
    expect(result.current.community).toBeNull()
  })

  it('a slug change triggers a new call to the service with the new slug', async () => {
    const fakeService = { getCommunityDetail: vi.fn().mockResolvedValue(communityA) }

    const { rerender } = renderHook(({ slug }) => useCommunityDetail(slug, fakeService), {
      initialProps: { slug: 'community-a' },
    })

    await waitFor(() => expect(fakeService.getCommunityDetail).toHaveBeenCalledTimes(1))
    expect(fakeService.getCommunityDetail).toHaveBeenCalledWith('community-a')

    rerender({ slug: 'community-b' })

    await waitFor(() => expect(fakeService.getCommunityDetail).toHaveBeenCalledTimes(2))
    expect(fakeService.getCommunityDetail).toHaveBeenLastCalledWith('community-b')
  })

  it('does not expose stale detail data while the new slug is loading', async () => {
    let resolveB: (value: CommunityDetail) => void = () => {}
    const pendingB = new Promise<CommunityDetail>((resolve) => {
      resolveB = resolve
    })

    const fakeService = {
      getCommunityDetail: vi.fn((slug: string) => (slug === 'community-a' ? Promise.resolve(communityA) : pendingB)),
    }

    const { result, rerender } = renderHook(({ slug }) => useCommunityDetail(slug, fakeService), {
      initialProps: { slug: 'community-a' },
    })

    await waitFor(() => expect(result.current.isLoading).toBe(false))
    expect(result.current.community).toEqual(communityA)

    rerender({ slug: 'community-b' })

    // Immediately after the slug change, before B's promise resolves: no stale A data, and loading.
    expect(result.current.isLoading).toBe(true)
    expect(result.current.community).toBeNull()

    resolveB(communityB)

    await waitFor(() => expect(result.current.isLoading).toBe(false))
    expect(result.current.community).toEqual(communityB)
  })
})
