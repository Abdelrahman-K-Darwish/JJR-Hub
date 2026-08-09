export interface AccessibilityPractice {
  title: string
  description: string
}

export const ACCESSIBILITY_PRACTICES: AccessibilityPractice[] = [
  {
    title: 'Semantic HTML.',
    description: 'Real headings, real buttons, real landmarks — so screen readers can navigate every page reliably.',
  },
  {
    title: 'Keyboard navigation.',
    description: 'Every interactive element — nav links, dropdowns, modals, sliders, filters — works without a mouse.',
  },
  {
    title: 'Colour contrast.',
    description: 'Text meets 4.5:1 for body, 3:1 for large text. Our navy and green palette is tested, not just designed.',
  },
  {
    title: 'Reduced motion support.',
    description: 'Cursor spotlight, scroll reveals, and ambient breath animations respect prefers-reduced-motion.',
  },
  {
    title: 'Focus indicators.',
    description: 'Visible focus rings on every interactive element for keyboard and screen-reader users.',
  },
  {
    title: 'Alt text + ARIA.',
    description:
      'Icons have labels, dropdowns have aria-haspopup / aria-expanded, modals have role="dialog" and aria-modal.',
  },
]

export interface AccessibilityIssueReportField {
  label: string
}

export const ISSUE_REPORT_FIELDS: AccessibilityIssueReportField[] = [
  { label: 'What you were trying to do' },
  { label: "What happened (or didn't)" },
  { label: 'The page URL and, if comfortable, the assistive technology you use' },
]

export type QuickLinkIcon = 'file' | 'accommodation' | 'shield' | 'info'

export interface AccessibilityQuickLink {
  label: string
  href: string
  icon: QuickLinkIcon
}

export const ACCESSIBILITY_QUICK_LINKS: AccessibilityQuickLink[] = [
  { label: 'Report an Issue', href: '/under-development?from=report-an-issue', icon: 'file' },
  { label: 'Request Accommodation', href: '/under-development?from=request-accommodation', icon: 'accommodation' },
  { label: 'Site Owners', href: '/site-owners', icon: 'shield' },
  { label: 'How We Work', href: '/how-we-work', icon: 'info' },
]

export const STANDARDS_SUMMARY =
  "WCAG 2.1 Level AA. Section 508 for US federal contracts. Ongoing quarterly audits logged in the Hub's internal review cycle."
