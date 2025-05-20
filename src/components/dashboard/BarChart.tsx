
import React, { useRef, useEffect } from "react";
import { ChartDataPoint } from "@/types/dashboard";

interface BarChartProps {
  data: ChartDataPoint[];
  height?: number;
}

const BarChart: React.FC<BarChartProps> = ({ data, height = 8 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Get the total width available
    const width = canvas.width;
    
    // Calculate total value for percentage calculations
    const total = data.reduce((acc, item) => acc + item.value, 0);
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw segmented bar
    let currentX = 0;
    data.forEach(item => {
      const segmentWidth = (item.value / total) * width;
      
      ctx.fillStyle = item.color;
      ctx.fillRect(currentX, 0, segmentWidth, height);
      
      currentX += segmentWidth;
    });

  }, [data, height]);

  return (
    <div className="w-full">
      <canvas 
        ref={canvasRef} 
        className="w-full" 
        height={height}
        style={{ height: `${height}px` }}
      />
      <div className="flex justify-between mt-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center text-xs">
            <span 
              className="inline-block w-2 h-2 mr-1 rounded-full" 
              style={{ backgroundColor: item.color }}
            ></span>
            <span>{item.name} ({item.value})</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarChart;
