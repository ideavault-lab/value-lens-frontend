"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { VEHICLE_TYPES } from "@/lib/homeData";

const RADIUS = 130;
const SPREAD = 120; // total degrees the dial sweeps

function angleFor(i: number, n: number) {
  if (n === 1) return 0;
  const start = -SPREAD / 2;
  return start + (SPREAD / (n - 1)) * i;
}

export default function VehicleUniverse() {
  const [active, setActive] = useState(0);
  const n = VEHICLE_TYPES.length;
  const vt = VEHICLE_TYPES[active];
  const width = RADIUS * 2 + 64;
  const height = RADIUS + 56;

  return (
    <section id="vehicle-universe" className="relative py-24 md:py-32 bg-background overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-lg mx-auto mb-8">
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">One dial, every vehicle</p>
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-foreground leading-[1.1]">
            Point it at what you drive.
          </h2>
        </div>

        {/* Dial */}
        <div className="relative mx-auto mt-14 mb-8" style={{ width, height }}>
          <svg className="absolute inset-0" width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
            <path
              d={`M 32 ${height - 16} A ${RADIUS} ${RADIUS} 0 0 1 ${width - 32} ${height - 16}`}
              fill="none"
              stroke="currentColor"
              className="text-border"
              strokeWidth="2"
              strokeDasharray="2 7"
              strokeLinecap="round"
            />
          </svg>

          {/* needle */}
          <motion.div
            className="absolute left-1/2 -ml-px w-[2px] bg-primary rounded-full origin-bottom"
            style={{ height: RADIUS - 34, bottom: 20 }}
            animate={{ rotate: angleFor(active, n) }}
            transition={{ type: "spring", stiffness: 90, damping: 14 }}
          />
          <div className="absolute bottom-[15px] left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary" />

          {/* vehicle nodes */}
          {VEHICLE_TYPES.map((v, i) => {
            const rad = (angleFor(i, n) * Math.PI) / 180;
            const x = width / 2 + Math.sin(rad) * RADIUS;
            const y = height - 16 - Math.cos(rad) * RADIUS;
            const isActive = i === active;
            return (
              <button
                key={v.id}
                onClick={() => setActive(i)}
                style={{ left: x, top: y }}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5 group"
              >
                <span
                  className={`flex items-center justify-center w-12 h-12 rounded-full border transition-all duration-300 ${
                    isActive
                      ? "bg-primary border-primary text-primary-foreground scale-110 shadow-md"
                      : "bg-card border-border text-muted-foreground group-hover:border-primary/40 group-hover:text-foreground"
                  }`}
                >
                  <v.Icon className="w-5 h-5" />
                </span>
                <span className={`text-xs font-semibold whitespace-nowrap ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                  {v.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="max-w-xl mx-auto text-center"
          >
            <p className="text-muted-foreground">{vt.description}</p>

            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {vt.examples.slice(0, 4).map((ex: string) => (
                <span key={ex} className="text-xs font-medium px-3 py-1.5 rounded-full bg-muted text-foreground/80 border border-border">
                  {ex}
                </span>
              ))}
            </div>

            <Link href="/valuation" className="mt-6 inline-flex">
              <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all">
                Value a {vt.label.split("&")[0].trim()}
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}