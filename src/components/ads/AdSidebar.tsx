import React from "react";
import AdPlaceholder from "./AdPlaceholder";

interface AdSidebarProps {
  slotId: string;
  className?: string;
  format?: "rectangle" | "vertical";
}

export default function AdSidebar({
  slotId,
  className = "",
  format = "rectangle",
}: AdSidebarProps) {
  return (
    <div className={`w-full max-w-sm mx-auto ${className}`}>
      <AdPlaceholder
        slotId={slotId}
        format={format}
        label="Partner Advertisement"
      />
    </div>
  );
}
