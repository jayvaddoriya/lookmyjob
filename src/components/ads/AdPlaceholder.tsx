"use client";

import React, { useEffect, useRef } from "react";
import siteConfigData from "@/data/site-config.json";

interface AdPlaceholderProps {
  slotId: string;
  format?: "banner" | "rectangle" | "vertical" | "in-article" | "fluid";
  className?: string;
  minHeight?: string;
  label?: string;
}

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export default function AdPlaceholder({
  slotId,
  format = "banner",
  className = "",
  minHeight,
  label = "Advertisement",
}: AdPlaceholderProps) {
  const adPushedRef = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined" && siteConfigData.adsense.enabled && !adPushedRef.current) {
      try {
        const adsWindow = window as Window & { adsbygoogle: unknown[] };
        adsWindow.adsbygoogle = adsWindow.adsbygoogle || [];
        adsWindow.adsbygoogle.push({});
        adPushedRef.current = true;
      } catch {
        // Handled silently for ad-blockers or pre-approval phases
      }
    }
  }, []);

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
  const isEnabled = siteConfigData.adsense.enabled;
  const publisherId = siteConfigData.adsense.publisherId;

  return (
    <div
      className={`w-full my-6 flex flex-col items-center justify-center transition-all ${className}`}
      data-ad-slot={slotId}
      aria-label="Advertising Placement"
    >
      <div className="w-full flex items-center justify-between px-2 mb-1 text-[11px] font-medium tracking-wider uppercase text-slate-400">
        <span>{label}</span>
        <span className="text-[10px] text-slate-400 font-mono">AdSense: {publisherId}</span>
      </div>

      <div
        className={`w-full ${heightClass} rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 p-3 sm:p-4 flex flex-col items-center justify-center text-center overflow-hidden transition-colors hover:border-slate-300 relative`}
      >
        {isEnabled && (
          <ins
            className="adsbygoogle"
            style={{ display: "block", width: "100%", height: "100%", minHeight: "60px" }}
            data-ad-client={publisherId}
            data-ad-slot={slotId}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        )}

        {/* Fallback & Loading Visual Container (Preventing CLS) */}
        <div className="flex flex-col items-center justify-center py-2 pointer-events-none select-none">
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-block w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            <p className="text-xs font-semibold text-slate-600">Google AdSense Placement</p>
          </div>
          <p className="text-[11px] text-slate-400 max-w-xs">
            {sizeLabel}
          </p>
          <span className="text-[10px] text-slate-400/80 mt-0.5 font-mono">
            Slot: {slotId}
          </span>
        </div>
      </div>
    </div>
  );
}
