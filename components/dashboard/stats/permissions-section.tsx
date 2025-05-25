"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  TooltipProps,
  ResponsiveContainer,
} from "recharts";
import { COLORS } from "./constants";

interface PermissionsSectionProps {
  permissionsData: Array<{
    name: string;
    value: number;
  }>;
  totalDonations: number;
}

type CustomTooltipProps = TooltipProps<number, string>;

export function PermissionsSection({
  permissionsData,
  totalDonations,
}: PermissionsSectionProps) {
  const CustomPieTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (
      active &&
      payload &&
      payload.length &&
      payload[0]?.value !== undefined &&
      payload[0]?.name
    ) {
      return (
        <div className="bg-white p-4 border rounded-lg shadow-lg">
          <p className="font-semibold">{payload[0].name}</p>
          <p className="text-primary">
            {Math.round(
              (payload[0].value / 100) * totalDonations
            ).toLocaleString()}{" "}
            dons
          </p>
          <p className="text-sm text-muted-foreground">
            {payload[0].value.toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8">
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle>Répartition des permissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={permissionsData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={140}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => {
                    return `${name} (${(percent * 100).toFixed(0)}%)`;
                  }}
                >
                  {permissionsData.map((_entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  content={<CustomPieTooltip />}
                  formatter={(value: number) => value.toLocaleString()}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {permissionsData.map(({ name, value }, index) => (
          <Card key={name} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">{name}</p>
                  <p className="text-sm text-muted-foreground">
                    {Math.round(
                      (value / 100) * totalDonations
                    ).toLocaleString()}{" "}
                    dons
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <p className="text-2xl font-bold">{value.toFixed(1)}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
