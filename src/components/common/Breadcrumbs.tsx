import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center text-xs text-slate-500 overflow-x-auto py-2.5 whitespace-nowrap ${className}`}
    >
      <ol className="flex items-center gap-1.5 list-none p-0 m-0">
        <li className="flex items-center">
          <Link
            href="/"
            className="flex items-center gap-1 text-slate-600 hover:text-sky-600 transition-colors font-medium"
          >
            <Home className="w-3.5 h-3.5 text-slate-400" />
            <span>Home</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.url} className="flex items-center gap-1.5">
              <ChevronRight className="w-3 h-3 text-slate-300 shrink-0" />
              {isLast ? (
                <span
                  className="font-semibold text-slate-800 truncate max-w-[220px] sm:max-w-md"
                  aria-current="page"
                >
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.url}
                  className="text-slate-600 hover:text-sky-600 transition-colors font-medium truncate max-w-[150px] sm:max-w-xs"
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
