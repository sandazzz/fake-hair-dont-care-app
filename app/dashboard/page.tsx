import { getSession } from "@/lib/auth-session";
import { redirect } from "next/navigation";
import { DashboardPage } from "@/components/dashboard/dashboard-page";

export default async function Dashboard() {
  const session = await getSession();
  
  if (!session) {
    redirect("/sign-in"); // ici, on fait une redirection SERVER-SIDE
  }

  return <DashboardPage />;
}
