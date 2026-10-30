import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Briefcase, ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import JobCard from "@/components/jobs/JobCard";
import AdBanner from "@/components/ads/AdBanner";
import AdSidebar from "@/components/ads/AdSidebar";
import EmptyState from "@/components/common/EmptyState";
import { getAllCategories, getCategoryBySlug, getJobsByCategory } from "@/lib/data";
import { buildBreadcrumbSchema, SITE_URL } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return { title: "Category Not Found | LookMyJob" };
  }

  return {
    title: category.metaTitle,
    description: category.metaDescription,
    alternates: {
      canonical: `${SITE_URL}/categories/${category.slug}`,
    },
    openGraph: {
      title: category.metaTitle,
      description: category.metaDescription,
      url: `${SITE_URL}/categories/${category.slug}`,
    },
  };
}

export default async function CategoryDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const jobs = getJobsByCategory(category.slug);
  const breadcrumbItems = [
    { name: "Categories", url: "/categories" },
    { name: category.name, url: `/categories/${category.slug}` },
  ];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="w-full bg-slate-50 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbItems} className="mb-6" />

          {/* Header Banner */}
          <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-10 lg:p-12 mb-10 border border-slate-800 shadow-lg relative overflow-hidden">
            <div className="max-w-3xl space-y-3 relative z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-sky-400 bg-sky-950 border border-sky-800">
                <Briefcase className="w-3.5 h-3.5" />
                {category.name} Sector
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white font-sans">
                {category.name} Jobs (2026)
              </h1>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {category.description}
              </p>

              {/* Popular Roles Chips */}
              <div className="pt-4 flex flex-wrap items-center gap-2">
                <span className="text-xs text-slate-400 font-semibold">
                  Popular Roles:
                </span>
                {category.popularRoles.map((role) => (
                  <Link
                    key={role}
                    href={`/jobs?keyword=${encodeURIComponent(role)}`}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 text-xs font-medium text-slate-200 hover:bg-slate-700 hover:text-white border border-slate-700 transition-colors"
                  >
                    {role}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Ad Placement */}
          <div className="mb-8">
            <AdBanner slotId={`category-${category.slug}-top-ad`} />
          </div>

          {/* Two-Column Grid: Jobs + Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 font-sans">
                  Available {category.name} Openings ({jobs.length})
                </h2>
                <Link
                  href="/jobs"
                  className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1"
                >
                  <span>All Job Listings</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {jobs.length === 0 ? (
                <EmptyState
                  title={`No Active ${category.name} Jobs Found`}
                  description="We are currently updating our database with new verified openings in this category. Check back shortly."
                />
              ) : (
                jobs.map((job) => <JobCard key={job.id} job={job} />)
              )}
            </div>

            {/* Sidebar Column */}
            <div className="space-y-6">
              <AdSidebar
                slotId={`category-${category.slug}-sidebar`}
                format="rectangle"
              />

              <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-3">
                <h3 className="text-sm font-bold text-slate-900 font-sans">
                  Why Specialize in {category.name}?
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Companies across India are expanding their headcount in this industry. Keep your resume updated and set up alerts on LookMyJob.
                </p>
                <Link
                  href="/blog"
                  className="text-xs font-bold text-sky-600 hover:underline block pt-1"
                >
                  Read Career Preparation Guides →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
