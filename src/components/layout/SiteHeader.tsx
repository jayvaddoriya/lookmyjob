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
  Sparkles
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
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "All Jobs", href: "/jobs" },
    { name: "Govt Jobs", href: "/government-jobs", badge: "Sarkari" },
    { name: "Private Jobs", href: "/private-jobs" },
    { name: "Work From Home", href: "/work-from-home", badge: "Remote" },
    { name: "Categories", href: "/categories" },
    { name: "Locations", href: "/locations" },
    { name: "Career Blog", href: "/blog" },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          isScrolled
            ? "bg-slate-900/95 backdrop-blur-md shadow-md shadow-slate-950/10 border-b border-slate-800"
            : "bg-slate-900 border-b border-slate-800/80"
        }`}
      >
        {/* Top Notice Bar */}
        <div className="bg-gradient-to-r from-blue-700 via-sky-600 to-teal-600 text-white text-xs font-medium py-1.5 px-4 text-center tracking-wide">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-full text-[11px] font-semibold">
              <Sparkles className="w-3 h-3 text-amber-300" /> 2026 Recruitment Updates
            </span>
            <span className="hidden sm:inline">
              Verified Sarkari Naukri, IT tech positions, and work-from-home vacancies updated daily.
            </span>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-sky-400 rounded-lg p-1"
              aria-label="LookMyJob Home"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-blue-500 via-sky-500 to-teal-400 p-0.5 shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-sky-400 group-hover:text-sky-300 transition-colors" />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="text-xl sm:text-2xl font-black tracking-tight text-white font-sans">
                    Look<span className="text-sky-400">My</span>Job
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400 bg-teal-950/80 px-1.5 py-0.5 rounded border border-teal-800/60 hidden sm:inline-block">
                    .online
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-medium tracking-wide -mt-1 hidden sm:block">
                  Find Your Next Opportunity.
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                      isActive
                        ? "text-sky-400 bg-slate-800/90 font-semibold"
                        : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                    }`}
                  >
                    <span>{item.name}</span>
                    {item.badge && (
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded font-bold uppercase tracking-wider ${
                          item.badge === "Sarkari"
                            ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                            : "bg-teal-500/20 text-teal-300 border border-teal-500/30"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Icons & CTA */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Saved Jobs Indicator */}
              <Link
                href="/jobs?saved=true"
                className="relative p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                title="Saved Jobs"
                aria-label={`Saved Jobs (${savedCount})`}
              >
                <Bookmark className="w-5 h-5" />
                {savedCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-sky-500 text-slate-950 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                    {savedCount}
                  </span>
                )}
              </Link>

              {/* Quick Search Shortcut */}
              <Link
                href="/jobs"
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-300 bg-slate-800 hover:bg-slate-700/80 border border-slate-700 rounded-lg transition-colors"
              >
                <Search className="w-3.5 h-3.5 text-sky-400" />
                <span>Search</span>
                <kbd className="text-[10px] bg-slate-900 text-slate-400 px-1.5 py-0.5 rounded border border-slate-700">
                  /
                </kbd>
              </Link>

              {/* Primary Post Job / Contact CTA */}
              <Link
                href="/contact"
                className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg text-slate-950 bg-gradient-to-r from-sky-400 to-teal-400 hover:from-sky-300 hover:to-teal-300 transition-all shadow-md shadow-sky-500/10 active:scale-95"
              >
                Post a Job
              </Link>

              {/* Mobile Menu Toggle Button */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
                aria-expanded={isMobileMenuOpen}
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-4 duration-150">
            {/* Mobile Search input */}
            <form action="/jobs" method="GET" className="relative mb-3">
              <input
                type="text"
                name="keyword"
                placeholder="Search job title, skills, or company..."
                className="w-full bg-slate-800 text-white placeholder-slate-400 text-sm rounded-lg pl-9 pr-4 py-2 border border-slate-700 focus:outline-none focus:border-sky-400"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </form>

            <div className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? "text-sky-400 bg-slate-800 font-semibold"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  <span>{item.name}</span>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                        item.badge === "Sarkari"
                          ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                          : "bg-teal-500/20 text-teal-300 border border-teal-500/30"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center py-2.5 px-4 text-sm font-semibold rounded-lg text-slate-950 bg-gradient-to-r from-sky-400 to-teal-400 hover:from-sky-300 hover:to-teal-300 shadow-sm"
              >
                Employer Portal / Contact Us
              </Link>
              <div className="flex items-center justify-between text-xs text-slate-400 px-1 pt-1">
                <span>Free for all job seekers</span>
                <span className="text-teal-400 font-medium">lookmyjob.online</span>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
