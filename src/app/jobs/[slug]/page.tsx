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
  ShieldCheck,
  ExternalLink,
  GraduationCap,
  Users,
  FileText,
  AlertTriangle,
  ArrowRight
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
  const description = `${job.title} vacancy at ${job.company}. Location: ${job.location}. Salary: ${job.salary}. Eligibility: ${job.qualification}. Check official notice and apply now on LookMyJob.`;

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
                        Verified Listing
                      </span>
                    )}
                    {job.isGovtJob && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200">
                        Government Sector {job.govtCategory ? `(${job.govtCategory})` : ""}
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
                <a
                  href={job.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-600 hover:to-teal-600 text-white font-bold text-sm tracking-wide shadow-md shadow-sky-500/25 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <span>Official Application</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

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
                  <IndianRupee className="w-4 h-4 text-sky-600" />
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
                  <Clock className="w-4 h-4 text-rose-500" />
                  <span>Application Deadline</span>
                </div>
                <div className="text-sm sm:text-base font-bold text-rose-600">
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
                  <FileText className="w-5 h-5 text-sky-600" />
                  <span>Role Overview & Description</span>
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {job.description}
                </p>

                {/* Educational Qualification */}
                <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-100 flex items-start gap-3 mt-4">
                  <GraduationCap className="w-5 h-5 text-sky-700 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs font-bold text-sky-950 uppercase tracking-wider mb-0.5">
                      Prescribed Educational Qualification
                    </h3>
                    <p className="text-xs sm:text-sm text-sky-900 font-medium">
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
                      Age & Selection Stages
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
                    <h3 className="text-sm font-bold">Ready to apply for this vacancy?</h3>
                    <p className="text-xs text-slate-300">
                      Redirects to the official employer recruitment portal.
                    </p>
                  </div>
                  <a
                    href={job.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-sky-400 to-teal-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-transform"
                  >
                    <span>Proceed to Official Link</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Sample Data Disclaimer Notice */}
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Demonstration Sample Listing: </span>
                    <span>
                      {job.sourceVerified}. LookMyJob connects job seekers with authentic recruitment sources. Verify all dates and fees before paying any examination authority.
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
                    <h3 className="text-base font-bold text-slate-900 font-sans">
                      {job.company}
                    </h3>
                    <p className="text-xs text-slate-400">{job.location}</p>
                  </div>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed">
                  Leading employer verified on LookMyJob. Explore additional active job listings and career opportunities at this organization.
                </p>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <Link
                    href={`/jobs?keyword=${encodeURIComponent(job.company.split(" ")[0])}`}
                    className="font-bold text-sky-600 hover:text-sky-700"
                  >
                    More from {job.company.split(" ")[0]}
                  </Link>
                </div>
              </div>

              {/* Sidebar Ad Placement */}
              <AdSidebar slotId="job-details-sidebar-ad" format="rectangle" />

              {/* Safety & Anti-Fraud Notice */}
              <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-teal-400 font-bold text-xs uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Job Seeker Safety</span>
                </div>
                <h4 className="text-sm font-bold font-sans">Never Pay for Job Offers</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  LookMyJob and genuine recruiters never ask for money or gift cards. If any recruiter demands registration or equipment fees, report it immediately.
                </p>
                <Link
                  href="/disclaimer"
                  className="text-xs text-sky-400 hover:underline block pt-1"
                >
                  Read Recruitment Disclaimer →
                </Link>
              </div>
            </div>
          </div>

          {/* ======================================================= */}
          {/* SECTION: RELATED JOBS                                   */}
          {/* ======================================================= */}
          {relatedJobs.length > 0 && (
            <div className="mt-16 pt-12 border-t border-slate-200">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
                    Recommended Roles
                  </span>
                  <h2 className="text-2xl font-black text-slate-900 font-sans">
                    Similar Job Vacancies in {job.category}
                  </h2>
                </div>
                <Link
                  href={`/categories/${job.categorySlug}`}
                  className="text-xs sm:text-sm font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1"
                >
                  <span>View All in {job.category}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {relatedJobs.map((rj) => (
                  <JobCard key={rj.id} job={rj} />
                ))}
              </div>
            </div>
          )}

          {/* Bottom Ad Placement */}
          <div className="mt-12">
            <AdBanner slotId="job-details-bottom-banner" />
          </div>
        </div>
      </div>
    </>
  );
}
