import type { ProjectStatus, ProjectTeamMember } from '../active-projects/activeProjects.types'
import type { CommunityIconKey } from '../communities/communities.types'

/**
 * Home's own view-model shapes — presentation subsets of the Active Projects/Communities
 * domain types, not new domain types. Home does not own Project or Community data; these
 * interfaces exist only to describe what HomeProjectTile/HomeCommunityTile actually render.
 *
 * `progress`, `health`, `href`, `links`, `teamOverflow`, and `mine` are deliberately absent
 * from `HomeProjectTileData` — not because Active Projects doesn't own/return them, but
 * because the Home Projects slider excludes them (progress: OPEN per docs/specs/home.md's
 * Project-progress conflict; the rest: no project-detail route or quick-links on Home v1).
 *
 * `isMember`, `topResources`, `recentDiscussions`, and `keyExperts` are deliberately absent
 * from `HomeCommunityTileData` for the same reason — this is Home's own view-model output
 * being minimized, not a claim that `communitiesService.getDirectory()` withholds them.
 */
export interface HomeProjectTileData {
  id: string
  name: string
  clientLine: string
  description: string
  status: ProjectStatus
  dueLabel: string
  team: ProjectTeamMember[]
}

export interface HomeCommunityTileData {
  slug: string
  name: string
  icon: CommunityIconKey
  description: string
  memberCount: number
}
