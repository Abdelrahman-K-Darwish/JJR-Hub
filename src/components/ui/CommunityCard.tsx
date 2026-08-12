import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { AvatarChip } from './AvatarChip'
import { DiscussionThread } from './DiscussionThread'
import { ResourceLink } from './ResourceLink'

export interface CommunityCardResource {
  label: string
  href: string
  icon: ReactNode
}

export interface CommunityCardDiscussion {
  title: string
  meta: string
  href: string
}

export interface CommunityCardExpert {
  href: string
  initials: string
  background: string
  name: string
  role: string
}

interface CommunityCardProps {
  href: string
  icon: ReactNode
  name: string
  description: string
  memberCountLabel: string
  postsLabel: string
  resourcesLabel: string
  steward: string
  joinHref: string
  topResources: CommunityCardResource[]
  /**
   * Undefined when the viewer isn't a member — discussion previews are class C (D14),
   * omitted server-side rather than rendered and hidden. The column shows a join prompt instead.
   */
  recentDiscussions?: CommunityCardDiscussion[]
  keyExperts: CommunityCardExpert[]
  className?: string
}

/** Community summary card — the repeating unit on the Communities directory (3× reuse). */
export function CommunityCard({
  href,
  icon,
  name,
  description,
  memberCountLabel,
  postsLabel,
  resourcesLabel,
  steward,
  joinHref,
  topResources,
  recentDiscussions,
  keyExperts,
  className = '',
}: CommunityCardProps) {
  return (
    <div className={`group relative bg-white border border-rule overflow-hidden transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:border-navy-mid hover:shadow-[0_8px_24px_rgba(27,54,93,0.10)] ${className}`}>
      <span
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-[2px] bg-green shadow-[0_0_10px_rgba(76,187,23,0.45)] origin-left scale-x-0 transition-transform duration-[550ms] ease-smooth group-hover:scale-x-100"
      />

      <div className="px-7 pt-7 pb-0">
        <div className="flex items-start gap-4 mb-5">
          <div className="w-14 h-14 flex items-center justify-center shrink-0 bg-green/[0.08] border border-green/[0.28] shadow-[0_0_12px_rgba(76,187,23,0.12)] text-green-dark">
            {icon}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1.5">
              <Link to={href} className="font-display text-[1.3rem] font-bold text-navy tracking-tight hover:text-green transition-colors">
                {name}
              </Link>
              <div className="flex items-center gap-1.5 font-mono text-[9px] text-text-muted tracking-[1px] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse shadow-[0_0_6px_rgba(76,187,23,0.6)]" aria-hidden="true" />
                Active
              </div>
            </div>
            <div className="text-[13px] text-text-secondary leading-[1.65] max-w-[600px]">{description}</div>
          </div>
          <a
            href={joinHref}
            className="font-body text-[11px] font-bold px-3.5 py-1.5 shrink-0 bg-green/[0.08] border border-green/[0.35] text-green-dark transition-all duration-300 ease-smooth hover:bg-green hover:border-green hover:text-white hover:shadow-[0_0_18px_rgba(76,187,23,0.35)]"
          >
            Join
          </a>
        </div>

        <div className="flex items-center gap-6 py-3 border-t border-rule-light max-md:flex-wrap max-md:gap-3">
          <span className="font-mono text-[10px] text-text-muted tracking-wide">{memberCountLabel}</span>
          <span className="font-mono text-[10px] text-text-muted tracking-wide">{postsLabel}</span>
          <span className="font-mono text-[10px] text-text-muted tracking-wide">{resourcesLabel}</span>
          <div className="ml-auto text-[11px] text-text-muted">
            Steward: <strong className="text-navy font-semibold">{steward}</strong>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 max-md:grid-cols-1 border-t border-rule-light">
        <div className="p-5 border-r border-rule-light max-md:border-r-0 max-md:border-b">
          <div className="font-mono text-[9px] tracking-[1.5px] uppercase text-green-dark font-medium mb-3">Top Resources</div>
          {topResources.map((resource) => (
            <ResourceLink key={resource.label} href={resource.href} icon={resource.icon} title={resource.label} />
          ))}
        </div>

        <div className="p-5 border-r border-rule-light max-md:border-r-0 max-md:border-b">
          <div className="font-mono text-[9px] tracking-[1.5px] uppercase text-navy font-medium mb-3">Recent Discussions</div>
          {recentDiscussions ? (
            recentDiscussions.map((thread) => <DiscussionThread key={thread.title} compact href={thread.href} title={thread.title} meta={thread.meta} />)
          ) : (
            <p className="text-[11.5px] text-text-muted leading-relaxed">
              <a href={joinHref} className="text-green-dark font-semibold hover:text-green transition-colors">
                Join this community
              </a>{' '}
              to see recent discussions.
            </p>
          )}
        </div>

        <div className="p-5">
          <div className="font-mono text-[9px] tracking-[1.5px] uppercase text-pink font-medium mb-3">Key Experts</div>
          {keyExperts.map((expert) => (
            <AvatarChip
              key={expert.name}
              href={expert.href}
              initials={expert.initials}
              background={expert.background}
              name={expert.name}
              subtitle={expert.role}
              size="sm"
              className="py-2 px-2 -mx-2 hover:bg-off-white transition-colors"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
