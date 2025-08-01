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

export function MostCommonConditionsChart({
  data,
  chartId,
  chartTitle,
}: ChartProps) {
  return (
    <BarChart data={data} layout="vertical" width={800} height={400}>
      <XAxis type="number" />
      <YAxis dataKey="condition" type="category" width={150}/>
      <Tooltip />
      <Legend />
      <Bar dataKey="USA" fill="#8884d8" />
      <Bar dataKey="EU" fill="#82ca9d" />
    </BarChart>
  );
}
