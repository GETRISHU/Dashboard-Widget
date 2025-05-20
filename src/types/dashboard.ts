
export interface ChartDataPoint {
  name: string;
  value: number;
  color: string;
}

export interface Widget {
  id: string;
  name: string;
  content: string;
  categoryId?: string;
  chart?: "donut" | "bar" | "line" | "none";
  data?: ChartDataPoint[];
}

export interface Category {
  id: string;
  name: string;
  widgets: Widget[];
}

export interface DashboardData {
  categories: Category[];
  availableWidgets: Widget[];
}
