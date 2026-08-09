import { useEffect, type ReactNode } from 'react'
import { CloseIcon } from './icons'

interface ModalProps {
  open: boolean
  onClose: () => void
  labelledBy: string
  children: ReactNode
  className?: string
}

/** Generic overlay dialog — owns Escape-to-close; the caller owns what's inside the panel. */
export function Modal({ open, onClose, labelledBy, children, className = '' }: ModalProps) {
  useEffect(() => {
    if (!open) return
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[500] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
    >
      <div className="absolute inset-0 bg-black/85 backdrop-blur-[2px]" onClick={onClose} aria-hidden="true" />
      <div
        className={`relative bg-white w-[80vw] max-w-[920px] max-h-[80vh] flex flex-col shadow-[0_30px_80px_rgba(0,0,0,0.4),0_10px_30px_rgba(0,0,0,0.3)] ${className}`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-[2] w-8 h-8 flex items-center justify-center bg-off-white border border-rule text-navy transition-all duration-200 hover:bg-navy hover:text-white hover:border-navy"
        >
          <CloseIcon size={14} strokeWidth={2} />
        </button>
        {children}
      </div>
    </div>
  )
}
