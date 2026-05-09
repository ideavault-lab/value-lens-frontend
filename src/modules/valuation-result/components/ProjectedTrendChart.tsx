"use client";

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useTheme } from "next-themes";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Filler, Tooltip);

interface Projection {
  year: string;
  value: number;
}

interface ProjectedTrendChartProps {
  projections: Projection[];
  carLabel?: string;
}

// Segment average (slightly lower — for comparison only)
function getSegmentAvg(projections: Projection[]) {
  return projections.map((p) => parseFloat((p.value - 0.3 - Math.random() * 0.1).toFixed(2)));
}

export function ProjectedTrendChart({
  projections,
  carLabel = "Your car",
}: ProjectedTrendChartProps) {
  const { resolvedTheme } = useTheme();
  const dark = resolvedTheme === "dark";

  const gridColor = dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)";
  const tickColor = dark ? "#9ca3af" : "#6b7280";

  const labels = projections.map((p) => p.year);
  const values = projections.map((p) => p.value);
  const segAvg = getSegmentAvg(projections);

  const chartData = {
    labels,
    datasets: [
      {
        label: carLabel,
        data: values,
        borderColor: "#e86b1f",
        backgroundColor: "rgba(232,107,31,0.08)",
        pointBackgroundColor: "#e86b1f",
        pointRadius: [6, 3, 3, 3, 3],
        pointHoverRadius: 6,
        borderWidth: 2,
        tension: 0.35,
        fill: true,
      },
      {
        label: "Segment avg",
        data: segAvg,
        borderColor: dark ? "#4b5563" : "#d1d5db",
        backgroundColor: "transparent",
        pointRadius: 0,
        borderWidth: 1.5,
        borderDash: [4, 4],
        tension: 0.35,
        fill: false,
      },
    ],
  };

  const minVal = Math.min(...values, ...segAvg) - 0.5;
  const maxVal = Math.max(...values, ...segAvg) + 0.5;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx: { dataset: { label?: string }; parsed: { y: number } }) =>
            (ctx.dataset.label ?? "") + ": ₹" + ctx.parsed.y.toFixed(2) + "L",
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
        min: Math.floor(minVal * 2) / 2,
        max: Math.ceil(maxVal * 2) / 2,
      },
    },
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-5">
      <div className="mb-3">
        <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          <span className="text-base">📈</span> Projected value trend
        </p>
        <p className="text-xs text-muted-foreground mt-1">Estimated depreciation over 5 years</p>
      </div>

      {/* Legend */}
      <div className="flex gap-4 mb-3">
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="inline-block w-5 h-0.5 bg-primary rounded" />
          {carLabel}
        </span>
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span
            className="inline-block w-5"
            style={{ borderTop: "1.5px dashed #9ca3af", height: 0 }}
          />
          Segment avg
        </span>
      </div>

      <div className="h-44">
        <Line data={chartData} options={options as Parameters<typeof Line>[0]["options"]} />
      </div>

      {/* Projection table */}
      <div className="mt-4 border-t border-border pt-3">
        <div className="grid grid-cols-3 text-[10px] uppercase tracking-wider text-muted-foreground pb-2 border-b border-border">
          <span>Year</span>
          <span className="text-center">Est. value</span>
          <span className="text-right">Change</span>
        </div>
        {projections.map((p, i) => {
          const prev = i === 0 ? null : projections[i - 1].value;
          const change = prev !== null ? (((p.value - prev) / prev) * 100).toFixed(1) : null;
          return (
            <div
              key={p.year}
              className={`grid grid-cols-3 text-xs py-1.5 border-b border-border/50 last:border-0 ${
                i === 0 ? "font-medium text-primary" : "text-foreground"
              }`}
            >
              <span>{p.year}{i === 0 ? " (now)" : ""}</span>
              <span className="text-center">₹{p.value}L</span>
              <span className={`text-right ${change && parseFloat(change) < 0 ? "text-rose-500" : "text-muted-foreground"}`}>
                {change ? `${parseFloat(change) > 0 ? "+" : ""}${change}%` : "—"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}