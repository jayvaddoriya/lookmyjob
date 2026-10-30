import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { 
  MapPin, 
  IndianRupee, 
  Briefcase,
  Calendar, 
  Clock, 
  CheckCircle, 
  GraduationCap,
  Users,
  FileText,
  ArrowRight,
  ShieldCheck,
  AlertCircle
} from "lucide-react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import JobCard from "@/components/jobs/JobCard";
import BookmarkButton from "@/components/jobs/BookmarkButton";
import JobShareButtons from "@/components/jobs/JobShareButtons";
import AdBanner from "@/components/ads/AdBanner";
import AdInArticle from "@/components/ads/AdInArticle";
import AdSidebar from "@/components/ads/AdSidebar";
import { getAllJobs, getJobBySlug, getRelatedJobs } from "@/lib/data";
import { buildJobPostingSchema, buildBreadcrumbSchema, SITE_URL } from "@/lib/seo";

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
      title: "Job Not Found | LookMyJob",
    };
  }

  const title = `${job.title} at ${job.company} - Recruitment 2026`;
  const description = `${job.title} vacancy at ${job.company}. Location: ${job.location}. Salary: ${job.salary}. Eligibility: ${job.qualification}. Apply directly on LookMyJob within the 15-day application window.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/jobs/${job.slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: `${SITE_URL}/jobs/${job.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function JobDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const job = getJobBySlug(slug);

  if (!job) {
    notFound();
  }

  const relatedJobs = getRelatedJobs(job.id, job.category, 3);
  const jobSchema = buildJobPostingSchema(job);
  const breadcrumbItems = [
    { name: "Jobs", url: "/jobs" },
    { name: job.category, url: `/categories/${job.categorySlug}` },
    { name: job.title, url: `/jobs/${job.slug}` },
  ];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

  const formattedPostedDate = new Date(job.postedDate).toLocaleDateString("en-IN", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const formattedDeadline = new Date(job.applicationDeadline).toLocaleDateString("en-IN", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="w-full bg-slate-50 py-6 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <Breadcrumbs items={breadcrumbItems} className="mb-6" />

          {/* 15-Day Application Window Status Banner */}
          {job.isExpired ? (
            <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 flex items-start gap-3 shadow-sm">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <h2 className="text-sm font-bold">Applications Closed for this Position</h2>
                <p className="text-xs text-rose-700 mt-0.5">
                  This vacancy was published 15+ days ago (deadline was {formattedDeadline}). To keep our hiring pipelines fresh, applications close strictly after 15 days. Please browse active positions below.
                </p>
              </div>
            </div>
          ) : (
            <div className="mb-6 p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900 flex items-start justify-between gap-3 shadow-sm">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-sm font-bold">Active Application Window: {job.daysRemaining} days remaining</h2>
                  <p className="text-xs text-blue-700 mt-0.5">
                    Posted {job.postedRelative || formattedPostedDate}. Closes on {formattedDeadline}. Applications are submitted directly on LookMyJob.
                  </p>
                </div>
              </div>
              <Link
                href={`/jobs/${job.slug}/apply`}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shrink-0 transition-colors shadow-sm"
              >
                <span>Apply Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}

          {/* Top Job Overview Card */}
          <div className="rounded-3xl bg-white border border-slate-200/90 shadow-sm p-6 sm:p-8 lg:p-10 mb-8 relative overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
              <div className="flex items-start gap-4 sm:gap-6">
                {/* Company Logo Monogram */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-900 text-sky-400 font-black text-xl sm:text-2xl flex items-center justify-center shrink-0 border border-slate-800 shadow-md">
                  {job.logo || job.company.substring(0, 2).toUpperCase()}
                </div>

                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm sm:text-base font-bold text-slate-700">
                      {job.company}
                    </span>
                    {job.isVerified && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold text-teal-700 bg-teal-50 border border-teal-200">
                        <CheckCircle className="w-3.5 h-3.5 text-teal-600" />
                        Verified Employer
                      </span>
                    )}
                  </div>

                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight font-sans">
                    {job.title}
                  </h1>

                  <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-500 pt-1">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <span>{job.location}</span>
                    </span>
                    {job.isRemote && (
                      <span className="px-2 py-0.5 rounded font-bold uppercase text-[10px] bg-teal-50 text-teal-700 border border-teal-200">
                        100% Remote / WFH
                      </span>
                    )}
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <span>Posted on {formattedPostedDate}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Apply, Save, Share */}
              <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-3 shrink-0">
                {job.isExpired ? (
                  <button
                    disabled
                    className="px-8 py-3.5 rounded-xl sm:rounded-2xl bg-slate-200 text-slate-500 font-bold text-sm cursor-not-allowed"
                  >
                    Applications Closed
                  </button>
                ) : (
                  <Link
                    href={`/jobs/${job.slug}/apply`}
                    className="px-8 py-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm tracking-wide shadow-md shadow-blue-500/25 active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Apply on LookMyJob</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}

                <div className="flex items-center justify-center gap-2">
                  <BookmarkButton jobId={job.id} jobTitle={job.title} />
                  <JobShareButtons title={job.title} />
                </div>
              </div>
            </div>

            {/* Key Highlights Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                  <IndianRupee className="w-4 h-4 text-blue-600" />
                  <span>Compensation / Pay</span>
                </div>
                <div className="text-sm sm:text-base font-bold text-slate-900 truncate" title={job.salary}>
                  {job.salary}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                  <Briefcase className="w-4 h-4 text-slate-400" />
                  <span>Experience Level</span>
                </div>
                <div className="text-sm sm:text-base font-bold text-slate-900">
                  {job.experience}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                  <Users className="w-4 h-4 text-slate-400" />
                  <span>Total Vacancies</span>
                </div>
                <div className="text-sm sm:text-base font-bold text-slate-900">
                  {job.vacancies} {job.vacancies === 1 ? "Opening" : "Openings"}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                  <Clock className={`w-4 h-4 ${job.isExpired ? "text-rose-500" : "text-amber-500"}`} />
                  <span>Application Deadline</span>
                </div>
                <div className={`text-sm sm:text-base font-bold ${job.isExpired ? "text-rose-600" : "text-slate-900"}`}>
                  {formattedDeadline}
                </div>
              </div>
            </div>
          </div>

          {/* ======================================================= */}
          {/* AD PLACEMENT: BELOW JOB OVERVIEW CARD                  */}
          {/* ======================================================= */}
          <div className="my-6">
            <AdBanner slotId="job-details-below-overview-leaderboard" />
          </div>

          {/* Main Two-Column Layout: Details + Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left 2 Columns: Full Job Description & Requirements */}
            <div className="lg:col-span-2 space-y-8">
              {/* Job Description Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-sans flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <span>Role Overview & Description</span>
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {job.description}
                </p>

                {/* Educational Qualification */}
                <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-start gap-3 mt-4">
                  <GraduationCap className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs font-bold text-blue-950 uppercase tracking-wider mb-0.5">
                      Prescribed Educational Qualification
                    </h3>
                    <p className="text-xs sm:text-sm text-blue-900 font-medium">
                      {job.qualification}
                    </p>
                  </div>
                </div>
              </div>

              {/* Responsibilities */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-sans">
                  Key Responsibilities
                </h2>
                <ul className="space-y-2.5 text-sm sm:text-base text-slate-600 list-disc list-inside">
                  {job.responsibilities.map((resp, i) => (
                    <li key={i} className="leading-relaxed">
                      <span className="font-normal text-slate-700">{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements & Eligibility */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-sans">
                  Eligibility Criteria & Candidate Requirements
                </h2>
                <ul className="space-y-2.5 text-sm sm:text-base text-slate-600 list-disc list-inside">
                  {job.requirements.map((req, i) => (
                    <li key={i} className="leading-relaxed">
                      <span className="font-normal text-slate-700">{req}</span>
                    </li>
                  ))}
                </ul>

                {job.eligibility && job.eligibility.length > 0 && (
                  <div className="pt-3">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Selection Standards & Prerequisites
                    </h3>
                    <div className="space-y-1.5 text-xs sm:text-sm text-slate-600">
                      {job.eligibility.map((el, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                          <span>{el}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Required Skills & Domain Tags */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-sans">
                  Required Competencies & Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200/80"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* ======================================================= */}
              {/* AD PLACEMENT: IN-ARTICLE NATURAL BOUNDARY               */}
              {/* ======================================================= */}
              <AdInArticle slotId="job-details-in-article-banner" />

              {/* Benefits & Perks */}
              {job.benefits && job.benefits.length > 0 && (
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-sans">
                    Benefits, Allowances & Perks
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {job.benefits.map((b, i) => (
                      <div
                        key={i}
                        className="p-3.5 rounded-2xl bg-teal-50/40 border border-teal-100 text-xs sm:text-sm text-teal-950 flex items-start gap-2.5 font-medium"
                      >
                        <CheckCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* How to Apply Section */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-sans">
                  How to Submit Your Application
                </h2>
                <ol className="space-y-3 text-sm text-slate-600 list-decimal list-inside">
                  {job.howToApply.map((step, i) => (
                    <li key={i} className="leading-relaxed">
                      <span className="font-normal text-slate-700">{step}</span>
                    </li>
                  ))}
                </ol>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900 text-white">
                  <div>
                    <h3 className="text-sm font-bold">Apply directly on LookMyJob</h3>
                    <p className="text-xs text-slate-300">
                      Submit your resume and candidate details securely without third-party redirects.
                    </p>
                  </div>
                  {job.isExpired ? (
                    <span className="px-6 py-3 rounded-xl bg-slate-800 text-slate-400 font-bold text-xs uppercase tracking-wider">
                      Applications Closed
                    </span>
                  ) : (
                    <Link
                      href={`/jobs/${job.slug}/apply`}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-teal-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-transform"
                    >
                      <span>Apply on LookMyJob</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>

                {/* 15-day application guarantee notice */}
                <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">LookMyJob 15-Day Freshness Guarantee: </span>
                    <span>
                      All postings remain active for direct applications for maximum 15 days from posting date. Applications submitted on LookMyJob are securely forwarded to the employer&apos;s recruitment team.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Company Overview & Sticky Sidebar Ad */}
            <div className="space-y-8">
              {/* Company Profile Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 text-sky-400 font-black text-sm flex items-center justify-center border border-slate-800">
                    {job.logo}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{job.company}</h3>
                    <p className="text-xs text-slate-500">{job.city}, {job.state}</p>
                  </div>
                </div>
                <div className="pt-2">
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Direct verified employer listing on LookMyJob. All candidate submissions are processed directly through our secure application pipeline.
                  </p>
                </div>
              </div>

              {/* Sidebar Ad Placement */}
              <div className="sticky top-20">
                <AdSidebar slotId="job-details-sticky-sidebar" />
              </div>
            </div>
          </div>

          {/* Related Jobs Section */}
          {relatedJobs.length > 0 && (
            <div className="mt-16 pt-12 border-t border-slate-200">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-sans mb-6">
                Related {job.category} Openings
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedJobs.map((rJob) => (
                  <JobCard key={rJob.id} job={rJob} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
