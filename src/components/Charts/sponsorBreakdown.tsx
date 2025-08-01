import { ChartProps } from "./utils/charts.types";
import React from "react";
import {
  BarChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Bar,
  Legend,
  ResponsiveContainer,
} from "recharts";

export function SponsorBreakdownChart({
  data,
  chartId,
  chartTitle,
}: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart layout="vertical" data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" allowDecimals={false} />
        <YAxis dataKey="name" tick={false} type="category" />
        <Tooltip />
        <Bar dataKey="USA" fill="#7B61FF" name="USA Trials" />
        <Bar dataKey="EU" fill="#3EC6B6" name="EU Trials" />
      </BarChart>
    </ResponsiveContainer>
  );
}
