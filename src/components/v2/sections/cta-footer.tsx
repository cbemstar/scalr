import Link from "next/link"
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react"

import { NoiseTexture } from "@/components/v2/craftwork/noise-texture"
import { TextAnimate } from "@/components/v2/craftwork/text-animate"
import { siteConfig } from "@/config/site"
import { v2 } from "@/config/site-v2"

export function V2Cta() {
  const { cta, contact } = v2
  return (
    <section id="contact" aria-labelledby="cta-title" className="scroll-mt-20 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="relative isolate mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-brand px-6 py-16 text-brand-foreground sm:px-12 sm:py-24">
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(70%_80%_at_90%_10%,color-mix(in_oklab,white_22%,transparent),transparent_60%),radial-gradient(60%_60%_at_0%_100%,color-mix(in_oklab,black_25%,transparent),transparent_70%)]" />
        <NoiseTexture className="-z-10 opacity-40 mix-blend-overlay" />

        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div className="flex flex-col gap-6">
            <p className="font-mono text-xs tracking-[0.18em] uppercase opacity-80">{cta.kicker}</p>
            <TextAnimate
              as="h2"
              id="cta-title"
              by="word"
              animation="blurInUp"
              once
              className="v2-display text-[clamp(2.75rem,7vw,6rem)] font-semibold text-balance"
            >
              {cta.title}
            </TextAnimate>
            <p className="max-w-xl text-lg text-pretty opacity-90">{cta.lead}</p>
            <div className="flex flex-wrap gap-3">
              <a
                href={cta.primary.href}
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-[#15140f] px-6 font-medium text-[#f3efe6] transition-transform active:scale-[0.97]"
              >
                <Mail aria-hidden className="size-4" />
                {cta.primary.label}
                <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
              </a>
              <Link
                href={cta.secondary.href}
                className="inline-flex h-12 items-center rounded-full px-6 font-medium ring-1 ring-current/40 transition-colors hover:bg-white/10"
              >
                {cta.secondary.label}
              </Link>
            </div>
            <p className="text-sm opacity-80">{cta.note}</p>
          </div>

          <ul className="flex flex-col gap-4 text-base">
            <li>
              <a href={`mailto:${contact.email}`} className="flex items-center gap-3 underline-offset-4 hover:underline">
                <Mail aria-hidden className="size-5 opacity-80" /> {contact.email}
              </a>
            </li>
            <li>
              <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 underline-offset-4 hover:underline">
                <Phone aria-hidden className="size-5 opacity-80" /> {contact.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin aria-hidden className="size-5 opacity-80" /> {contact.location}
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export function V2Footer() {
  const { social, business } = v2
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-border px-4 pt-12 pb-[max(2rem,env(safe-area-inset-bottom))] sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-10">
        <p aria-hidden className="font-logo text-[clamp(5rem,20vw,16rem)] leading-[0.8] tracking-tight text-foreground/90">
          scalr
        </p>
        <div className="flex flex-col justify-between gap-6 text-sm text-muted-foreground md:flex-row md:items-center">
          <p>
            © {year} Scalr · Web design &amp; build, Christchurch NZ · NZBN {business.nzbn}
          </p>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              <li><a href={social.instagram} className="hover:text-foreground">Instagram</a></li>
              <li><a href={social.linkedin} className="hover:text-foreground">LinkedIn</a></li>
              <li><a href={social.facebook} className="hover:text-foreground">Facebook</a></li>
              <li><Link href={siteConfig.legal.privacy} className="hover:text-foreground">Privacy</Link></li>
              <li><Link href={siteConfig.legal.terms} className="hover:text-foreground">Terms</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}
