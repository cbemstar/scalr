// Section 3: Dream State

import { CheckCircle2, Mail, Phone } from "lucide-react"
import { AvatarStack } from "@/components/kibo-ui/avatar-stack"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { FadeIn } from "@/components/common/fade-in"

const outcomes = [
  {
    headline: "Enquiries while you sleep",
    description:
      "No chasing, no guessing. Your website captures leads 24/7 — bookings and contact forms working while you focus on the job.",
  },
  {
    headline: "A site you're proud to share",
    description:
      "Send every potential customer there without hesitation. First impressions that build trust instantly.",
  },
  {
    headline: "More credibility than your competitor",
    description:
      "Stop losing jobs to less-experienced businesses who just happen to look more professional online.",
  },
  {
    headline: "Ads that finally convert",
    description:
      "Traffic from Google and social media lands on a page built to convert. Your ad spend stops going to waste.",
  },
  {
    headline: "Customers who arrive pre-sold",
    description:
      "Your site answers every question and removes every objection. They call or book already confident in you.",
  },
]

const notifications = [
  {
    type: "enquiry",
    name: "Sarah M.",
    message: "Hi, I'd like to book a consultation for next week.",
    time: "2 min ago",
    avatar: "SM",
  },
  {
    type: "booking",
    name: "James K.",
    message: "Just submitted the contact form. Call me anytime.",
    time: "14 min ago",
    avatar: "JK",
  },
  {
    type: "enquiry",
    name: "Priya L.",
    message: "Found you on Google. Do you do commercial work?",
    time: "1 hr ago",
    avatar: "PL",
  },
  {
    type: "call",
    name: "Mike T.",
    message: "Left a voicemail — got your number from the website.",
    time: "3 hr ago",
    avatar: "MT",
  },
]

export function DreamStateSection() {
  return (
    <section id="dream" className="lp-section bg-foreground text-background">
      <div className="lp-shell">
        {/* Section header */}
        <FadeIn>
          <div className="max-w-2xl mb-16">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-background/45">
              Imagine this instead
            </p>
            <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl md:text-[2.35rem]">
              Imagine a website that works while you sleep.
            </h2>
            <p className="mt-4 text-background/60 leading-relaxed">
              When your website is built around generating leads — not just looking good — everything
              changes.
            </p>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Outcomes list */}
          <div className="flex flex-col gap-6">
            {outcomes.map((outcome, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="flex items-start gap-4">
                  <div className="shrink-0 mt-0.5">
                    <CheckCircle2 className="size-5 text-emerald-400/95" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="font-semibold text-background">{outcome.headline}</p>
                    <p className="text-sm text-background/60 leading-relaxed">
                      {outcome.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Mock enquiries inbox */}
          <FadeIn delay={0.2}>
            <div className="rounded-2xl border border-background/10 bg-background/5 p-4 backdrop-blur-sm">
              <div className="mb-4 flex items-center gap-3 px-1">
                <AvatarStack animate size={36}>
                  <Avatar>
                    <AvatarFallback className="bg-brand/35 text-[10px] font-semibold text-background">
                      SM
                    </AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarFallback className="bg-white/12 text-[10px] font-semibold text-background">
                      JK
                    </AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarFallback className="bg-white/12 text-[10px] font-semibold text-background">
                      PL
                    </AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarFallback className="bg-white/12 text-[10px] font-semibold text-background">
                      MT
                    </AvatarFallback>
                  </Avatar>
                </AvatarStack>
                <p className="text-xs leading-snug text-background/45">
                  Enquiry patterns like these land every week when the site does its job.
                </p>
              </div>
              <div className="flex items-center justify-between mb-4 px-1">
                <div className="flex items-center gap-2">
                  <Mail className="size-4 text-background/50" />
                  <span className="text-sm font-medium text-background/70">New Enquiries</span>
                </div>
                <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 text-xs font-medium text-emerald-300">
                  {notifications.length} new
                </span>
              </div>
              <div className="flex flex-col gap-2">
                {notifications.map((notif, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-xl bg-background/8 p-3 transition-colors hover:bg-background/12"
                    style={{ background: "oklch(0.98 0 0 / 0.06)" }}
                  >
                    <div className="size-8 rounded-full bg-brand/30 flex items-center justify-center shrink-0">
                      <span className="text-xs font-semibold text-background/80">
                        {notif.avatar}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-0.5">
                        <span className="text-xs font-semibold text-background/90 truncate">
                          {notif.name}
                        </span>
                        <span className="text-xs text-background/35 shrink-0">{notif.time}</span>
                      </div>
                      <p className="text-xs text-background/55 truncate">{notif.message}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-background/10 flex items-center justify-center gap-2">
                <Phone className="size-3.5 text-background/30" />
                <p className="text-xs text-background/35">
                  Your website generating enquiries around the clock
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
