import React, { Suspense } from "react";
import type { Metadata } from "next";
import { Laptop, ShieldCheck, CheckCircle2 } from "lucide-react";
import JobListingClient from "@/components/jobs/JobListingClient";
import AdBanner from "@/components/ads/AdBanner";
import { getRemoteJobs } from "@/lib/data";
import { JobListSkeleton } from "@/components/common/LoadingSkeleton";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Work From Home Jobs 2026 | Remote & Freelance Openings India",
  description:
    "Find verified work-from-home (WFH) and remote jobs in India. Full-time remote software engineering, customer support, content writing, and data analysis jobs on LookMyJob.",
  alternates: {
    canonical: `${SITE_URL}/work-from-home`,
  },
};

export default function WorkFromHomePage() {
  const remoteJobs = getRemoteJobs();

  return (
    <div className="w-full">
      {/* Remote Work Perks Header Banner */}
      <div className="bg-teal-900 text-teal-100 py-4 border-b border-teal-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-medium">
            <div className="flex items-center gap-2">
              <Laptop className="w-4 h-4 text-teal-300" />
              <span className="font-bold text-white">
                100% Verified Remote Work Hub:
              </span>
              <span>Zero commute, pan-India hiring, home office stipends.</span>
            </div>
            <div className="flex items-center gap-4 text-teal-200">
              <span>✓ Verified authentic employers</span>
              <span>✓ Never pay for equipment</span>
            </div>
          </div>
        </div>
      </div>

      <Suspense
        fallback={
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <JobListSkeleton count={6} />
          </div>
        }
      >
        <JobListingClient
          initialJobs={remoteJobs}
          pageTitle="Work From Home & Remote Jobs (2026)"
          pageSubtitle="Work from anywhere in India with verified remote technology leaders, digital agencies, and global product teams."
          presetFilter={{ isRemote: true }}
        />
      </Suspense>

      {/* Remote Work Guidance & Scam Prevention Section */}
      <section className="bg-white border-t border-slate-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-6 text-sm text-slate-600 leading-relaxed">
            <h2 className="text-2xl font-bold text-slate-900 font-sans tracking-tight">
              Mastering Remote Employment in India
            </h2>
            <p>
              Remote work has established itself as a premier work model for knowledge workers across software engineering, digital marketing, visual design, and customer success. On LookMyJob, we screen every remote listing to protect candidates from task scams and non-paying clients.
            </p>

            <div className="p-6 rounded-3xl bg-teal-50 border border-teal-100 space-y-3">
              <h3 className="text-base font-bold text-teal-950 font-sans flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-teal-600" />
                <span>Golden Rules for Work-From-Home Job Seekers</span>
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-teal-900">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span>Never pay registration fees, document processing charges, or laptop security deposits.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span>Insist on an official company appointment letter or signed contractor agreement before commencing tasks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span>Communicate via verified corporate email domains rather than generic personal accounts.</span>
                </li>
              </ul>
            </div>

            <div className="pt-4">
              <AdBanner slotId="wfh-bottom-banner" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
