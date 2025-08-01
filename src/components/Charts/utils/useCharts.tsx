// Collection of functions to parse trial data

export const countTrials = (dataUSA: any[], dataEU: any[]) => [
  { region: 'USA', count: dataUSA.length },
  { region: 'EU', count: dataEU.length }
];

export function breakdownByConditions(dataUSA: Array<any>, dataEU: Array<any>) {
  const normalizeCondition = (condition: string): string => {
    const conditionNormalizationMap: Record<string, string> = {
      "Type 1 Diabetes": "Type 1 Diabetes",
      "Type 1 Diabetes (T1D)": "Type 1 Diabetes",
      "Type 2 Diabetes": "Type 2 Diabetes",
      "Diabetes Mellitus": "Type 2 Diabetes",
      // Add more normalization rules here as needed
    };
    return conditionNormalizationMap[condition] || condition;
  };

  const countConditions = (conditions: string[]): Record<string, number> => {
    const countMap: Record<string, number> = {};
    conditions.forEach((condition) => {
      const normalized = normalizeCondition(condition);
      countMap[normalized] = (countMap[normalized] || 0) + 1;
    });
    return countMap;
  };
  // Handle USA dataset
  const usaConditions: string[] = [];
  dataUSA.forEach((trial) => {
    const conditions =
      trial.Conditions || [];
    conditions.forEach((condition: string) => usaConditions.push(condition));
  });

  // Extract and normalize conditions from EU dataset
  const euConditions: string[] = [];
  dataEU.forEach((trial) => {
    const raw = trial["Medical condition"];
    if (raw) {
      raw.split(",").map((p: string) => euConditions.push(p.trim()));
    }
  });

  const usaCountMap = countConditions(usaConditions);
  const euCountMap = countConditions(euConditions);

  const usaData = Object.entries(usaCountMap).map(([name, value]) => ({
    name,
    value,
  }));
  const euData = Object.entries(euCountMap).map(([name, value]) => ({
    name,
    value,
  }));

  return [usaData, euData];
}

export function breakdownBySponsor(dataUSA: Array<any>, dataEU: Array<any>) {
  const sponsorMap: Record<
    string,
    { name: string; USA?: number; EU?: number }
  > = {};

  // USA Dataset
  for (const study of dataUSA) {
    const sponsor =
      study.Sponsor;
    if (sponsor) {
      if (!sponsorMap[sponsor]) sponsorMap[sponsor] = { name: sponsor };
      sponsorMap[sponsor].USA = (sponsorMap[sponsor].USA || 0) + 1;
    }
  }

  // EU Dataset
  for (const study of dataEU) {
    const sponsor = study["Sponsor Name"];
    if (sponsor) {
      if (!sponsorMap[sponsor]) sponsorMap[sponsor] = { name: sponsor };
      sponsorMap[sponsor].EU = (sponsorMap[sponsor].EU || 0) + 1;
    }
  }

  // Convert to array and sort by total descending
  const barChartData = Object.values(sponsorMap)
    .map((entry) => ({
      name: entry.name,
      USA: entry.USA || 0,
      EU: entry.EU || 0,
      total: (entry.USA || 0) + (entry.EU || 0),
    }))
    .sort((a, b) => b.total - a.total);

  return barChartData;
}

function getTop10SponsorsUSA(dataUSA: any[]) {
  const sponsorCounts: Record<string, number> = {};

  dataUSA.forEach((trial) => {
    const sponsorName =
      trial.Sponsor;
    if (sponsorName) {
      sponsorCounts[sponsorName] = (sponsorCounts[sponsorName] || 0) + 1;
    }
  });

  return Object.entries(sponsorCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
}

function getTop10SponsorsEU(dataEU: any[]) {
  const sponsorCounts: Record<string, number> = {};

  dataEU.forEach((trial) => {
    const sponsorName = trial["Sponsor Name"];
    if (sponsorName) {
      sponsorCounts[sponsorName] = (sponsorCounts[sponsorName] || 0) + 1;
    }
  });

  return Object.entries(sponsorCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
}

export function mergeTopSponsors(dataUSA: any[], dataEU: any[]) {
  const topUSA = getTop10SponsorsUSA(dataUSA);
  const topEU = getTop10SponsorsEU(dataEU);
  const sponsorMap: Record<
    string,
    { name: string; USA?: number; EU?: number }
  > = {};

  topUSA.forEach(({ name, count }) => {
    if (!sponsorMap[name]) sponsorMap[name] = { name };
    sponsorMap[name].USA = count;
  });

  topEU.forEach(({ name, count }) => {
    if (!sponsorMap[name]) sponsorMap[name] = { name };
    sponsorMap[name].EU = count;
  });

  return Object.values(sponsorMap);
}

export function getEnrollmentTotalsByRegion(
  dataUSA: Array<any>,
  dataEU: Array<any>,
  labelA = "USA",
  labelB = "EU"
) {
  const sumCounts = (data: Array<any>) =>
    data.reduce((total, entry) => {
      const count =
        entry.protocolSection?.designModule?.enrollmentInfo?.count ?? 0;
      return total + Number(count) || 0;
    }, 0);

  return [
    {
      name: "Enrollment Total",
      [labelA]: sumCounts(dataUSA),
      [labelB]: sumCounts(dataEU),
    },
  ];
}

export function getStatusChartData(dataUSA: any[], dataEU: any[]) {
  const usaCounts: Record<string, number> = {};
  const euCounts: Record<string, number> = {};

  // Count overallStatus from USA data
  for (const trial of dataUSA) {
    const status =
      trial["Study Status"].trim() || "Unknown";
    usaCounts[status] = (usaCounts[status] || 0) + 1;
  }

  // Count Trial protocol from EU data
  for (const trial of dataEU) {
    const protocol = trial["Trial protocol"]?.trim() || "Unknown";
    euCounts[protocol] = (euCounts[protocol] || 0) + 1;
  }

  // Combine keys from both datasets
  const allKeys = new Set([
    ...Object.keys(usaCounts),
    ...Object.keys(euCounts),
  ]);

  // Format for Recharts
  return Array.from(allKeys).map((key) => ({
    status: key,
    USA: usaCounts[key] || 0,
    EU: euCounts[key] || 0,
  }));
}

export function getTopConditionChartData(
  dataUSA: any[],
  dataEU: any[],
  topN = 10
) {
  const usaCounts: Record<string, number> = {};
  const euCounts: Record<string, number> = {};

  // Count U.S. conditions
  for (const trial of dataUSA) {
    const conditions: string[] =
      trial.Conditions || [];
    for (const cond of conditions) {
      const key = cond.trim();
      usaCounts[key] = (usaCounts[key] || 0) + 1;
    }
  }

  // Count EU conditions
  for (const trial of dataEU) {
    const condition = trial["Medical condition"]?.trim();
    if (condition) {
      euCounts[condition] = (euCounts[condition] || 0) + 1;
    }
  }

  // Combine all condition keys
  const allConditions = new Set([
    ...Object.keys(usaCounts),
    ...Object.keys(euCounts),
  ]);

  // Combine counts
  const combined = Array.from(allConditions).map((cond) => ({
    condition: cond,
    USA: usaCounts[cond] || 0,
    EU: euCounts[cond] || 0,
  }));

  // Sort by total count descending and take top N
  return combined.sort((a, b) => b.USA + b.EU - (a.USA + a.EU)).slice(0, topN);
}

export function getTrialsOverTimeChartData(dataUSA: any[], dataEU: any[]) {
  const usaCounts: Record<string, number> = {};
  const euCounts: Record<string, number> = {};

  // Count USA trials by year
  for (const trial of dataUSA) {
    const dateStr = trial["Start Date"];
    if (dateStr) {
      const year = dateStr.slice(0, 4);
      usaCounts[year] = (usaCounts[year] || 0) + 1;
    }
  }

  // Count EU trials by year
  for (const trial of dataEU) {
    const dateStr = trial["Start Date"];
    if (dateStr) {
      const year = dateStr.slice(0, 4);
      euCounts[year] = (euCounts[year] || 0) + 1;
    }
  }

  // Merge all years
  const allYears = new Set([
    ...Object.keys(usaCounts),
    ...Object.keys(euCounts),
  ]);

  const merged = Array.from(allYears)
    .sort()
    .map((year) => ({
      year,
      USA: usaCounts[year] || 0,
      EU: euCounts[year] || 0,
    }));

  return merged;
}

export function getAgeDistribution(dataUSA: Array<any>, dataEU: Array<any>) {
  const normalize = (age: string): string => {
    const cleaned = age.trim().toUpperCase().replace(/_/g, " ");

    if (cleaned.includes("ADULTS")) return "ADULT";
    if (cleaned.includes("CHILDREN")) return "CHILD";

    return cleaned;
  };

  const countsUSA: Record<string, number> = {};
  for (const record of dataUSA) {
    const stdAges = record.Age.split(',');
    for (const age of stdAges) {
      const norm = normalize(age);
      countsUSA[norm] = (countsUSA[norm] ?? 0) + 1;
    }
  }

  const countsEU: Record<string, number> = {};
  for (const record of dataEU) {
    const rawAge = record["Population Age"];
    if (rawAge) {
      const parts = rawAge.split(",").map((part: string) => normalize(part));
      for (const age of parts) {
        countsEU[age] = (countsEU[age] ?? 0) + 1;
      }
    }
  }
  const allAges = Array.from(
    new Set([...Object.keys(countsUSA), ...Object.keys(countsEU)])
  );

  const data = allAges.map((age) => ({
    name: age,
    USA: countsUSA[age] ?? 0,
    EU: countsEU[age] ?? 0,
  }));
  const usaData = data.map((d) => ({ name: d.name, value: d.USA }));
  const euData = data.map((d) => ({ name: d.name, value: d.EU }));
  return [usaData, euData];
}

function getStudiesPerYear(data: any[], getDate: (item: any) => string | null) {
  const counts: Record<string, number> = {};

  for (const item of data) {
    const dateStr = getDate(item);
    if (dateStr) {
      const year = new Date(dateStr).getFullYear().toString();
      counts[year] = (counts[year] || 0) + 1;
    }
  }

  return counts;
}

export function getStudiesOverTimeData(
  dataUSA: Array<any>,
  dataEU: Array<any>
) {
  const usaCounts = getStudiesPerYear(
    dataUSA,
    (item) => item["Start Date"] ?? null
  );

  const euCounts = getStudiesPerYear(
    dataEU,
    (item) => item["Start Date"]?.trim() ?? null
  );

  const allYears = Array.from(
    new Set([...Object.keys(usaCounts), ...Object.keys(euCounts)])
  ).sort();

  return allYears.map((year) => ({
    year,
    USA: usaCounts[year] || 0,
    EU: euCounts[year] || 0,
  }));
}

export function getGenderChartData(dataUSA: any[], dataEU: any[]) {
  let maleUSA = 0,
    femaleUSA = 0,
    allUSA = 0;
  let maleEU = 0,
    femaleEU = 0,
    allEU = 0;

  // Count genders in USA dataset
  for (const trial of dataUSA) {
    const sex = trial.Sex?.toUpperCase();
    if (sex === "MALE") maleUSA++;
    else if (sex === "FEMALE") femaleUSA++;
    else if (sex === "ALL") allUSA++;
  }

  // Count genders in EU dataset
  for (const trial of dataEU) {
    const genderStr = trial["Gender"]?.toLowerCase() || "";
    const genders = genderStr.split(",").map((g: string) => g.trim());

    const isMale = genders.includes("male");
    const isFemale = genders.includes("female");

    if (isMale && isFemale) allEU++;
    else if (isMale) maleEU++;
    else if (isFemale) femaleEU++;
  }

  // Return formatted chart data
  return [
    { gender: "Male", USA: maleUSA, EU: maleEU },
    { gender: "Female", USA: femaleUSA, EU: femaleEU },
    { gender: "All", USA: allUSA, EU: allEU },
  ];
}
