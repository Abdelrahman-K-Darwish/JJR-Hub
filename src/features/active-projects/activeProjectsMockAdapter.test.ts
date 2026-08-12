import { describe, expect, it } from 'vitest'
import { PORTFOLIO_HEALTH, PROJECTS, PROJECT_COUNTS, UPCOMING_MILESTONES } from '../../mocks/activeProjects'
import { activeProjectsMockAdapter } from './activeProjectsMockAdapter'

describe('activeProjectsMockAdapter', () => {
  it('getPortfolio() resolves to the mock projects/counts/health, unchanged', async () => {
    const portfolio = await activeProjectsMockAdapter.getPortfolio()

    expect(portfolio).toEqual({
      projects: PROJECTS,
      counts: PROJECT_COUNTS,
      health: PORTFOLIO_HEALTH,
    })
  })

  it('getMilestones() resolves to the mock milestone data', async () => {
    const milestones = await activeProjectsMockAdapter.getMilestones()

    expect(milestones).toEqual(UPCOMING_MILESTONES)
  })
})
