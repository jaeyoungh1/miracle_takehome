import React from "react";
import { useParams } from "react-router-dom";
import DefaultLayout from "./defaultLayout";
import CustomLayout from "./customLayout";
import { FilterProvider } from "../../context/filterContext";

const Dashboard = () => {
  const { id } = useParams();

  if (!id || id === "default") {
    return <DefaultLayout />;
  }

  return (
    <div className="p-4">
      <FilterProvider>
        <CustomLayout dashboardId={id} />
      </FilterProvider>
    </div>
  );
};

export default Dashboard;
