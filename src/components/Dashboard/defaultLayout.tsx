import React from "react";
import ChartWrapper from "./chartWrapper";
import { chartRegistry } from "../Charts/utils/chartsRegistry";
import { FilterPanel } from "../FilterPanel/filterPanel";

const DefaultLayout = () => {
  const defaultCharts = Object.entries(chartRegistry).map(
    ([key, { chartId, chartTitle }]) => ({
      key,
      chartId,
      chartTitle,
    })
  );

  return (
    <div>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Default Layout</h2>
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
};

export default DefaultLayout;
