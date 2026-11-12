"use client"

import Link from "next/link"
import { ArrowRight, Mail, Phone } from "lucide-react"

import { AnimatedGradient } from "@/components/v2/craftwork/animated-gradient"
import { TextAnimate } from "@/components/v2/craftwork/text-animate"
import { siteConfig } from "@/config/site"
import { v2 } from "@/config/site-v2"

/**
 * Final ask — restate the outcome, remove uncertainty by saying exactly what
 * happens next, and repeat the same CTA wording used since the hero.
 */
export function V2Cta() {
  const { final, cta, contact } = v2
  const mailto = `mailto:${contact.email}?subject=Free%20strategy%20call%20%E2%80%94%20Scalr`
  return (
    <section id="contact" aria-labelledby="cta-title" className="scroll-mt-20 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="relative isolate mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[var(--v2-ink)] text-white">
        <AnimatedGradient
          className="absolute inset-0 -z-10 opacity-80"
          config={{
            preset: "custom",
            color1: "#05070d",
            color2: "#101a44",
            color3: "#2645f5",
            rotation: -30,
            speed: 14,
            swirl: 0.3,
            softness: 1,
          }}
          noise={{ opacity: 0.1 }}
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(5_7_13/0.92),rgb(5_7_13/0.55)_75%)]" />

        <div className="grid gap-12 px-6 py-16 sm:px-12 sm:py-20 lg:grid-cols-12 lg:items-center">
          <div className="flex flex-col gap-6 lg:col-span-7">
            <p className="font-mono text-[11px] tracking-[0.16em] text-white/60 uppercase">{final.kicker}</p>
            <TextAnimate
              as="h2"
              id="cta-title"
              by="word"
              animation="blurInUp"
              once
              className="v2-display text-[clamp(2.4rem,5vw,4.5rem)] font-medium text-balance"
            >
              {final.title}
            </TextAnimate>
            <p className="max-w-xl text-lg text-pretty text-white/75">{final.lead}</p>
            <div className="flex flex-wrap items-center gap-4">
              <a href={mailto} className="group inline-flex h-13 items-center gap-2 rounded-full bg-white px-7 font-medium text-[var(--v2-ink)] transition-transform active:scale-[0.97]">
                {cta.label}
                <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white">
                <Phone aria-hidden className="size-4" /> or call {contact.phone}
              </a>
            </div>
            <p className="text-sm text-white/55">{final.note}</p>
          </div>

          <div className="rounded-2xl border border-white/12 bg-white/[0.04] p-6 backdrop-blur-sm sm:p-8 lg:col-span-5">
            <p className="font-mono text-[11px] tracking-[0.16em] text-white/60 uppercase">What happens on the call</p>
            <ol className="mt-5 flex flex-col gap-4">
              {final.next.map((n, i) => (
                <li key={n} className="flex items-start gap-3">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white/10 font-mono text-xs">{i + 1}</span>
                  <span className="pt-0.5 text-white/90">{n}</span>
                </li>
              ))}
            </ol>
            <p className="mt-6 flex items-center gap-2 border-t border-white/10 pt-5 text-sm text-white/70">
              <Mail aria-hidden className="size-4" />
              <a href={`mailto:${contact.email}`} className="hover:text-white hover:underline">{contact.email}</a>
            </p>
          </div>
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
        { label: "The problem", href: "#problem" },
        { label: "How it works", href: "#plan" },
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
