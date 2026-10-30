import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { 
  Calendar, 
  Clock, 
  ArrowRight
} from "lucide-react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import BlogCard from "@/components/blog/BlogCard";
import AdBanner from "@/components/ads/AdBanner";
import AdInArticle from "@/components/ads/AdInArticle";
import AdSidebar from "@/components/ads/AdSidebar";
import JobShareButtons from "@/components/jobs/JobShareButtons";
import { getAllBlogs, getBlogBySlug, getRelatedBlogs } from "@/lib/data";
import { buildArticleSchema, buildBreadcrumbSchema, SITE_URL } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const blogs = getAllBlogs();
  return blogs.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    return { title: "Article Not Found | LookMyJob" };
  }

  return {
    title: `${blog.title} | LookMyJob Career Guide`,
    description: blog.excerpt,
    alternates: {
      canonical: `${SITE_URL}/blog/${blog.slug}`,
    },
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      type: "article",
      url: `${SITE_URL}/blog/${blog.slug}`,
      publishedTime: blog.publishDate,
      authors: [blog.author],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt,
    },
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const relatedBlogs = getRelatedBlogs(blog.slug, 3);
  const articleSchema = buildArticleSchema(blog);
  const breadcrumbItems = [
    { name: "Career Blog", url: "/blog" },
    { name: blog.title, url: `/blog/${blog.slug}` },
  ];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

  const formattedDate = new Date(blog.publishDate).toLocaleDateString("en-IN", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="w-full bg-slate-50 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbItems} className="mb-6" />

          {/* Article Header */}
          <div className="max-w-4xl mx-auto mb-8 sm:mb-12">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-100/70 border border-sky-200">
                {blog.category}
              </span>
              <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {blog.readTime}
              </span>
              <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {formattedDate}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-sans leading-tight mb-6">
              {blog.title}
            </h1>

            {/* Author Byline & Social Sharing Strip */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 px-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-sky-400 flex items-center justify-center font-bold text-sm">
                  {blog.author.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">
                    {blog.author}
                  </div>
                  <div className="text-xs text-slate-400">{blog.authorRole}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-medium hidden sm:inline">
                  Share:
                </span>
                <JobShareButtons title={blog.title} />
              </div>
            </div>
          </div>

          {/* Decorative Cover Gradient */}
          <div
            className={`max-w-4xl mx-auto h-48 sm:h-64 rounded-3xl bg-gradient-to-r ${blog.coverGradient} shadow-md mb-8 flex items-center justify-center text-white/30 text-5xl font-black select-none`}
          >
            LookMyJob Editorial
          </div>

          {/* Main Layout: Article Body + Sidebar Ad */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm">
                {/* Lead Excerpt */}
                <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed pb-6 border-b border-slate-100 mb-6 italic">
                  &ldquo;{blog.excerpt}&rdquo;
                </p>

                {/* Main Content Render */}
                <div className="space-y-6 text-sm sm:text-base text-slate-700 leading-relaxed">
                  {blog.content.split("\n\n").map((paragraph, index) => {
                    // Check for headers
                    if (paragraph.startsWith("### ")) {
                      return (
                        <h2
                          key={index}
                          className="text-xl sm:text-2xl font-black text-slate-900 font-sans tracking-tight pt-4"
                        >
                          {paragraph.replace("### ", "")}
                        </h2>
                      );
                    }
                    if (paragraph.startsWith("#### ")) {
                      return (
                        <h3
                          key={index}
                          className="text-base sm:text-lg font-bold text-slate-900 font-sans pt-2"
                        >
                          {paragraph.replace("#### ", "")}
                        </h3>
                      );
                    }
                    if (paragraph.startsWith("---")) {
                      return (
                        <React.Fragment key={index}>
                          <hr className="my-6 border-slate-100" />
                          {/* In-article ad placement at natural divider */}
                          {index === 4 && (
                            <AdInArticle slotId="blog-detail-in-article-ad" />
                          )}
                        </React.Fragment>
                      );
                    }

                    // Render bullet list
                    if (paragraph.startsWith("- ")) {
                      const items = paragraph.split("\n- ");
                      return (
                        <ul
                          key={index}
                          className="list-disc list-inside space-y-1.5 pl-2"
                        >
                          {items.map((it, idx) => (
                            <li key={idx} className="leading-relaxed">
                              {it.replace(/^- /, "")}
                            </li>
                          ))}
                        </ul>
                      );
                    }

                    // Render numbered list
                    if (/^\d+\.\s/.test(paragraph)) {
                      const items = paragraph.split(/\n(?=\d+\.\s)/);
                      return (
                        <ol
                          key={index}
                          className="list-decimal list-inside space-y-2 pl-2"
                        >
                          {items.map((it, idx) => (
                            <li key={idx} className="leading-relaxed">
                              {it.replace(/^\d+\.\s/, "")}
                            </li>
                          ))}
                        </ol>
                      );
                    }

                    return <p key={index}>{paragraph}</p>;
                  })}
                </div>

                {/* Article Tags */}
                <div className="pt-8 mt-8 border-t border-slate-100 flex flex-wrap items-center gap-2">
                  <span className="text-xs text-slate-400 font-semibold">
                    Article Tags:
                  </span>
                  {blog.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-lg bg-slate-100 text-xs font-medium text-slate-700"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Column */}
            <div className="space-y-6">
              <AdSidebar slotId="blog-detail-sidebar-ad" format="rectangle" />

              <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-3">
                <h3 className="text-sm font-bold text-slate-900 font-sans">
                  Browse Active Vacancies
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Put this career advice into practice by searching verified tech, corporate, and remote opportunities on LookMyJob.
                </p>
                <Link
                  href="/jobs"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:text-sky-700"
                >
                  <span>Search Jobs Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Related Articles Carousel / Grid */}
          {relatedBlogs.length > 0 && (
            <div className="mt-16 pt-12 border-t border-slate-200">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
                    Continue Reading
                  </span>
                  <h2 className="text-2xl font-black text-slate-900 font-sans">
                    Related Career Articles
                  </h2>
                </div>
                <Link
                  href="/blog"
                  className="text-xs sm:text-sm font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1"
                >
                  <span>All Articles</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedBlogs.map((rb) => (
                  <BlogCard key={rb.slug} blog={rb} />
                ))}
              </div>
            </div>
          )}

          {/* Bottom Ad */}
          <div className="mt-12">
            <AdBanner slotId="blog-detail-bottom-banner" />
          </div>
        </div>
      </div>
    </>
  );
}
