import { DonationsTable } from "@/components/dashboard/donations-table";
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
    <div className="container mx-auto py-6">
      <h1 className="text-3xl text-background font-bold mb-6">Dashboard</h1>
      <div className="mt-6 w-full">
        <DonationsTable donationsList={donations} />
      </div>
    </div>
  );
}
