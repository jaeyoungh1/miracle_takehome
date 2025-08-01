import React from "react";
import { chartRegistry } from "../Charts/utils/chartsRegistry";
import { useChartData } from "../Charts/utils/useChartData";
import { useFilters } from "../../context/filterContext";

interface ChartWrapperProps {
  chartId: string;
  chartKey: string;
  chartTitle?: string;
}

const ChartWrapper: React.FC<ChartWrapperProps> = ({ chartId, chartKey, chartTitle }) => {
  const chartMeta = chartRegistry[chartKey];
  const { filters } = useFilters();
  
  const data = useChartData(chartId, filters);

  if (!chartMeta) {
    return <div className="text-red-500">Unknown chart: {chartId}</div>;
  }

  const ChartComponent = chartMeta.component;

  return (
    <div className="border rounded p-4 shadow bg-white">
      <h3 className="font-bold text-gray-700 mb-2">{chartMeta.chartTitle}</h3>
      <ChartComponent
        chartId={chartMeta.chartId}
        chartTitle={chartMeta.chartTitle}
        data={data}
      />
    </div>
  );
};

export default ChartWrapper;
