import type { AppShellUser, ProfileMenuItem } from '../components/AppShell'

/** Stand-in for the identity the walking skeleton will resolve from Entra/OIDC (CLAUDE.md §4 step 0). */
export const CURRENT_USER: AppShellUser = {
  name: 'Sarah Foster',
  initials: 'SF',
  title: 'Consultant',
}

export const PROFILE_MENU_ITEMS: ProfileMenuItem[] = [
  { label: 'My Account', href: '/my-profile' },
  { label: 'Preferences', href: '/preferences' },
  { label: 'Sign Out', href: '/sign-out', tone: 'danger' },
]
