"use client";

import React, { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { 
  CheckCircle, 
  UploadCloud, 
  FileText, 
  Trash2, 
  Clock, 
  AlertCircle, 
  ArrowLeft, 
  ArrowRight,
  ShieldCheck,
  Send,
  Building,
  MapPin,
  IndianRupee
} from "lucide-react";
import { Job, JobApplication } from "@/types";
import { 
  subscribeApplications, 
  getApplicationsSnapshot, 
  saveApplication 
} from "@/lib/applications";

interface ApplyFormClientProps {
  job: Job;
}

export default function ApplyFormClient({ job }: ApplyFormClientProps) {
  const applications = useSyncExternalStore(
    subscribeApplications,
    getApplicationsSnapshot,
    () => []
  );

  const existingApp = applications.find((a) => a.jobId === job.id);

  // Form State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState<string>(job.experience || "1-3 yrs");
  const [expectedCtc, setExpectedCtc] = useState("");
  const [noticePeriod, setNoticePeriod] = useState("Immediate");
  const [coverNote, setCoverNote] = useState("");
  const [consent, setConsent] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recentSubmission, setRecentSubmission] = useState<JobApplication | null>(null);
  const [formError, setFormError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        setFormError("Resume file size must be less than 5 MB.");
        return;
      }
      setResumeFile(file);
      setFormError("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!fullName.trim() || !email.trim() || !phone.trim() || !location.trim()) {
      setFormError("Please fill in all required candidate fields.");
      return;
    }

    if (!consent) {
      setFormError("Please agree to the application verification declaration.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const randomCode = Math.random().toString(36).substring(2, 7).toUpperCase();
      const newApp: JobApplication = {
        id: `LMJ-2026-${randomCode}`,
        jobId: job.id,
        jobSlug: job.slug,
        jobTitle: job.title,
        company: job.company,
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        location: location.trim(),
        experience,
        expectedCtc: expectedCtc.trim() || "As per company standards",
        noticePeriod,
        resumeFileName: resumeFile ? resumeFile.name : "Resume_Document.pdf",
        coverNote: coverNote.trim(),
        submittedAt: new Date().toLocaleDateString("en-IN", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      };

      saveApplication(newApp);
      setRecentSubmission(newApp);
      setIsSubmitting(false);
    }, 700);
  };

  const activeApp = recentSubmission || existingApp;

  // VIEW 1: Already Applied or Just Submitted Confirmation Screen
  if (activeApp) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-slate-200/90 shadow-lg p-6 sm:p-10 text-center animate-in fade-in duration-300">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-5 shadow-sm">
          <CheckCircle className="w-10 h-10" />
        </div>

        <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Application Confirmed
        </span>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-4 mb-2 font-sans">
          Application Submitted Successfully
        </h1>

        <p className="text-sm text-slate-600 max-w-lg mx-auto mb-6">
          Your profile and resume for <strong className="text-slate-900">{activeApp.jobTitle}</strong> at <strong className="text-slate-900">{activeApp.company}</strong> have been recorded in our direct employer pipeline.
        </p>

        {/* Application Receipt Box */}
        <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5 text-left text-xs sm:text-sm space-y-3 mb-8">
          <div className="flex justify-between items-center pb-2 border-b border-slate-200">
            <span className="text-slate-500 font-medium">Tracking Reference:</span>
            <span className="font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
              {activeApp.id}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-slate-500 font-medium">Candidate Name:</span>
            <span className="font-semibold text-slate-800">{activeApp.fullName}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-slate-500 font-medium">Contact Email:</span>
            <span className="font-semibold text-slate-800">{activeApp.email}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-slate-500 font-medium">Attached Resume:</span>
            <span className="font-semibold text-slate-800 flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-blue-600" />
              {activeApp.resumeFileName}
            </span>
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-slate-200">
            <span className="text-slate-500 font-medium">Application Status:</span>
            <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              Under Employer Review
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href={`/jobs/${job.slug}`}
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs uppercase tracking-wider transition-colors"
          >
            Back to Job Details
          </Link>
          <Link
            href="/jobs"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Browse More Opportunities</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  // VIEW 2: 15-Day Expired View
  if (job.isExpired) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-rose-200 shadow-md p-6 sm:p-10 text-center animate-in fade-in duration-300">
        <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-5">
          <AlertCircle className="w-10 h-10" />
        </div>

        <span className="text-xs font-bold uppercase tracking-widest text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
          Intake Concluded
        </span>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-4 mb-2 font-sans">
          Applications Closed for this Position
        </h1>

        <p className="text-sm text-slate-600 max-w-md mx-auto mb-6 leading-relaxed">
          In accordance with the LookMyJob 15-day freshness rule, direct applications for <strong>{job.title}</strong> at <strong>{job.company}</strong> ended on {job.applicationDeadline}.
        </p>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 text-left space-y-2 mb-8">
          <div className="font-bold text-slate-800">Why are applications closed?</div>
          <p>
            To protect candidates from stale postings and ensure employers receive responsive applicants, all vacancies accept applications for a strict maximum of 15 days from publication.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href={`/jobs/${job.slug}`}
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs uppercase tracking-wider"
          >
            View Job Details
          </Link>
          <Link
            href="/jobs"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-sm"
          >
            Explore Active 15-Day Vacancies
          </Link>
        </div>
      </div>
    );
  }

  // VIEW 3: Active Application Form
  return (
    <div className="max-w-3xl mx-auto">
      {/* Back Link */}
      <div className="mb-6">
        <Link
          href={`/jobs/${job.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to {job.title}</span>
        </Link>
      </div>

      {/* Target Job Quick Summary Card */}
      <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-8 shadow-md mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
              Applying For
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-white font-sans mt-0.5">
              {job.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1">
              <span className="flex items-center gap-1 text-slate-300 font-semibold">
                <Building className="w-3.5 h-3.5 text-blue-400" />
                {job.company}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {job.location}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-blue-300 font-semibold">
                <IndianRupee className="w-3.5 h-3.5" />
                {job.salary}
              </span>
            </div>
          </div>

          <div className="shrink-0 bg-slate-800/80 px-3.5 py-2 rounded-2xl border border-slate-700 text-right">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Application Window
            </div>
            <div className="text-xs font-bold text-amber-400 flex items-center justify-end gap-1 mt-0.5">
              <Clock className="w-3.5 h-3.5" />
              <span>{job.daysRemaining} days left</span>
            </div>
          </div>
        </div>

        <div className="pt-3 text-xs text-slate-400 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
          <span>Direct on-platform application: Your resume is processed directly by the employer hiring desk.</span>
        </div>
      </div>

      {/* Main Application Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 space-y-6"
      >
        <div>
          <h2 className="text-lg font-bold text-slate-900 font-sans">
            Candidate Information
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Please enter your accurate contact and career details.
          </p>
        </div>

        {formError && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{formError}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Rahul Sharma"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-slate-900"
            />
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">
              Email Address <span className="text-rose-500">*</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. rahul.sharma@example.com"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-slate-900"
            />
          </div>

          {/* Phone */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">
              Mobile Phone (WhatsApp preferred) <span className="text-rose-500">*</span>
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. +91 98765 43210"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-slate-900"
            />
          </div>

          {/* Current Location */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">
              Current City / Location <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Bangalore / Ahmedabad"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-slate-900"
            />
          </div>

          {/* Total Experience */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">
              Total Relevant Experience
            </label>
            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-slate-900 bg-white"
            >
              <option value="Fresher (0-1 yrs)">Fresher (0 - 1 years)</option>
              <option value="1-3 yrs">1 to 3 Years</option>
              <option value="3-5 yrs">3 to 5 Years</option>
              <option value="5+ yrs">5+ Years (Senior / Lead)</option>
            </select>
          </div>

          {/* Notice Period */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">
              Notice Period
            </label>
            <select
              value={noticePeriod}
              onChange={(e) => setNoticePeriod(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-slate-900 bg-white"
            >
              <option value="Immediate">Immediate Joiner (&lt; 15 days)</option>
              <option value="30 Days">30 Days</option>
              <option value="60 Days">60 Days</option>
              <option value="90 Days">90 Days</option>
            </select>
          </div>
        </div>

        {/* Expected CTC */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 block">
            Expected CTC (Optional)
          </label>
          <input
            type="text"
            value={expectedCtc}
            onChange={(e) => setExpectedCtc(e.target.value)}
            placeholder="e.g. ₹18 Lakhs / year"
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-slate-900"
          />
        </div>

        {/* Resume File Upload Box */}
        <div className="space-y-2 pt-2">
          <label className="text-xs font-bold text-slate-700 block">
            Upload Resume / Curriculum Vitae (.pdf, .docx, max 5MB)
          </label>

          {resumeFile ? (
            <div className="flex items-center justify-between p-4 rounded-2xl bg-blue-50/70 border border-blue-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900 truncate max-w-xs">
                    {resumeFile.name}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {(resumeFile.size / 1024).toFixed(1)} KB • Ready to submit
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setResumeFile(null)}
                className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                title="Remove file"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <label className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center cursor-pointer transition-colors bg-slate-50/50 hover:bg-blue-50/20 group">
              <UploadCloud className="w-10 h-10 text-slate-400 group-hover:text-blue-600 transition-colors mb-2" />
              <span className="text-xs sm:text-sm font-bold text-slate-700 group-hover:text-blue-700">
                Click to browse resume file or drag & drop
              </span>
              <span className="text-[11px] text-slate-400 mt-1">
                Supported formats: PDF, DOCX (Max 5MB)
              </span>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          )}
        </div>

        {/* Cover Note / Brief Introduction */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 block">
            Cover Note / Pitch to Hiring Manager (Optional)
          </label>
          <textarea
            rows={3}
            value={coverNote}
            onChange={(e) => setCoverNote(e.target.value)}
            placeholder="Briefly highlight your core technical skills, notable projects, and why you are a great match for this role..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-slate-900 resize-none"
          />
        </div>

        {/* Consent Checkbox */}
        <div className="pt-2">
          <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-600">
            <input
              type="checkbox"
              required
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4 mt-0.5 cursor-pointer"
            />
            <span>
              I confirm all submitted profile details are accurate and authorize LookMyJob to submit my application directly to <strong>{job.company}</strong>&apos;s recruitment team.
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm uppercase tracking-wider shadow-lg shadow-blue-600/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-wait"
          >
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Dispatching Application...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Direct Application</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
