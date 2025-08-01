import React from "react";
import { useParams } from "react-router-dom";
import DefaultLayout from "./defaultLayout";
import CustomLayout from "./customLayout";

const Dashboard = () => {
  const { id } = useParams();

  if (!id || id === "default") {
    return <DefaultLayout />;
  }

  return (
    <div className="p-4">
        <CustomLayout dashboardId={id} />
    </div>
  );
};

export default Dashboard;
