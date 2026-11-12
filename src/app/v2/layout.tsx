import type { Metadata } from "next"
import { Host_Grotesk, Newsreader } from "next/font/google"

import { cn } from "@/lib/utils"
import "./v2.css"

/** Primary face — headings and body. */
const sans = Host_Grotesk({
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  variable: "--font-v2-sans",
  display: "swap",
})

/** Editorial accent — a few italic words per page, never body copy. */
const serif = Newsreader({
  subsets: ["latin"],
  weight: "variable",
  style: ["italic"],
  axes: ["opsz"],
  variable: "--font-v2-serif",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Webflow & Google Ads agency",
  description:
    "Scalr is a New Zealand Webflow and Google Ads agency. High-converting Webflow sites, Google Ads management and email marketing — one team, one strategy.",
  // Preview of the redesign: keep it out of search until it replaces "/".
  robots: { index: false, follow: true },
  alternates: { canonical: "/" },
}

export default function V2Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "scalr-v2 relative flex min-h-dvh flex-col",
        sans.variable,
        serif.variable
      )}
    >
      {children}
    </div>
  )
}
