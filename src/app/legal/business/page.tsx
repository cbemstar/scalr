import type { Metadata } from "next"
import Link from "next/link"
import { LegalPageShell } from "@/components/layout/legal-page-shell"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: "Business information",
  description: `NZBN and registration details for ${siteConfig.name} — New Zealand business you can verify.`,
  alternates: { canonical: `${siteConfig.url}/legal/business` },
}

export default function BusinessDetailsPage() {
  const { business } = siteConfig
  const trading = [...business.tradingNames].join(" · ")

  return (
    <LegalPageShell
      title="Business information"
      lead={`${siteConfig.name} is operated by a New Zealand registered business. Details below match the public NZBN record — useful for invoices, procurement, and peace of mind.`}
    >
      <p>
        This page summarises what is already on the{" "}
        <a
          href="https://www.nzbn.govt.nz/"
          target="_blank"
          rel="noopener noreferrer"
        >
          New Zealand Business Number
        </a>{" "}
        (NZBN) register. We do not publish a residential or service street address here; use the
        NZBN listing or contact us directly if you need a formal address for contracts.
      </p>

      <h2>Register details</h2>
      <dl className="not-prose mt-4 space-y-4 rounded-xl border border-border/70 bg-muted/20 px-4 py-4 text-sm sm:px-5">
        <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
          <dt className="shrink-0 font-medium text-muted-foreground">NZBN</dt>
          <dd className="min-w-0 font-mono text-foreground">
            <a
              href={business.nzbnPublicUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-2 transition-colors hover:text-primary hover:underline"
            >
              {business.nzbn}
            </a>
            <span className="ml-2 text-xs font-sans text-muted-foreground">(verify on NZBN)</span>
          </dd>
        </div>
        <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
          <dt className="shrink-0 font-medium text-muted-foreground">NZBN status</dt>
          <dd className="text-foreground">{business.entityStatus}</dd>
        </div>
        <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
          <dt className="shrink-0 font-medium text-muted-foreground">Structure</dt>
          <dd className="text-foreground">{business.structure}</dd>
        </div>
        <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
          <dt className="shrink-0 font-medium text-muted-foreground">On the register since</dt>
          <dd className="text-foreground">{business.registeredYear}</dd>
        </div>
        <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
          <dt className="shrink-0 font-medium text-muted-foreground">Trading names</dt>
          <dd className="text-foreground">{trading}</dd>
        </div>
        <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
          <dt className="shrink-0 font-medium text-muted-foreground">Industry (NZBN)</dt>
          <dd className="min-w-0 text-foreground">{business.industry}</dd>
        </div>
        <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
          <dt className="shrink-0 font-medium text-muted-foreground">Trading area</dt>
          <dd className="text-foreground">{business.tradingArea}</dd>
        </div>
      </dl>

      <h2>Contact</h2>
      <p>
        For project work, use the details on our{" "}
        <Link href="/#contact" className="underline-offset-2 hover:underline">
          contact section
        </Link>{" "}
        — <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a> and{" "}
        <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}>{siteConfig.contact.phone}</a>.
      </p>

      <p className="text-sm text-muted-foreground">
        NZBN is administered by the New Zealand government. Crown copyright applies to the
        register; we do not claim ownership of NZBN data.
      </p>
    </LegalPageShell>
  )
}
