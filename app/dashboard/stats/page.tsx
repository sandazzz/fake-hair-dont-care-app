import { prisma } from "@/lib/prisma";
import { Stats } from "@/components/dashboard/stats";
import { MONTHS } from "@/components/dashboard/stats/constants";

export default async function StatsPage() {
  // Récupération des données avec agrégation côté serveur
  const [
    donations,
    hairTypesStats,
    permissionsStats,
    monthlyStats,
    totalDonations,
  ] = await Promise.all([
    // Données de base pour les autres calculs
    prisma.donation.findMany({
      select: {
        id: true,
        createdAt: true,
        status: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
    // Agrégation des types de cheveux
    prisma.donation.groupBy({
      by: ["hairTypes"],
      _count: {
        hairTypes: true,
      },
    }),
    // Agrégation des permissions
    prisma.donation.groupBy({
      by: ["allowResale", "allowWigUse"],
      _count: {
        _all: true,
      },
    }),
    // Agrégation mensuelle
    prisma.donation.groupBy({
      by: ["createdAt"],
      _count: {
        _all: true,
      },
    }),
    // Nombre total de dons
    prisma.donation.count(),
  ]);

  const hairTypesData = hairTypesStats.map(({ hairTypes, _count }) => ({
    name: hairTypes,
    value: _count.hairTypes,
    percentage: (_count.hairTypes / totalDonations) * 100,
  }));

  // Calcul des pourcentages pour les permissions
  const allowResaleCount = permissionsStats
    .filter((stat) => stat.allowResale)
    .reduce((acc, curr) => acc + curr._count._all, 0);

  const allowWigUseCount = permissionsStats
    .filter((stat) => stat.allowWigUse)
    .reduce((acc, curr) => acc + curr._count._all, 0);

  const permissionsData = [
    {
      name: "Autorise la revente",
      value: (allowResaleCount / totalDonations) * 100,
    },
    {
      name: "Autorise l'utilisation en perruque",
      value: (allowWigUseCount / totalDonations) * 100,
    },
  ];

  // Préparation des données mensuelles
  const monthlyCounts = monthlyStats.reduce((acc, { createdAt, _count }) => {
    const monthIndex = new Date(createdAt).getMonth();
    const month = MONTHS[monthIndex];
    acc[month] = (acc[month] || 0) + _count._all;
    return acc;
  }, {} as Record<string, number>);

  const monthlyData = MONTHS.map((month) => ({
    month,
    count: monthlyCounts[month] || 0,
  }));

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Statistiques des dons</h1>
      <Stats
        donations={donations}
        hairTypesData={hairTypesData}
        permissionsData={permissionsData}
        monthlyData={monthlyData}
      />
    </div>
  );
}
