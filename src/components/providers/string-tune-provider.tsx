"use client"

import { useLayoutEffect } from "react"
import StringTune, {
  StringMagnetic,
  StringParallax,
  StringResponsive,
  StringSplit,
} from "@fiddle-digital/string-tune"

/**
 * Initializes StringTune once: split text, scroll parallax, magnetic CTAs, responsive rebuilds.
 * @see https://tune.fiddle.digital/docs/quick-start
 */
export function StringTuneProvider({ children }: { children: React.ReactNode }) {
  useLayoutEffect(() => {
    const tune = StringTune.getInstance()
    tune.use(StringResponsive)
    tune.use(StringSplit)
    tune.use(StringParallax)
    tune.use(StringMagnetic)
    tune.start(60)

    return () => {
      tune.destroy()
    }
  }, [])

  return children
}
