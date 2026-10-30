import React from "react";
import AdPlaceholder from "./AdPlaceholder";

interface AdInArticleProps {
  slotId: string;
  className?: string;
}

export default function AdInArticle({
  slotId,
  className = "",
}: AdInArticleProps) {
  return (
    <div className={`w-full my-8 ${className}`}>
      <AdPlaceholder
        slotId={slotId}
        format="in-article"
        label="Advertisement"
      />
    </div>
  );
}
