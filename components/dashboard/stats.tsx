"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Donation } from "@prisma/client";
import { HairTypesSection } from "./stats/hair-types-section";
import { PermissionsSection } from "./stats/permissions-section";
import { MonthlySection } from "./stats/monthly-section";
import { MonthlyData } from "./stats/types";

interface StatsProps {
  donations: Pick<Donation, "id" | "createdAt" | "status">[];
  hairTypesData: Array<{
    name: string;
    value: number;
    percentage: number;
  }>;
  permissionsData: Array<{
    name: string;
    value: number;
  }>;
  monthlyData: MonthlyData[];
}

export function Stats({
  donations,
  hairTypesData,
  permissionsData,
  monthlyData,
}: StatsProps) {
  return (
    <div className="space-y-8">
      <Tabs defaultValue="hair-types" className="space-y-8">
        <div className="flex-start h-[60px]">
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
          <MonthlySection monthlyData={monthlyData} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
