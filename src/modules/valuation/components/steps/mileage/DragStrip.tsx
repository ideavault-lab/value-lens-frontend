import React, { useRef, useState, useCallback } from "react";
import { MAX_KM } from "./types";
import { getZone, segmentColor } from "./gaugeUtils";

interface DragStripProps {
  value: number | null;
  onChange: (km: number) => void;
  height?: number;
  width?: number;
  showLabels?: boolean;
}

const SEGMENT_COUNT = 42;
const STEP_KM = 1000;

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

function fractionToKm(fraction: number): number {
  return Math.round((fraction * MAX_KM) / STEP_KM) * STEP_KM;
}

export function DragStrip({
  value,
  onChange,
  height = 200,
  width = 30,
  showLabels = true,
}: DragStripProps): React.ReactElement {
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);

  const percentage = value ? clamp((value / MAX_KM) * 100, 0, 100) : 0;
  const zone = getZone(value);

  const getKmFromClientY = useCallback((clientY: number): number => {
    if (!trackRef.current) return 0;
    const rect = trackRef.current.getBoundingClientRect();
    const fraction = clamp((rect.bottom - clientY) / rect.height, 0, 1);
    return fractionToKm(fraction);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    setDragging(true);
    onChange(getKmFromClientY(e.clientY));
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (dragging) onChange(getKmFromClientY(e.clientY));
  };

  const handlePointerUp = () => setDragging(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!value) return;
    if (e.key === "ArrowUp" || e.key === "ArrowRight") {
      onChange(clamp(value + STEP_KM, 0, MAX_KM));
    }
    if (e.key === "ArrowDown" || e.key === "ArrowLeft") {
      onChange(clamp(value - STEP_KM, 0, MAX_KM));
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 select-none">
      {/* Top Label */}
      {showLabels && (
        <span className="text-sm font-mono text-muted-foreground tabular-nums">
          {MAX_KM / 1000}k
        </span>
      )}

      <div
        ref={trackRef}
        role="slider"
        aria-valuemin={0}
        aria-valuemax={MAX_KM}
        aria-valuenow={value ?? 0}
        tabIndex={0}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onKeyDown={handleKeyDown}
        className="relative cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-3xl transition-all h-45 sm:h-55"
        style={{
          width: `${width}px`,
          // height: `${height}px`,
          maxWidth: "58px",           // Force smaller on very small screens
        }}
      >
        {/* Light Track */}
        <div className="absolute inset-0 bg-zinc-100 border-2 border-zinc-300 rounded-3xl overflow-hidden shadow-sm">
          {/* Segments */}
          <div className="absolute inset-[6px] flex flex-col-reverse gap-[1px]">
            {Array.from({ length: SEGMENT_COUNT }).map((_, i) => {
              const segFrac = (i + 1) / SEGMENT_COUNT;
              const isActive = segFrac <= percentage / 100;
              const color = segmentColor((i / SEGMENT_COUNT) * MAX_KM);

              return (
                <div
                  key={i}
                  className="flex-1 rounded transition-all duration-100"
                  style={{
                    background: isActive ? color : "#e5e5e5",
                    boxShadow: isActive ? `0 0 6px ${color}88` : "none",
                    opacity: isActive ? 1 : 0.75,
                  }}
                />
              );
            })}
          </div>

          {/* Thumb - Improved Grabbing Feel */}
          {value !== null && value > 0 && (
            <div
              className="absolute left-1/2 -translate-x-1/2 w-12 h-0.3 rounded-2xl border-[3px] flex items-center justify-center pointer-events-none z-10 shadow-lg active:scale-95 transition-all duration-75"
              style={{
                bottom: `${percentage}%`,
                transform: "translate(-50%, 50%)",
                borderColor: zone.color,
                backgroundColor: "#ffffff",
                boxShadow: `0 4px 12px -2px ${zone.color}60, 0 0 0 4px ${zone.color}15`,
                left: "110%",
              }}
            >
              <div
                className="w-12 h-0.3 rounded-full transition-transform"
                style={{ backgroundColor: zone.color }}
              />
            </div>
          )}
          {/* Subtle center line */}
          {/* <div className="absolute left-1/2 top-3 bottom-3 w-px bg-zinc-300 -translate-x-1/2 pointer-events-none" /> */}
        </div>


      </div>

      {/* Bottom Label */}
      {showLabels && (
        <span className="text-sm font-mono text-muted-foreground tabular-nums">
          0
        </span>
      )}
    </div>
  );
}