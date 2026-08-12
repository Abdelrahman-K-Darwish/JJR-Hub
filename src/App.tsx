import { useState } from 'react'
import { AccessibilityPage } from './features/accessibility/AccessibilityPage'
import { ActiveProjectsPage } from './features/active-projects/ActiveProjectsPage'
import { AdminActionsPage } from './features/admin-actions/AdminActionsPage'
import { AiForGoodPage } from './features/ai-for-good/AiForGoodPage'
import { CommunitiesPage } from './features/communities/CommunitiesPage'
import { CommunityDetailPage } from './features/community-detail/CommunityDetailPage'
import { ConsultantDirectoryPage } from './features/consultant-directory/ConsultantDirectoryPage'
import { EnvironmentalJusticePage } from './features/environmental-justice/EnvironmentalJusticePage'
import { HowWeWorkPage } from './features/how-we-work/HowWeWorkPage'
import { PmoPage } from './features/pmo/PmoPage'
import { SiteOwnersPage } from './features/site-owners/SiteOwnersPage'
import { TemplatesPage } from './features/templates/TemplatesPage'
import { ToolGuidesPage } from './features/tool-guides/ToolGuidesPage'
import { UnderDevelopmentPage } from './features/under-development/UnderDevelopmentPage'
import { VisionValuesPage } from './features/vision-values/VisionValuesPage'

const PAGES = {
  'active-projects': { label: 'Active Projects', Component: ActiveProjectsPage },
  communities: { label: 'Communities', Component: CommunitiesPage },
  'community-detail': { label: 'Community Detail', Component: CommunityDetailPage },
  'consultant-directory': { label: 'Consultant Directory', Component: ConsultantDirectoryPage },
  templates: { label: 'Templates', Component: TemplatesPage },
  'tool-guides': { label: 'Tool Guides', Component: ToolGuidesPage },
  'how-we-work': { label: 'How We Work', Component: HowWeWorkPage },
  pmo: { label: 'PMO', Component: PmoPage },
  'admin-actions': { label: 'Admin Actions', Component: AdminActionsPage },
  'under-development': { label: 'Under Development', Component: UnderDevelopmentPage },
  accessibility: { label: 'Accessibility', Component: AccessibilityPage },
  'site-owners': { label: 'Site Owners', Component: SiteOwnersPage },
  'vision-values': { label: 'Vision & Values', Component: VisionValuesPage },
  'ai-for-good': { label: 'AI for Good', Component: AiForGoodPage },
  'environmental-justice': { label: 'Environmental Justice', Component: EnvironmentalJusticePage },
} as const

type PageKey = keyof typeof PAGES

/**
 * Dev-only page switcher — there is no router yet (out of scope for this conversion pass).
 * Swap this for real routes once one is introduced.
 */
function App() {
  const [page, setPage] = useState<PageKey>('active-projects')
  const { Component } = PAGES[page]

  return (
    <div>
      <div className="fixed bottom-4 right-4 z-[400] flex flex-wrap justify-end gap-1.5 bg-navy-deep p-1.5 shadow-lg max-w-[280px]">
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
