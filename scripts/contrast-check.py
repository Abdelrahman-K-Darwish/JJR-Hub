"""WCAG contrast checker used to tune src/styles/tokens.css's dark-surface text tokens.

Checks a foreground color against every navy stop in the palette (the worst case for a
light-on-navy token is the *lightest* navy, since that's where contrast is lowest) and
reports whether it clears the WCAG AA thresholds: 4.5:1 for normal text, 3:1 for large
text and UI component borders.

Usage: python scripts/contrast-check.py '#B9C3D1' '#8B9BB4'
"""

import sys


def srgb_to_lin(c):
    c = c / 255
    return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4


def luminance(rgb):
    r, g, b = rgb
    return 0.2126 * srgb_to_lin(r) + 0.7152 * srgb_to_lin(g) + 0.0722 * srgb_to_lin(b)


def contrast(rgb1, rgb2):
    l1, l2 = luminance(rgb1), luminance(rgb2)
    l1, l2 = max(l1, l2), min(l1, l2)
    return (l1 + 0.05) / (l2 + 0.05)


def hexrgb(h):
    h = h.lstrip('#')
    return tuple(int(h[i : i + 2], 16) for i in (0, 2, 4))


NAVY_STOPS = {
    'navy-deep': hexrgb('0F2340'),
    'navy': hexrgb('1B365D'),
    'navy-mid': hexrgb('2A4A78'),
}


def check(fg_hex):
    fg = hexrgb(fg_hex)
    print(f"\n{fg_hex}")
    for name, bg in NAVY_STOPS.items():
        c = contrast(fg, bg)
        aa_normal = 'PASS' if c >= 4.5 else 'fail'
        aa_large = 'PASS' if c >= 3.0 else 'fail'
        print(f"  vs {name:10} = {c:5.2f}:1   normal-text {aa_normal}   large/UI {aa_large}")


if __name__ == '__main__':
    for arg in sys.argv[1:] or ['#B9C3D1', '#8B9BB4']:
        check(arg)
