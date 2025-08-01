import { ChartProps } from "./utils/charts.types";
import React from "react";
import {
  LineChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Line,
  Legend,
  ResponsiveContainer,
} from "recharts";

export function StudiesOverTimeChart({
  data,
  chartId,
  chartTitle,
}: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="USA"
          stroke="#7B61FF"
          name="USA Trials"
        />
        <Line type="monotone" dataKey="EU" stroke="#3EC6B6" name="EU Trials" />
      </LineChart>
    </ResponsiveContainer>
  );
}
