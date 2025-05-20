
import React from "react";
import { useDashboard } from "@/context/DashboardContext";
import CategorySection from "./CategorySection";
import AddWidgetModal from "./AddWidgetModal";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Dashboard: React.FC = () => {
  const { dashboardData, searchQuery, setSearchQuery } = useDashboard();

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-2xl font-bold">CNAPP Dashboard</h1>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search widgets..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <AddWidgetModal />
        </div>
      </div>
      
      {dashboardData.categories.map((category) => (
        <CategorySection key={category.id} category={category} />
      ))}
    </div>
  );
};

export default Dashboard;
