"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  TooltipProps,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { COLORS } from "@/components/dashboard/stats/constants";

interface DonutChartProps {
  data: Array<{
    name: string;
    value: number;
    percentage: number;
  }>;
}

type CustomTooltipProps = TooltipProps<number, string>;

export function DonutChart({ data }: DonutChartProps) {
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
            {payload[0].value.toLocaleString()} dons
          </p>
          <p className="text-sm text-muted-foreground">
            {(
              (payload[0].value /
                data.reduce((acc, curr) => acc + curr.value, 0)) *
              100
            ).toFixed(1)}
            %
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8">
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={true}
              outerRadius={140}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => {
                if (percent < 0.05) return null;
                return `${name} (${(percent * 100).toFixed(0)}%)`;
              }}
            >
              {data.map((_entry, index) => (
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.map(({ name, value, percentage }, index) => (
          <Card key={name} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">{name}</p>
                  <p className="text-sm text-muted-foreground">
                    {value.toLocaleString()} dons
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <p className="text-2xl font-bold">{percentage.toFixed(1)}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
