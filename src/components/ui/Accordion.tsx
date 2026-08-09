import { useState, type ReactNode } from 'react'
import { ChevronDownIcon } from './icons'

export interface AccordionEntry {
  id: string
  question: ReactNode
  answer: ReactNode
}

interface AccordionProps {
  items: AccordionEntry[]
  /** Item id open by default. */
  defaultOpenId?: string
  className?: string
}

/** Single-open FAQ accordion — clicking an item closes any other open item. */
export function Accordion({ items, defaultOpenId, className = '' }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? null)

  return (
    <div className={`bg-white border border-rule ${className}`}>
      {items.map((item, i) => {
        const isOpen = openId === item.id
        return (
          <div
            key={item.id}
            className={`transition-colors duration-[250ms] hover:bg-[#FBFAF6] ${i < items.length - 1 ? 'border-b border-rule-light' : ''} ${
              isOpen ? 'bg-[linear-gradient(180deg,#FBFAF6_0%,#ffffff_100%)]' : ''
            }`}
          >
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between px-7 py-5 text-left"
            >
              <span className="font-display text-[0.95rem] font-bold text-navy pr-4">{item.question}</span>
              <ChevronDownIcon
                size={14}
                strokeWidth={1.8}
                className={`shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-green' : 'text-text-muted'}`}
              />
            </button>
            <div
              className="overflow-hidden transition-[max-height] duration-[400ms] ease-smooth"
              style={{ maxHeight: isOpen ? '400px' : '0' }}
            >
              <div className="px-7 pb-5 text-[13px] text-text-secondary leading-relaxed">{item.answer}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
