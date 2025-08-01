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
} from "recharts";

export function StudiesOverTimeChart({ data, chartId, chartTitle }: ChartProps) {
  return (
    <LineChart
        data={data}
        width={800}
        height={400}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="USA"
          stroke="#8884d8"
          name="USA Trials"
        />
        <Line type="monotone" dataKey="EU" stroke="#82ca9d" name="EU Trials" />
      </LineChart>
  );
}
