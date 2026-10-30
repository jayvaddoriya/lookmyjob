import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, Clock, MessageSquare, HelpCircle } from "lucide-react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import ContactForm from "@/components/common/ContactForm";
import AdBanner from "@/components/ads/AdBanner";
import siteConfigData from "@/data/site-config.json";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact Us & Support | LookMyJob",
  description:
    "Get in touch with the LookMyJob support and editorial team. Inquire about job postings, report recruitment inaccuracies, or explore employer advertising partnerships.",
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
};

export default function ContactPage() {
  const breadcrumbItems = [{ name: "Contact Support", url: "/contact" }];

  return (
    <div className="w-full bg-slate-50 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbItems} className="mb-6" />

        <div className="max-w-3xl mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-100/70 border border-sky-200 mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            Get In Touch
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-sans">
            We&apos;re Here to Help
          </h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Have questions about a recruitment notice, want to report an expired job link, or wish to advertise with us? Send us a message below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Left Column: Contact Information Cards */}
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Support Email
                </h3>
                <a
                  href={`mailto:${siteConfigData.email}`}
                  className="text-sm font-semibold text-sky-600 hover:underline"
                >
                  {siteConfigData.email}
                </a>
                <p className="text-xs text-slate-400 mt-1">
                  Average response time: within 24 business hours.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Operational Headquarters
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 font-medium">
                  {siteConfigData.addressPlaceholder}
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  (Regional digital hubs in Ahmedabad & Bengaluru)
                </p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Helpdesk Hours
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 font-medium">
                  Monday to Saturday: 9:30 AM – 6:30 PM IST
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Sunday: Closed (automated alerts running 24/7)
                </p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900 text-white space-y-3">
              <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-wider">
                <HelpCircle className="w-4 h-4" />
                <span>Quick Answers</span>
              </div>
              <h4 className="text-sm font-bold font-sans">Looking for common answers?</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Check our Frequently Asked Questions section for immediate information regarding application deadlines, exam patterns, and verification.
              </p>
              <Link
                href="/#faq"
                className="text-xs font-bold text-sky-400 hover:underline block pt-1"
              >
                View Job Seeker FAQs →
              </Link>
            </div>
          </div>

          {/* Right 2 Columns: Contact Form */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>

        <AdBanner slotId="contact-page-bottom-banner" />
      </div>
    </div>
  );
}
