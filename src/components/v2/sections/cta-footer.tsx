"use client"

import Link from "next/link"
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react"

import { AnimatedGradient } from "@/components/v2/craftwork/animated-gradient"
import { TextAnimate } from "@/components/v2/craftwork/text-animate"
import { siteConfig } from "@/config/site"
import { v2 } from "@/config/site-v2"

export function V2Cta() {
  const { cta, contact } = v2
  return (
    <section id="contact" aria-labelledby="cta-title" className="scroll-mt-20 px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
      <div className="relative isolate mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[var(--v2-ink)] text-white">
        <AnimatedGradient
          className="absolute inset-0 -z-10 opacity-90"
          config={{
            preset: "custom",
            color1: "#05070d",
            color2: "#14204f",
            color3: "#2645f5",
            rotation: -30,
            speed: 18,
            swirl: 0.4,
            softness: 0.9,
          }}
          noise={{ opacity: 0.12 }}
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(5_7_13/0.85),rgb(5_7_13/0.35)_70%)]" />

        <div className="grid gap-12 px-6 py-16 sm:px-12 sm:py-24 lg:grid-cols-12 lg:items-end">
          <div className="flex flex-col gap-6 lg:col-span-8">
            <p className="font-mono text-[11px] tracking-[0.16em] text-white/60 uppercase">{cta.kicker}</p>
            <TextAnimate
              as="h2"
              id="cta-title"
              by="word"
              animation="blurInUp"
              once
              className="v2-display text-[clamp(2.5rem,5.6vw,5rem)] font-medium text-balance"
            >
              {cta.title}
            </TextAnimate>
            <p className="max-w-xl text-lg text-pretty text-white/75">{cta.lead}</p>
            <div className="flex flex-wrap gap-3">
              <a href={cta.primary.href} className="group inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 font-medium text-[var(--v2-ink)] transition-transform active:scale-[0.97]">
                {cta.primary.label}
                <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a href={cta.secondary.href} className="inline-flex h-12 items-center gap-2 rounded-full border border-white/25 px-6 font-medium transition-colors hover:bg-white/10">
                <Mail aria-hidden className="size-4" /> {cta.secondary.label}
              </a>
            </div>
            <p className="text-sm text-white/60">{cta.note}</p>
          </div>

          <ul className="flex flex-col gap-4 border-t border-white/15 pt-6 text-sm lg:col-span-4 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
            <li>
              <a href={`mailto:${contact.email}`} className="flex items-center gap-3 hover:underline">
                <Mail aria-hidden className="size-4 text-white/60" /> {contact.email}
              </a>
            </li>
            <li>
              <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 hover:underline">
                <Phone aria-hidden className="size-4 text-white/60" /> {contact.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin aria-hidden className="size-4 text-white/60" /> {contact.location}
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export function V2Footer() {
  const { social, business, services, contact } = v2
  const year = new Date().getFullYear()
  const columns = [
    {
      title: "Services",
      links: services.items.map((s) => ({ label: s.name, href: `#service-${s.id}` })),
    },
    {
      title: "Company",
      links: [
        { label: "How it works", href: "#system" },
        { label: "Approach", href: "#approach" },
        { label: "FAQ", href: "#faq" },
        { label: "Contact", href: "#contact" },
      ],
    },
    {
      title: "Follow",
      links: [
        { label: "LinkedIn", href: social.linkedin },
        { label: "Instagram", href: social.instagram },
        { label: "Facebook", href: social.facebook },
      ],
    },
  ]
  return (
    <footer className="border-t border-border px-4 pt-16 pb-[max(2rem,env(safe-area-inset-bottom))] sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12">
        <div className="flex flex-col gap-4 lg:col-span-4">
          <Link href="/v2" className="font-logo text-3xl leading-none tracking-tight" aria-label="Scalr — home">scalr</Link>
          <p className="max-w-xs text-sm text-muted-foreground">
            Webflow, Google Ads and email marketing for New Zealand businesses that want growth they can measure.
          </p>
          <a href={`mailto:${contact.email}`} className="w-fit text-sm font-medium underline-offset-4 hover:underline">{contact.email}</a>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
          {columns.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <p className="font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">{col.title}</p>
              <ul className="flex flex-col gap-2 text-sm">
                {col.links.map((l) => (
                  <li key={l.label}><a href={l.href} className="hover:text-brand">{l.label}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className="mx-auto mt-14 flex max-w-7xl flex-col justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
        <p>© {year} Scalr · NZBN {business.nzbn} · Christchurch, New Zealand</p>
        <p className="flex gap-4">
          <Link href={siteConfig.legal.privacy} className="hover:text-foreground">Privacy</Link>
          <Link href={siteConfig.legal.terms} className="hover:text-foreground">Terms</Link>
        </p>
      </div>
    </footer>
  )
}
