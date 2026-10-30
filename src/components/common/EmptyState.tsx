import React from "react";
import Link from "next/link";
import { SearchX, RotateCcw } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  resetHref?: string;
  resetLabel?: string;
  onReset?: () => void;
}

export default function EmptyState({
  title = "No Matching Jobs Found",
  description = "We couldn't find any job opportunities matching your selected search criteria or filters. Try adjusting keywords or broadening your filters.",
  resetHref = "/jobs",
  resetLabel = "Clear All Filters",
  onReset,
}: EmptyStateProps) {
  return (
    <div className="w-full py-16 px-6 text-center rounded-2xl border border-dashed border-slate-300 bg-slate-50/70 flex flex-col items-center justify-center my-6">
      <div className="w-16 h-16 rounded-2xl bg-sky-100 border border-sky-200 flex items-center justify-center text-sky-600 mb-4 shadow-sm">
        <SearchX className="w-8 h-8" />
      </div>

      <h3 className="text-xl font-bold text-slate-900 mb-2 font-sans">
        {title}
      </h3>

      <p className="text-sm text-slate-500 max-w-md mx-auto mb-6 leading-relaxed">
        {description}
      </p>

      {onReset ? (
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors shadow-sm active:scale-95"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{resetLabel}</span>
        </button>
      ) : (
        <Link
          href={resetHref}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors shadow-sm active:scale-95"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{resetLabel}</span>
        </Link>
      )}
    </div>
  );
}
