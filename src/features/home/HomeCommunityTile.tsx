import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { BarChartIcon, GlobeIcon, InfoIcon } from '../../components/ui'
import type { CommunityIconKey } from '../communities/communities.types'
import type { HomeCommunityTileData } from './home.types'

const COMMUNITY_ICONS: Record<CommunityIconKey, ReactNode> = {
  info: <InfoIcon size={20} strokeWidth={1.5} />,
  globe: <GlobeIcon size={20} strokeWidth={1.5} />,
  'bar-chart': <BarChartIcon size={20} strokeWidth={1.5} />,
}

interface HomeCommunityTileProps {
  community: HomeCommunityTileData
  className?: string
}

/**
 * Home's compact community summary — deliberately not `CommunityCard`. No join button, no
 * resources list, no discussions list, no key experts. Links to the existing, already-registered
 * `/communities/:slug` detail route only.
 */
export function HomeCommunityTile({ community, className = '' }: HomeCommunityTileProps) {
  return (
    <Link to={`/communities/${community.slug}`} className={`comm block ${className}`}>
      <div className="comm__header">
        <span className="comm__icon" aria-hidden="true">
          {COMMUNITY_ICONS[community.icon]}
        </span>
        <div className="min-w-0 flex-1">
          <div className="comm__name truncate">{community.name}</div>
          <span className="comm__members">{community.memberCount} members</span>
        </div>
      </div>
      <div className="comm__body">
        <p className="comm__desc line-clamp-2">{community.description}</p>
      </div>
      <div className="comm__footer">
        <span className="comm__activity">
          <span className="comm__dot" aria-hidden="true" />
          Active community
        </span>
        <span aria-hidden="true" className="comm__cta">
          View →
        </span>
      </div>
    </Link>
  )
}
