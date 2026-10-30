"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Briefcase, 
  Menu, 
  X, 
  Bookmark, 
  Search, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";

function subscribeSaved(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("lmj_saved_updated", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("lmj_saved_updated", callback);
  };
}

function getSavedCountSnapshot() {
  if (typeof window === "undefined") return 0;
  try {
    const saved = JSON.parse(localStorage.getItem("lmj_saved_jobs") || "[]");
    return Array.isArray(saved) ? saved.length : 0;
  } catch {
    return 0;
  }
}

export default function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const savedCount = useSyncExternalStore(
    subscribeSaved,
    getSavedCountSnapshot,
    () => 0
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "All Jobs", href: "/jobs" },
    { name: "Private Careers", href: "/private-jobs" },
    { 
      name: "Work From Home", 
      href: "/work-from-home",
      isLive: true 
    },
    { name: "Categories", href: "/categories" },
    { name: "Locations", href: "/locations" },
    { name: "Career Blog", href: "/blog" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-200">
      {/* ========================================================= */}
      {/* TOP ANNOUNCEMENT BANNER (REFINED OBSIDIAN & BLUE)        */}
      {/* ========================================================= */}
      <div className="bg-slate-950 border-b border-slate-800/80 text-xs text-slate-300 py-1.5 px-4 tracking-normal">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
          {/* Left / Center Message */}
          <div className="flex items-center gap-2.5 mx-auto lg:mx-0">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold text-sky-400 bg-sky-500/10 border border-sky-500/20">
              <Sparkles className="w-3 h-3 text-sky-400" />
              <span>2026 Hiring Drives</span>
            </span>
            <span className="hidden sm:inline text-slate-300 font-medium">
              Verified corporate tech engineering positions & remote roles with a guaranteed 15-day application window.
            </span>
            <span className="sm:hidden text-slate-300 font-medium truncate">
              Verified private tech & remote vacancies.
            </span>
          </div>

          {/* Right Trust Indicators (Desktop only) */}
          <div className="hidden lg:flex items-center gap-4 text-[11px] text-slate-400 shrink-0">
            <span className="flex items-center gap-1 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              <span>100% Direct Applications</span>
            </span>
            <span className="text-slate-700">•</span>
            <span className="flex items-center gap-1 text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
              <span>Free for Job Seekers</span>
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MAIN NAVIGATION BAR                                      */}
      {/* ========================================================= */}
      <div
        className={`w-full transition-all duration-200 ${
          isScrolled
            ? "bg-slate-900/95 backdrop-blur-xl shadow-lg shadow-slate-950/20 border-b border-slate-800"
            : "bg-slate-900 border-b border-slate-800/90"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="flex items-center justify-between h-18 sm:h-20">
            {/* ----------------------------------------------------- */}
            {/* 1. BRAND LOGO                                         */}
            {/* ----------------------------------------------------- */}
            <Link
              href="/"
              className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-sky-400 rounded-xl p-1 shrink-0"
              aria-label="LookMyJob Home"
            >
              {/* Premium Monogram Icon Container */}
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-blue-500 via-sky-500 to-indigo-600 p-[1.5px] shadow-md shadow-blue-500/20 group-hover:scale-105 transition-all">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-sky-400 group-hover:text-sky-300 transition-colors" />
                </div>
              </div>

              {/* Text Wordmark & Tagline */}
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl sm:text-2xl font-black tracking-tight text-white font-sans leading-none">
                    Look<span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-400">My</span>Job
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-wider text-sky-300 bg-sky-500/15 px-1.5 py-0.5 rounded-md border border-sky-400/30">
                    .online
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-medium tracking-wide mt-1 hidden sm:block">
                  Find Your Next Opportunity.
                </span>
              </div>
            </Link>

            {/* ----------------------------------------------------- */}
            {/* 2. DESKTOP NAVIGATION LINKS                           */}
            {/* ----------------------------------------------------- */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`relative px-3.5 py-2 text-sm font-medium rounded-xl transition-all flex items-center gap-2 ${
                      isActive
                        ? "text-white bg-slate-800/90 font-semibold shadow-inner border border-slate-700/60"
                        : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                    }`}
                  >
                    <span>{item.name}</span>
                    {item.isLive && (
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-400" />
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* ----------------------------------------------------- */}
            {/* 3. RIGHT CONTROLS & CTA                               */}
            {/* ----------------------------------------------------- */}
            <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
              {/* Quick Search Shortcut Pill */}
              <Link
                href="/jobs"
                className="hidden md:flex items-center gap-2 px-3 py-2 text-xs text-slate-300 bg-slate-800/70 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 rounded-xl transition-all shadow-sm"
                title="Search vacancies"
              >
                <Search className="w-3.5 h-3.5 text-sky-400" />
                <span>Search jobs...</span>
                <kbd className="text-[10px] bg-slate-900 text-slate-400 px-1.5 py-0.5 rounded-md border border-slate-700 font-mono">
                  /
                </kbd>
              </Link>

              {/* Saved Jobs Bookmark */}
              <Link
                href="/jobs?saved=true"
                className="relative p-2.5 text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-xl border border-transparent hover:border-slate-700/60 transition-all"
                title="Saved Opportunities"
                aria-label={`Saved Jobs (${savedCount})`}
              >
                <Bookmark className="w-4 h-4 sm:w-5 sm:h-5" />
                {savedCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-sky-500 text-slate-950 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                    {savedCount}
                  </span>
                )}
              </Link>

              {/* Primary Call to Action Button */}
              <Link
                href="/jobs"
                className="inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold rounded-xl text-white bg-gradient-to-r from-blue-600 via-sky-600 to-blue-600 hover:from-blue-500 hover:via-sky-500 hover:to-blue-500 border border-sky-400/20 shadow-md shadow-blue-600/25 active:scale-95 transition-all"
              >
                <span>Browse Jobs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              {/* Mobile Menu Toggle Button */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl border border-slate-700/60 focus:outline-none focus:ring-2 focus:ring-sky-400"
                aria-expanded={isMobileMenuOpen}
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-sky-400" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* --------------------------------------------------------- */}
        {/* MOBILE NAVIGATION DRAWER                                  */}
        {/* --------------------------------------------------------- */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-slate-950/98 backdrop-blur-2xl border-b border-slate-800 px-4 pt-4 pb-6 space-y-4 animate-in fade-in slide-in-from-top-3 duration-200 shadow-2xl">
            {/* Mobile Search input */}
            <form action="/jobs" method="GET" className="relative">
              <input
                type="text"
                name="keyword"
                placeholder="Search job title, skills, or company..."
                className="w-full bg-slate-900 text-white placeholder-slate-400 text-sm rounded-xl pl-10 pr-4 py-2.5 border border-slate-700/80 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </form>

            {/* Menu Links */}
            <div className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? "text-sky-400 bg-slate-900 font-semibold border border-slate-800"
                      : "text-slate-300 hover:text-white hover:bg-slate-900/60"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {item.name}
                    {item.isLive && (
                      <span className="px-1.5 py-0.2 rounded text-[10px] font-bold uppercase tracking-wider bg-teal-500/20 text-teal-300 border border-teal-500/30">
                        Live
                      </span>
                    )}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                </Link>
              ))}
            </div>

            {/* Mobile Footer Area */}
            <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2.5">
              <Link
                href="/jobs?saved=true"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-slate-900 border border-slate-800"
              >
                <span className="flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-sky-400" />
                  <span>My Saved Jobs</span>
                </span>
                <span className="bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded-md font-bold text-[10px]">
                  {savedCount}
                </span>
              </Link>

              <div className="flex items-center justify-between text-xs text-slate-400 px-1 pt-1">
                <span>100% Free Candidate Discovery</span>
                <span className="text-sky-400 font-semibold">lookmyjob.online</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
