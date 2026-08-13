import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { afterEach, beforeAll, describe, expect, it } from 'vitest'
import App from './App'

// jsdom doesn't implement IntersectionObserver; RevealOnScroll (used on several pages,
// including Community Detail) needs it to exist to mount. A minimal stub is enough here —
// these tests only assert on rendered content, not scroll-triggered reveal behavior.
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
})

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
}

describe('App routing', () => {
  it('renders Active Projects at /active-projects', () => {
    renderAt('/active-projects')

    expect(screen.getByRole('heading', { level: 1, name: 'Project Portfolio.' })).toBeTruthy()
  })

  it('renders the Home placeholder at /', () => {
    renderAt('/')

    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading.textContent).toContain('Home')
    expect(heading.textContent).toContain('is being built')
  })

  it('passes the dynamic segment through to the community detail route', async () => {
    renderAt('/communities/innovation-ai')

    expect(await screen.findByRole('heading', { level: 1, name: 'Innovation & AI' })).toBeTruthy()
  })

  it('formats the ?from= query param on /under-development into the placeholder heading', () => {
    renderAt('/under-development?from=test-feature')

    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading.textContent).toContain('Test Feature')
  })

  it('routes an unknown URL to the Under Development fallback without throwing', () => {
    renderAt('/this-page-does-not-exist')

    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading.textContent).toContain('is being built')
  })

  it('redirects the legacy /projects alias to Active Projects', () => {
    renderAt('/projects')

    expect(screen.getByRole('heading', { level: 1, name: 'Project Portfolio.' })).toBeTruthy()
  })
})

describe('internal Link navigation', () => {
  it('navigates to a community detail route when the community card link is clicked', async () => {
    renderAt('/communities')

    const links = await waitFor(() => {
      const found = screen.getAllByRole('link', { name: 'Innovation & AI' })
      expect(found.length).toBeGreaterThan(0)
      return found
    })
    fireEvent.click(links[0])

    expect(await screen.findByRole('heading', { level: 1, name: 'Innovation & AI' })).toBeTruthy()
  })

  it('navigates to /start-here when a context-bar Start Here link is clicked', () => {
    renderAt('/communities')

    fireEvent.click(screen.getByRole('link', { name: 'Start Here →' }))

    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading.textContent).toContain('Start Here')
  })
})
