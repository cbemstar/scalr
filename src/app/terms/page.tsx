import type { Metadata } from "next"
import Link from "next/link"
import { LegalPageShell } from "@/components/layout/legal-page-shell"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms for using ${siteConfig.name} websites, services, and this site.`,
  alternates: { canonical: `${siteConfig.url}/terms` },
}

export default function TermsPage() {
  const updated = siteConfig.legalLastUpdated

  return (
    <LegalPageShell
      title="Terms of Service"
      lead={`Last updated ${updated}. These terms apply to your use of this website and to engagements with ${siteConfig.name} unless we agree otherwise in writing.`}
    >
      <p>
        By using <Link href="/">this website</Link> or submitting a project brief, you agree to
        these terms together with our <Link href={siteConfig.legal.privacy}>Privacy Policy</Link>.
      </p>

      <h2>Website use</h2>
      <p>
        Content on this site is for general information. Pricing and timelines are indicative;
        final scope, fees, and dates are agreed per proposal or contract. You agree not to misuse
        the site (including attempting to disrupt, scrape, or probe systems without permission).
      </p>

      <h2>Project engagements</h2>
      <p>
        Custom website work is governed by a separate statement of work, proposal, or contract
        where we set deliverables, payment milestones, revision rounds, and acceptance criteria.
        Until a written agreement exists, no obligation to perform work arises from this site
        alone.
      </p>

      <h2>Payments &amp; third-party fees</h2>
      <p>
        Hosting, domains, fonts, stock assets, and platform subscriptions (for example Webflow or
        Shopify) are typically billed by those providers or passed through as agreed. Package
        descriptions on this site summarise what is included; specifics are confirmed before work
        starts.
      </p>

      <h2>Intellectual property</h2>
      <p>
        Unless otherwise agreed, client-owned content and branding remain yours. Deliverables are
        licensed or assigned as set out in your project agreement. We may show anonymised or
        public portions of completed work in our portfolio unless you request otherwise in
        writing before launch.
      </p>

      <h2>Warranties &amp; liability</h2>
      <p>
        To the maximum extent permitted by New Zealand law, the site and any general information
        are provided &quot;as is&quot; without warranties of any kind. Our liability for any
        claim relating to this site (excluding liability that cannot be excluded by law) is
        limited to NZD $100 or the amount you paid us in the twelve months before the claim,
        whichever is greater.
      </p>

      <h2>Links</h2>
      <p>
        We may link to third-party sites. We are not responsible for their content or privacy
        practices.
      </p>

      <h2>Changes</h2>
      <p>
        We may update these terms. The date at the top will change when we do. Material changes
        to how we handle personal information are reflected in the Privacy Policy.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms:{" "}
        <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>.
      </p>
    </LegalPageShell>
  )
}
