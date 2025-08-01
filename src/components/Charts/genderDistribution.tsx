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

export function GenderDistributionChart({
  data,
  chartId,
  chartTitle,
}: ChartProps) {
  return (
    <BarChart data={data} width={800}
        height={400}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="gender" />
        <YAxis width={150} />
        <Tooltip />
        <Legend />
        <Bar dataKey="USA" fill="#8884d8" />
        <Bar dataKey="EU" fill="#82ca9d" />
      </BarChart>
  );
}
