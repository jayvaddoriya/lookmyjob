# LookMyJob.online — Professional Job Discovery Platform

[![Next.js](https://img.shields.io/badge/Next.js-16.4.3-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3.0-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

**LookMyJob.online** is a modern, high-performance job discovery platform engineered for rapid organic search acquisition, seamless candidate navigation, and strategic monetization through Google AdSense.

---

## 🌟 Key Features

1. **Comprehensive Job Discovery**:
   - **All Jobs (`/jobs`)**: Real-time multi-dimensional filtering by keyword, location, job category, employment type, experience tier, and minimum salary, with responsive pagination and sorting.
   - **Government Jobs (`/government-jobs`)**: Specialized hub covering Central Ministries, State PSCs, Indian Railways (RRB), Public Sector Banking (SBI/IBPS), Defense (DRDO), and Teaching (KVS).
   - **Private IT & Corporate (`/private-jobs`)**: Software engineering, AI/ML, cloud platform architectures, freshers, and multinational enterprise careers.
   - **Work From Home (`/work-from-home`)**: 100% remote positions across India with scam-protection advisories.

2. **SEO & Structured Data Architecture**:
   - Dynamic `JobPosting` JSON-LD schemas on all 32+ individual job pages.
   - `Organization` & `WebSite` search action schemas.
   - `BreadcrumbList` hierarchy on all routes.
   - `Article` schema for in-depth career guides.
   - `FAQPage` compliant schema.
   - Dynamic XML sitemap (`/sitemap.xml`) indexing all 90+ routes.
   - Optimized `robots.txt` configuration.

3. **Google AdSense & Monetization Architecture**:
   - Reusable ad slot components: `AdBanner`, `AdSidebar`, `AdInArticle`, `AdResponsive`, and `AdPlaceholder`.
   - Guaranteed Cumulative Layout Shift (CLS) prevention using pre-allocated IAB standard minimum heights (`min-h-[90px]`, `min-h-[250px]`, `min-h-[600px]`).
   - Clean, subtle styling with &ldquo;Advertisement&rdquo; micro-labeling.
   - Ready for one-step AdSense activation by toggling `adsense.enabled` in `src/data/site-config.json`.

4. **100% Local JSON Architecture**:
   - Zero external database or backend dependencies.
   - Centralized data in `src/data/`:
     - `jobs.json` (32 verified, realistic recruitment listings)
     - `categories.json` (14 industry categories)
     - `locations.json` (12 Indian metro hubs and states)
     - `companies.json` (Top hiring organizations)
     - `blogs.json` (8 comprehensive career guides)
     - `faqs.json` (Platform FAQs)
     - `navigation.json` (Menus & footer links)
     - `site-config.json` (Domain configuration & social links)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or 20.x
- npm 10.x

### Installation
```bash
git clone https://github.com/jayvaddoriya/lookmyjob.git
cd lookmyjob
npm install
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

### Production Build & Linting
```bash
npm run lint
npm run build
```

---

## 🌐 Custom Domain & DNS Setup (lookmyjob.online)

When deploying to Vercel:
1. Connect the GitHub repository `jayvaddoriya/lookmyjob`.
2. In Project Settings -> **Domains**, add: `lookmyjob.online` and `www.lookmyjob.online`.
3. In your domain registrar (e.g. GoDaddy / Namecheap / Hostinger), add the following DNS records:
   - **Type**: `A` | **Name**: `@` | **Value**: `76.76.21.21`
   - **Type**: `CNAME` | **Name**: `www` | **Value**: `cname.vercel-dns.com`

---

## 📄 License
LookMyJob.online — All rights reserved.
