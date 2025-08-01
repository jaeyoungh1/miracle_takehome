import React, { useEffect, useState } from "react";
import ChartWrapper from "./chartWrapper";
import { chartRegistry } from "../Charts/utils/chartsRegistry";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FilterPanel } from "../FilterPanel/filterPanel";

type CustomLayoutProps = {
  dashboardId: string;
};

const SortableChartItem: React.FC<{
  chartKey: string;
  children: React.ReactNode;
}> = ({ chartKey, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: chartKey });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative">
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute top-2 left-2 cursor-grab text-gray-400 hover:text-gray-600"
        title="Drag to rearrange"
      >
        ☰
      </div>

      {/* Chart content */}
      <div className="ml-6">{children}</div>
    </div>
  );
};

const CustomLayout: React.FC<CustomLayoutProps> = ({ dashboardId }) => {
  const [selectedCharts, setSelectedCharts] = useState<string[]>([]);
  const [chartToAdd, setChartToAdd] = useState<string>("");

  useEffect(() => {
    const saved = localStorage.getItem(`dashboard-${dashboardId}`);
    if (saved) {
      setSelectedCharts(JSON.parse(saved));
    }
  }, [dashboardId]);

  useEffect(() => {
    if (selectedCharts.length > 0) {
      localStorage.setItem(
        `dashboard-${dashboardId}`,
        JSON.stringify(selectedCharts)
      );
    }
  }, [selectedCharts, dashboardId]);

  const availableChartKeys = Object.keys(chartRegistry).filter(
    (key) => !selectedCharts.includes(key)
  );

  const handleAddChart = () => {
    if (!chartToAdd) return;
    setSelectedCharts([...selectedCharts, chartToAdd]);
    setChartToAdd("");
  };

  const handleRemoveChart = (chartKeyToRemove: string) => {
    setSelectedCharts((prev) =>
      prev.filter((chartKey) => chartKey !== chartKeyToRemove)
    );
  };

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = selectedCharts.indexOf(active.id);
      const newIndex = selectedCharts.indexOf(over.id);
      const newOrder = arrayMove(selectedCharts, oldIndex, newIndex);
      setSelectedCharts(newOrder);
    }
  };

  return (
    <div className="p-4">
      <FilterPanel />
      <div className="flex items-center justify-between mb-4 gap-2">
        <h2 className="text-xl font-semibold">Custom Dashboard: {dashboardId}</h2>
        <div className="flex gap-2">
          <select
            value={chartToAdd}
            onChange={(e) => setChartToAdd(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="">Select a chart</option>
            {availableChartKeys.map((key) => (
              <option key={key} value={key}>
                {chartRegistry[key].chartTitle}
              </option>
            ))}
          </select>
          <button
            onClick={handleAddChart}
            disabled={!chartToAdd}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            + Add Chart
          </button>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={selectedCharts}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex flex-col gap-4">
            {selectedCharts.map((chartKey) => {
              const chartMeta = chartRegistry[chartKey];
              if (!chartMeta) return null;

              const { chartId, chartTitle } = chartMeta;

              return (
                <SortableChartItem key={chartKey} chartKey={chartKey}>
                  <div className="relative border p-4 rounded shadow bg-white">
                    <button
                      onClickCapture={() => handleRemoveChart(chartKey)}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                    <ChartWrapper
                      chartId={chartId}
                      chartKey={chartKey}
                      chartTitle={chartTitle}
                    />
                  </div>
                </SortableChartItem>
              );
            })}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default CustomLayout;
