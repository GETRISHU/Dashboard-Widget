
import React, { useRef, useEffect } from "react";
import { ChartDataPoint } from "@/types/dashboard";

interface DonutChartProps {
  data: ChartDataPoint[];
  size?: number;
  thickness?: number;
  label?: string;
}

const DonutChart: React.FC<DonutChartProps> = ({ 
  data, 
  size = 120, 
  thickness = 20,
  label
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Get the pixel ratio for retina displays
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);
    
    // Set the canvas size in CSS pixels
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;

    // Calculate total value for percentage calculations
    const total = data.reduce((acc, item) => acc + item.value, 0);
    
    // Draw donut chart
    let startAngle = -0.5 * Math.PI; // Start from the top
    
    data.forEach(item => {
      const sliceAngle = (item.value / total) * 2 * Math.PI;
      
      ctx.beginPath();
      ctx.arc(
        size / 2, // center x
        size / 2, // center y
        size / 2 - thickness / 2, // radius
        startAngle,
        startAngle + sliceAngle
      );
      
      ctx.lineWidth = thickness;
      ctx.strokeStyle = item.color;
      ctx.stroke();
      
      startAngle += sliceAngle;
    });

  }, [data, size, thickness]);

  return (
    <div className="relative flex items-center justify-center">
      <canvas ref={canvasRef} />
      {label && (
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <div className="text-sm font-bold">{label.split(' ')[0]}</div>
          <div className="text-xs text-muted-foreground">{label.split(' ').slice(1).join(' ')}</div>
        </div>
      )}
    </div>
  );
};

export default DonutChart;
