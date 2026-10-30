import React from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  Flame,
  Clock,
  Briefcase
} from "lucide-react";
import JobSearchBar from "@/components/jobs/JobSearchBar";
import JobCard from "@/components/jobs/JobCard";
import FeaturedJobCard from "@/components/jobs/FeaturedJobCard";
import CategoryCard from "@/components/categories/CategoryCard";
import LocationCard from "@/components/locations/LocationCard";
import CompanyCard from "@/components/companies/CompanyCard";
import BlogCard from "@/components/blog/BlogCard";
import SectionHeading from "@/components/common/SectionHeading";
import NewsletterForm from "@/components/common/NewsletterForm";
import FAQAccordion from "@/components/common/FAQAccordion";
import AdBanner from "@/components/ads/AdBanner";
import { 
  getFeaturedJobs, 
  getLatestJobs, 
  getPrivateJobs, 
  getRemoteJobs, 
  getAllCategories, 
  getAllLocations, 
  getAllCompanies, 
  getAllBlogs, 
  getAllFaqs 
} from "@/lib/data";
import { buildFaqSchema } from "@/lib/seo";

export default function HomePage() {
  const featuredJobs = getFeaturedJobs(4);
  const latestJobs = getLatestJobs(6);
  const privateJobs = getPrivateJobs().slice(0, 4);
  const remoteJobs = getRemoteJobs().slice(0, 4);
  const categories = getAllCategories().slice(0, 8);
  const locations = getAllLocations().slice(0, 6);
  const companies = getAllCompanies().slice(0, 8);
  const blogs = getAllBlogs().slice(0, 3);
  const faqs = getAllFaqs();

  const faqSchema = buildFaqSchema(faqs);

  const popularKeywords = [
    { label: "Next.js & React", href: "/jobs?keyword=Next.js" },
    { label: "Go & Microservices", href: "/jobs?keyword=Golang" },
    { label: "Cloud & DevOps", href: "/categories/engineering" },
    { label: "Product Management", href: "/categories/product-management" },
    { label: "FinTech & Banking", href: "/categories/banking-finance" },
    { label: "Fresher Openings", href: "/categories/freshers" },
    { label: "Work From Home", href: "/work-from-home" },
    { label: "Jobs in Bangalore", href: "/locations/bangalore" },
    { label: "Jobs in Pune", href: "/locations/pune" },
    { label: "Jobs in Ahmedabad", href: "/locations/ahmedabad" },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="w-full">
        {/* ========================================================= */}
        {/* HERO SECTION                                              */}
        {/* ========================================================= */}
        <section className="relative bg-slate-900 text-white pt-12 pb-20 sm:pt-16 sm:pb-28 overflow-hidden border-b border-slate-800">
          {/* Subtle Ambient Background Gradients */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none overflow-hidden">
            <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-sky-500/15 to-transparent blur-3xl" />
            <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-teal-500/15 to-transparent blur-3xl" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto space-y-4 sm:space-y-6">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/90 border border-slate-700/80 text-sky-400 text-xs font-semibold tracking-wide shadow-sm animate-in fade-in duration-300">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                <span>India&apos;s Verified Private Tech & Corporate Job Gateway</span>
              </div>

              {/* Main Hero Heading */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-sans leading-[1.15]">
                Find the Right Job. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-teal-300 to-sky-300">
                  Build Your Future.
                </span>
              </h1>

              {/* SEO-Friendly Introduction */}
              <p className="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Discover verified private sector engineering positions, leading corporate vacancies, FinTech innovators, and flexible work-from-home careers across India. Apply directly on LookMyJob with our guaranteed 15-day application window.
              </p>

              {/* Central Search Bar */}
              <div className="pt-4 sm:pt-6 max-w-4xl mx-auto">
                <JobSearchBar variant="hero" />
              </div>

              {/* Popular Job Searches / Tag Cloud */}
              <div className="pt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
                <span className="text-slate-400 font-semibold flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-400" /> Popular Searches:
                </span>
                {popularKeywords.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Platform Quick Statistics Counter */}
            <div className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-center">
              <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-800 backdrop-blur-sm">
                <div className="text-2xl sm:text-3xl font-black text-white font-sans">
                  60+
                </div>
                <div className="text-xs text-slate-400 font-medium mt-1">
                  Active Direct Vacancies
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-800 backdrop-blur-sm">
                <div className="text-2xl sm:text-3xl font-black text-amber-400 font-sans">
                  15 Days
                </div>
                <div className="text-xs text-slate-400 font-medium mt-1">
                  Strict Application Window
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-800 backdrop-blur-sm">
                <div className="text-2xl sm:text-3xl font-black text-teal-400 font-sans">
                  100%
                </div>
                <div className="text-xs text-slate-400 font-medium mt-1">
                  Direct Internal Apply
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-800 backdrop-blur-sm">
                <div className="text-2xl sm:text-3xl font-black text-sky-400 font-sans">
                  Daily
                </div>
                <div className="text-xs text-slate-400 font-medium mt-1">
                  Automatic Job Rotation
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* AD PLACEMENT: BELOW HERO / SEARCH SECTION                 */}
        {/* ========================================================= */}
        <section className="bg-slate-50 border-b border-slate-200/80 py-4">
          <AdBanner slotId="homepage-below-hero-leaderboard" />
        </section>

        {/* ========================================================= */}
        {/* SECTION 1: FEATURED OPPORTUNITIES                         */}
        {/* ========================================================= */}
        <section className="py-12 sm:py-16 bg-white border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Handpicked for You"
              title="Featured Job Openings"
              subtitle="High-impact roles with market-leading compensation and verified internal application status."
              viewAllHref="/jobs"
              viewAllText="Explore All Jobs"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredJobs.map((job) => (
                <FeaturedJobCard key={job.id} job={job} />
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 2: LATEST FRESH VACANCIES (POSTED TODAY & RECENT) */}
        {/* ========================================================= */}
        <section className="py-12 sm:py-16 bg-slate-50/70 border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Fresh Vacancies"
              title="Newly Posted Openings (Active 15-Day Window)"
              subtitle="Apply early while hiring pipelines are fresh. Each vacancy closes automatically after 15 days."
              viewAllHref="/jobs"
              viewAllText="View All Vacancies"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {latestJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/jobs"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
              >
                <span>Browse All 60+ Active Jobs</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 3: TOP TECH & CORPORATE CAREERS                   */}
        {/* ========================================================= */}
        <section className="py-12 sm:py-16 bg-white border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Private Sector Vacancies"
              title="Top Tech, Engineering & Corporate Roles"
              subtitle="Exciting openings at India's leading MNCs, high-growth startups, and consulting firms."
              viewAllHref="/private-jobs"
              viewAllText="View All Private Jobs"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {privateJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* AD PLACEMENT: MID-PAGE RESPONSIVE AD                      */}
        {/* ========================================================= */}
        <section className="py-4 bg-slate-50 border-b border-slate-200/80">
          <AdBanner slotId="homepage-midpage-banner" />
        </section>

        {/* ========================================================= */}
        {/* SECTION 4: WORK FROM HOME & REMOTE OPPORTUNITIES          */}
        {/* ========================================================= */}
        <section className="py-12 sm:py-16 bg-teal-50/30 border-b border-teal-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Location Flexibility"
              title="Work From Home & Remote Jobs"
              subtitle="Full-time remote engineering, design, marketing, and support roles with pan-India hiring."
              viewAllHref="/work-from-home"
              viewAllText="View All Remote Jobs"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {remoteJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 5: JOBS BY CATEGORY                               */}
        {/* ========================================================= */}
        <section className="py-12 sm:py-16 bg-white border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Explore Sectors"
              title="Browse Jobs by Industry Category"
              subtitle="Find specialized vacancies matching your technical domain, academic degree, or profession."
              viewAllHref="/categories"
              viewAllText="Explore All Categories"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {categories.map((cat) => (
                <CategoryCard key={cat.slug} category={cat} />
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 6: JOBS BY LOCATION                               */}
        {/* ========================================================= */}
        <section className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Top Indian Hubs"
              title="Browse Jobs by City & Region"
              subtitle="Discover career vacancies across Bangalore tech parks, Pune, Mumbai, Ahmedabad, and remote hubs."
              viewAllHref="/locations"
              viewAllText="View All Locations"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {locations.map((loc) => (
                <LocationCard key={loc.slug} location={loc} />
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 7: TOP HIRING COMPANIES                           */}
        {/* ========================================================= */}
        <section className="py-12 sm:py-16 bg-white border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Employer Network"
              title="Top Hiring Organizations & Enterprises"
              subtitle="Connect directly with verified tech enterprises, digital innovators, and corporate leaders."
              alignment="center"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {companies.map((comp) => (
                <CompanyCard key={comp.slug} company={comp} />
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 8: WHY CHOOSE LOOKMYJOB                           */}
        {/* ========================================================= */}
        <section className="py-16 bg-slate-900 text-white border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-sky-400 font-bold uppercase tracking-wider text-xs mb-2 block">
                Platform Integrity
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-sans">
                Why Millions of Job Seekers Rely on LookMyJob
              </h2>
              <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
                We believe job discovery should be transparent, spam-free, and accessible without external redirects or subscription paywalls.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-3">
                <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white font-sans">
                  Strict 15-Day Application Window
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Every vacancy stays open for a maximum of 15 days. Once expired, applications automatically close, ensuring you never waste time applying to stale listings.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-3">
                <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center font-bold">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white font-sans">
                  100% Direct On-Site Applications
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Never get redirected to cluttered third-party employer boards. Apply directly on LookMyJob, upload your resume, and receive an instant tracking ID.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-3">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white font-sans">
                  100% Free Forever for Seekers
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  We will never ask you for money, payment details, or paid subscriptions. Our operational costs are sustained transparently through ethical display advertising.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 9: CAREER BLOG & EXPERT GUIDES                    */}
        {/* ========================================================= */}
        <section className="py-12 sm:py-16 bg-white border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Career Intelligence"
              title="Expert Career Advice & Preparation Guides"
              subtitle="In-depth articles authored by seasoned counselors on tech salaries, ATS resumes, and interview mastery."
              viewAllHref="/blog"
              viewAllText="View All Articles"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {blogs.map((b) => (
                <BlogCard key={b.slug} blog={b} />
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 10: NEWSLETTER ALERTS SUBSCRIPTION                */}
        {/* ========================================================= */}
        <section className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <NewsletterForm />
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 11: SEO FAQS ACCORDION                            */}
        {/* ========================================================= */}
        <section id="faq" className="py-12 sm:py-16 bg-white border-b border-slate-200/80">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Answers to Common Queries"
              title="Frequently Asked Questions"
              subtitle="Everything you need to know about job notifications, the 15-day application window, and direct applying on LookMyJob."
              alignment="center"
            />

            <FAQAccordion faqs={faqs} showCategoryFilters={true} />
          </div>
        </section>

        {/* ========================================================= */}
        {/* AD PLACEMENT: NEAR FOOTER LEADERBOARD                     */}
        {/* ========================================================= */}
        <section className="bg-slate-50 py-6 border-b border-slate-200/80">
          <AdBanner slotId="homepage-bottom-footer-ad" />
        </section>
      </div>
    </>
  );
}
