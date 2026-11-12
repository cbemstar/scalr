import type { Metadata } from "next"
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google"

import { cn } from "@/lib/utils"
import "./v2.css"

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: "variable",
  axes: ["opsz", "wdth"],
  variable: "--font-v2-display",
  display: "swap",
})

const body = Instrument_Sans({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-v2-body",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Websites for NZ small businesses",
  description:
    "Marketer-led web design and builds for New Zealand cafés, tradies, salons, clinics and local shops. Websites, Shopify, local SEO and integrations — based in Christchurch.",
  // Preview of the redesign: keep it out of search until it replaces "/".
  robots: { index: false, follow: true },
  alternates: { canonical: "/" },
}

export default function V2Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "scalr-v2 relative flex min-h-dvh flex-col",
        display.variable,
        body.variable
      )}
    >
      {children}
    </div>
  )
}
