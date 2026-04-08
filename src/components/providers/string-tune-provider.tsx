"use client"

import { useLayoutEffect } from "react"
import StringTune, { StringMagnetic, StringResponsive } from "@fiddle-digital/string-tune"

/**
 * Magnetic CTAs only — StringTune’s default scroll mode is lerped (“smooth”) and fights native
 * wheel/trackpad scrolling; we use native scroll (`default`) for the document.
 * @see https://tune.fiddle.digital/docs/quick-start
 */
export function StringTuneProvider({ children }: { children: React.ReactNode }) {
  useLayoutEffect(() => {
    const tune = StringTune.getInstance()
    tune.scrollDesktopMode = "default"
    tune.scrollMobileMode = "default"
    tune.use(StringResponsive)
    tune.use(StringMagnetic)
    tune.start(60)

    return () => {
      tune.destroy()
    }
  }, [])

  return children
}
