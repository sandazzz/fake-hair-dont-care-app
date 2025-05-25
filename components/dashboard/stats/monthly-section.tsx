"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, TooltipProps } from "recharts";
import { ResponsiveContainer } from "recharts";

interface MonthlyData {
  month: string;
  count: number;
}

interface MonthlySectionProps {
  monthlyData: MonthlyData[];
}

type CustomTooltipProps = TooltipProps<number, string>;

export function MonthlySection({ monthlyData }: MonthlySectionProps) {
  const totalDonations = monthlyData.reduce((acc, curr) => acc + curr.count, 0);

  const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (
      active &&
      payload &&
      payload.length &&
      payload[0]?.value !== undefined
    ) {
      return (
        <div className="bg-white p-4 border rounded-lg shadow-lg">
          <p className="font-semibold">{label}</p>
          <p className="text-primary">
            {payload[0].value.toLocaleString()} dons
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8">
      <Card className="hover:shadow-lg transition-shadow bg-gradient-to-br from-purple-50 to-pink-50">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Dons par mois</CardTitle>
              <CardDescription>
                Nombre de dons enregistrés par mois
              </CardDescription>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Total des dons</p>
              <p className="text-2xl font-bold text-purple-600">
                {totalDonations.toLocaleString()}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis
                  dataKey="month"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  interval={0}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => value.toLocaleString()}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="count"
                  fill="currentColor"
                  radius={[4, 4, 0, 0]}
                  className="fill-purple-500"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-6">
        {monthlyData.map(({ month, count }) => (
          <Card
            key={month}
            className="hover:shadow-lg transition-shadow bg-gradient-to-br from-purple-50 to-pink-50"
          >
            <CardContent className="p-4">
              <div className="flex flex-col items-center justify-center space-y-2">
                <p className="text-sm font-medium text-purple-600">{month}</p>
                <div className="flex items-baseline gap-1">
                  <p className="text-2xl font-bold text-purple-700">
                    {count.toLocaleString()}
                  </p>
                  <p className="text-xs text-purple-400">
                    ({((count / totalDonations) * 100).toFixed(1)}%)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
