"use client";

import React from "react";
import { Filter, RotateCcw } from "lucide-react";
import { FilterState } from "@/types";
import categoriesData from "@/data/categories.json";
import locationsData from "@/data/locations.json";

interface JobFiltersProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string | number | boolean | undefined) => void;
  onReset: () => void;
  totalResults?: number;
  className?: string;
}

export default function JobFilters({
  filters,
  onFilterChange,
  onReset,
  className = "",
}: JobFiltersProps) {
  const jobTypes = ["all", "Government", "Full-time", "Contract", "Internship"];
  const experiences = [
    { label: "All Experience Levels", value: "all" },
    { label: "Freshers (0-1 yrs)", value: "Fresher (0-1 yrs)" },
    { label: "1 to 3 Years", value: "1-3 yrs" },
    { label: "3 to 5 Years", value: "3-5 yrs" },
    { label: "5+ Years", value: "5+ yrs" },
  ];

  const salaryOptions = [
    { label: "Any Salary", value: 0 },
    { label: "₹3 Lakhs+ / year", value: 300000 },
    { label: "₹6 Lakhs+ / year", value: 600000 },
    { label: "₹10 Lakhs+ / year", value: 1000000 },
    { label: "₹15 Lakhs+ / year", value: 1500000 },
  ];

  return (
    <aside
      className={`bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm space-y-6 ${className}`}
      aria-label="Job Filters"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-sky-600" />
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-sans">
            Filters
          </h2>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Sector Quick Toggles */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
          Quick Filters
        </label>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors text-xs font-medium text-slate-800">
            <input
              type="checkbox"
              checked={filters.isGovtJob === true}
              onChange={(e) =>
                onFilterChange("isGovtJob", e.target.checked ? true : undefined)
              }
              className="rounded text-sky-600 focus:ring-sky-500 w-4 h-4 cursor-pointer"
            />
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>Government Jobs Only</span>
            </span>
          </label>

          <label className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors text-xs font-medium text-slate-800">
            <input
              type="checkbox"
              checked={filters.isRemote === true}
              onChange={(e) =>
                onFilterChange("isRemote", e.target.checked ? true : undefined)
              }
              className="rounded text-sky-600 focus:ring-sky-500 w-4 h-4 cursor-pointer"
            />
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-teal-500" />
              <span>Work From Home Only</span>
            </span>
          </label>
        </div>
      </div>

      {/* Category Filter */}
      <div className="space-y-2">
        <label htmlFor="filter-category" className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
          Category
        </label>
        <select
          id="filter-category"
          value={filters.category}
          onChange={(e) => onFilterChange("category", e.target.value)}
          className="w-full bg-slate-50 text-slate-900 text-xs sm:text-sm rounded-xl p-2.5 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:bg-white font-medium cursor-pointer"
        >
          <option value="all">All Categories</option>
          {categoriesData.map((cat) => (
            <option key={cat.slug} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Location Filter */}
      <div className="space-y-2">
        <label htmlFor="filter-location" className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
          Location
        </label>
        <select
          id="filter-location"
          value={filters.location}
          onChange={(e) => onFilterChange("location", e.target.value)}
          className="w-full bg-slate-50 text-slate-900 text-xs sm:text-sm rounded-xl p-2.5 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:bg-white font-medium cursor-pointer"
        >
          <option value="all">All Locations (Pan-India)</option>
          <option value="remote">Work From Home / Remote</option>
          {locationsData.map((loc) => (
            <option key={loc.slug} value={loc.name}>
              {loc.name}
            </option>
          ))}
        </select>
      </div>

      {/* Job Type Filter */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
          Job Type
        </label>
        <div className="space-y-1.5">
          {jobTypes.map((type) => (
            <label
              key={type}
              className="flex items-center gap-2 text-xs text-slate-600 hover:text-slate-900 cursor-pointer py-1"
            >
              <input
                type="radio"
                name="jobType"
                checked={filters.jobType === type}
                onChange={() => onFilterChange("jobType", type)}
                className="text-sky-600 focus:ring-sky-500 w-3.5 h-3.5 cursor-pointer"
              />
              <span className="capitalize">{type === "all" ? "All Types" : type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Experience Filter */}
      <div className="space-y-2">
        <label htmlFor="filter-experience" className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
          Experience
        </label>
        <select
          id="filter-experience"
          value={filters.experience}
          onChange={(e) => onFilterChange("experience", e.target.value)}
          className="w-full bg-slate-50 text-slate-900 text-xs sm:text-sm rounded-xl p-2.5 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:bg-white font-medium cursor-pointer"
        >
          {experiences.map((exp) => (
            <option key={exp.value} value={exp.value}>
              {exp.label}
            </option>
          ))}
        </select>
      </div>

      {/* Minimum Salary Range Filter */}
      <div className="space-y-2">
        <label htmlFor="filter-salary" className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
          Minimum Salary
        </label>
        <select
          id="filter-salary"
          value={filters.salaryMin}
          onChange={(e) => onFilterChange("salaryMin", Number(e.target.value))}
          className="w-full bg-slate-50 text-slate-900 text-xs sm:text-sm rounded-xl p-2.5 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:bg-white font-medium cursor-pointer"
        >
          {salaryOptions.map((sal) => (
            <option key={sal.value} value={sal.value}>
              {sal.label}
            </option>
          ))}
        </select>
      </div>
    </aside>
  );
}
