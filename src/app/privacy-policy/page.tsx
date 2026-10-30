import React from "react";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import AdBanner from "@/components/ads/AdBanner";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy Policy | LookMyJob",
  description:
    "LookMyJob Privacy Policy: Information collection practices, cookie policies, third-party advertising partner disclosures (including Google AdSense), and user data protection.",
  alternates: {
    canonical: `${SITE_URL}/privacy-policy`,
  },
};

export default function PrivacyPolicyPage() {
  const breadcrumbItems = [{ name: "Privacy Policy", url: "/privacy-policy" }];

  return (
    <div className="w-full bg-slate-50 py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbItems} className="mb-6" />

        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-slate-200/90 shadow-sm space-y-6 text-sm sm:text-base text-slate-700 leading-relaxed">
          <div className="border-b border-slate-100 pb-6 mb-6">
            <span className="text-xs font-bold text-sky-600 uppercase tracking-wider block mb-1">
              Legal & Privacy
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-sans tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-xs text-slate-400 mt-2">
              Last updated: October 2026 • Effective domain: https://lookmyjob.online
            </p>
          </div>

          <p>
            At <strong>LookMyJob</strong> (accessible from <a href="https://lookmyjob.online" className="text-sky-600 underline">https://lookmyjob.online</a>), one of our main priorities is the privacy of our visitors. This Privacy Policy document outlines the types of information that is collected and recorded by LookMyJob and how we use it.
          </p>

          <h2 className="text-xl font-bold text-slate-900 font-sans pt-2">
            1. Information We Collect
          </h2>
          <p>
            When you visit LookMyJob, you can browse jobs and read articles completely anonymously without creating an account or providing personal identification. If you contact us directly or subscribe to our free newsletter alerts, we may collect:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>Your email address (for delivering job alerts).</li>
            <li>Your name and message content (if you send an inquiry via our contact form).</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 font-sans pt-2">
            2. Google AdSense & Third-Party Advertising Disclosures
          </h2>
          <p>
            Google is a third-party vendor on our site. It uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to lookmyjob.online and other sites on the internet.
          </p>
          <p>
            Visitors may choose to decline the use of DART cookies by visiting the Google Ad and Content Network Privacy Policy at the following URL:{' '}
            <a
              href="https://policies.google.com/technologies/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-600 underline"
            >
              https://policies.google.com/technologies/ads
            </a>.
          </p>
          <p>
            Third-party ad servers or ad networks use technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on LookMyJob. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see.
          </p>
          <p>
            Note that LookMyJob has no access to or control over these cookies that are used by third-party advertisers.
          </p>

          <h2 className="text-xl font-bold text-slate-900 font-sans pt-2">
            3. Log Files
          </h2>
          <p>
            LookMyJob follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.
          </p>

          <h2 className="text-xl font-bold text-slate-900 font-sans pt-2">
            4. External Website Links & Employer Services
          </h2>
          <p>
            When submitting an application for a corporate vacancy, candidate contact details and uploaded resume documents are transmitted directly to the verified employer hiring team. In certain instances, listings may contain links to external company resource websites. We advise candidates to review the privacy policies of any third-party services.
          </p>

          <h2 className="text-xl font-bold text-slate-900 font-sans pt-2">
            5. Contact Us
          </h2>
          <p>
            If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact our data protection desk at{' '}
            <a href="mailto:privacy@lookmyjob.online" className="text-sky-600 font-semibold underline">
              privacy@lookmyjob.online
            </a>.
          </p>
        </div>

        <div className="mt-8">
          <AdBanner slotId="privacy-bottom-banner" />
        </div>
      </div>
    </div>
  );
}
