"use client"

import { MouseEvent, useEffect, useLayoutEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LinkedinLogoIcon } from "@phosphor-icons/react"
import gsap from "gsap"
import { CustomEase } from "gsap/CustomEase"
import { LiquidGlass } from "@mael-667/liquid-glass-react"
import { useTheme } from "@wrksz/themes/client"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import { buttonVariants } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import "./sterling-gate-kinetic-navigation.css"

if (typeof window !== "undefined") {
  gsap.registerPlugin(CustomEase)
}

const EASE_MAIN = "sg-main"
const EASE_MENU_IN = "sg-menu-in"
const EASE_MENU_OUT = "sg-menu-out"
let customEaseRegistered = false

function ensureMainEase() {
  if (typeof window === "undefined" || customEaseRegistered) return
  try {
    /* Primary UI — smooth deceleration */
    CustomEase.create(EASE_MAIN, "M0,0 C0.08,0.01 0.18,1 1,1")
    /* Panel / drawer — soft landing */
    CustomEase.create(EASE_MENU_IN, "M0,0 C0.04,0.22 0.12,1 1,1")
    /* Exit — quick settle without snap */
    CustomEase.create(EASE_MENU_OUT, "M0,0 C0.45,0 0.2,1 1,1")
    customEaseRegistered = true
  } catch {
    /* CustomEase unavailable */
  }
}

function getMotionDurations() {
  if (typeof window === "undefined") {
    return {
      panel: 0.62,
      stagger: 0.1,
      links: 0.038,
      menuSlide: 0.78,
      overlay: 0.48,
    }
  }
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  if (reduce)
    return { panel: 0.01, stagger: 0, links: 0, menuSlide: 0.01, overlay: 0.01 }
  return {
    panel: 0.62,
    stagger: 0.1,
    links: 0.038,
    menuSlide: 0.78,
    overlay: 0.48,
  }
}

function padIndex(n: number) {
  return String(n).padStart(2, "0")
}

export function SterlingGateKineticNavigation({
  scrolled = false,
}: {
  scrolled?: boolean
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  /** Skip running the “close” timeline on the first paint (avoids GSAP inline styles on links before any open). */
  const skipInitialCloseTimeline = useRef(true)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMenuOpen])

  useLayoutEffect(() => {
    const root = containerRef.current
    if (!root) return

    ensureMainEase()

    const navWrap = root.querySelector<HTMLElement>(".nav-overlay-wrapper")
    const menu = root.querySelector<HTMLElement>(".menu-content")
    const overlay = root.querySelector<HTMLElement>(".overlay")
    const bgPanels = root.querySelectorAll<HTMLElement>(".backdrop-layer")

    if (navWrap) gsap.set(navWrap, { display: "none" })
    if (overlay) gsap.set(overlay, { autoAlpha: 0 })
    if (menu) gsap.set(menu, { xPercent: 120 })
    bgPanels.forEach((p) => gsap.set(p, { xPercent: 101 }))
  }, [])

  useEffect(() => {
    const root = containerRef.current
    if (!root) return

    ensureMainEase()

    const menuItems = root.querySelectorAll(".menu-list-item[data-shape]")
    const shapesContainer = root.querySelector(".ambient-background-shapes")

    menuItems.forEach((item) => {
      const shapeIndex = item.getAttribute("data-shape")
      const shape = shapesContainer
        ? shapesContainer.querySelector<SVGElement>(`.bg-shape-${shapeIndex}`)
        : null
      if (!shape) return

      const shapeEls = shape.querySelectorAll(".shape-element")

      const onEnter = () => {
        if (shapesContainer) {
          shapesContainer
            .querySelectorAll(".bg-shape")
            .forEach((s) => s.classList.remove("active"))
        }
        shape.classList.add("active")
        gsap.fromTo(
          shapeEls,
          { scale: 0.5, opacity: 0, rotation: -10 },
          {
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "back.out(1.7)",
            overwrite: "auto",
          }
        )
      }

      const onLeave = () => {
        gsap.to(shapeEls, {
          scale: 0.8,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => shape.classList.remove("active"),
          overwrite: "auto",
        })
      }

      item.addEventListener("mouseenter", onEnter)
      item.addEventListener("mouseleave", onLeave)

      ;(item as HTMLElement & { _sgCleanup?: () => void })._sgCleanup = () => {
        item.removeEventListener("mouseenter", onEnter)
        item.removeEventListener("mouseleave", onLeave)
      }
    })

    return () => {
      menuItems.forEach((item) => {
        const el = item as HTMLElement & { _sgCleanup?: () => void }
        el._sgCleanup?.()
      })
    }
  }, [])

  useEffect(() => {
    const root = containerRef.current
    if (!root) return

    if (skipInitialCloseTimeline.current && !isMenuOpen) {
      skipInitialCloseTimeline.current = false
      return
    }
    skipInitialCloseTimeline.current = false

    ensureMainEase()
    const ease = customEaseRegistered ? EASE_MAIN : "power3.out"
    const easeMenuIn = customEaseRegistered ? EASE_MENU_IN : "power3.out"
    const easeMenuOut = customEaseRegistered ? EASE_MENU_OUT : "power3.inOut"
    const { panel, stagger, menuSlide, overlay: overlayDur } =
      getMotionDurations()

    const navWrap = root.querySelector<HTMLElement>(".nav-overlay-wrapper")
    const menu = root.querySelector<HTMLElement>(".menu-content")
    const overlay = root.querySelector<HTMLElement>(".overlay")
    const bgPanels = root.querySelectorAll<HTMLElement>(".backdrop-layer")
    /** Scope to the drawer only — never header controls */
    const menuLinks = root.querySelectorAll<HTMLElement>(
      ".menu-content .nav-link"
    )
    const fadeTargets = root.querySelectorAll<HTMLElement>("[data-menu-fade]")
    const menuButton = root.querySelector<HTMLElement>(".nav-close-btn")
    const menuButtonTexts = menuButton?.querySelectorAll("p")
    const menuButtonIcon =
      menuButton?.querySelector<SVGElement>(".menu-button-icon") ?? null

    if (isMenuOpen && (!navWrap || !menu)) return

    const tl = gsap.timeline({ defaults: { ease } })

    if (isMenuOpen) {
      navWrap!.setAttribute("data-nav", "open")

      /* Drop stale GSAP props (opacity/transform) left by killed timelines or Strict Mode */
      if (menuLinks.length) {
        gsap.set(menuLinks, { clearProps: "opacity,transform" })
      }

      gsap.set(menu!, { xPercent: 120 })
      if (bgPanels.length) gsap.set(bgPanels, { xPercent: 101 })
      if (overlay) gsap.set(overlay, { autoAlpha: 0 })
      if (menuButtonTexts?.length) gsap.set(menuButtonTexts, { yPercent: 0 })
      if (menuButtonIcon) gsap.set(menuButtonIcon, { rotate: 0 })
      if (fadeTargets.length) gsap.set(fadeTargets, { autoAlpha: 0, yPercent: 28 })

      const t0 = 0
      tl.set(navWrap!, { display: "block" }, t0)

      tl.fromTo(
        menu!,
        { xPercent: 120 },
        { xPercent: 0, duration: menuSlide, ease: easeMenuIn },
        t0
      )
      if (overlay) {
        tl.fromTo(
          overlay,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: overlayDur, ease: easeMenuIn },
          t0
        )
      }
      if (bgPanels.length) {
        tl.fromTo(
          bgPanels,
          { xPercent: 101 },
          {
            xPercent: 0,
            stagger,
            duration: panel,
            ease: easeMenuIn,
          },
          t0 + 0.04
        )
      }
      if (menuButtonTexts?.length) {
        tl.fromTo(
          menuButtonTexts,
          { yPercent: 0 },
          { yPercent: -100, stagger: 0.2, duration: 0.42, ease: easeMenuIn },
          t0
        )
      }
      if (menuButtonIcon) {
        tl.fromTo(
          menuButtonIcon,
          { rotate: 0 },
          { rotate: 315, duration: 0.5, ease: easeMenuIn },
          t0
        )
      }

      const afterBackdrop = bgPanels.length ? ">-=0.22" : ">-=0.05"
      if (fadeTargets.length) {
        tl.fromTo(
          fadeTargets,
          { autoAlpha: 0, yPercent: 28 },
          {
            autoAlpha: 1,
            yPercent: 0,
            stagger: 0.035,
            ease: easeMenuIn,
            duration: 0.4,
            clearProps: "all",
          },
          afterBackdrop
        )
      }
    } else {
      if (navWrap) navWrap.setAttribute("data-nav", "closed")

      if (fadeTargets.length) {
        tl.to(
          fadeTargets,
          {
            autoAlpha: 0,
            yPercent: -16,
            stagger: 0.025,
            duration: 0.22,
            ease: easeMenuOut,
          },
          0
        )
      }
      if (overlay) {
        tl.to(
          overlay,
          { autoAlpha: 0, duration: 0.42, ease: easeMenuOut },
          ">-=0.08"
        )
      }
      if (bgPanels.length) {
        tl.to(
          bgPanels,
          {
            xPercent: 101,
            stagger: { each: 0.09, from: "end" },
            duration: 0.52,
            ease: easeMenuOut,
          },
          "<0.12"
        )
      }
      if (menu) {
        tl.to(
          menu,
          { xPercent: 120, duration: 0.58, ease: easeMenuOut },
          "<0.18"
        )
      }
      if (menuButtonTexts?.length) {
        tl.to(
          menuButtonTexts,
          { yPercent: 0, duration: 0.42, ease: easeMenuOut },
          "<0.1"
        )
      }
      if (menuButtonIcon) {
        tl.to(
          menuButtonIcon,
          { rotate: 0, duration: 0.42, ease: easeMenuOut },
          "<"
        )
      }
      if (navWrap) tl.set(navWrap, { display: "none" })
    }

    return () => {
      tl.kill()
    }
  }, [isMenuOpen])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) setIsMenuOpen(false)
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [isMenuOpen])

  const toggleMenu = () => setIsMenuOpen((p) => !p)
  const closeMenu = () => setIsMenuOpen(false)
  const goToHero = (event: MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== "/") return
    event.preventDefault()

    const hero = document.getElementById("hero")
    if (hero) {
      hero.scrollIntoView({ behavior: "smooth", block: "start" })
      return
    }
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div ref={containerRef} className="sterling-kinetic-nav">
      <div
        className={cn(
          "site-header-wrapper transition-[border-color,box-shadow] duration-300",
          scrolled
            ? "site-header-wrapper--scrolled"
            : "site-header-wrapper--blended",
          isMenuOpen && "site-header-wrapper--menu-open"
        )}
      >
        <LiquidGlass
          as="div"
          large
          className={cn(
            "sterling-liquid-glass blur-7 w-full min-w-0 max-w-full rounded-full",
            resolvedTheme === "light" && "glassLightMode",
            scrolled && "sterling-liquid-glass--scrolled"
          )}
        >
          <header className="site-header-inner">
            <div className="sterling-kinetic-nav__inner">
              <nav className="nav-row" aria-label="Top bar">
                <Link
                  href="/#hero"
                  className="nav-logo-row sg-w-inline-block"
                  aria-label="Home"
                  onClick={goToHero}
                >
                  <span className="nav-logo-shiny">{siteConfig.name}</span>
                </Link>

                <div className="nav-row__right">
                  <Link
                    href="#contact"
                    string="magnetic"
                    string-id="header-cta-contact"
                    string-strength={0.22}
                    string-radius={130}
                    className={cn(
                      buttonVariants({
                        variant: scrolled ? "default" : "outline",
                        size: "sm",
                      }),
                      "st-magnetic hidden text-xs sm:inline-flex sm:text-sm",
                      !scrolled && "border-foreground/15 bg-transparent hover:bg-foreground/5"
                    )}
                  >
                    Get in touch
                  </Link>

                  <button
                    type="button"
                    className="nav-close-btn"
                    onClick={toggleMenu}
                    aria-expanded={isMenuOpen}
                    aria-controls="site-kinetic-nav-overlay"
                    aria-haspopup="dialog"
                  >
                    <div className="menu-button-text">
                      <p className="p-large">Menu</p>
                      <p className="p-large">Close</p>
                    </div>
                    <div className="icon-wrap" aria-hidden>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        viewBox="0 0 16 16"
                        fill="none"
                        className="menu-button-icon"
                      >
                        <path
                          d="M7.33333 16L7.33333 -3.2055e-07L8.66667 -3.78832e-07L8.66667 16L7.33333 16Z"
                          fill="currentColor"
                        />
                        <path
                          d="M16 8.66667L-2.62269e-07 8.66667L-3.78832e-07 7.33333L16 7.33333L16 8.66667Z"
                          fill="currentColor"
                        />
                        <path
                          d="M6 7.33333L7.33333 7.33333L7.33333 6C7.33333 6.73637 6.73638 7.33333 6 7.33333Z"
                          fill="currentColor"
                        />
                        <path
                          d="M10 7.33333L8.66667 7.33333L8.66667 6C8.66667 6.73638 9.26362 7.33333 10 7.33333Z"
                          fill="currentColor"
                        />
                        <path
                          d="M6 8.66667L7.33333 8.66667L7.33333 10C7.33333 9.26362 6.73638 8.66667 6 8.66667Z"
                          fill="currentColor"
                        />
                        <path
                          d="M10 8.66667L8.66667 8.66667L8.66667 10C8.66667 9.26362 9.26362 8.66667 10 8.66667Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                  </button>
                </div>
              </nav>
            </div>
          </header>
        </LiquidGlass>
      </div>

      <section
        className="fullscreen-menu-container"
        aria-hidden={!isMenuOpen}
      >
        <div
          id="site-kinetic-nav-overlay"
          data-nav="closed"
          className="nav-overlay-wrapper"
          role="dialog"
          aria-hidden={!isMenuOpen}
          aria-label="Site navigation"
          {...(isMenuOpen ? { "aria-modal": true as const } : {})}
        >
          <div
            className="overlay"
            onClick={closeMenu}
            aria-hidden
          />
          <nav className="menu-content" aria-label="Page sections">
            <div className="menu-bg">
              <div className="backdrop-layer first" />
              <div className="backdrop-layer second" />
              <div className="backdrop-layer" />

              <div className="ambient-background-shapes">
                <svg
                  className="bg-shape bg-shape-1"
                  viewBox="0 0 400 400"
                  fill="none"
                  aria-hidden
                >
                  <circle className="shape-element" cx="80" cy="120" r="40" fill="color-mix(in oklch, var(--primary) 15%, transparent)" />
                  <circle className="shape-element" cx="300" cy="80" r="60" fill="color-mix(in oklch, var(--primary) 12%, transparent)" />
                  <circle className="shape-element" cx="200" cy="300" r="80" fill="color-mix(in oklch, var(--primary) 8%, transparent)" />
                  <circle className="shape-element" cx="350" cy="280" r="30" fill="color-mix(in oklch, var(--primary) 15%, transparent)" />
                </svg>

                <svg
                  className="bg-shape bg-shape-2"
                  viewBox="0 0 400 400"
                  fill="none"
                  aria-hidden
                >
                  <path className="shape-element" d="M0 200 Q100 100, 200 200 T 400 200" stroke="color-mix(in oklch, var(--primary) 18%, transparent)" strokeWidth="60" fill="none" />
                  <path className="shape-element" d="M0 280 Q100 180, 200 280 T 400 280" stroke="color-mix(in oklch, var(--primary) 12%, transparent)" strokeWidth="40" fill="none" />
                </svg>

                <svg
                  className="bg-shape bg-shape-3"
                  viewBox="0 0 400 400"
                  fill="none"
                  aria-hidden
                >
                  <circle className="shape-element" cx="50" cy="50" r="8" fill="color-mix(in oklch, var(--primary) 25%, transparent)" />
                  <circle className="shape-element" cx="150" cy="50" r="8" fill="color-mix(in oklch, var(--primary) 20%, transparent)" />
                  <circle className="shape-element" cx="250" cy="50" r="8" fill="color-mix(in oklch, var(--primary) 25%, transparent)" />
                  <circle className="shape-element" cx="350" cy="50" r="8" fill="color-mix(in oklch, var(--primary) 20%, transparent)" />
                  <circle className="shape-element" cx="100" cy="150" r="12" fill="color-mix(in oklch, var(--primary) 18%, transparent)" />
                  <circle className="shape-element" cx="200" cy="150" r="12" fill="color-mix(in oklch, var(--primary) 18%, transparent)" />
                  <circle className="shape-element" cx="300" cy="150" r="12" fill="color-mix(in oklch, var(--primary) 18%, transparent)" />
                  <circle className="shape-element" cx="50" cy="250" r="10" fill="color-mix(in oklch, var(--primary) 22%, transparent)" />
                  <circle className="shape-element" cx="150" cy="250" r="10" fill="color-mix(in oklch, var(--primary) 22%, transparent)" />
                  <circle className="shape-element" cx="250" cy="250" r="10" fill="color-mix(in oklch, var(--primary) 22%, transparent)" />
                  <circle className="shape-element" cx="350" cy="250" r="10" fill="color-mix(in oklch, var(--primary) 22%, transparent)" />
                  <circle className="shape-element" cx="100" cy="350" r="6" fill="color-mix(in oklch, var(--primary) 25%, transparent)" />
                  <circle className="shape-element" cx="200" cy="350" r="6" fill="color-mix(in oklch, var(--primary) 25%, transparent)" />
                  <circle className="shape-element" cx="300" cy="350" r="6" fill="color-mix(in oklch, var(--primary) 25%, transparent)" />
                </svg>

                <svg
                  className="bg-shape bg-shape-4"
                  viewBox="0 0 400 400"
                  fill="none"
                  aria-hidden
                >
                  <path className="shape-element" d="M100 100 Q150 50, 200 100 Q250 150, 200 200 Q150 250, 100 200 Q50 150, 100 100" fill="color-mix(in oklch, var(--primary) 10%, transparent)" />
                  <path className="shape-element" d="M250 200 Q300 150, 350 200 Q400 250, 350 300 Q400 250, 350 300 Q300 350, 250 300 Q200 250, 250 200" fill="color-mix(in oklch, var(--primary) 8%, transparent)" />
                </svg>

                <svg
                  className="bg-shape bg-shape-5"
                  viewBox="0 0 400 400"
                  fill="none"
                  aria-hidden
                >
                  <line className="shape-element" x1="0" y1="100" x2="300" y2="400" stroke="color-mix(in oklch, var(--primary) 12%, transparent)" strokeWidth="30" />
                  <line className="shape-element" x1="100" y1="0" x2="400" y2="300" stroke="color-mix(in oklch, var(--primary) 10%, transparent)" strokeWidth="25" />
                  <line className="shape-element" x1="200" y1="0" x2="400" y2="200" stroke="color-mix(in oklch, var(--primary) 8%, transparent)" strokeWidth="20" />
                </svg>
              </div>
            </div>

            <div className="menu-content-wrapper">
              <ul className="menu-list">
                {siteConfig.nav.map((item, i) => {
                  const shape = String(i + 1)
                  return (
                    <li
                      key={item.href}
                      className="menu-list-item"
                      data-shape={shape}
                    >
                      <Link
                        href={item.href}
                        className="nav-link sg-w-inline-block"
                        onClick={closeMenu}
                      >
                        <span className="nav-link-index">{padIndex(i + 1)}</span>
                        <p className="nav-link-text">{item.label}</p>
                        <div className="nav-link-hover-bg" />
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className="menu-footer" data-menu-fade>
              <div className="menu-footer-row">
                <span className="menu-footer-label">LinkedIn</span>
                <Link
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="menu-footer-value inline-flex items-center gap-2"
                  onClick={closeMenu}
                >
                  <LinkedinLogoIcon className="size-4 shrink-0" weight="fill" aria-hidden />
                  Open profile
                </Link>
              </div>
              <div className="menu-footer-row">
                <span className="menu-footer-label">Theme</span>
                <ThemeToggle className="size-10 hover:bg-muted/80" />
              </div>
              <div className="menu-footer-row">
                <span className="menu-footer-label">Get in touch</span>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="menu-footer-value"
                >
                  {siteConfig.contact.email}
                </a>
              </div>
              <div className="menu-footer-row">
                <span className="menu-footer-label">Location</span>
                <span className="menu-footer-value">
                  {siteConfig.contact.location}
                </span>
              </div>
            </div>
          </nav>
        </div>
      </section>
    </div>
  )
}
