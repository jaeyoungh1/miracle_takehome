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
} from "recharts";

export function StatusDistributionChart({
  data,
  chartId,
  chartTitle,
}: ChartProps) {
  return (
    <BarChart data={data} layout="vertical" width={800} height={400}>
      <XAxis type="number" />
      <YAxis dataKey="status" type="category" width={200} />
      <Tooltip />
      <Legend />
      <Bar dataKey="USA" fill="#8884d8" />
      <Bar dataKey="EU" fill="#82ca9d" />
    </BarChart>
  );
}
