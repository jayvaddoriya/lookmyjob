import React from "react";
import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import AdBanner from "@/components/ads/AdBanner";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Disclaimer & Anti-Fraud Notice | LookMyJob",
  description:
    "Important disclaimer and fraud alert: LookMyJob is an independent job information aggregator. We do not charge fees, conduct recruitment, or issue job offers.",
  alternates: {
    canonical: `${SITE_URL}/disclaimer`,
  },
};

export default function DisclaimerPage() {
  const breadcrumbItems = [{ name: "Recruitment Disclaimer", url: "/disclaimer" }];

  return (
    <div className="w-full bg-slate-50 py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbItems} className="mb-6" />

        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-slate-200/90 shadow-sm space-y-6 text-sm sm:text-base text-slate-700 leading-relaxed">
          <div className="border-b border-slate-100 pb-6 mb-6">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block mb-1">
              Public Notice & Safety
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-sans tracking-tight">
              Recruitment Disclaimer & Fraud Alert
            </h1>
            <p className="text-xs text-slate-400 mt-2">
              Published by LookMyJob Editorial Compliance Board
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs sm:text-sm">
              <p className="font-bold">
                Crucial Notice for All Job Seekers & Candidates:
              </p>
              <p>
                LookMyJob (<a href="https://lookmyjob.online" className="underline font-semibold">https://lookmyjob.online</a>) is an independent private-sector career discovery and direct recruitment portal. We provide a streamlined application gateway for verified corporate employers.
              </p>
            </div>
          </div>

          <h2 className="text-xl font-bold text-slate-900 font-sans pt-2">
            1. Zero Fee Policy
          </h2>
          <p>
            LookMyJob does <strong>NOT</strong> charge any money from job seekers for viewing vacancies, applying to jobs, or receiving notifications. We will never ask for bank account details, UPI PINs, or processing fees. If you receive an email or message claiming to be from LookMyJob requesting payment, consider it fraudulent and do not transfer funds.
          </p>

          <h2 className="text-xl font-bold text-slate-900 font-sans pt-2">
            2. 15-Day Application Policy Advisory
          </h2>
          <p>
            All direct job listings on LookMyJob have an active application lifetime of 15 days from their posting date. Once 15 days elapse, the listing automatically enters the &apos;Applications Closed&apos; state to maintain data freshness and prevent candidates from applying to filled positions.
          </p>

          <h2 className="text-xl font-bold text-slate-900 font-sans pt-2">
            3. Demonstration & Sample Data Notice
          </h2>
          <p>
            During this preview release phase, certain job listings and employer profiles represent realistic sample demonstration data designed to showcase portal architecture. These listings are clearly marked with &ldquo;Sample Demonstration Listing&rdquo; disclosures.
          </p>

          <h2 className="text-xl font-bold text-slate-900 font-sans pt-2">
            4. Reporting Inaccuracies or Scams
          </h2>
          <p>
            If you identify an inaccurate notification or an external scam pretending to represent our network, notify our compliance desk immediately at{' '}
            <a href="mailto:support@lookmyjob.online" className="text-sky-600 font-semibold underline">
              support@lookmyjob.online
            </a>.
          </p>
        </div>

        <div className="mt-8">
          <AdBanner slotId="disclaimer-bottom-banner" />
        </div>
      </div>
    </div>
  );
}
