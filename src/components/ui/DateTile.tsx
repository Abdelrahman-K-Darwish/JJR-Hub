interface DateTileProps {
  day: string
  month: string
  className?: string
}

/** Dark day-over-month date block used in milestone lists. */
export function DateTile({ day, month, className = '' }: DateTileProps) {
  return (
    <div
      className={`w-11 h-11 flex flex-col items-center justify-center shrink-0 bg-[linear-gradient(180deg,#17304f_0%,#0F2340_50%,#0b1c35_100%)] border border-black/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_1px_3px_rgba(15,35,64,0.15)] ${className}`}
    >
      <div className="font-mono text-[10px] font-bold text-white leading-none">{day}</div>
      <div className="font-mono text-[8px] text-text-inverse-secondary uppercase mt-0.5">{month}</div>
    </div>
  )
}
