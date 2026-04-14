import type { Metadata } from "next"
import Link from "next/link"
import { LegalPageShell } from "@/components/layout/legal-page-shell"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: "Security",
  description: `Security practices and reporting for ${siteConfig.name}.`,
  alternates: { canonical: `${siteConfig.url}/security` },
}

export default function SecurityPage() {
  const updated = siteConfig.legalLastUpdated

  return (
    <LegalPageShell
      title="Security"
      lead={`Last updated ${updated}. We take reasonable steps to protect this site, our tooling, and client data.`}
    >
      <h2>How we protect data</h2>
      <ul>
        <li>
          <strong>Transport:</strong> this site is served over HTTPS (TLS) so traffic between your
          browser and our host is encrypted in transit.
        </li>
        <li>
          <strong>Hosting:</strong> the public site runs on modern managed infrastructure with
          access controls and automated patches appropriate to a marketing brochure site.
        </li>
        <li>
          <strong>Forms:</strong> project briefs are validated server-side, protected with
          Cloudflare Turnstile when configured, and written to access-controlled systems (for
          example Airtable) using secrets stored as environment variables — not in source code.
        </li>
        <li>
          <strong>Access:</strong> administrative access to analytics, email, and project tools
          is limited to people who need it.
        </li>
      </ul>

      <h2>What this is not</h2>
      <p>
        This page is a high-level overview, not an audit report or guarantee. It does not cover
        security of third-party platforms you choose for your own site (for example your
        registrar, Webflow account, or payment processor).
      </p>

      <h2>Reporting a vulnerability</h2>
      <p>
        If you believe you have found a security issue affecting{" "}
        <Link href="/">{siteConfig.url.replace(/^https?:\/\//, "")}</Link> or our public
        infrastructure, please email{" "}
        <a href={`mailto:${siteConfig.contact.email}?subject=Security%20report`}>
          {siteConfig.contact.email}
        </a>{" "}
        with enough detail to reproduce the issue. We read good-faith reports and aim to respond
        within a few business days. Please do not publicly disclose until we have had a chance
        to investigate.
      </p>
      <p>
        A <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">security.txt</code>{" "}
        file is published at{" "}
        <a href="/.well-known/security.txt">/.well-known/security.txt</a> for automated discovery.
      </p>

      <h2>Related</h2>
      <p>
        <Link href={siteConfig.legal.privacy}>Privacy Policy</Link> ·{" "}
        <Link href={siteConfig.legal.cookies}>Cookie Policy</Link>
      </p>
    </LegalPageShell>
  )
}
