import { describe, expect, it } from 'vitest'
import { COMMUNITIES, TOTAL_MEMBER_COUNT, UPCOMING_EVENTS, YOUR_COMMUNITIES } from '../../mocks/communities'
import { COMMUNITY_DETAILS } from '../../mocks/communityDetail'
import { communitiesMockAdapter } from './communitiesMockAdapter'

describe('communitiesMockAdapter', () => {
  it('getDirectory() resolves to the mock communities/member-count/events/your-communities, unchanged', async () => {
    const directory = await communitiesMockAdapter.getDirectory()

    expect(directory).toEqual({
      communities: COMMUNITIES,
      totalMemberCount: TOTAL_MEMBER_COUNT,
      upcomingEvents: UPCOMING_EVENTS,
      yourCommunities: YOUR_COMMUNITIES,
    })
  })

  it("getCommunityDetail('innovation-ai') resolves to the mock detail record", async () => {
    const detail = await communitiesMockAdapter.getCommunityDetail('innovation-ai')

    expect(detail).toEqual(COMMUNITY_DETAILS['innovation-ai'])
  })

  it('getCommunityDetail() resolves to null for an unknown slug', async () => {
    const detail = await communitiesMockAdapter.getCommunityDetail('does-not-exist')

    expect(detail).toBeNull()
  })
})
