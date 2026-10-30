import React from "react";
import AdPlaceholder from "./AdPlaceholder";

interface AdBannerProps {
  slotId: string;
  className?: string;
  label?: string;
}

export default function AdBanner({
  slotId,
  className = "",
  label = "Sponsored Placement",
}: AdBannerProps) {
  return (
    <div className={`w-full max-w-5xl mx-auto px-4 ${className}`}>
      <AdPlaceholder
        slotId={slotId}
        format="banner"
        minHeight="min-h-[100px]"
        label={label}
      />
    </div>
  );
}
