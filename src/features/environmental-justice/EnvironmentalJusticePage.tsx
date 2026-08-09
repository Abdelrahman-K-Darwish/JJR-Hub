import type { ReactNode } from 'react'
import { ContentPage, type ContentPagePillar } from '../../components/ContentPage'
import { ActivityIcon, FileIcon, GlobeIcon, UsersIcon } from '../../components/ui'
import { CURRENT_USER, PROFILE_MENU_ITEMS } from '../../mocks/currentUser'
import { EJ_APPROACH, EJ_PROCESS, EJ_RESOURCES, type PillarIcon, type SidebarIcon } from '../../mocks/environmentalJustice'

const PILLAR_ICONS: Record<PillarIcon, ReactNode> = {
  globe: <GlobeIcon size={20} strokeWidth={1.5} />,
  users: <UsersIcon size={20} strokeWidth={1.5} />,
  activity: <ActivityIcon size={20} strokeWidth={1.5} />,
}

const SIDEBAR_ICONS: Record<SidebarIcon, ReactNode> = {
  file: <FileIcon size={14} strokeWidth={1.8} />,
  users: <UsersIcon size={14} strokeWidth={1.8} />,
  activity: <ActivityIcon size={14} strokeWidth={1.8} />,
}

export function EnvironmentalJusticePage() {
  const pillars: ContentPagePillar[] = EJ_APPROACH.map((p) => ({
    icon: PILLAR_ICONS[p.icon],
    title: p.title,
    description: p.description,
    linkLabel: p.linkLabel,
  }))

  return (
    <ContentPage
      user={CURRENT_USER}
      profileMenuItems={PROFILE_MENU_ITEMS}
      breadcrumbLabel="Environmental Justice"
      contextBarLabel="Practice Area"
      heroKicker="Environmental Justice"
      heroTitle={
        <>
          Justice Starts
          <br />
          With Data
        </>
      }
      heroDescription="JJR's Environmental Justice practice brings rigour to community impact assessment. We use EJ40 methodology, equity scorecards, and community-driven frameworks to ensure that infrastructure, policy, and procurement decisions serve the people most affected."
      // Mid-stop darkened from the mockup's #2D7D00 to #1F5800 — the original only clears
      // 2.9:1 for light text (fails WCAG AA's 4.5:1), verified with scripts/contrast-check.py.
      heroGradient="linear-gradient(135deg,#1a3a1a_0%,#1F5800_40%,#1B365D_100%)"
      primaryCta={{ label: 'View EJ Toolkit →', href: '/under-development?from=ej-toolkit' }}
      secondaryCta={{ label: 'Equity & Impact CoP', href: '/communities' }}
      pillarsLabel="Our Approach"
      pillars={pillars}
      roadmapLabel="How We Apply EJ"
      roadmapItems={EJ_PROCESS}
      calloutText={
        <>
          Every JJR engagement that touches infrastructure, transit, housing, or environmental policy runs through
          this process. No exceptions. <a href="/how-we-work">See How We Work →</a>
        </>
      }
      sidebar={{
        title: 'EJ Resources',
        eyebrow: 'Toolkits & Guides',
        links: EJ_RESOURCES.map((r) => ({ label: r.label, href: r.href, icon: SIDEBAR_ICONS[r.icon] })),
      }}
    />
  )
}
