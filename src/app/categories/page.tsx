import React from "react";
import type { Metadata } from "next";
import { Briefcase } from "lucide-react";
import CategoryCard from "@/components/categories/CategoryCard";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import AdBanner from "@/components/ads/AdBanner";
import { getAllCategories } from "@/lib/data";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Job Categories 2026 | IT, Govt, Banking, Healthcare & Engineering",
  description:
    "Explore 14 professional job sectors in India. Find career vacancies in IT & Software, Government, Banking & Finance, Engineering, Healthcare, Sales, and Freshers.",
  alternates: {
    canonical: `${SITE_URL}/categories`,
  },
};

export default function CategoriesPage() {
  const categories = getAllCategories();
  const breadcrumbItems = [{ name: "Job Categories", url: "/categories" }];

  return (
    <div className="w-full bg-slate-50 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbItems} className="mb-6" />

        <div className="max-w-3xl mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-100/70 border border-sky-200 mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            Specialized Sectors
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-sans">
            Explore Jobs by Industry Category
          </h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Browse verified vacancies tailored to your professional specialization, academic qualification, and career aspirations across India.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <CategoryCard key={cat.slug} category={cat} />
          ))}
        </div>

        <div className="mt-14">
          <AdBanner slotId="categories-index-bottom-ad" />
        </div>
      </div>
    </div>
  );
}
