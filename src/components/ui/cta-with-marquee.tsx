"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { ReactNode, useState } from "react";

interface MarqueeProps {
  children: ReactNode;
  pauseOnHover?: boolean;
  reverse?: boolean;
  className?: string;
  speed?: number;
}

export function InlineMarquee({
  children,
  pauseOnHover = false,
  reverse = false,
  className,
  speed = 40,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "group flex overflow-hidden [--gap:0.75rem] [gap:var(--gap)]",
        className
      )}
      style={{ "--duration": `${speed}s` } as React.CSSProperties}
    >
      <div
        className={cn(
          "flex min-w-full shrink-0 items-center justify-around gap-[var(--gap)] animate-marquee",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
      >
        {children}
      </div>
      <div
        className={cn(
          "flex min-w-full shrink-0 items-center justify-around gap-[var(--gap)] animate-marquee",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  );
}

export const row1Images = [
  {
    src: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=400&h=400&fit=crop&auto=format",
    alt: "Cosy café interior with espresso machine and counter",
    label: "Cafés",
  },
  {
    src: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=400&fit=crop&auto=format",
    alt: "Barber giving a haircut in a local barbershop",
    label: "Barbers",
  },
  {
    src: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=400&fit=crop&auto=format",
    alt: "Construction worker in safety gear on a job site",
    label: "Tradies",
  },
  {
    src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop&auto=format",
    alt: "Local retail clothing store interior with clothing displays",
    label: "Retail",
  },
  {
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=400&fit=crop&auto=format",
    alt: "Restaurant table with plated dish and ambient lighting",
    label: "Restaurants",
  },
];

export const row2Images = [
  {
    src: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=400&fit=crop&auto=format",
    alt: "Hair salon with modern styling chairs and mirrors",
    label: "Salons",
  },
  {
    src: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=400&fit=crop&auto=format",
    alt: "Handyman with tools doing home repair work",
    label: "Builders",
  },
  {
    src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop&auto=format",
    alt: "Freshly poured coffee cup on a café counter",
    label: "Coffee",
  },
  {
    src: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=400&h=400&fit=crop&auto=format",
    alt: "Chef preparing dishes in a restaurant kitchen",
    label: "Hospitality",
  },
  {
    src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=400&fit=crop&auto=format",
    alt: "Modern local business professional workspace",
    label: "Studios",
  },
];

function GalleryItem({ img }: { img: (typeof row1Images)[number] }) {
  return (
    <div className="group/card relative h-36 w-48 flex-shrink-0 overflow-hidden rounded-xl sm:h-40 sm:w-52">
      <Image
        src={img.src}
        alt={img.alt}
        fill
        className="object-cover transition-transform duration-500 will-change-transform group-hover/card:scale-[1.04]"
        sizes="(max-width: 640px) 192px, 208px"
      />
      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/70 via-black/30 to-transparent px-3 pb-2.5 pt-8">
        <span className="text-[11px] font-medium tracking-wide text-white/90">
          {img.label}
        </span>
      </div>
    </div>
  );
}

export function MarqueeGallery({
  pauseOnHover = true,
  speed = 28,
}: {
  pauseOnHover?: boolean;
  speed?: number;
}) {
  return (
    <div className="relative flex flex-col gap-2.5 overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-background to-transparent sm:w-16" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-background to-transparent sm:w-16" />

      <InlineMarquee speed={speed} reverse pauseOnHover={pauseOnHover}>
        {row1Images.map((img) => (
          <GalleryItem key={img.label} img={img} />
        ))}
      </InlineMarquee>
      <InlineMarquee speed={speed + 4} pauseOnHover={pauseOnHover}>
        {row2Images.map((img) => (
          <GalleryItem key={img.label} img={img} />
        ))}
      </InlineMarquee>
    </div>
  );
}
