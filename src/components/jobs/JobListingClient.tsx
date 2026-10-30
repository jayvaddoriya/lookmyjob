"use client";

import React, { useState, useMemo, useSyncExternalStore } from "react";
import { useSearchParams } from "next/navigation";
import { 
  X, 
  Search, 
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Briefcase
} from "lucide-react";
import { Job, FilterState } from "@/types";
import JobCard from "./JobCard";
import JobFilters from "./JobFilters";
import EmptyState from "@/components/common/EmptyState";
import AdSidebar from "@/components/ads/AdSidebar";
import AdBanner from "@/components/ads/AdBanner";

interface JobListingClientProps {
  initialJobs: Job[];
  pageTitle?: string;
  pageSubtitle?: string;
  presetFilter?: Partial<FilterState>;
}

const ITEMS_PER_PAGE = 8;

let cachedSavedJobs: string[] = [];
let cachedSavedString = "";

function subscribeSavedJobs(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("lmj_saved_updated", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("lmj_saved_updated", callback);
  };
}

function getSavedJobsSnapshot(): string[] {
  if (typeof window === "undefined") return cachedSavedJobs;
  const current = localStorage.getItem("lmj_saved_jobs") || "[]";
  if (current !== cachedSavedString) {
    cachedSavedString = current;
    try {
      const parsed = JSON.parse(current);
      cachedSavedJobs = Array.isArray(parsed) ? parsed : [];
    } catch {
      cachedSavedJobs = [];
    }
  }
  return cachedSavedJobs;
}

export default function JobListingClient({
  initialJobs,
  pageTitle = "All Job Opportunities",
  pageSubtitle = "Explore verified private tech positions, high-growth corporate careers, FinTech innovations, and remote vacancies across India.",
  presetFilter,
}: JobListingClientProps) {
  const searchParams = useSearchParams();

  // Read initial query params
  const paramKeyword = searchParams.get("keyword") || presetFilter?.keyword || "";
  const paramLocation = searchParams.get("location") || presetFilter?.location || "all";
  const paramCategory = searchParams.get("category") || presetFilter?.category || "all";
  const paramJobType = searchParams.get("jobType") || presetFilter?.jobType || "all";
  const paramExperience = searchParams.get("experience") || presetFilter?.experience || "all";
  const paramSaved = searchParams.get("saved") === "true";
  const paramRemote = searchParams.get("remote") === "true" || presetFilter?.isRemote;

  const [filters, setFilters] = useState<FilterState>({
    keyword: paramKeyword,
    location: paramLocation,
    category: paramCategory,
    jobType: paramJobType,
    experience: paramExperience,
    salaryMin: 0,
    isRemote: paramRemote ? true : undefined,
    sortBy: "latest",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const savedJobIds = useSyncExternalStore(
    subscribeSavedJobs,
    getSavedJobsSnapshot,
    () => []
  );

  const handleFilterChange = (
    key: keyof FilterState,
    value: string | number | boolean | undefined
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleReset = () => {
    setFilters({
      keyword: "",
      location: "all",
      category: "all",
      jobType: "all",
      experience: "all",
      salaryMin: 0,
      isRemote: undefined,
      sortBy: "latest",
    });
    setCurrentPage(1);
  };

  // Filter and sort jobs
  const filteredJobs = useMemo(() => {
    let result = [...initialJobs];

    if (paramSaved) {
      result = result.filter((j) => savedJobIds.includes(j.id));
    }

    if (filters.keyword.trim()) {
      const q = filters.keyword.toLowerCase().trim();
      result = result.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.company.toLowerCase().includes(q) ||
          j.skills.some((s) => s.toLowerCase().includes(q)) ||
          j.description.toLowerCase().includes(q)
      );
    }

    if (filters.location && filters.location !== "all") {
      const loc = filters.location.toLowerCase();
      if (loc === "remote") {
        result = result.filter((j) => j.isRemote);
      } else {
        result = result.filter(
          (j) =>
            j.city.toLowerCase() === loc ||
            j.state.toLowerCase() === loc ||
            j.location.toLowerCase().includes(loc)
        );
      }
    }

    if (filters.category && filters.category !== "all") {
      const cat = filters.category.toLowerCase();
      result = result.filter(
        (j) =>
          j.categorySlug.toLowerCase() === cat ||
          j.category.toLowerCase().replace(/[^a-z0-9]/g, "-") === cat
      );
    }

    if (filters.jobType && filters.jobType !== "all") {
      result = result.filter(
        (j) => j.jobType.toLowerCase() === filters.jobType.toLowerCase()
      );
    }

    if (filters.experience && filters.experience !== "all") {
      result = result.filter(
        (j) => j.experience.toLowerCase() === filters.experience.toLowerCase()
      );
    }

    if (filters.salaryMin > 0) {
      result = result.filter((j) => j.salaryMin >= filters.salaryMin);
    }

    if (filters.isRemote !== undefined) {
      result = result.filter((j) => j.isRemote === filters.isRemote);
    }

    // Sort
    if (filters.sortBy === "latest") {
      result.sort(
        (a, b) =>
          new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
      );
    } else if (filters.sortBy === "salary") {
      result.sort((a, b) => b.salaryMax - a.salaryMax);
    } else if (filters.sortBy === "views") {
      result.sort((a, b) => b.viewsCount - a.viewsCount);
    }

    return result;
  }, [initialJobs, filters, paramSaved, savedJobIds]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
  const paginatedJobs = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredJobs.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredJobs, currentPage]);

  const activeFiltersCount = [
    filters.keyword ? 1 : 0,
    filters.location !== "all" ? 1 : 0,
    filters.category !== "all" ? 1 : 0,
    filters.jobType !== "all" ? 1 : 0,
    filters.experience !== "all" ? 1 : 0,
    filters.salaryMin > 0 ? 1 : 0,
    filters.isRemote !== undefined ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  return (
    <div className="w-full">
      {/* Page Title & Search Bar Area */}
      <div className="bg-slate-900 text-white py-10 sm:py-14 border-b border-slate-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-sky-400 bg-sky-950/80 border border-sky-800 mb-3">
              <Briefcase className="w-3.5 h-3.5" />
              Verified Vacancies
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
              {pageTitle}
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">
              {pageSubtitle}
            </p>
          </div>

          {/* Inline Keyword Search */}
          <div className="relative max-w-2xl">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={filters.keyword}
              onChange={(e) => handleFilterChange("keyword", e.target.value)}
              placeholder="Search by job title, skill keywords, or company..."
              className="w-full bg-slate-800/90 text-white placeholder-slate-400 text-sm rounded-2xl pl-12 pr-10 py-3.5 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all shadow-inner"
            />
            {filters.keyword && (
              <button
                type="button"
                onClick={() => handleFilterChange("keyword", "")}
                className="absolute right-3.5 top-3.5 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Grid: Filters + Job Cards + Sidebar Ad */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Top Controls Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-slate-900 font-sans">
              {filteredJobs.length} {filteredJobs.length === 1 ? "Job" : "Jobs"} Available
            </span>
            {paramSaved && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
                Saved Bookmarks
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile Filter Button */}
            <button
              type="button"
              onClick={() => setIsMobileFiltersOpen(true)}
              className="lg:hidden flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-sky-600" />
              <span>Filters {activeFiltersCount > 0 ? `(${activeFiltersCount})` : ""}</span>
            </button>

            {/* Sort Select */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500 hidden sm:inline">Sort:</span>
              <select
                value={filters.sortBy}
                onChange={(e) =>
                  handleFilterChange("sortBy", e.target.value as FilterState["sortBy"])
                }
                className="bg-white border border-slate-200 text-slate-800 font-medium rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-sky-400 cursor-pointer"
              >
                <option value="latest">Latest First</option>
                <option value="salary">Highest Salary</option>
                <option value="views">Most Viewed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filters Chips */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-xs text-slate-400 font-medium">Active:</span>
            {filters.keyword && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-sky-50 text-sky-700 border border-sky-200">
                Keyword: &quot;{filters.keyword}&quot;
                <button
                  type="button"
                  onClick={() => handleFilterChange("keyword", "")}
                >
                  <X className="w-3 h-3 hover:text-sky-900" />
                </button>
              </span>
            )}
            {filters.category !== "all" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-sky-50 text-sky-700 border border-sky-200">
                Category: {filters.category}
                <button
                  type="button"
                  onClick={() => handleFilterChange("category", "all")}
                >
                  <X className="w-3 h-3 hover:text-sky-900" />
                </button>
              </span>
            )}
            {filters.location !== "all" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-teal-50 text-teal-700 border border-teal-200">
                Location: {filters.location}
                <button
                  type="button"
                  onClick={() => handleFilterChange("location", "all")}
                >
                  <X className="w-3 h-3 hover:text-teal-900" />
                </button>
              </span>
            )}
            {filters.isRemote && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-teal-50 text-teal-700 border border-teal-200">
                Remote Only
                <button
                  type="button"
                  onClick={() => handleFilterChange("isRemote", undefined)}
                >
                  <X className="w-3 h-3 hover:text-teal-900" />
                </button>
              </span>
            )}
            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-rose-600 hover:underline font-semibold ml-1"
            >
              Clear All
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filters Column */}
          <div className="hidden lg:block lg:col-span-1">
            <JobFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={handleReset}
              totalResults={filteredJobs.length}
            />

            {/* Sidebar AdSense Placement */}
            <div className="mt-8">
              <AdSidebar slotId="jobs-listing-sidebar-ad" format="rectangle" />
            </div>
          </div>

          {/* Job Cards Column */}
          <div className="lg:col-span-3 space-y-5">
            {paginatedJobs.length === 0 ? (
              <EmptyState onReset={handleReset} />
            ) : (
              <>
                {paginatedJobs.map((job, index) => (
                  <React.Fragment key={job.id}>
                    <JobCard job={job} />
                    {/* In-feed ad after every 4th job */}
                    {index === 3 && (
                      <div className="py-2">
                        <AdBanner
                          slotId="jobs-listing-infeed-ad"
                          className="my-2"
                        />
                      </div>
                    )}
                  </React.Fragment>
                ))}

                {/* Pagination Bar */}
                {totalPages > 1 && (
                  <div className="pt-8 border-t border-slate-200 flex items-center justify-between gap-4">
                    <button
                      type="button"
                      disabled={currentPage === 1}
                      onClick={() => {
                        setCurrentPage((p) => Math.max(1, p - 1));
                        window.scrollTo({ top: 300, behavior: "smooth" });
                      }}
                      className="inline-flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-40 transition-colors shadow-sm"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Previous</span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      {Array.from({ length: totalPages }).map((_, idx) => {
                        const pageNum = idx + 1;
                        return (
                          <button
                            key={pageNum}
                            type="button"
                            onClick={() => {
                              setCurrentPage(pageNum);
                              window.scrollTo({ top: 300, behavior: "smooth" });
                            }}
                            className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                              currentPage === pageNum
                                ? "bg-slate-900 text-white shadow-sm"
                                : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      type="button"
                      disabled={currentPage === totalPages}
                      onClick={() => {
                        setCurrentPage((p) => Math.min(totalPages, p + 1));
                        window.scrollTo({ top: 300, behavior: "smooth" });
                      }}
                      className="inline-flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-40 transition-colors shadow-sm"
                    >
                      <span>Next</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Slide-over / Modal */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="relative ml-auto w-full max-w-xs h-full bg-white shadow-2xl p-6 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <h3 className="text-base font-bold text-slate-900 font-sans">
                Filter Opportunities
              </h3>
              <button
                type="button"
                onClick={() => setIsMobileFiltersOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <JobFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={handleReset}
              totalResults={filteredJobs.length}
              className="border-0 p-0 shadow-none"
            />

            <div className="mt-8 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsMobileFiltersOpen(false)}
                className="w-full py-3 rounded-xl bg-slate-900 text-white font-bold text-sm shadow-md"
              >
                Show {filteredJobs.length} Results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
