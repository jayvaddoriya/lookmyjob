import { Job, Blog, FAQ } from "@/types";

export const SITE_URL = "https://lookmyjob.online";
export const SITE_NAME = "LookMyJob";

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    description: "LookMyJob is a premier job discovery portal connecting job seekers with verified government recruitments, top tech roles, and remote opportunities across India.",
    sameAs: [
      "https://twitter.com/lookmyjob",
      "https://linkedin.com/company/lookmyjob",
      "https://facebook.com/lookmyjob",
      "https://t.me/lookmyjob_alerts"
    ]
  };
}

export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/jobs?keyword={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
}

export function buildBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`
    }))
  };
}

export function buildJobPostingSchema(job: Job) {
  // Format valid employment types according to Google schema specifications
  let employmentType: string | string[] = "FULL_TIME";
  if (job.jobType === "Part-time") employmentType = "PART_TIME";
  if (job.jobType === "Contract") employmentType = "CONTRACTOR";
  if (job.jobType === "Internship") employmentType = "INTERN";

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    title: job.title,
    description: `<div><p>${job.description}</p><h3>Qualifications</h3><p>${job.qualification}</p><h3>Key Responsibilities</h3><ul>${job.responsibilities.map((r) => `<li>${r}</li>`).join("")}</ul><h3>Requirements</h3><ul>${job.requirements.map((req) => `<li>${req}</li>`).join("")}</ul></div>`,
    identifier: {
      "@type": "PropertyValue",
      name: job.company,
      value: job.id
    },
    datePosted: `${job.postedDate}T00:00:00+05:30`,
    validThrough: `${job.applicationDeadline}T23:59:59+05:30`,
    employmentType: employmentType,
    hiringOrganization: {
      "@type": "Organization",
      name: job.company,
      sameAs: SITE_URL
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.city,
        addressRegion: job.state,
        addressCountry: "IN"
      }
    },
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: "INR",
      value: {
        "@type": "QuantitativeValue",
        minValue: job.salaryMin,
        maxValue: job.salaryMax,
        unitText: "YEAR"
      }
    }
  };

  if (job.isRemote) {
    schema.jobLocationType = "TELECOMMUTE";
    schema.applicantLocationRequirements = {
      "@type": "Country",
      name: "India"
    };
  }

  return schema;
}

export function buildArticleSchema(blog: Blog) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.title,
    description: blog.excerpt,
    datePublished: `${blog.publishDate}T08:00:00+05:30`,
    dateModified: `${blog.publishDate}T08:00:00+05:30`,
    author: {
      "@type": "Person",
      name: blog.author,
      jobTitle: blog.authorRole
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.svg`
      }
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${blog.slug}`
    }
  };
}

export function buildFaqSchema(faqs: FAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };
}
