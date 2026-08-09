export type AvatarColor = 'green' | 'navy' | 'navy-mid' | 'amber' | 'pink'

export interface AvatarStackMember {
  id: string
  initials: string
  color: AvatarColor
}

interface AvatarStackProps {
  /** Visible avatars only — the overflow count is a separate scoped aggregate, not derived here. */
  members: AvatarStackMember[]
  /** Team members not shown as an avatar, rendered as "+N". */
  overflowCount?: number
  className?: string
}

// Literal Tailwind class strings so the JIT scanner can find them (no template interpolation).
const AVATAR_COLOR_CLASSES: Record<AvatarColor, string> = {
  green: 'bg-green',
  navy: 'bg-navy',
  'navy-mid': 'bg-navy-mid',
  amber: 'bg-amber',
  pink: 'bg-pink',
}

/** Initials-only avatar stack (AP1 — no Graph photo call), first member gets the lead ring. */
export function AvatarStack({ members, overflowCount = 0, className = '' }: AvatarStackProps) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <div className="flex -space-x-1.5">
        {members.map((member, i) => (
          <div
            key={member.id}
            className={`w-6 h-6 border-[1.5px] border-white text-[8px] font-bold text-white flex items-center justify-center ${AVATAR_COLOR_CLASSES[member.color]} ${
              i === 0 ? 'shadow-[0_0_0_1.5px_#4CBB17,0_0_10px_rgba(76,187,23,0.35)]' : ''
            }`}
          >
            {member.initials}
          </div>
        ))}
      </div>
      {overflowCount > 0 && <span className="text-[10px] text-text-muted font-mono">+ {overflowCount}</span>}
    </div>
  )
}
