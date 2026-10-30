import { Job, Category, LocationItem, Company, Blog, FAQ, SiteConfig, FilterState } from "@/types";
import jobsData from "@/data/jobs.json";
import categoriesData from "@/data/categories.json";
import locationsData from "@/data/locations.json";
import companiesData from "@/data/companies.json";
import blogsData from "@/data/blogs.json";
import faqsData from "@/data/faqs.json";
import siteConfigData from "@/data/site-config.json";
import navigationData from "@/data/navigation.json";

// Anchor date for deterministic static prerender
const BASE_ANCHOR_DATE = "2026-10-30";
const MS_PER_DAY = 24 * 60 * 60 * 1000;

function formatIsoDate(d: Date): string {
  const year = d.getUTCFullYear();
  const month = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Transforms raw jobs into dynamically rolling 15-day application vacancies.
 * Modulo 18 creates a deterministic 18-day continuous cycle:
 * - Days 0-14: Active (15 down to 1 day remaining to apply)
 * - Days 15-17: Expired / Applications Closed
 * - Every single day, old jobs expire and brand new jobs appear at Day 0 automatically!
 * - Strictly internal application URL: /jobs/[slug]/apply
 */
function processJobs(rawList: unknown[]): Job[] {
  const anchorTime = new Date(`${BASE_ANCHOR_DATE}T00:00:00Z`).getTime();

  return (rawList as Array<Record<string, unknown>>).map((raw, index) => {
    const ageDays = index % 18;
    const isExpired = ageDays >= 15;
    const daysRemaining = isExpired ? 0 : 15 - ageDays;

    const postedMs = anchorTime - ageDays * MS_PER_DAY;
    const deadlineMs = postedMs + 15 * MS_PER_DAY;

    const postedDate = formatIsoDate(new Date(postedMs));
    const applicationDeadline = formatIsoDate(new Date(deadlineMs));

    let postedRelative = `${ageDays} days ago`;
    if (ageDays === 0) postedRelative = "Today";
    else if (ageDays === 1) postedRelative = "Yesterday";

    return {
      ...(raw as unknown as Job),
      postedDate,
      applicationDeadline,
      daysRemaining,
      isExpired,
      postedRelative,
      applyUrl: `/jobs/${raw.slug}/apply`, // Strictly internal LookMyJob application gateway
      isGovtJob: false,
    };
  });
}

// Static dataset instances
const jobs: Job[] = processJobs(jobsData);
const categories: Category[] = categoriesData as Category[];
const locations: LocationItem[] = locationsData as LocationItem[];
const companies: Company[] = companiesData as Company[];
const blogs: Blog[] = blogsData as Blog[];
const faqs: FAQ[] = faqsData as FAQ[];
const siteConfig: SiteConfig = siteConfigData as SiteConfig;

export function getSiteConfig(): SiteConfig {
  return siteConfig;
}

export function getNavigation() {
  return navigationData;
}

export function getAllJobs(): Job[] {
  return [...jobs];
}

export function getActiveJobs(): Job[] {
  return jobs.filter((j) => !j.isExpired);
}

export function getJobBySlug(slug: string): Job | undefined {
  return jobs.find((j) => j.slug === slug);
}

export function getJobsByCategory(categorySlug: string): Job[] {
  return jobs.filter(
    (j) =>
      j.categorySlug.toLowerCase() === categorySlug.toLowerCase() ||
      j.category.toLowerCase().replace(/[^a-z0-9]/g, "-") === categorySlug.toLowerCase()
  );
}

export function getJobsByLocation(locationSlug: string): Job[] {
  if (locationSlug === "remote-india") {
    return jobs.filter((j) => j.isRemote);
  }
  return jobs.filter(
    (j) =>
      j.city.toLowerCase().replace(/[^a-z0-9]/g, "-") === locationSlug.toLowerCase() ||
      j.location.toLowerCase().includes(locationSlug.replace(/-/g, " ").toLowerCase())
  );
}

export function getRelatedJobs(currentJobId: string, category: string, limit = 4): Job[] {
  return jobs
    .filter((j) => j.id !== currentJobId && (j.category === category || j.categorySlug === category))
    .slice(0, limit);
}

export function getLatestJobs(limit = 6): Job[] {
  return [...jobs]
    .sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime())
    .slice(0, limit);
}

export function getFeaturedJobs(limit = 4): Job[] {
  const featured = jobs.filter((j) => j.isFeatured && !j.isExpired);
  return (featured.length > 0 ? featured : jobs.filter((j) => !j.isExpired)).slice(0, limit);
}

export function getGovtJobs(): Job[] {
  // Purged: LookMyJob is 100% private tech and enterprise career focused
  return [];
}

export function getPrivateJobs(): Job[] {
  return [...jobs];
}

export function getRemoteJobs(): Job[] {
  return jobs.filter((j) => j.isRemote);
}

export function searchJobs(filters: Partial<FilterState>): Job[] {
  return jobs.filter((job) => {
    if (filters.keyword) {
      const q = filters.keyword.toLowerCase().trim();
      const matchTitle = job.title.toLowerCase().includes(q);
      const matchCompany = job.company.toLowerCase().includes(q);
      const matchSkills = job.skills.some((s) => s.toLowerCase().includes(q));
      const matchDesc = job.description.toLowerCase().includes(q);
      if (!matchTitle && !matchCompany && !matchSkills && !matchDesc) return false;
    }

    if (filters.location && filters.location !== "all") {
      const loc = filters.location.toLowerCase();
      if (loc === "remote") {
        if (!job.isRemote) return false;
      } else {
        const matchCity = job.city.toLowerCase() === loc;
        const matchState = job.state.toLowerCase() === loc;
        const matchText = job.location.toLowerCase().includes(loc);
        if (!matchCity && !matchState && !matchText) return false;
      }
    }

    if (filters.category && filters.category !== "all") {
      const cat = filters.category.toLowerCase();
      if (job.categorySlug.toLowerCase() !== cat && job.category.toLowerCase() !== cat) {
        return false;
      }
    }

    if (filters.jobType && filters.jobType !== "all") {
      if (job.jobType.toLowerCase() !== filters.jobType.toLowerCase()) {
        return false;
      }
    }

    if (filters.experience && filters.experience !== "all") {
      if (job.experience.toLowerCase() !== filters.experience.toLowerCase()) {
        return false;
      }
    }

    if (filters.salaryMin && filters.salaryMin > 0) {
      if (job.salaryMin < filters.salaryMin) {
        return false;
      }
    }

    if (filters.isRemote !== undefined && filters.isRemote) {
      if (!job.isRemote) {
        return false;
      }
    }

    return true;
  });
}

export function getAllCategories(): Category[] {
  return [...categories];
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getAllLocations(): LocationItem[] {
  return [...locations];
}

export function getLocationBySlug(slug: string): LocationItem | undefined {
  return locations.find((l) => l.slug === slug);
}

export function getAllCompanies(): Company[] {
  return [...companies];
}

export function getCompanyBySlug(slug: string): Company | undefined {
  return companies.find((c) => c.slug === slug);
}

export function getAllBlogs(): Blog[] {
  return [...blogs];
}

export function getBlogBySlug(slug: string): Blog | undefined {
  return blogs.find((b) => b.slug === slug);
}

export function getRelatedBlogs(currentSlug: string, limit = 3): Blog[] {
  return blogs.filter((b) => b.slug !== currentSlug).slice(0, limit);
}

export function getAllFaqs(category?: string): FAQ[] {
  if (category && category !== "All") {
    return faqs.filter((f) => f.category === category);
  }
  return [...faqs];
}
