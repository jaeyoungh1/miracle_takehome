import { ChartProps } from "./utils/charts.types";
import React from "react";
import { PieChart, Pie, Tooltip, Cell, Legend, ResponsiveContainer } from "recharts";

export function ConditionBreakdownChart({ data, chartId, chartTitle }: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
    
    <PieChart>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={data[0]}
          cx="33%"
          cy="50%"
          outerRadius={120}
          fill="#7B61FF"
          // label={({ name }) => name}
        />
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={data[1]}
          cx="70%"
          cy="50%"
          outerRadius={120}
          innerRadius={40}
          fill="#3EC6B6"
        />
        <Legend />
        <Tooltip />
      </PieChart>
      </ResponsiveContainer>
  );
}

