# Visual system (NZ Web Studio)

Agents and humans should treat this as the source of truth for typography, surfaces, and motion budget. It complements token definitions in `src/app/globals.css`.

## Typography

| Role | Implementation |
|------|----------------|
| Body | `DM Sans` via `next/font` (`dmSans.variable` → `--font-sans`). |
| Headings | `Funnel Sans` variable (`funnelSans.variable` → `--font-heading`). Utility: `.font-heading` or Tailwind `font-heading`. |
| Logo mark | Local `scalr.woff2` → `--font-logo`. |
| Mono | `Geist Mono` → `--font-mono`. |

**Landing rhythm:** Prefer the shared primitives over one-off sizes: `.lp-kicker`, `.lp-title`, `.lp-lead`, `.lp-title-display`, `.section-eyebrow`, containers `.lp-section` / `.lp-shell`.

## Color & surfaces

Semantic UI colors use CSS variables (`--background`, `--foreground`, `--primary`, `--muted`, etc.) from `:root` / `.dark`. Section tints use utilities like `.lp-section-tinted` and scoped blocks such as `.dream-state-scope` for contrast-safe “ink” roles (`--dream-text`, `--dream-body`, …).

## Motion

- **Hero:** Full intro (loader + GSAP) only when `prefers-reduced-motion: no-preference`. Reduced motion skips the timeline and avoids loading-state flash via a layout effect in `hero.tsx`.
- **Scroll:** `LenisProvider` turns off smooth wheel when reduced motion is preferred (`lerp: 1`).
- **CSS:** Prefer `@media (prefers-reduced-motion: reduce)` for decorative keyframes (e.g. String Tune, magnetic offsets).

## When adding UI

1. Reuse primitives before inventing spacing or font sizes.
2. One strong primary action per section; secondary actions stay outline/neutral unless the brief calls for bolder emphasis.
3. After visual changes, sanity-check keyboard focus and contrast on both themes.
