import { cleanup, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest'
import { activeProjectsService } from '../active-projects/activeProjectsService'
import { communitiesService } from '../communities/communitiesService'
import { HomePage } from './HomePage'

beforeAll(() => {
  class IntersectionObserverStub {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  // @ts-expect-error -- test-environment stub, not a spec-compliant implementation
  globalThis.IntersectionObserver = IntersectionObserverStub
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

function renderHomePage() {
  return render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>,
  )
}

describe('HomePage', () => {
  it('renders a smoke-test heading with the current-time-based greeting', async () => {
    renderHomePage()

    const heading = await screen.findByRole('heading', { level: 1 })
    expect(heading.textContent).toMatch(/Good (morning|afternoon|evening)/)
  })

  it('keeps the Communities section and static sections rendering when Projects fails', async () => {
    vi.spyOn(activeProjectsService, 'getPortfolio').mockRejectedValueOnce(new Error('projects down'))

    renderHomePage()

    await waitFor(() => expect(screen.getByText('projects down')).toBeTruthy())

    // Communities section still loads independently.
    await screen.findByRole('heading', { level: 2, name: 'Communities' })
    // Static section still renders regardless of the async failure.
    expect(screen.getByText('Log Hours')).toBeTruthy()
  })

  it('keeps the Projects section and static sections rendering when Communities fails', async () => {
    vi.spyOn(communitiesService, 'getDirectory').mockRejectedValueOnce(new Error('communities down'))

    renderHomePage()

    await waitFor(() => expect(screen.getByText('communities down')).toBeTruthy())

    await screen.findByRole('heading', { level: 2, name: 'Your Projects' })
    expect(screen.getByText('Log Hours')).toBeTruthy()
  })

  it('never renders a progress percentage or progress bar', async () => {
    renderHomePage()

    await waitFor(() => expect(screen.queryByText(/loading projects/i)).toBeNull())

    expect(screen.queryByText(/%$/)).toBeNull()
  })

  it('renders Client Hub as a "not yet connected" stub, not a locked/restricted state', async () => {
    renderHomePage()

    await screen.findByText(/not yet connected/i)
    expect(screen.queryByText(/restricted/i)).toBeNull()
    expect(screen.queryByText(/access denied/i)).toBeNull()
    expect(screen.queryByText(/request access/i)).toBeNull()
    expect(screen.queryByText(/\blocked\b/i)).toBeNull()
  })

  it('links "View all projects" to /active-projects', async () => {
    renderHomePage()

    const link = await screen.findByRole('link', { name: 'View all projects →' })
    expect(link.getAttribute('href')).toBe('/active-projects')
  })

  it('does not render Compliance Hub, Past Deliverables, or a Reporting link', async () => {
    renderHomePage()

    await waitFor(() => expect(screen.queryByText(/loading projects/i)).toBeNull())

    expect(screen.queryByText(/compliance hub/i)).toBeNull()
    expect(screen.queryByText(/past deliverables/i)).toBeNull()
    expect(screen.queryByText(/reporting/i)).toBeNull()
  })
})
