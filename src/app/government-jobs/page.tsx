import { redirect } from "next/navigation";

export default function GovernmentJobsPage() {
  // LookMyJob has transitioned exclusively to verified private sector tech and enterprise careers.
  redirect("/jobs");
}
