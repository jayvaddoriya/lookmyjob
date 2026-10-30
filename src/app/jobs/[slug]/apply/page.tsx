import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import ApplyFormClient from "@/components/jobs/ApplyFormClient";
import AdBanner from "@/components/ads/AdBanner";
import { getAllJobs, getJobBySlug } from "@/lib/data";
import { SITE_URL } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const jobs = getAllJobs();
  return jobs.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = getJobBySlug(slug);

  if (!job) {
    return {
      title: "Application Not Found | LookMyJob",
    };
  }

  const title = `Apply: ${job.title} at ${job.company} | LookMyJob Application Gateway`;
  const description = `Submit your candidate application directly for ${job.title} at ${job.company}. Direct on-platform recruitment on LookMyJob.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/jobs/${job.slug}/apply`,
    },
    robots: {
      index: false, // Application forms should not be indexed in search results to protect candidate privacy
      follow: true,
    },
  };
}

export default async function JobApplyPage({ params }: PageProps) {
  const { slug } = await params;
  const job = getJobBySlug(slug);

  if (!job) {
    notFound();
  }

  const breadcrumbItems = [
    { name: "Jobs", url: "/jobs" },
    { name: job.category, url: `/categories/${job.categorySlug}` },
    { name: job.title, url: `/jobs/${job.slug}` },
    { name: "Apply", url: `/jobs/${job.slug}/apply` },
  ];

  return (
    <div className="w-full bg-slate-50 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbItems} className="mb-6 max-w-3xl mx-auto" />

        <ApplyFormClient job={job} />

        <div className="mt-12 max-w-3xl mx-auto">
          <AdBanner slotId="job-apply-bottom-banner" />
        </div>
      </div>
    </div>
  );
}
