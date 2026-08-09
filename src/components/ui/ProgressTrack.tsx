export type ProgressTone = 'green' | 'amber' | 'navy'

interface ProgressTrackProps {
  /** Percentage 0–100, or null when there are no milestones to derive progress from (AP5). */
  value: number | null
  tone: ProgressTone
  className?: string
}

const FILL_CLASSES: Record<ProgressTone, string> = {
  green: 'bg-green shadow-[0_0_8px_rgba(76,187,23,0.9)]',
  amber: 'bg-amber shadow-[0_0_8px_rgba(232,168,56,0.9)]',
  navy: 'bg-navy-mid shadow-[0_0_8px_rgba(42,74,120,0.9)]',
}

const DOT_CLASSES: Record<ProgressTone, string> = {
  green: 'bg-green shadow-[0_0_10px_rgba(76,187,23,0.9)]',
  amber: 'bg-amber shadow-[0_0_10px_rgba(232,168,56,0.9)]',
  navy: 'bg-navy-mid shadow-[0_0_10px_rgba(42,74,120,0.9)]',
}

/** Thin progress bar with a pulsing lead dot. Renders nothing when value is null — AP5, guard the divide. */
export function ProgressTrack({ value, tone, className = '' }: ProgressTrackProps) {
  if (value == null) return null

  return (
    <div className={`h-[3px] bg-warm-gray shadow-[inset_0_1px_1px_rgba(15,35,64,0.06)] relative overflow-visible ${className}`}>
      <div className={`h-full relative ${FILL_CLASSES[tone]}`} style={{ width: `${value}%` }}>
        <span
          aria-hidden="true"
          className={`absolute top-1/2 -right-[3px] w-[7px] h-[7px] -translate-y-1/2 rounded-full animate-thread-pulse ${DOT_CLASSES[tone]}`}
        />
      </div>
    </div>
  )
}
