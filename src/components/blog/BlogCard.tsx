import React from "react";
import Link from "next/link";
import { Clock, Calendar, ArrowRight, User } from "lucide-react";
import { Blog } from "@/types";

interface BlogCardProps {
  blog: Blog;
  featured?: boolean;
}

export default function BlogCard({ blog, featured = false }: BlogCardProps) {
  const formattedDate = new Date(blog.publishDate).toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article
      className={`group rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:border-sky-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden ${
        featured ? "md:grid md:grid-cols-2 md:gap-6" : ""
      }`}
    >
      {/* Decorative Header / Cover */}
      <div
        className={`w-full bg-gradient-to-br ${blog.coverGradient} p-6 flex flex-col justify-between relative overflow-hidden ${
          featured ? "min-h-[220px]" : "h-36"
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-black/30 backdrop-blur-sm text-white border border-white/20">
            {blog.category}
          </span>
          <span className="text-[11px] font-medium text-white/80 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {blog.readTime}
          </span>
        </div>

        <div className="text-white/40 font-mono text-4xl font-black select-none pointer-events-none self-end">
          LMJ
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {formattedDate}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 truncate">
              <User className="w-3.5 h-3.5" />
              {blog.author}
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors leading-snug mb-2 font-sans">
            <Link href={`/blog/${blog.slug}`} className="focus:outline-none focus:underline">
              {blog.title}
            </Link>
          </h3>

          <p className="text-xs sm:text-sm text-slate-500 line-clamp-3 leading-relaxed mb-4">
            {blog.excerpt}
          </p>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-sky-600 group-hover:text-sky-700">
          <span>Read Full Article</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </article>
  );
}
