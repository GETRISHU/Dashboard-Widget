
import React from "react";
import Dashboard from "@/components/dashboard/Dashboard";
import { DashboardProvider } from "@/context/DashboardContext";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardProvider>
        <Dashboard />
      </DashboardProvider>
    </div>
  );
};

export default Index;
