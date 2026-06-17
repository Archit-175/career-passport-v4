"use client";

import { createContext, useContext } from "react";

export type LoaderPhase = "initial" | "transition" | "idle";
export type HeroRoute = "/candidates" | "/companies";

/** Minimum time the splash stays up so it never flashes. */
export const MIN_DISPLAY_MS = 550;
/** Hard ceiling so the loader can never hang (slow/failed image, etc.). */
export const SAFETY_TIMEOUT_MS = 4000;

/** Which hero image (if any) a given pathname must wait on. */
export function heroForRoute(path: string): HeroRoute | null {
  if (path === "/" || path.startsWith("/candidates")) return "/candidates";
  if (path.startsWith("/companies")) return "/companies";
  return null;
}

export interface LoaderContextValue {
  phase: LoaderPhase;
  /** Gate the hero's GSAP entrance so it plays as the loader lifts. */
  heroStart: boolean;
  /** Nav calls this on a Candidates↔Companies link click, before navigation. */
  beginToggle: (target: HeroRoute) => void;
  /** Heroes call this once their priority image has decoded. */
  reportHeroReady: (route: HeroRoute) => void;
}

export const LoaderContext = createContext<LoaderContextValue | null>(null);

export function useLoader(): LoaderContextValue {
  const ctx = useContext(LoaderContext);
  // Graceful fallback if a consumer renders outside the provider:
  // behave as "already loaded" so hero animations still run.
  if (!ctx) {
    return {
      phase: "idle",
      heroStart: true,
      beginToggle: () => {},
      reportHeroReady: () => {},
    };
  }
  return ctx;
}

/** Convenience hook for hero sections. */
export function useHeroLoad(route: HeroRoute) {
  const { reportHeroReady, heroStart } = useLoader();
  return { heroStart, onHeroReady: () => reportHeroReady(route) };
}
