"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isCandidate =
    pathname === "/" || pathname?.startsWith("/candidates");
  const isCompany = pathname?.startsWith("/companies");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-white/10"
          : "border-b border-white/5",
        "bg-white/5 backdrop-blur-xl"
      )}
    >
      <nav className="relative mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        {/* Logo — extreme left */}
        <Link href="/" className="flex items-center shrink-0">
          <span className="font-playfair text-[1.6rem] tracking-tight text-pearl">
            Career <span className="text-gold">Passport</span>
          </span>
        </Link>

        {/* Toggle pill — absolutely centered */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2">
          <div className="flex items-center bg-slate/60 rounded-full p-1">
            <Link
              href="/candidates"
              className={cn(
                "px-5 py-1.5 text-[0.8rem] font-inter tracking-wide rounded-full transition-colors duration-300",
                isCandidate
                  ? "bg-pearl text-ink font-medium"
                  : "text-pearl/75 hover:text-pearl"
              )}
            >
              Candidates
            </Link>
            <Link
              href="/companies"
              className={cn(
                "px-5 py-1.5 text-[0.8rem] font-inter tracking-wide rounded-full transition-colors duration-300",
                isCompany
                  ? "bg-pearl text-ink font-medium"
                  : "text-pearl/75 hover:text-pearl"
              )}
            >
              Companies
            </Link>
          </div>
        </div>

        {/* Right links — extreme right */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          <Link
            href="/about"
            className="px-4 py-2 text-[0.85rem] font-inter font-light text-pearl/75 hover:text-pearl transition-colors"
          >
            About
          </Link>
          <Link
            href="/blog"
            className="px-4 py-2 text-[0.85rem] font-inter font-light text-pearl/75 hover:text-pearl transition-colors"
          >
            Blog
          </Link>
          <Link
            href="#waitlist"
            className="ml-2 px-5 py-2 text-[0.82rem] font-inter font-medium rounded-full bg-blue hover:bg-blue/90 text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            Join the Waitlist
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-pearl/70 hover:text-pearl ml-auto"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span className="block w-5 h-px bg-current mb-1.5" />
          <span className="block w-5 h-px bg-current mb-1.5" />
          <span className="block w-3 h-px bg-current" />
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white/5 backdrop-blur-xl border-t border-white/10 px-6 pb-6 pt-4 flex flex-col gap-4">
          <div className="flex gap-2">
            <Link
              href="/candidates"
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex-1 text-center py-2 rounded-full text-sm font-inter transition-colors",
                isCandidate ? "bg-pearl text-ink" : "bg-slate text-pearl/75"
              )}
            >
              Candidates
            </Link>
            <Link
              href="/companies"
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex-1 text-center py-2 rounded-full text-sm font-inter transition-colors",
                isCompany ? "bg-pearl text-ink" : "bg-slate text-pearl/75"
              )}
            >
              Companies
            </Link>
          </div>
          <Link href="/about" onClick={() => setMobileOpen(false)} className="text-pearl/75 text-sm font-inter">About</Link>
          <Link href="/blog" onClick={() => setMobileOpen(false)} className="text-pearl/75 text-sm font-inter">Blog</Link>
          <Link
            href="#waitlist"
            onClick={() => setMobileOpen(false)}
            className="w-full text-center py-3 rounded-full bg-blue text-white text-sm font-inter font-medium"
          >
            Join the Waitlist
          </Link>
        </div>
      )}
    </header>
  );
}
