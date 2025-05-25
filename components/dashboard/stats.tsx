"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Donation } from "@prisma/client";
import { HairTypesSection } from "./stats/hair-types-section";
import { PermissionsSection } from "./stats/permissions-section";
import { MonthlySection } from "./stats/monthly-section";
import { MONTHS } from "./stats/constants";
import { MonthlyData } from "./stats/types";

interface StatsProps {
  donations: Donation[];
}

export function Stats({ donations }: StatsProps) {
  // Calcul des pourcentages pour la nature des cheveux
  const hairTypes = donations.reduce((acc, donation) => {
    const type = donation.hairTypes;
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const hairTypesData = Object.entries(hairTypes).map(([type, count]) => ({
    name: type,
    value: count,
    percentage: (count / donations.length) * 100,
  }));

  // Calcul des pourcentages pour les permissions
  const permissions = donations.reduce(
    (acc, donation) => {
      if (donation.allowResale) acc.allowResale++;
      if (donation.allowWigUse) acc.allowWigUse++;
      return acc;
    },
    { allowResale: 0, allowWigUse: 0 }
  );

  const permissionsData = [
    {
      name: "Autorise la revente",
      value: (permissions.allowResale / donations.length) * 100,
    },
    {
      name: "Autorise l'utilisation en perruque",
      value: (permissions.allowWigUse / donations.length) * 100,
    },
  ];

  // Calcul des données mensuelles à partir des donations réelles
  const monthlyData = donations.reduce((acc, donation) => {
    const date = new Date(donation.createdAt);
    const monthIndex = date.getMonth();
    const month = MONTHS[monthIndex];
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Assurer que tous les mois sont présents dans l'ordre
  const completeMonthlyData: MonthlyData[] = MONTHS.map((month) => ({
    month,
    count: monthlyData[month] || 0,
  }));

  return (
    <div className="space-y-8">
      <Tabs defaultValue="hair-types" className="space-y-8">
        <div className="flex justify-center h-[60px]">
          <TabsList className="grid w-[600px] grid-cols-3">
            <TabsTrigger value="hair-types">Nature des cheveux</TabsTrigger>
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
            <TabsTrigger value="monthly">Dons mensuels</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="hair-types" className="space-y-4">
          <HairTypesSection
            hairTypesData={hairTypesData}
            donations={donations}
          />
        </TabsContent>

        <TabsContent value="permissions" className="space-y-4">
          <PermissionsSection
            permissionsData={permissionsData}
            donations={donations}
          />
        </TabsContent>

        <TabsContent value="monthly" className="space-y-4">
          <MonthlySection monthlyData={completeMonthlyData} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
