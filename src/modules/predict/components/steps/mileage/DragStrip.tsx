import React, { useRef, useState } from "react";
import { MAX_KM } from "./types";
import { getZone, segmentColor } from "./gaugeUtils";

interface DragStripProps {
  value: number | null;
  onChange: (km: number) => void;
}

const SEGMENT_COUNT = 40;
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
}: DragStripProps): React.ReactElement {
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);

  const percentage = value ? clamp((value / MAX_KM) * 100, 0, 100) : 0;
  const zone = getZone(value);

  /* ---------- Pointer logic ---------- */

  function getKmFromClientY(clientY: number): number {
    const rect = trackRef.current!.getBoundingClientRect();
    const fraction = clamp((rect.bottom - clientY) / rect.height, 0, 1);
    return fractionToKm(fraction);
  }

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    setDragging(true);
    onChange(getKmFromClientY(e.clientY));
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (dragging) onChange(getKmFromClientY(e.clientY));
  }

  function handlePointerUp() {
    setDragging(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowUp")
      onChange(clamp((value ?? 0) + STEP_KM, 0, MAX_KM));
    if (e.key === "ArrowDown")
      onChange(clamp((value ?? 0) - STEP_KM, 0, MAX_KM));
  }

  return (
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
      className="relative w-12 h-64 flex flex-col-reverse items-center cursor-pointer"
    >
      {/* TRACK CENTER LINE */}
      <span className="text-[15px] text-muted-foreground font-mono pointer-events-none">0</span>

      <div className="relative flex flex-col-reverse h-full items-center">
        {/* Segments */}
        <div className="flex flex-col-reverse h-full w-[18px] gap-[2px]">
          {Array.from({ length: SEGMENT_COUNT }).map((_, i) => {
            const segFrac = (i + 1) / SEGMENT_COUNT;
            const active = segFrac <= percentage / 100;
            const color = segmentColor((i / SEGMENT_COUNT) * MAX_KM);

            return (
              <div
                key={i}
                className="flex-1 rounded-[2px] transition-all duration-75"
                style={{
                  background: active ? color : "hsl(var(--border))",
                  boxShadow: active ? `0 0 5px ${color}99` : "none",
                  opacity: active ? 1 : 0.5,
                }}
              />
            );
          })}
        </div>

        {/* Thumb (FIXED alignment) */}
        {value != null && value > 0 && (
          <div
            className="absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full border-2 flex items-center justify-center pointer-events-none"
            style={{
              bottom: `${percentage}%`,
              transform: "translate(-50%, 50%)", // keeps center aligned with segment edge
              background: "hsl(var(--card))",
              borderColor: zone.color,
              boxShadow: `0 0 10px ${zone.color}88`,
              left: "100%",
            }}
          >
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: zone.color }}
            />
          </div>
        )}
      </div>
      <span className="text-[15px] text-muted-foreground font-mono pointer-events-none mt-4">200k</span>

    </div>
  );
}