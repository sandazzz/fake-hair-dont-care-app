import { DonationStats } from "@/components/dashboard/donation-stats";
import { DonationsTable } from "@/components/dashboard/donations-table";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Hair Donations Dashboard"
        text="Manage and view all hair donations"
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DonationStats />
      </div>
      <div className="mt-6">
        <DonationsTable />
      </div>
    </DashboardShell>
  );
}
