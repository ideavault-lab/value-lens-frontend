"use client";

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useTheme } from "next-themes";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Filler, Tooltip, Legend);

interface TrendPoint {
  year: string;
  avgMarket: number | null;
  depFloor: number | null;
  yourCar?: number | null;
}

interface PriceTrendChartProps {
  data: TrendPoint[];
  carLabel?: string;
}

export function PriceTrendChart({ data, carLabel = "Your car" }: PriceTrendChartProps) {
  const { resolvedTheme } = useTheme();
  const dark = resolvedTheme === "dark";

  const gridColor = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)";
  const tickColor = dark ? "#9ca3af" : "#6b7280";

  const labels = data.map((d) => d.year);

  const chartData = {
    labels,
    datasets: [
      {
        label: carLabel,
        data: data.map((d) => d.yourCar ?? null),
        borderColor: "#1d4ed8",
        backgroundColor: "rgba(29,78,216,0.12)",
        pointBackgroundColor: "#1d4ed8",
        pointRadius: data.map((d) => (d.yourCar !== null && d.yourCar !== undefined ? 7 : 0)),
        pointHoverRadius: 9,
        borderWidth: 2,
        tension: 0.35,
        fill: false,
        spanGaps: false,
      },
      {
        label: "Avg market",
        data: data.map((d) => d.avgMarket),
        borderColor: "#16a34a",
        backgroundColor: "rgba(22,163,74,0.08)",
        pointBackgroundColor: "#16a34a",
        pointRadius: 3,
        borderWidth: 2,
        tension: 0.35,
        fill: false,
      },
      {
        label: "Depr. floor",
        data: data.map((d) => d.depFloor),
        borderColor: "#d97706",
        backgroundColor: "transparent",
        pointRadius: 0,
        borderWidth: 1.5,
        borderDash: [5, 4],
        tension: 0.35,
        fill: false,
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
          label: (ctx: { dataset: { label?: string }; parsed: { y: number | null } }) =>
            ctx.dataset.label + ": ₹" + (ctx.parsed.y?.toFixed(2) ?? "—") + "L",
        },
      },
    },
    scales: {
      x: {
        grid: { color: gridColor },
        ticks: { color: tickColor, font: { size: 11 } },
      },
      y: {
        grid: { color: gridColor },
        ticks: {
          color: tickColor,
          font: { size: 11 },
          callback: (v: unknown) => "₹" + v + "L",
        },
        min: 5.5,
        max: 10.5,
      },
    },
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-5">
      <p className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-2">
        <span className="text-base">📈</span> Price trend — Kerala market
      </p>
      {/* Custom legend */}
      <div className="flex flex-wrap gap-4 mb-4 mt-2">
        {[
          { color: "#1d4ed8", label: carLabel },
          { color: "#16a34a", label: "Avg market" },
          { color: "#d97706", label: "Depr. floor", dashed: true },
        ].map((l) => (
          <span key={l.label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span
              className="inline-block w-6 h-0.5 rounded"
              style={{
                background: l.color,
                borderTop: l.dashed ? `2px dashed ${l.color}` : undefined,
                height: l.dashed ? 0 : undefined,
              }}
            />
            {l.label}
          </span>
        ))}
      </div>
      <div className="h-52">
        <Line data={chartData} options={options as Parameters<typeof Line>[0]["options"]} />
      </div>
    </div>
  );
}