"use client"

import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react"
import Script from "next/script"
import { cn } from "@/lib/utils"

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string
          callback: (token: string) => void
          "expired-callback"?: () => void
          "error-callback"?: () => void
          theme?: "light" | "dark" | "auto"
          appearance?: "always" | "execute" | "interaction-only"
        }
      ) => string
      remove: (widgetId: string) => void
    }
  }
}

type TurnstileFieldProps = {
  siteKey: string
  onToken: (token: string | null) => void
  className?: string
}

/**
 * Cloudflare Turnstile widget — pairs with server verify in `/api/inquiry`.
 */
export function TurnstileField({ siteKey, onToken, className }: TurnstileFieldProps) {
  const containerId = useId().replace(/:/g, "")
  const widgetIdRef = useRef<string | null>(null)
  const onTokenRef = useRef(onToken)
  const [apiReady, setApiReady] = useState(false)

  useLayoutEffect(() => {
    onTokenRef.current = onToken
  }, [onToken])

  const removeWidget = useCallback(() => {
    const id = widgetIdRef.current
    if (id && typeof window !== "undefined" && window.turnstile?.remove) {
      try {
        window.turnstile.remove(id)
      } catch {
        /* ignore */
      }
    }
    widgetIdRef.current = null
    onTokenRef.current(null)
  }, [])

  useEffect(() => {
    if (!apiReady || !siteKey) return

    let cancelled = false
    let rafId = 0
    let attempts = 0

    const mount = () => {
      if (cancelled) return
      attempts += 1
      if (attempts > 180) return

      const el = document.getElementById(containerId)
      if (!el || !window.turnstile) {
        rafId = requestAnimationFrame(mount)
        return
      }

      removeWidget()
      widgetIdRef.current = window.turnstile.render(el, {
        sitekey: siteKey,
        theme: "auto",
        appearance: "interaction-only",
        callback: (token) => onTokenRef.current(token),
        "expired-callback": () => onTokenRef.current(null),
        "error-callback": () => onTokenRef.current(null),
      })
    }

    mount()

    return () => {
      cancelled = true
      cancelAnimationFrame(rafId)
      removeWidget()
    }
  }, [apiReady, siteKey, containerId, removeWidget])

  if (!siteKey) return null

  return (
    <div className={cn("flex min-h-[65px] flex-col gap-2", className)}>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="lazyOnload"
        onLoad={() => setApiReady(true)}
      />
      <div
        id={containerId}
        className="flex min-h-[65px] items-center justify-start"
        data-testid="turnstile-container"
      />
      <p className="text-xs leading-relaxed text-muted-foreground">
        Protected by Cloudflare Turnstile — helps stop spam while staying privacy-friendly.
      </p>
    </div>
  )
}
