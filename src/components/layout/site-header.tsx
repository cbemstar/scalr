"use client"

import { useEffect, useRef, useState } from "react"
import { SterlingGateKineticNavigation } from "@/components/ui/sterling-gate-kinetic-navigation"

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const rafRef = useRef(0)
  const lastRef = useRef(false)

  useEffect(() => {
    const sync = () => {
      const next = window.scrollY > 20
      if (next !== lastRef.current) {
        lastRef.current = next
        setScrolled(next)
      }
    }

    const onScroll = () => {
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0
        sync()
      })
    }

    sync()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  return <SterlingGateKineticNavigation scrolled={scrolled} />
}
