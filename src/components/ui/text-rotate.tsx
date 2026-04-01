"use client"

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react"
import {
  AnimatePresence,
  AnimatePresenceProps,
  motion,
  MotionProps,
  Transition,
  useReducedMotion,
} from "motion/react"

import { cn } from "@/lib/utils"

const layoutSpring = { type: "spring", damping: 28, stiffness: 380 } as const

interface TextRotateProps {
  texts: string[]
  rotationInterval?: number
  initial?: MotionProps["initial"]
  animate?: MotionProps["animate"]
  exit?: MotionProps["exit"]
  animatePresenceMode?: AnimatePresenceProps["mode"]
  animatePresenceInitial?: boolean
  staggerDuration?: number
  staggerFrom?: "first" | "last" | "center" | number | "random"
  transition?: Transition
  loop?: boolean
  auto?: boolean
  splitBy?: "words" | "characters" | "lines" | string
  onNext?: (index: number) => void
  mainClassName?: string
  splitLevelClassName?: string
  elementLevelClassName?: string
  /**
   * Highlight surface behind the rotating text (registry-style).
   * Sizes to the active phrase; use `layout` animation so it morphs between phrases.
   */
  containerClassName?: string
  /**
   * When true, reserve space using the longest phrase (no width/height jump, larger empty pill).
   * Default false — pill hugs the current line like the original demo.
   */
  stableSize?: boolean
  lineHeightEm?: number
}

export interface TextRotateRef {
  next: () => void
  previous: () => void
  jumpTo: (index: number) => void
  reset: () => void
}

interface WordObject {
  characters: string[]
  needsSpace: boolean
}

const TextRotate = forwardRef<TextRotateRef, TextRotateProps>(
  (
    {
      texts,
      transition = { type: "spring", damping: 25, stiffness: 300 },
      initial = { y: "100%", opacity: 0 },
      animate = { y: 0, opacity: 1 },
      exit = { y: "-120%", opacity: 0 },
      animatePresenceMode = "wait",
      animatePresenceInitial = false,
      rotationInterval = 2000,
      staggerDuration = 0,
      staggerFrom = "first",
      loop = true,
      auto = true,
      splitBy = "characters",
      onNext,
      mainClassName,
      splitLevelClassName,
      elementLevelClassName,
      containerClassName,
      stableSize = false,
      lineHeightEm = 1.06,
    },
    ref
  ) => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0)
    const reduceMotion = useReducedMotion()

    const longestPhrase = useMemo(
      () => texts.reduce((a, b) => (a.length >= b.length ? a : b)),
      [texts]
    )

    const splitIntoCharacters = (text: string): string[] => {
      if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
        const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" })
        return Array.from(segmenter.segment(text), ({ segment }) => segment)
      }
      return Array.from(text)
    }

    const elements = useMemo(() => {
      const currentText = texts[currentTextIndex]
      if (splitBy === "characters") {
        const text = currentText.split(" ")
        return text.map((word, i) => ({
          characters: splitIntoCharacters(word),
          needsSpace: i !== text.length - 1,
        }))
      }
      return splitBy === "words"
        ? currentText.split(" ")
        : splitBy === "lines"
          ? currentText.split("\n")
          : currentText.split(splitBy)
    }, [texts, currentTextIndex, splitBy])

    const getStaggerDelay = useCallback(
      (index: number, totalChars: number) => {
        const total = totalChars
        if (staggerFrom === "first") return index * staggerDuration
        if (staggerFrom === "last") return (total - 1 - index) * staggerDuration
        if (staggerFrom === "center") {
          const center = Math.floor(total / 2)
          return Math.abs(center - index) * staggerDuration
        }
        if (staggerFrom === "random") {
          const randomIndex = Math.floor(Math.random() * total)
          return Math.abs(randomIndex - index) * staggerDuration
        }
        return Math.abs(staggerFrom - index) * staggerDuration
      },
      [staggerFrom, staggerDuration]
    )

    const handleIndexChange = useCallback(
      (newIndex: number) => {
        setCurrentTextIndex(newIndex)
        onNext?.(newIndex)
      },
      [onNext]
    )

    const next = useCallback(() => {
      const nextIndex =
        currentTextIndex === texts.length - 1
          ? loop
            ? 0
            : currentTextIndex
          : currentTextIndex + 1

      if (nextIndex !== currentTextIndex) {
        handleIndexChange(nextIndex)
      }
    }, [currentTextIndex, texts.length, loop, handleIndexChange])

    const previous = useCallback(() => {
      const prevIndex =
        currentTextIndex === 0
          ? loop
            ? texts.length - 1
            : currentTextIndex
          : currentTextIndex - 1

      if (prevIndex !== currentTextIndex) {
        handleIndexChange(prevIndex)
      }
    }, [currentTextIndex, texts.length, loop, handleIndexChange])

    const jumpTo = useCallback(
      (index: number) => {
        const validIndex = Math.max(0, Math.min(index, texts.length - 1))
        if (validIndex !== currentTextIndex) {
          handleIndexChange(validIndex)
        }
      },
      [texts.length, currentTextIndex, handleIndexChange]
    )

    const reset = useCallback(() => {
      if (currentTextIndex !== 0) {
        handleIndexChange(0)
      }
    }, [currentTextIndex, handleIndexChange])

    useImperativeHandle(
      ref,
      () => ({
        next,
        previous,
        jumpTo,
        reset,
      }),
      [next, previous, jumpTo, reset]
    )

    useEffect(() => {
      if (!auto || reduceMotion) return
      const intervalId = setInterval(next, rotationInterval)
      return () => clearInterval(intervalId)
    }, [next, rotationInterval, auto, reduceMotion])

    const maskStyle = { height: `${lineHeightEm}em` } as const

    const initialAnim = reduceMotion ? { opacity: 0 } : initial
    const animateAnim = reduceMotion ? { opacity: 1 } : animate
    const exitAnim = reduceMotion ? { opacity: 0 } : exit
    const transitionAnim = reduceMotion
      ? { duration: 0.2, ease: "easeOut" as const }
      : transition

    const animatedBlock = (
      <>
        <span className="sr-only">{texts[currentTextIndex]}</span>

        <AnimatePresence mode={animatePresenceMode} initial={animatePresenceInitial}>
          <motion.div
            key={currentTextIndex}
            className={cn(
              "flex flex-wrap content-baseline items-baseline",
              splitBy === "lines" && "w-full flex-col"
            )}
            aria-hidden="true"
          >
            {(splitBy === "characters"
              ? (elements as WordObject[])
              : (elements as string[]).map((el, i) => ({
                  characters: [el],
                  needsSpace: i !== elements.length - 1,
                }))
            ).map((wordObj, wordIndex, array) => {
              const previousCharsCount = array
                .slice(0, wordIndex)
                .reduce((sum, word) => sum + word.characters.length, 0)

              return (
                <span
                  key={wordIndex}
                  className={cn("inline-flex items-baseline", splitLevelClassName)}
                >
                  {wordObj.characters.map((char, charIndex) => (
                    <span
                      key={charIndex}
                      className="inline-flex overflow-hidden align-baseline"
                      style={maskStyle}
                    >
                      <motion.span
                        initial={initialAnim}
                        animate={animateAnim}
                        exit={exitAnim}
                        transition={{
                          ...transitionAnim,
                          delay: reduceMotion
                            ? 0
                            : getStaggerDelay(
                                previousCharsCount + charIndex,
                                array.reduce(
                                  (sum, word) => sum + word.characters.length,
                                  0
                                )
                              ),
                        }}
                        className={cn(
                          "inline-flex min-h-full items-end leading-none will-change-transform",
                          elementLevelClassName
                        )}
                      >
                        {char}
                      </motion.span>
                    </span>
                  ))}
                  {wordObj.needsSpace && (
                    <span
                      className="inline-flex overflow-hidden align-baseline"
                      style={maskStyle}
                    >
                      <span className="inline-flex min-h-full items-end leading-none">&nbsp;</span>
                    </span>
                  )}
                </span>
              )
            })}
          </motion.div>
        </AnimatePresence>
      </>
    )

    const inner = (
      <span className={cn("inline-flex flex-wrap whitespace-pre-wrap", mainClassName)}>
        {animatedBlock}
      </span>
    )

    if (!containerClassName && !stableSize) {
      return inner
    }

    if (stableSize && !containerClassName) {
      return (
        <span className="inline-grid shrink-0 align-baseline [grid-template-areas:stack]">
          <span
            className="invisible col-start-1 row-start-1 select-none whitespace-pre-wrap [grid-area:stack]"
            aria-hidden
          >
            {longestPhrase}
          </span>
          <span className="col-start-1 row-start-1 min-w-0 [grid-area:stack]">{inner}</span>
        </span>
      )
    }

    if (stableSize && containerClassName) {
      return (
        <span
          className={cn(
            "inline-grid shrink-0 align-baseline [grid-template-areas:stack]",
            containerClassName
          )}
        >
          <span
            className="invisible col-start-1 row-start-1 select-none whitespace-pre-wrap [grid-area:stack]"
            aria-hidden
          >
            {longestPhrase}
          </span>
          <span className="col-start-1 row-start-1 flex min-w-0 [grid-area:stack]">{inner}</span>
        </span>
      )
    }

    return (
      <motion.span
        layout
        transition={{ layout: reduceMotion ? { duration: 0 } : layoutSpring }}
        className={cn(
          "inline-flex overflow-hidden align-baseline",
          containerClassName
        )}
      >
        {inner}
      </motion.span>
    )
  }
)

TextRotate.displayName = "TextRotate"

export { TextRotate }
