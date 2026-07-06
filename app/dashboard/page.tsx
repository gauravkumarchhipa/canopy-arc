import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAppSession } from "../lib/auth/session";
import DashboardContent from "./DashboardContent";

export const metadata: Metadata = {
  title: "Dashboard — Canopy Arc",
  description: "Your Canopy Arc dashboard.",
};

export default async function DashboardPage() {
  const session = await getAppSession();

  if (!session) {
    redirect("/signin?redirectTo=/dashboard");
  }

  return <DashboardContent email={session.email} />;
}
