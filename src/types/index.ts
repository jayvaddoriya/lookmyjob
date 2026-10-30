export interface Job {
  id: string;
  slug: string;
  title: string;
  company: string;
  companySlug: string;
  logo: string; // company logo url or initials/svg
  location: string;
  city: string;
  state: string;
  isRemote: boolean;
  jobType: "Full-time" | "Part-time" | "Contract" | "Internship" | "Government";
  category: string;
  categorySlug: string;
  experience: "Fresher (0-1 yrs)" | "1-3 yrs" | "3-5 yrs" | "5+ yrs";
  salary: string;
  salaryMin: number;
  salaryMax: number;
  postedDate: string; // ISO YYYY-MM-DD
  applicationDeadline: string; // ISO YYYY-MM-DD
  vacancies: number;
  qualification: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  skills: string[];
  benefits: string[];
  eligibility: string[];
  howToApply: string[];
  applyUrl: string;
  isGovtJob: boolean;
  govtCategory?: "Central" | "State" | "Railway" | "Banking" | "SSC" | "UPSC" | "Police" | "Teaching";
  isFeatured: boolean;
  isVerified: boolean;
  sourceVerified: string;
  viewsCount: number;
}

export interface Category {
  slug: string;
  name: string;
  icon: string;
  description: string;
  count: number;
  color: string;
  popularRoles: string[];
  metaTitle: string;
  metaDescription: string;
}

export interface LocationItem {
  slug: string;
  name: string;
  state: string;
  jobCount: number;
  description: string;
  popularLocalities: string[];
  topIndustries: string[];
  metaTitle: string;
  metaDescription: string;
}

export interface Company {
  slug: string;
  name: string;
  logo: string;
  industry: string;
  headquarters: string;
  jobCount: number;
  website: string;
  verified: boolean;
  overview: string;
  founded?: string;
  size?: string;
}

export interface Blog {
  slug: string;
  title: string;
  excerpt: string;
  content: string; // Markdown or rich HTML
  readTime: string;
  author: string;
  authorRole: string;
  publishDate: string;
  category: string;
  tags: string[];
  coverGradient: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: "General" | "Job Seekers" | "Government Exams" | "Employers" | "Monetization";
}

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  url: string;
  email: string;
  phonePlaceholder: string;
  addressPlaceholder: string;
  social: {
    twitter: string;
    linkedin: string;
    facebook: string;
    telegram: string;
  };
  adsense: {
    enabled: boolean;
    publisherId: string;
    showPlaceholders: boolean;
  };
}

export interface FilterState {
  keyword: string;
  location: string;
  category: string;
  jobType: string;
  experience: string;
  salaryMin: number;
  isGovtJob?: boolean;
  isRemote?: boolean;
  sortBy: "latest" | "salary" | "views";
}
