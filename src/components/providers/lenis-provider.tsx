"use client"

import type { LenisOptions } from "lenis"
import { ReactLenis } from "lenis/react"
import { useLayoutEffect, useMemo, useState } from "react"

function shouldPreventLenis(node: Node) {
  if (!(node instanceof HTMLElement)) return false

  const preventRoot = node.closest<HTMLElement>("[data-lenis-prevent]")
  if (!preventRoot) return false

  const styles = window.getComputedStyle(preventRoot)
  const allowsVerticalScroll = /auto|scroll|overlay/.test(styles.overflowY)
  const isActuallyScrollable = preventRoot.scrollHeight > preventRoot.clientHeight + 1

  return allowsVerticalScroll && isActuallyScrollable
}

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
      /*
       * Prevent Lenis only for containers that are currently scrollable.
       * This avoids wheel-traps when a "prevent" region has no overflow.
       */
      prevent: shouldPreventLenis,
    }),
    [reduceMotion]
  )

  return (
    <ReactLenis root options={options}>
      {children}
    </ReactLenis>
  )
}
