import React from "react";
import Link from "next/link";
import { 
  MapPin, 
  IndianRupee, 
  Clock, 
  Briefcase, 
  CheckCircle, 
  ExternalLink,
  Calendar
} from "lucide-react";
import { Job } from "@/types";
import BookmarkButton from "./BookmarkButton";

interface JobCardProps {
  job: Job;
  featured?: boolean;
}

export default function JobCard({ job, featured = false }: JobCardProps) {
  // Format posted date
  const formattedDate = new Date(job.postedDate).toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
  });

  return (
    <div
      className={`group relative rounded-2xl bg-white p-5 sm:p-6 transition-all duration-200 border ${
        featured
          ? "border-sky-300 shadow-md shadow-sky-500/5 bg-gradient-to-b from-sky-50/20 to-white hover:border-sky-400 hover:shadow-lg"
          : "border-slate-200/90 shadow-sm hover:border-slate-300 hover:shadow-md"
      }`}
    >
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
                  title="Verified Recruitment Notice"
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
                  Remote / WFH
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Top Badges & Bookmark */}
        <div className="flex items-center gap-1.5">
          {job.isGovtJob && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-amber-500/10 text-amber-700 border border-amber-500/30">
              Govt {job.govtCategory ? `• ${job.govtCategory}` : ""}
            </span>
          )}
          <BookmarkButton jobId={job.id} jobTitle={job.title} />
        </div>
      </div>

      {/* Job Title */}
      <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors leading-snug mb-3">
        <Link href={`/jobs/${job.slug}`} className="focus:outline-none focus:underline">
          {job.title}
        </Link>
      </h3>

      {/* Key Highlights Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 py-2.5 px-3 rounded-xl bg-slate-50/80 border border-slate-100 text-xs text-slate-600 mb-3.5">
        <div className="flex items-center gap-1.5">
          <IndianRupee className="w-3.5 h-3.5 text-sky-600 shrink-0" />
          <span className="font-semibold text-slate-800 truncate" title={job.salary}>
            {job.salary}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate">{job.experience}</span>
        </div>

        <div className="flex items-center gap-1.5 col-span-2 sm:col-span-1">
          <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate">{job.jobType}</span>
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
            className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-slate-100 text-slate-600 group-hover:bg-sky-50 group-hover:text-sky-700 transition-colors"
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

      {/* Card Footer */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-400 text-[11px]">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>Posted {formattedDate}</span>
          </span>
          {job.vacancies > 0 && (
            <>
              <span>•</span>
              <span className="font-semibold text-slate-600">
                {job.vacancies} {job.vacancies === 1 ? "Opening" : "Openings"}
              </span>
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/jobs/${job.slug}`}
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-sky-600 hover:text-sky-700 hover:bg-sky-50 transition-colors"
          >
            Details
          </Link>
          <a
            href={job.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors shadow-sm active:scale-95"
          >
            <span>Apply</span>
            <ExternalLink className="w-3 h-3 text-slate-300" />
          </a>
        </div>
      </div>
    </div>
  );
}
