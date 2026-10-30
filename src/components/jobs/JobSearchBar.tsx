"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Briefcase } from "lucide-react";
import categoriesData from "@/data/categories.json";
import locationsData from "@/data/locations.json";

interface JobSearchBarProps {
  initialKeyword?: string;
  initialLocation?: string;
  initialCategory?: string;
  variant?: "hero" | "compact";
  className?: string;
}

export default function JobSearchBar({
  initialKeyword = "",
  initialLocation = "all",
  initialCategory = "all",
  className = "",
}: JobSearchBarProps) {
  const router = useRouter();
  const [keyword, setKeyword] = useState(initialKeyword);
  const [location, setLocation] = useState(initialLocation);
  const [category, setCategory] = useState(initialCategory);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (keyword.trim()) params.set("keyword", keyword.trim());
    if (location && location !== "all") params.set("location", location);
    if (category && category !== "all") params.set("category", category);

    const qs = params.toString();
    router.push(`/jobs${qs ? `?${qs}` : ""}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`w-full rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-xl shadow-slate-900/10 p-2 sm:p-3 transition-all ${className}`}
    >
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-2 sm:gap-3">
        {/* Keyword Input */}
        <div className="relative flex-1 flex items-center px-3 py-2 bg-slate-50/70 hover:bg-slate-50 focus-within:bg-white rounded-xl sm:rounded-2xl border border-transparent focus-within:border-sky-300 transition-all">
          <Search className="w-5 h-5 text-sky-600 shrink-0 mr-2.5" />
          <div className="flex-1">
            <label htmlFor="search-keyword" className="sr-only">
              Job title, skill, or company
            </label>
            <input
              type="text"
              id="search-keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Job title, skills (e.g. UPSC, React, Civil, Banker)..."
              className="w-full bg-transparent text-slate-900 placeholder-slate-400 text-sm font-medium focus:outline-none"
            />
          </div>
        </div>

        {/* Location Select */}
        <div className="relative flex-1 flex items-center px-3 py-2 bg-slate-50/70 hover:bg-slate-50 focus-within:bg-white rounded-xl sm:rounded-2xl border border-transparent focus-within:border-sky-300 transition-all">
          <MapPin className="w-5 h-5 text-teal-600 shrink-0 mr-2.5" />
          <div className="flex-1">
            <label htmlFor="search-location" className="sr-only">
              City or Location
            </label>
            <select
              id="search-location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-transparent text-slate-900 text-sm font-medium focus:outline-none cursor-pointer"
            >
              <option value="all">All Locations (Pan-India)</option>
              <option value="remote">Work From Home / Remote</option>
              <option disabled>──────────</option>
              {locationsData.map((loc) => (
                <option key={loc.slug} value={loc.name}>
                  {loc.name} ({loc.state})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Select */}
        <div className="relative flex-1 flex items-center px-3 py-2 bg-slate-50/70 hover:bg-slate-50 focus-within:bg-white rounded-xl sm:rounded-2xl border border-transparent focus-within:border-sky-300 transition-all">
          <Briefcase className="w-5 h-5 text-indigo-600 shrink-0 mr-2.5" />
          <div className="flex-1">
            <label htmlFor="search-category" className="sr-only">
              Job Category
            </label>
            <select
              id="search-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-transparent text-slate-900 text-sm font-medium focus:outline-none cursor-pointer"
            >
              <option value="all">All Categories</option>
              <option disabled>──────────</option>
              {categoriesData.map((cat) => (
                <option key={cat.slug} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="px-7 py-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-sky-500 via-sky-600 to-teal-500 hover:from-sky-600 hover:to-teal-600 text-white font-bold text-sm tracking-wide shadow-md shadow-sky-500/25 active:scale-95 transition-all flex items-center justify-center gap-2 shrink-0"
        >
          <Search className="w-4 h-4" />
          <span>Search Jobs</span>
        </button>
      </div>
    </form>
  );
}
