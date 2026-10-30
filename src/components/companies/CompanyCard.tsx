import React from "react";
import Link from "next/link";
import { CheckCircle, MapPin } from "lucide-react";
import { Company } from "@/types";

interface CompanyCardProps {
  company: Company;
}

export default function CompanyCard({ company }: CompanyCardProps) {
  return (
    <div className="group rounded-2xl bg-white p-5 sm:p-6 border border-slate-200/90 shadow-sm hover:border-sky-300 hover:shadow-md transition-all flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-3 mb-3.5">
          <div className="w-12 h-12 rounded-xl bg-slate-900 text-sky-400 font-black text-sm flex items-center justify-center border border-slate-800 shadow-sm">
            {company.logo}
          </div>
          {company.verified && (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-700 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-full">
              <CheckCircle className="w-3 h-3" />
              Verified
            </span>
          )}
        </div>

        <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-600 transition-colors mb-1 font-sans">
          {company.name}
        </h3>

        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate">{company.headquarters}</span>
        </div>

        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
          {company.overview}
        </p>
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <span className="font-semibold text-slate-700">
          {company.jobCount}+ Active Roles
        </span>
        <Link
          href={`/jobs?keyword=${encodeURIComponent(company.name.split(" ")[0])}`}
          className="font-bold text-sky-600 hover:text-sky-700 transition-colors flex items-center gap-1"
        >
          <span>View Openings</span>
        </Link>
      </div>
    </div>
  );
}
