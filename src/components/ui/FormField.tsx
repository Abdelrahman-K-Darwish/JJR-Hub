import type { ReactNode } from 'react'

interface FormFieldProps {
  label: string
  htmlFor?: string
  hint?: ReactNode
  children: ReactNode
  className?: string
}

/** Label + control + hint wrapper for admin/form surfaces. */
export function FormField({ label, htmlFor, hint, children, className = '' }: FormFieldProps) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="block font-mono text-[9.5px] font-semibold tracking-[1.6px] uppercase text-text-secondary mb-2">
        {label}
      </label>
      {children}
      {hint && <div className="font-body text-[11.5px] text-text-muted mt-1.5 leading-[1.5]">{hint}</div>}
    </div>
  )
}

export const CONTROL_CLASSES =
  'w-full px-3.5 py-[11px] bg-white border border-rule rounded-[8px] font-body text-[13.5px] text-navy transition-all duration-200 ease-smooth focus:outline-none focus:border-green focus:shadow-[0_0_0_3px_rgba(76,187,23,0.12)] placeholder:text-text-muted'
