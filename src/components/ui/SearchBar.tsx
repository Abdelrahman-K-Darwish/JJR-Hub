import type { InputHTMLAttributes } from 'react'
import { SearchIcon } from './icons'

interface SearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
  shortcut?: string
}

/** Nav/hero search field with the focus-glow treatment from the mockups. */
export function SearchBar({ shortcut = '⌘K', className = '', ...inputProps }: SearchBarProps) {
  return (
    <div className="flex items-center gap-2 bg-white/5 border border-white/[0.07] px-3.5 h-[34px] min-w-[260px] transition-all duration-300 hover:bg-white/[0.08] hover:border-white/[0.14] focus-within:bg-white/[0.08] focus-within:border-green focus-within:shadow-[0_0_12px_rgba(76,187,23,0.15)]">
      <SearchIcon size={12} strokeWidth={1.6} className="text-white/25" />
      <input
        type="text"
        className={`bg-transparent border-none outline-none flex-1 font-body text-xs text-white min-w-0 placeholder:text-white/[0.22] ${className}`}
        {...inputProps}
      />
      {shortcut && (
        <span className="font-mono text-[9px] text-white/[0.12] tracking-wide shrink-0">{shortcut}</span>
      )}
    </div>
  )
}
