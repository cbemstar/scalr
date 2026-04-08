"use client"

import { LiquidGlassProvider } from "@mael-667/liquid-glass-react"

/**
 * Injects SVG filters + base styles for `@mael-667/liquid-glass-react` once.
 * Must wrap any subtree that uses `LiquidGlass` (e.g. the site header pill).
 */
export function LiquidGlassRegistryProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return <LiquidGlassProvider>{children}</LiquidGlassProvider>
}
