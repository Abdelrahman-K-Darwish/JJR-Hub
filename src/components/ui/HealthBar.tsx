export type HealthTone = 'green' | 'amber' | 'pink'

export interface HealthBucket {
  label: string
  count: number
  tone: HealthTone
}

interface HealthBarProps {
  title?: string
  eyebrow?: string
  /** Three buckets — On Track / Needs Attention / At Risk (AP6). Widths are scaled to their sum. */
  buckets: HealthBucket[]
  avgCompletion: number
  className?: string
}

const BAR_CLASSES: Record<HealthTone, string> = {
  green: 'bg-green shadow-[0_0_6px_rgba(76,187,23,0.5)]',
  amber: 'bg-amber shadow-[0_0_6px_rgba(232,168,56,0.45)]',
  pink: 'bg-pink',
}

const COUNT_CLASSES: Record<HealthTone, string> = {
  green: 'text-green [text-shadow:0_0_6px_rgba(76,187,23,0.5)]',
  amber: 'text-amber [text-shadow:0_0_6px_rgba(232,168,56,0.5)]',
  pink: 'text-pink',
}

/** Portfolio health roll-up — computed from overdue milestones (AP6), never stored (AP7). */
export function HealthBar({ title = 'Portfolio Health', eyebrow = 'This Quarter', buckets, avgCompletion, className = '' }: HealthBarProps) {
  const total = buckets.reduce((sum, b) => sum + b.count, 0)

  return (
    <div
      className={`relative bg-[linear-gradient(180deg,#17304f_0%,#0F2340_45%,#0b1c35_100%)] border border-white/[0.04] border-t-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_8px_24px_rgba(0,0,0,0.20),0_2px_6px_rgba(0,0,0,0.12)] ${className}`}
    >
      <div className="px-6 py-5 border-b border-white/[0.06]">
        <div className="font-display text-[0.95rem] font-bold text-white tracking-tight">{title}</div>
        <div className="font-mono text-[9px] tracking-[1.5px] uppercase text-green/80 font-medium mt-1">{eyebrow}</div>
      </div>
      <div className="p-5 flex flex-col gap-4">
        {buckets.map((bucket) => (
          <div key={bucket.label}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] text-text-inverse-secondary">{bucket.label}</span>
              <span className={`font-mono text-[10px] font-semibold ${COUNT_CLASSES[bucket.tone]}`}>
                {bucket.count} project{bucket.count === 1 ? '' : 's'}
              </span>
            </div>
            <div className="h-[3px] bg-white/[0.06] overflow-hidden shadow-[inset_0_1px_1px_rgba(0,0,0,0.2)]">
              <div className={`h-full ${BAR_CLASSES[bucket.tone]}`} style={{ width: total > 0 ? `${(bucket.count / total) * 100}%` : '0%' }} />
            </div>
          </div>
        ))}
        <div className="pt-3 border-t border-white/[0.06] text-[11px] text-text-inverse-secondary font-mono">
          Avg. completion <strong className="text-white font-semibold">{avgCompletion}%</strong>
        </div>
      </div>
    </div>
  )
}
