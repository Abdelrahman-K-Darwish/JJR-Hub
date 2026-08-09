import { useState } from 'react'
import { AccessibilityPage } from './features/accessibility/AccessibilityPage'
import { SiteOwnersPage } from './features/site-owners/SiteOwnersPage'
import { UnderDevelopmentPage } from './features/under-development/UnderDevelopmentPage'

const PAGES = {
  'under-development': { label: 'Under Development', Component: UnderDevelopmentPage },
  accessibility: { label: 'Accessibility', Component: AccessibilityPage },
  'site-owners': { label: 'Site Owners', Component: SiteOwnersPage },
} as const

type PageKey = keyof typeof PAGES

/**
 * Dev-only page switcher — there is no router yet (out of scope for this conversion pass).
 * Swap this for real routes once one is introduced.
 */
function App() {
  const [page, setPage] = useState<PageKey>('under-development')
  const { Component } = PAGES[page]

  return (
    <div>
      <div className="fixed bottom-4 right-4 z-[400] flex gap-1.5 bg-navy-deep p-1.5 shadow-lg">
        {(Object.keys(PAGES) as PageKey[]).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setPage(key)}
            className={`font-mono text-[10px] px-2.5 py-1.5 transition-colors ${
              page === key ? 'bg-green text-white' : 'text-text-inverse-secondary hover:text-white'
            }`}
          >
            {PAGES[key].label}
          </button>
        ))}
      </div>
      <Component />
    </div>
  )
}

export default App
