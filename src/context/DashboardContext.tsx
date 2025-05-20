
import React, { createContext, useState, useContext, useEffect } from "react";
import { Widget, Category, DashboardData } from "@/types/dashboard";

// Initial dashboard data
const initialDashboardData: DashboardData = {
  categories: [
    {
      id: "cspm",
      name: "CSPM Executive Dashboard",
      widgets: [
        {
          id: "cloud-accounts",
          name: "Cloud Accounts",
          content: "2 total",
          chart: "donut",
          data: [
            { name: "Connected", value: 2, color: "#4264D0" },
            { name: "Not Connected", value: 2, color: "#E2E8F0" },
          ],
        },
        {
          id: "cloud-risk",
          name: "Cloud Account Risk Assessment",
          content: "9659 total",
          chart: "donut",
          data: [
            { name: "Failed", value: 1689, color: "#E53E3E" },
            { name: "Warning", value: 681, color: "#ED8936" },
            { name: "Not available", value: 38, color: "#CBD5E0" },
            { name: "Passed", value: 7251, color: "#38A169" },
          ],
        },
      ],
    },
    {
      id: "cwpp",
      name: "CWPP Dashboard",
      widgets: [
        {
          id: "namespace-alerts",
          name: "Top 5 Namespace Specific Alerts",
          content: "No Graph data available!",
          chart: "none",
        },
        {
          id: "workload-alerts",
          name: "Workload Alerts",
          content: "No Graph data available!",
          chart: "none",
        },
      ],
    },
    {
      id: "registry",
      name: "Registry Scan",
      widgets: [
        {
          id: "image-risk",
          name: "Image Risk Assessment",
          content: "1470 total vulnerabilities",
          chart: "bar",
          data: [
            { name: "Critical", value: 6, color: "#E53E3E" },
            { name: "High", value: 150, color: "#ED8936" },
          ],
        },
        {
          id: "image-security",
          name: "Image Security Issues",
          content: "2 total images",
          chart: "bar",
          data: [
            { name: "Critical", value: 2, color: "#E53E3E" },
            { name: "High", value: 2, color: "#ED8936" },
          ],
        },
      ],
    },
  ],
  availableWidgets: [
    {
      id: "cloud-accounts",
      name: "Cloud Accounts",
      categoryId: "cspm",
      content: "2 total",
      chart: "donut",
      data: [
        { name: "Connected", value: 2, color: "#4264D0" },
        { name: "Not Connected", value: 2, color: "#E2E8F0" },
      ],
    },
    {
      id: "cloud-risk",
      name: "Cloud Account Risk Assessment",
      categoryId: "cspm",
      content: "9659 total",
      chart: "donut",
      data: [
        { name: "Failed", value: 1689, color: "#E53E3E" },
        { name: "Warning", value: 681, color: "#ED8936" },
        { name: "Not available", value: 38, color: "#CBD5E0" },
        { name: "Passed", value: 7251, color: "#38A169" },
      ],
    },
    {
      id: "namespace-alerts",
      name: "Top 5 Namespace Specific Alerts",
      categoryId: "cwpp",
      content: "No Graph data available!",
      chart: "none",
    },
    {
      id: "workload-alerts",
      name: "Workload Alerts",
      categoryId: "cwpp",
      content: "No Graph data available!",
      chart: "none",
    },
    {
      id: "image-risk",
      name: "Image Risk Assessment",
      categoryId: "registry",
      content: "1470 total vulnerabilities",
      chart: "bar",
      data: [
        { name: "Critical", value: 6, color: "#E53E3E" },
        { name: "High", value: 150, color: "#ED8936" },
      ],
    },
    {
      id: "image-security",
      name: "Image Security Issues",
      categoryId: "registry",
      content: "2 total images",
      chart: "bar",
      data: [
        { name: "Critical", value: 2, color: "#E53E3E" },
        { name: "High", value: 2, color: "#ED8936" },
      ],
    },
    {
      id: "vulnerability-summary",
      name: "Vulnerability Summary",
      categoryId: "registry",
      content: "285 total vulnerabilities",
      chart: "bar",
      data: [
        { name: "Critical", value: 10, color: "#E53E3E" },
        { name: "High", value: 75, color: "#ED8936" },
        { name: "Medium", value: 120, color: "#ECC94B" },
        { name: "Low", value: 80, color: "#38A169" },
      ],
    },
    {
      id: "container-compliance",
      name: "Container Compliance",
      categoryId: "cwpp",
      content: "85% compliant",
      chart: "donut",
      data: [
        { name: "Compliant", value: 85, color: "#38A169" },
        { name: "Non-compliant", value: 15, color: "#E53E3E" },
      ],
    },
  ]
};

// Create context
interface DashboardContextProps {
  dashboardData: DashboardData;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredWidgets: Widget[];
  addWidgetToCategory: (widget: Widget, categoryId: string) => void;
  removeWidgetFromCategory: (widgetId: string, categoryId: string) => void;
  createNewWidget: (widget: Widget) => void;
}

const DashboardContext = createContext<DashboardContextProps | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dashboardData, setDashboardData] = useState<DashboardData>(initialDashboardData);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredWidgets, setFilteredWidgets] = useState<Widget[]>(initialDashboardData.availableWidgets);

  // Filter widgets based on search query
  useEffect(() => {
    if (!searchQuery) {
      setFilteredWidgets(dashboardData.availableWidgets);
      return;
    }

    const filtered = dashboardData.availableWidgets.filter((widget) =>
      widget.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredWidgets(filtered);
  }, [searchQuery, dashboardData.availableWidgets]);

  const addWidgetToCategory = (widget: Widget, categoryId: string) => {
    setDashboardData((prevData) => {
      const newCategories = prevData.categories.map((category) => {
        if (category.id === categoryId) {
          // Check if widget already exists
          const widgetExists = category.widgets.some((w) => w.id === widget.id);
          if (widgetExists) return category;

          return {
            ...category,
            widgets: [...category.widgets, widget],
          };
        }
        return category;
      });

      return {
        ...prevData,
        categories: newCategories,
      };
    });
  };

  const removeWidgetFromCategory = (widgetId: string, categoryId: string) => {
    setDashboardData((prevData) => {
      const newCategories = prevData.categories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            widgets: category.widgets.filter((widget) => widget.id !== widgetId),
          };
        }
        return category;
      });

      return {
        ...prevData,
        categories: newCategories,
      };
    });
  };

  const createNewWidget = (widget: Widget) => {
    // Add to available widgets
    setDashboardData((prevData) => ({
      ...prevData,
      availableWidgets: [...prevData.availableWidgets, widget],
    }));

    // Also add to specified category
    if (widget.categoryId) {
      addWidgetToCategory(widget, widget.categoryId);
    }
  };

  return (
    <DashboardContext.Provider
      value={{
        dashboardData,
        searchQuery,
        setSearchQuery,
        filteredWidgets,
        addWidgetToCategory,
        removeWidgetFromCategory,
        createNewWidget,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
};
