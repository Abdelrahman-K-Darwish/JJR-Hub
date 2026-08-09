import type { SVGProps } from 'react'

export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

/**
 * Shared base for the icon set extracted from the mockups' inline SVGs (Feather-style,
 * 24x24 viewBox, stroke-based). Individual icons render their own <path>/<polyline>/etc.
 * children through this wrapper so size/color/stroke-width stay consistent everywhere.
 */
export function Icon({ size = 16, strokeWidth = 1.8, children, ...rest }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {children}
    </svg>
  )
}
