import { ChartProps } from "./utils/charts.types";
import React from "react";
import { BarChart, Bar, Legend, XAxis, YAxis, Tooltip } from "recharts";

export function CountTrialsChart({ data, chartId, chartTitle }: ChartProps) {
  return (
    <BarChart data={data} width={300} height={300}>
    <XAxis dataKey="region" />
    <YAxis allowDecimals={false} />
    <Tooltip />
    <Legend />
    <Bar dataKey="count" fill="#8884d8" />
  </BarChart>
  );
}
