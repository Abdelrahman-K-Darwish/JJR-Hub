import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import { AppShell } from '../../components/AppShell'
import { FilterBar, HeroGrain, HeroKicker, RevealOnScroll } from '../../components/ui'
import { CURRENT_USER, PROFILE_MENU_ITEMS } from '../../mocks/currentUser'
import { PEOPLE, ROLE_FILTERS, STATUS_FILTERS, TAG_FILTERS } from '../../mocks/consultantDirectory'

export function ConsultantDirectoryPage() {
  const [query, setQuery] = useState('')
  const [role, setRole] = useState('all')
  const [tag, setTag] = useState<string | null>(null)
  const [status, setStatus] = useState<string | null>(null)

  const results = useMemo(() => {
    const q = query.toLowerCase().trim()
    return PEOPLE.filter((person) => {
      const roleOk = role === 'all' || person.role === role
      const tagOk = !tag || person.tags.includes(tag)
      const statusOk = !status || person.status === status
      const searchOk = !q || person.searchText.includes(q)
      return roleOk && tagOk && statusOk && searchOk
    })
  }, [query, role, tag, status])

  return (
    <AppShell
      user={CURRENT_USER}
      profileMenuItems={PROFILE_MENU_ITEMS}
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Consultant Directory' }]}
      contextBarRight={
        <Link to="/start-here" className="font-mono text-[10px] tracking-[0.5px] text-green/60 hover:text-green transition-colors">
          Start Here →
        </Link>
      }
    >
      <RevealOnScroll className="mb-12">
        <div className="relative overflow-hidden bg-[linear-gradient(135deg,#0F2340_0%,#1B365D_55%,#2A4A78_100%)] p-[52px_56px] max-lg:p-10 max-md:p-6 grid grid-cols-[1fr_420px] gap-9 items-center max-lg:grid-cols-1 max-lg:gap-7">
          <HeroGrain />
          <div
            aria-hidden="true"
            className="absolute w-[1600px] h-[400px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(76,187,23,0.10),rgba(76,187,23,0)_60%)] pointer-events-none z-0 blur-[30px] animate-breathe"
          />
          <div className="relative z-[1]">
            <HeroKicker leadRule className="mb-[18px]">
              Consultant Directory
            </HeroKicker>
            <h1 className="font-display text-[clamp(2.1rem,4vw,2.8rem)] font-bold text-white leading-[1.05] tracking-[-0.025em] mb-5">
              Find your
              <br />
              people
            </h1>
            <p className="text-[14.5px] leading-[1.75] text-text-inverse-secondary max-w-[520px]">
              Every JJR consultant, their expertise, and how to reach them. Search by name, role, skill, or
              community — then connect on Teams in one click.
            </p>
          </div>
          <div className="relative z-[1]">
            <div className="bg-white/[0.06] border border-white/[0.12] focus-within:border-green/50 focus-within:bg-green/[0.06] focus-within:shadow-[0_0_18px_rgba(76,187,23,0.2)] p-1.5 flex items-center gap-2.5 transition-all duration-300">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24" className="ml-2.5 text-text-inverse-muted shrink-0" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder='e.g. "environmental justice" or "Sarah"'
                aria-label="Search the consultant directory"
                className="flex-1 bg-transparent border-none outline-none py-3 font-body text-sm text-white placeholder:text-text-inverse-muted"
              />
            </div>
            <div className="mt-2.5 font-mono text-[10px] text-text-inverse-muted tracking-[0.5px]">
              Search: name · role · expertise · sector · community
            </div>
          </div>
        </div>
      </RevealOnScroll>

      <div className="flex flex-wrap gap-2 items-center mb-8">
        <FilterBar label="Role" options={ROLE_FILTERS} activeKey={role} onChange={setRole} />
        <div className="w-px h-5 bg-rule mx-1.5" aria-hidden="true" />
        <FilterBar
          label="Tag"
          options={TAG_FILTERS}
          activeKey={tag ?? ''}
          onChange={(key) => setTag(key === tag ? null : key)}
        />
        <div className="w-px h-5 bg-rule mx-1.5" aria-hidden="true" />
        <FilterBar
          label="Status"
          options={STATUS_FILTERS}
          activeKey={status ?? ''}
          onChange={(key) => setStatus(key === status ? null : key)}
        />
      </div>

      {results.length === 0 ? (
        <div className="bg-white border border-rule p-14 text-center text-text-muted">
          <h2 className="font-display text-xl font-bold text-navy mb-2">No matches found</h2>
          <p className="text-sm">Try a different search term or adjust your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-12">
          {results.map((person) => (
            <a
              key={person.id}
              href={person.href}
              className="block bg-white border border-rule p-7 transition-all duration-300 hover:border-navy-mid hover:shadow-lg hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-12 h-12 rounded-full bg-green flex items-center justify-center text-white font-bold text-sm shrink-0" aria-hidden="true">
                  {person.initials}
                </div>
                <div>
                  <div className="font-display text-lg font-bold text-navy leading-tight">{person.name}</div>
                  <div className="font-mono text-[10px] text-text-muted tracking-wider uppercase mt-1">{person.title}</div>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap mb-4">
                {person.expertise.map((skill) => (
                  <span key={skill} className="text-[10px] px-2.5 py-1 border border-green text-green font-mono tracking-wider">
                    {skill.toUpperCase()}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-rule-light">
                <span className={`text-[11px] font-mono tracking-wider ${person.status === 'available' ? 'text-green' : 'text-amber'}`}>
                  ● {person.status === 'available' ? 'AVAILABLE' : 'ON PROJECT'}
                </span>
                <span className="text-[11px] text-text-muted font-mono">{person.sector}</span>
                <span className="text-[11px] text-navy border border-rule px-3 py-1">Teams</span>
              </div>
            </a>
          ))}
        </div>
      )}
    </AppShell>
  )
}
