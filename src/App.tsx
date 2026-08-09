import { AppShell } from './components/AppShell'

const CURRENT_USER = { name: 'Sarah Foster', initials: 'SF', title: 'Consultant' }

const PROFILE_MENU_ITEMS = [
  { label: 'My Account', href: '/my-profile' },
  { label: 'Preferences', href: '/preferences' },
  { label: 'Sign Out', href: '/sign-out', tone: 'danger' as const },
]

function App() {
  return (
    <AppShell
      user={CURRENT_USER}
      profileMenuItems={PROFILE_MENU_ITEMS}
      breadcrumbs={[{ label: 'Home' }]}
    >
      <p className="font-body text-sm text-text-secondary">
        Phase 0 foundation — AppShell and shared primitives are wired up. Page conversions start next.
      </p>
    </AppShell>
  )
}

export default App
