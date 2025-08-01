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

export function TopTenSponsors({ data, chartId, chartTitle }: ChartProps) {
  return (
    <BarChart
      layout="vertical"
      data={data}
      width={800}
      height={800}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis type="number" allowDecimals={false} />
      <YAxis dataKey="name" type="category" width={150} />
      <Tooltip />
      <Legend />
      <Bar dataKey="USA" fill="#8884d8" />
      <Bar dataKey="EU" fill="#82ca9d" />
    </BarChart>
  );
}
