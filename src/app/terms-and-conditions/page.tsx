import React from "react";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import AdBanner from "@/components/ads/AdBanner";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Terms and Conditions | LookMyJob",
  description:
    "Terms and Conditions of use for LookMyJob.online: Platform usage guidelines, disclaimer of employment guarantee, and intellectual property terms.",
  alternates: {
    canonical: `${SITE_URL}/terms-and-conditions`,
  },
};

export default function TermsPage() {
  const breadcrumbItems = [{ name: "Terms & Conditions", url: "/terms-and-conditions" }];

  return (
    <div className="w-full bg-slate-50 py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbItems} className="mb-6" />

        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-slate-200/90 shadow-sm space-y-6 text-sm sm:text-base text-slate-700 leading-relaxed">
          <div className="border-b border-slate-100 pb-6 mb-6">
            <span className="text-xs font-bold text-sky-600 uppercase tracking-wider block mb-1">
              Legal Agreement
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-sans tracking-tight">
              Terms & Conditions
            </h1>
            <p className="text-xs text-slate-400 mt-2">
              Effective Date: October 2026 • Platform: LookMyJob.online
            </p>
          </div>

          <p>
            Welcome to <strong>LookMyJob.online</strong>. By accessing or using this website, you agree to comply with and be bound by the following terms and conditions of use.
          </p>

          <h2 className="text-xl font-bold text-slate-900 font-sans pt-2">
            1. Nature of the Service
          </h2>
          <p>
            LookMyJob is an informational aggregator and job discovery platform. We are not a recruitment agency, placement agency, employer, or government department. We do not participate in employment interviews, recruitment decisions, or hiring contracts.
          </p>

          <h2 className="text-xl font-bold text-slate-900 font-sans pt-2">
            2. No Guarantee of Employment or Recruitment
          </h2>
          <p>
            While we strive to ensure that all job notifications and exam dates published on this platform are accurate and verified from official gazettes and company releases, LookMyJob makes no warranties or guarantees regarding:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>The successful selection or hiring of any candidate.</li>
            <li>The timeliness or accuracy of external recruitment calendars or examination schedules.</li>
            <li>The availability or operational status of third-party employer websites.</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 font-sans pt-2">
            3. Free Service for Job Seekers
          </h2>
          <p>
            LookMyJob is 100% free for all candidates. We do not solicit, accept, or process payments from job seekers for browsing job notices, downloading syllabus files, or accessing application links.
          </p>

          <h2 className="text-xl font-bold text-slate-900 font-sans pt-2">
            4. User Conduct
          </h2>
          <p>
            You agree not to use automated web scraping spiders or bots to overload or scrape LookMyJob data in violation of our robots.txt directives, or to use our contact mechanisms for unsolicited promotional communications.
          </p>

          <h2 className="text-xl font-bold text-slate-900 font-sans pt-2">
            5. Modifications to Terms
          </h2>
          <p>
            LookMyJob reserves the right to revise these terms of service at any time without prior notice. By using this website, you agree to be bound by the then-current version of these terms.
          </p>
        </div>

        <div className="mt-8">
          <AdBanner slotId="terms-bottom-banner" />
        </div>
      </div>
    </div>
  );
}
