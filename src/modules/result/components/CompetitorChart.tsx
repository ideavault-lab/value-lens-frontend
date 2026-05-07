"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
} from "chart.js";
import { useTheme } from "next-themes";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip);

export interface CompetitorModel {
  name: string;
  price: number;
  isYours?: boolean;
}

interface CompetitorChartProps {
  models: CompetitorModel[];
}

export function CompetitorChart({ models }: CompetitorChartProps) {
  const { resolvedTheme } = useTheme();
  const dark = resolvedTheme === "dark";
  const gridColor = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)";
  const tickColor = dark ? "#9ca3af" : "#6b7280";

  const chartData = {
    labels: models.map((m) => m.name),
    datasets: [
      {
        label: "Resale (₹L)",
        data: models.map((m) => m.price),
        backgroundColor: models.map((m) => (m.isYours ? "#1d4ed8" : "#9ca3af55")),
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx: { parsed: { y: number } }) => " ₹" + ctx.parsed.y.toFixed(2) + "L",
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: tickColor, font: { size: 11 } },
      },
      y: {
        grid: { color: gridColor },
        ticks: {
          color: tickColor,
          font: { size: 11 },
          callback: (v: unknown) => "₹" + v + "L",
        },
        min: 6.5,
      },
    },
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-5">
      <p className="text-sm font-medium text-muted-foreground mb-4 flex items-center gap-2">
        <span className="text-base">🏁</span> Competing models (₹L)
      </p>
      <div className="h-44">
        <Bar data={chartData} options={options as Parameters<typeof Bar>[0]["options"]} />
      </div>
    </div>
  );
}