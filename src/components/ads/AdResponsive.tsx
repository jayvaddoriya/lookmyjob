import React from "react";
import AdPlaceholder from "./AdPlaceholder";

interface AdResponsiveProps {
  slotId: string;
  className?: string;
  label?: string;
}

export default function AdResponsive({
  slotId,
  className = "",
  label = "Sponsored Link",
}: AdResponsiveProps) {
  return (
    <div className={`w-full ${className}`}>
      <AdPlaceholder
        slotId={slotId}
        format="fluid"
        minHeight="min-h-[110px]"
        label={label}
      />
    </div>
  );
}
