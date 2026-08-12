import { Navigate, Route, Routes, useParams, useSearchParams } from 'react-router'
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
import { formatFeatureName } from './mocks/underDevelopment'

/**
 * `/communities/:slug` — thin route adapter. `CommunityDetailPage` already accepts an
 * optional `slug` prop; this just forwards the URL param so the page component itself
 * stays router-agnostic.
 */
function CommunityDetailRoute() {
  const { slug } = useParams()
  return <CommunityDetailPage slug={slug} />
}

/**
 * `/under-development?from=...` — thin route adapter. The mockup derived its "This
 * section" label from the `?from=` query param; `UnderDevelopmentPage` takes the
 * already-formatted name as a prop instead, so this is the one place that reads the
 * query string and calls the existing `formatFeatureName` helper.
 */
function UnderDevelopmentRoute() {
  const [params] = useSearchParams()
  const from = params.get('from')
  return <UnderDevelopmentPage featureName={from ? formatFeatureName(from) : undefined} />
}

/**
 * Route table only — no <BrowserRouter> here. `main.tsx` owns the router so tests can
 * wrap <App /> in a <MemoryRouter> instead.
 *
 * The five pages without a React implementation yet (Home, Start Here, My Profile,
 * Exec & Strategy, JEDI CAB) render the existing `UnderDevelopmentPage` stub with a
 * page-specific name — see docs/PROJECT-STATUS.md for why each one isn't built.
 *
 * Exec & Strategy (P-15, Class C/D, WF-010, D-004 OPEN) and JEDI CAB (P-19, D-015 OPEN)
 * are documented as restricted/decision-blocked destinations, not gated by any client-side
 * check — CLAUDE.md §6: frontend visibility is never authorization. The stub here is UX
 * behavior only.
 */
function App() {
  return (
    <Routes>
      <Route path="/" element={<UnderDevelopmentPage featureName="Home" />} />
      <Route path="/start-here" element={<UnderDevelopmentPage featureName="Start Here" />} />
      <Route path="/my-profile" element={<UnderDevelopmentPage featureName="My Profile" />} />
      <Route path="/active-projects" element={<ActiveProjectsPage />} />
      <Route path="/communities" element={<CommunitiesPage />} />
      <Route path="/communities/:slug" element={<CommunityDetailRoute />} />
      <Route path="/templates" element={<TemplatesPage />} />
      <Route path="/pmo" element={<PmoPage />} />
      <Route path="/how-we-work" element={<HowWeWorkPage />} />
      <Route path="/tool-guides" element={<ToolGuidesPage />} />
      <Route path="/accessibility" element={<AccessibilityPage />} />
      <Route path="/ai-for-good" element={<AiForGoodPage />} />
      <Route path="/consultant-directory" element={<ConsultantDirectoryPage />} />
      <Route path="/environmental-justice" element={<EnvironmentalJusticePage />} />
      {/* P-15 — Class C/D restricted, WF-010, D-004 OPEN. Placeholder only; no auth enforced. */}
      <Route path="/exec-strategy" element={<UnderDevelopmentPage featureName="Exec & Strategy" />} />
      <Route path="/under-development" element={<UnderDevelopmentRoute />} />
      <Route path="/vision-values" element={<VisionValuesPage />} />
      <Route path="/site-owners" element={<SiteOwnersPage />} />
      {/* P-19 — D-015 OPEN, "requires dedicated analysis before implementation." Placeholder only. */}
      <Route path="/jedi-cab" element={<UnderDevelopmentPage featureName="JEDI CAB" />} />
      <Route path="/admin-actions" element={<AdminActionsPage />} />
      {/* Backward-compatible aliases for the pre-correction nav hrefs (see App.test.tsx / prior report). */}
      <Route path="/projects" element={<Navigate to="/active-projects" replace />} />
      <Route path="/knowledge" element={<Navigate to="/templates" replace />} />
      <Route path="*" element={<Navigate to="/under-development" replace />} />
    </Routes>
  )
}

export default App
