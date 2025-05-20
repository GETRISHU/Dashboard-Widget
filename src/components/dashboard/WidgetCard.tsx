
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Widget } from "@/types/dashboard";
import { X } from "lucide-react";
import DonutChart from "./DonutChart";
import BarChart from "./BarChart";
import { useDashboard } from "@/context/DashboardContext";
import { Button } from "@/components/ui/button";

interface WidgetCardProps {
  widget: Widget;
  categoryId: string;
}

const WidgetCard: React.FC<WidgetCardProps> = ({ widget, categoryId }) => {
  const { removeWidgetFromCategory } = useDashboard();

  const handleRemoveWidget = () => {
    removeWidgetFromCategory(widget.id, categoryId);
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-sm font-medium">{widget.name}</CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 w-6 p-0" 
            onClick={handleRemoveWidget}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {widget.chart === "donut" && widget.data && (
          <div className="flex flex-col items-center">
            <DonutChart data={widget.data} label={widget.content} />
            <div className="mt-4 grid grid-cols-2 w-full text-xs">
              {widget.data.map((item, i) => (
                <div key={i} className="flex items-center mb-1">
                  <span 
                    className="inline-block w-2 h-2 mr-1 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  ></span>
                  <span>{item.name} ({item.value})</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {widget.chart === "bar" && widget.data && (
          <div className="flex flex-col">
            <div className="text-sm font-medium mb-2">{widget.content}</div>
            <BarChart data={widget.data} />
          </div>
        )}
        
        {widget.chart === "none" && (
          <div className="h-full flex flex-col items-center justify-center py-8">
            <svg className="w-12 h-12 text-muted-foreground/30 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
            </svg>
            <div className="text-sm text-muted-foreground">{widget.content}</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WidgetCard;
