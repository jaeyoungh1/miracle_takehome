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
  ResponsiveContainer
} from "recharts";

export function MostCommonConditionsChart({
  data,
  chartId,
  chartTitle,
}: ChartProps) {
  return (
        <ResponsiveContainer width="100%" height="100%">
    
    <BarChart data={data} layout="vertical">
      <XAxis type="number" />
      <YAxis dataKey="condition" type="category" width={150}/>
      <Tooltip />
      <Legend />
      <Bar dataKey="USA" fill="#7B61FF" />
      <Bar dataKey="EU" fill="#3EC6B6" />
    </BarChart>
          </ResponsiveContainer>
    
  );
}
