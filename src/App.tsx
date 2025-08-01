import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./components/HomePage/homePage";
import Charts from "./components/Charts/allCharts";
import Dashboard from "./components/Dashboard/dashboard";
import Sidebar from "./components/Sidebar";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Sidebar />}>
            <Route index element={<HomePage />} />
            <Route path="/charts" element={<Charts />} />
            <Route path="/dashboard/:id" element={<Dashboard />} />
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
