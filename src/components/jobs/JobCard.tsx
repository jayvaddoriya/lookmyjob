"use client";

import React, { useSyncExternalStore } from "react";
import Link from "next/link";
import { 
  MapPin, 
  IndianRupee, 
  Clock, 
  Briefcase, 
  CheckCircle, 
  Calendar,
  AlertCircle,
  Sparkles
} from "lucide-react";
import { Job } from "@/types";
import BookmarkButton from "./BookmarkButton";
import { subscribeApplications, getApplicationsSnapshot } from "@/lib/applications";

interface JobCardProps {
  job: Job;
  featured?: boolean;
}

export default function JobCard({ job, featured = false }: JobCardProps) {
  const applications = useSyncExternalStore(
    subscribeApplications,
    getApplicationsSnapshot,
    () => []
  );

  const hasApplied = applications.some((app) => app.jobId === job.id);

  // Format posted date
  const formattedDate = new Date(job.postedDate).toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
  });

  return (
    <div
      className={`group relative rounded-2xl bg-white p-5 sm:p-6 transition-all duration-200 border flex flex-col justify-between ${
        featured
          ? "border-sky-300 shadow-md shadow-sky-500/5 bg-gradient-to-b from-sky-50/20 to-white hover:border-sky-400 hover:shadow-lg"
          : job.isExpired
          ? "border-slate-200/80 bg-slate-50/50 opacity-90"
          : "border-slate-200/90 shadow-sm hover:border-slate-300 hover:shadow-md"
      }`}
    >
      <div>
        {/* Top Meta Row */}
        <div className="flex items-start justify-between gap-3 mb-3.5">
          <div className="flex items-center gap-3">
            {/* Company Monogram / Logo */}
            <div className="w-11 h-11 rounded-xl bg-slate-900 text-sky-400 font-black text-sm flex items-center justify-center shrink-0 shadow-sm border border-slate-800 tracking-wider">
              {job.logo || job.company.substring(0, 2).toUpperCase()}
            </div>

            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors">
                  {job.company}
                </span>
                {job.isVerified && (
                  <span
                    title="Verified Direct Corporate Employer"
                    className="inline-flex items-center text-teal-600"
                  >
                    <CheckCircle className="w-3.5 h-3.5 fill-teal-50" />
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{job.city}, {job.state}</span>
                </span>
                {job.isRemote && (
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-teal-50 text-teal-700 border border-teal-200">
                    Remote
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Top Badges & Bookmark */}
          <div className="flex items-center gap-1.5">
            {hasApplied ? (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-300 flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-emerald-600" />
                Applied
              </span>
            ) : job.isExpired ? (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 text-rose-500" />
                Closed
              </span>
            ) : job.daysRemaining <= 2 ? (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-300 animate-pulse flex items-center gap-1">
                <Clock className="w-3 h-3 text-amber-600" />
                {job.daysRemaining === 1 ? "Last Day!" : "Closes in 2d"}
              </span>
            ) : job.postedRelative === "Today" ? (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-blue-600" />
                New Today
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold text-slate-600 bg-slate-100 border border-slate-200 flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-500" />
                {job.daysRemaining}d left
              </span>
            )}
            <BookmarkButton jobId={job.id} jobTitle={job.title} />
          </div>
        </div>

        {/* Job Title */}
        <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug mb-3">
          <Link href={`/jobs/${job.slug}`} className="focus:outline-none focus:underline">
            {job.title}
          </Link>
        </h3>

        {/* Key Highlights Grid */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 py-2 px-3 rounded-xl bg-slate-50/80 border border-slate-100 text-xs text-slate-600 mb-3.5">
          <div className="flex items-center gap-1.5 font-bold text-slate-900">
            <IndianRupee className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>{job.salary}</span>
          </div>

          <div className="flex items-center gap-3 text-slate-500 text-[11px] sm:text-xs">
            <span className="hidden sm:inline text-slate-300">•</span>
            <span className="flex items-center gap-1">
              <Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{job.experience}</span>
            </span>

            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{job.jobType}</span>
            </span>
          </div>
        </div>

        {/* Description Snippet */}
        <p className="text-xs sm:text-sm text-slate-500 line-clamp-2 leading-relaxed mb-4">
          {job.description}
        </p>

        {/* Skills Pills */}
        <div className="flex flex-wrap items-center gap-1.5 mb-4">
          {job.skills.slice(0, 4).map((skill) => (
            <span
              key={skill}
              className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-slate-100 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-700 transition-colors"
            >
              {skill}
            </span>
          ))}
          {job.skills.length > 4 && (
            <span className="text-[11px] text-slate-400 font-medium">
              +{job.skills.length - 4} more
            </span>
          )}
        </div>
      </div>

      {/* Card Footer */}
      <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2.5 text-xs">
        <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
          <Calendar className="w-3 h-3 shrink-0" />
          <span>Posted {job.postedRelative || formattedDate}</span>
          {job.vacancies > 0 && (
            <>
              <span>•</span>
              <span className="font-semibold text-slate-600">
                {job.vacancies} {job.vacancies === 1 ? "Opening" : "Openings"}
              </span>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            href={`/jobs/${job.slug}`}
            className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            Details
          </Link>

          {job.isExpired ? (
            <span className="px-3 py-1.5 rounded-xl bg-slate-200 text-slate-500 font-semibold text-xs cursor-not-allowed">
              Closed (15d)
            </span>
          ) : hasApplied ? (
            <Link
              href={`/jobs/${job.slug}/apply`}
              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors shadow-sm"
            >
              View Application
            </Link>
          ) : (
            <Link
              href={`/jobs/${job.slug}/apply`}
              className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-sm active:scale-95"
            >
              <span>Apply</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
