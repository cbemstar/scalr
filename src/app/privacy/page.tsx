import type { Metadata } from "next"
import Link from "next/link"
import { LegalPageShell } from "@/components/layout/legal-page-shell"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses, and protects your information.`,
  alternates: { canonical: `${siteConfig.url}/privacy` },
}

export default function PrivacyPage() {
  const updated = siteConfig.legalLastUpdated

  return (
    <LegalPageShell
      title="Privacy Policy"
      lead={`Last updated ${updated}. ${siteConfig.name} is committed to handling personal information responsibly and in line with New Zealand law.`}
    >
      <p>
        This policy explains what we collect when you use{" "}
        <Link href="/">{siteConfig.url.replace(/^https?:\/\//, "")}</Link>, submit the project
        brief form, or contact us. If anything is unclear, email{" "}
        <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>.
      </p>

      <h2>Who we are</h2>
      <p>
        <strong>{siteConfig.name}</strong> is a New Zealand website studio (based in{" "}
        {siteConfig.contact.location.split(",")[0]}). For privacy matters, contact{" "}
        <strong>{siteConfig.contact.email}</strong>.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>
          <strong>Project brief form:</strong> business type, package interest, platform and
          content preferences, timeline, optional website URL, your name, email, optional phone,
          and optional message. This is used only to respond to your inquiry and scope work.
        </li>
        <li>
          <strong>Analytics:</strong> we use PostHog to understand how visitors use the site
          (for example, which sections are helpful). Data is processed according to{" "}
          <a href="https://posthog.com/privacy" rel="noopener noreferrer">
            PostHog&apos;s privacy policy
          </a>
          . You can opt out of non-essential cookies via the cookie information in our{" "}
          <Link href={siteConfig.legal.cookies}>Cookie Policy</Link>.
        </li>
        <li>
          <strong>Technical data:</strong> standard server and CDN logs (for example IP address,
          user agent, timestamps) for security and reliability. These are retained only as long
          as needed for that purpose.
        </li>
      </ul>

      <h2>Where data is stored</h2>
      <p>
        Form submissions are stored in <strong>Airtable</strong> (United States) under our
        account. Analytics may be processed in the region configured for our PostHog project.
        We choose providers that meet reasonable security standards; cross-border disclosure is
        limited to what is needed to run the site and respond to you.
      </p>

      <h2>Legal basis & use</h2>
      <p>
        We process personal information to pursue legitimate interests (responding to inquiries,
        operating and improving the website, measuring marketing effectiveness) and, where
        required, with your consent (for example non-essential cookies where applicable). We do
        not sell your personal information.
      </p>

      <h2>Retention</h2>
      <p>
        Inquiry records are kept for as long as needed to deliver services, manage our
        relationship with you, and meet legal or accounting obligations. Analytics events are
        retained according to our analytics provider settings (typically months, not years).
      </p>

      <h2>Your rights</h2>
      <p>
        Under the <strong>Privacy Act 2020</strong> (New Zealand), you may request access to or
        correction of personal information we hold about you. You may also complain to the{" "}
        <a href="https://www.privacy.org.nz/" rel="noopener noreferrer">
          Office of the Privacy Commissioner
        </a>
        . We will respond to reasonable requests without undue delay.
      </p>

      <h2>Security</h2>
      <p>
        We use HTTPS, access-controlled tools, and providers with industry-standard safeguards.
        No method of transmission over the internet is perfectly secure; see also our{" "}
        <Link href={siteConfig.legal.security}>Security</Link> page.
      </p>

      <h2>Updates</h2>
      <p>
        We may update this policy from time to time. The &quot;Last updated&quot; date at the top
        will change when we do. Continued use of the site after changes means you accept the
        revised policy.
      </p>
    </LegalPageShell>
  )
}
