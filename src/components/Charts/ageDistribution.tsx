import { ChartProps } from "./utils/charts.types";
import React from "react";
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from "recharts";

export function AgeDistributionChart({
  data,
  chartId,
  chartTitle,
}: ChartProps) {
  console.log('data', data)
  return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data[0]}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            fill="#7B61FF"
          />
          <Pie
            data={data[1]}
            dataKey="value"
            nameKey="name"
            cx="75%"
            cy="50%"
            outerRadius={120}
            innerRadius={40}
            fill="#3EC6B6"
          />
          <Tooltip />
          <Legend />
        </PieChart>
       </ResponsiveContainer>
  );
}
