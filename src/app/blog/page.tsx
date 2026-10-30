import React from "react";
import type { Metadata } from "next";
import { BookOpen } from "lucide-react";
import BlogCard from "@/components/blog/BlogCard";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import AdBanner from "@/components/ads/AdBanner";
import NewsletterForm from "@/components/common/NewsletterForm";
import { getAllBlogs } from "@/lib/data";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Career Blog & Recruitment Guides 2026 | LookMyJob",
  description:
    "Expert advice on cracking government examinations (UPSC, SSC, Bank PO), crafting ATS-friendly resumes, salary negotiation strategies, and discovering legitimate remote careers in India.",
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
};

export default function BlogIndexPage() {
  const blogs = getAllBlogs();
  const featuredBlog = blogs[0];
  const regularBlogs = blogs.slice(1);
  const breadcrumbItems = [{ name: "Career Blog", url: "/blog" }];

  return (
    <div className="w-full bg-slate-50 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbItems} className="mb-6" />

        <div className="max-w-3xl mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-100/70 border border-sky-200 mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            Career Intelligence
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-sans">
            Career Guides & Exam Insights
          </h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            In-depth roadmaps, exam preparation strategies, and practical career navigation authored by professional recruiters and educators.
          </p>
        </div>

        {/* Featured Big Article */}
        {featuredBlog && (
          <div className="mb-12">
            <BlogCard blog={featuredBlog} featured={true} />
          </div>
        )}

        {/* Ad Placement */}
        <div className="mb-12">
          <AdBanner slotId="blog-index-mid-banner" />
        </div>

        {/* Regular Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {regularBlogs.map((b) => (
            <BlogCard key={b.slug} blog={b} />
          ))}
        </div>

        {/* Newsletter Subscription */}
        <NewsletterForm />
      </div>
    </div>
  );
}
