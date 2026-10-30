import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  viewAllHref?: string;
  viewAllText?: string;
  alignment?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  badge,
  title,
  subtitle,
  viewAllHref,
  viewAllText = "View All Opportunities",
  alignment = "left",
  className = "",
}: SectionHeadingProps) {
  const isCenter = alignment === "center";

  return (
    <div
      className={`flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10 ${
        isCenter ? "items-center text-center" : ""
      } ${className}`}
    >
      <div className={isCenter ? "max-w-2xl mx-auto" : "max-w-3xl"}>
        {badge && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 border border-sky-100 mb-2.5">
            {badge}
          </span>
        )}
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 font-sans">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {viewAllHref && !isCenter && (
        <div className="shrink-0">
          <Link
            href={viewAllHref}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-sky-600 hover:text-sky-700 group transition-colors"
          >
            <span>{viewAllText}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      )}
    </div>
  );
}
