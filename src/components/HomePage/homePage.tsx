import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-white to-blue-50 px-6 text-gray-800">
      <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-primary">
        Welcome to Miracle
      </h1>

      <p className="text-lg sm:text-xl text-center max-w-xl mb-8">
        This is an interactive dashboard for exploring a subset of clinical trial data from ClinicalTrials.gov and EudraCT. You can view, compare, and customize charts and layouts.
      </p>

      <div className="space-y-4 w-full max-w-md">
        <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
          <p className="font-semibold">View Charts</p>
          <p className="text-sm text-gray-600">
            Explore all available charts by visiting the{" "}
            <Link to="/charts" className="text-primary underline">
              Charts
            </Link>{" "}
            page.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
          <p className="font-semibold">Customize Dashboards</p>
          <p className="text-sm text-gray-600">
            Go to{" "}
            <Link to="/dashboard/default" className="text-primary underline">
              Default Dashboard
            </Link>{" "}
            or create your own layout from the sidebar under “Dashboards.”
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
          <p className="font-semibold">Use Filters</p>
          <p className="text-sm text-gray-600">
            Use the filter panel at the top of custom dashboards to filter by trial region,
            medical condition, or date range.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
