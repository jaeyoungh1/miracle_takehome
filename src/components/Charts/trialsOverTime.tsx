import { ChartProps } from "./utils/charts.types";
import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Bar,
  Legend,
} from "recharts";

export function TrialOverTimeChart({
  data,
  chartId,
  chartTitle,
}: ChartProps) {
  return (
    <LineChart data={data}  width={600} height={600}>
    <XAxis dataKey="year" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="USA" stroke="#8884d8" strokeWidth={2} />
    <Line type="monotone" dataKey="EU" stroke="#82ca9d" strokeWidth={2} />
  </LineChart>
  );
}
