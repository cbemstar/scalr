"use client"

import { useCallback, useState } from "react"
import Preloader from "@/components/ui/preloader"

export function PreloaderWrapper({ children }: { children: React.ReactNode }) {
  const [done, setDone] = useState(false)
  const handleComplete = useCallback(() => setDone(true), [])

  // Children must stay first: if Preloader unmounts as the *first* sibling, React reconciles
  // the page from slot 1 → 0 and can warn ("children should not have changed…") in React 19.
  return (
    <>
      {children}
      {!done && <Preloader onComplete={handleComplete} />}
    </>
  )
}
