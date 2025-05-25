"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle>Dons par mois</CardTitle>
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
                  className="fill-primary"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
        {monthlyData.map(({ month, count }) => (
          <Card key={month} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm font-medium">{month}</p>
                <p className="text-2xl font-bold mt-2">
                  {count.toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
