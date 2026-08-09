export type PersonRole = 'consultant' | 'pm' | 'analyst' | 'leadership'
export type PersonStatus = 'available' | 'busy'

export interface Person {
  id: string
  href: string
  initials: string
  name: string
  title: string
  role: PersonRole
  tags: string[]
  status: PersonStatus
  sector: string
  expertise: string[]
  /** Precomputed lowercase search blob — name, title, expertise, sector. */
  searchText: string
}

/** Stand-in for a scoped `GET /api/directory` — firm-wide directory content (class A). */
export const PEOPLE: Person[] = [
  {
    id: 's-foster',
    href: '/my-profile',
    initials: 'SF',
    name: 'Sarah Foster',
    title: 'Senior Consultant',
    role: 'consultant',
    tags: ['onboarding-buddy'],
    status: 'available',
    sector: 'Federal',
    expertise: ['Strategy', 'Digital Transformation'],
    searchText: 'sarah foster senior consultant strategy digital transformation federal',
  },
  {
    id: 'd-laurent',
    href: '/my-profile?viewer=colleague&user=d-laurent',
    initials: 'DL',
    name: 'D. Laurent',
    title: 'AI Strategy Lead',
    role: 'consultant',
    tags: ['mentor'],
    status: 'available',
    sector: 'Gov',
    expertise: ['Responsible AI', 'Data Science'],
    searchText: 'd daniel laurent ai strategy lead responsible ai data science gov',
  },
  {
    id: 'r-thompson',
    href: '/my-profile?viewer=colleague&user=r-thompson',
    initials: 'RT',
    name: 'R. Thompson',
    title: 'EJ Policy Lead',
    role: 'consultant',
    tags: [],
    status: 'available',
    sector: 'State',
    expertise: ['Environmental Justice', 'Community Engagement'],
    searchText: 'r raheem thompson ej policy lead environmental justice community engagement state',
  },
  {
    id: 's-ahmed',
    href: '/my-profile?viewer=colleague&user=s-ahmed',
    initials: 'SA',
    name: 'S. Ahmed',
    title: 'Data Science Lead',
    role: 'analyst',
    tags: [],
    status: 'busy',
    sector: 'Federal',
    expertise: ['Analytics', 'Machine Learning'],
    searchText: 's sami ahmed data science lead analytics machine learning federal',
  },
  {
    id: 'm-kim',
    href: '/my-profile?viewer=colleague&user=m-kim',
    initials: 'MK',
    name: 'M. Kim',
    title: 'Machine Learning',
    role: 'analyst',
    tags: [],
    status: 'available',
    sector: 'Enterprise',
    expertise: ['NLP', 'Procurement Analytics'],
    searchText: 'm mark kim machine learning nlp procurement analytics enterprise',
  },
  {
    id: 'f-nakamura',
    href: '/my-profile?viewer=colleague&user=f-nakamura',
    initials: 'FN',
    name: 'F. Nakamura',
    title: 'PMO Lead',
    role: 'pm',
    tags: ['mentor'],
    status: 'busy',
    sector: 'Enterprise',
    expertise: ['Agile PM', 'Delivery Ops'],
    searchText: 'f fiona nakamura pmo lead agile pm delivery ops enterprise',
  },
]

export const ROLE_FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'consultant', label: 'Consultant' },
  { key: 'pm', label: 'PM' },
  { key: 'analyst', label: 'Analyst' },
  { key: 'leadership', label: 'Leadership' },
]

export const TAG_FILTERS = [
  { key: 'onboarding-buddy', label: 'Onboarding Buddy' },
  { key: 'mentor', label: 'Mentor' },
]

export const STATUS_FILTERS = [{ key: 'available', label: 'Available' }]
