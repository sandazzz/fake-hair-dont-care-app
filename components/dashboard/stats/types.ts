import { TooltipProps } from "recharts";

export interface MonthlyData {
  month: string;
  count: number;
}

export type CustomTooltipProps = TooltipProps<number, string>;
