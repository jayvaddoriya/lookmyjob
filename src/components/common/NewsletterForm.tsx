"use client";

import React, { useState } from "react";
import { Mail, CheckCircle2, BellRing, Sparkles } from "lucide-react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [sector, setSector] = useState("all");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    // Simulate frontend newsletter subscription
    setTimeout(() => {
      setStatus("success");
      setMessage("Success! You're subscribed to daily job alerts. Check your inbox soon.");
      setEmail("");
    }, 600);
  };

  return (
    <div className="w-full bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950 text-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl shadow-slate-950/20 border border-slate-800 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-300 text-xs font-semibold tracking-wide">
          <BellRing className="w-3.5 h-3.5" />
          <span>Instant WhatsApp & Email Recruitment Alerts</span>
        </div>

        <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
          Never Miss a Verified Job Opening in India
        </h3>

        <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
          Get daily curated alerts for UPSC, SSC, Bank PO, top IT engineering roles, and work-from-home vacancies delivered directly to your inbox. 100% free, zero spam.
        </p>

        {status === "success" ? (
          <div className="max-w-md mx-auto p-4 rounded-2xl bg-teal-950/80 border border-teal-600/40 text-teal-200 flex items-center justify-center gap-3 animate-in fade-in zoom-in-95">
            <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0" />
            <p className="text-sm font-medium text-left">{message}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto pt-2 space-y-3">
            <div className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  placeholder="Enter your email address..."
                  required
                  className="w-full bg-slate-800/90 text-white placeholder-slate-400 text-sm rounded-xl pl-11 pr-4 py-3 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all"
                />
              </div>

              <select
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                className="bg-slate-800/90 text-white text-xs sm:text-sm rounded-xl px-3 py-3 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-400 font-medium"
              >
                <option value="all">All Sectors</option>
                <option value="govt">Govt & PSU Only</option>
                <option value="it">IT & Tech Only</option>
                <option value="banking">Banking & Finance</option>
                <option value="remote">Work From Home</option>
              </select>

              <button
                type="submit"
                disabled={status === "loading"}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-400 to-teal-400 hover:from-sky-300 hover:to-teal-300 text-slate-950 font-bold text-sm tracking-wide transition-all shadow-md shadow-sky-500/20 active:scale-95 disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {status === "loading" ? (
                  <span>Subscribing...</span>
                ) : (
                  <>
                    <span>Subscribe Free</span>
                    <Sparkles className="w-4 h-4 text-slate-950" />
                  </>
                )}
              </button>
            </div>

            {status === "error" && (
              <p className="text-xs text-rose-400 text-center">{message}</p>
            )}

            <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-400 pt-1">
              <span>✓ Unsubscribe anytime with 1 click</span>
              <span>✓ No password needed</span>
              <span>✓ Instant notification on official releases</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
