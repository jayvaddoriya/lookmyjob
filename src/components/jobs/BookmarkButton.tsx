"use client";

import React, { useSyncExternalStore } from "react";
import { Bookmark } from "lucide-react";

interface BookmarkButtonProps {
  jobId: string;
  jobTitle?: string;
  className?: string;
}

function subscribeBookmark(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("lmj_saved_updated", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("lmj_saved_updated", callback);
  };
}

// Global cached snapshot to maintain reference equality
let cachedSaved: string[] = [];
let cachedString = "";

function getSnapshotMemoized(): string[] {
  if (typeof window === "undefined") return cachedSaved;
  const current = localStorage.getItem("lmj_saved_jobs") || "[]";
  if (current !== cachedString) {
    cachedString = current;
    try {
      const parsed = JSON.parse(current);
      cachedSaved = Array.isArray(parsed) ? parsed : [];
    } catch {
      cachedSaved = [];
    }
  }
  return cachedSaved;
}

export default function BookmarkButton({
  jobId,
  className = "",
}: BookmarkButtonProps) {
  const savedJobs = useSyncExternalStore(
    subscribeBookmark,
    getSnapshotMemoized,
    () => []
  );

  const isSaved = savedJobs.includes(jobId);

  const toggleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const saved: string[] = JSON.parse(
        localStorage.getItem("lmj_saved_jobs") || "[]"
      );
      let updated: string[];

      if (saved.includes(jobId)) {
        updated = saved.filter((id) => id !== jobId);
      } else {
        updated = [...saved, jobId];
      }

      localStorage.setItem("lmj_saved_jobs", JSON.stringify(updated));
      window.dispatchEvent(new Event("lmj_saved_updated"));
    } catch {
      // Fallback
    }
  };

  return (
    <button
      type="button"
      onClick={toggleSave}
      aria-label={isSaved ? "Remove from saved jobs" : "Save job for later"}
      title={isSaved ? "Saved" : "Save Job"}
      className={`p-2 rounded-xl transition-all ${
        isSaved
          ? "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20"
          : "bg-slate-100 text-slate-400 hover:text-slate-700 hover:bg-slate-200"
      } ${className}`}
    >
      <Bookmark
        className={`w-4 h-4 transition-transform active:scale-125 ${
          isSaved ? "fill-current" : ""
        }`}
      />
    </button>
  );
}
