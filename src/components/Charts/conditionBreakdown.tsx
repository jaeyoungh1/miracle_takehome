import { ChartProps } from "./utils/charts.types";
import React from "react";
import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";

export function ConditionBreakdownChart({ data, chartId, chartTitle }: ChartProps) {
  return (
    <PieChart width={600} height={600}>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={data[0]}
          cx="33%"
          cy="50%"
          outerRadius={120}
          fill="#8884d8"
          // label={({ name }) => name}
        />
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={data[1]}
          cx="80%"
          cy="50%"
          outerRadius={120}
          innerRadius={40}
          fill="#82ca9d"
        />
        <Legend />
        <Tooltip />
      </PieChart>
  );
}

