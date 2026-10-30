import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { 
  ShieldCheck, 
  Target, 
  Heart, 
  Globe
} from "lucide-react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import AdBanner from "@/components/ads/AdBanner";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About Us | LookMyJob - India's Free Job Discovery Network",
  description:
    "Learn about LookMyJob's mission to make job discovery across India transparent, verified, and 100% free for all candidates. Discover our editorial guidelines and verification systems.",
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
};

export default function AboutPage() {
  const breadcrumbItems = [{ name: "About LookMyJob", url: "/about" }];

  return (
    <div className="w-full bg-slate-50 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbItems} className="mb-6" />

        {/* Hero Banner */}
        <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-12 lg:p-16 mb-12 border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="max-w-3xl space-y-4 relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-sky-400 bg-sky-950 border border-sky-800">
              <Target className="w-3.5 h-3.5" />
              Our Purpose
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-sans leading-tight">
              Empowering Every Indian Job Seeker to Build a Fulfilling Career
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              LookMyJob is an independent, technology-driven job discovery platform. We curate verified government recruitments, top tech opportunities, and remote roles without charging candidates a single rupee.
            </p>
          </div>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 font-sans">
              1. Authentic Verification
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              We monitor official state and central gazettes, official commission bulletins (UPSC, SSC, RRB), and direct corporate employer announcements to eliminate fraudulent listings.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
              <Heart className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 font-sans">
              2. Free For Candidates Always
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              We will never charge job seekers for discovering vacancies, setting alert preferences, or accessing official recruitment forms. Employment information belongs to everyone.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Globe className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 font-sans">
              3. Pan-India Discoverability
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Whether you are looking for tech jobs in Ahmedabad and GIFT City, civil services vacancies in New Delhi, or remote engineering from your hometown, LookMyJob indexes all opportunities.
            </p>
          </div>
        </div>

        {/* Editorial Standards & Monetization Transparency */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sm mb-12 space-y-6">
          <h2 className="text-2xl font-black text-slate-900 font-sans tracking-tight">
            How LookMyJob Operates Transparently
          </h2>
          <div className="prose prose-slate text-sm sm:text-base text-slate-600 space-y-4 leading-relaxed">
            <p>
              To maintain our independence, digital infrastructure, and full-time editorial research team, LookMyJob displays ethical, privacy-respecting banner advertisements through partners such as Google AdSense and clearly designated employer sponsorships.
            </p>
            <p>
              Our advertising placements are carefully separated from editorial and application content, ensuring candidate safety and zero layout disruption.
            </p>
          </div>

          <div className="pt-4 flex flex-wrap gap-4">
            <Link
              href="/jobs"
              className="px-6 py-3 rounded-xl bg-slate-900 text-white font-bold text-xs uppercase tracking-wider hover:bg-slate-800 transition-colors"
            >
              Start Searching Jobs
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl bg-slate-100 text-slate-800 font-bold text-xs uppercase tracking-wider hover:bg-slate-200 transition-colors"
            >
              Contact Editorial Desk
            </Link>
          </div>
        </div>

        {/* Ad Placement */}
        <AdBanner slotId="about-bottom-banner" />
      </div>
    </div>
  );
}
