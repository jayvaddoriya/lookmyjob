import React, { Suspense } from "react";
import type { Metadata } from "next";
import JobListingClient from "@/components/jobs/JobListingClient";
import { getAllJobs } from "@/lib/data";
import { JobListSkeleton } from "@/components/common/LoadingSkeleton";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "All Job Openings 2026 | Verified Govt & Tech Vacancies",
  description:
    "Explore 12,000+ verified job listings across India. Filter by category, location, salary, experience, government exams, and remote work on LookMyJob.",
  alternates: {
    canonical: `${SITE_URL}/jobs`,
  },
};

export default function JobsPage() {
  const jobs = getAllJobs();

  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <JobListSkeleton count={6} />
        </div>
      }
    >
      <JobListingClient
        initialJobs={jobs}
        pageTitle="All Job Vacancies in India (2026)"
        pageSubtitle="Discover verified central & state government recruitments, high-paying tech positions, banking careers, and work-from-home roles."
      />
    </Suspense>
  );
}
