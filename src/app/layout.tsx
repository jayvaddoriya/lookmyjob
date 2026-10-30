import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import { buildOrganizationSchema, buildWebSiteSchema, SITE_URL } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "LookMyJob — Find Your Next Opportunity | Private Tech, Engineering & Remote Jobs",
    template: "%s | LookMyJob",
  },
  description:
    "Discover verified private tech software positions, engineering careers, FinTech roles, and flexible work-from-home vacancies across India on LookMyJob. 100% direct internal applications with a strict 15-day application window.",
  keywords: [
    "LookMyJob",
    "Private tech jobs India",
    "Software Engineer jobs",
    "Next.js Developer vacancies",
    "Full Stack Engineer",
    "Remote jobs India",
    "Work from home careers",
    "FinTech jobs",
    "Product Manager jobs",
    "Fresher IT jobs Ahmedabad Surat Bangalore Mumbai Pune",
  ],
  authors: [{ name: "LookMyJob Editorial Team", url: SITE_URL }],
  creator: "LookMyJob",
  publisher: "LookMyJob",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "LookMyJob",
    title: "LookMyJob — Find Your Next Opportunity | Private Tech & Remote Careers",
    description:
      "Explore verified private tech engineering vacancies, corporate roles, and remote opportunities across India with direct 15-day application intake.",
  },
  twitter: {
    card: "summary_large_image",
    title: "LookMyJob — Find Your Next Opportunity",
    description:
      "Explore verified private tech engineering vacancies, corporate roles, and remote opportunities across India with direct 15-day application intake.",
    creator: "@lookmyjob",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  other: {
    "google-adsense-account": "ca-pub-1539263458228927",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgSchema = buildOrganizationSchema();
  const websiteSchema = buildWebSiteSchema();

  return (
    <html lang="en" className={`${inter.variable} h-full scroll-smooth`}>
      <head>
        {/* Google AdSense Verification & Auto-Ads Snippet (Raw Script for Crawler Visibility) */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1539263458228927"
          crossOrigin="anonymous"
        />
        <meta
          name="google-adsense-account"
          content="ca-pub-1539263458228927"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-slate-50 text-slate-900 antialiased selection:bg-sky-500 selection:text-white">
        <SiteHeader />
        <main className="flex-1 flex flex-col">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
