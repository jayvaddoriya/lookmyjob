import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { 
  TrendingUp, 
  Sparkles
} from "lucide-react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import AdBanner from "@/components/ads/AdBanner";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Advertise With Us | LookMyJob Employer Media Kit",
  description:
    "Reach thousands of active Indian graduates, developers, and professionals. Explore banner sponsorships, featured employer listings, and newsletter partnerships on LookMyJob.",
  alternates: {
    canonical: `${SITE_URL}/advertise-with-us`,
  },
};

export default function AdvertisePage() {
  const breadcrumbItems = [{ name: "Advertise With Us", url: "/advertise-with-us" }];

  const adOptions = [
    {
      title: "Featured Job Spotlight",
      desc: "Prominently display your opening at the top of the homepage and in category search results with verified badges.",
      bestFor: "Fast-growth tech teams and urgent bulk hiring drives.",
    },
    {
      title: "Standard IAB Display Banners",
      desc: "High-visibility 728×90 leaderboards, 300×250 medium rectangles, and responsive in-article placements.",
      bestFor: "EdTech platforms, test-prep institutes, and enterprise branding.",
    },
    {
      title: "Dedicated Newsletter Sponsorship",
      desc: "Reach subscribers actively looking for career opportunities in our curated weekly alert newsletter.",
      bestFor: "Certification courses, hackathons, and corporate campus drives.",
    },
    {
      title: "Custom Content & Employer Spotlights",
      desc: "In-depth editorial articles highlighting your company culture, engineering stack, and perks.",
      bestFor: "Employer branding and developer relations (DevRel) initiatives.",
    },
  ];

  return (
    <div className="w-full bg-slate-50 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbItems} className="mb-6" />

        {/* Hero Section */}
        <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-12 lg:p-16 mb-12 border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="max-w-3xl space-y-4 relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-sky-400 bg-sky-950 border border-sky-800">
              <TrendingUp className="w-3.5 h-3.5" />
              Employer & Brand Network
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-sans leading-tight">
              Connect With Thousands of Qualified Indian Candidates
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              LookMyJob is visited daily by active job seekers across Gujarat, Karnataka, Maharashtra, Delhi NCR, and pan-India. Partner with us to scale your talent acquisition and brand visibility.
            </p>
          </div>
        </div>

        {/* Audience Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 text-center">
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm">
            <div className="text-3xl font-black text-slate-900 font-sans">
              250K+
            </div>
            <div className="text-xs text-slate-500 font-medium mt-1">
              Monthly Organic Impressions
            </div>
          </div>
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm">
            <div className="text-3xl font-black text-sky-600 font-sans">
              68%
            </div>
            <div className="text-xs text-slate-500 font-medium mt-1">
              Freshers & Early Career Seekers
            </div>
          </div>
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm">
            <div className="text-3xl font-black text-teal-600 font-sans">
              100%
            </div>
            <div className="text-xs text-slate-500 font-medium mt-1">
              Indian Domestic Audience
            </div>
          </div>
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm">
            <div className="text-3xl font-black text-amber-500 font-sans">
              95+
            </div>
            <div className="text-xs text-slate-500 font-medium mt-1">
              Mobile Device Optimization
            </div>
          </div>
        </div>

        {/* Advertising Formats */}
        <div className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-sans mb-8">
            Available Advertising Placements
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {adOptions.map((opt, i) => (
              <div
                key={i}
                className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-3 hover:border-sky-300 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900 font-sans">
                    {opt.title}
                  </h3>
                  <Sparkles className="w-4 h-4 text-sky-500" />
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {opt.desc}
                </p>
                <div className="pt-2 text-xs text-slate-400 font-medium">
                  <span className="font-bold text-slate-700">Best for: </span>
                  {opt.bestFor}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inquire CTA */}
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-sky-950 text-white p-8 sm:p-12 border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold font-sans">
              Request Media Kit & Custom Rate Card
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg">
              Contact our advertising team to discuss tailored display, sponsored listing packages, or Google AdSense direct deals.
            </p>
          </div>

          <Link
            href="/contact?subject=advertising"
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-sky-400 to-teal-400 text-slate-950 font-bold text-sm tracking-wide shadow-md active:scale-95 transition-all shrink-0"
          >
            Inquire for Advertising
          </Link>
        </div>

        <div className="mt-12">
          <AdBanner slotId="advertise-bottom-banner" />
        </div>
      </div>
    </div>
  );
}
