"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import Link from "next/link"
import posthog from "posthog-js"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, Check, Loader2, Phone } from "lucide-react"
import { TurnstileField } from "@/components/common/turnstile-field"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
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
  { value: "not-sure", label: "Not sure — help me decide" },
] as const

type PackageOptionRow = {
  value: string
  label: string
  price: string
  description: string
}

const STANDARD_PACKAGE_OPTIONS: PackageOptionRow[] = siteConfig.packages.map((pkg) => ({
  value: `standard:${pkg.id}`,
  label: pkg.name,
  price: `$${pkg.price.toLocaleString()} NZD`,
  description: pkg.tagline,
}))

const ECOMMERCE_PACKAGE_OPTIONS: PackageOptionRow[] = siteConfig.ecommercePackages.map((pkg) => ({
  value: `shopify:${pkg.id}`,
  label: pkg.name,
  price: `$${pkg.price.toLocaleString()} NZD`,
  description: pkg.tagline,
}))

/** Stored in packageInterest when the lead wants a recommendation instead of picking a tier */
const PACKAGE_INTEREST_UNSURE = "unsure"

/** Sentinel for platform/content/copy when the lead chose integration-only path */
const NA_INTEGRATIONS = "n/a-integrations"

const PROJECT_INTENT_OPTIONS = [
  {
    value: "new-site",
    label: "New website or redesign",
    hint: "Standard or Shopify packages — full build scope.",
  },
  {
    value: "integrations-only",
    label: "Integration or standalone work",
    hint: "Tools, tracking, booking, or Shopify ops — no full new site assumed.",
  },
] as const

const PLATFORM_OPTIONS = [
  { value: "webflow", label: "Webflow" },
  { value: "wordpress", label: "WordPress" },
  { value: "shopify", label: "Shopify" },
  { value: "nextjs", label: "Custom build (Next.js)" },
  { value: "unsure", label: "I don't know — recommend for me" },
] as const

const CONTENT_OPTIONS = [
  { value: "ready", label: "Yes, I can provide content and images" },
  { value: "partial", label: "Some content is ready, some needs work" },
  { value: "none", label: "No, I need full content support" },
  { value: "not-sure", label: "Not sure yet — I'll need guidance" },
] as const

const COPY_OPTIONS = [
  { value: "have-copy", label: "I already have website copy" },
  { value: "need-help", label: "I need copywriting support" },
  { value: "unsure", label: "I don't know yet — advise me" },
] as const

const TIMELINE_OPTIONS = [
  { value: "asap", label: "As soon as possible" },
  { value: "2-weeks", label: "Within 2 weeks" },
  { value: "1-month", label: "Within a month" },
  { value: "flexible", label: "No rush — flexible" },
  { value: "not-sure", label: "Not sure — advise me when we talk" },
] as const

const CURRENT_SITE_OPTIONS = [
  { value: "none", label: "I don't have a website yet" },
  { value: "outdated", label: "I have one but it's outdated" },
  { value: "rebuild", label: "I have one but want a full rebuild" },
  { value: "webflow", label: "I have a Webflow site" },
  { value: "unsure", label: "Not sure what I need" },
] as const

type FormData = {
  projectIntent: "" | "new-site" | "integrations-only"
  businessType: string
  packageInterest: string
  /** Standalone sprint id when `projectIntent === "integrations-only"` */
  integrationSprintId: string
  selectedIntegrationModules: string[]
  toolsNotes: string
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
  projectIntent: "",
  businessType: "",
  packageInterest: "",
  integrationSprintId: "",
  selectedIntegrationModules: [],
  toolsNotes: "",
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

type ProjectIntent = FormData["projectIntent"]

function totalStepsForIntent(intent: ProjectIntent): number {
  if (!intent) return 1
  return intent === "integrations-only" ? 5 : 6
}

function stepKind(intent: ProjectIntent, step: number): string {
  if (!intent) return "project_intent"
  if (intent === "integrations-only") {
    const names = ["project_intent", "business_type", "integrations", "project_details", "contact"]
    return names[step] ?? "project_intent"
  }
  const names = [
    "project_intent",
    "business_type",
    "package",
    "discovery",
    "project_details",
    "contact",
  ]
  return names[step] ?? "project_intent"
}

function moduleMatchesBusiness(
  typical: readonly string[],
  businessType: string
): boolean {
  return (typical as readonly string[]).includes(businessType)
}

function sortModulesForBusiness(businessType: string) {
  const modules = [...siteConfig.integrationModules]
  if (!businessType) return modules
  return modules.sort((a, b) => {
    const aHit = moduleMatchesBusiness(a.typicalForBusinessTypes, businessType) ? 1 : 0
    const bHit = moduleMatchesBusiness(b.typicalForBusinessTypes, businessType) ? 1 : 0
    return bHit - aHit
  })
}

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ""

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

export function MultistepInquiryForm({ className }: { className?: string }) {
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const [data, setData] = useState<FormData>(INITIAL_DATA)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const formStartedRef = useRef(false)

  const totalSteps = totalStepsForIntent(data.projectIntent)
  const lastStepIndex = totalSteps - 1

  useEffect(() => {
    if (step !== lastStepIndex) {
      setTurnstileToken(null)
    }
  }, [step, lastStepIndex])

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

  const kind = stepKind(data.projectIntent, step)

  const canAdvance = (() => {
    if (!data.projectIntent) {
      return false
    }
    if (kind === "project_intent") {
      return !!data.projectIntent
    }
    if (kind === "business_type") {
      return !!data.businessType
    }
    if (kind === "package") {
      return !!data.packageInterest
    }
    if (kind === "integrations") {
      return !!data.integrationSprintId
    }
    if (kind === "discovery") {
      return (
        !!data.platformPreference &&
        !!data.contentReadiness &&
        !!data.copywritingSupport
      )
    }
    if (kind === "project_details") {
      return !!data.timeline && !!data.currentSite
    }
    if (kind === "contact") {
      return (
        !!data.name.trim() &&
        !!data.email.trim() &&
        (!TURNSTILE_SITE_KEY || !!turnstileToken)
      )
    }
    return false
  })()

  const goNext = () => {
    if (!canAdvance) return
    if (step < lastStepIndex) {
      posthog.capture("inquiry_form_step_completed", {
        step_number: step,
        step_name: kind,
        project_intent: data.projectIntent,
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

  const buildSubmitPayload = () => {
    const isIntegration = data.projectIntent === "integrations-only"
    const integrationSprintApi =
      data.integrationSprintId === "unsure" ? "" : data.integrationSprintId
    const packageInterest = isIntegration
      ? `integration:${data.integrationSprintId || "unsure"}`
      : data.packageInterest
    return {
      projectIntent: data.projectIntent,
      businessType: data.businessType,
      packageInterest,
      integrationSprintId: integrationSprintApi,
      selectedIntegrationModules: data.selectedIntegrationModules,
      toolsNotes: data.toolsNotes,
      platformPreference: isIntegration ? NA_INTEGRATIONS : data.platformPreference,
      contentReadiness: isIntegration ? NA_INTEGRATIONS : data.contentReadiness,
      copywritingSupport: isIntegration ? NA_INTEGRATIONS : data.copywritingSupport,
      timeline: data.timeline,
      currentSite: data.currentSite,
      websiteUrl: data.websiteUrl,
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
    }
  }

  const handleSubmit = async () => {
    if (!canAdvance) return
    setSubmitting(true)
    setSubmitError(null)
    const payload = buildSubmitPayload()
    posthog.capture("inquiry_form_submitted", {
      project_intent: data.projectIntent,
      business_type: data.businessType,
      package_interest: payload.packageInterest,
      integration_modules: data.selectedIntegrationModules,
      platform_preference: payload.platformPreference,
      timeline: data.timeline,
      current_site: data.currentSite,
    })
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          turnstileToken: turnstileToken ?? "",
        }),
      })
      const resPayload = (await res.json()) as { error?: string }
      if (!res.ok) {
        setSubmitError(
          resPayload.error ??
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
            I&apos;ll review your project details and get back to you within one business day.
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

  const atFinalStep = Boolean(data.projectIntent) && step === lastStepIndex

  return (
    <div className={cn("w-full", className)}>
      <div className="mb-6">
        <StepIndicator
          current={step}
          total={data.projectIntent ? totalSteps : 1}
        />
      </div>

      <div className="relative min-h-[320px] overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={`${step}-${kind}`}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {kind === "project_intent" && (
              <StepProjectIntent
                value={data.projectIntent}
                onChange={(v) => update("projectIntent", v)}
              />
            )}
            {kind === "business_type" && (
              <StepBusinessType
                value={data.businessType}
                onChange={(v) => update("businessType", v)}
              />
            )}
            {kind === "package" && (
              <StepPackage
                value={data.packageInterest}
                onChange={(v) => update("packageInterest", v)}
                businessType={data.businessType}
                selectedIntegrationModules={data.selectedIntegrationModules}
                onToggleIntegrationModule={(id) => {
                  setData((prev) => {
                    const has = prev.selectedIntegrationModules.includes(id)
                    const selectedIntegrationModules = has
                      ? prev.selectedIntegrationModules.filter((x) => x !== id)
                      : [...prev.selectedIntegrationModules, id]
                    return { ...prev, selectedIntegrationModules }
                  })
                }}
              />
            )}
            {kind === "integrations" && (
              <StepIntegration
                businessType={data.businessType}
                integrationSprintId={data.integrationSprintId}
                selectedIntegrationModules={data.selectedIntegrationModules}
                toolsNotes={data.toolsNotes}
                onSprint={(v) => update("integrationSprintId", v)}
                onToggleModule={(id) => {
                  setData((prev) => {
                    const has = prev.selectedIntegrationModules.includes(id)
                    const selectedIntegrationModules = has
                      ? prev.selectedIntegrationModules.filter((x) => x !== id)
                      : [...prev.selectedIntegrationModules, id]
                    return { ...prev, selectedIntegrationModules }
                  })
                }}
                onToolsNotes={(v) => update("toolsNotes", v)}
              />
            )}
            {kind === "discovery" && (
              <StepDiscovery
                platformPreference={data.platformPreference}
                contentReadiness={data.contentReadiness}
                copywritingSupport={data.copywritingSupport}
                onPlatform={(v) => update("platformPreference", v)}
                onContent={(v) => update("contentReadiness", v)}
                onCopy={(v) => update("copywritingSupport", v)}
              />
            )}
            {kind === "project_details" && (
              <StepProjectDetails
                timeline={data.timeline}
                currentSite={data.currentSite}
                websiteUrl={data.websiteUrl}
                onTimeline={(v) => update("timeline", v)}
                onCurrentSite={(v) => update("currentSite", v)}
                onWebsiteUrl={(v) => update("websiteUrl", v)}
              />
            )}
            {kind === "contact" && (
              <StepContact
                data={data}
                onChange={update}
                turnstileSiteKey={TURNSTILE_SITE_KEY}
                onTurnstileToken={setTurnstileToken}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {submitError && atFinalStep && (
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

        {!atFinalStep ? (
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

function StepProjectIntent({
  value,
  onChange,
}: {
  value: ProjectIntent
  onChange: (v: "new-site" | "integrations-only") => void
}) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-heading text-xl font-semibold tracking-tight">
          What are you looking for?
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Full website projects and integration-only work use the same brief — pick what fits.
        </p>
      </div>
      <div className="grid gap-2.5">
        {PROJECT_INTENT_OPTIONS.map((opt) => (
          <OptionCard
            key={opt.value}
            selected={value === opt.value}
            onClick={() => onChange(opt.value)}
            label={opt.label}
          >
            <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{opt.hint}</p>
          </OptionCard>
        ))}
      </div>
      <p className="text-xs leading-relaxed text-muted-foreground">
        <Link
          href="/services/integrations"
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          How add-ons and standalone sprints are priced
        </Link>{" "}
        — optional modules are listed on Pricing too.
      </p>
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
          This helps me understand your industry — and surface relevant integration add-ons.
        </p>
      </div>
      <div className="grid gap-2.5 sm:grid-cols-2">
        {BUSINESS_TYPES.map((opt) => (
          <div
            key={opt.value}
            className={opt.value === "not-sure" ? "sm:col-span-2" : undefined}
          >
            <OptionCard
              selected={value === opt.value}
              onClick={() => onChange(opt.value)}
              label={opt.label}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

function StepIntegration({
  businessType,
  integrationSprintId,
  selectedIntegrationModules,
  toolsNotes,
  onSprint,
  onToggleModule,
  onToolsNotes,
}: {
  businessType: string
  integrationSprintId: string
  selectedIntegrationModules: string[]
  toolsNotes: string
  onSprint: (v: string) => void
  onToggleModule: (id: string) => void
  onToolsNotes: (v: string) => void
}) {
  const modules = sortModulesForBusiness(businessType)

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-heading text-xl font-semibold tracking-tight">
          Sprint &amp; add-ons
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Pick the closest standalone sprint. Optional add-ons help me quote — we confirm scope before
          work starts.
        </p>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-medium text-foreground">Standalone sprint</p>
        <div className="grid gap-2.5">
          {siteConfig.standaloneSprints.map((s) => (
            <OptionCard
              key={s.id}
              selected={integrationSprintId === s.id}
              onClick={() => onSprint(s.id)}
              label={`${s.name} — from $${s.fromPrice.toLocaleString()} NZD`}
            >
              <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{s.outcome}</p>
              <p className="mt-1 text-[11px] text-muted-foreground/90">{s.deliveryHint}</p>
            </OptionCard>
          ))}
          <OptionCard
            selected={integrationSprintId === "unsure"}
            onClick={() => onSprint("unsure")}
            label="Not sure yet — recommend a sprint for me"
          />
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-medium text-foreground">
          Interested add-ons <span className="font-normal text-muted-foreground">(optional)</span>
        </p>
        <div className="grid gap-2">
          {modules.map((m) => {
            const suggested =
              businessType && moduleMatchesBusiness(m.typicalForBusinessTypes, businessType)
            return (
              <label
                key={m.id}
                className={cn(
                  "flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 text-left transition-colors",
                  selectedIntegrationModules.includes(m.id)
                    ? "border-primary bg-primary/[0.06] ring-1 ring-primary/30"
                    : "border-border/70 bg-background hover:border-primary/30"
                )}
              >
                <Checkbox
                  className="mt-0.5"
                  checked={selectedIntegrationModules.includes(m.id)}
                  onCheckedChange={() => onToggleModule(m.id)}
                />
                <span className="flex-1">
                  <span className="text-sm font-medium text-foreground">{m.label}</span>
                  {suggested ? (
                    <span className="ml-2 text-[10px] font-medium uppercase tracking-wide text-primary">
                      Often paired
                    </span>
                  ) : null}
                  <span className="mt-0.5 block text-xs text-muted-foreground">{m.outcome}</span>
                  <span className="mt-1 block font-mono text-[11px] text-muted-foreground">
                    from ${m.fromPrice.toLocaleString()} NZD
                  </span>
                </span>
              </label>
            )
          })}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="inquiry-tools-notes">
          Tools you use <span className="font-normal text-muted-foreground">(optional)</span>
        </Label>
        <Textarea
          id="inquiry-tools-notes"
          placeholder="e.g. Xero, Calendly, Lightspeed, Mailchimp, existing Shopify theme…"
          rows={3}
          value={toolsNotes}
          onChange={(e) => onToolsNotes(e.target.value)}
        />
      </div>
    </div>
  )
}

function StepPackage({
  value,
  onChange,
  businessType,
  selectedIntegrationModules,
  onToggleIntegrationModule,
}: {
  value: string
  onChange: (v: string) => void
  businessType: string
  selectedIntegrationModules: string[]
  onToggleIntegrationModule: (id: string) => void
}) {
  const [buildType, setBuildType] = useState<"standard" | "ecommerce">(() =>
    value.startsWith("shopify:") ? "ecommerce" : "standard"
  )

  useEffect(() => {
    if (!value) return
    if (value.startsWith("shopify:")) setBuildType("ecommerce")
    else if (value.startsWith("standard:")) setBuildType("standard")
  }, [value])

  const activeOptions =
    buildType === "standard" ? STANDARD_PACKAGE_OPTIONS : ECOMMERCE_PACKAGE_OPTIONS
  const selected = activeOptions.find((o) => o.value === value)
  const selectValue =
    value && activeOptions.some((o) => o.value === value) ? value : undefined

  const setCommerceMode = (nextCommerce: boolean) => {
    const nextType = nextCommerce ? "ecommerce" : "standard"
    if (nextType === buildType) return
    setBuildType(nextType)
    onChange("")
  }

  const showPlanPicker = value !== PACKAGE_INTEREST_UNSURE

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-heading text-xl font-semibold tracking-tight">
          Which package interests you?
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Totally fine if you&apos;re not sure yet — pick what fits, or say so below.
        </p>
      </div>

      <OptionCard
        selected={value === PACKAGE_INTEREST_UNSURE}
        onClick={() => onChange(PACKAGE_INTEREST_UNSURE)}
        label="Not sure yet — recommend a package for me"
      >
        <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
          We&apos;ll nail down standard vs ecommerce and the right tier when we talk.
        </p>
      </OptionCard>

      {showPlanPicker ? (
        <>
          <p className="text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Or pick a direction
          </p>

          <div className="flex flex-col gap-2">
            <p
              id="inquiry-package-mode-label"
              className="text-xs font-medium uppercase tracking-widest text-muted-foreground"
            >
              What are you building?
            </p>
            <div
              className="flex w-full flex-wrap items-center gap-2 rounded-2xl border border-border/70 bg-muted/20 px-3 py-2.5 shadow-sm sm:gap-3 sm:px-4"
              role="group"
              aria-labelledby="inquiry-package-mode-label"
            >
              <button
                type="button"
                onClick={() => {
                  if (buildType === "standard") return
                  setCommerceMode(false)
                  posthog.capture("inquiry_package_mode_changed", { mode: "standard_sites" })
                }}
                className={cn(
                  "min-h-9 flex-1 rounded-lg px-3 py-2 text-center text-sm transition-colors sm:flex-none sm:px-4",
                  buildType === "standard"
                    ? "bg-background font-semibold text-foreground shadow-sm ring-1 ring-border/80"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Standard Sites
              </button>
              <Switch
                checked={buildType === "ecommerce"}
                onCheckedChange={(checked) => {
                  if (checked === (buildType === "ecommerce")) return
                  setCommerceMode(checked)
                  posthog.capture("inquiry_package_mode_changed", {
                    mode: checked ? "ecommerce" : "standard_sites",
                  })
                }}
                className="shrink-0"
                aria-label={
                  buildType === "ecommerce"
                    ? "Switch to Standard Sites packages"
                    : "Switch to Ecommerce packages"
                }
              />
              <button
                type="button"
                onClick={() => {
                  if (buildType === "ecommerce") return
                  setCommerceMode(true)
                  posthog.capture("inquiry_package_mode_changed", { mode: "ecommerce" })
                }}
                className={cn(
                  "min-h-9 flex-1 rounded-lg px-3 py-2 text-center text-sm transition-colors sm:flex-none sm:px-4",
                  buildType === "ecommerce"
                    ? "bg-background font-semibold text-foreground shadow-sm ring-1 ring-border/80"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Ecommerce
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="inquiry-package-plan">Plan</Label>
            <Select value={selectValue} onValueChange={onChange}>
              <SelectTrigger id="inquiry-package-plan" className="h-11 w-full">
                <SelectValue placeholder="Choose a plan…" />
              </SelectTrigger>
              <SelectContent
                position="popper"
                className="max-w-[min(100vw-2rem,var(--radix-select-trigger-width))]"
              >
                {activeOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {`${opt.label} — ${opt.price}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selected ? (
              <p className="rounded-lg border border-border/60 bg-muted/20 px-3 py-2 text-sm leading-relaxed text-muted-foreground">
                {selected.description}
              </p>
            ) : null}
          </div>
        </>
      ) : (
        <button
          type="button"
          onClick={() => onChange("")}
          className="w-full rounded-xl border border-dashed border-border/80 bg-muted/10 px-4 py-3 text-center text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/[0.03] hover:text-foreground"
        >
          Prefer to browse plans yourself? Show standard & ecommerce options
        </button>
      )}

      <div className="border-t border-border/60 pt-6">
        <p className="text-sm font-medium text-foreground">
          Interested integration add-ons{" "}
          <span className="font-normal text-muted-foreground">(optional)</span>
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          From-prices on Pricing — typical for your industry are highlighted. We confirm scope before
          work starts.
        </p>
        <div className="mt-3 grid gap-2">
          {sortModulesForBusiness(businessType).map((m) => {
            const suggested =
              businessType && moduleMatchesBusiness(m.typicalForBusinessTypes, businessType)
            return (
              <label
                key={m.id}
                className={cn(
                  "flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 text-left transition-colors",
                  selectedIntegrationModules.includes(m.id)
                    ? "border-primary bg-primary/[0.06] ring-1 ring-primary/30"
                    : "border-border/70 bg-background hover:border-primary/30"
                )}
              >
                <Checkbox
                  className="mt-0.5"
                  checked={selectedIntegrationModules.includes(m.id)}
                  onCheckedChange={() => onToggleIntegrationModule(m.id)}
                />
                <span className="flex-1">
                  <span className="text-sm font-medium text-foreground">{m.label}</span>
                  {suggested ? (
                    <span className="ml-2 text-[10px] font-medium uppercase tracking-wide text-primary">
                      Often paired
                    </span>
                  ) : null}
                  <span className="mt-0.5 block text-xs text-muted-foreground">{m.outcome}</span>
                  <span className="mt-1 block font-mono text-[11px] text-muted-foreground">
                    from ${m.fromPrice.toLocaleString()} NZD
                  </span>
                </span>
              </label>
            )
          })}
        </div>
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
          No wrong answers — this helps me plan ahead. If dates aren&apos;t firm, the timeline
          section has a not-sure option.
        </p>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-medium text-foreground">
          What&apos;s your ideal timeline?
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          {TIMELINE_OPTIONS.map((opt) => (
            <div
              key={opt.value}
              className={opt.value === "not-sure" ? "sm:col-span-2" : undefined}
            >
              <OptionCard
                selected={timeline === opt.value}
                onClick={() => onTimeline(opt.value)}
                label={opt.label}
              />
            </div>
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
          A quick filter so I can scope delivery and support correctly. Don&apos;t guess — each
          section includes a not-sure or recommend-for-me option.
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
  turnstileSiteKey,
  onTurnstileToken,
}: {
  data: FormData
  onChange: <K extends keyof FormData>(field: K, value: FormData[K]) => void
  turnstileSiteKey: string
  onTurnstileToken: (token: string | null) => void
}) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-heading text-xl font-semibold tracking-tight">
          How can I reach you?
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          I&apos;ll reply within one business day — usually much sooner.
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

      {turnstileSiteKey ? (
        <TurnstileField siteKey={turnstileSiteKey} onToken={onTurnstileToken} className="pt-2" />
      ) : null}

      <p className="text-xs leading-relaxed text-muted-foreground">
        By sending this brief, you agree to our{" "}
        <Link href={siteConfig.legal.privacy} className="text-primary underline-offset-2 hover:underline">
          Privacy Policy
        </Link>{" "}
        and{" "}
        <Link href={siteConfig.legal.terms} className="text-primary underline-offset-2 hover:underline">
          Terms
        </Link>
        . We only use your details to respond to this inquiry.
      </p>
    </div>
  )
}
