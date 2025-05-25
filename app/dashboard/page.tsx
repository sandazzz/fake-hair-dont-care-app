import { DonationsTable } from "@/components/dashboard/donations-table";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { getSession } from "@/lib/auth-session";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const donations = await prisma.donation.findMany({
    take: 10,
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <>
      <DashboardHeader
        heading="Fake Hair Don't Care Management"
        text="Manage and view all hair donations"
      />
      <div className="mt-6 w-full">
        <DonationsTable donationsList={donations} />
      </div>
    </>
  );
}
