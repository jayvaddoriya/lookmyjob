import React from "react";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { LocationItem } from "@/types";

interface LocationCardProps {
  location: LocationItem;
}

export default function LocationCard({ location }: LocationCardProps) {
  return (
    <Link
      href={`/locations/${location.slug}`}
      className="group rounded-2xl bg-white p-5 sm:p-6 border border-slate-200/90 shadow-sm hover:border-teal-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
    >
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-teal-50 text-slate-700 group-hover:text-teal-600 flex items-center justify-center transition-colors">
            <MapPin className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-teal-700 bg-teal-50 border border-teal-100 px-2.5 py-0.5 rounded-full">
            {location.jobCount}+ Openings
          </span>
        </div>

        <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors mb-0.5 font-sans">
          {location.name}
        </h3>
        <p className="text-xs text-slate-400 font-medium mb-2.5">
          {location.state}
        </p>

        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
          {location.description}
        </p>
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-600 group-hover:text-teal-700 transition-colors">
        <span>View Jobs in {location.name}</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}
