
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckboxProps, Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Category, Widget } from "@/types/dashboard";
import { useDashboard } from "@/context/DashboardContext";
import { Plus, Search } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddWidgetModalProps {
  children?: React.ReactNode;
}

const AddWidgetModal: React.FC<AddWidgetModalProps> = ({ children }) => {
  const { dashboardData, filteredWidgets, searchQuery, setSearchQuery, addWidgetToCategory, createNewWidget } = useDashboard();
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>(dashboardData.categories[0]?.id || "");
  const [selectedWidgets, setSelectedWidgets] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState<string>("cspm");
  
  // New widget form state
  const [newWidget, setNewWidget] = useState<{
    name: string;
    content: string;
    categoryId: string;
    chart: "donut" | "bar" | "line" | "none";
  }>({
    name: "",
    content: "",
    categoryId: dashboardData.categories[0]?.id || "",
    chart: "none",
  });

  const handleCheckboxChange = (widgetId: string, checked: boolean) => {
    setSelectedWidgets({
      ...selectedWidgets,
      [widgetId]: checked,
    });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleAddSelectedWidgets = () => {
    Object.entries(selectedWidgets).forEach(([widgetId, isSelected]) => {
      if (isSelected) {
        const widget = dashboardData.availableWidgets.find((w) => w.id === widgetId);
        if (widget) {
          addWidgetToCategory({ ...widget }, activeTab);
        }
      }
    });

    // Reset selections and close modal
    setSelectedWidgets({});
    setOpen(false);
  };

  const handleCreateNewWidget = () => {
    // Generate a unique ID
    const newId = `widget-${Date.now()}`;
    
    // Create new widget
    const widget: Widget = {
      id: newId,
      name: newWidget.name,
      content: newWidget.content,
      categoryId: newWidget.categoryId,
      chart: newWidget.chart,
      // Add default data for charts if needed
      data: newWidget.chart !== "none" 
        ? [
            { name: "Sample 1", value: 70, color: "#4264D0" },
            { name: "Sample 2", value: 30, color: "#E2E8F0" }
          ] 
        : undefined
    };
    
    // Add to available widgets and selected category
    createNewWidget(widget);
    
    // Reset form and close modal
    setNewWidget({
      name: "",
      content: "",
      categoryId: dashboardData.categories[0]?.id || "",
      chart: "none"
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || 
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" /> Add Widget
          </Button>
        }
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Widget</DialogTitle>
          <DialogDescription>
            Personalize your dashboard by adding the following widget
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="cspm" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full">
            {dashboardData.categories.map(category => (
              <TabsTrigger 
                key={category.id}
                value={category.id}
                className="flex-1"
              >
                {category.name.split(' ')[0]}
              </TabsTrigger>
            ))}
            <TabsTrigger value="new" className="flex-1">Create New</TabsTrigger>
          </TabsList>
          
          {dashboardData.categories.map(category => (
            <TabsContent key={category.id} value={category.id} className="space-y-4">
              <div className="relative">
                <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search widgets..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
              
              <div className="space-y-4">
                {filteredWidgets
                  .filter(widget => widget.categoryId === category.id)
                  .map((widget) => (
                    <div key={widget.id} className="flex items-start space-x-3 py-2">
                      <Checkbox 
                        id={`widget-${widget.id}`}
                        checked={selectedWidgets[widget.id] || false}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange(widget.id, Boolean(checked))
                        }
                      />
                      <div>
                        <label
                          htmlFor={`widget-${widget.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {widget.name}
                        </label>
                        <p className="text-xs text-muted-foreground mt-1">
                          {widget.content}
                        </p>
                      </div>
                    </div>
                  ))}
                
                {filteredWidgets.filter(widget => widget.categoryId === category.id).length === 0 && (
                  <div className="text-center py-4 text-muted-foreground">
                    No widgets found
                  </div>
                )}
              </div>
              
              <Button onClick={handleAddSelectedWidgets} className="w-full">
                Add Selected Widgets
              </Button>
            </TabsContent>
          ))}
          
          <TabsContent value="new">
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="widget-name">Widget Name</Label>
                <Input 
                  id="widget-name" 
                  placeholder="Enter widget name"
                  value={newWidget.name}
                  onChange={(e) => setNewWidget({ ...newWidget, name: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="widget-content">Widget Content</Label>
                <Textarea 
                  id="widget-content" 
                  placeholder="Enter widget content"
                  value={newWidget.content}
                  onChange={(e) => setNewWidget({ ...newWidget, content: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="widget-category">Category</Label>
                <Select 
                  value={newWidget.categoryId} 
                  onValueChange={(value) => setNewWidget({ ...newWidget, categoryId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {dashboardData.categories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="widget-type">Chart Type</Label>
                <Select 
                  value={newWidget.chart} 
                  onValueChange={(value: "donut" | "bar" | "line" | "none") => 
                    setNewWidget({ ...newWidget, chart: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a chart type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="donut">Donut Chart</SelectItem>
                    <SelectItem value="bar">Bar Chart</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                onClick={handleCreateNewWidget} 
                className="w-full"
                disabled={!newWidget.name || !newWidget.content}
              >
                Create Widget
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AddWidgetModal;
