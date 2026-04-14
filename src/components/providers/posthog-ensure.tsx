"use client"

import { useEffect } from "react"
import { ensurePostHog } from "@/lib/posthog-init"

/**
 * Backup: if instrumentation-client did not run or failed, initialize once on mount.
 */
export function PostHogEnsure() {
  useEffect(() => {
    ensurePostHog()
  }, [])
  return null
}
