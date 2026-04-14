import type { Metadata } from "next"
import Link from "next/link"
import { LegalPageShell } from "@/components/layout/legal-page-shell"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: `How ${siteConfig.name} uses cookies and similar technologies.`,
  alternates: { canonical: `${siteConfig.url}/cookies` },
}

export default function CookiesPage() {
  const updated = siteConfig.legalLastUpdated

  return (
    <LegalPageShell
      title="Cookie Policy"
      lead={`Last updated ${updated}. This page describes cookies and local storage used on the ${siteConfig.name} marketing site.`}
    >
      <p>
        For how we use personal data more broadly, see our{" "}
        <Link href={siteConfig.legal.privacy}>Privacy Policy</Link>.
      </p>

      <h2>What we use</h2>
      <ul>
        <li>
          <strong>Theme preference:</strong> the light/dark toggle may store your choice in
          <code className="mx-1 rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground">
            localStorage
          </code>
          so the site remembers your preference. This is not used for tracking across other sites.
        </li>
        <li>
          <strong>Analytics (PostHog):</strong> we measure page views and interactions to improve
          the experience. PostHog may set first-party cookies or use local storage depending on
          configuration. See{" "}
          <a href="https://posthog.com/privacy" rel="noopener noreferrer">
            posthog.com/privacy
          </a>
          .
        </li>
        <li>
          <strong>Security (Turnstile):</strong> when you use the project brief form, Cloudflare
          Turnstile may set a short-lived cookie or use browser storage to run the anti-spam
          challenge. See{" "}
          <a href="https://www.cloudflare.com/privacypolicy/" rel="noopener noreferrer">
            Cloudflare&apos;s privacy policy
          </a>
          .
        </li>
      </ul>

      <h2>Your choices</h2>
      <p>
        You can clear site data from your browser settings at any time. Blocking all cookies may
        affect theme persistence or form submission where Turnstile is required.
      </p>

      <h2>Updates</h2>
      <p>
        If we add new tools that use cookies, we will update this page and the last-updated date.
      </p>
    </LegalPageShell>
  )
}
