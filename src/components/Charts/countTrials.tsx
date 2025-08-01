import { ChartProps } from "./utils/charts.types";
import React from "react";
import { BarChart, Bar, Legend, XAxis, YAxis, Tooltip,ResponsiveContainer } from "recharts";

export function CountTrialsChart({ data, chartId, chartTitle }: ChartProps) {
  return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} >
          <XAxis dataKey="region" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#7B61FF" />
        </BarChart>
      </ResponsiveContainer>
  );
}
