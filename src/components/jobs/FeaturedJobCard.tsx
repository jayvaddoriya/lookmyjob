"use client";

import React, { useSyncExternalStore } from "react";
import Link from "next/link";
import { 
  MapPin, 
  IndianRupee, 
  Sparkles, 
  CheckCircle, 
  ArrowRight,
  Clock,
  AlertCircle
} from "lucide-react";
import { Job } from "@/types";
import BookmarkButton from "./BookmarkButton";
import { subscribeApplications, getApplicationsSnapshot } from "@/lib/applications";

interface FeaturedJobCardProps {
  job: Job;
}

export default function FeaturedJobCard({ job }: FeaturedJobCardProps) {
  const applications = useSyncExternalStore(
    subscribeApplications,
    getApplicationsSnapshot,
    () => []
  );

  const hasApplied = applications.some((app) => app.jobId === job.id);

  return (
    <div className="group relative rounded-3xl p-6 sm:p-7 bg-white border border-sky-200/80 shadow-lg shadow-sky-900/5 hover:border-sky-400 hover:shadow-xl transition-all duration-200 overflow-hidden flex flex-col justify-between">
      {/* Top Banner Stripe */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-sky-500 to-teal-400" />

      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 text-sky-400 font-black text-base flex items-center justify-center shrink-0 shadow-sm border border-slate-800">
              {job.logo || job.company.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs font-bold text-slate-700">
                  {job.company}
                </span>
                {job.isVerified && (
                  <CheckCircle className="w-3.5 h-3.5 text-teal-600" />
                )}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{job.city}, {job.state}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {hasApplied ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-300">
                <CheckCircle className="w-3 h-3 text-emerald-600" /> Applied
              </span>
            ) : job.isExpired ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-rose-50 text-rose-700 border border-rose-200">
                <AlertCircle className="w-3 h-3 text-rose-500" /> Closed
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-sky-500/10 text-sky-700 border border-sky-300">
                <Sparkles className="w-3 h-3 text-sky-500" /> Featured
              </span>
            )}
            <BookmarkButton jobId={job.id} jobTitle={job.title} />
          </div>
        </div>

        <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug mb-2 font-sans">
          <Link href={`/jobs/${job.slug}`}>
            {job.title}
          </Link>
        </h3>

        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 mb-4">
          <span className="font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100 flex items-center gap-1">
            <IndianRupee className="w-3 h-3 text-blue-600" />
            {job.salary}
          </span>
          <span className="bg-slate-100 px-2.5 py-1 rounded-lg font-medium">
            {job.experience}
          </span>
          <span className="bg-slate-100 px-2.5 py-1 rounded-lg font-medium">
            {job.jobType}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-500 line-clamp-2 leading-relaxed mb-4">
          {job.description}
        </p>
      </div>

      <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
        <div className="text-[11px] text-slate-500 flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          {job.isExpired ? (
            <span className="font-semibold text-rose-600">Applications Closed</span>
          ) : (
            <span>
              Closes in <strong className="text-blue-600 font-bold">{job.daysRemaining} days</strong>
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/jobs/${job.slug}`}
            className="text-xs font-bold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            Details
          </Link>

          {!job.isExpired ? (
            <Link
              href={`/jobs/${job.slug}/apply`}
              className="inline-flex items-center gap-1 text-xs font-bold px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all"
            >
              <span>{hasApplied ? "View Status" : "Apply Now"}</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          ) : (
            <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-200 text-slate-500 cursor-not-allowed">
              Closed
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
