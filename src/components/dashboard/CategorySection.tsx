
import React from "react";
import { Category } from "@/types/dashboard";
import WidgetCard from "./WidgetCard";

interface CategorySectionProps {
  category: Category;
}

const CategorySection: React.FC<CategorySectionProps> = ({ category }) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4">{category.name}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {category.widgets.map((widget) => (
          <WidgetCard key={widget.id} widget={widget} categoryId={category.id} />
        ))}
        
        <div className="border border-dashed border-border rounded-lg flex items-center justify-center min-h-[200px]">
          <div className="flex flex-col items-center justify-center p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted mb-2">
              <svg className="h-6 w-6 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </div>
            <span className="text-sm text-muted-foreground">Add Widget</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
