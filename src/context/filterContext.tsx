// src/context/FilterContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

export type RegionFilter = "all" | "us" | "eu";

export interface Filters {
  region: RegionFilter;
  condition: string;
  dateRange: { start: Date | null; end: Date | null };
}

const defaultFilters: Filters = {
  region: "all",
  condition: "",
  dateRange: { start: null, end: null },
};
interface FilterContextType {
  filters: Filters;
  updateFilter: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
  setFilters: (filters: Filters) => void;
  resetFilters: () => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFiltersState] = useState<Filters>(defaultFilters);

  const updateFilter = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    setFiltersState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const setFilters = (newFilters: Filters) => {
    setFiltersState(newFilters);
  };

  const resetFilters = () => {
    setFiltersState(defaultFilters);
  };


  return (
    <FilterContext.Provider value={{ filters, updateFilter, setFilters, resetFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = (): FilterContextType => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilters must be used within a FiltersProvider");
  }
  return context;
};
