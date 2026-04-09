"use client"

import { useState, useCallback, useRef } from "react"
import posthog from "posthog-js"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, Check, Loader2, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/config/site"

const BUSINESS_TYPES = [
  { value: "cafe-bakery", label: "Café or Bakery" },
  { value: "barber-salon", label: "Barber or Salon" },
  { value: "tradie-contractor", label: "Tradie / Contractor" },
  { value: "retail-shop", label: "Retail or Local Shop" },
  { value: "restaurant-bar", label: "Restaurant or Bar" },
  { value: "health-wellness", label: "Health & Wellness" },
  { value: "professional-services", label: "Professional Services" },
  { value: "other", label: "Something else" },
] as const

const PACKAGE_OPTIONS = siteConfig.packages.map((pkg) => ({
  value: pkg.id,
  label: pkg.name,
  price: `$${pkg.price.toLocaleString()} NZD`,
  description: pkg.tagline,
}))

const PLATFORM_OPTIONS = [
  { value: "webflow", label: "Webflow" },
  { value: "wordpress", label: "WordPress" },
  { value: "shopify", label: "Shopify" },
  { value: "nextjs", label: "Custom build (Next.js)" },
  { value: "unsure", label: "Not sure, need guidance" },
] as const

const CONTENT_OPTIONS = [
  { value: "ready", label: "Yes, I can provide content and images" },
  { value: "partial", label: "Some content is ready, some needs work" },
  { value: "none", label: "No, I need full content support" },
] as const

const COPY_OPTIONS = [
  { value: "have-copy", label: "I already have website copy" },
  { value: "need-help", label: "I need copywriting support" },
  { value: "unsure", label: "Not sure yet" },
] as const

const TIMELINE_OPTIONS = [
  { value: "asap", label: "As soon as possible" },
  { value: "2-weeks", label: "Within 2 weeks" },
  { value: "1-month", label: "Within a month" },
  { value: "flexible", label: "No rush — flexible" },
] as const

const CURRENT_SITE_OPTIONS = [
  { value: "none", label: "I don't have a website yet" },
  { value: "outdated", label: "I have one but it's outdated" },
  { value: "rebuild", label: "I have one but want a full rebuild" },
  { value: "webflow", label: "I have a Webflow site" },
  { value: "unsure", label: "Not sure what I need" },
] as const

type FormData = {
  businessType: string
  packageInterest: string
  platformPreference: string
  contentReadiness: string
  copywritingSupport: string
  timeline: string
  currentSite: string
  websiteUrl: string
  name: string
  email: string
  phone: string
  message: string
}

const INITIAL_DATA: FormData = {
  businessType: "",
  packageInterest: "",
  platformPreference: "",
  contentReadiness: "",
  copywritingSupport: "",
  timeline: "",
  currentSite: "",
  websiteUrl: "",
  name: "",
  email: "",
  phone: "",
  message: "",
}

const STEP_COUNT = 5

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "h-1.5 rounded-full transition-all duration-300",
            i === current
              ? "w-8 bg-primary"
              : i < current
                ? "w-4 bg-primary/40"
                : "w-4 bg-muted-foreground/20"
          )}
        />
      ))}
      <span className="ml-2 text-xs tabular-nums text-muted-foreground">
        {current + 1}/{total}
      </span>
    </div>
  )
}

function OptionCard({
  selected,
  onClick,
  label,
  sublabel,
  children,
}: {
  selected: boolean
  onClick: () => void
  label: string
  sublabel?: string
  children?: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative flex w-full items-start gap-3 rounded-xl border px-4 py-3.5 text-left transition-all duration-200",
        selected
          ? "border-primary bg-primary/[0.06] ring-1 ring-primary/30"
          : "border-border/70 bg-background hover:border-primary/30 hover:bg-primary/[0.03]"
      )}
    >
      <div
        className={cn(
          "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
          selected
            ? "border-primary bg-primary text-primary-foreground"
            : "border-muted-foreground/30"
        )}
      >
        {selected && <Check className="size-3" strokeWidth={3} />}
      </div>
      <div className="flex-1">
        <span className="text-sm font-medium text-foreground">{label}</span>
        {sublabel && (
          <span className="ml-2 text-xs text-muted-foreground">{sublabel}</span>
        )}
        {children}
      </div>
    </button>
  )
}

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
}

const STEP_NAMES = [
  "business_type",
  "package",
  "discovery",
  "project_details",
  "contact",
] as const

export function MultistepInquiryForm({ className }: { className?: string }) {
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const [data, setData] = useState<FormData>(INITIAL_DATA)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const formStartedRef = useRef(false)

  const update = useCallback(
    <K extends keyof FormData>(field: K, value: FormData[K]) => {
      setData((prev) => {
        if (!formStartedRef.current) {
          formStartedRef.current = true
          posthog.capture("inquiry_form_started")
        }
        return { ...prev, [field]: value }
      })
    },
    []
  )

  const canAdvance = (() => {
    switch (step) {
      case 0:
        return !!data.businessType
      case 1:
        return !!data.packageInterest
      case 2:
        return (
          !!data.platformPreference &&
          !!data.contentReadiness &&
          !!data.copywritingSupport
        )
      case 3:
        return !!data.timeline && !!data.currentSite
      case 4:
        return !!data.name.trim() && !!data.email.trim()
      default:
        return false
    }
  })()

  const goNext = () => {
    if (!canAdvance) return
    if (step < STEP_COUNT - 1) {
      posthog.capture("inquiry_form_step_completed", {
        step_number: step,
        step_name: STEP_NAMES[step],
      })
      setDirection(1)
      setStep((s) => s + 1)
    }
  }

  const goPrev = () => {
    if (step > 0) {
      setDirection(-1)
      setStep((s) => s - 1)
    }
  }

  const handleSubmit = async () => {
    if (!canAdvance) return
    setSubmitting(true)
    setSubmitError(null)
    posthog.capture("inquiry_form_submitted", {
      business_type: data.businessType,
      package_interest: data.packageInterest,
      platform_preference: data.platformPreference,
      timeline: data.timeline,
      current_site: data.currentSite,
    })
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      const payload = (await res.json()) as { error?: string }
      if (!res.ok) {
        setSubmitError(
          payload.error ??
            "Something went wrong sending your details. Please try again."
        )
        return
      }
      setSubmitted(true)
    } catch {
      setSubmitError(
        "Network error — check your connection and try again, or call us directly."
      )
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className={cn("flex flex-col items-center gap-6 py-12 text-center", className)}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/20"
        >
          <Check className="size-7" strokeWidth={2.5} />
        </motion.div>
        <motion.div
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="space-y-2"
        >
          <h3 className="font-heading text-2xl font-semibold tracking-tight">
            Thanks, {data.name.split(" ")[0]}!
          </h3>
          <p className="max-w-md text-base leading-relaxed text-muted-foreground">
            I&apos;ll review your project details and get back to you within 24 hours.
            If it&apos;s urgent, feel free to call me directly.
          </p>
        </motion.div>
        <Button asChild variant="secondary" size="lg" className="mt-2">
          <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}>
            <Phone className="size-4" />
            Call {siteConfig.contact.phone}
          </a>
        </Button>
      </div>
    )
  }

  return (
    <div className={cn("w-full", className)}>
      <div className="mb-6">
        <StepIndicator current={step} total={STEP_COUNT} />
      </div>

      <div className="relative min-h-[320px] overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {step === 0 && (
              <StepBusinessType
                value={data.businessType}
                onChange={(v) => update("businessType", v)}
              />
            )}
            {step === 1 && (
              <StepPackage
                value={data.packageInterest}
                onChange={(v) => update("packageInterest", v)}
              />
            )}
            {step === 2 && (
              <StepDiscovery
                platformPreference={data.platformPreference}
                contentReadiness={data.contentReadiness}
                copywritingSupport={data.copywritingSupport}
                onPlatform={(v) => update("platformPreference", v)}
                onContent={(v) => update("contentReadiness", v)}
                onCopy={(v) => update("copywritingSupport", v)}
              />
            )}
            {step === 3 && (
              <StepProjectDetails
                timeline={data.timeline}
                currentSite={data.currentSite}
                websiteUrl={data.websiteUrl}
                onTimeline={(v) => update("timeline", v)}
                onCurrentSite={(v) => update("currentSite", v)}
                onWebsiteUrl={(v) => update("websiteUrl", v)}
              />
            )}
            {step === 4 && (
              <StepContact
                data={data}
                onChange={update}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {submitError && step === STEP_COUNT - 1 && (
        <p role="alert" className="mt-6 text-sm text-destructive">
          {submitError}
        </p>
      )}

      <div className="mt-8 flex flex-col-reverse items-stretch justify-between gap-3 sm:flex-row sm:items-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={goPrev}
          disabled={step === 0}
          className={cn("w-full sm:w-auto", step === 0 && "invisible")}
        >
          <ArrowLeft className="size-4" />
          Back
        </Button>

        {step < STEP_COUNT - 1 ? (
          <Button
            variant="default"
            size="cta"
            onClick={goNext}
            disabled={!canAdvance}
            className="w-full sm:w-auto"
          >
            Continue
            <ArrowRight className="size-4" />
          </Button>
        ) : (
          <Button
            variant="default"
            size="cta"
            onClick={handleSubmit}
            disabled={!canAdvance || submitting}
            className="w-full sm:w-auto"
          >
            {submitting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Sending…
              </>
            ) : (
              "Send My Project Brief"
            )}
          </Button>
        )}
      </div>
    </div>
  )
}

function StepBusinessType({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-heading text-xl font-semibold tracking-tight">
          What kind of business do you run?
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          This helps me understand your industry so I can tailor the site.
        </p>
      </div>
      <div className="grid gap-2.5 sm:grid-cols-2">
        {BUSINESS_TYPES.map((opt) => (
          <OptionCard
            key={opt.value}
            selected={value === opt.value}
            onClick={() => onChange(opt.value)}
            label={opt.label}
          />
        ))}
      </div>
    </div>
  )
}

function StepPackage({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-heading text-xl font-semibold tracking-tight">
          Which package interests you?
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Pick the closest fit — we can always adjust when we talk.
        </p>
      </div>
      <div className="grid gap-2.5">
        {PACKAGE_OPTIONS.map((opt) => (
          <OptionCard
            key={opt.value}
            selected={value === opt.value}
            onClick={() => onChange(opt.value)}
            label={opt.label}
            sublabel={opt.price}
          >
            <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
              {opt.description}
            </p>
          </OptionCard>
        ))}
      </div>
    </div>
  )
}

function StepProjectDetails({
  timeline,
  currentSite,
  websiteUrl,
  onTimeline,
  onCurrentSite,
  onWebsiteUrl,
}: {
  timeline: string
  currentSite: string
  websiteUrl: string
  onTimeline: (v: string) => void
  onCurrentSite: (v: string) => void
  onWebsiteUrl: (v: string) => void
}) {
  const showWebsiteUrl = currentSite !== "" && currentSite !== "none"

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-heading text-xl font-semibold tracking-tight">
          A bit about your project
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          No wrong answers — this helps me plan ahead.
        </p>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-medium text-foreground">
          What&apos;s your ideal timeline?
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          {TIMELINE_OPTIONS.map((opt) => (
            <OptionCard
              key={opt.value}
              selected={timeline === opt.value}
              onClick={() => onTimeline(opt.value)}
              label={opt.label}
            />
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-medium text-foreground">
          Do you have a website currently?
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          {CURRENT_SITE_OPTIONS.map((opt) => (
            <OptionCard
              key={opt.value}
              selected={currentSite === opt.value}
              onClick={() => {
                onCurrentSite(opt.value)
                if (opt.value === "none") onWebsiteUrl("")
              }}
              label={opt.label}
            />
          ))}
        </div>
      </div>

      {showWebsiteUrl && (
        <div className="space-y-2">
          <Label htmlFor="inquiry-website-url">
            Current website URL{" "}
            <span className="font-normal text-muted-foreground">(optional)</span>
          </Label>
          <Input
            id="inquiry-website-url"
            type="url"
            inputMode="url"
            autoComplete="url"
            placeholder="https://yourbusiness.co.nz"
            value={websiteUrl}
            onChange={(e) => onWebsiteUrl(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Paste your live site link if you have one — I&apos;ll review it before we talk.
          </p>
        </div>
      )}
    </div>
  )
}

function StepDiscovery({
  platformPreference,
  contentReadiness,
  copywritingSupport,
  onPlatform,
  onContent,
  onCopy,
}: {
  platformPreference: string
  contentReadiness: string
  copywritingSupport: string
  onPlatform: (v: string) => void
  onContent: (v: string) => void
  onCopy: (v: string) => void
}) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-heading text-xl font-semibold tracking-tight">
          Platform & content readiness
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          A quick filter so I can scope delivery and support correctly.
        </p>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-medium text-foreground">
          Do you have a platform preference?
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          {PLATFORM_OPTIONS.map((opt) => (
            <OptionCard
              key={opt.value}
              selected={platformPreference === opt.value}
              onClick={() => onPlatform(opt.value)}
              label={opt.label}
            />
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-medium text-foreground">
          Can you share content and images for the site?
        </p>
        <div className="grid gap-2">
          {CONTENT_OPTIONS.map((opt) => (
            <OptionCard
              key={opt.value}
              selected={contentReadiness === opt.value}
              onClick={() => onContent(opt.value)}
              label={opt.label}
            />
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-medium text-foreground">
          How about copywriting support?
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          {COPY_OPTIONS.map((opt) => (
            <OptionCard
              key={opt.value}
              selected={copywritingSupport === opt.value}
              onClick={() => onCopy(opt.value)}
              label={opt.label}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function StepContact({
  data,
  onChange,
}: {
  data: FormData
  onChange: <K extends keyof FormData>(field: K, value: FormData[K]) => void
}) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-heading text-xl font-semibold tracking-tight">
          How can I reach you?
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          I&apos;ll reply within 24 hours — usually much sooner.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="inquiry-name">
            Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="inquiry-name"
            placeholder="e.g. Sarah Mitchell"
            value={data.name}
            onChange={(e) => onChange("name", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="inquiry-email">
            Email <span className="text-destructive">*</span>
          </Label>
          <Input
            id="inquiry-email"
            type="email"
            placeholder="sarah@mybusiness.co.nz"
            value={data.email}
            onChange={(e) => onChange("email", e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="inquiry-phone">Phone (optional)</Label>
        <Input
          id="inquiry-phone"
          type="tel"
          placeholder="+64 28 851 30071"
          value={data.phone}
          onChange={(e) => onChange("phone", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="inquiry-message">
          Anything else I should know? (optional)
        </Label>
        <Textarea
          id="inquiry-message"
          placeholder="Tell me about your business, your goals, or any questions you have…"
          rows={3}
          value={data.message}
          onChange={(e) => onChange("message", e.target.value)}
        />
      </div>
    </div>
  )
}
