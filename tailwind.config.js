/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: 'var(--navy)',
        'navy-deep': 'var(--navy-deep)',
        'navy-mid': 'var(--navy-mid)',
        'navy-recess': 'var(--navy-recess)',
        'navy-context': 'var(--navy-context)',
        'navy-top': 'var(--navy-top)',

        green: 'var(--green)',
        'green-dark': 'var(--green-dark)',
        'green-bright': 'var(--green-bright)',
        'green-soft': 'var(--green-soft)',
        'green-muted': 'var(--green-muted)',
        'green-glow': 'var(--green-glow)',

        pink: 'var(--pink)',
        'pink-soft': 'var(--pink-soft)',
        amber: 'var(--amber)',

        gold: 'var(--gold)',
        'gold-bright': 'var(--gold-bright)',
        'gold-dark': 'var(--gold-dark)',
        'gold-deep': 'var(--gold-deep)',

        white: 'var(--white)',
        'off-white': 'var(--off-white)',
        'warm-gray': 'var(--warm-gray)',
        stone: 'var(--stone)',
        rule: 'var(--rule)',
        'rule-light': 'var(--rule-light)',

        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"IBM Plex Sans"', '-apple-system', 'sans-serif'],
        mono: ['"IBM Plex Mono"', '"SF Mono"', 'monospace'],
      },
      transitionTimingFunction: {
        rise: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        smooth: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
        breathe: {
          '0%, 100%': { opacity: 0.5 },
          '50%': { opacity: 1 },
        },
        rise: {
          from: { opacity: 0, transform: 'translateY(40px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        shimmer: 'shimmer 6s ease-in-out infinite',
        breathe: 'breathe 4s ease-in-out infinite',
        rise: 'rise 0.6s cubic-bezier(0.25,0.46,0.45,0.94) both',
      },
    },
  },
  plugins: [],
}
