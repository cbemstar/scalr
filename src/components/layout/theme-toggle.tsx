"use client"

import { useTheme } from "@wrksz/themes/client"
import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

/**
 * Toggles between light and dark. Respects system default until the user chooses.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = resolvedTheme === "dark"

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-transparent text-foreground transition-[background-color,color,transform] duration-200",
        "hover:bg-foreground/8 active:scale-[0.96]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/40",
        className
      )}
      aria-label={
        !mounted
          ? "Toggle color theme"
          : isDark
            ? "Switch to light mode"
            : "Switch to dark mode"
      }
    >
      {mounted ? (
        isDark ? (
          <Sun className="size-[1.125rem]" strokeWidth={2} aria-hidden />
        ) : (
          <Moon className="size-[1.125rem]" strokeWidth={2} aria-hidden />
        )
      ) : (
        <span className="size-[1.125rem]" aria-hidden />
      )}
    </button>
  )
}
