import posthog from "posthog-js"

let initialized = false

/**
 * Single place for PostHog client config. Called from instrumentation-client.ts
 * (runs before React). Idempotent so a backup <PostHogEnsure /> in layout is safe.
 */
export function ensurePostHog(): void {
  if (initialized) return

  const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN?.trim()
  const apiHost =
    process.env.NEXT_PUBLIC_POSTHOG_HOST?.trim() || "/ingest"

  if (!token) {
    if (typeof window !== "undefined") {
      console.error(
        "[PostHog] NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN is missing. Client bundle was built without it — add it in Vercel (Production + Preview) and redeploy so Next.js can inline it at build time."
      )
    }
    return
  }

  initialized = true

  posthog.init(token, {
    /**
     * Prefer same-origin `/ingest` (see next.config.ts rewrites) so requests are not
     * blocked as third-party trackers; falls back to NEXT_PUBLIC_POSTHOG_HOST if set.
     */
    api_host: apiHost,
    ui_host: "https://us.posthog.com",
    defaults: "2026-01-30",
    /** Avoid extra beacon traffic that can surface as console "Failed to fetch" in dev / strict networks. */
    capture_exceptions: process.env.NODE_ENV === "production",
    debug:
      process.env.NODE_ENV === "development" ||
      process.env.NEXT_PUBLIC_POSTHOG_DEBUG === "1",
  })
}

if (typeof window !== "undefined") {
  ensurePostHog()
}
