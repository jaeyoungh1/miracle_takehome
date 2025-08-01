import React from "react";
import { useFilters } from "../../../context/filterContext";
import { Filters } from "../../../context/filterContext";

import ctgData from "../../../data/ctg-studies";
import EudraCTData from "../../../data/trials-summary";

import {
  countTrials,
  breakdownByConditions,
  breakdownBySponsor,
  mergeTopSponsors,
  getGenderChartData,
  getStatusChartData,
  getTopConditionChartData,
  getTrialsOverTimeChartData,
  getAgeDistribution,
  getStudiesOverTimeData,
} from "./useCharts";

function applyFilters(
  ctgData: any[],
  eudraData: any[],
  filters?: Filters
): { ctg: any[]; eu: any[] } {
  const condition = filters?.condition?.toLowerCase() ?? "";
  const startDate = filters?.dateRange.start ? new Date(filters.dateRange.start) : null;
  const endDate = filters?.dateRange.end ? new Date(filters.dateRange.end ) : null;

  // US filters
  let ctg = ctgData.filter((d) => {
    const conditionMatch = condition
      ? d?.protocolSection?.conditionsModule?.conditions
          ?.join(" ")
          ?.toLowerCase()
          .includes(condition)
      : true;

    const start = d?.protocolSection?.statusModule?.startDateStruct?.date;
    const dateMatch =
      (!startDate || new Date(start) >= startDate) &&
      (!endDate || new Date(start) <= endDate);

    return conditionMatch && dateMatch;
  });

  // EU filters
  let eu = eudraData.filter((d) => {
    const conditionMatch = condition
      ? d["Medical condition"]?.toLowerCase().includes(condition)
      : true;

    const start = d["Start Date"];
    const dateMatch =
      (!startDate || new Date(start) >= startDate) &&
      (!endDate || new Date(start) <= endDate);

    return conditionMatch && dateMatch;
  });

  // Apply region filter
  if (filters?.region === "us") {
    eu = [];
  } else if (filters?.region === "eu") {
    ctg = [];
  }

  return { ctg, eu };
}

export function useChartData(chartId: string, filters?: Filters) {
  let result: any[] = [];
  const { ctg, eu } = applyFilters(ctgData, EudraCTData, filters);
  
  switch (chartId) {
    case "count-trials":
      return countTrials(ctg, eu);
    case "condition-breakdown":
      return breakdownByConditions(ctg, eu);
    case "sponsors-breakdown":
      return breakdownBySponsor(ctg, eu);
    case "top-sponsors":
      return mergeTopSponsors(ctg, eu);
    case "gender-distribution":
      return getGenderChartData(ctg, eu);
    case "status-distribution":
      return getStatusChartData(ctg, eu);
    case "top-conditions":
      return getTopConditionChartData(ctg, eu, 10);
    case "trials-over-time":
      return getTrialsOverTimeChartData(ctg, eu);
    case "age-distribution":
      return getAgeDistribution(ctg, eu);
    case "studies-over-time":
      return getStudiesOverTimeData(ctg, eu);
    default:
      throw new Error(`Unknown chartId: ${chartId}`);
  }

  return result
}
