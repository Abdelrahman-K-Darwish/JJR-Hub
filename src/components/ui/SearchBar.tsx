import type { InputHTMLAttributes } from 'react'
import { SearchIcon } from './icons'

interface SearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Opt-in only — legacy's search-bar markup carries no keyboard-shortcut hint, and a
      default "⌘K" badge reads as a generic command-palette affordance the hub doesn't have. */
  shortcut?: string
}

/**
 * Presentational nav search field matching legacy's `.search-bar` treatment. It never executes
 * a search, calls a service, or navigates — global search is DEFERRED (D-010). No ⌘K badge, no
 * pill/rounded chrome.
 */
export function SearchBar({ shortcut, className = '', ...inputProps }: SearchBarProps) {
  return (
    <div className="flex items-center gap-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] px-3 h-[34px] w-full transition-all duration-300 ease-smooth focus-within:bg-[rgba(255,255,255,0.08)] focus-within:border-green focus-within:shadow-[0_0_12px_rgba(76,187,23,0.15)]">
      <SearchIcon size={14} strokeWidth={1.8} className="text-[rgba(255,255,255,0.4)] shrink-0" />
      <input
        type="text"
        className={`bg-transparent border-none outline-none flex-1 font-body text-[13px] text-white min-w-0 placeholder:text-[rgba(255,255,255,0.35)] ${className}`}
        {...inputProps}
      />
      {shortcut && <span className="font-mono text-[9px] text-[rgba(255,255,255,0.35)] tracking-wide shrink-0">{shortcut}</span>}
    </div>
  )
}
