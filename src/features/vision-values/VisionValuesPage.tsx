import type { ReactNode } from 'react'
import { ContentPage, type ContentPagePillar } from '../../components/ContentPage'
import { ActivityIcon, FileIcon, InfoIcon, ShieldIcon, UsersIcon } from '../../components/ui'
import { CURRENT_USER, PROFILE_MENU_ITEMS } from '../../mocks/currentUser'
import {
  FIRM_DOCUMENTS,
  FIRM_MILESTONES,
  VISION_VALUES_PILLARS,
  type PillarIcon,
  type SidebarIcon,
} from '../../mocks/visionValues'

const PILLAR_ICONS: Record<PillarIcon, ReactNode> = {
  shield: <ShieldIcon size={20} strokeWidth={1.5} />,
  info: <InfoIcon size={20} strokeWidth={1.5} />,
  file: <FileIcon size={20} strokeWidth={1.5} />,
}

const SIDEBAR_ICONS: Record<SidebarIcon, ReactNode> = {
  activity: <ActivityIcon size={14} strokeWidth={1.8} />,
  shield: <ShieldIcon size={14} strokeWidth={1.8} />,
  users: <UsersIcon size={14} strokeWidth={1.8} />,
  file: <FileIcon size={14} strokeWidth={1.8} />,
}

export function VisionValuesPage() {
  const pillars: ContentPagePillar[] = VISION_VALUES_PILLARS.map((p) => ({
    icon: PILLAR_ICONS[p.icon],
    title: p.title,
    description: p.description,
    linkLabel: p.linkLabel,
  }))

  return (
    <ContentPage
      user={CURRENT_USER}
      profileMenuItems={PROFILE_MENU_ITEMS}
      breadcrumbLabel="Vision & Values"
      contextBarLabel="Firm Identity"
      heroKicker="Vision & Values"
      heroTitle={
        <>
          Built to Last,
          <br />
          Built to Lead
        </>
      }
      heroDescription="JJR exists to prove that equity-centred consulting is better consulting. These aren't poster values — they're operating principles that shape every decision, every engagement, every hire."
      heroGradient="linear-gradient(135deg,#0F2340_0%,#1B365D_50%,#2A4A78_100%)"
      primaryCta={{ label: 'How We Work →', href: '/how-we-work' }}
      secondaryCta={{ label: 'Firm Strategy', href: '/exec-strategy' }}
      pillarsLabel="What We Stand For"
      pillars={pillars}
      roadmapLabel="Firm Milestones"
      roadmapItems={FIRM_MILESTONES}
      calloutText={
        <>
          These values are reviewed annually by the full team. If they don&rsquo;t match reality, that&rsquo;s a
          conversation worth having. <a href="/how-we-work">See How We Work →</a>
        </>
      }
      sidebar={{
        title: 'Firm Documents',
        eyebrow: 'Identity & Strategy',
        links: FIRM_DOCUMENTS.map((r) => ({ label: r.label, href: r.href, icon: SIDEBAR_ICONS[r.icon] })),
      }}
    />
  )
}
