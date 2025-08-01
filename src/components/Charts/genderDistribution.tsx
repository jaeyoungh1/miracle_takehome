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

export function GenderDistributionChart({
  data,
  chartId,
  chartTitle,
}: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="gender" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="USA" fill="#7B61FF" />
        <Bar dataKey="EU" fill="#3EC6B6" />
      </BarChart>
    </ResponsiveContainer>
  );
}
