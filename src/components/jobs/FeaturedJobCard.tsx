import React from "react";
import Link from "next/link";
import { 
  MapPin, 
  IndianRupee, 
  Sparkles, 
  CheckCircle, 
  ArrowRight
} from "lucide-react";
import { Job } from "@/types";
import BookmarkButton from "./BookmarkButton";

interface FeaturedJobCardProps {
  job: Job;
}

export default function FeaturedJobCard({ job }: FeaturedJobCardProps) {
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
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-sky-500/10 text-sky-700 border border-sky-300">
              <Sparkles className="w-3 h-3 text-sky-500" /> Featured
            </span>
            <BookmarkButton jobId={job.id} jobTitle={job.title} />
          </div>
        </div>

        <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 group-hover:text-sky-600 transition-colors leading-snug mb-2 font-sans">
          <Link href={`/jobs/${job.slug}`}>
            {job.title}
          </Link>
        </h3>

        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 mb-4">
          <span className="font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-100 flex items-center gap-1">
            <IndianRupee className="w-3 h-3 text-sky-600" />
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

      <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
        <div className="text-[11px] text-slate-400">
          Last Date: <span className="font-semibold text-slate-700">{job.applicationDeadline}</span>
        </div>

        <Link
          href={`/jobs/${job.slug}`}
          className="inline-flex items-center gap-1 text-xs font-bold text-sky-600 hover:text-sky-700 group-hover:translate-x-0.5 transition-all"
        >
          <span>View Opportunity</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
