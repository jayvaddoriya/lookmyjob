import React from "react";
import Link from "next/link";
import { 
  Code2, 
  Building2, 
  Coins, 
  Cog, 
  Stethoscope, 
  GraduationCap, 
  TrendingUp, 
  Users, 
  Headphones, 
  Palette, 
  Factory, 
  Keyboard, 
  Briefcase, 
  Sparkles,
  ArrowRight
} from "lucide-react";
import { Category } from "@/types";

interface CategoryCardProps {
  category: Category;
}

// Icon mapper
const iconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 className="w-6 h-6" />,
  Building2: <Building2 className="w-6 h-6" />,
  Coins: <Coins className="w-6 h-6" />,
  Cog: <Cog className="w-6 h-6" />,
  Stethoscope: <Stethoscope className="w-6 h-6" />,
  GraduationCap: <GraduationCap className="w-6 h-6" />,
  TrendingUp: <TrendingUp className="w-6 h-6" />,
  Users: <Users className="w-6 h-6" />,
  Headphones: <Headphones className="w-6 h-6" />,
  Palette: <Palette className="w-6 h-6" />,
  Factory: <Factory className="w-6 h-6" />,
  Keyboard: <Keyboard className="w-6 h-6" />,
  Briefcase: <Briefcase className="w-6 h-6" />,
  Sparkles: <Sparkles className="w-6 h-6" />,
};

export default function CategoryCard({ category }: CategoryCardProps) {
  const icon = iconMap[category.icon] || <Briefcase className="w-6 h-6" />;

  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group relative rounded-2xl bg-white p-5 sm:p-6 border border-slate-200/90 shadow-sm hover:border-sky-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 text-sky-400 flex items-center justify-center shadow-sm group-hover:scale-105 group-hover:text-white group-hover:bg-sky-600 transition-all">
            {icon}
          </div>
          <span className="text-xs font-bold text-slate-500 bg-slate-100 group-hover:bg-sky-50 group-hover:text-sky-700 px-2.5 py-1 rounded-full transition-colors">
            {category.count}+ Jobs
          </span>
        </div>

        <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors leading-snug mb-1.5 font-sans">
          {category.name}
        </h3>

        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
          {category.description}
        </p>
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-600 group-hover:text-sky-600 transition-colors">
        <span>Explore Openings</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}
