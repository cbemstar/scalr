"use client";

// Draggable Marquee from Obsidian UI by Atharvsinh
// Copyright (c) 2026 ObsidianUI. Licensed under MIT: https://gitlab.com/Atharvsinh-codez/ObsidianUI/-/blob/main/LICENSE
// Source: https://gitlab.com/Atharvsinh-codez/ObsidianUI (8423e7f), via craftwork.design
import { useEffect, useMemo, useRef, type ReactNode } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
// Reduced-motion styles for `.obsidian-draggable-marquee` live in src/app/v2/v2.css.

if (typeof window !== "undefined") gsap.registerPlugin(Draggable);

// GSAP's typings mark Draggable#x read-only, but writing it re-syncs the
// instance with the externally-set position (as the original JS does).
const setDraggableX = (draggable: Draggable, value: number) => {
    (draggable as unknown as { x: number }).x = value;
};

export interface DraggableMarqueeItem {
    id?: string | number;
    src: string;
    alt?: string;
    width?: number;
    height?: number;
    imageClassName?: string;
    [key: string]: unknown;
}

export interface DraggableMarqueeProps {
    items?: DraggableMarqueeItem[];
    speed?: number;
    repeatCount?: number;
    gapClassName?: string;
    className?: string;
    trackClassName?: string;
    itemClassName?: string;
    pauseOnHover?: boolean;
    renderItem?: (item: DraggableMarqueeItem, index: number) => ReactNode;
    throwMultiplier?: number;
    throwFriction?: number;
    maxThrowVelocity?: number;
    initialOffset?: number;
    loopStart?: number;
    loopEndMultiplier?: number;
    label?: string;
}

const DraggableMarquee = ({
    items = [],
    speed = 1,
    repeatCount = 3,
    gapClassName = "gap-6",
    className = "",
    trackClassName = "",
    itemClassName = "rounded-2xl",
    pauseOnHover = false,
    renderItem,

    // motion controls
    throwMultiplier = 2.8,
    throwFriction = 0.975,
    maxThrowVelocity = 60,

    // loop controls
    initialOffset = 0,
    loopStart = 0,
    loopEndMultiplier = -1.02,
    label = "Image marquee. Drag or use the left and right arrow keys.",
}: DraggableMarqueeProps) => {
    const rootRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const dragRef = useRef<Draggable | null>(null);

    const duplicatedItems = useMemo(() => {
        return Array.from({ length: repeatCount }).flatMap(() => items);
    }, [items, repeatCount]);

    useEffect(() => {
        if (!rootRef.current || !trackRef.current || !items.length) return;

        const media = gsap.matchMedia();
        media.add("(prefers-reduced-motion: no-preference)", () => {

        const root = rootRef.current!;
        const track = trackRef.current!;

        let singleSetWidth = 0;
        let x = initialOffset;
        let throwVelocity = 0;
        let isPointerOver = false;
        let isDragging = false;
        let lastDragX = 0;
        let lastDragTime = 0;

        let wrapValue = (value: number) => value;
        let resizeRaf: number | null = null;

        const observers: ResizeObserver[] = [];
        const setX = gsap.quickSetter(track, "x", "px") as (value: number) => void;

        const getGap = () => {
            const styles = window.getComputedStyle(track);
            return parseFloat(styles.columnGap || styles.gap || "0");
        };

        const buildWrap = () => {
            const min = singleSetWidth * loopEndMultiplier;
            const max = loopStart;
            wrapValue = gsap.utils.wrap(min, max);
        };

        const getProgressInLoop = () => {
            if (!singleSetWidth) return 0;

            const min = singleSetWidth * loopEndMultiplier;
            const max = loopStart;
            const range = max - min;

            if (!range) return 0;

            let wrapped = x;
            while (wrapped < min) wrapped += range;
            while (wrapped > max) wrapped -= range;

            return (wrapped - min) / range;
        };

        const setProgressInLoop = (progress: number) => {
            if (!singleSetWidth) return;

            const min = singleSetWidth * loopEndMultiplier;
            const max = loopStart;
            const range = max - min;

            x = min + range * progress;
            x = wrapValue(x);
            setX(x);

            if (dragRef.current) {
                setDraggableX(dragRef.current, x);
            }
        };

        const measure = () => {
            const children = Array.from(track.children);
            const setSize = Math.floor(children.length / repeatCount);
            const firstSetChildren = children.slice(0, setSize);
            const gap = getGap();

            if (!firstSetChildren.length) return;

            const prevProgress = getProgressInLoop();

            const widths = firstSetChildren.reduce(
                (sum, child) => sum + child.getBoundingClientRect().width,
                0
            );

            singleSetWidth = widths + gap * Math.max(0, firstSetChildren.length - 1);

            buildWrap();

            if (!Number.isFinite(prevProgress)) {
                x = wrapValue(initialOffset);
                setX(x);
            } else {
                setProgressInLoop(prevProgress);
            }
        };

        const scheduleMeasure = () => {
            if (resizeRaf) cancelAnimationFrame(resizeRaf);
            resizeRaf = requestAnimationFrame(() => {
                measure();
            });
        };

        const update = () => {
            if (!isDragging) {
                if (!(pauseOnHover && isPointerOver)) {
                    x -= speed;
                }

                x += throwVelocity;
                throwVelocity *= throwFriction;

                if (Math.abs(throwVelocity) < 0.01) {
                    throwVelocity = 0;
                }
            }

            x = wrapValue(x);
            setX(x);
        };

        measure();

        dragRef.current = Draggable.create(track, {
            type: "x",
            allowContextMenu: true,
            dragClickables: true,

            onPress(this: Draggable) {
                isDragging = true;
                throwVelocity = 0;
                setDraggableX(this, x);
                lastDragX = this.x;
                lastDragTime = performance.now();
            },

            onDrag(this: Draggable) {
                const now = performance.now();
                const dx = this.x - lastDragX;
                const dt = now - lastDragTime;

                x = wrapValue(this.x);
                setX(x);
                setDraggableX(this, x);

                if (dt > 0) {
                    const sampledVelocity = (dx / dt) * 36.67;

                    throwVelocity = gsap.utils.clamp(
                        -maxThrowVelocity,
                        maxThrowVelocity,
                        sampledVelocity * throwMultiplier
                    );
                }

                lastDragX = this.x;
                lastDragTime = now;
            },

            onRelease() {
                isDragging = false;
            },
        })[0];

        const handleMouseEnter = () => {
            isPointerOver = true;
        };

        const handleMouseLeave = () => {
            isPointerOver = false;
        };

        if (pauseOnHover) {
            root.addEventListener("mouseenter", handleMouseEnter);
            root.addEventListener("mouseleave", handleMouseLeave);
        }

        const handleResize = () => {
            scheduleMeasure();
        };
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
            event.preventDefault();
            x = wrapValue(x + (event.key === "ArrowLeft" ? 1 : -1) * root.clientWidth * 0.35);
            throwVelocity = 0;
            setX(x);
        };
        root.addEventListener("keydown", handleKeyDown);

        window.addEventListener("resize", handleResize);

        const children = Array.from(track.children);
        const setSize = Math.floor(children.length / repeatCount);
        const firstSetChildren = children.slice(0, setSize);

        const trackObserver = new ResizeObserver(() => {
            scheduleMeasure();
        });

        trackObserver.observe(track);
        observers.push(trackObserver);

        firstSetChildren.forEach((child) => {
            const ro = new ResizeObserver(() => {
                scheduleMeasure();
            });

            ro.observe(child);
            observers.push(ro);

            const imgs = child.querySelectorAll("img");

            imgs.forEach((img) => {
                if (!img.complete) {
                    img.addEventListener("load", scheduleMeasure, { once: false });
                }
            });
        });

        gsap.ticker.add(update);

        return () => {
            root.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("resize", handleResize);

            if (pauseOnHover) {
                root.removeEventListener("mouseenter", handleMouseEnter);
                root.removeEventListener("mouseleave", handleMouseLeave);
            }

            gsap.ticker.remove(update);

            if (resizeRaf) cancelAnimationFrame(resizeRaf);

            observers.forEach((observer) => observer.disconnect());

            const cleanupChildren = Array.from(track.children);

            cleanupChildren.forEach((child) => {
                const imgs = child.querySelectorAll("img");

                imgs.forEach((img) => {
                    img.removeEventListener("load", scheduleMeasure);
                });
            });

            if (dragRef.current) {
                dragRef.current.kill();
                dragRef.current = null;
            }
        };
        }, rootRef);
        return () => media.revert();
    }, [
        items,
        speed,
        repeatCount,
        pauseOnHover,
        throwMultiplier,
        throwFriction,
        maxThrowVelocity,
        initialOffset,
        loopStart,
        loopEndMultiplier,
    ]);

    if (!items.length) return null;

    return (
        <div
            ref={rootRef}
            tabIndex={0}
            role="region"
            aria-label={label}
            className={`obsidian-draggable-marquee relative w-full overflow-hidden cursor-grab outline-offset-4 focus-visible:outline-2 focus-visible:outline-ring active:cursor-grabbing ${className}`}
        >
            <div
                ref={trackRef}
                className={`flex w-max items-center ${gapClassName} ${trackClassName}`}
            >
                {duplicatedItems.map((item, index) => (
                    <div
                        key={`${item?.id || item?.src || "item"}-${index}`}
                        className={`shrink-0 ${itemClassName}`}
                        aria-hidden={index >= items.length}
                        data-marquee-copy={index >= items.length ? "duplicate" : "original"}
                    >
                        {renderItem ? (
                            renderItem(item, index % items.length)
                        ) : (
                            <Image
                                src={item.src}
                                alt={item.alt || "marquee-item"}
                                width={item.width || 400}
                                height={item.height || 500}
                                className={item.imageClassName || "h-auto w-auto object-cover max-sm:w-[320px] max-sm:h-105"}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export { DraggableMarquee };
