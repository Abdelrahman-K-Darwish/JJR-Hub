import type { ReactNode } from 'react'
import { ContentPage, type ContentPagePillar } from '../../components/ContentPage'
import { BookOpenIcon, FileIcon, FrameIcon, ImageFrameIcon, ShieldIcon, UsersIcon } from '../../components/ui'
import { CURRENT_USER, PROFILE_MENU_ITEMS } from '../../mocks/currentUser'
import { AI_ADOPTION_ROADMAP, AI_PRINCIPLES, AI_RESOURCES, type PillarIcon, type SidebarIcon } from '../../mocks/aiForGood'

const PILLAR_ICONS: Record<PillarIcon, ReactNode> = {
  frame: <FrameIcon size={20} strokeWidth={1.5} />,
  shield: <ShieldIcon size={20} strokeWidth={1.5} />,
  'book-open': <BookOpenIcon size={20} strokeWidth={1.5} />,
}

const SIDEBAR_ICONS: Record<SidebarIcon, ReactNode> = {
  frame: <ImageFrameIcon size={14} strokeWidth={1.8} />,
  file: <FileIcon size={14} strokeWidth={1.8} />,
  users: <UsersIcon size={14} strokeWidth={1.8} />,
  shield: <ShieldIcon size={14} strokeWidth={1.8} />,
}

export function AiForGoodPage() {
  const pillars: ContentPagePillar[] = AI_PRINCIPLES.map((p) => ({
    icon: PILLAR_ICONS[p.icon],
    title: p.title,
    description: p.description,
    linkLabel: p.linkLabel,
  }))

  return (
    <ContentPage
      user={CURRENT_USER}
      profileMenuItems={PROFILE_MENU_ITEMS}
      breadcrumbLabel="AI for Good for All"
      contextBarLabel="Responsible AI"
      heroKicker="AI for Good for All"
      heroTitle={
        <>
          Intelligence
          <br />
          With Integrity
        </>
      }
      heroDescription="JJR's approach to AI is equity-first and human-centred. We evaluate, deploy, and govern AI tools through a lens of accessibility, bias reduction, and meaningful impact — not hype cycles."
      heroGradient="linear-gradient(135deg,#4a1a3a_0%,#8B1A6A_40%,#1B365D_100%)"
      primaryCta={{ label: 'AI Ethics Framework →', href: '/under-development?from=ai-ethics-framework' }}
      secondaryCta={{ label: 'Innovation & AI CoP', href: '/communities' }}
      pillarsLabel="Our Principles"
      pillars={pillars}
      roadmapLabel="AI Adoption Roadmap"
      roadmapItems={AI_ADOPTION_ROADMAP}
      calloutText={
        <>
          AI at JJR is a tool, not a replacement. Every AI-assisted deliverable is reviewed by a human before it
          reaches a client. <a href="/how-we-work">See How We Work →</a>
        </>
      }
      sidebar={{
        title: 'AI Resources',
        eyebrow: 'Tools & Training',
        links: AI_RESOURCES.map((r) => ({ label: r.label, href: r.href, icon: SIDEBAR_ICONS[r.icon] })),
      }}
    />
  )
}
