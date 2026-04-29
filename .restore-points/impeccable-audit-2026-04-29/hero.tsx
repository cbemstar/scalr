"use client"

import Link from "next/link"
import { useEffect, useMemo, useRef, useState } from "react"
import { useTheme } from "@wrksz/themes/client"
import { ArrowRight, Check } from "@phosphor-icons/react"
import gsap from "gsap"
import { CustomEase } from "gsap/CustomEase"
import { motion, useReducedMotion } from "framer-motion"
import posthog from "posthog-js"
import { Button } from "@/components/ui/button"
import { GLSLHills } from "@/components/ui/glsl-hills"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import "./crisp-hero.css"

if (typeof window !== "undefined") {
  gsap.registerPlugin(CustomEase)
}

const { heroCrisp } = siteConfig

/** Softer deceleration — family-aligned with loader `expo`, tuned for type */
const HERO_CONTENT_EASE_NAME = "heroContentReveal"
let heroContentEaseReady = false

function ensureHeroContentEase() {
  if (typeof window === "undefined" || heroContentEaseReady) return
  try {
    CustomEase.create(
      HERO_CONTENT_EASE_NAME,
      "M0,0 C0.05,0.02 0.14,0.98 1,1"
    )
    heroContentEaseReady = true
  } catch {
    heroContentEaseReady = false
  }
}

/** Strip order; index 2 is the “hero” tile that scales up (GLSL hills, not a photo). */
const LOADER_STRIP_INDICES = [3, 4, 0, 1, 2] as const
const LOADER_SHADER_STRIP_INDEX = 2

const LOADER_GLSL_PROPS = {
  speed: 0.38,
  cameraZ: 118,
  planeSize: 256,
} as const

const INTRO_STAGGER_SELECTOR = ".crisp-header__intro-stagger"

/** Rotating line completes “Websites that …” — keep distinct from the static headline to avoid repeating the tagline on every cycle. */
const HERO_ROTATING_PHRASES = [...siteConfig.heroRotatingPhrases] as const

const rotateSpring = { type: "spring" as const, stiffness: 58, damping: 22, mass: 0.85 }

function runCrispLoadingAnimation(
  container: HTMLElement,
  onIntroComplete: () => void
) {
  ensureHeroContentEase()
  const contentEase = heroContentEaseReady
    ? HERO_CONTENT_EASE_NAME
    : ("expo.out" as const)

  const scrimTargetRaw = getComputedStyle(container)
    .getPropertyValue("--crisp-scrim-target-opacity")
    .trim()
  const scrimTargetOpacity = Number.isFinite(parseFloat(scrimTargetRaw))
    ? parseFloat(scrimTargetRaw)
    : 0.84

  const revealImages = container.querySelectorAll<HTMLElement>(
    ".crisp-loader__group > *"
  )
  const isScaleUp = container.querySelectorAll<HTMLElement>(".crisp-loader__media")
  const isScaleDown = container.querySelectorAll<HTMLElement>(
    ".crisp-loader__media .is--scale-down"
  )
  const isRadius = container.querySelectorAll<HTMLElement>(
    ".crisp-loader__media.is--scaling.is--radius"
  )
  const staggerEls =
    container.querySelectorAll<HTMLElement>(INTRO_STAGGER_SELECTOR)
  const sliderScrim = container.querySelector<HTMLElement>(
    ".crisp-header__slider-scrim"
  )
  const loaderRoot = container.querySelector<HTMLElement>(".crisp-loader")
  const glslReveal = container.querySelector<HTMLElement>(
    ".crisp-header__glsl-reveal"
  )

  const tl = gsap.timeline({
    defaults: { ease: "expo.inOut" },
  })

  if (revealImages.length) {
    tl.fromTo(
      revealImages,
      { xPercent: 500 },
      { xPercent: -500, duration: 1.9, stagger: 0.05 }
    )
  }

  if (isScaleDown.length) {
    tl.to(
      isScaleDown,
      {
        scale: 0.5,
        duration: 1.65,
        stagger: {
          each: 0.05,
          from: "edges",
          ease: "none",
        },
        onComplete: () => {
          isRadius.forEach((el) => el.classList.remove("is--radius"))
        },
      },
      "-=0.1"
    )
  }

  if (isScaleUp.length) {
    tl.fromTo(
      isScaleUp,
      { width: "10em", height: "10em" },
      { width: "100vw", height: "100dvh", duration: 1.65, ease: "expo.inOut" },
      "<0.45"
    )
  }

  /*
   * Copy + scrim fade in with the tail of the scale-up — longer, softer ease and stagger
   * so the overlay and type read as one continuous reveal (not a hard pop).
   */
  const contentIn = "heroContentIn"
  tl.addLabel(contentIn, "-=1.22")

  if (sliderScrim) {
    tl.fromTo(
      sliderScrim,
      { opacity: 0, visibility: "hidden" },
      {
        opacity: scrimTargetOpacity,
        visibility: "visible",
        duration: 1.95,
        ease: "power2.out",
      },
      contentIn
    )
  }

  if (staggerEls.length) {
    tl.fromTo(
      staggerEls,
      { autoAlpha: 0, y: 14 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1.72,
        stagger: { amount: 0.95, from: "start" },
        ease: contentEase,
      },
      `${contentIn}+=0.06`
    )
  }

  /*
   * After the strip / scale slideshow, fade the loader out first, then fade the
   * backdrop shader in. Overlapping two separate WebGL canvases caused a
   * phase/contrast mismatch and a glitchy composite; sequential handoff keeps
   * a single visible hills pass at a time.
   */
  const handoff = "heroLoaderToGlsl"
  const loaderFadeOut = 0.92
  tl.addLabel(handoff, "-=0.72")

  if (loaderRoot) {
    tl.to(
      loaderRoot,
      {
        autoAlpha: 0,
        duration: loaderFadeOut,
        ease: "power2.out",
      },
      handoff
    )
  }

  if (glslReveal) {
    tl.fromTo(
      glslReveal,
      { opacity: 0, visibility: "hidden" },
      {
        opacity: 1,
        visibility: "visible",
        duration: 0.95,
        ease: "power2.out",
      },
      `${handoff}+=${loaderFadeOut}`
    )
  }

  tl.call(onIntroComplete, undefined, "+=0.08")

  return { timeline: tl as gsap.core.Timeline }
}

function HeroRotatingHeadline({
  introDone,
  staticHeadline,
}: {
  introDone: boolean
  staticHeadline: string
}) {
  const reduce = useReducedMotion()
  const [phraseIndex, setPhraseIndex] = useState(0)

  useEffect(() => {
    if (!introDone || reduce) return
    const id = window.setInterval(() => {
      setPhraseIndex((n) => (n + 1) % HERO_ROTATING_PHRASES.length)
    }, 2400)
    return () => window.clearInterval(id)
  }, [introDone, reduce])

  if (reduce) {
    return (
      <h1 className="crisp-header__h1 crisp-header__intro-stagger">{staticHeadline}</h1>
    )
  }

  const label = `Websites that ${HERO_ROTATING_PHRASES[phraseIndex]?.replace(/\.$/, "")}`

  return (
    <h1
      className="crisp-header__h1 crisp-header__intro-stagger"
      aria-label={label}
    >
      <span className="crisp-header__h1-prefix">Websites that</span>
      <span className="crisp-header__h1-rotate" aria-hidden>
        {HERO_ROTATING_PHRASES.map((phrase, index) => (
          <motion.span
            key={phrase}
            className="crisp-header__h1-rotate-word"
            initial={false}
            animate={
              phraseIndex === index
                ? { y: 0, opacity: 1 }
                : {
                    y: phraseIndex > index ? -72 : 72,
                    opacity: 0,
                  }
            }
            transition={rotateSpring}
          >
            {phrase}
          </motion.span>
        ))}
      </span>
    </h1>
  )
}

export function HeroSection() {
  const rootRef = useRef<HTMLElement>(null)
  const [introDone, setIntroDone] = useState(false)
  const { resolvedTheme } = useTheme()
  const glslTone = resolvedTheme === "light" ? "light" : "dark"

  const slides = heroCrisp.slideshow
  const loaderStrip = useMemo(
    () => LOADER_STRIP_INDICES.map((i) => slides[i]!),
    [slides]
  )

  /** Lock document scroll during the intro (nav uses `body`; we use `html` so they do not fight). */
  useEffect(() => {
    document.documentElement.style.overflow = introDone ? "" : "hidden"
    return () => {
      document.documentElement.style.overflow = ""
    }
  }, [introDone])

  useEffect(() => {
    const container = rootRef.current
    if (!container) return

    let timeline: gsap.core.Timeline | null = null
    let cancelled = false

    const stripInlineIntroStyles = () => {
      const reveals = container.querySelectorAll<HTMLElement>(
        INTRO_STAGGER_SELECTOR
      )
      gsap.set(reveals, { clearProps: "opacity,transform" })
      const scrim = container.querySelector<HTMLElement>(
        ".crisp-header__slider-scrim"
      )
      if (scrim) gsap.set(scrim, { clearProps: "opacity,visibility" })
      const loaderEl = container.querySelector<HTMLElement>(".crisp-loader")
      if (loaderEl) gsap.set(loaderEl, { clearProps: "opacity,visibility" })
      const glslEl = container.querySelector<HTMLElement>(
        ".crisp-header__glsl-reveal"
      )
      if (glslEl) gsap.set(glslEl, { clearProps: "opacity,visibility" })
    }

    const completeIntro = () => {
      if (cancelled) return
      setIntroDone(true)
      stripInlineIntroStyles()
    }

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (prefersReduced) {
      completeIntro()
      return () => {
        stripInlineIntroStyles()
      }
    }

    let fallbackTimer: ReturnType<typeof setTimeout> | null = null
    const disarmFallback = () => {
      if (fallbackTimer != null) {
        clearTimeout(fallbackTimer)
        fallbackTimer = null
      }
    }

    const start = () => {
      if (cancelled) return
      disarmFallback()
      fallbackTimer = setTimeout(() => {
        if (cancelled) return
        timeline?.kill()
        completeIntro()
      }, 7000)

      try {
        const result = runCrispLoadingAnimation(container, () => {
          disarmFallback()
          completeIntro()
        })
        timeline = result.timeline
      } catch {
        disarmFallback()
        completeIntro()
      }
    }

    void document.fonts.ready.then(start)

    return () => {
      cancelled = true
      disarmFallback()
      timeline?.kill()
      stripInlineIntroStyles()
    }
  }, [])

  return (
    <section
      ref={rootRef}
      id="hero"
      className={cn("crisp-header", !introDone && "is--loading")}
      aria-label="Introduction"
    >
      <div className="crisp-header__backdrop">
        <div className="crisp-header__glsl-reveal" aria-hidden>
          <GLSLHills {...LOADER_GLSL_PROPS} tone={glslTone} />
        </div>
      </div>
      <div className="crisp-header__slider-scrim" aria-hidden />
      <div className="crisp-header__grain" aria-hidden />

      <div className="crisp-loader" aria-hidden>
        <div className="crisp-loader__wrap">
          <div className="crisp-loader__groups">
            <div className="crisp-loader__group is--duplicate">
              {loaderStrip.map((img, idx) => (
                <div key={idx === LOADER_SHADER_STRIP_INDEX ? "d-glsl" : `d-${img.src}`} className="crisp-loader__single">
                  <div className="crisp-loader__media">
                    {idx === LOADER_SHADER_STRIP_INDEX ? (
                      <div
                        className="crisp-loader__shader-faux"
                        aria-hidden
                      />
                    ) : (
                      <img
                        loading="eager"
                        src={img.src}
                        alt={img.alt}
                        width={1920}
                        height={1280}
                        className="crisp-loader__cover-img"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="crisp-loader__group is--relative">
              {loaderStrip.map((img, idx) => {
                const isHeroScale = idx === LOADER_SHADER_STRIP_INDEX
                const scaleDown = !isHeroScale

                return (
                  <div
                    key={isHeroScale ? "r-glsl" : `r-${img.src}`}
                    className="crisp-loader__single"
                  >
                    <div
                      className={
                        isHeroScale
                          ? "crisp-loader__media is--scaling is--radius"
                          : "crisp-loader__media"
                      }
                    >
                      {isHeroScale ? (
                        introDone ? null : (
                          <div className="crisp-loader__shader-host">
                            <GLSLHills {...LOADER_GLSL_PROPS} tone={glslTone} />
                          </div>
                        )
                      ) : (
                        <img
                          loading="eager"
                          src={img.src}
                          alt={img.alt}
                          width={1920}
                          height={1280}
                          className="crisp-loader__cover-img is--scale-down"
                        />
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="crisp-loader__fade" />
          <div className="crisp-loader__fade is--duplicate" />
        </div>
      </div>

      <div className="crisp-header__content">
        <div className="crisp-header__layout">
          <div className="crisp-header__stack">
            <div className="crisp-header__eyebrow-wrap crisp-header__intro-stagger">
              <span className="crisp-header__eyebrow">{heroCrisp.kicker}</span>
            </div>

            <HeroRotatingHeadline
              introDone={introDone}
              staticHeadline={heroCrisp.headline}
            />

            <p className="crisp-header__lead crisp-header__intro-stagger">
              {heroCrisp.lead}
            </p>

            <ul
              className="crisp-header__trust crisp-header__intro-stagger"
              aria-label="At a glance"
            >
              {heroCrisp.trustLineItems.map((item) => (
                <li key={item} className="crisp-header__trust-item">
                  <Check
                    className="crisp-header__trust-check"
                    weight="bold"
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="crisp-header__actions crisp-header__intro-stagger">
              <Button
                asChild
                variant="default"
                size="cta"
                className="crisp-header__btn-primary st-magnetic"
              >
                <Link
                  href={heroCrisp.ctaPrimary.href}
                  string="magnetic"
                  string-id={heroCrisp.ctaPrimary.magneticId}
                  string-strength={0.22}
                  string-radius={150}
                  onClick={() =>
                    posthog.capture("hero_cta_clicked", {
                      label: heroCrisp.ctaPrimary.label,
                      variant: "primary",
                    })
                  }
                >
                  {heroCrisp.ctaPrimary.label}
                  <ArrowRight className="size-4 opacity-90" aria-hidden />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="cta"
                className="crisp-header__btn-secondary st-magnetic"
              >
                <Link
                  href={heroCrisp.ctaSecondary.href}
                  string="magnetic"
                  string-id={heroCrisp.ctaSecondary.magneticId}
                  string-strength={0.16}
                  string-radius={130}
                  onClick={() =>
                    posthog.capture("hero_cta_clicked", {
                      label: heroCrisp.ctaSecondary.label,
                      variant: "secondary",
                    })
                  }
                >
                  {heroCrisp.ctaSecondary.label}
                </Link>
              </Button>
            </div>

            <p className="crisp-header__footnote crisp-header__intro-stagger">
              {heroCrisp.note}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
