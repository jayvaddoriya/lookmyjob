import React from "react";

export function JobCardSkeleton() {
  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 space-y-4 animate-pulse">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3.5 flex-1">
          <div className="w-12 h-12 rounded-xl bg-slate-200 shrink-0" />
          <div className="space-y-2 flex-1">
            <div className="h-5 bg-slate-200 rounded w-3/4" />
            <div className="h-4 bg-slate-100 rounded w-1/2" />
          </div>
        </div>
        <div className="w-8 h-8 rounded-lg bg-slate-200 shrink-0" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
        <div className="h-4 bg-slate-100 rounded" />
        <div className="h-4 bg-slate-100 rounded" />
        <div className="h-4 bg-slate-100 rounded" />
        <div className="h-4 bg-slate-100 rounded" />
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <div className="flex gap-2">
          <div className="h-6 w-16 bg-slate-200 rounded-full" />
          <div className="h-6 w-20 bg-slate-200 rounded-full" />
        </div>
        <div className="h-8 w-24 bg-slate-200 rounded-lg" />
      </div>
    </div>
  );
}

export function JobListSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <JobCardSkeleton key={i} />
      ))}
    </div>
  );
}
