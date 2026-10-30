import React from "react";
import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import LocationCard from "@/components/locations/LocationCard";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import AdBanner from "@/components/ads/AdBanner";
import { getAllLocations } from "@/lib/data";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Jobs by City & Location 2026 | Ahmedabad, Surat, Mumbai, Bangalore",
  description:
    "Discover jobs across major Indian cities: Ahmedabad, Surat, Mumbai, Delhi NCR, Bangalore, Pune, Hyderabad, Chennai, Kolkata, Jaipur, and remote roles on LookMyJob.",
  alternates: {
    canonical: `${SITE_URL}/locations`,
  },
};

export default function LocationsPage() {
  const locations = getAllLocations();
  const breadcrumbItems = [{ name: "Job Locations", url: "/locations" }];

  return (
    <div className="w-full bg-slate-50 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbItems} className="mb-6" />

        <div className="max-w-3xl mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-100/70 border border-teal-200 mb-3">
            <MapPin className="w-3.5 h-3.5" />
            Regional Hubs
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-sans">
            Explore Jobs by Location & City
          </h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Discover active vacancies across Western India commercial clusters, Silicon Valley tech parks, national capital ministries, and work-from-home channels.
          </p>
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((loc) => (
            <LocationCard key={loc.slug} location={loc} />
          ))}
        </div>

        <div className="mt-14">
          <AdBanner slotId="locations-index-bottom-ad" />
        </div>
      </div>
    </div>
  );
}
