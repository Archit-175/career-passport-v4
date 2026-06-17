"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import {
  LoaderContext,
  heroForRoute,
  MIN_DISPLAY_MS,
  SAFETY_TIMEOUT_MS,
  type HeroRoute,
  type LoaderPhase,
} from "./loaderContext";
import { Loader } from "./Loader";

const now = () =>
  typeof performance !== "undefined" ? performance.now() : 0;

/**
 * Owns the loader/scroll-reset state machine. Mounted once in the root layout,
 * wrapping <Nav/> + <main/>, so its state survives client-side route changes.
 *
 *  - first load      → splash held until the current route's hero image decodes
 *  - toggle pages    → splash re-shows briefly, scroll resets to top under it,
 *                      so the new page always lands on Section 1
 *  - other nav       → no splash, scroll just snaps to top instantly
 */
export function LoaderProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const [phase, setPhase] = useState<LoaderPhase>("initial");
  const [heroStart, setHeroStart] = useState(false);

  const heroReady = useRef(false);
  const startedAt = useRef(now());
  const expectedHero = useRef<HeroRoute | null>(heroForRoute(pathname));
  const prevPath = useRef(pathname);
  const safetyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const liftTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    if (safetyTimer.current) clearTimeout(safetyTimer.current);
    if (liftTimer.current) clearTimeout(liftTimer.current);
    safetyTimer.current = null;
    liftTimer.current = null;
  }, []);

  const lift = useCallback(() => {
    clearTimers();
    setPhase("idle");
    setHeroStart(true);
  }, [clearTimers]);

  const tryLift = useCallback(() => {
    const noHero = expectedHero.current === null;
    if (!noHero && !heroReady.current) return;
    const wait = Math.max(MIN_DISPLAY_MS - (now() - startedAt.current), 0);
    if (liftTimer.current) clearTimeout(liftTimer.current);
    liftTimer.current = setTimeout(lift, wait);
  }, [lift]);

  const armSafety = useCallback(() => {
    if (safetyTimer.current) clearTimeout(safetyTimer.current);
    safetyTimer.current = setTimeout(lift, SAFETY_TIMEOUT_MS);
  }, [lift]);

  // ── First load ───────────────────────────────────────────────
  useEffect(() => {
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    startedAt.current = now();
    armSafety();
    // Route without a hero (e.g. /blog) — don't wait on a decode.
    if (expectedHero.current === null) tryLift();
    return clearTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Toggle intent (fired by Nav before navigation) ───────────
  const beginToggle = useCallback(
    (target: HeroRoute) => {
      if (heroForRoute(prevPath.current) === target) return; // already there
      heroReady.current = false;
      expectedHero.current = target;
      startedAt.current = now();
      setHeroStart(false);
      setPhase("transition");
      armSafety();
    },
    [armSafety]
  );

  const reportHeroReady = useCallback(
    (route: HeroRoute) => {
      if (route !== expectedHero.current) return; // stale hero from old route
      heroReady.current = true;
      tryLift();
    },
    [tryLift]
  );

  // ── Scroll reset on route change (under the overlay) ─────────
  // useLayoutEffect runs before paint, so the old scroll position never shows.
  useLayoutEffect(() => {
    if (prevPath.current === pathname) return;
    prevPath.current = pathname;
    // `instant` overrides the global `scroll-behavior: smooth`.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  // ── Body scroll-lock while the overlay is visible ────────────
  useEffect(() => {
    if (phase === "idle") return;
    const body = document.body;
    const prevOverflow = body.style.overflow;
    const prevPadding = body.style.paddingRight;
    const sbw = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = "hidden";
    if (sbw > 0) body.style.paddingRight = `${sbw}px`;
    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPadding;
    };
  }, [phase]);

  return (
    <LoaderContext.Provider
      value={{ phase, heroStart, beginToggle, reportHeroReady }}
    >
      {children}
      <Loader phase={phase} />
    </LoaderContext.Provider>
  );
}
