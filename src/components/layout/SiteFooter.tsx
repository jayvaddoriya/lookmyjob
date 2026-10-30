import React from "react";
import Link from "next/link";
import { 
  Briefcase, 
  MapPin, 
  Mail, 
  Phone, 
  ShieldCheck, 
  ChevronRight, 
  Sparkles
} from "lucide-react";
import navigationData from "@/data/navigation.json";
import siteConfigData from "@/data/site-config.json";

export default function SiteFooter() {
  const currentYear = 2026;
  const { footer } = navigationData;

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-sm">
      {/* Upper Value Proposition Strip */}
      <div className="border-b border-slate-800/80 bg-slate-900/60 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white text-xs font-bold uppercase tracking-wider">
                  Verified Recruitment
                </h4>
                <p className="text-xs text-slate-400">
                  Track authentic government gazettes & verified direct employers.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white text-xs font-bold uppercase tracking-wider">
                  100% Free Job Discovery
                </h4>
                <p className="text-xs text-slate-400">
                  Zero fees for candidates. Never pay for job listings or applications.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white text-xs font-bold uppercase tracking-wider">
                  Pan-India & Remote Hub
                </h4>
                <p className="text-xs text-slate-400">
                  Explore opportunities across top Indian metros, states & remote roles.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Info Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-teal-400 p-0.5">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Briefcase className="w-4 h-4 text-sky-400" />
                </div>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xl font-black tracking-tight text-white">
                  Look<span className="text-sky-400">My</span>Job
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400 bg-teal-950/80 px-1 py-0.2 rounded border border-teal-800/60">
                  .online
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              LookMyJob is India&apos;s trusted career and job discovery platform connecting job seekers with verified government recruitments, top tech positions, banking careers, and flexible work-from-home opportunities.
            </p>

            <div className="space-y-2 text-xs pt-1">
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
                <span>{siteConfigData.addressPlaceholder}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <a
                  href={`mailto:${siteConfigData.email}`}
                  className="hover:text-sky-400 transition-colors"
                >
                  {siteConfigData.email}
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                <span>{siteConfigData.phonePlaceholder}</span>
              </div>
            </div>
          </div>

          {/* Job Sectors Column */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-sky-400 pl-2">
              Job Sectors
            </h3>
            <ul className="space-y-2 text-xs">
              {footer.jobSectors.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="hover:text-white transition-colors flex items-center gap-1.5 group"
                  >
                    <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-sky-400 transition-colors" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Top Locations Column */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-teal-400 pl-2">
              Top Locations
            </h3>
            <ul className="space-y-2 text-xs">
              {footer.topCities.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="hover:text-white transition-colors flex items-center gap-1.5 group"
                  >
                    <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-teal-400 transition-colors" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources & Legal Column */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-indigo-400 pl-2">
              Resources & Legal
            </h3>
            <ul className="space-y-2 text-xs">
              {footer.resources.slice(0, 3).map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="hover:text-white transition-colors flex items-center gap-1.5 group"
                  >
                    <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-indigo-400 transition-colors" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
              {footer.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="hover:text-white transition-colors flex items-center gap-1.5 group"
                  >
                    <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-indigo-400 transition-colors" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer Box */}
        <div className="mt-12 p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 leading-relaxed">
          <p className="font-semibold text-slate-300 mb-1">
            Official Recruitment Information Disclaimer:
          </p>
          <p>
            LookMyJob is an independent career information portal and is not affiliated with the Government of India, any state government, or any recruiting department. We curate notifications from official gazettes and authorized employer portals for educational and career assistance. During this preview release, all job postings and listings contain sample demonstration data. Candidates are advised to verify details against primary official gazettes before submitting official recruitment applications.
          </p>
        </div>

        {/* Bottom Copyright & Legal Links */}
        <div className="mt-8 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-slate-400 text-center sm:text-left">
            © {currentYear} LookMyJob.online — All rights reserved. Built with precision for job seekers across India.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-400">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span className="text-slate-700">•</span>
            <Link href="/terms-and-conditions" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <span className="text-slate-700">•</span>
            <Link href="/disclaimer" className="hover:text-white transition-colors">
              Disclaimer
            </Link>
            <span className="text-slate-700">•</span>
            <Link href="/advertise-with-us" className="hover:text-white transition-colors">
              Advertise
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
