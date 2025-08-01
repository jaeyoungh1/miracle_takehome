import { ChartProps } from "./utils/charts.types";
import React from "react";
import { PieChart, Pie, Tooltip, Legend, Cell } from "recharts";

export function AgeDistributionChart({
  data,
  chartId,
  chartTitle,
}: ChartProps) {
  return (
    <PieChart width={600} height={600}>
      <Pie
        data={data[0]}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={120}
        fill="#8884d8"
      />
      <Pie
        data={data[1]}
        dataKey="value"
        nameKey="name"
        cx={450}
        cy={400}
        outerRadius={120}
        innerRadius={40}
        fill="#82ca9d"
      />
      <Tooltip />
      <Legend />
    </PieChart>
  );
}
