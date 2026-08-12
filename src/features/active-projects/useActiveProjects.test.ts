import { act, renderHook, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { PROJECTS } from '../../mocks/activeProjects'
import { activeProjectsService } from './activeProjectsService'
import type { Project } from './activeProjects.types'
import { useActiveProjects } from './useActiveProjects'

afterEach(() => {
  vi.restoreAllMocks()
})

describe('useActiveProjects', () => {
  it('transitions from loading to loaded with the full portfolio', async () => {
    const { result } = renderHook(() => useActiveProjects())

    expect(result.current.isLoading).toBe(true)

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    expect(result.current.error).toBeNull()
    expect(result.current.visibleProjects).toEqual(PROJECTS)
  })

  it('a service rejection reaches the hook error state', async () => {
    vi.spyOn(activeProjectsService, 'getPortfolio').mockRejectedValueOnce(new Error('boom'))

    const { result } = renderHook(() => useActiveProjects())

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    expect(result.current.error).toBe('boom')
    expect(result.current.visibleProjects).toEqual([])
  })

  it('filters only within the collection the service returned, never a broader set', async () => {
    // Deliberately NOT the full mock dataset — a restricted, custom subset the hook has
    // never seen before, so passing this test proves filtering can't be reaching back
    // into `PROJECTS` or any other broader source.
    const restrictedProjects: Project[] = [
      {
        id: 'restricted-1',
        href: '/projects/restricted-1',
        clientLine: 'Restricted Client A · Testing',
        name: 'Restricted Project One',
        description: 'A project that exists only in this test.',
        status: 'active',
        progress: 50,
        health: 'on_track',
        dueLabel: 'Due: 1 Jan 2026',
        team: [],
        teamOverflow: 0,
        links: [],
        mine: true,
      },
      {
        id: 'restricted-2',
        href: '/projects/restricted-2',
        clientLine: 'Restricted Client B · Testing',
        name: 'Restricted Project Two',
        description: 'A second project that exists only in this test.',
        status: 'review',
        progress: 20,
        health: 'needs_attention',
        dueLabel: 'Due: 2 Jan 2026',
        team: [],
        teamOverflow: 0,
        links: [],
        mine: false,
      },
      {
        id: 'restricted-3',
        href: '/projects/restricted-3',
        clientLine: 'Restricted Client C · Testing',
        name: 'Restricted Project Three',
        description: 'A third project that exists only in this test.',
        status: 'wrap',
        progress: null,
        health: 'on_track',
        dueLabel: 'Due: 3 Jan 2026',
        team: [],
        teamOverflow: 0,
        links: [],
        mine: true,
      },
    ]

    vi.spyOn(activeProjectsService, 'getPortfolio').mockResolvedValueOnce({
      projects: restrictedProjects,
      counts: { active: 1, inReview: 1, wrapping: 1 },
      health: { buckets: [], avgCompletion: 0 },
    })

    const { result } = renderHook(() => useActiveProjects())

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    // Default 'all' state contains exactly the returned subset.
    expect(result.current.visibleProjects).toEqual(restrictedProjects)

    // 'mine' narrows to only mine === true projects within that subset.
    act(() => {
      result.current.setFilter('mine')
    })
    expect(result.current.visibleProjects).toEqual(restrictedProjects.filter((project) => project.mine))

    // Switching back to 'all' restores exactly that subset — not the full mock dataset.
    act(() => {
      result.current.setFilter('all')
    })
    expect(result.current.visibleProjects).toEqual(restrictedProjects)

    // No project outside the returned subset can appear, under any filter.
    const restrictedIds = new Set(restrictedProjects.map((project) => project.id))
    for (const project of result.current.visibleProjects) {
      expect(restrictedIds.has(project.id)).toBe(true)
    }

    // A real project id from the full mock dataset must never leak in.
    expect(result.current.visibleProjects.some((project) => project.id === PROJECTS[0].id)).toBe(false)
  })
})
