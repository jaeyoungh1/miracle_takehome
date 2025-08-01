import { ChartProps } from "./utils/charts.types";
import React from "react";
import {
  LineChart,
  Line,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from "recharts";

export function TrialOverTimeChart({ data, chartId, chartTitle }: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="USA" stroke="#7B61FF" strokeWidth={2} />
        <Line type="monotone" dataKey="EU" stroke="#3EC6B6" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}
