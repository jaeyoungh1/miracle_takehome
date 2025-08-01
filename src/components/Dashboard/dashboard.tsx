import React from "react";
import { useParams } from "react-router-dom";
import DefaultLayout from "./defaultLayout";
import CustomLayout from "./customLayout";
import { useFilters } from "../../context/filterContext";
import { FilterPanel } from "../FilterPanel/filterPanel";
const Dashboard = () => {
  const { id } = useParams();
  const { filters, setFilters } = useFilters();

  if (!id) {
    return <DefaultLayout />;
  }
  return (
    <div className="p-4">
      {/* Layout rendering based on ID */}
      {id == "default" ? <DefaultLayout /> : <CustomLayout dashboardId={id} />}
    </div>
  );
};

export default Dashboard;
