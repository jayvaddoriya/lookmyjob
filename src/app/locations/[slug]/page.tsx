import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import JobCard from "@/components/jobs/JobCard";
import AdBanner from "@/components/ads/AdBanner";
import AdSidebar from "@/components/ads/AdSidebar";
import EmptyState from "@/components/common/EmptyState";
import { getAllLocations, getLocationBySlug, getJobsByLocation } from "@/lib/data";
import { buildBreadcrumbSchema, SITE_URL } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const locations = getAllLocations();
  return locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocationBySlug(slug);

  if (!location) {
    return { title: "Location Not Found | LookMyJob" };
  }

  return {
    title: location.metaTitle,
    description: location.metaDescription,
    alternates: {
      canonical: `${SITE_URL}/locations/${location.slug}`,
    },
    openGraph: {
      title: location.metaTitle,
      description: location.metaDescription,
      url: `${SITE_URL}/locations/${location.slug}`,
    },
  };
}

export default async function LocationDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const location = getLocationBySlug(slug);

  if (!location) {
    notFound();
  }

  const jobs = getJobsByLocation(location.slug);
  const breadcrumbItems = [
    { name: "Locations", url: "/locations" },
    { name: location.name, url: `/locations/${location.slug}` },
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
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-teal-300 bg-teal-950 border border-teal-800">
                <MapPin className="w-3.5 h-3.5" />
                {location.name}, {location.state}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white font-sans">
                Jobs in {location.name} (2026)
              </h1>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {location.description}
              </p>

              {/* Localities & Industries */}
              <div className="pt-4 flex flex-wrap items-center gap-2">
                <span className="text-xs text-slate-400 font-semibold">
                  Key Localities / Hubs:
                </span>
                {location.popularLocalities.map((loc) => (
                  <span
                    key={loc}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 text-xs font-medium text-slate-200 border border-slate-700"
                  >
                    {loc}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Ad Placement */}
          <div className="mb-8">
            <AdBanner slotId={`location-${location.slug}-top-ad`} />
          </div>

          {/* Two-Column Grid: Jobs + Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 font-sans">
                  Available Job Openings in {location.name} ({jobs.length})
                </h2>
                <Link
                  href="/jobs"
                  className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1"
                >
                  <span>Browse All Jobs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {jobs.length === 0 ? (
                <EmptyState
                  title={`No Active Jobs Listed in ${location.name}`}
                  description="We are constantly adding verified openings for this city. In the meantime, explore nearby opportunities or remote vacancies."
                />
              ) : (
                jobs.map((job) => <JobCard key={job.id} job={job} />)
              )}
            </div>

            {/* Sidebar Column */}
            <div className="space-y-6">
              <AdSidebar
                slotId={`location-${location.slug}-sidebar`}
                format="rectangle"
              />

              <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-3">
                <h3 className="text-sm font-bold text-slate-900 font-sans">
                  Top Hiring Industries in {location.name}
                </h3>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {location.topIndustries.map((ind) => (
                    <li key={ind} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                      <span>{ind}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
