import React, { Suspense } from "react";
import type { Metadata } from "next";
import JobListingClient from "@/components/jobs/JobListingClient";
import AdBanner from "@/components/ads/AdBanner";
import { getPrivateJobs } from "@/lib/data";
import { JobListSkeleton } from "@/components/common/LoadingSkeleton";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Private Company Jobs 2026 | IT, Corporate & Fresher Openings",
  description:
    "Explore private company vacancies across India. Discover IT software engineering, banking, marketing, healthcare, and engineering careers at leading MNCs on LookMyJob.",
  alternates: {
    canonical: `${SITE_URL}/private-jobs`,
  },
};

export default function PrivateJobsPage() {
  const privateJobs = getPrivateJobs();

  return (
    <div className="w-full">
      <Suspense
        fallback={
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <JobListSkeleton count={6} />
          </div>
        }
      >
        <JobListingClient
          initialJobs={privateJobs}
          pageTitle="Private Company Job Vacancies (2026)"
          pageSubtitle="Browse verified openings across software engineering, cloud systems, multinational corporations, and high-growth Indian startups."
        />
      </Suspense>

      {/* Corporate SEO Content Strip */}
      <section className="bg-white border-t border-slate-200/80 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-4 text-sm text-slate-600 leading-relaxed">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-sans">
              Career Growth in India&apos;s Private Corporate Ecosystem
            </h2>
            <p>
              India&apos;s private sector provides accelerated promotions, competitive performance incentives, and opportunities to architect technologies used by millions of global consumers. On LookMyJob, candidates connect directly with verified employer career portals without intermediary placement charges.
            </p>
            <div className="pt-4">
              <AdBanner slotId="private-jobs-bottom-banner" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
