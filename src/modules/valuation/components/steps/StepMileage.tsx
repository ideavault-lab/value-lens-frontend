"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Gauge } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

import { MAX_KM } from "./mileage/types";
import { deriveInsight, formatKm, getZone } from "./mileage/gaugeUtils";
import { OdometerGauge } from "./mileage/OdometerGauge";
import { DragStrip } from "./mileage/DragStrip";
import { QuickSelect } from "./mileage/QuickSelect";
import { InsightBadge } from "./mileage/InsightBadge";

// ─── Component ─────────────────────────────────────────────────────────────────

export default function StepMileage(): React.ReactElement {
  const [value, setValue] = useState<number | null>(null);

  // ── Handlers ────────────────────────────────────────────────────────────────

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    setValue(raw ? Math.min(parseInt(raw, 10), MAX_KM) : null);
  }

  // ── Derived values ───────────────────────────────────────────────────────────

  const zone = getZone(value);
  const insight = deriveInsight(value);

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-8 p-2">

      {/* Header */}
      <div>
        <h2 className="text-2xl md:text-3xl font-heading font-semibold text-foreground">
          How far has it traveled?
        </h2>
        <p className="text-muted-foreground mt-2 text-sm md:text-base">
          Drag the gauge or type the kilometers driven
        </p>
      </div>

      {/* Gauge panel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative rounded-2xl border border-border bg-card overflow-hidden mx-auto w-full "
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow:
            "0 4px 24px hsl(var(--primary) / 0.08), 0 1px 4px hsl(var(--border))",
        }}
      >
        {/* Ambient glow when active */}
        {value != null && value > 0 && (
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-10 rounded-full blur-2xl pointer-events-none opacity-25"
            style={{ background: zone.color }}
          />
        )}

        <div className="pt-1 pb-1 px-4 mx-auto">
          <OdometerGauge value={value ?? 0} />
        </div>

        <div className="px-4 pb-1 pt-1 mx-auto">
          <DragStrip value={value} onChange={setValue} />
        </div>
      </motion.div>

      {/* Manual km input */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-2"
      >
        <Label className="text-sm font-medium text-foreground">
          Kilometers Driven
        </Label>
        <div className="relative">
          <Gauge className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="e.g. 45,000"
            value={formatKm(value)}
            onChange={handleInputChange}
            className="pl-12 pr-12 h-14 text-lg font-semibold rounded-xl bg-card border-border"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-medium">
            km
          </span>
        </div>
      </motion.div>

      {/* Quick select chips */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <QuickSelect selected={value} onSelect={setValue} />
      </motion.div>

      {/* Insight banner */}
      <InsightBadge insight={insight} />
    </div>
  );
}