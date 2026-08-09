export interface FilterOption {
  key: string
  label: string
  /** Renders a vertical rule before this option — groups the trailing option apart. */
  dividerBefore?: boolean
}

interface FilterBarProps {
  label?: string
  options: FilterOption[]
  activeKey: string
  onChange: (key: string) => void
  className?: string
}

/** Single-select status/scope filter — client-side over an already-scoped set (CLAUDE.md class A). */
export function FilterBar({ label, options, activeKey, onChange, className = '' }: FilterBarProps) {
  return (
    <div className={`flex items-center gap-2 flex-wrap ${className}`} role="group" aria-label={label ?? 'Filter'}>
      {label && <div className="font-mono text-[9px] tracking-[2px] uppercase text-text-muted mr-2">{label}</div>}
      {options.map((option) => (
        <div key={option.key} className="flex items-center gap-2">
          {option.dividerBefore && <div className="w-px h-5 bg-rule mx-1" aria-hidden="true" />}
          <button
            type="button"
            aria-pressed={activeKey === option.key}
            onClick={() => onChange(option.key)}
            className={`font-mono text-[10px] font-medium tracking-[1.5px] uppercase px-3.5 py-[7px] border transition-all duration-[250ms] ease-smooth ${
              activeKey === option.key
                ? 'text-white border-navy-deep bg-[linear-gradient(180deg,#1a3554_0%,#0F2340_55%,#081425_100%)] shadow-[0_0_16px_rgba(76,187,23,0.25),inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-2px_0_#4CBB17,inset_0_-3px_10px_rgba(76,187,23,0.22)]'
                : 'text-text-secondary bg-white border-rule hover:text-navy hover:border-navy-mid'
            }`}
          >
            {option.label}
          </button>
        </div>
      ))}
    </div>
  )
}
