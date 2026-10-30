import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, ShieldCheck, ArrowLeft } from "lucide-react";
import Breadcrumbs from "@/components/common/Breadcrumbs";

export const metadata: Metadata = {
  title: "Application Gateway | LookMyJob Demo",
  description: "Official recruitment application gateway and redirection demonstration.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DemoApplyPage() {
  const breadcrumbItems = [
    { name: "Jobs", url: "/jobs" },
    { name: "Application Gateway", url: "/demo-apply" },
  ];

  return (
    <div className="w-full bg-slate-50 py-12 sm:py-20 min-h-[70vh] flex items-center justify-center">
      <div className="max-w-xl mx-auto px-4 sm:px-6 w-full">
        <Breadcrumbs items={breadcrumbItems} className="mb-4 justify-center" />
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center mx-auto">
            <ExternalLink className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 border border-teal-200 inline-block">
              Demonstration Redirection Gateway
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-sans tracking-tight">
              Official Employer Redirection
            </h1>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            You clicked an application link on LookMyJob. In our live production environment, this link directly opens the verified recruitment portal of the hiring organization or official commission (e.g., UPSC, SSC, SBI, or verified corporate career page).
          </p>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs text-slate-600 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-800">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              <span>Safe Application Principles:</span>
            </div>
            <ul className="list-disc list-inside space-y-1 pl-1">
              <li>Always check the URL in your browser address bar.</li>
              <li>Verify that official government domains end in <code className="text-sky-700 font-mono">.gov.in</code> or <code className="text-sky-700 font-mono">.nic.in</code>.</li>
              <li>LookMyJob never asks for processing fees or payment transfers.</li>
            </ul>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/jobs"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white font-bold text-xs uppercase tracking-wider hover:bg-slate-800 transition-colors shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Job Search</span>
            </Link>
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs uppercase tracking-wider hover:bg-slate-200 transition-colors"
            >
              Explore Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
