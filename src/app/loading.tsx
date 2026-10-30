import React from "react";
import { JobListSkeleton } from "@/components/common/LoadingSkeleton";

export default function Loading() {
  return (
    <div className="w-full bg-slate-50 min-h-[70vh] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-8 w-48 bg-slate-200 rounded-xl mb-4 animate-pulse" />
        <div className="h-4 w-96 bg-slate-100 rounded-lg mb-8 animate-pulse" />
        <JobListSkeleton count={5} />
      </div>
    </div>
  );
}
