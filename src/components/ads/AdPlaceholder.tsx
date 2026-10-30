"use client";

import React from "react";

interface AdPlaceholderProps {
  slotId: string;
  format?: "banner" | "rectangle" | "vertical" | "in-article" | "fluid";
  className?: string;
  minHeight?: string;
  label?: string;
}

export default function AdPlaceholder({
  slotId,
  format = "banner",
  className = "",
  minHeight,
  label = "Advertisement",
}: AdPlaceholderProps) {
  // Determine standard IAB sizing
  let defaultHeight = "min-h-[90px]";
  let sizeLabel = "728 × 90 (Leaderboard) / Responsive";

  if (format === "rectangle") {
    defaultHeight = "min-h-[250px]";
    sizeLabel = "300 × 250 (Medium Rectangle)";
  } else if (format === "vertical") {
    defaultHeight = "min-h-[600px]";
    sizeLabel = "300 × 600 (Half Page)";
  } else if (format === "in-article") {
    defaultHeight = "min-h-[140px]";
    sizeLabel = "In-Article Native Display";
  } else if (format === "fluid") {
    defaultHeight = "min-h-[100px]";
    sizeLabel = "Responsive Dynamic Ad";
  }

  const heightClass = minHeight || defaultHeight;

  return (
    <div
      className={`w-full my-6 flex flex-col items-center justify-center transition-all ${className}`}
      data-ad-slot={slotId}
      aria-label="Advertising Placement"
    >
      <div className="w-full flex items-center justify-between px-2 mb-1 text-[11px] font-medium tracking-wider uppercase text-slate-400">
        <span>{label}</span>
        <span className="text-[10px] text-slate-300">ID: {slotId}</span>
      </div>

      <div
        className={`w-full ${heightClass} rounded-xl border border-dashed border-slate-200 bg-slate-50/80 p-4 flex flex-col items-center justify-center text-center overflow-hidden transition-colors hover:border-slate-300 hover:bg-slate-100/60`}
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="inline-block w-2 h-2 rounded-full bg-slate-300 animate-pulse" />
          <p className="text-xs font-semibold text-slate-500">Reserved Ad Space</p>
        </div>
        <p className="text-[11px] text-slate-400 max-w-xs">
          Google AdSense Unit • {sizeLabel}
        </p>
        <span className="text-[10px] text-slate-400/80 mt-1 font-mono">
          Slot: {slotId}
        </span>
      </div>
    </div>
  );
}
