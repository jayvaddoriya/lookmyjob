"use client";

import React, { useState } from "react";
import { Share2, Link as LinkIcon, Check, MessageSquare } from "lucide-react";

interface JobShareButtonsProps {
  title: string;
  url?: string;
  className?: string;
}

export default function JobShareButtons({
  title,
  url,
  className = "",
}: JobShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl =
    typeof window !== "undefined" ? url || window.location.href : url || "https://lookmyjob.online";

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(`Check out this job vacancy on LookMyJob: ${title}`);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const shareNative = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: `Check out this job opening: ${title}`,
        url: shareUrl,
      }).catch(() => {});
    } else {
      handleCopy();
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Native Web Share */}
      <button
        type="button"
        onClick={shareNative}
        className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
        title="Share"
        aria-label="Share Job"
      >
        <Share2 className="w-4 h-4" />
      </button>

      {/* WhatsApp */}
      <a
        href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
        title="Share on WhatsApp"
        aria-label="Share on WhatsApp"
      >
        <MessageSquare className="w-4 h-4" />
      </a>

      {/* LinkedIn */}
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-xl bg-sky-50 text-sky-600 hover:bg-sky-100 transition-colors"
        title="Share on LinkedIn"
        aria-label="Share on LinkedIn"
      >
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
        </svg>
      </a>

      {/* Copy Link */}
      <button
        type="button"
        onClick={handleCopy}
        className={`p-2 rounded-xl transition-colors flex items-center gap-1 text-xs font-semibold ${
          copied
            ? "bg-teal-50 text-teal-600 border border-teal-200"
            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
        }`}
        title="Copy Link"
        aria-label="Copy link to clipboard"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 text-teal-600" />
            <span className="hidden sm:inline">Copied!</span>
          </>
        ) : (
          <LinkIcon className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}
