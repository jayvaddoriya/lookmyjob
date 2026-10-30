import React, { Suspense } from "react";
import type { Metadata } from "next";
import JobListingClient from "@/components/jobs/JobListingClient";
import { getAllJobs } from "@/lib/data";
import { JobListSkeleton } from "@/components/common/LoadingSkeleton";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "All Job Openings 2026 | Verified Tech & Corporate Careers",
  description:
    "Explore 60+ verified private sector job vacancies across India. Filter by category, location, salary, experience, and remote work on LookMyJob with our guaranteed 15-day application window.",
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
        pageTitle="Active Private Job Vacancies (2026)"
        pageSubtitle="Discover verified private tech engineering positions, high-paying corporate careers, FinTech innovations, and flexible work-from-home roles."
      />
    </Suspense>
  );
}
