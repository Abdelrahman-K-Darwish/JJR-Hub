import { renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import type { ProjectsPortfolio, UpcomingMilestone } from '../active-projects/activeProjects.types'
import { useHomeProjects } from './useHomeProjects'

function makeMilestone(overrides: Partial<UpcomingMilestone> = {}): UpcomingMilestone {
  return {
    id: 'm-1',
    projectHref: '/active-projects',
    day: '01',
    month: 'Jan',
    title: 'Synthetic milestone',
    note: 'Test',
    leadInitials: 'AB',
    leadName: 'A. B.',
    leadColor: 'green',
    ...overrides,
  }
}

describe('useHomeProjects', () => {
  it('transitions from loading to loaded', async () => {
    const portfolio: ProjectsPortfolio = {
      projects: [],
      counts: { active: 0, inReview: 0, wrapping: 0 },
      health: { buckets: [], avgCompletion: 0 },
    }
    const fakeService = {
      getPortfolio: vi.fn().mockResolvedValue(portfolio),
      getMilestones: vi.fn().mockResolvedValue([]),
    }

    const { result } = renderHook(() => useHomeProjects(fakeService))

    expect(result.current.isLoading).toBe(true)

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    expect(result.current.error).toBeNull()
    expect(result.current.projects).toEqual([])
  })

  it('a rejection from either call surfaces the hook error state, not a throw', async () => {
    const fakeService = {
      getPortfolio: vi.fn().mockRejectedValue(new Error('boom')),
      getMilestones: vi.fn().mockResolvedValue([]),
    }

    const { result } = renderHook(() => useHomeProjects(fakeService))

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    expect(result.current.error).toBe('boom')
    expect(result.current.projects).toEqual([])
  })

  /**
   * Structural assertion: proves the Home view-model's `projects` output excludes
   * `progress`/`health`/`href`/`links`/`teamOverflow`/`mine` — even though the fake
   * service's underlying `Project` objects here deliberately include all of them (they
   * exist upstream on the real `Project` type). This is not a claim that the service
   * withholds these fields; it proves only that Home's hook output strips them.
   */
  it('strips progress/health/href/links/teamOverflow/mine from its returned projects', async () => {
    const portfolio: ProjectsPortfolio = {
      projects: [
        {
          id: 'p-1',
          href: '/projects/p-1',
          clientLine: 'Synthetic Client · Testing',
          name: 'Synthetic Project',
          description: 'Exists only in this test.',
          status: 'active',
          progress: 42,
          health: 'on_track',
          dueLabel: 'Due: 1 Jan 2026',
          team: [],
          teamOverflow: 2,
          links: [{ label: 'Files', href: '/files' }],
          mine: true,
        },
      ],
      counts: { active: 1, inReview: 0, wrapping: 0 },
      health: { buckets: [], avgCompletion: 0 },
    }
    const fakeService = {
      getPortfolio: vi.fn().mockResolvedValue(portfolio),
      getMilestones: vi.fn().mockResolvedValue([]),
    }

    const { result } = renderHook(() => useHomeProjects(fakeService))

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    expect(result.current.projects).toHaveLength(1)
    const project = result.current.projects[0] as unknown as Record<string, unknown>
    expect(project).not.toHaveProperty('progress')
    expect(project).not.toHaveProperty('health')
    expect(project).not.toHaveProperty('href')
    expect(project).not.toHaveProperty('links')
    expect(project).not.toHaveProperty('teamOverflow')
    expect(project).not.toHaveProperty('mine')
    expect(project).toEqual({
      id: 'p-1',
      name: 'Synthetic Project',
      clientLine: 'Synthetic Client · Testing',
      description: 'Exists only in this test.',
      status: 'active',
      dueLabel: 'Due: 1 Jan 2026',
      team: [],
    })
  })

  it('operates only on the injected fake service data, never a broader/real source', async () => {
    const portfolio: ProjectsPortfolio = {
      projects: Array.from({ length: 2 }, (_, i) => ({
        id: `synthetic-${i}`,
        href: `/projects/synthetic-${i}`,
        clientLine: 'Synthetic Client · Testing',
        name: `Synthetic Project ${i}`,
        description: 'Exists only in this test.',
        status: 'active' as const,
        progress: null,
        health: 'on_track' as const,
        dueLabel: 'Due: 1 Jan 2026',
        team: [],
        teamOverflow: 0,
        links: [],
        mine: false,
      })),
      counts: { active: 2, inReview: 0, wrapping: 0 },
      health: { buckets: [], avgCompletion: 0 },
    }
    const fakeService = {
      getPortfolio: vi.fn().mockResolvedValue(portfolio),
      getMilestones: vi.fn().mockResolvedValue([]),
    }

    const { result } = renderHook(() => useHomeProjects(fakeService))

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    expect(result.current.projects.map((p) => p.id)).toEqual(['synthetic-0', 'synthetic-1'])
  })

  it('computes milestonesThisWeekCount only from the returned milestone set, within a 7-day window', async () => {
    const now = new Date()
    const inTwoDays = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000)
    const inThreeWeeks = new Date(now.getTime() + 21 * 24 * 60 * 60 * 1000)

    const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    const portfolio: ProjectsPortfolio = { projects: [], counts: { active: 0, inReview: 0, wrapping: 0 }, health: { buckets: [], avgCompletion: 0 } }
    const milestones = [
      makeMilestone({ id: 'soon', day: String(inTwoDays.getDate()).padStart(2, '0'), month: MONTHS[inTwoDays.getMonth()] }),
      makeMilestone({ id: 'far', day: String(inThreeWeeks.getDate()).padStart(2, '0'), month: MONTHS[inThreeWeeks.getMonth()] }),
    ]
    const fakeService = {
      getPortfolio: vi.fn().mockResolvedValue(portfolio),
      getMilestones: vi.fn().mockResolvedValue(milestones),
    }

    const { result } = renderHook(() => useHomeProjects(fakeService))

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    expect(result.current.milestonesThisWeekCount).toBe(1)
  })
})
