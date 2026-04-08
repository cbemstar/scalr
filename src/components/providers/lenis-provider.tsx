"use client"

import type { LenisOptions } from "lenis"
import { ReactLenis } from "lenis/react"
import { useLayoutEffect, useMemo, useState } from "react"

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const [reduceMotion, setReduceMotion] = useState(false)

  useLayoutEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduceMotion(mq.matches)
    const onChange = () => setReduceMotion(mq.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  const options = useMemo<LenisOptions>(
    () => ({
      autoRaf: true,
      anchors: true,
      smoothWheel: !reduceMotion,
      lerp: reduceMotion ? 1 : 0.09,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      syncTouch: false,
    }),
    [reduceMotion]
  )

  return (
    <ReactLenis root options={options}>
      {children}
    </ReactLenis>
  )
}
