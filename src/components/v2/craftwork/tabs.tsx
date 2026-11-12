"use client"

// Tabs from Blank by Craftwork
// Copyright (c) 2026 Craftwork. Craftwork License, use in your projects, no resale: https://craftwork.design/license#components
// Source: https://github.com/craftwork-design/blank-new (f6d6614), via craftwork.design
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      orientation={orientation}
      className={cn(
        "group/tabs gap-2 flex data-[orientation=horizontal]:flex-col",
        className
      )}
      {...props}
    />
  )
}

const tabsListVariants = cva(
  [
    // Orientation is read off the list itself: a root-level group would also
    // match an outer Tabs these tabs are nested in.
    "group/tabs-list isolate inline-flex w-fit items-center justify-center text-muted-foreground aria-[orientation=vertical]:h-fit aria-[orientation=vertical]:flex-col aria-[orientation=vertical]:items-stretch",
  ],
  {
    variants: {
      variant: {
        fill: "gap-1",
        line: "gap-1",
        segmented: "bg-item-secondary p-[3px]",
      },
      size: {
        sm: "aria-[orientation=horizontal]:h-8",
        default: "aria-[orientation=horizontal]:h-9",
        lg: "aria-[orientation=horizontal]:h-10",
      },
      shape: {
        pill: "rounded-full",
        rounded: "rounded-xl",
      },
    },
    defaultVariants: {
      variant: "fill",
      size: "default",
      shape: "pill",
    },
  }
)

type TabsListProps = React.ComponentProps<typeof TabsPrimitive.List> &
  Omit<VariantProps<typeof tabsListVariants>, "variant"> & {
    /** `default` is shadcn's name for the default style and renders as `fill`. */
    variant?: VariantProps<typeof tabsListVariants>["variant"] | "default"
  }

function TabsList({
  className,
  variant = "fill",
  size = "default",
  shape = "pill",
  ...props
}: TabsListProps) {
  // An alias, not a style: resolve it once so the DOM and the triggers only
  // ever see the canonical name.
  const resolvedVariant = variant === "default" ? "fill" : variant

  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={resolvedVariant}
      data-size={size}
      data-shape={shape}
      className={cn(
        tabsListVariants({ variant: resolvedVariant, size, shape, className })
      )}
      {...props}
    />
  )
}

const tabsTriggerClasses = [
  "group/tabs-trigger relative inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-transparent text-sm font-medium whitespace-nowrap transition-[color,box-shadow] outline-none",
  "group-data-[shape=rounded]/tabs-list:rounded-lg group-data-[variant=line]/tabs-list:rounded-none",
  "group-aria-[orientation=horizontal]/tabs-list:h-full group-aria-[orientation=vertical]/tabs-list:justify-start group-aria-[orientation=vertical]/tabs-list:py-1.5",
  "hover:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-focus-ring data-[state=active]:text-foreground",
  "disabled:pointer-events-none disabled:opacity-50",
  "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  // Sizes come from the list so a trigger never has to repeat them.
  "group-data-[size=sm]/tabs-list:px-3 group-data-[size=default]/tabs-list:px-3.5 group-data-[size=lg]/tabs-list:px-4",
]

const tabsIndicatorClasses = [
  "pointer-events-none absolute -inset-px -z-10 rounded-[inherit] opacity-0 transition-opacity duration-150 group-data-[state=active]/tabs-trigger:opacity-100 motion-reduce:transition-none",
  // Fill: transparent rail, the active tab carries the surface.
  "group-data-[variant=fill]/tabs-list:bg-item-secondary",
  // Segmented: grey rail, the active tab lifts off it.
  "group-data-[variant=segmented]/tabs-list:bg-background group-data-[variant=segmented]/tabs-list:shadow-sm dark:group-data-[variant=segmented]/tabs-list:bg-item-secondary-hover",
  // Line: a brand bar under (or beside) the active tab.
  "group-data-[variant=line]/tabs-list:bg-brand",
  "group-aria-[orientation=horizontal]/tabs-list:group-data-[variant=line]/tabs-list:top-auto group-aria-[orientation=horizontal]/tabs-list:group-data-[variant=line]/tabs-list:h-0.5",
  "group-aria-[orientation=vertical]/tabs-list:group-data-[variant=line]/tabs-list:left-auto group-aria-[orientation=vertical]/tabs-list:group-data-[variant=line]/tabs-list:w-0.5",
]

function TabsTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(tabsTriggerClasses, className)}
      {...props}
    >
      <span
        data-slot="tabs-indicator"
        aria-hidden="true"
        className={cn(tabsIndicatorClasses)}
      />
      {children}
    </TabsPrimitive.Trigger>
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }
