import {CountTrialsChart} from "../countTrials";
import { ConditionBreakdownChart } from "../conditionBreakdown";
import { SponsorBreakdownChart } from "../sponsorBreakdown";
import { TopTenSponsors } from "../topTenSponsors";
import { GenderDistributionChart } from "../genderDistribution";
import { StatusDistributionChart } from "../statusDistribution";
import { MostCommonConditionsChart } from "../mostCommonConditions";
import { TrialOverTimeChart } from "../trialsOverTime";
import { AgeDistributionChart } from "../ageDistribution";
import { StudiesOverTimeChart } from "../studiesOverTime";

import { ChartProps } from "./charts.types";

export interface ChartMeta {
  chartId: string;
  chartTitle: string;
  component: React.ComponentType<ChartProps>;
}

export const chartRegistry: Record<string, ChartMeta> = {
  countTrialsChart: {
    chartId: "count-trials",
    chartTitle: "Count Trial Numbers",
    component: CountTrialsChart,
  },
  conditionBreakdownChart: {
    chartId: "condition-breakdown",
    chartTitle: "Clinical Trials By Conditions",
    component: ConditionBreakdownChart,
  },
    sponsorBreakdownChart: {
    chartId: "sponsors-breakdown",
    chartTitle: "Clinical Trials By Sponsor",
    component: SponsorBreakdownChart,
  },
  topTenSponsors: {
    chartId: "top-sponsors",
    chartTitle: "Top 10 Sponsors by Trial Count",
    component: TopTenSponsors,
  },
  genderDistributionChart: {
    chartId: "gender-distribution",
    chartTitle: "Gender Distribution in Trials",
    component: GenderDistributionChart,
  },
  statusDistributionChart: {
    chartId: "status-distribution",
    chartTitle: "Trial Status",
    component: StatusDistributionChart,
  },
  mostCommonConditionsChart: {
    chartId: "top-conditions",
    chartTitle: "Top 10 Conditions by Trial Count",
    component: MostCommonConditionsChart,
  },
  trialOverTimeChart: {
    chartId: "trials-over-time",
    chartTitle: "Trials Over Time",
    component: TrialOverTimeChart,
  },
  ageDistributionChart: {
    chartId: "age-distribution",
    chartTitle: "Trials by Age Distribution",
    component: AgeDistributionChart,
  },
  studiesOverTimeChart: {
    chartId: "studies-over-time",
    chartTitle: "Studies over Time",
    component: StudiesOverTimeChart,
  }
};
