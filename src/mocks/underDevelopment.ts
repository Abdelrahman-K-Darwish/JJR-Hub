/**
 * The mockup derives this from a `?from=` query param and title-cases it in place.
 * The React page takes it as a prop instead — the router/caller decides what section
 * the visitor came from and passes the already-formatted name down.
 */
export const DEFAULT_FEATURE_NAME = 'This section'

export function formatFeatureName(slug: string): string {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}
