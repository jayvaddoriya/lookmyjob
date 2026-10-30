import { redirect } from "next/navigation";

export default function DemoApplyPage() {
  // All applications on LookMyJob are handled directly through /jobs/[slug]/apply
  redirect("/jobs");
}
