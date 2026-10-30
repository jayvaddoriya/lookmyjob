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
    default: "LookMyJob — Find Your Next Opportunity | Govt, IT & Remote Jobs 2026",
    template: "%s | LookMyJob",
  },
  description:
    "Discover verified government jobs (Sarkari Naukri), top IT software positions, banking careers, and work-from-home vacancies across India on LookMyJob. 100% free discovery platform.",
  keywords: [
    "LookMyJob",
    "Government jobs 2026",
    "Sarkari Naukri",
    "IT jobs India",
    "Remote jobs India",
    "Work from home jobs",
    "Bank PO recruitment",
    "Railway jobs RRB",
    "UPSC Civil Services",
    "SSC CGL recruitment",
    "Fresher jobs Ahmedabad Surat Bangalore Mumbai",
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
    title: "LookMyJob — Find Your Next Opportunity | Govt, IT & Remote Jobs 2026",
    description:
      "Explore verified government recruitments, top tech positions, banking careers, and remote vacancies across India. 100% free job discovery.",
  },
  twitter: {
    card: "summary_large_image",
    title: "LookMyJob — Find Your Next Opportunity",
    description:
      "Explore verified government recruitments, top tech positions, banking careers, and remote vacancies across India.",
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
