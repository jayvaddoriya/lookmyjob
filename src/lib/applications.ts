"use client";

import { JobApplication } from "@/types";

let cachedApplications: JobApplication[] = [];
let cachedString = "";

export function subscribeApplications(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener("lmj_apps_updated", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("lmj_apps_updated", callback);
  };
}

export function getApplicationsSnapshot(): JobApplication[] {
  if (typeof window === "undefined") return cachedApplications;
  const current = localStorage.getItem("lmj_user_applications") || "[]";
  if (current !== cachedString) {
    cachedString = current;
    try {
      const parsed = JSON.parse(current);
      cachedApplications = Array.isArray(parsed) ? parsed : [];
    } catch {
      cachedApplications = [];
    }
  }
  return cachedApplications;
}

export function saveApplication(application: JobApplication) {
  if (typeof window === "undefined") return;
  const current = getApplicationsSnapshot();
  const updated = [application, ...current.filter((a) => a.jobId !== application.jobId)];
  localStorage.setItem("lmj_user_applications", JSON.stringify(updated));
  window.dispatchEvent(new Event("lmj_apps_updated"));
}
