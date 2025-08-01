import React from "react";
import ChartWrapper from "../Dashboard/chartWrapper";
import { chartRegistry } from "../Charts/utils/chartsRegistry";

function Charts() {
  const defaultCharts = Object.entries(chartRegistry).map(
      ([key, { chartId, chartTitle }]) => ({
        key,
        chartId,
        chartTitle,
      })
    );
    return (
    <div>
      <div className="p-4 w-[70%]">
        <h2 className="text-xl font-semibold mb-4">All Charts</h2>
        <div className="flex flex-col gap-4">
          {defaultCharts.map(({ chartId, chartTitle, key }) => (
            <ChartWrapper
              key={chartId}
              chartId={chartId}
              chartKey={key}
              chartTitle={chartTitle}
            />
          ))}
        </div>
      </div>
    </div>
  );

}

export default Charts;
