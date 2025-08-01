import React from "react";
import logo from "./logo.svg";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./components/HomePage/homePage";
import FontToggle from "./components/HomePage/fontToggle";
import Charts from "./components/Charts/allCharts";
import Dashboard from "./components/Dashboard/dashboard";
import Sidebar from "./components/Sidebar";
import { FilterProvider } from "./context/filterContext";

function App() {
  return (
    <FilterProvider>
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
    </FilterProvider>
  );
}

export default App;
