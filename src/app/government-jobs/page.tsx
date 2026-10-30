import React, { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Award } from "lucide-react";
import JobListingClient from "@/components/jobs/JobListingClient";
import AdBanner from "@/components/ads/AdBanner";
import { getGovtJobs } from "@/lib/data";
import { JobListSkeleton } from "@/components/common/LoadingSkeleton";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Government Jobs 2026 (Sarkari Naukri) | UPSC, SSC, Railway & Bank PO",
  description:
    "Find verified latest government recruitments across India. Central & State PSCs, Railway NTPC, UPSC Civil Services, SSC CGL, Police SI, and Bank PO notifications on LookMyJob.",
  alternates: {
    canonical: `${SITE_URL}/government-jobs`,
  },
};

export default function GovernmentJobsPage() {
  const govtJobs = getGovtJobs();

  const govtSectors = [
    { name: "Central Govt", count: "340+ Vacancies", slug: "central" },
    { name: "State PSCs", count: "480+ Vacancies", slug: "state" },
    { name: "Indian Railways", count: "210+ Vacancies", slug: "railway" },
    { name: "Public Sector Banking", count: "180+ Vacancies", slug: "banking" },
    { name: "SSC Staff Selection", count: "150+ Vacancies", slug: "ssc" },
    { name: "UPSC Civil Services", count: "65+ Vacancies", slug: "upsc" },
    { name: "Police & Defense", count: "290+ Vacancies", slug: "police" },
    { name: "Teaching (KVS/NVS)", count: "120+ Vacancies", slug: "teaching" },
  ];

  return (
    <div className="w-full">
      {/* Government Sector Quick Navigation Bar */}
      <div className="bg-amber-50 border-b border-amber-200/80 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 overflow-x-auto pb-1 whitespace-nowrap text-xs">
            <span className="font-bold text-amber-900 uppercase tracking-wider shrink-0 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-600" />
              Sarkari Categories:
            </span>
            <div className="flex items-center gap-2">
              {govtSectors.map((sector) => (
                <Link
                  key={sector.slug}
                  href={`/government-jobs?keyword=${encodeURIComponent(sector.name.split(" ")[0])}`}
                  className="px-3 py-1.5 rounded-full bg-white hover:bg-amber-100 text-amber-950 border border-amber-200 font-semibold transition-colors"
                >
                  {sector.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Listing Client */}
      <Suspense
        fallback={
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <JobListSkeleton count={6} />
          </div>
        }
      >
        <JobListingClient
          initialJobs={govtJobs}
          pageTitle="Government Jobs & Sarkari Recruitment (2026)"
          pageSubtitle="Track authentic Central, State, Railway, Banking, and Defense examination announcements with verified official gazette notifications."
          presetFilter={{ isGovtJob: true }}
        />
      </Suspense>

      {/* Comprehensive SEO Content for Government Exams */}
      <section className="bg-white border-t border-slate-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto prose prose-slate space-y-6 text-sm sm:text-base text-slate-600 leading-relaxed">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-sans tracking-tight">
              A Complete Guide to Government Jobs in India (2026)
            </h2>
            <p>
              Securing a government position (Sarkari Naukri) in India offers unmatched job security, statutory pensions, official quarters, and the prestige of serving the nation. In 2026, government recruitment authorities have digitized their operations through streamlined One-Time Registration (OTR) portals.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose my-6">
              <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-2">
                <h3 className="font-bold text-amber-950 text-sm font-sans">
                  Central Government Recruitments
                </h3>
                <p className="text-xs text-amber-900 leading-relaxed">
                  Conducted by the Union Public Service Commission (UPSC) and Staff Selection Commission (SSC) for Group A, B, and C ministries including Defense, External Affairs, Income Tax, and Customs.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-sky-50/60 border border-sky-200/80 space-y-2">
                <h3 className="font-bold text-sky-950 text-sm font-sans">
                  Public Sector Banking Exams
                </h3>
                <p className="text-xs text-sky-900 leading-relaxed">
                  State Bank of India (SBI) and IBPS recruit thousands of Probationary Officers (PO), Clerks, and Specialist Officers annually with rapid 4-month selection cycles.
                </p>
              </div>
            </div>

            <h3 className="text-xl font-bold text-slate-900 font-sans">
              Key Documents Required for Sarkari Applications
            </h3>
            <ul className="list-disc list-inside space-y-1.5">
              <li>Verified Aadhaar card or government-issued photo identity proof.</li>
              <li>Academic certificates (10th, 12th, Bachelor&apos;s degree mark sheets).</li>
              <li>Valid Category Certificate (OBC-NCL, SC, ST, EWS, or PwBD) issued within current financial year.</li>
              <li>High-resolution scanned passport photograph adhering to live-capture portal guidelines.</li>
            </ul>

            <div className="pt-4">
              <AdBanner slotId="government-jobs-bottom-banner" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
