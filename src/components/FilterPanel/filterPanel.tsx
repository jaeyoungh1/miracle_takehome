import React from "react";
import { useFilters } from "../../context/filterContext";

export const FilterPanel = () => {
  const { filters, updateFilter, resetFilters } = useFilters();

  const handleDateChange = (field: "start" | "end", value: string) => {
    const parsedDate = value ? new Date(value) : null;
    updateFilter("dateRange", {
      ...filters.dateRange,
      [field]: parsedDate,
    });
  };

  return (
    <div className="bg-gray-100 p-4 rounded-md shadow mb-4 flex flex-wrap items-center gap-4">
      {/* Region Select */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Region</label>
        <select
          value={filters.region}
          onChange={(e) => updateFilter("region", e.target.value as any)}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm"
        >
          <option value="all">All</option>
          <option value="us">US</option>
          <option value="eu">EU</option>
        </select>
      </div>

      {/* Condition Search */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Condition</label>
        <input
          type="text"
          placeholder="Search by condition"
          value={filters.condition}
          onChange={(e) => updateFilter("condition", e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm"
        />
      </div>

      {/* Date Range Picker */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Start Date</label>
        <input
          type="date"
          value={filters.dateRange.start ? filters.dateRange.start.toISOString().split("T")[0] : ""}
          onChange={(e) => handleDateChange("start", e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">End Date</label>
        <input
          type="date"
          value={filters.dateRange.end ? filters.dateRange.end.toISOString().split("T")[0] : ""}
          onChange={(e) => handleDateChange("end", e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm"
        />
      </div>
      <div>
        <button
          onClick={resetFilters}
          className="mt-5 text-sm bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};
