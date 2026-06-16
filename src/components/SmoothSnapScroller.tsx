"use client";

import { useEffect, useRef, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function SmoothSnapScroller({ children }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);
  const currentIndex = useRef(0);
  const touchStartY = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const getSections = (): HTMLElement[] =>
      Array.from(container.querySelectorAll<HTMLElement>(":scope > [data-snap]"));

    const scrollToIndex = (index: number) => {
      const sections = getSections();
      if (index < 0 || index >= sections.length) return;
      if (isAnimating.current) return;

      isAnimating.current = true;
      currentIndex.current = index;
      container.scrollTo({ top: sections[index].offsetTop, behavior: "smooth" });

      // lock duration matches the smooth-scroll animation (~900ms feels deliberate, not sluggish)
      setTimeout(() => {
        isAnimating.current = false;
      }, 950);
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isAnimating.current) return;
      scrollToIndex(currentIndex.current + (e.deltaY > 0 ? 1 : -1));
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (["ArrowDown", "PageDown"].includes(e.key)) {
        e.preventDefault();
        scrollToIndex(currentIndex.current + 1);
      } else if (["ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        scrollToIndex(currentIndex.current - 1);
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const onTouchEnd = (e: TouchEvent) => {
      const delta = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(delta) < 50) return;
      scrollToIndex(currentIndex.current + (delta > 0 ? 1 : -1));
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      container.removeEventListener("wheel", onWheel);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        height: "100dvh",
        overflowY: "scroll",
        scrollBehavior: "smooth",
        // no scroll-snap-type — we drive this manually
      }}
    >
      {children}
    </div>
  );
}
