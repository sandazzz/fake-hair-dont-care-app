import { prisma } from "@/lib/prisma";
import { Stats } from "@/components/dashboard/stats";

export default async function StatsPage() {
  const donations = await prisma.donation.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Statistiques des dons</h1>
      <Stats donations={donations} />
    </div>
  );
}
