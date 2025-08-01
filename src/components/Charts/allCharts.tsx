import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Tooltip,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Cell,
} from "recharts";
import {
  countTrials,
  breakdownByConditions,
  breakdownBySponsor,
  getEnrollmentTotalsByRegion,
  getStatusChartData,
  getTopConditionChartData,
  getTrialsOverTimeChartData,
  getAgeDistribution,
  getStudiesOverTimeData,
  mergeTopSponsors,
  getGenderChartData,
} from "./utils/useCharts";
import ctgData from "../../data/ctg-studies";
import EudraCTData from "../../data/trials-summary";

import { CountTrialsChart } from "./countTrials";
import { ConditionBreakdownChart } from "./conditionBreakdown";
import { SponsorBreakdownChart } from "./sponsorBreakdown";
import { TopTenSponsors } from "./topTenSponsors";
import { GenderDistributionChart } from "./genderDistribution";
import { StatusDistributionChart } from "./statusDistribution";
import { MostCommonConditionsChart } from "./mostCommonConditions";
import { TrialOverTimeChart } from "./trialsOverTime";
import { AgeDistributionChart } from "./ageDistribution";
import { StudiesOverTimeChart } from "./studiesOverTime";

import { useChartData } from "./utils/useChartData";

function Charts() {
  return (
    <div>
      <CountTrialsChart
        data={useChartData("count-trials")}
        chartId="count-trials"
        chartTitle="Count Trial Numbers"
      />
      <ConditionBreakdownChart
        data={useChartData("condition-breakdown")}
        chartId="condition-breakdown"
        chartTitle="Clinical Trials By Conditions"
      />
      <SponsorBreakdownChart
        data={useChartData("sponsors-breakdown")}
        chartId="sponsors-breakdown"
        chartTitle="Clinical Trials By Sponsor"
      />
      <TopTenSponsors
        data={useChartData("top-sponsors")}
        chartId="top-sponsors"
        chartTitle="Top 10 Sponsors by Trial Count"
      />
      <GenderDistributionChart
        data={useChartData("gender-distribution")}
        chartId="gender-distribution"
        chartTitle="Gender Distribution in Trials"
      />
      <StatusDistributionChart
        data={useChartData("status-distribution")}
        chartId="status-distribution"
        chartTitle="Trial Status"
      />

      <MostCommonConditionsChart
        data={useChartData("top-conditions")}
        chartId="top-conditions"
        chartTitle="Top 10 Conditions by Trial Count"
      />

      <TrialOverTimeChart
        data={useChartData("trials-over-time")}
        chartId="trials-over-time"
        chartTitle="Trials Over Time"
      />

      <AgeDistributionChart
        data={useChartData("age-distribution")}
        chartId="age-distribution"
        chartTitle="Trials by Age Distribution"
      />

      <StudiesOverTimeChart
        data={useChartData("studies-over-time")}
        chartId="studies-over-time"
        chartTitle="Studies over Time"
      />
    </div>
  );
}

export default Charts;
