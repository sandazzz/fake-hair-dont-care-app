import { DonationsTable } from "@/components/dashboard/donations-table";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { prisma } from "@/lib/prisma";

export async function DashboardPage() {
  const donations = await prisma.donation.findMany({
    take: 20,
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Hair Donations Dashboard"
        text="Manage and view all hair donations"
      />
      <div className="mt-6 w-full">
        <DonationsTable donationsList={donations} />
      </div>
    </DashboardShell>
  );
}
