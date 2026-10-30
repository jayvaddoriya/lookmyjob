import React from "react";
import Link from "next/link";
import { Search, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="w-full bg-slate-50 min-h-[75vh] flex items-center justify-center py-16 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-xl text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center mx-auto text-3xl font-black font-sans">
          404
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-black text-slate-900 font-sans tracking-tight">
            Page Not Found
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            The page or job vacancy you are looking for may have expired, been archived, or moved to a new URL.
          </p>
        </div>

        {/* Quick Search */}
        <form action="/jobs" method="GET" className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            name="keyword"
            placeholder="Search active jobs..."
            className="w-full bg-slate-50 text-slate-900 placeholder-slate-400 text-xs rounded-xl pl-10 pr-4 py-2.5 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:bg-white"
          />
        </form>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs uppercase tracking-wider hover:bg-slate-800 transition-colors shadow-sm"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Go to Homepage</span>
          </Link>
          <Link
            href="/jobs"
            className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs uppercase tracking-wider hover:bg-slate-200 transition-colors"
          >
            Browse All Jobs
          </Link>
        </div>
      </div>
    </div>
  );
}
